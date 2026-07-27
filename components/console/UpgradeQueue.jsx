"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiX, FiCopy, FiInbox, FiRefreshCw } from "react-icons/fi";
import { CURRENCY } from "@/lib/api/pricing.js";

const STATUS_STYLE = {
  pending: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40",
  approved: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40",
  rejected: "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40",
};

function when(ts) {
  return new Date(ts).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

function RequestRow({ request, onReview }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(null);
  const [copied, setCopied] = useState(false);
  const isPending = request.status === "pending";

  async function act(status) {
    if (status === "approved" && !confirm(`Approve ${request.email} onto ${request.plan}? Their limits change immediately.`)) return;
    setBusy(status);
    await onReview({ id: request.id, status, adminNote: note });
    setBusy(null);
  }

  return (
    <li className="px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
              {request.name || request.email}
            </p>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize ${STATUS_STYLE[request.status]}`}>
              {request.status}
            </span>
          </div>
          <p className="text-xs text-zinc-500 truncate">{request.email}</p>

          <div className="mt-2 flex items-center gap-2">
            {/* The transaction ID is what gets matched against the Telebirr SMS. */}
            <code className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 font-mono text-xs text-zinc-900 dark:text-zinc-100">
              {request.txnId}
            </code>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(request.txnId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              aria-label="Copy transaction ID"
              className="p-1 rounded text-zinc-400 hover:text-sky-600 transition-colors cursor-pointer"
            >
              {copied ? <FiCheck size={13} className="text-emerald-500" /> : <FiCopy size={13} />}
            </button>
          </div>

          {request.payerPhone && (
            <p className="mt-1 text-xs text-zinc-500">
              Paid from <span className="font-mono">{request.payerPhone}</span>
            </p>
          )}
          {request.note && (
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 italic">“{request.note}”</p>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-sm font-mono tabular-nums text-zinc-900 dark:text-white">
            {request.amountETB?.toLocaleString()} {CURRENCY}
          </p>
          <p className="text-xs capitalize text-zinc-500">{request.plan}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{when(request.createdAt)}</p>
        </div>
      </div>

      {isPending ? (
        <div className="mt-3 flex gap-2 flex-wrap">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note (optional)"
            maxLength={300}
            className="flex-1 min-w-[10rem] px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
          <button
            onClick={() => act("approved")}
            disabled={busy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors disabled:opacity-40 cursor-pointer"
          >
            <FiCheck size={13} /> {busy === "approved" ? "Approving…" : "Approve"}
          </button>
          <button
            onClick={() => act("rejected")}
            disabled={busy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-rose-500 hover:text-rose-600 text-xs font-medium transition-colors disabled:opacity-40 cursor-pointer"
          >
            <FiX size={13} /> Reject
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-zinc-400">
          {request.status} by {request.reviewedBy} · {when(request.reviewedAt)}
          {request.adminNote ? ` · ${request.adminNote}` : ""}
        </p>
      )}
    </li>
  );
}

export function UpgradeQueue() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/upgrades");
    if (res.ok) setRequests((await res.json()).requests);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function review(body) {
    const res = await fetch("/api/admin/upgrades", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    setMessage(res.ok ? `Request ${body.status}.` : `Failed: ${result.error}`);
    if (res.ok) await load();
    setTimeout(() => setMessage(null), 3000);
  }

  const pending = requests.filter((r) => r.status === "pending");
  const visible = showAll ? requests : pending;

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Payment requests
            {pending.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-semibold align-middle">
                {pending.length} waiting
              </span>
            )}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Match the transaction ID against your Telebirr messages, then approve.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-sky-500/60 transition-colors cursor-pointer"
          >
            {showAll ? "Pending only" : `All (${requests.length})`}
          </button>
          <button
            onClick={load}
            aria-label="Refresh requests"
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-sky-500/60 transition-colors cursor-pointer"
          >
            <FiRefreshCw size={14} />
          </button>
        </div>
      </div>

      {message && (
        <p className="mb-3 text-sm text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-lg px-3 py-2">
          {message}
        </p>
      )}

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-lg overflow-hidden">
        {loading ? (
          <p className="px-4 py-8 text-sm text-zinc-500">Loading requests…</p>
        ) : visible.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <FiInbox size={22} className="mx-auto mb-2 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm text-zinc-500">
              {requests.length === 0 ? "No payment requests yet." : "Nothing waiting. All caught up."}
            </p>
          </div>
        ) : (
          <ul>
            {visible.map((r) => (
              <RequestRow key={r.id} request={r} onReview={review} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
