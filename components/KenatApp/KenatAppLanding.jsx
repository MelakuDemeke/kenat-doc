"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiCloud,
  FiHeadphones,
  FiLayers,
  FiShield,
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { GlassCard } from "@/components/Landing/GlassCard";
import { AppPricingCarousel } from "@/components/KenatApp/AppPricingCarousel";

const APP_ICON_SRC = "/kenat%20icon.png";

const nav = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#pro-benefits", label: "Pro Benefits" },
  { href: "#faq", label: "FAQ" },
];

const proBenefits = [
  {
    Icon: FiShield,
    title: "Ad-Free Experience",
    body: "Focus on what matters without distractions or banner ads.",
  },
  {
    Icon: FiCloud,
    title: "Cross-Device Cloud Sync",
    body: "Automatically synchronize your personal events and preferences across all your mobile devices.",
  },
  {
    Icon: FaTelegram,
    title: "Telegram Integration",
    body: "Link your account to the Kenat Telegram Bot (@kenat_bot) to manage your schedule and receive reminders via Telegram.",
  },
  {
    Icon: FiLayers,
    title: "Premium Customization",
    body: "Unlock exclusive accent colors and UI themes (Amethyst, Gold, Deep Sea) to match your personality.",
  },
  {
    Icon: FiCalendar,
    title: "Full Bahire Hasab Access",
    body: "Access the deepest layers of traditional calculations for any year in the past or future.",
  },
  {
    Icon: FiHeadphones,
    title: "Priority Support",
    body: "Get at the front of the line for any technical help or feature requests.",
  },
];

const faqItems = [
  {
    q: "What makes Kenat the best Ethiopian calendar app?",
    a: "Kenat combines accurate bidirectional Ethiopic–Gregorian conversion, a full holiday database, Bahire Hasab, and native calendar integration in one polished app built for daily use.",
  },
  {
    q: "Can I pay with Telegram Stars?",
    a: "Yes. Kenat Pro is 80 Stars (3 months), 160 Stars (6 months), or 200 Stars (1 year), or you can pay the listed ETB amounts. Checkout happens in Telegram; Star pricing in your currency follows Telegram’s rates.",
  },
  {
    q: "Does Kenat work offline?",
    a: "Core conversion, holidays, and Bahire Hasab logic work on your device. Cloud sync and Telegram features require an internet connection.",
  },
];

const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:px-8 sm:py-3.5 sm:text-base";

const btnPrimaryCompact =
  "inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200";

export function KenatAppLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50 relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-sky-500 dark:focus:text-zinc-900"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
          <a href="#top" className="flex shrink-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={APP_ICON_SRC}
              alt="Kenat Ethiopian calendar app icon"
              width={44}
              height={44}
              className="h-11 w-11 rounded-2xl shadow-lg ring-1 ring-black/10 dark:ring-white/20"
            />
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-white">
              Kenat App
            </span>
          </a>

          <nav
            className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex"
            aria-label="App page"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-purple-600 dark:hover:text-sky-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#download" className={`${btnPrimaryCompact} hidden sm:inline-flex`}>
              Download Now
            </a>
            <button
              type="button"
              className="rounded-lg border border-black/10 bg-white/50 p-2 text-zinc-800 dark:border-white/15 dark:bg-zinc-800/50 dark:text-white md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-black/5 bg-white/50 px-4 py-4 dark:border-white/10 dark:bg-zinc-900/80 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium" aria-label="Mobile app page">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 text-zinc-700 dark:text-zinc-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#download"
                className={`${btnPrimary} mt-2 w-full`}
                onClick={() => setMenuOpen(false)}
              >
                Download Now
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main" className="relative z-10">
        <section id="top" className="relative overflow-hidden px-4 pb-20 pt-12 md:pb-28 md:pt-16">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/15"
            aria-hidden
          />

          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="kenat-reveal text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
                <span className="text-zinc-900 dark:text-white">Master Your Time with the </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">
                  Best Ethiopian Calendar
                </span>
                <span className="text-zinc-900 dark:text-white"> App.</span>
              </h1>
              <p className="kenat-reveal kenat-reveal-delay-1 mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
                Precision date conversion, cultural heritage, and modern synchronization in one beautiful package.
              </p>
              <div className="kenat-reveal kenat-reveal-delay-2 mt-10 flex flex-wrap gap-4" id="download">
                <a href="#download" className={`${btnPrimary} transform hover:scale-105`}>
                  Download Now
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white/40 px-8 py-3.5 text-base font-semibold text-zinc-800 shadow-sm backdrop-blur-sm transition hover:bg-white/60 dark:border-white/15 dark:bg-zinc-800/40 dark:text-white dark:hover:bg-zinc-800/60"
                >
                  Explore features
                </a>
              </div>
            </div>

            <div className="kenat-reveal kenat-reveal-delay-3 flex justify-center lg:justify-end">
              <GlassCard className="relative max-w-md rounded-3xl p-8 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APP_ICON_SRC}
                  alt="Ethiopic to Gregorian date converter interface"
                  width={280}
                  height={280}
                  className="mx-auto h-auto w-full max-w-[280px] rounded-2xl"
                />
                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Built for accuracy, culture, and your daily rhythm—on Android and iOS.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              Built for accuracy &amp; heritage
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              Four pillars that make Kenat the Ethiopian calendar toolkit you can trust.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Date Conversion",
                  body: "Instant, bi-directional conversion between Ethiopic and Gregorian calendars.",
                },
                {
                  title: "Cultural Holidays",
                  body: "Full database of national and religious holidays—fasts, feasts, and public days.",
                },
                {
                  title: "Traditional Logic (Bahire Hasab)",
                  body: "The definitive tool for calculating movable dates without needing a physical book.",
                },
                {
                  title: "Modern Workflow",
                  body: "Native integration with system calendars for notifications and reminders.",
                },
              ].map((f) => (
                <GlassCard key={f.title} className="kenat-reveal rounded-2xl p-6 transition hover:ring-1 hover:ring-purple-500/30 dark:hover:ring-sky-500/30">
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-sky-400">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pro-benefits"
          className="scroll-mt-24 border-y border-black/5 bg-white/5 px-4 py-16 dark:border-white/10 dark:bg-black/20 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              Unlock the Full Kenat Experience
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              Pro removes limits and connects your calendar everywhere you work.
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proBenefits.map(({ Icon, title, body }) => (
                <li key={title}>
                  <GlassCard className="kenat-reveal flex gap-4 rounded-2xl p-6">
                    <Icon
                      size={26}
                      className="mt-0.5 shrink-0 text-purple-600 dark:text-sky-400"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>
                    </div>
                  </GlassCard>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              Pricing
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              Pay in Ethiopian Birr or Telegram Stars: <strong>80</strong>, <strong>160</strong>, or{" "}
              <strong>200</strong> Stars for the three Pro tiers (see carousel).
            </p>
            <AppPricingCarousel />
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 border-t border-black/5 px-4 py-16 dark:border-white/10 md:py-24"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              FAQ
            </h2>
            <div className="mt-10 space-y-3">
              {faqItems.map((item, i) => {
                const open = openFaq === i;
                return (
                  <GlassCard key={item.q} className="overflow-hidden rounded-xl">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-zinc-900 md:text-base dark:text-white"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      {item.q}
                      <span className="shrink-0 text-purple-600 dark:text-sky-400">{open ? "−" : "+"}</span>
                    </button>
                    {open ? (
                      <div className="border-t border-black/10 px-5 py-4 text-sm leading-relaxed text-zinc-600 dark:border-white/10 dark:text-zinc-400">
                        {item.a}
                      </div>
                    ) : null}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-4 py-10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={APP_ICON_SRC} alt="" width={32} height={32} className="h-8 w-8 rounded-lg opacity-90" />
            <span>Kenat — Ethiopian Calendar Toolkit</span>
          </div>
          <a href="/privacy" className="hover:text-purple-600 dark:hover:text-sky-400">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
