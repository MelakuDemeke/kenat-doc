import { ApiError } from "./errors.js";
import { isConfigured, pipeline } from "./redis.js";

/**
 * Plan definitions. `limit` is requests per `windowMs`; `monthlyQuota` is what the
 * plan is actually sold on. Boolean fields gate features via `requirePlan()`.
 */
export const Plans = {
  free: { name: "free", limit: 60, windowMs: 60_000, monthlyQuota: 1_000, bulk: false },
  pro: { name: "pro", limit: 600, windowMs: 60_000, monthlyQuota: 100_000, bulk: true },
  business: { name: "business", limit: 3_000, windowMs: 60_000, monthlyQuota: 2_000_000, bulk: true },
};

/** SHA-256 via Web Crypto — available on both the edge and Node runtimes. */
export async function hashKey(key) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Development fallback: keys defined inline as KENAT_API_KEYS="sk_x:pro,sk_y:free".
 * Lets the API be exercised with curl before Firebase and Redis are provisioned.
 */
async function lookupInEnv(presentedHash) {
  const configured = process.env.KENAT_API_KEYS;
  if (!configured) return null;

  for (const entry of configured.split(",")) {
    const [key, plan = "free"] = entry.trim().split(":");
    if (!key) continue;
    if ((await hashKey(key)) === presentedHash) {
      return { uid: "env", plan: Plans[plan] ?? Plans.free };
    }
  }
  return null;
}

/**
 * Real keys live in Firestore but are mirrored into Redis at creation time, because
 * firebase-admin cannot run on the edge runtime where this executes. Redis holds no
 * TTL on these records — it is a mirror, not a cache — so a miss means the key was
 * revoked or the mirror needs a resync from the admin dashboard.
 */
async function lookupInRedis(presentedHash) {
  if (!isConfigured) return null;

  const [raw] = await pipeline([["GET", `key:${presentedHash}`]]);
  if (!raw) return null;

  const { uid, plan } = typeof raw === "string" ? JSON.parse(raw) : raw;
  return { uid, plan: Plans[plan] ?? Plans.free };
}

/**
 * Extracts and validates the bearer token.
 * @returns {Promise<{keyId:string, uid:string, plan:object}>} keyId is the key's
 *   SHA-256 — safe to log and to use as a rate-limit identifier, unlike the secret.
 */
export async function authenticate(req) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token) throw new ApiError("MISSING_API_KEY");

  const presentedHash = await hashKey(token);
  const record = (await lookupInRedis(presentedHash)) ?? (await lookupInEnv(presentedHash));
  if (!record) throw new ApiError("INVALID_API_KEY");

  return { keyId: presentedHash, uid: record.uid, plan: record.plan };
}

/** Guards plan-only features, e.g. bulk endpoints on free. */
export function requirePlan(plan, feature) {
  if (!plan[feature]) {
    throw new ApiError("PLAN_REQUIRED", `The \`${feature}\` feature requires a paid plan. You are on \`${plan.name}\`.`);
  }
}
