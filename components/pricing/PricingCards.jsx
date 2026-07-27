"use client";

import Link from "next/link";
import { FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import { PLAN_ORDER, CURRENCY } from "@/lib/api/pricing.js";
import { usePricing } from "./usePricing.js";

/**
 * Shared by the marketing page and the console.
 *
 * With `onChoose` it becomes interactive (console: start an upgrade). Without it,
 * the cards link to the console, because a signed-out visitor cannot pay for
 * anything until they have an account.
 */
export function PricingCards({ currentPlan, onChoose, pendingPlan }) {
  const { plans: PRICING } = usePricing();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PLAN_ORDER.map((id) => {
        const plan = PRICING[id];
        const isCurrent = currentPlan === id;
        const isPending = pendingPlan === id;
        const featured = plan.popular && !isCurrent;

        return (
          <div
            key={id}
            className={[
              "relative flex flex-col rounded-2xl border p-6 transition-colors",
              featured
                ? "border-sky-400 dark:border-sky-600 bg-white/70 dark:bg-zinc-900/70 shadow-lg shadow-sky-500/5"
                : "border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40",
              isCurrent ? "ring-2 ring-emerald-500/40" : "",
            ].join(" ")}
          >
            {featured && (
              <span className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-semibold uppercase tracking-wider">
                Most popular
              </span>
            )}
            {isCurrent && (
              <span className="absolute -top-2.5 right-6 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-semibold uppercase tracking-wider">
                Your plan
              </span>
            )}

            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">{plan.label}</h3>

            <div className="mt-3 flex items-baseline gap-1.5">
              {plan.priceETB === 0 ? (
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">Free</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-zinc-900 dark:text-white tabular-nums">
                    {plan.priceETB.toLocaleString()}
                  </span>
                  <span className="text-sm text-zinc-500">{CURRENCY}/month</span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{plan.tagline}</p>

            <dl className="mt-5 pt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex justify-between text-sm">
                <dt className="text-zinc-500">Requests</dt>
                <dd className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                  {plan.quota.toLocaleString()}/mo
                </dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-zinc-500">Rate limit</dt>
                <dd className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                  {plan.burst.toLocaleString()}/min
                </dd>
              </div>
            </dl>

            <ul className="mt-5 space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <FiCheck size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
              {plan.unavailable.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-zinc-400 dark:text-zinc-600">
                  <FiX size={15} className="mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {isCurrent ? (
                <p className="text-center text-sm text-zinc-500 py-2.5">Currently active</p>
              ) : isPending ? (
                <p className="text-center text-sm text-amber-600 dark:text-amber-400 py-2.5">
                  Awaiting confirmation
                </p>
              ) : onChoose ? (
                <button
                  onClick={() => onChoose(id)}
                  disabled={plan.priceETB === 0}
                  className={[
                    "w-full py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                    plan.priceETB === 0
                      ? "text-zinc-400 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed"
                      : featured
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "border border-zinc-300 dark:border-zinc-700 hover:border-sky-500 text-zinc-900 dark:text-zinc-100",
                  ].join(" ")}
                >
                  {plan.priceETB === 0 ? "Default plan" : `Upgrade to ${plan.label}`}
                </button>
              ) : (
                <Link
                  href="/console"
                  className={[
                    "flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-medium transition-colors",
                    featured
                      ? "bg-sky-600 hover:bg-sky-700 text-white"
                      : "border border-zinc-300 dark:border-zinc-700 hover:border-sky-500 text-zinc-900 dark:text-zinc-100",
                  ].join(" ")}
                >
                  {plan.priceETB === 0 ? "Start free" : `Choose ${plan.label}`}
                  <FiArrowRight size={13} />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
