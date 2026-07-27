import { ApiError } from "./errors.js";
import { isConfigured, pipeline } from "./redis.js";

/**
 * Two counters are maintained per request:
 *   rl:<id>:<window>   burst control, resets every `windowMs`
 *   usage:<id>:<YYYY-MM>  monthly quota, the number a plan is actually sold on
 *
 * Both are incremented in a single Upstash pipeline so the whole check costs one
 * network round trip.
 */

/** Local fallback, used only when Upstash is not configured (i.e. local dev). */
const memory = new Map();

function memoryHit(key, ttlMs) {
  const now = Date.now();
  if (memory.size > 10_000) {
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
  }
  let bucket = memory.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + ttlMs };
    memory.set(key, bucket);
  }
  bucket.count += 1;
  return bucket.count;
}

/** Calendar month, so quotas line up with billing periods. */
function currentPeriod(now) {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Seconds until the end of the current UTC month, for the quota key's TTL. */
function secondsUntilMonthEnd(now) {
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1);
  return Math.ceil((next - now.getTime()) / 1000);
}

/**
 * Increments both counters and returns their values.
 * Falls back to per-instance memory when Upstash is absent.
 */
async function count(identifier, { windowMs }, now) {
  const windowStart = Math.floor(now.getTime() / windowMs) * windowMs;
  const rlKey = `rl:${identifier}:${windowStart}`;
  const usageKey = `usage:${identifier}:${currentPeriod(now)}`;
  const windowSeconds = Math.ceil(windowMs / 1000);

  if (!isConfigured) {
    return {
      requests: memoryHit(rlKey, windowMs),
      used: memoryHit(usageKey, secondsUntilMonthEnd(now) * 1000),
      resetAt: windowStart + windowMs,
      degraded: true,
    };
  }

  const [requests, , used] = await pipeline([
    ["INCR", rlKey],
    ["EXPIRE", rlKey, String(windowSeconds)],
    ["INCR", usageKey],
    ["EXPIRE", usageKey, String(secondsUntilMonthEnd(now))],
  ]);

  return { requests, used, resetAt: windowStart + windowMs, degraded: false };
}

/**
 * Applies burst limit and monthly quota.
 *
 * On a Redis outage this fails **open**: a paying customer losing service because
 * our counter store blipped is worse than a few uncounted requests. The error is
 * logged so the gap is visible.
 *
 * @returns {Promise<Record<string,string>>} headers to echo on the response
 */
export async function enforce(identifier, plan) {
  const now = new Date();
  let stats;

  try {
    stats = await count(identifier, plan, now);
  } catch (err) {
    console.error("[api] rate limit store unavailable, failing open", err);
    return { "X-RateLimit-Limit": String(plan.limit), "X-RateLimit-Bypassed": "store-unavailable" };
  }

  const { requests, used, resetAt, degraded } = stats;
  const resetSeconds = Math.ceil(resetAt / 1000);
  const headers = {
    "X-RateLimit-Limit": String(plan.limit),
    "X-RateLimit-Remaining": String(Math.max(0, plan.limit - requests)),
    "X-RateLimit-Reset": String(resetSeconds),
    "X-Quota-Limit": String(plan.monthlyQuota),
    "X-Quota-Remaining": String(Math.max(0, plan.monthlyQuota - used)),
  };
  // Signals that the numbers above are per-instance and not authoritative.
  if (degraded) headers["X-RateLimit-Degraded"] = "no-shared-store";

  if (used > plan.monthlyQuota) {
    const err = new ApiError(
      "QUOTA_EXCEEDED",
      `Monthly quota of ${plan.monthlyQuota.toLocaleString()} requests exhausted on the \`${plan.name}\` plan.`
    );
    err.headers = { ...headers, "X-Quota-Remaining": "0" };
    throw err;
  }

  if (requests > plan.limit) {
    const err = new ApiError("RATE_LIMITED");
    err.headers = {
      ...headers,
      "X-RateLimit-Remaining": "0",
      "Retry-After": String(Math.max(1, Math.ceil((resetAt - now.getTime()) / 1000))),
    };
    throw err;
  }

  return headers;
}
