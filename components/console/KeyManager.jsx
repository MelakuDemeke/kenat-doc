"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Link from "next/link";
import {
  FiCopy, FiTrash2, FiPlus, FiCheck, FiKey, FiLogOut, FiArrowRight, FiTerminal, FiClock,
} from "react-icons/fi";
import { auth } from "@/lib/firebase/client.js";
import { API_BASE } from "@/lib/site.js";
import { PricingCards } from "@/components/pricing/PricingCards.jsx";
import { UpgradeDialog } from "@/components/console/UpgradeDialog.jsx";

const PLAN_STYLE = {
  free: "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800",
  pro: "text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40",
  business: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/40",
};

const panel =
  "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-lg";

function CopyButton({ value, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={label}
      className={`p-2 rounded-lg transition-colors cursor-pointer ${className}`}
    >
      {copied ? <FiCheck size={15} className="text-emerald-500" /> : <FiCopy size={15} />}
    </button>
  );
}

/**
 * The payoff screen. The secret exists in the browser exactly once, so this pairs it
 * with a request that already has the key in it — the shortest path from "signed up"
 * to "it works".
 */
function NewKey({ secret, onDismiss }) {
  const example = `curl -H "Authorization: Bearer ${secret}" \\\n  "${API_BASE}/holidays/2018?tags=public&lang=english"`;

  return (
    <div className="rounded-2xl border border-emerald-300/70 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/20 overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">Your key is ready</h3>
            <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
              Copy it now — this is the only time it is shown. Only its hash is stored.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/60 px-3 py-2">
          <code className="flex-1 font-mono text-xs break-all text-zinc-900 dark:text-zinc-100">{secret}</code>
          <CopyButton
            value={secret}
            label="Copy API key"
            className="text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 shrink-0"
          />
        </div>
      </div>

      <div className="border-t border-emerald-200/70 dark:border-emerald-900/50 px-5 py-4">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-800/70 dark:text-emerald-300/70 mb-2">
          <FiTerminal size={13} /> Try it now
        </p>
        <div className="relative group rounded-lg bg-zinc-900 dark:bg-black/50 border border-emerald-900/40 overflow-hidden">
          <CopyButton
            value={example}
            label="Copy example request"
            className="absolute top-1.5 right-1.5 text-zinc-400 hover:bg-zinc-800 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          />
          <pre className="overflow-x-auto px-3 py-2.5 text-[12px] leading-relaxed">
            <code className="font-mono text-zinc-200">{example}</code>
          </pre>
        </div>
      </div>

      <div className="border-t border-emerald-200/70 dark:border-emerald-900/50 px-5 py-2.5 flex items-center justify-between">
        <Link href="/doc/api" className="text-xs text-emerald-800 dark:text-emerald-300 hover:underline inline-flex items-center gap-1">
          Read the API docs <FiArrowRight size={11} />
        </Link>
        <button onClick={onDismiss} className="text-xs text-emerald-800/70 dark:text-emerald-300/70 hover:underline cursor-pointer">
          I&apos;ve saved it
        </button>
      </div>
    </div>
  );
}

/**
 * Expiry is enforced at the edge, so a lapsed plan is already back on free limits.
 * Saying so plainly beats letting someone discover it through a 429.
 */
function renewalState(plan, expiresAt) {
  if (!expiresAt || plan.name === "free") return null;
  const days = Math.ceil((expiresAt - Date.now()) / 86_400_000);
  const on = new Date(expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  if (days < 0) {
    return { tone: "text-rose-600 dark:text-rose-400", message: `Your ${plan.name} plan expired on ${on}. You are on free limits until it is renewed.` };
  }
  if (days <= 7) {
    return { tone: "text-amber-600 dark:text-amber-400", message: `Your ${plan.name} plan ends in ${days} ${days === 1 ? "day" : "days"}, on ${on}. Renew below to keep your limits.` };
  }
  return { tone: "text-zinc-500", message: `${plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} plan renews on ${on}.` };
}

function UsageMeter({ used, plan, expiresAt }) {
  const renewal = renewalState(plan, expiresAt);
  const ratio = Math.min(100, (used / plan.monthlyQuota) * 100);
  const tone = ratio > 90 ? "bg-rose-500" : ratio > 70 ? "bg-amber-500" : "bg-sky-500";

  return (
    <div className={`${panel} px-5 py-4`}>
      <div className="flex items-baseline justify-between mb-2.5">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Requests this month</h2>
        <p className="text-sm font-mono tabular-nums text-zinc-900 dark:text-white">
          {used.toLocaleString()}
          <span className="text-zinc-400"> / {plan.monthlyQuota.toLocaleString()}</span>
        </p>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${tone}`} style={{ width: `${ratio}%` }} />
      </div>
      <p className="mt-2.5 text-xs text-zinc-500">
        Up to {plan.limit.toLocaleString()} requests a minute. Resets on the 1st, UTC.
      </p>
      {renewal && (
        <p className={`mt-1.5 text-xs ${renewal.tone}`}>{renewal.message}</p>
      )}
    </div>
  );
}

/** First run: one thing to do, and nothing competing with it. */
function FirstKey({ onCreate, creating }) {
  return (
    <div className={`${panel} px-6 py-10 text-center`}>
      <div className="w-11 h-11 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 grid place-items-center mx-auto mb-4">
        <FiKey size={20} />
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1.5">Create your first API key</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto mb-6">
        You get 1,000 requests a month on the free plan. No card, and the key works the moment
        it is created.
      </p>
      <button
        onClick={() => onCreate("Default key")}
        disabled={creating}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
      >
        <FiPlus size={16} /> {creating ? "Creating…" : "Create key"}
      </button>
    </div>
  );
}

function KeyRow({ apiKey, onRevoke }) {
  const created = new Date(apiKey.createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <li className="flex items-center gap-4 px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{apiKey.name}</p>
        <p className="font-mono text-xs text-zinc-500 truncate">{apiKey.prefix}</p>
      </div>
      <div className="hidden sm:block text-right shrink-0">
        <p className="text-xs font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
          {(apiKey.usage ?? 0).toLocaleString()}
        </p>
        <p className="text-[11px] text-zinc-400">requests</p>
      </div>
      <p className="hidden md:block text-[11px] text-zinc-400 w-24 text-right shrink-0">{created}</p>
      <button
        onClick={() => onRevoke(apiKey)}
        aria-label={`Revoke ${apiKey.name}`}
        className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer shrink-0"
      >
        <FiTrash2 size={15} />
      </button>
    </li>
  );
}

export function KeyManager({ user, plan, planExpiresAt }) {
  const router = useRouter();
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newSecret, setNewSecret] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [upgradePlan, setUpgradePlan] = useState(null);

  async function load() {
    const res = await fetch("/api/console/keys");
    if (res.ok) setKeys((await res.json()).keys);
    setLoading(false);
  }

  async function loadRequests() {
    const res = await fetch("/api/console/upgrade");
    if (res.ok) setRequests((await res.json()).requests);
  }

  useEffect(() => {
    load();
    loadRequests();
  }, []);

  async function create(explicitName) {
    setCreating(true);
    setError(null);
    const res = await fetch("/api/console/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: explicitName ?? name }),
    });
    const body = await res.json();
    if (res.ok) {
      setNewSecret(body.secret);
      setName("");
      await load();
    } else {
      setError(body.error);
    }
    setCreating(false);
  }

  async function revoke(apiKey) {
    if (!confirm(`Revoke "${apiKey.name}"? Anything using it stops working immediately.`)) return;
    const res = await fetch(`/api/console/keys/${apiKey.id}`, { method: "DELETE" });
    if (res.ok) await load();
  }

  async function handleSignOut() {
    await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    router.refresh();
  }

  const live = keys.filter((k) => !k.revoked);
  const used = live.reduce((sum, k) => sum + (k.usage ?? 0), 0);
  const atLimit = live.length >= 5;
  const pending = requests.find((r) => r.status === "pending");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {user.picture ? (
            <img src={user.picture} alt="" className="w-9 h-9 rounded-full" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {user.name || user.email}
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize ${PLAN_STYLE[plan.name]}`}>
                {plan.name}
              </span>
              <span className="text-xs text-zinc-500 truncate">{user.email}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <FiLogOut size={14} /> Sign out
        </button>
      </div>

      {newSecret && <NewKey secret={newSecret} onDismiss={() => setNewSecret(null)} />}

      {loading ? (
        <div className={`${panel} px-5 py-10`}>
          <p className="text-sm text-zinc-500 text-center">Loading your keys…</p>
        </div>
      ) : live.length === 0 && !newSecret ? (
        <FirstKey onCreate={create} creating={creating} />
      ) : (
        <>
          <UsageMeter used={used} plan={plan} expiresAt={planExpiresAt} />

          <div className={`${panel} overflow-hidden`}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                API keys <span className="text-zinc-400">({live.length}/5)</span>
              </h2>
              <Link href="/doc/api" className="text-xs text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1">
                Docs <FiArrowRight size={11} />
              </Link>
            </div>

            {live.length > 0 && (
              <ul>
                {live.map((k) => (
                  <KeyRow key={k.id} apiKey={k} onRevoke={revoke} />
                ))}
              </ul>
            )}

            <div className="px-5 py-3.5 bg-zinc-50/70 dark:bg-zinc-950/30 border-t border-zinc-200 dark:border-zinc-800">
              {atLimit ? (
                <p className="text-xs text-zinc-500">
                  You have the maximum of five keys. Revoke one to create another.
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !creating && create()}
                    placeholder="Name a new key, e.g. production"
                    maxLength={40}
                    className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                  <button
                    onClick={() => create()}
                    disabled={creating}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    <FiPlus size={15} /> {creating ? "Creating…" : "Create"}
                  </button>
                </div>
              )}
              {error && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
            </div>
          </div>
        </>
      )}

      <section className="pt-4">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Plans</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Paid by Telebirr transfer and confirmed by hand.
          </p>
        </div>

        {pending && (
          <div className="mb-4 flex items-start gap-2.5 px-4 py-3 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/20">
            <FiClock size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-200">
                {pending.plan.charAt(0).toUpperCase() + pending.plan.slice(1)} upgrade awaiting confirmation
              </p>
              <p className="text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                Transaction <span className="font-mono">{pending.txnId}</span> submitted{" "}
                {new Date(pending.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}.
                Your plan changes once the transfer is verified.
              </p>
            </div>
          </div>
        )}

        <PricingCards
          currentPlan={plan.name}
          pendingPlan={pending?.plan}
          onChoose={(id) => setUpgradePlan(id)}
        />
      </section>

      {upgradePlan && (
        <UpgradeDialog
          planId={upgradePlan}
          onClose={() => setUpgradePlan(null)}
          onSubmitted={async () => {
            setUpgradePlan(null);
            await loadRequests();
          }}
        />
      )}
    </div>
  );
}
