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
        <div className="k-page min-h-screen overflow-x-clip">
            <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-16 pb-24 lg:pt-24">
                <header className="max-w-3xl">
                    <h1 className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
                        Tools
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl k-muted leading-relaxed max-w-2xl">
                        Ready-to-use tools built with the Kenat ecosystem. Pick one and start using it immediately.
                    </p>
                </header>

                <nav aria-label="Tools" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                </nav>
            </main>
            <SiteFooter />
        </div>
    );
}
