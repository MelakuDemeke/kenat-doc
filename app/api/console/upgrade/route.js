import { requireUser } from "@/lib/firebase/session.js";
import { submitUpgrade, listUpgradesForUser } from "@/lib/api/upgrades.js";

export const runtime = "nodejs";

const MESSAGES = {
  INVALID_PLAN: "Choose either the Pro or Business plan.",
  INVALID_TXN: "Enter the transaction ID from your Telebirr confirmation message.",
  DUPLICATE_TXN: "That transaction ID has already been submitted.",
  ALREADY_PENDING: "You already have a request awaiting review. We will get to it shortly.",
};

function handle(err) {
  if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
  if (MESSAGES[err.message]) return Response.json({ error: MESSAGES[err.message] }, { status: 400 });
  console.error("[console] upgrade", err);
  return Response.json({ error: "Could not submit the request." }, { status: 500 });
}

/** GET /api/console/upgrade — the caller's own request history. */
export async function GET() {
  try {
    const user = await requireUser();
    return Response.json({ requests: await listUpgradesForUser(user.uid) });
  } catch (err) {
    return handle(err);
  }
}

/**
 * POST /api/console/upgrade — records a claimed Telebirr payment.
 * Does NOT change the plan: an admin confirms the transfer first.
 */
export async function POST(req) {
  try {
    const user = await requireUser();
    const { plan, txnId, payerPhone, note } = await req.json().catch(() => ({}));

    const request = await submitUpgrade({
      uid: user.uid,
      email: user.email,
      name: user.name,
      plan,
      txnId,
      payerPhone,
      note,
    });

    return Response.json({ ok: true, request });
  } catch (err) {
    return handle(err);
  }
}
