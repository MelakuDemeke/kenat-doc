import { ApiError } from "./errors.js";

/**
 * PHASE 1 ONLY — a fixed-window counter in module memory.
 *
 * This is per-instance, so on Vercel the effective limit is (limit x number of warm
 * instances) and counters reset on cold start. It is enough to exercise the headers
 * and the 429 path locally, and NOT enough to enforce a paid quota in production.
 * Before charging anyone, replace `hit()` with an Upstash Redis / Durable Object
 * implementation — the signature is designed so nothing else has to change.
 */
const buckets = new Map();

/** Bounds memory growth on long-lived instances. */
function sweep(now) {
  if (buckets.size < 10_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Records one request against `identifier`.
 * @returns {{ count: number, limit: number, remaining: number, resetAt: number }}
 */
export function hit(identifier, { limit, windowMs }) {
  const now = Date.now();
  sweep(now);

  let bucket = buckets.get(identifier);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(identifier, bucket);
  }
  bucket.count += 1;

  return {
    count: bucket.count,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

/**
 * Applies the limit and throws 429 once the window's allowance is used up.
 * Returns headers to echo on the successful response.
 */
export function enforce(identifier, plan) {
  const { count, limit, remaining, resetAt } = hit(identifier, plan);
  const resetSeconds = Math.ceil(resetAt / 1000);

  if (count > limit) {
    const err = new ApiError("RATE_LIMITED");
    err.headers = {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": "0",
      "X-RateLimit-Reset": String(resetSeconds),
      "Retry-After": String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))),
    };
    throw err;
  }

  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(resetSeconds),
  };
}
