"use client";

import { useEffect, useState } from "react";
import {
  FiCode,
  FiCopy,
  FiCheck,
  FiDownload,
  FiBox,
  FiLayers,
  FiToggleLeft,
  FiLayout,
  FiGithub,
  FiBookOpen,
} from "react-icons/fi";
import { SiNpm, SiPypi, SiDart, SiPhp } from "react-icons/si";
import { clsx } from "clsx";

import { useHasMounted } from "@/hooks/useHasMounted";
import { LiveAmharicDateTime } from "@/components/Landing/LiveAmharicDateTime";
import { FeatureCard } from "@/components/Landing/FeatureCard";
import { OrbitingLanguageIcons } from "@/components/Landing/OrbitingLanguageIcons";
import InteractivePlayground from "@/components/Landing/InteractivePlayground";
import { SiteFooter } from "@/components/SiteFooter";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=me.melaku.kenat";
const PLAY_STORE_BADGE_SRC = "/Google_Play_Store_badge_EN.svg";

const INSTALL_COMMANDS = {
  npm: "npm install kenat kenat-ui",
  pip: "pip install kenat",
  pub: "dart pub add kenat",
  composer: "composer require melakudemeke/kenat-php",
};

const INSTALLER_TABS = [
  { key: "npm", Icon: SiNpm, label: "npm" },
  { key: "pip", Icon: SiPypi, label: "pip" },
  { key: "pub", Icon: SiDart, label: "pub" },
  { key: "composer", Icon: SiPhp, label: "composer" },
];

export default function Home() {
  const hasMounted = useHasMounted();
  const [downloads, setDownloads] = useState(0);
  const [activeInstaller, setActiveInstaller] = useState("npm");
  const [copiedInstaller, setCopiedInstaller] = useState(false);

  useEffect(() => {
    fetch("/api/downloads")
      .then((r) => r.json())
      .then((data) => setDownloads(data.total ?? 0))
      .catch(() => setDownloads(0));
  }, []);

  const handleCopyInstaller = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[activeInstaller]);
    setCopiedInstaller(true);
    setTimeout(() => setCopiedInstaller(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-sky-500/30 relative overflow-x-hidden bg-grid-dots">
      {/* Visual top/bottom accent gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* --- Hero Section --- */}
        <section className="relative pt-12 pb-8 text-center space-y-8">
          <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
            <OrbitingLanguageIcons />
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 shadow-sm backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-350">
                v2.0.0 Release
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Ethiopian Calendar{" "}
              <span className="font-mono bg-zinc-900 dark:bg-zinc-100 text-sky-400 dark:text-sky-600 px-3 rounded-lg">
                Toolkit
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-650 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Complete date conversion, holiday detection, and custom calendar UI logic.
              A robust, lightweight, multi-language library built for developers.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <LiveAmharicDateTime />
          </div>

          {/* Installer Bar Component */}
          <div className="w-full max-w-lg mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-lg p-2.5 space-y-2.5">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1">
                {INSTALLER_TABS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveInstaller(item.key)}
                    className={clsx(
                      "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors",
                      activeInstaller === item.key
                        ? "bg-zinc-100 dark:bg-zinc-850 text-zinc-900 dark:text-white font-bold"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    )}
                  >
                    <item.Icon size={12} className={activeInstaller === item.key ? "text-sky-500" : ""} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                <FiDownload />
                <span>{hasMounted ? downloads.toLocaleString() : "..."} total downloads</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-900 rounded-lg p-3 font-mono text-sm overflow-hidden">
              <span className="text-sky-600 dark:text-sky-400 select-all truncate mr-2">
                {INSTALL_COMMANDS[activeInstaller]}
              </span>
              <button
                onClick={handleCopyInstaller}
                className="flex-shrink-0 p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-850 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Copy install command"
              >
                {copiedInstaller ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/doc"
              className="px-6 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
            >
              Get Started
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex transition-transform hover:scale-[1.02] active:scale-95"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PLAY_STORE_BADGE_SRC}
                alt="Get it on Google Play"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </section>

        {/* --- Dotted Separator Layout Rail --- */}
        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800 my-12" />

        {/* --- Proof-over-Decoration playground --- */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Interactive Playground</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm">
              See the Ethiopian Calendar Toolkit in action. Toggle between interactive demos and review clean implementation codes.
            </p>
          </div>
          <InteractivePlayground />
        </section>

        {/* --- Dotted Separator Layout Rail --- */}
        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800 my-12" />

        {/* --- Section 1: `kenat` Core Logic --- */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sky-500 font-semibold">Core Library Features</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Powerful Core Logic</h2>
            <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto text-sm">
              `kenat` provides a robust, zero-dependency engine for parsing, converting, and formatting Ethiopian dates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FiCode size={20} />}
              title="Date Conversion"
              desc="Effortlessly convert dates between Ethiopian and Gregorian calendars using highly-optimized conversion formulas."
              tag="core"
            />
            <FeatureCard
              icon={<FiLayout size={20} />}
              title="Calendar Grids"
              desc="Generate month structures, including weekday headers, Ge'ez days, and matching Gregorian values, ready for frontend UI tables."
              tag="core"
            />
            <FeatureCard
              icon={<FiToggleLeft size={20} />}
              title="Date Arithmetic"
              desc="Perform reliable mathematical calculations, adding or subtracting days, months, and years relative to any Ethiopian epoch."
              tag="core"
            />
            <FeatureCard
              icon={<FiCode size={20} />}
              title="Geez Numerals"
              desc="Support traditional Ge'ez scripts with native number-to-Geez formatting utilities for culturally accurate UIs."
              tag="core"
            />
            <FeatureCard
              icon={<FiCode size={20} />}
              title="Bahire Hasab"
              desc="Calculate movable Christian feasts and fasts (Easter, Nineveh, Lent) for any given year based on ancient calendar calculations."
              tag="core"
            />
            <FeatureCard
              icon={<FiCode size={20} />}
              title="Holiday System"
              desc="Identify fixed and dynamic holidays with custom filtering (PUBLIC, RELIGIOUS) tailored for Ethiopia."
              tag="core"
            />
          </div>
        </section>

        {/* --- Section 2: `kenat-ui` --- */}
        <section className="space-y-12 py-4">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-purple-500 font-semibold">Headless Primitive Hooks</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Flexible UI with `kenat-ui`</h2>
            <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto text-sm">
              `kenat-ui` is a headless UI logic library that gives you full aesthetic freedom while managing the state behind date pickers and calendars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FiLayers size={20} />}
              title="Headless by Design"
              desc="Access React hooks and layout generators without forced styling, allowing full integration with your local CSS framework."
              tag="ui"
            />
            <FeatureCard
              icon={<FiBox size={20} />}
              title="Style-Agnostic"
              desc="Ready to use with Tailwind CSS, Radix UI, Framer Motion, CSS modules, or custom visual tokens."
              tag="ui"
            />
            <FeatureCard
              icon={<FiBox size={20} />}
              title="Highly Reusable"
              desc="Structure custom input date-pickers, digital clocks, month ranges, and multi-select calendars with ease."
              tag="ui"
            />
          </div>
        </section>

        {/* --- Dotted Separator Layout Rail --- */}
        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800 my-12" />

        {/* --- CTA Section --- */}
        <section className="text-center py-12 max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Ready to Build?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
              Explore the detailed guide and API reference to integrate Ethiopian calendar features, or inspect the open-source codebases.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <a
              href="/doc"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold rounded-xl shadow-lg hover:shadow-zinc-500/10 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:-translate-y-0.5"
            >
              <FiBookOpen size={16} />
              <span>Read the Documentation</span>
            </a>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {[
                { name: "kenat", url: "https://github.com/MelakuDemeke/kenat" },
                { name: "kenat-ui", url: "https://github.com/MelakuDemeke/kenat-ui" },
                { name: "kenat_py", url: "https://github.com/MelakuDemeke/kenat_py" },
                { name: "kenat-cli", url: "https://github.com/MelakuDemeke/kenat-cli" },
                { name: "kenat-dart", url: "https://github.com/MelakuDemeke/kenat-dart" },
                { name: "kenat-php", url: "https://github.com/MelakuDemeke/kenat-php" },
              ].map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-600 dark:text-zinc-350 shadow-sm hover:shadow transition-all"
                >
                  <FiGithub size={12} />
                  <span>{repo.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
