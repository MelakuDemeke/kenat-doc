"use client";

import { useEffect, useMemo, useState } from "react";
import { FiRefreshCw, FiChevronDown, FiSearch } from "react-icons/fi";

const PLANS = ["free", "pro", "business"];
const BILLING = ["unbilled", "invoiced", "paid", "overdue"];

const QUOTA = { free: 1_000, pro: 100_000, business: 2_000_000 };

const PLAN_STYLE = {
  free: "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800",
  pro: "text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40",
  business: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/40",
};

const BILLING_STYLE = {
  unbilled: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800",
  invoiced: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40",
  paid: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40",
  overdue: "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40",
};

function Pill({ children, className }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium capitalize ${className}`}>
      {children}
    </span>
  );
}

/**
 * Six months of request counts as a shape rather than six columns of digits. The
 * trend is the thing an admin reads at a glance; the exact number for March is not.
 */
function Sparkline({ values, label }) {
  const max = Math.max(...values, 1);
  const w = 96;
  const h = 26;
  const step = values.length > 1 ? w / (values.length - 1) : w;

  const points = values.map((v, i) => [i * step, h - (v / max) * (h - 3) - 1.5]);
  const path = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];
  const allZero = values.every((v) => v === 0);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="overflow-visible">
      {allZero ? (
        <line x1="0" y1={h - 1.5} x2={w} y2={h - 1.5} className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" strokeDasharray="2 3" />
      ) : (
        <>
          <polyline points={path} fill="none" className="stroke-sky-500" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={lastX} cy={lastY} r="2.5" className="fill-sky-500" />
        </>
      )}
    </svg>
  );
}

function QuotaBar({ used, quota }) {
  const ratio = Math.min(100, (used / quota) * 100);
  const tone = ratio > 90 ? "bg-rose-500" : ratio > 70 ? "bg-amber-500" : "bg-sky-500";
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
          {used.toLocaleString()}
        </span>
        <span className="text-[10px] font-mono text-zinc-400">/ {quota.toLocaleString()}</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${ratio}%` }} />
      </div>
    </div>
  );
}

function UserCard({ user, periods, onPatch }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(user.plan ?? "free");
  const [status, setStatus] = useState(user.billingStatus ?? "unbilled");
  const [note, setNote] = useState(user.billingNote ?? "");
  const [saving, setSaving] = useState(false);

  const dirty =
    plan !== (user.plan ?? "free") ||
    status !== (user.billingStatus ?? "unbilled") ||
    note !== (user.billingNote ?? "");

  async function save() {
    setSaving(true);
    await onPatch({ uid: user.uid, plan, billingStatus: status, billingNote: note });
    setSaving(false);
  }

  // recentPeriods returns newest first; a chart reads left to right through time.
  const series = [...periods].reverse().map((p) => user.usage?.[p] ?? 0);
  const quota = QUOTA[user.plan ?? "free"];

  const field =
    "w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40";

  return (
    <li className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <div className="flex items-center gap-4 px-4 py-3.5 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {user.picture ? (
            <img src={user.picture} alt="" className="w-8 h-8 rounded-full shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
              {user.name || user.email}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>

        <div className="hidden md:block shrink-0" title="Requests over the last 6 months">
          <Sparkline values={series} label={`Usage trend for ${user.email}`} />
        </div>

        <div className="w-32 shrink-0">
          <QuotaBar used={user.currentUsage ?? 0} quota={quota} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Pill className={PLAN_STYLE[user.plan ?? "free"]}>{user.plan ?? "free"}</Pill>
          <Pill className={BILLING_STYLE[user.billingStatus ?? "unbilled"]}>
            {user.billingStatus ?? "unbilled"}
          </Pill>
          <span className="text-xs font-mono text-zinc-400 w-8 text-right" title="Active keys">
            {user.keyCount}🔑
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} settings for ${user.email}`}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-sky-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FiChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-1 bg-zinc-50/70 dark:bg-zinc-950/40 border-t border-zinc-200/70 dark:border-zinc-800/70">
          <div className="grid gap-3 sm:grid-cols-[10rem_10rem_1fr_auto] sm:items-end pt-3">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Plan</span>
              <select value={plan} onChange={(e) => setPlan(e.target.value)} className={`${field} cursor-pointer`}>
                {PLANS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Billing</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${field} cursor-pointer`}>
                {BILLING.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Note</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Invoice reference, payment date, anything worth remembering"
                maxLength={500}
                className={field}
              />
            </label>

            <button
              onClick={save}
              disabled={!dirty || saving}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>

          <p className="mt-3 text-[11px] text-zinc-500">
            Changing the plan re-mirrors every live key immediately, so new limits apply on the next request.
          </p>
        </div>
      )}
    </li>
  );
}

function Stat({ label, value, hint }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="text-xl font-semibold text-zinc-900 dark:text-white tabular-nums">{value}</p>
      {hint && <p className="text-[11px] text-zinc-400">{hint}</p>}
    </div>
  );
}

export function AdminPanel() {
  const [data, setData] = useState({ users: [], periods: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [query, setQuery] = useState("");

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
    setMessage(res.ok ? "Saved." : `Could not save: ${(await res.json()).error}`);
    if (res.ok) await load();
    setTimeout(() => setMessage(null), 3000);
  }

  async function resync() {
    setMessage("Rebuilding the Redis mirror…");
    const res = await fetch("/api/admin/resync", { method: "POST" });
    const body = await res.json();
    setMessage(res.ok ? `Mirrored ${body.synced} keys.` : `Resync failed: ${body.error}`);
    setTimeout(() => setMessage(null), 4000);
  }

  const { users, periods } = data;

  // Busiest accounts first — that is who an admin is looking for.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users
      .filter((u) => !q || u.email?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q))
      .sort((a, b) => (b.currentUsage ?? 0) - (a.currentUsage ?? 0));
  }, [users, query]);

  const totalThisMonth = users.reduce((sum, u) => sum + (u.currentUsage ?? 0), 0);
  const paying = users.filter((u) => u.plan && u.plan !== "free").length;
  const owed = users.filter((u) => ["invoiced", "overdue"].includes(u.billingStatus)).length;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="flex gap-8">
          <Stat label="Users" value={users.length} hint={`${paying} on a paid plan`} />
          <Stat label="Requests" value={totalThisMonth.toLocaleString()} hint="this month" />
          <Stat label="Awaiting payment" value={owed} hint="invoiced or overdue" />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name or email"
              className="pl-8 pr-3 py-2 w-56 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <button
            onClick={resync}
            title="Rebuild the Redis key mirror from Firestore"
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-sky-500/60 transition-colors cursor-pointer"
          >
            <FiRefreshCw size={14} /> Resync
          </button>
        </div>
      </div>

      {message && (
        <p className="text-sm text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-lg px-3 py-2">
          {message}
        </p>
      )}

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-lg overflow-hidden">
        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500">
            {visible.length} {visible.length === 1 ? "account" : "accounts"}
          </p>
          {periods.length > 0 && (
            <p className="hidden md:block text-[11px] font-mono text-zinc-400">
              {periods[periods.length - 1]} → {periods[0]}
            </p>
          )}
        </div>

        {loading ? (
          <p className="px-4 py-8 text-sm text-zinc-500">Loading accounts…</p>
        ) : visible.length === 0 ? (
          <p className="px-4 py-8 text-sm text-zinc-500">
            {users.length === 0
              ? "No one has signed up yet. The first account will appear here."
              : "No account matches that filter."}
          </p>
        ) : (
          <ul>
            {visible.map((user) => (
              <UserCard key={user.uid} user={user} periods={periods} onPatch={patch} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
