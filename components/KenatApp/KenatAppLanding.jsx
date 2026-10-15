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
    <div className="k-page min-h-screen relative overflow-x-clip">

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
                <h1 className="kenat-reveal kenat-reveal-delay-1 text-4xl font-semibold tracking-[-0.03em] leading-[1.05] md:text-5xl lg:text-6xl">
                  Master Your Time with the{" "}
                  <span className="k-accent">Best Ethiopian Calendar</span>{" "}
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
                  className="inline-flex items-center justify-center k-btn k-btn-ghost"
                >
                  Explore features
                </a>
              </div>
            </div>

            <div className="kenat-reveal kenat-reveal-delay-4 flex justify-center lg:justify-end">
              <div className="relative p-8 k-card bg-[var(--bg)] w-full max-w-sm">

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
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium k-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                    Available now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="features" className="scroll-mt-24 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">
              Built for accuracy &amp; heritage
            </h2>
            <p className="k-muted text-lg leading-relaxed">
              Core tools for everyone—plus Pro for sync, Telegram, themes, and an ad-free experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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


        <section id="pro-benefits" className="scroll-mt-24 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">
              Unlock the Full Kenat Experience
            </h2>
            <p className="k-muted text-lg leading-relaxed">
              Pro adds cross-device cloud sync, Telegram, premium themes, and an ad-free experience—Bahire Hasab stays free for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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


        <section id="pricing" className="scroll-mt-24 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">Simple, flexible pricing</h2>
          </div>
          <AppPricingCarousel />
        </section>


        <section id="faq" className="scroll-mt-24 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl border-b k-border">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="border-t k-border"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-lg font-semibold hover:text-[var(--accent)] transition-colors"
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
                    <div className="px-1 pb-6 leading-relaxed k-muted max-w-[62ch]">
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
