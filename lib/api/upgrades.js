import "server-only";

import { getDb } from "@/lib/firebase/admin.js";
import { setUserPlan, setUserBilling } from "./keys.js";
import { PRICING, PAID_PLANS } from "./pricing.js";

const UPGRADES = "upgradeRequests";

export const REQUEST_STATES = ["pending", "approved", "rejected"];

/**
 * Records a claimed Telebirr payment. Nothing is verified automatically — Telebirr
 * has no API here, so a request is a claim until an admin checks their phone and
 * approves it. The plan is not changed at submission time.
 */
export async function submitUpgrade({ uid, email, name, plan, txnId, payerPhone, note }) {
  if (!PAID_PLANS.includes(plan)) throw new Error(`INVALID_PLAN`);

  const cleanTxn = String(txnId ?? "").trim().toUpperCase();
  if (cleanTxn.length < 6) throw new Error("INVALID_TXN");

  const db = await getDb();

  // A transaction ID identifies one payment, so it can only ever back one upgrade.
  // Without this, the same receipt could be submitted repeatedly.
  const duplicate = await db.collection(UPGRADES).where("txnId", "==", cleanTxn).limit(1).get();
  if (!duplicate.empty) throw new Error("DUPLICATE_TXN");

  const pending = await db
    .collection(UPGRADES)
    .where("uid", "==", uid)
    .where("status", "==", "pending")
    .limit(1)
    .get();
  if (!pending.empty) throw new Error("ALREADY_PENDING");

  const record = {
    uid,
    email,
    name: name ?? "",
    plan,
    amountETB: PRICING[plan].priceETB,
    txnId: cleanTxn,
    payerPhone: String(payerPhone ?? "").trim().slice(0, 20),
    note: String(note ?? "").trim().slice(0, 300),
    status: "pending",
    createdAt: Date.now(),
    reviewedAt: null,
    reviewedBy: null,
    adminNote: "",
  };

  const ref = await db.collection(UPGRADES).add(record);
  return { id: ref.id, ...record };
}

export async function listUpgradesForUser(uid) {
  const db = await getDb();
  const snap = await db.collection(UPGRADES).where("uid", "==", uid).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt - a.createdAt);
}

/** Newest first — an admin works through the queue from the top. */
export async function listAllUpgrades() {
  const db = await getDb();
  const snap = await db.collection(UPGRADES).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Approving is the only path that grants a paid plan. It re-mirrors the user's live
 * keys, so the new limits apply from the next request, and marks billing paid so the
 * user list and the request queue agree.
 */
export async function reviewUpgrade({ id, status, adminEmail, adminNote }) {
  if (!["approved", "rejected"].includes(status)) throw new Error("INVALID_STATUS");

  const db = await getDb();
  const ref = db.collection(UPGRADES).doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new Error("NOT_FOUND");

  const request = doc.data();
  if (request.status !== "pending") throw new Error("ALREADY_REVIEWED");

  if (status === "approved") {
    await setUserPlan(request.uid, request.plan);
    await setUserBilling(request.uid, {
      status: "paid",
      note: `Telebirr ${request.txnId} · ${request.amountETB} ETB · ${request.plan}`,
    });
  }

  await ref.update({
    status,
    reviewedAt: Date.now(),
    reviewedBy: adminEmail,
    adminNote: String(adminNote ?? "").slice(0, 300),
  });

  return { ...request, id, status };
}
