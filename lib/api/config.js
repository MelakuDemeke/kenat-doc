import "server-only";

import { getDb } from "@/lib/firebase/admin.js";
import { PRICING, TELEBIRR_NUMBER, PAID_PLANS } from "./pricing.js";

/**
 * Prices are editable from the admin dashboard, so they live in Firestore. The
 * constants in pricing.js are the defaults and the shape — this only ever overrides
 * the numbers, never the tier structure or the feature copy.
 */
const CONFIG = "config";
const PRICING_DOC = "pricing";

/** How long an approved payment buys. Calendar months vary; 30 days does not. */
export const PLAN_PERIOD_DAYS = 30;

export async function getPricingOverrides() {
  const db = await getDb();
  const doc = await db.collection(CONFIG).doc(PRICING_DOC).get();
  return doc.exists ? doc.data() : {};
}

/** Defaults merged with whatever the admin has set. Safe to expose publicly. */
export async function getEffectivePricing() {
  let overrides = {};
  try {
    overrides = await getPricingOverrides();
  } catch (err) {
    // A pricing read failing must not take the marketing page down.
    console.error("[config] pricing read failed, using defaults", err);
  }

  const plans = Object.fromEntries(
    Object.entries(PRICING).map(([id, plan]) => [
      id,
      { ...plan, priceETB: overrides.prices?.[id] ?? plan.priceETB },
    ])
  );

  return {
    plans,
    telebirrNumber: overrides.telebirrNumber || TELEBIRR_NUMBER,
    updatedAt: overrides.updatedAt ?? null,
    updatedBy: overrides.updatedBy ?? null,
  };
}

/** Admin write. Only paid tiers have an editable price — free is always zero. */
export async function setPricing({ prices, telebirrNumber, adminEmail }) {
  const clean = {};
  for (const id of PAID_PLANS) {
    const value = Number(prices?.[id]);
    if (!Number.isFinite(value) || value < 0 || value > 10_000_000) {
      throw new Error(`INVALID_PRICE:${id}`);
    }
    clean[id] = Math.round(value);
  }

  const phone = String(telebirrNumber ?? "").trim();
  if (!/^\+?\d[\d\s-]{6,19}$/.test(phone)) throw new Error("INVALID_PHONE");

  const db = await getDb();
  await db.collection(CONFIG).doc(PRICING_DOC).set(
    {
      prices: { free: 0, ...clean },
      telebirrNumber: phone,
      updatedAt: Date.now(),
      updatedBy: adminEmail,
    },
    { merge: true }
  );

  return getEffectivePricing();
}
