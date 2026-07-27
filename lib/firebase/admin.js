import "server-only";

/**
 * Server-side Firebase. Unlike the web config, the service account IS a secret —
 * it bypasses every Firestore rule. It is stored base64-encoded because the JSON's
 * `private_key` contains newlines that do not survive env vars intact.
 *
 * firebase-admin is imported lazily rather than at module scope for two reasons:
 * it is Node-only (so it must never be pulled into an edge bundle), and `next build`
 * evaluates route modules while collecting page data — a top-level import makes the
 * build fail on firebase-admin's ESM-only `jose` dependency.
 *
 * Any route importing this must not declare `runtime = "edge"`.
 */
let appPromise;

function credentials(cert) {
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (!encoded) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_B64 is not set. Generate a service account key in " +
        "Firebase Console > Project settings > Service accounts, then run: " +
        "base64 -w0 service-account.json"
    );
  }
  return cert(JSON.parse(Buffer.from(encoded, "base64").toString("utf8")));
}

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const { initializeApp, getApps, cert } = await import("firebase-admin/app");
      return getApps().length ? getApps()[0] : initializeApp({ credential: credentials(cert) });
    })();
  }
  return appPromise;
}

export async function getAdminAuth() {
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(await getApp());
}

export async function getDb() {
  const { getFirestore } = await import("firebase-admin/firestore");
  return getFirestore(await getApp());
}
