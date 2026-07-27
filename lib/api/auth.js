import { ApiError } from "./errors.js";

/**
 * Plan definitions. `limit` is requests per `windowMs`; `null` features are gated
 * per-endpoint via `requirePlan()`.
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
 * The one place that knows where keys live. Phase 1 reads them from an env var so
 * the API is testable with curl before any database exists; swapping this body for
 * a KV/Postgres lookup is the only change needed to go multi-tenant.
 *
 * Env format: KENAT_API_KEYS="sk_test_abc:pro,sk_test_xyz:free"
 */
async function lookupKey(presented) {
  const configured = process.env.KENAT_API_KEYS;
  if (!configured) return null;

  const presentedHash = await hashKey(presented);
  for (const entry of configured.split(",")) {
    const [key, plan = "free"] = entry.trim().split(":");
    if (!key) continue;
    // Hash both sides so the comparison is constant-length regardless of input.
    if ((await hashKey(key)) === presentedHash) {
      // Must stay ASCII: this is forwarded as an HTTP header, which is a ByteString.
      return { keyId: `${key.slice(0, 11)}...`, plan: Plans[plan] ?? Plans.free };
    }
  }
  return null;
}

/** Extracts and validates the bearer token. Throws ApiError on any failure. */
export async function authenticate(req) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token) throw new ApiError("MISSING_API_KEY");

  const record = await lookupKey(token);
  if (!record) throw new ApiError("INVALID_API_KEY");
  return record;
}

/** Guards plan-only features, e.g. bulk endpoints on free. */
export function requirePlan(plan, feature) {
  if (!plan[feature]) {
    throw new ApiError("PLAN_REQUIRED", `The \`${feature}\` feature requires a paid plan. You are on \`${plan.name}\`.`);
  }
}
