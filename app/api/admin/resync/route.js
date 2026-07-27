import { requireAdmin } from "@/lib/firebase/session.js";
import { resyncRedis } from "@/lib/api/keys.js";

export const runtime = "nodejs";

/**
 * POST /api/admin/resync — rebuilds the Redis key mirror from Firestore.
 * Needed if the Redis database is ever flushed or replaced, since the edge auth
 * path reads only from Redis and every key would otherwise stop working.
 */
export async function POST() {
  try {
    await requireAdmin();
    const count = await resyncRedis();
    return Response.json({ ok: true, synced: count });
  } catch (err) {
    if (err.message === "UNAUTHENTICATED") return Response.json({ error: "Sign in required." }, { status: 401 });
    if (err.message === "FORBIDDEN") return Response.json({ error: "Admins only." }, { status: 403 });
    console.error("[admin] resync", err);
    return Response.json({ error: "Resync failed." }, { status: 500 });
  }
}
