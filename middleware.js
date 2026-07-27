import { NextResponse } from "next/server";
import { authenticate } from "@/lib/api/auth.js";
import { enforce } from "@/lib/api/ratelimit.js";
import { fail } from "@/lib/api/respond.js";

/**
 * Auth and rate limiting run once here rather than in every route handler, so the
 * handlers stay pure request -> kenat -> response. The resolved identity is passed
 * down as request headers, which is the only channel middleware has to a handler.
 *
 * Runs on the edge runtime, so everything it touches must be edge-safe — notably
 * this path reads keys from Redis, never from firebase-admin.
 */
export async function middleware(req) {
  try {
    const { keyId, uid, plan, lapsed } = await authenticate(req);
    // Counters are keyed by the key itself, so one user's two keys get separate
    // burst allowances but both roll up to the same account in the dashboard.
    const limitHeaders = await enforce(keyId, plan);

    const headers = new Headers(req.headers);
    headers.set("x-kenat-key-id", keyId);
    headers.set("x-kenat-uid", uid);
    headers.set("x-kenat-plan", plan.name);

    const res = NextResponse.next({ request: { headers } });
    for (const [key, value] of Object.entries(limitHeaders)) res.headers.set(key, value);
    // Tells a caller why their limits dropped, instead of leaving them to guess.
    if (lapsed) res.headers.set("X-Plan-Lapsed", "true");
    return res;
  } catch (err) {
    return fail(err);
  }
}

/** Only the versioned API is gated; docs, tools, console and blog stay public. */
export const config = {
  matcher: "/api/v1/:path*",
};
