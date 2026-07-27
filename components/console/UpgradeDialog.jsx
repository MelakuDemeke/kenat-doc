"use client";

import { useState } from "react";
import { FiX, FiCopy, FiCheck, FiSmartphone, FiAlertCircle } from "react-icons/fi";
import { PRICING, TELEBIRR_NUMBER, CURRENCY } from "@/lib/api/pricing.js";

/**
 * Telebirr has no API we can verify against, so this collects a claim: the user
 * transfers, then submits the transaction ID. The plan changes only when an admin
 * confirms the transfer on their phone. The copy says so plainly — a user who
 * expects instant access and does not get it will assume the payment failed.
 */
export function UpgradeDialog({ planId, onClose, onSubmitted }) {
  const plan = PRICING[planId];
  const [txnId, setTxnId] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    await navigator.clipboard.writeText(TELEBIRR_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/console/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId, txnId, payerPhone, note }),
    });
    const body = await res.json();

    if (res.ok) {
      onSubmitted(body.request);
    } else {
      setError(body.error);
      setSubmitting(false);
    }
  }

  const field =
    "w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-zinc-900/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div>
            <h2 id="upgrade-title" className="text-lg font-semibold text-zinc-900 dark:text-white">
              Upgrade to {plan.label}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              <span className="font-mono tabular-nums">{plan.priceETB.toLocaleString()} {CURRENCY}</span> a month
              · {plan.quota.toLocaleString()} requests
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>

        <ol className="px-6 space-y-4">
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold grid place-items-center shrink-0">
              1
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Send {plan.priceETB.toLocaleString()} {CURRENCY} on Telebirr
              </p>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <FiSmartphone size={16} className="text-zinc-400 shrink-0" />
                <code className="flex-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                  {TELEBIRR_NUMBER}
                </code>
                <button
                  onClick={copyNumber}
                  aria-label="Copy Telebirr number"
                  className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copied ? <FiCheck size={14} className="text-emerald-500" /> : <FiCopy size={14} />}
                </button>
              </div>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold grid place-items-center shrink-0">
              2
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Submit the transaction ID below
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                It is in the SMS Telebirr sends after the transfer.
              </p>
            </div>
          </li>
        </ol>

        <form onSubmit={submit} className="px-6 pt-4 pb-6 space-y-3">
          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Transaction ID <span className="text-rose-500">*</span>
            </span>
            <input
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              required
              minLength={6}
              maxLength={40}
              placeholder="e.g. CH240728ABCD"
              className={`${field} font-mono`}
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Phone you paid from
            </span>
            <input
              value={payerPhone}
              onChange={(e) => setPayerPhone(e.target.value)}
              maxLength={20}
              placeholder="+2519…"
              className={`${field} font-mono`}
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Note <span className="text-zinc-400">(optional)</span>
            </span>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              placeholder="Anything we should know"
              className={field}
            />
          </label>

          {error && (
            <p className="flex gap-2 text-sm text-rose-600 dark:text-rose-400" role="alert">
              <FiAlertCircle size={15} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || txnId.trim().length < 6}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? "Submitting…" : "Submit for review"}
          </button>

          <p className="text-xs text-zinc-500 text-center">
            Payments are confirmed by hand, usually within a day. Your plan changes once the
            transfer is verified — not immediately.
          </p>
        </form>
      </div>
    </div>
  );
}
