import { createSession, destroySession } from "@/lib/firebase/session.js";
import { upsertUser } from "@/lib/api/keys.js";

// firebase-admin is Node-only, so this route must not run on the edge.
export const runtime = "nodejs";

/**
 * POST /api/auth/session — exchanges a client ID token for an httpOnly session
 * cookie. Doing this server-side means the token never has to be re-sent by client
 * JS on every request, and server components can read auth state directly.
 */
export async function POST(req) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return Response.json({ error: "idToken is required" }, { status: 400 });

    const decoded = await createSession(idToken);
    await upsertUser({
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: decoded.name ?? "",
      picture: decoded.picture ?? "",
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[auth] session creation failed", err);
    return Response.json({ error: "Could not create session." }, { status: 401 });
  }
}

/** DELETE /api/auth/session — sign out. */
export async function DELETE() {
  await destroySession();
  return Response.json({ ok: true });
}
