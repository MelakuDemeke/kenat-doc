"use client";

import { useState } from "react";
import {
  FiCloud,
  FiHeadphones,
  FiLayers,
  FiShield,
  FiCalendar,
  FiGift,
  FiMoon,
  FiRefreshCw,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { FeatureCard } from "@/components/Landing/FeatureCard";
import { AppPricingCarousel } from "@/components/KenatApp/AppPricingCarousel";
import { SiteFooter } from "@/components/SiteFooter";

const APP_ICON_SRC = "/kenat%20icon.png";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=me.melaku.kenat";
const PLAY_STORE_BADGE_SRC = "/Google_Play_Store_badge_EN.svg";

const features = [
  {
    icon: <FiCalendar size={20} />,
    title: "Date Conversion",
    desc: "Instant, bi-directional conversion between Ethiopic and Gregorian calendars.",
    tag: "core",
  },
  {
    icon: <FiGift size={20} />,
    title: "Cultural Holidays",
    desc: "Full database of national and religious holidays—fasts, feasts, and public days.",
    tag: "core",
  },
  {
    icon: <FiMoon size={20} />,
    title: "Bahire Hasab",
    desc: "Full Bahire Hasab and movable feasts for any Ethiopian year—free in the app.",
    tag: "bahire-hasab",
  },
  {
    icon: <FiRefreshCw size={20} />,
    title: "Local Calendar Sync",
    desc: "Sync Ethiopian dates, holidays, and personal events with Google or Apple Calendar.",
    tag: "sync",
  },
  {
    icon: <FiBell size={20} />,
    title: "Reminders",
    desc: "Local notifications and reminders so fasts, feasts, and your own plans stay on your radar.",
    tag: "notifications",
  },
];

const proBenefits = [
  {
    icon: <FiShield size={20} />,
    title: "Ad-Free Experience",
    desc: "Focus on what matters without distractions or banner ads.",
    tag: "pro",
  },
  {
    icon: <FiCloud size={20} />,
    title: "Cross-Device Cloud Sync",
    desc: "Automatically synchronize your personal events and preferences across all your devices.",
    tag: "pro",
  },
  {
    icon: <FaTelegram size={20} />,
    title: "Telegram Integration",
    desc: "Link your account to the Kenat Telegram Bot (@kenat_bot) to manage your schedule via Telegram.",
    tag: "pro",
  },
  {
    icon: <FiLayers size={20} />,
    title: "Premium Customization",
    desc: "Unlock exclusive accent colors and UI themes—Amethyst, Gold, Deep Sea—to match your personality.",
    tag: "pro",
  },
  {
    icon: <FiHeadphones size={20} />,
    title: "Priority Support",
    desc: "Get at the front of the line for any technical help or feature requests.",
    tag: "pro",
  },
];

const faqItems = [
  {
    q: "What makes Kenat the best Ethiopian calendar app?",
    a: "Kenat combines accurate bidirectional Ethiopic–Gregorian conversion, a full holiday database, Bahire Hasab, and native calendar integration in one polished app built for daily use.",
  },
  {
    q: "Can I pay with Telegram Stars?",
    a: "Yes. Kenat Pro is 80 Stars (3 months), 160 Stars (6 months), or 200 Stars (1 year), or you can pay the listed ETB amounts. Checkout happens in Telegram; Star pricing in your currency follows Telegram's rates.",
  },
  {
    q: "Does Kenat work offline?",
    a: "Core conversion, holidays, and Bahire Hasab logic work on your device. Cloud sync and Telegram features require an internet connection.",
  },
];

export function KenatAppLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-sky-500/30 relative overflow-x-hidden bg-grid-dots">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <main id="main" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <section id="top" className="relative pt-12 pb-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div>
                <p className="kenat-reveal mb-3 font-mono text-[10px] uppercase tracking-widest text-sky-500 font-semibold">
                  Ethiopian Calendar App
                </p>
                <h1 className="kenat-reveal kenat-reveal-delay-1 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
                  Master Your Time with the{" "}
                  <span className="text-gradient-sky-purple">Best Ethiopian Calendar</span>{" "}
                  App.
                </h1>
              </div>
              <p className="kenat-reveal kenat-reveal-delay-2 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
                Precision date conversion, cultural heritage, and modern synchronization in one beautiful package.
              </p>
              <div className="kenat-reveal kenat-reveal-delay-3 flex flex-wrap gap-4" id="download">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Kenat on Google Play"
                  className="inline-flex transition-transform hover:scale-[1.02] active:scale-95"
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
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 px-8 py-3.5 text-sm font-semibold text-zinc-800 dark:text-white shadow-sm backdrop-blur-sm transition hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"
                >
                  Explore features
                </a>
              </div>
            </div>

            <div className="kenat-reveal kenat-reveal-delay-4 flex justify-center lg:justify-end">
              <div className="relative group p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm overflow-hidden w-full max-w-sm">
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APP_ICON_SRC}
                  alt="Kenat Ethiopian Calendar app icon"
                  width={280}
                  height={280}
                  className="mx-auto h-auto w-full max-w-[220px] rounded-2xl"
                />
                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    Android App
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-sky-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                    Available now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

        <section id="features" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sky-500 font-semibold">
              Core Features
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Built for accuracy &amp; heritage
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-sm">
              Core tools for everyone—plus Pro for sync, Telegram, themes, and an ad-free experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                desc={f.desc}
                tag={f.tag}
              />
            ))}
          </div>
        </section>

        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

        <section id="pro-benefits" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-purple-500 font-semibold">
              Kenat Pro
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Unlock the Full Kenat Experience
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-sm">
              Pro adds cross-device cloud sync, Telegram, premium themes, and an ad-free experience—Bahire Hasab stays free for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proBenefits.map((b) => (
              <FeatureCard
                key={b.title}
                icon={b.icon}
                title={b.title}
                desc={b.desc}
                tag={b.tag}
              />
            ))}
          </div>
        </section>

        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

        <section id="pricing" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Simple, flexible pricing</h2>
          </div>
          <AppPricingCarousel />
        </section>

        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

        <section id="faq" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md transition-all"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/80 transition-colors"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    {item.q}
                    <FiChevronDown
                      size={16}
                      className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
                        open ? "rotate-180 text-sky-500" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
