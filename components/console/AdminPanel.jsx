"use client";

import { useEffect, useState } from "react";
import { FiRefreshCw, FiSave } from "react-icons/fi";

const PLANS = ["free", "pro", "business"];
const BILLING = ["unbilled", "invoiced", "paid", "overdue"];

const badge = {
  unbilled: "text-zinc-500 border-zinc-300 dark:border-zinc-700",
  invoiced: "text-amber-600 border-amber-300 dark:border-amber-700",
  paid: "text-green-600 border-green-300 dark:border-green-700",
  overdue: "text-red-600 border-red-300 dark:border-red-700",
};

/** Billing is manual: this records what was invoiced and what cleared. */
function UserRow({ user, periods, onPatch }) {
  const [plan, setPlan] = useState(user.plan ?? "free");
  const [status, setStatus] = useState(user.billingStatus ?? "unbilled");
  const [note, setNote] = useState(user.billingNote ?? "");
  const [saving, setSaving] = useState(false);

  const dirty = plan !== (user.plan ?? "free") || status !== (user.billingStatus ?? "unbilled") || note !== (user.billingNote ?? "");

  async function save() {
    setSaving(true);
    await onPatch({ uid: user.uid, plan, billingStatus: status, billingNote: note });
    setSaving(false);
  }

  const select =
    "px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer";

  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800 align-top">
      <td className="py-3 pr-4">
        <p className="font-medium text-sm text-zinc-900 dark:text-white">{user.name || "—"}</p>
        <p className="text-xs text-zinc-500 break-all">{user.email}</p>
      </td>
      <td className="py-3 pr-4 text-center text-sm font-mono">{user.keyCount}</td>
      {periods.map((p) => (
        <td key={p} className="py-3 pr-4 text-right text-sm font-mono tabular-nums">
          {(user.usage?.[p] ?? 0).toLocaleString()}
        </td>
      ))}
      <td className="py-3 pr-4">
        <select value={plan} onChange={(e) => setPlan(e.target.value)} className={select}>
          {PLANS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`${select} border ${badge[status] ?? ""}`}
        >
          {BILLING.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-4">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="invoice ref / note"
          maxLength={500}
          className="w-40 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
      </td>
      <td className="py-3">
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiSave size={12} /> {saving ? "…" : "Save"}
        </button>
      </td>
    </tr>
  );
}

export function AdminPanel() {
  const [data, setData] = useState({ users: [], periods: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  async function load() {
    const res = await fetch("/api/admin/users");
    if (res.ok) setData(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function patch(body) {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMessage(res.ok ? "Saved." : `Failed: ${(await res.json()).error}`);
    if (res.ok) await load();
    setTimeout(() => setMessage(null), 3000);
  }

  async function resync() {
    setMessage("Resyncing…");
    const res = await fetch("/api/admin/resync", { method: "POST" });
    const body = await res.json();
    setMessage(res.ok ? `Mirrored ${body.synced} keys into Redis.` : `Failed: ${body.error}`);
    setTimeout(() => setMessage(null), 4000);
  }

  const { users, periods } = data;
  const totalThisMonth = users.reduce((sum, u) => sum + (u.currentUsage ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Users</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{users.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Requests this month</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalThisMonth.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Paying</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {users.filter((u) => u.plan && u.plan !== "free").length}
            </p>
          </div>
        </div>
        <button
          onClick={resync}
          title="Rebuild the Redis key mirror from Firestore"
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <FiRefreshCw size={14} /> Resync keys
        </button>
      </div>

      {message && <p className="text-sm text-sky-600 dark:text-sky-400">{message}</p>}

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl shadow-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-sm text-zinc-500">Loading…</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-sm text-zinc-500">No users have signed up yet.</p>
        ) : (
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                <th className="py-3 px-4 font-medium">User</th>
                <th className="py-3 pr-4 font-medium text-center">Keys</th>
                {periods.map((p) => (
                  <th key={p} className="py-3 pr-4 font-medium text-right font-mono normal-case">{p}</th>
                ))}
                <th className="py-3 pr-4 font-medium">Plan</th>
                <th className="py-3 pr-4 font-medium">Billing</th>
                <th className="py-3 pr-4 font-medium">Note</th>
                <th className="py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="[&>tr>td:first-child]:pl-4">
              {users.map((user) => (
                <UserRow key={user.uid} user={user} periods={periods} onPatch={patch} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
