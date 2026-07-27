import { requireAdmin } from "@/lib/firebase/session.js";
import { listUsers, setUserPlan, setUserBilling } from "@/lib/api/keys.js";
import { usageFor, recentPeriods } from "@/lib/api/usage.js";
import { getDb } from "@/lib/firebase/admin.js";

export const runtime = "nodejs";

function authError(err) {
  if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
  if (err.message === "FORBIDDEN") return Response.json({ error: "Admins only." }, { status: 403 });
  console.error("[admin] users", err);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}

/** GET /api/admin/users — every user with their keys, recent usage and billing state. */
export async function GET() {
  try {
    await requireAdmin();

    const users = await listUsers();
    const periods = recentPeriods(6);

    const keySnap = await (await getDb()).collection("apiKeys").get();
    const keysByUid = new Map();
    for (const doc of keySnap.docs) {
      const key = { id: doc.id, ...doc.data() };
      keysByUid.set(key.uid, [...(keysByUid.get(key.uid) ?? []), key]);
    }

    const usage = await usageFor(keySnap.docs.map((d) => d.id), periods);

    const rows = users.map((user) => {
      const keys = keysByUid.get(user.uid) ?? [];
      const byPeriod = Object.fromEntries(
        periods.map((p) => [p, keys.reduce((sum, k) => sum + (usage[k.id]?.[p] ?? 0), 0)])
      );
      return {
        ...user,
        keyCount: keys.filter((k) => !k.revoked).length,
        usage: byPeriod,
        currentUsage: byPeriod[periods[0]] ?? 0,
      };
    });

    return Response.json({ users: rows, periods });
  } catch (err) {
    return authError(err);
  }
}

/**
 * PATCH /api/admin/users — change a plan or record a manual billing state.
 * Body: { uid, plan? , billingStatus?, billingNote? }
 */
export async function PATCH(req) {
  try {
    await requireAdmin();
    const { uid, plan, billingStatus, billingNote } = await req.json();
    if (!uid) return Response.json({ error: "uid is required" }, { status: 400 });

    // Changing a plan rewrites every live key's mirror, so limits take effect at once.
    if (plan) await setUserPlan(uid, plan);
    if (billingStatus || billingNote !== undefined) {
      await setUserBilling(uid, { status: billingStatus, note: billingNote });
    }

    return Response.json({ ok: true });
  } catch (err) {
    if (err.message?.startsWith("Unknown")) return Response.json({ error: err.message }, { status: 400 });
    return authError(err);
  }
}
