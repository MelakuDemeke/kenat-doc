import { getEffectivePricing } from "@/lib/api/config.js";

export const runtime = "nodejs";
// Prices change rarely but must not be stale for long after an admin edits them.
export const revalidate = 0;

/**
 * GET /api/pricing — public. The marketing page and the console both render prices
 * client-side, so they need somewhere to read the current values from.
 */
export async function GET() {
  const pricing = await getEffectivePricing();
  return Response.json(
    { plans: pricing.plans, telebirrNumber: pricing.telebirrNumber },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=600" } }
  );
}
