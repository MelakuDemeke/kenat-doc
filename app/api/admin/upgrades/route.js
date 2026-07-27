import { requireAdmin } from "@/lib/firebase/session.js";
import { listAllUpgrades, reviewUpgrade } from "@/lib/api/upgrades.js";

export const runtime = "nodejs";

const MESSAGES = {
  INVALID_STATUS: "Status must be approved or rejected.",
  NOT_FOUND: "That request no longer exists.",
  ALREADY_REVIEWED: "That request has already been reviewed.",
};

function handle(err) {
  if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
  if (err.message === "FORBIDDEN") return Response.json({ error: "Admins only." }, { status: 403 });
  if (MESSAGES[err.message]) return Response.json({ error: MESSAGES[err.message] }, { status: 400 });
  console.error("[admin] upgrades", err);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}

/** GET /api/admin/upgrades — the payment queue. */
export async function GET() {
  try {
    await requireAdmin();
    const requests = await listAllUpgrades();
    return Response.json({
      requests,
      pendingCount: requests.filter((r) => r.status === "pending").length,
    });
  } catch (err) {
    return handle(err);
  }
}

/**
 * PATCH /api/admin/upgrades — approve or reject.
 * Approving is what actually grants the plan and re-mirrors the user's keys.
 */
export async function PATCH(req) {
  try {
    const admin = await requireAdmin();
    const { id, status, adminNote } = await req.json();
    if (!id) return Response.json({ error: "id is required" }, { status: 400 });

    const result = await reviewUpgrade({ id, status, adminEmail: admin.email, adminNote });
    return Response.json({ ok: true, request: result });
  } catch (err) {
    return handle(err);
  }
}
