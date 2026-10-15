"use client";

import { useEffect, useState } from "react";
import { FiCopy, FiCheck, FiArrowRight, FiArrowDown, FiGithub, FiRepeat, FiGrid, FiPlusCircle, FiHash, FiSun, FiGift, FiTerminal } from "react-icons/fi";
import { SiJavascript, SiReact, SiPython, SiFlutter, SiPhp } from "react-icons/si";
import { clsx } from "clsx";

import { useHasMounted } from "@/hooks/useHasMounted";
import InteractivePlayground from "@/components/Landing/InteractivePlayground";
import { SiteFooter } from "@/components/SiteFooter";
import { DateQuickLinks } from "@/components/Dates/DateQuickLinks";

import { TodayCard } from "@/components/Landing/TodayCard";
import { AppsUsingKenat } from "@/components/Landing/AppsUsingKenat";
import { HeroBackdrop } from "@/components/Landing/HeroBackdrop";
import { OrbitingLanguageIcons } from "@/components/Landing/OrbitingLanguageIcons";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=me.melaku.kenat";
const PLAY_STORE_BADGE_SRC = "/Google_Play_Store_badge_EN.svg";

const INSTALLERS = [
  { key: "npm", label: "npm", command: "npm install kenat kenat-ui" },
  { key: "pip", label: "pip", command: "pip install kenat" },
  { key: "pub", label: "pub", command: "dart pub add kenat" },
  { key: "composer", label: "composer", command: "composer require melakudemeke/kenat-php" },
];

const ENGINE = [
  {
    title: "Date conversion",
    Icon: FiRepeat,
    api: "toEC() · toGC()",
    desc: "Convert between Ethiopian and Gregorian dates in both directions, including Pagume and leap years.",
  },
  {
    title: "Calendar grids",
    Icon: FiGrid,
    api: "new MonthGrid()",
    desc: "Generate a month as rows of days with weekday headers, Ge'ez numerals, Gregorian twins and holidays attached.",
  },
  {
    title: "Date arithmetic",
    Icon: FiPlusCircle,
    api: "addDays() · diffInDays()",
    desc: "Add or subtract days, months and years, compare dates and measure the distance between them on the Ethiopian calendar.",
  },
  {
    title: "Ge'ez numerals",
    Icon: FiHash,
    api: "toGeez() · toArabic()",
    desc: "Write any number in Ge'ez script and read it back, so dates look the way Ethiopian readers expect.",
  },
  {
    title: "Bahire Hasab",
    Icon: FiSun,
    api: "getBahireHasab(year)",
    desc: "Compute the movable fasts and feasts of any year — Nineveh, Lent, Fasika — from the traditional reckoning.",
  },
  {
    title: "Holiday system",
    Icon: FiGift,
    api: "getHolidaysForYear()",
    desc: "Fixed and movable holidays with tags such as PUBLIC and RELIGIOUS, in Amharic or English.",
  },
];

const BINDINGS = [
  { name: "kenat", Icon: SiJavascript, lang: "JavaScript · TypeScript", install: "npm install kenat", url: "https://github.com/MelakuDemeke/kenat" },
  { name: "kenat-ui", Icon: SiReact, lang: "React hooks", install: "npm install kenat-ui", url: "https://github.com/MelakuDemeke/kenat-ui" },
  { name: "kenat_py", Icon: SiPython, lang: "Python", install: "pip install kenat", url: "https://github.com/MelakuDemeke/kenat_py" },
  { name: "kenat-dart", Icon: SiFlutter, lang: "Dart · Flutter", install: "dart pub add kenat", url: "https://github.com/MelakuDemeke/kenat-dart" },
  { name: "kenat-php", Icon: SiPhp, lang: "PHP", install: "composer require melakudemeke/kenat-php", url: "https://github.com/MelakuDemeke/kenat-php" },
  { name: "kenat-cli", Icon: FiTerminal, lang: "Command line", install: "npm install -g kenat-cli", url: "https://github.com/MelakuDemeke/kenat-cli" },
];

const UI_SNIPPET = `import { useMonthGrid } from 'kenat-ui'

const { grid, controls } = useMonthGrid({
  weekdayLang: 'amharic',
  weekStart: 1,
})

// grid.headers, grid.days — render them
// with your own markup and styles.
controls.goNext()`;

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = (key, text) => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(key);
        setTimeout(() => setCopied(null), 1800);
      },
      () => setCopied(null)
    );
  };
  return [copied, copy];
}

function InstallLine() {
  const hasMounted = useHasMounted();
  const [active, setActive] = useState("npm");
  const [downloads, setDownloads] = useState(null);
  const [copied, copy] = useCopy();
  const current = INSTALLERS.find((i) => i.key === active);

  useEffect(() => {
    fetch("/api/downloads")
      .then((r) => r.json())
      .then((data) => setDownloads(data.total ?? null))
      .catch(() => setDownloads(null));
  }, []);

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mb-3">
        <div role="tablist" aria-label="Package manager" className="inline-flex rounded-lg border k-border bg-[var(--surface)] p-0.5 text-sm">
          {INSTALLERS.map((item) => (
            <button
              key={item.key}
              role="tab"
              aria-selected={active === item.key}
              onClick={() => setActive(item.key)}
              className={clsx(
                "rounded-md px-3 py-1 font-mono transition-colors",
                active === item.key ? "bg-[var(--bg)] text-[var(--fg)] font-medium shadow-sm" : "k-subtle hover:text-[var(--fg)]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {hasMounted && downloads ? (
          <span className="text-sm k-subtle tabular">{downloads.toLocaleString()} downloads</span>
        ) : null}
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--code-bg)] border border-white/5 pl-5 pr-2 py-2 font-mono text-[0.92rem]">
        <span className="k-accent select-none" aria-hidden="true">$</span>
        <code className="flex-1 min-w-0 break-words py-1 text-[var(--code-fg)] select-all">{current.command}</code>
        <button
          onClick={() => copy(active, current.command)}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs text-[var(--code-fg)]/70 hover:text-[var(--code-fg)] hover:bg-white/5 transition-colors"
          aria-label="Copy install command"
        >
          {copied === active ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
          <span>{copied === active ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}

function SectionHead({ title, children }) {
  return (
    <header className="max-w-2xl">
      <h2 className="text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.08] text-balance">{title}</h2>
      {children && <p className="mt-4 text-lg k-muted leading-relaxed text-pretty">{children}</p>}
    </header>
  );
}

export default function Home() {
  const [copied, copy] = useCopy();

  return (
    <div className="k-page relative min-h-screen overflow-x-clip">
      <HeroBackdrop />
      {/* ---------- Hero ---------- */}
      <section className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 pt-12 pb-14 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8 min-w-0">
            <h1 className="text-[2.6rem] sm:text-6xl xl:text-[4.5rem] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
              The Ethiopian calendar, <span className="text-sky-600 dark:text-sky-400">computed for your code.</span>
            </h1>
            <p className="max-w-[36rem] text-lg sm:text-xl k-muted leading-relaxed text-pretty">
              Date conversion, holidays, Bahire Hasab, Ge&apos;ez numerals and headless calendar UI. One engine,
              published for JavaScript, Python, Dart, PHP and the command line.
            </p>

            <InstallLine />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <a href="/doc" className="k-btn">
                Read the docs <FiArrowRight aria-hidden="true" />
              </a>
              <a href="#playground" className="k-link inline-flex items-center gap-1.5 font-medium">
                Try it live <FiArrowDown aria-hidden="true" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex sm:ml-auto lg:ml-4 transition-transform hover:-translate-y-px"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PLAY_STORE_BADGE_SRC} alt="Get the Kenat app on Google Play" className="h-11 w-auto" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-6 min-w-0">
            <div className="relative isolate mx-auto w-full max-w-[26rem] lg:mx-0">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/30 blur-[90px] dark:bg-sky-500/20" />
              <OrbitingLanguageIcons />
              <TodayCard />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Apps built with Kenat ---------- */}
      <AppsUsingKenat />

      {/* ---------- Playground ---------- */}
      <section id="playground" className="scroll-mt-24 border-t k-border bg-[var(--surface)]">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <SectionHead title="Try the engine">
            Change a date, step through a month, pick a year. Every value on the left is computed in your browser by
            the same calls shown on the right.
          </SectionHead>
          <div className="mt-12">
            <InteractivePlayground />
          </div>
        </div>
      </section>

      {/* ---------- Engine features ---------- */}
      <section className="border-t k-border">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <SectionHead title="What the engine knows">
            <code className="font-mono text-[0.95em]">kenat</code> has no dependencies. It parses, converts, counts and
            formats Ethiopian dates the way the calendar itself does.
          </SectionHead>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENGINE.map(({ title, api, desc, Icon }) => (
              <li key={title} className="k-card group p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-500/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] k-accent text-lg" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-1.5 k-muted leading-relaxed">{desc}</p>
                <code className="mt-4 inline-block rounded-md bg-[var(--surface)] px-2 py-1 font-mono text-xs k-muted">{api}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- kenat-ui ---------- */}
      <section className="bg-[#0b0b0c] dark:bg-[#111113] text-zinc-100 dark:border-y dark:border-zinc-800">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-20 lg:py-24 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="min-w-0">
            <h2 className="text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.08] text-balance">
              Calendar UI without the styling you&apos;d have to undo.
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-xl">
              <code className="font-mono text-zinc-100">kenat-ui</code> is headless: React hooks for date pickers,
              month grids, clocks and converters that manage state and leave every pixel to you — Tailwind, CSS modules
              or your own design system.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["useDatePicker()", "useMonthGrid()", "useEthiopianClock()", "useDateConverter()", "useTimeConverter()"].map((h) => (
                <li key={h}>
                  <code className="inline-block rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[13px] text-zinc-200">{h}</code>
                </li>
              ))}
            </ul>
            <a href="/doc/Kenat-UI/Installation" className="mt-9 inline-flex items-center gap-2 font-medium text-sky-400 hover:text-white transition-colors">
              kenat-ui docs <FiArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="relative min-w-0 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3 font-mono text-xs text-zinc-500">
              <span>MonthView.jsx</span>
              <button
                onClick={() => copy("ui", UI_SNIPPET)}
                className="inline-flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
                aria-label="Copy kenat-ui example"
              >
                {copied === "ui" ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                {copied === "ui" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.85rem] leading-relaxed text-zinc-200">
              <code>{UI_SNIPPET}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ---------- Bindings ---------- */}
      <section className="border-t k-border">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <SectionHead title="One engine, six bindings">
            The same conversion rules and holiday tables, kept in parity across every language Kenat ships for.
          </SectionHead>
          <ul className="mt-12 k-card divide-y divide-[var(--border)] overflow-hidden">
            {BINDINGS.map((b) => (
              <li
                key={b.name}
                className="group grid grid-cols-1 gap-x-8 gap-y-2 px-5 sm:px-6 py-4 transition-colors hover:bg-[var(--surface)] md:grid-cols-[minmax(11rem,15rem)_minmax(9rem,13rem)_1fr_auto] md:items-center"
              >
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-base font-semibold tracking-[-0.01em] hover:text-[var(--accent)] transition-colors">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface)] k-muted group-hover:bg-[var(--bg)]" aria-hidden="true">
                    <b.Icon />
                  </span>
                  {b.name}
                </a>
                <span className="text-sm k-muted">{b.lang}</span>
                <code className="font-mono text-sm truncate k-muted">
                  <span className="k-accent" aria-hidden="true">$ </span>
                  {b.install}
                </code>
                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => copy(b.name, b.install)}
                    className="inline-flex items-center gap-1.5 k-subtle hover:text-[var(--fg)] transition-colors"
                    aria-label={`Copy install command for ${b.name}`}
                  >
                    {copied === b.name ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    {copied === b.name ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 k-subtle hover:text-[var(--fg)] transition-colors"
                    aria-label={`${b.name} on GitHub`}
                  >
                    <FiGithub /> Source
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 border-t k-border">
        <div className="mx-auto w-full max-w-[88rem] rounded-3xl bg-zinc-900 dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800 text-white px-7 sm:px-12 py-14 lg:py-16 grid grid-cols-1 gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-[2.2rem] sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
              Start building with Kenat.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-zinc-300 leading-relaxed">
              The guide walks through installation, conversion, formatting, holidays and Bahire Hasab, with an API
              reference for every call.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
            <a
              href="/doc"
              className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-3 font-semibold text-zinc-900 shadow-sm transition-transform hover:-translate-y-px"
            >
              Read the documentation <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="https://github.com/MelakuDemeke/kenat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-semibold text-white ring-1 ring-inset ring-white/40 hover:bg-white/10 transition-colors"
            >
              <FiGithub aria-hidden="true" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <div className="border-t k-border">
        <DateQuickLinks className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-16 lg:py-20" />
      </div>
      <SiteFooter />
    </div>
  );
}
