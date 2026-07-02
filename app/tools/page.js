"use client";

import {
    FiCalendar,
    FiClock,
    FiGrid,
    FiMoon,
    FiGift,
} from "react-icons/fi";
import { ToolCard } from "@/components/ToolCard";
import { SiteFooter } from "@/components/SiteFooter";

const tools = [
    {
        icon: <FiCalendar size={20} />,
        title: "Date Converter",
        link: "/tools/date-converter",
        desc: "Convert dates between Ethiopian and Gregorian calendars instantly.",
        tag: "converter",
    },
    {
        icon: <FiClock size={20} />,
        title: "Time Converter",
        link: "/tools/time-converter",
        desc: "Convert modern 24-hour time to traditional Ethiopian time.",
        tag: "converter",
    },
    {
        icon: <FiGrid size={20} />,
        title: "Month Grid",
        link: "/tools/month-grid",
        desc: "Generate a full calendar grid for any Ethiopian month.",
        tag: "calendar",
    },
    {
        icon: <FiMoon size={20} />,
        title: "Bahire Hasab",
        link: "/tools/bahire-hasab",
        desc: "Calculate movable feasts and fasts for any Ethiopian year.",
        tag: "bahire-hasab",
    },
    {
        icon: <FiGift size={20} />,
        title: "Holiday Browser",
        link: "/tools/holiday-browser",
        desc: "Browse fixed and movable Ethiopian holidays.",
        tag: "holidays",
    },
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-sky-500/30 relative overflow-x-hidden bg-grid-dots">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
            <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                <section className="pt-12 pb-4 text-center space-y-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sky-500 font-semibold">
                        Interactive Tools
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Kenat <span className="text-gradient-sky-purple">Tools</span>
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Ready-to-use tools built with the Kenat ecosystem. Click any tool to start using it immediately.
                    </p>
                </section>

                <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool.title}
                                icon={tool.icon}
                                title={tool.title}
                                link={tool.link}
                                desc={tool.desc}
                                tag={tool.tag}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
