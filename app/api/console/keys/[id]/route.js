import { requireUser } from "@/lib/firebase/session.js";
import { revokeKey } from "@/lib/api/keys.js";

export const runtime = "nodejs";

/** DELETE /api/console/keys/:id — revoke. Ownership is enforced inside revokeKey. */
export async function DELETE(_req, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const revoked = await revokeKey({ uid: user.uid, keyId: id });
    if (!revoked) return Response.json({ error: "Key not found." }, { status: 404 });

    return Response.json({ ok: true });
  } catch (err) {
    if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
    console.error("[console] revoke", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
