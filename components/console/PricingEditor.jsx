"use client";

import { useEffect, useState } from "react";
import { FiSave, FiEdit2 } from "react-icons/fi";
import { CURRENCY, PAID_PLANS } from "@/lib/api/pricing.js";

/**
 * Prices and the Telebirr number, editable without a deploy.
 *
 * Only paid tiers are editable — free is structurally zero. Changing a price affects
 * new requests only: an existing pending request keeps the amount captured when it
 * was submitted, so nobody is asked for one figure and judged against another.
 */
export function PricingEditor() {
  const [open, setOpen] = useState(false);
  const [prices, setPrices] = useState({});
  const [phone, setPhone] = useState("");
  const [meta, setMeta] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  async function load() {
    const res = await fetch("/api/admin/pricing");
    if (!res.ok) return;
    const data = await res.json();
    setPrices(Object.fromEntries(PAID_PLANS.map((id) => [id, data.plans[id].priceETB])));
    setPhone(data.telebirrNumber);
    setMeta({ updatedAt: data.updatedAt, updatedBy: data.updatedBy });
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prices, telebirrNumber: phone }),
    });
    const body = await res.json();
    setMessage(res.ok ? "Pricing updated. Live everywhere immediately." : body.error);
    if (res.ok) await load();
    setSaving(false);
    setTimeout(() => setMessage(null), 4000);
  }

  const field =
    "w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40";

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Pricing</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {meta?.updatedAt
              ? `Last changed ${new Date(meta.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} by ${meta.updatedBy}.`
              : "Using the built-in defaults."}
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-sky-500/60 transition-colors cursor-pointer"
        >
          <FiEdit2 size={13} /> {open ? "Close" : "Edit"}
        </button>
      </div>

      {open && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-lg p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {PAID_PLANS.map((id) => (
              <label key={id} className="block">
                <span className="block text-xs font-medium capitalize text-zinc-600 dark:text-zinc-400 mb-1">
                  {id} — {CURRENCY}/month
                </span>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={prices[id] ?? ""}
                  onChange={(e) => setPrices((p) => ({ ...p, [id]: e.target.value }))}
                  className={`${field} font-mono tabular-nums`}
                />
              </label>
            ))}

            <label className="block">
              <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Telebirr number
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${field} font-mono`}
              />
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-40 cursor-pointer"
            >
              <FiSave size={14} /> {saving ? "Saving…" : "Save pricing"}
            </button>
            <p className="text-xs text-zinc-500">
              Shows on the homepage, the console and the payment dialog. Pending requests keep the
              amount they were quoted.
            </p>
          </div>

          {message && <p className="mt-3 text-sm text-sky-700 dark:text-sky-300">{message}</p>}
        </div>
      )}
    </section>
  );
}
