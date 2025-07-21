"use client";

import {
    FiCalendar,
    FiClock,
    FiGrid,
    FiMoon,
    FiGift,
} from "react-icons/fi";
import { ToolCard } from "@/components/ToolCard";

const tools = [
    {
        icon: <FiCalendar size={32} />,
        title: "Date Converter",
        link: "/tools/date-converter",
        desc: "Convert dates between Ethiopian and Gregorian calendars.",
    },
    {
        icon: <FiClock size={32} />,
        title: "Time Converter",
        link: "/tools/time-converter",
        desc: "Convert modern 24-hour time to traditional Ethiopian time.",
    },
    {
        icon: <FiGrid size={32} />,
        title: "Month Grid",
        link: "/tools/month-grid",
        desc: "Generate a calendar grid for any Ethiopian month.",
    },
    {
        icon: <FiMoon size={32} />,
        title: "Bahire Hasab",
        link: "/tools/bahire-hasab",
        desc: "Calculate movable feasts and fasts.",
    },
    {
        icon: <FiGift size={32} />,
        title: "Holiday Browser",
        link: "/tools/holiday-browser",
        desc: "Browse fixed and movable Ethiopian holidays.",
    },
];

export default function ToolsPage() {
    return (
        <div className="bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50 relative overflow-x-hidden">
            <main className="relative z-10 container mx-auto px-4 py-16">
                <section className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 pb-4">
                        Kenat Tools
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mt-4 max-w-3xl mx-auto">
                        A collection of powerful, ready-to-use tools built with the Kenat
                        ecosystem. Click on a tool to start using it.
                    </p>
                </section>

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool.title}
                                icon={tool.icon}
                                title={tool.title}
                                link={tool.link}
                                desc={tool.desc}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
