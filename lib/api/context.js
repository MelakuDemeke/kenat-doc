import { Plans } from "./auth.js";

/**
 * Reads the identity that `middleware.js` resolved and forwarded. Handlers should
 * never re-authenticate — if a request reached a handler, it is already authorised.
 */
export function caller(req) {
  const planName = req.headers.get("x-kenat-plan") ?? "free";
  return {
    keyId: req.headers.get("x-kenat-key-id") ?? "unknown",
    plan: Plans[planName] ?? Plans.free,
  };
}
