import { NextResponse } from "next/server";
import { authenticate } from "@/lib/api/auth.js";
import { enforce } from "@/lib/api/ratelimit.js";
import { fail } from "@/lib/api/respond.js";

/**
 * Auth and rate limiting run once here rather than in every route handler, so the
 * handlers stay pure request -> kenat -> response. The resolved identity is passed
 * down as request headers, which is the only channel middleware has to a handler.
 */
export async function middleware(req) {
  try {
    const { keyId, plan } = await authenticate(req);
    const limitHeaders = await enforce(`${keyId}:${plan.name}`, plan);

    const headers = new Headers(req.headers);
    headers.set("x-kenat-key-id", keyId);
    headers.set("x-kenat-plan", plan.name);

    const res = NextResponse.next({ request: { headers } });
    for (const [key, value] of Object.entries(limitHeaders)) res.headers.set(key, value);
    return res;
  } catch (err) {
    return fail(err);
  }
}

/** Only the versioned API is gated; docs, tools and blog stay public. */
export const config = {
  matcher: "/api/v1/:path*",
};
