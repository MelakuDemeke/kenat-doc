"use client";

import { useEffect, useState } from 'react';
import Kenat from 'kenat'; // Assuming Kenat is installed and can be imported
import { FiCode, FiCopy, FiDownload, FiBox, FiLayers, FiToggleLeft, FiLayout, FiClock, FiCalendar } from 'react-icons/fi';
import { SiNpm } from 'react-icons/si';

// --- Reusable Glassmorphic Card ---
function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-lg ${className}`}>
      {children}
    </div>
  );
}

// --- Live Amharic Date/Time Component ---
function LiveAmharicDateTime() {
  const [now, setNow] = useState(new Kenat());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Kenat());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 text-zinc-300 font-mono text-sm mt-8">
      <div className="flex items-center gap-2">
        <FiCalendar className="text-sky-400" />
        {now.format({ lang: 'amharic', showWeekday: true, useGeez: false })}
      </div>
      <div className="flex items-center gap-2">
        <FiClock className="text-sky-400" />
        {now.format({ includeTime: true, lang: 'amharic' }).split(' ').slice(3).join(' ')}
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [downloads, setDownloads] = useState(null);

  // --- Mouse Move Effect for Background Blobs ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Fetch NPM Downloads ---
    async function fetchDownloads() {
      try {
        const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/kenat-ui`);
        if (!res.ok) return 0;
        const data = await res.json();
        setDownloads(data.downloads || 0);
      } catch (error) {
        console.error("Failed to fetch downloads:", error);
        setDownloads(0);
      }
    }
    fetchDownloads();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install kenat kenat-ui");
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-zinc-900 text-white selection:bg-purple-500/50">
      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Blobs that react to mouse movement */}
        <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out" style={{ transform: 'translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px))' }}>
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full filter blur-3xl animate-blob"></div>
        </div>
        <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out" style={{ transform: 'translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))' }}>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>


        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400 pb-4">
            Kenat: The Ethiopian Calendar Toolkit
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-2xl mx-auto">
            A multi-language toolkit for the Ethiopian calendar, offering date conversion, calendar grids, holiday detection, and a headless UI library for React.
          </p>

          <LiveAmharicDateTime />

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/doc" className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-200 transition-transform transform hover:scale-105">
              Get Started
            </a>
            <GlassCard className="w-full sm:w-auto p-4 flex items-center gap-4">
              <SiNpm size={30} className="text-red-500 flex-shrink-0" />
              <code className="text-sky-300 text-sm sm:text-base whitespace-nowrap">npm i kenat kenat-ui</code>
              <button onClick={copyToClipboard} className="p-2 text-zinc-400 hover:text-white">
                <FiCopy />
              </button>
              <div className="h-8 border-l border-white/20"></div>
              <div className="flex items-center gap-2 text-zinc-400">
                <FiDownload />
                <span className="font-bold text-white">{downloads !== null ? downloads.toLocaleString() : '...'}</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- Core Features Section --- */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Powerful Core Logic</h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">`kenat` provides a robust, standalone library for all your Ethiopian calendar needs.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<FiCode size={24} />} title="Date Conversion" desc="Effortlessly convert dates between Ethiopian and Gregorian calendars with simple functions like toEC and toGC. " />
            <FeatureCard icon={<FiLayout size={24} />} title="Calendar Grids" desc="Generate complete month data, including headers, days, and holiday information, perfect for building custom calendar UIs. " />
            <FeatureCard icon={<FiToggleLeft size={24} />} title="Date Arithmetic" desc="Reliably add or subtract days, months, and years from any Ethiopian date. " />
            <FeatureCard icon={<FiCode size={24} />} title="Geez Numerals" desc="Format dates and numbers using traditional Ge'ez script for an authentic cultural representation. " />
            <FeatureCard icon={<FiCode size={24} />} title="Bahire Hasab" desc="Calculate movable feasts and fasts like Easter and Lent using the ancient Bahire Hasab computational system. " />
            <FeatureCard icon={<FiCode size={24} />} title="Holiday System" desc="Detect fixed, movable, and tagged holidays with a flexible system that supports filtering by type (e.g., PUBLIC, RELIGIOUS). " />
          </div>
        </div>
      </section>

      {/* --- Headless UI Section --- */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Flexible UI with `kenat-ui`</h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">`kenat-ui` is a headless library that gives you maximum control over your UI's appearance while handling all the complex calendar logic for you. </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<FiLayers size={24} />} title="Headless by Design" desc="Get powerful hooks and functions for state management and business logic, without any pre-styled components. " />
            <FeatureCard icon={<FiBox size={24} />} title="Bring Your Own Styles" desc="You control the markup and styling. Perfect for Tailwind CSS, Chakra UI, or your own design system. " />
            <FeatureCard icon={<FiBox size={24} />} title="Reusable Components" desc="Build custom date pickers, clocks, and calendars that are fully reusable across different themes and applications. " />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 text-center px-4 bg-zinc-900">
        <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Explore the comprehensive documentation for guides and API references, or dive into the source code on GitHub.</p>
        <div className="flex justify-center gap-4">
          <a href="/doc" className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-zinc-200 transition-transform transform hover:scale-105">
            Read the Docs
          </a>
          <a href="https://github.com/MelakuDemeke/kenat-ui" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg shadow-lg hover:bg-zinc-700 transition-transform transform hover:scale-105">
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <GlassCard className="p-6 text-left transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-sky-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
    </GlassCard>
  );
}