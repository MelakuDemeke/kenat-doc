import "server-only";

import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/firebase/admin.js";
import { hashKey, Plans } from "./auth.js";
import { isConfigured, pipeline } from "./redis.js";

/**
 * Firestore is the source of truth; Redis is the copy the edge middleware reads.
 * The API request path never touches Firestore — firebase-admin cannot run on the
 * edge runtime, and a Firestore read per request would be slow and costly anyway.
 */
const KEYS = "apiKeys";
const USERS = "users";

/** `key:<sha256>` -> {uid, plan}. No TTL: this is a mirror, not a cache. */
const redisKey = (hash) => `key:${hash}`;

function generateSecret(live) {
  return `sk_${live ? "live" : "test"}_${randomBytes(24).toString("base64url")}`;
}

/**
 * Creates a key and returns the plaintext secret — the only time it is ever
 * available. Only the hash is stored, so a database leak does not expose
 * working credentials.
 */
export async function createKey({ uid, email, name = "Default key", plan = "free", live = true }) {
  const secret = generateSecret(live);
  const hash = await hashKey(secret);

  const record = {
    uid,
    email,
    name,
    plan,
    // A non-secret fragment so users can tell their keys apart in the UI.
    prefix: `${secret.slice(0, 12)}...`,
    createdAt: Date.now(),
    lastUsedAt: null,
    revoked: false,
  };

  await (await getDb()).collection(KEYS).doc(hash).set(record);
  await mirrorToRedis(hash, { uid, plan });

  return { secret, key: { id: hash, ...record } };
}

/**
 * Pushes a key into the store the edge reads.
 * `expiresAt` travels with it so the request path can downgrade a lapsed paid plan
 * on its own — no scheduled job has to run for expiry to take effect.
 */
async function mirrorToRedis(hash, value) {
  if (!isConfigured) return;
  await pipeline([["SET", redisKey(hash), JSON.stringify(value)]]);
}

async function removeFromRedis(hash) {
  if (!isConfigured) return;
  await pipeline([["DEL", redisKey(hash)]]);
}

export async function listKeysForUser(uid) {
  const snap = await (await getDb()).collection(KEYS).where("uid", "==", uid).get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => b.createdAt - a.createdAt);
}

/** Revokes in both stores. Redis first, so a revoked key stops working immediately. */
export async function revokeKey({ uid, keyId, asAdmin = false }) {
  const ref = (await getDb()).collection(KEYS).doc(keyId);
  const doc = await ref.get();
  if (!doc.exists) return false;
  if (!asAdmin && doc.data().uid !== uid) return false;

  await removeFromRedis(keyId);
  await ref.update({ revoked: true, revokedAt: Date.now() });
  return true;
}

/** Called on sign-in so the admin dashboard has a user list to show. */
export async function upsertUser({ uid, email, name, picture }) {
  const ref = (await getDb()).collection(USERS).doc(uid);
  const existing = await ref.get();

  if (!existing.exists) {
    await ref.set({ uid, email, name, picture, plan: "free", createdAt: Date.now(), lastSeenAt: Date.now() });
  } else {
    await ref.update({ email, name, picture, lastSeenAt: Date.now() });
  }
}

export async function listUsers() {
  const snap = await (await getDb()).collection(USERS).get();
  return snap.docs.map((d) => d.data()).sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Admin action: move a user (and all their live keys) onto a different plan.
 *
 * `expiresAt` is a timestamp in ms, or null for a plan that does not lapse. The free
 * plan never carries one — there is nothing to fall back to.
 */
export async function setUserPlan(uid, plan, expiresAt = null) {
  if (!Plans[plan]) throw new Error(`Unknown plan: ${plan}`);
  const expiry = plan === "free" ? null : expiresAt;

  const db = await getDb();
  await db.collection(USERS).doc(uid).update({
    plan,
    planUpdatedAt: Date.now(),
    planExpiresAt: expiry,
  });

  const snap = await db.collection(KEYS).where("uid", "==", uid).where("revoked", "==", false).get();
  await Promise.all(
    snap.docs.map(async (doc) => {
      await doc.ref.update({ plan, expiresAt: expiry });
      await mirrorToRedis(doc.id, { uid, plan, expiresAt: expiry });
    })
  );
  return snap.size;
}

/**
 * Billing is manual for now: the admin records what was invoiced and what cleared.
 * Kept on the user record so it survives key rotation.
 */
export const BILLING_STATES = ["unbilled", "invoiced", "paid", "overdue"];

export async function setUserBilling(uid, { status, note }) {
  if (status && !BILLING_STATES.includes(status)) throw new Error(`Unknown billing status: ${status}`);

  const patch = { billingUpdatedAt: Date.now() };
  if (status) patch.billingStatus = status;
  if (note !== undefined) patch.billingNote = String(note).slice(0, 500);

  await (await getDb()).collection(USERS).doc(uid).update(patch);
}

/**
 * Rebuilds the Redis mirror from Firestore. Redis holds no TTL on key records, but
 * if the database is ever flushed or replaced, every key would stop authenticating
 * until this runs.
 */
export async function resyncRedis() {
  const snap = await (await getDb()).collection(KEYS).where("revoked", "==", false).get();
  await Promise.all(
    snap.docs.map((doc) =>
      mirrorToRedis(doc.id, {
        uid: doc.data().uid,
        plan: doc.data().plan,
        expiresAt: doc.data().expiresAt ?? null,
      })
    )
  );
  return snap.size;
}
