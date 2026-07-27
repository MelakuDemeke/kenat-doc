import { ApiError, fromKenatError } from "./errors.js";

/**
 * Every successful response is `{ data, meta }`; every failure is `{ error }`.
 * Keeping the envelope in one place means adding a meta field later is not a
 * per-route edit.
 */
export function ok(data, { meta = {}, cache, headers: extra } = {}) {
  const headers = { "Content-Type": "application/json", ...(extra ?? {}) };
  if (cache) headers["Cache-Control"] = cache;
  return new Response(JSON.stringify({ data, meta }), { status: 200, headers });
}

export function fail(err) {
  const apiError = err instanceof ApiError ? err : fromKenatError(err);
  // A 500 means we failed to anticipate something — never let it vanish silently.
  if (apiError.status >= 500) console.error("[api] unhandled", err);
  return new Response(JSON.stringify(apiError.toJSON()), {
    status: apiError.status,
    // e.g. rate-limit errors attach Retry-After / X-RateLimit-* headers.
    headers: { "Content-Type": "application/json", ...(apiError.headers ?? {}) },
  });
}

/**
 * Deterministic results (a conversion, a past year's holidays) are safe to cache
 * hard at the edge. Holiday data for the current/future year gets a short TTL so
 * a late-announced Eid date propagates the same day it is published.
 */
export const Cache = {
  IMMUTABLE: "public, max-age=31536000, immutable",
  DAY: "public, max-age=86400, stale-while-revalidate=604800",
  HOUR: "public, max-age=3600, stale-while-revalidate=86400",
  NONE: "no-store",
};

/** Wraps a handler so thrown ApiError/kenat errors become proper JSON responses. */
export function handler(fn) {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      return fail(err);
    }
  };
}
