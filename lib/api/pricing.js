/**
 * Commercial detail for each plan — prices, what the tier includes, and how to pay.
 *
 * Kept separate from `Plans` in auth.js on purpose: that file holds the numbers the
 * request path enforces, and it runs on the edge for every API call. This file is
 * presentation, read by the marketing page and the console.
 *
 * `quota` and `burst` are duplicated here for display only. If you change a limit,
 * change it in auth.js first — that is the one the API actually enforces.
 */

export const CURRENCY = "ETB";

/** Telebirr is the only payment rail for now, and it is settled by hand. */
export const TELEBIRR_NUMBER = "+251910470972";

export const PRICING = {
  free: {
    id: "free",
    label: "Free",
    priceETB: 0,
    quota: 1_000,
    burst: 60,
    tagline: "Enough to build and test against.",
    features: [
      "Date conversion, both directions",
      "Holidays, Bahire Hasab and fasting",
      "Amharic and English output",
      "Community support",
    ],
    unavailable: ["Bulk endpoints"],
  },
  pro: {
    id: "pro",
    label: "Pro",
    priceETB: 900,
    quota: 100_000,
    burst: 600,
    popular: true,
    tagline: "For a product in production.",
    features: [
      "Everything in Free",
      "Bulk conversion, up to 1,000 dates a call",
      "Holiday data kept current as dates are announced",
      "Email support",
    ],
    unavailable: [],
  },
  business: {
    id: "business",
    label: "Business",
    priceETB: 5_000,
    quota: 2_000_000,
    burst: 3_000,
    tagline: "For payroll, banking and logistics volume.",
    features: [
      "Everything in Pro",
      "2M requests a month",
      "3,000 requests a minute",
      "Priority support",
    ],
    unavailable: [],
  },
};

export const PAID_PLANS = ["pro", "business"];

export const PLAN_ORDER = ["free", "pro", "business"];

export function priceLabel(planId) {
  const plan = PRICING[planId];
  if (!plan) return "";
  return plan.priceETB === 0 ? "Free" : `${plan.priceETB.toLocaleString()} ${CURRENCY}`;
}
