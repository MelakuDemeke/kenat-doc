"use client";

import { useEffect, useState } from "react";
import {
  FiCode,
  FiCopy,
  FiDownload,
  FiBox,
  FiLayers,
  FiToggleLeft,
  FiLayout,
  FiGithub,
} from "react-icons/fi";
import { SiNpm } from "react-icons/si";

import { useHasMounted } from "@/hooks/useHasMounted";
import { BackgroundEffects } from "@/components/Landing/BackgroundEffects";
import { GlassCard } from "@/components/Landing/GlassCard";
import { LiveAmharicDateTime } from "@/components/Landing/LiveAmharicDateTime";
import { FeatureCard } from "@/components/Landing/FeatureCard";

export default function Home() {
  const hasMounted = useHasMounted();
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    async function fetchTotalDownloads() {
      try {
        const startDate = '2024-01-01';
        const endDate = new Date().toISOString().split('T')[0];

        const [kenatRes, kenatUiRes] = await Promise.all([
            fetch(`https://api.npmjs.org/downloads/range/${startDate}:${endDate}/kenat`),
            fetch(`https://api.npmjs.org/downloads/range/${startDate}:${endDate}/kenat-ui`)
        ]);
        
        const kenatData = await kenatRes.json();
        const kenatUiData = await kenatUiRes.json();

        const totalKenatDownloads = kenatData.downloads ? kenatData.downloads.reduce((sum, day) => sum + day.downloads, 0) : 0;
        const totalKenatUiDownloads = kenatUiData.downloads ? kenatUiData.downloads.reduce((sum, day) => sum + day.downloads, 0) : 0;
        
        setDownloads(totalKenatDownloads + totalKenatUiDownloads);

      } catch (error) {
        console.error("Failed to fetch total downloads:", error);
        setDownloads(0);
      }
    }
    fetchTotalDownloads();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install kenat kenat-ui");
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50 relative overflow-x-hidden">
      <BackgroundEffects />
      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 pb-4">
              Kenat: The Ethiopian Calendar Toolkit
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mt-4 max-w-2xl mx-auto">
              A multi-language toolkit for the Ethiopian calendar, offering date
              conversion, calendar grids, holiday detection, and a headless UI
              library for React.
            </p>
            <LiveAmharicDateTime />
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/doc"
                className="w-full sm:w-auto px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-transform transform hover:scale-105"
              >
                Get Started
              </a>
              <GlassCard className="w-full sm:w-auto p-4 flex items-center gap-4">
                <SiNpm size={30} className="text-red-500 flex-shrink-0" />
                <code className="text-sky-600 dark:text-sky-300 text-sm sm:text-base whitespace-nowrap">
                  npm i kenat kenat-ui
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <FiCopy />
                </button>
                <div className="h-8 border-l border-black/10 dark:border-white/20"></div>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <FiDownload />
                  <span className="font-bold text-zinc-800 dark:text-white">
                    {hasMounted ? downloads.toLocaleString() : "..."}
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Powerful Core Logic</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              `kenat` provides a robust, standalone library for all your
              Ethiopian calendar needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiCode size={24} />}
                title="Date Conversion"
                desc="Effortlessly convert dates between Ethiopian and Gregorian calendars with simple functions like toEC and toGC."
              />
              <FeatureCard
                icon={<FiLayout size={24} />}
                title="Calendar Grids"
                desc="Generate complete month data, including headers, days, and holiday information, perfect for building custom calendar UIs."
              />
              <FeatureCard
                icon={<FiToggleLeft size={24} />}
                title="Date Arithmetic"
                desc="Reliably add or subtract days, months, and years from any Ethiopian date."
              />
              <FeatureCard
                icon={<FiCode size={24} />}
                title="Geez Numerals"
                desc="Format dates and numbers using traditional Ge'ez script for an authentic cultural representation."
              />
              <FeatureCard
                icon={<FiCode size={24} />}
                title="Bahire Hasab"
                desc="Calculate movable feasts and fasts like Easter and Lent using the ancient Bahire Hasab computational system."
              />
              <FeatureCard
                icon={<FiCode size={24} />}
                title="Holiday System"
                desc="Detect fixed, movable, and tagged holidays with a flexible system that supports filtering by type (e.g., PUBLIC, RELIGIOUS)."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white/5 dark:bg-black/20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Flexible UI with `kenat-ui`
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              `kenat-ui` is a headless library that gives you maximum control
              over your UI's appearance while handling all the complex calendar
              logic for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiLayers size={24} />}
                title="Headless by Design"
                desc="Get powerful hooks and functions for state management and business logic, without any pre-styled components."
              />
              <FeatureCard
                icon={<FiBox size={24} />}
                title="Bring Your Own Styles"
                desc="You control the markup and styling. Perfect for Tailwind CSS, Chakra UI, or your own design system."
              />
              <FeatureCard
                icon={<FiBox size={24} />}
                title="Reusable Components"
                desc="Build custom date pickers, clocks, and calendars that are fully reusable across different themes and applications."
              />
            </div>
          </div>
        </section>

        <section className="py-20 text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Explore the comprehensive documentation for guides and API
            references, or dive into the source code on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/doc"
              className="px-8 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-transform transform hover:scale-105"
            >
              Read the Docs
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/MelakuDemeke/kenat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white dark:bg-zinc-700 font-semibold rounded-lg shadow-lg hover:bg-zinc-600 transition-transform transform hover:scale-105"
              >
                <FiGithub />
                <span>kenat</span>
              </a>
              <a
                href="https://github.com/MelakuDemeke/kenat-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white dark:bg-zinc-700 font-semibold rounded-lg shadow-lg hover:bg-zinc-600 transition-transform transform hover:scale-105"
              >
                <FiGithub />
                <span>kenat-ui</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}