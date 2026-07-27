import { requireUser } from "@/lib/firebase/session.js";
import { createKey, listKeysForUser } from "@/lib/api/keys.js";
import { usageFor, period } from "@/lib/api/usage.js";
import { getDb } from "@/lib/firebase/admin.js";

export const runtime = "nodejs";

function authError(err) {
  if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
  if (err.message === "FORBIDDEN") return Response.json({ error: "Not permitted." }, { status: 403 });
  console.error("[console] keys", err);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}

/** GET /api/console/keys — the caller's keys plus this month's usage. */
export async function GET() {
  try {
    const user = await requireUser();
    const keys = await listKeysForUser(user.uid);
    const current = period();
    const usage = await usageFor(keys.map((k) => k.id), [current]);

    return Response.json({
      keys: keys.map((k) => ({ ...k, usage: usage[k.id]?.[current] ?? 0 })),
      period: current,
    });
  } catch (err) {
    return authError(err);
  }
}

/**
 * POST /api/console/keys — mints a key. The plaintext secret is in this response
 * and nowhere else, ever; only its hash is stored.
 */
export async function POST(req) {
  try {
    const user = await requireUser();
    const { name } = await req.json().catch(() => ({}));

    const existing = await listKeysForUser(user.uid);
    if (existing.filter((k) => !k.revoked).length >= 5) {
      return Response.json({ error: "Key limit reached (5). Revoke one first." }, { status: 400 });
    }

    // The plan lives on the user record — admins change it there, and every new
    // key inherits it.
    const profile = await (await getDb()).collection("users").doc(user.uid).get();
    const plan = profile.data()?.plan ?? "free";

    const { secret, key } = await createKey({
      uid: user.uid,
      email: user.email,
      name: (name ?? "").trim().slice(0, 40) || "Default key",
      plan,
    });

    return Response.json({ secret, key });
  } catch (err) {
    return authError(err);
  }
}
