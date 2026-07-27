import { requireAdmin } from "@/lib/firebase/session.js";
import { getEffectivePricing, setPricing } from "@/lib/api/config.js";

export const runtime = "nodejs";

function handle(err) {
  if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
  if (err.message === "FORBIDDEN") return Response.json({ error: "Admins only." }, { status: 403 });
  if (err.message?.startsWith("INVALID_PRICE")) {
    const plan = err.message.split(":")[1];
    return Response.json({ error: `The ${plan} price must be a whole number of ETB.` }, { status: 400 });
  }
  if (err.message === "INVALID_PHONE") {
    return Response.json({ error: "Enter a valid Telebirr number." }, { status: 400 });
  }
  console.error("[admin] pricing", err);
  return Response.json({ error: "Could not save pricing." }, { status: 500 });
}

export async function GET() {
  try {
    await requireAdmin();
    return Response.json(await getEffectivePricing());
  } catch (err) {
    return handle(err);
  }
}

/** PUT /api/admin/pricing — body: { prices: { pro, business }, telebirrNumber } */
export async function PUT(req) {
  try {
    const admin = await requireAdmin();
    const { prices, telebirrNumber } = await req.json();
    const updated = await setPricing({ prices, telebirrNumber, adminEmail: admin.email });
    return Response.json({ ok: true, ...updated });
  } catch (err) {
    return handle(err);
  }
}
