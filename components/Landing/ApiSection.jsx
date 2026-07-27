"use client";

import Link from "next/link";
import { FiArrowRight, FiRefreshCw, FiGlobe, FiShield, FiBookOpen } from "react-icons/fi";
import { PricingCards } from "@/components/pricing/PricingCards.jsx";
import { API_BASE } from "@/lib/site.js";
import { TELEBIRR_NUMBER } from "@/lib/api/pricing.js";

const REASONS = [
  {
    Icon: FiRefreshCw,
    title: "Holiday dates that stay right",
    body: "Eid al-Fitr and Eid al-Adha follow the official moon-sighting announcement, and the government sometimes declares one-off holidays. A pinned library version is wrong the day that happens. The API is not.",
  },
  {
    Icon: FiGlobe,
    title: "Any language, any runtime",
    body: "Go, Rust, Java, C#, Ruby, a spreadsheet, a no-code tool. Anything that can make an HTTP request gets the same Bahire Hasab engine.",
  },
  {
    Icon: FiShield,
    title: "No calendar logic to maintain",
    body: "Thirteen months, leap-year Pagume, movable feasts. Keep that out of your codebase and off your team's plate.",
  },
];

export function ApiSection() {
  const example = `curl -H "Authorization: Bearer sk_live_..." \\\n  "${API_BASE}/holidays/is-holiday?date=2018-01-17"`;

  return (
    <section className="space-y-12 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-2.5 py-1 rounded-full border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-mono uppercase tracking-wider">
          HTTP API
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight">Kenat over HTTP</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
          The libraries are free, MIT-licensed and always will be. If you write JavaScript, Python,
          PHP or Dart, use them — they run locally with no network call. The API is for everything
          else, and for holiday data you would rather not redeploy to update.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {REASONS.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 grid place-items-center mb-3">
              <Icon size={17} />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1.5">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl bg-zinc-900 dark:bg-black/60 border border-zinc-800 overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed">
            <code className="font-mono text-zinc-200">{example}</code>
          </pre>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500">
          Returns whether the date is a holiday, in both calendars, with the matching holidays.
        </p>
      </div>

      <div className="space-y-5">
        <div className="text-center">
          <h3 className="text-2xl font-extrabold tracking-tight">Pricing</h3>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            Start free, no card. Paid plans are settled by Telebirr transfer to{" "}
            <span className="font-mono text-zinc-700 dark:text-zinc-300">{TELEBIRR_NUMBER}</span>{" "}
            and confirmed by hand.
          </p>
        </div>

        <PricingCards />

        <p className="text-center text-xs text-zinc-500">
          Need more than 2M requests, an SLA, or an invoice in ETB?{" "}
          <a href="https://t.me/kenat_bot" className="text-sky-600 dark:text-sky-400 hover:underline">
            Get in touch
          </a>
          .
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/console"
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
        >
          Get an API key <FiArrowRight size={15} />
        </Link>
        <Link
          href="/doc/api"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 font-semibold transition-all"
        >
          <FiBookOpen size={15} /> API documentation
        </Link>
      </div>
    </section>
  );
}
