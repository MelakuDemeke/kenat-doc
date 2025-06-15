"use client";

import { useEffect, useState } from "react";
import Kenat from "kenat";
import {
  FiCode,
  FiCopy,
  FiDownload,
  FiBox,
  FiLayers,
  FiToggleLeft,
  FiLayout,
  FiClock,
  FiCalendar,
  FiGithub,
} from "react-icons/fi";
import { SiNpm } from "react-icons/si";

// A custom hook to safely check if the component has mounted on the client
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

// --- Background Effects Component ---
function BackgroundEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let currentX = mouseX, currentY = mouseY;
    let animationFrameId;

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.03;
      currentY += (mouseY - currentY) * 0.03;
      root.style.setProperty("--mouse-x", `${currentX}px`);
      root.style.setProperty("--mouse-y", `${currentY}px`);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="blob" style={{ '--multiplier-x': '0.5', '--multiplier-y': '0.7', width: '600px', height: '600px', top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0) 70%)' }} />
      <div className="blob" style={{ '--multiplier-x': '-0.8', '--multiplier-y': '-0.5', width: '500px', height: '500px', bottom: '-15%', right: '-10%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 70%)' }} />
      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(72px);
          transform: translate(calc(var(--mouse-x, 50vw) * var(--multiplier-x, 0)), calc(var(--mouse-y, 50vh) * var(--multiplier-y, 0)));
          animation: breathing 12s ease-in-out infinite alternate;
          transition: transform 0.2s ease-out;
        }
        .blob:nth-child(2) {
            animation-delay: -6s;
        }
        @keyframes breathing {
          0% { transform: scale(0.9) rotate(-10deg); }
          100% { transform: scale(1.1) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

// --- GlassCard updated for Dark/Light Mode ---
function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg transition-all ${className}`}
    >
      {children}
    </div>
  );
}

function LiveAmharicDateTime() {
  const hasMounted = useHasMounted();
  const [now, setNow] = useState(() => new Kenat());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Kenat()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return <div className="mt-8 h-[28px]" />;

  return (
    <div className="flex items-center justify-center gap-6 text-zinc-600 dark:text-zinc-300 font-mono text-sm mt-8">
      <div className="flex items-center gap-2">
        <FiCalendar className="text-sky-500 dark:text-sky-400" />
        {now.format({ lang: "amharic", showWeekday: true, useGeez: false })}
      </div>
      <div className="flex items-center gap-2">
        <FiClock className="text-sky-500 dark:text-sky-400" />
        {now.format({ includeTime: true, lang: "amharic" }).split(" ").slice(3).join(" ")}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <GlassCard className="p-6 text-left transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-sky-500 dark:text-sky-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{desc}</p>
    </GlassCard>
  );
}

export default function Home() {
  const hasMounted = useHasMounted();
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    async function fetchDownloads() {
      try {
        const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/kenat-ui`);
        const data = await res.json();
        setDownloads(data.downloads || 0);
      } catch (error) {
        setDownloads(0);
      }
    }
    fetchDownloads();
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
              A multi-language toolkit for the Ethiopian calendar, offering date conversion, calendar grids, holiday detection, and a headless UI library for React.
            </p>
            <LiveAmharicDateTime />
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/doc" className="w-full sm:w-auto px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-transform transform hover:scale-105">
                Get Started
              </a>
              <GlassCard className="w-full sm:w-auto p-4 flex items-center gap-4">
                <SiNpm size={30} className="text-red-500 flex-shrink-0" />
                <code className="text-sky-600 dark:text-sky-300 text-sm sm:text-base whitespace-nowrap">
                  npm i kenat kenat-ui
                </code>
                <button onClick={copyToClipboard} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">
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

        {/* Features Sections */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Powerful Core Logic</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              `kenat` provides a robust, standalone library for all your Ethiopian calendar needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={<FiCode size={24} />} title="Date Conversion" desc="Effortlessly convert dates between Ethiopian and Gregorian calendars with simple functions like toEC and toGC." />
              <FeatureCard icon={<FiLayout size={24} />} title="Calendar Grids" desc="Generate complete month data, including headers, days, and holiday information, perfect for building custom calendar UIs." />
              <FeatureCard icon={<FiToggleLeft size={24} />} title="Date Arithmetic" desc="Reliably add or subtract days, months, and years from any Ethiopian date." />
              <FeatureCard icon={<FiCode size={24} />} title="Geez Numerals" desc="Format dates and numbers using traditional Ge'ez script for an authentic cultural representation." />
              <FeatureCard icon={<FiCode size={24} />} title="Bahire Hasab" desc="Calculate movable feasts and fasts like Easter and Lent using the ancient Bahire Hasab computational system." />
              <FeatureCard icon={<FiCode size={24} />} title="Holiday System" desc="Detect fixed, movable, and tagged holidays with a flexible system that supports filtering by type (e.g., PUBLIC, RELIGIOUS)." />
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white/5 dark:bg-black/20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Flexible UI with `kenat-ui`</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              `kenat-ui` is a headless library that gives you maximum control over your UI's appearance while handling all the complex calendar logic for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={<FiLayers size={24} />} title="Headless by Design" desc="Get powerful hooks and functions for state management and business logic, without any pre-styled components." />
              <FeatureCard icon={<FiBox size={24} />} title="Bring Your Own Styles" desc="You control the markup and styling. Perfect for Tailwind CSS, Chakra UI, or your own design system." />
              <FeatureCard icon={<FiBox size={24} />} title="Reusable Components" desc="Build custom date pickers, clocks, and calendars that are fully reusable across different themes and applications." />
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Explore the comprehensive documentation for guides and API references, or dive into the source code on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="/doc" className="px-8 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-transform transform hover:scale-105">
              Read the Docs
            </a>
            <div className="flex items-center gap-4">
              <a href="https://github.com/MelakuDemeke/kenat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white dark:bg-zinc-700 font-semibold rounded-lg shadow-lg hover:bg-zinc-600 transition-transform transform hover:scale-105">
                <FiGithub /><span>kenat</span>
              </a>
              <a href="https://github.com/MelakuDemeke/kenat-ui" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white dark:bg-zinc-700 font-semibold rounded-lg shadow-lg hover:bg-zinc-600 transition-transform transform hover:scale-105">
                <FiGithub /><span>kenat-ui</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}