import "server-only";

import { cookies } from "next/headers";
import { getAdminAuth } from "./admin.js";

export const SESSION_COOKIE = "kenat_session";
const MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

/**
 * The single admin account. Kept as an env var rather than a hardcoded string so it
 * can be changed without a deploy, and compared server-side only — an email check
 * shipped to the browser would be trivially bypassed.
 */
export function isAdminEmail(email) {
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());
  return Boolean(email) && admins.includes(email.toLowerCase());
}

/**
 * Exchanges a freshly-minted client ID token for an httpOnly session cookie, so
 * server components can read auth state without a client round trip.
 */
export async function createSession(idToken) {
  const decoded = await (await getAdminAuth()).verifyIdToken(idToken);

  // Refuse tokens that are not freshly signed in, per Firebase's guidance: it
  // limits the damage if an ID token leaks from client storage.
  if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
    throw new Error("Recent sign-in required.");
  }

  const cookie = await (await getAdminAuth()).createSessionCookie(idToken, { expiresIn: MAX_AGE_MS });
  (await cookies()).set(SESSION_COOKIE, cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_MS / 1000,
  });

  return decoded;
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/**
 * Resolves the signed-in user, or null. `checkRevoked` costs a lookup but means a
 * disabled or signed-out account stops working immediately rather than at expiry.
 * @returns {Promise<{uid:string,email:string,name:string,picture:string,isAdmin:boolean}|null>}
 */
export async function currentUser() {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const claims = await (await getAdminAuth()).verifySessionCookie(cookie, true);
    return {
      uid: claims.uid,
      email: claims.email ?? "",
      name: claims.name ?? "",
      picture: claims.picture ?? "",
      isAdmin: isAdminEmail(claims.email),
    };
  } catch {
    // Expired or revoked — treat as signed out rather than erroring the page.
    return null;
  }
}

/** For route handlers that must not proceed anonymously. */
export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!user.isAdmin) throw new Error("FORBIDDEN");
  return user;
}
