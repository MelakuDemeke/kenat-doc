"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { FiCopy, FiTrash2, FiPlus, FiCheck, FiAlertTriangle, FiLogOut } from "react-icons/fi";
import { auth } from "@/lib/firebase/client.js";

const card =
  "p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl shadow-lg";

function pct(used, quota) {
  return Math.min(100, Math.round((used / quota) * 100));
}

/** Shown once, immediately after creation — the secret is never retrievable again. */
function RevealedSecret({ secret, onDismiss }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-900/20">
      <div className="flex items-start gap-2 mb-3">
        <FiAlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Copy this key now. It is shown once and cannot be recovered — only its hash is stored.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-800/60 font-mono text-xs break-all">
          {secret}
        </code>
        <button
          onClick={copy}
          className="p-2.5 rounded-lg border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer"
          aria-label="Copy API key"
        >
          {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
        </button>
      </div>
      <button
        onClick={onDismiss}
        className="mt-3 text-xs text-amber-800 dark:text-amber-300 underline cursor-pointer"
      >
        I&apos;ve saved it
      </button>
    </div>
  );
}

export function KeyManager({ user, plan }) {
  const router = useRouter();
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newSecret, setNewSecret] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function load() {
    const res = await fetch("/api/console/keys");
    if (res.ok) setKeys((await res.json()).keys);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    setCreating(true);
    setError(null);
    const res = await fetch("/api/console/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
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

  async function revoke(id) {
    if (!confirm("Revoke this key? Any application using it will stop working immediately.")) return;
    const res = await fetch(`/api/console/keys/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  }

  async function handleSignOut() {
    await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    router.refresh();
  }

  const live = keys.filter((k) => !k.revoked);
  const used = live.reduce((sum, k) => sum + (k.usage ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          {user.picture && (
            <img src={user.picture} alt="" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700" />
          )}
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{user.name || user.email}</p>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <FiLogOut size={14} /> Sign out
        </button>
      </div>

      <div className={card}>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-bold text-zinc-900 dark:text-white">
            Usage this month
            <span className="ml-2 text-xs font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              {plan.name}
            </span>
          </h3>
          <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
            {used.toLocaleString()} / {plan.monthlyQuota.toLocaleString()}
          </p>
        </div>
        <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${pct(used, plan.monthlyQuota) > 90 ? "bg-red-500" : "bg-sky-500"}`}
            style={{ width: `${pct(used, plan.monthlyQuota)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Burst limit: {plan.limit.toLocaleString()} requests/minute. Quota resets on the 1st (UTC).
        </p>
      </div>

      {newSecret && <RevealedSecret secret={newSecret} onDismiss={() => setNewSecret(null)} />}

      <div className={card}>
        <h3 className="font-bold text-zinc-900 dark:text-white mb-4">API keys</h3>

        <div className="flex gap-2 mb-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Key name (e.g. production)"
            maxLength={40}
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
          <button
            onClick={create}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FiPlus size={16} /> {creating ? "Creating…" : "Create key"}
          </button>
        </div>

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        {loading ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : live.length === 0 ? (
          <p className="text-sm text-zinc-500">No keys yet. Create one to start calling the API.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {live.map((key) => (
              <li key={key.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">{key.name}</p>
                  <p className="font-mono text-xs text-zinc-500">{key.prefix}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-zinc-500">
                    {(key.usage ?? 0).toLocaleString()} reqs
                  </span>
                  <button
                    onClick={() => revoke(key.id)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                    aria-label={`Revoke ${key.name}`}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
