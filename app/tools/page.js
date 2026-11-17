import Link from "next/link";
import { FiCalendar, FiClock, FiGrid, FiMoon, FiGift } from "react-icons/fi";
import { ToolCard } from "@/components/ToolCard";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/Dates/DatePageShell";
import { SITE_URL } from "@/lib/seo";

const tools = [
    {
        icon: <FiCalendar size={20} />,
        title: "Ethiopian Date Converter",
        link: "/tools/date-converter",
        desc: "Convert any Ethiopian date to Gregorian, or Gregorian to Ethiopian, including Pagume and leap years.",
        tag: "converter",
    },
    {
        icon: <FiClock size={20} />,
        title: "Ethiopian Time Converter",
        link: "/tools/time-converter",
        desc: "Turn 24-hour time into Ethiopian time, which counts hours from 6:00 AM and 6:00 PM, and back.",
        tag: "converter",
    },
    {
        icon: <FiGrid size={20} />,
        title: "Ethiopian Month Calendar",
        link: "/tools/month-grid",
        desc: "See any Ethiopian month as a calendar grid with Gregorian dates and holidays on every day.",
        tag: "calendar",
    },
    {
        icon: <FiMoon size={20} />,
        title: "Bahire Hasab Calculator",
        link: "/tools/bahire-hasab",
        desc: "Find the Fast of Nineveh, Lent, Fasika and every movable feast for any Ethiopian year.",
        tag: "bahire hasab",
    },
    {
        icon: <FiGift size={20} />,
        title: "Ethiopian Holiday Browser",
        link: "/tools/holiday-browser",
        desc: "List public, Orthodox and Muslim Ethiopian holidays for a year, filtered by type.",
        tag: "holidays",
    },
];

const pages = [
    { label: "Today's Ethiopian date", href: "/today", desc: "Today in the Ethiopian and Gregorian calendars, with Ethiopian time." },
    { label: "Ethiopian holidays this year", href: "/holidays", desc: "Every Ethiopian holiday this year with Gregorian dates." },
    { label: "Ethiopian calendar", href: "/calendar", desc: "All 13 months of the current Ethiopian year." },
    { label: "Kenat documentation", href: "/doc", desc: "Use the same calculations in JavaScript, Python, Dart and PHP." },
];

const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Ethiopian calendar tools",
    itemListElement: tools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.title,
        url: `${SITE_URL}${t.link}`,
    })),
};

export default function ToolsPage() {
    return (
        <div className="k-page min-h-screen overflow-x-clip">
            <JsonLd data={itemListLd} />
            <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-16 pb-24 lg:pt-24">
                <header className="max-w-3xl">
                    <h1 className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
                        Free Ethiopian calendar tools
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl k-muted leading-relaxed max-w-2xl">
                        Convert Ethiopian and Gregorian dates, read Ethiopian time, look up Ethiopian holidays and compute
                        Bahire Hasab in your browser. Every tool runs on the open-source Kenat library, so the results match
                        what developers get from the same calls in code.
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

                <section aria-labelledby="more-pages" className="mt-20 max-w-3xl">
                    <h2 id="more-pages" className="text-2xl font-semibold tracking-[-0.02em]">More Ethiopian calendar pages</h2>
                    <ul className="mt-6 divide-y divide-[var(--border)] border-y k-border">
                        {pages.map((p) => (
                            <li key={p.href} className="py-4">
                                <Link href={p.href} className="k-link font-medium">{p.label}</Link>
                                <p className="mt-1 k-muted">{p.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
