"use client";

import { useState } from "react";
import { FiCloud, FiHeadphones, FiLayers, FiShield } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { GlassCard } from "@/components/Landing/GlassCard";
import { AppPricingCarousel } from "@/components/KenatApp/AppPricingCarousel";

const APP_ICON_SRC = "/kenat%20icon.png";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=me.melaku.kenat";
const PLAY_STORE_BADGE_SRC = "/Google_Play_Store_badge_EN.svg";

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

export function KenatAppLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50 relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-sky-500 dark:focus:text-zinc-900"
      >
        Skip to content
      </a>

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
              <p className="kenat-reveal mb-4 text-base font-medium md:text-lg">
                <span className="text-zinc-700 dark:text-zinc-300">Ethiopian calendar</span>
                <span className="mx-2 text-purple-600 dark:text-sky-400" aria-hidden>
                  |
                </span>
                <span className="font-semibold tracking-tight text-zinc-900 dark:text-white">Kenat</span>
              </p>
              <h1 className="kenat-reveal kenat-reveal-delay-1 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
                <span className="text-zinc-900 dark:text-white">Master Your Time with the </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">
                  Best Ethiopian Calendar
                </span>
                <span className="text-zinc-900 dark:text-white"> App.</span>
              </h1>
              <p className="kenat-reveal kenat-reveal-delay-2 mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
                Precision date conversion, cultural heritage, and modern synchronization in one beautiful package.
              </p>
              <div className="kenat-reveal kenat-reveal-delay-3 mt-10 flex flex-wrap gap-4" id="download">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Kenat on Google Play"
                  className="inline-flex transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PLAY_STORE_BADGE_SRC}
                    alt="Get it on Google Play"
                    className="h-14 w-auto"
                  />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white/40 px-8 py-3.5 text-base font-semibold text-zinc-800 shadow-sm backdrop-blur-sm transition hover:bg-white/60 dark:border-white/15 dark:bg-zinc-800/40 dark:text-white dark:hover:bg-zinc-800/60"
                >
                  Explore features
                </a>
              </div>
            </div>

            <div className="kenat-reveal kenat-reveal-delay-4 flex justify-center lg:justify-end">
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
              Core tools for everyone—plus Pro for sync, Telegram, themes, and an ad-free experience.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  body: "Full Bahire Hasab and movable feasts for any Ethiopian year—free in the app, no Pro required.",
                },
                {
                  title: "Local calendar sync",
                  body: "Sync Ethiopian dates, holidays, and your personal events with your phone’s calendar (Google Calendar, Apple Calendar, and system providers).",
                },
                {
                  title: "Reminders & daily rhythm",
                  body: "Local notifications and reminders so fasts, feasts, and your own plans stay on your radar.",
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
              Pro adds cross-device cloud sync, Telegram, premium themes, and an ad-free experience—Bahire Hasab stays free for everyone.
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
    </div>
  );
}
