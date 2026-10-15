"use client";

import React, { useState, useEffect, useMemo } from "react";
import Kenat, { toEC, toGC, MonthGrid, getBahireHasab, Time, toGeez, HolidayTags, monthNames } from "kenat";
import { EthiopianTimePanel } from "@/components/EthiopianTimePanel";
import { FiCopy, FiCheck, FiChevronLeft, FiChevronRight, FiXCircle } from "react-icons/fi";
import { clsx } from "clsx";

const CODE_TEMPLATES = {
  converter: `import { toEC, toGC } from 'kenat';

// 1. Convert Gregorian to Ethiopian
const ecDate = toEC(2026, 7, 2);
// Returns: { year: 2018, month: 10, day: 25 }

// 2. Convert Ethiopian to Gregorian
const gcDate = toGC(2018, 10, 25);
// Returns: { year: 2026, month: 7, day: 2 }`,

  grid: `import { MonthGrid } from 'kenat';

// Generate calendar grid for Hamle 2018 (EC)
const grid = new MonthGrid({
  year: 2018,
  month: 11,
  weekdayLang: 'amharic',
  mode: 'public'
});

const data = grid.generate();
// data.days includes weekday details, holidays, and Gregorian mapping`,

  bahire: `import { getBahireHasab } from 'kenat';

// Calculate movable fasts & feasts for 2018 (EC)
const data = getBahireHasab(2018, { lang: 'amharic' });

console.log(data.newYear.dayName); // e.g. "ማክሰኞ"
console.log(data.movableFeasts.fasika.ethiopian); // Easter date`,

  clock: `import { Time, toGeez } from 'kenat';

// Convert 24h Gregorian time to 12h Ethiopian time
const ethTime = Time.fromGregorian(17, 30); // 5:30 PM

console.log(ethTime.hour);   // 11 (11th hour of day)
console.log(ethTime.period); // "night" (ምሽት, evening)
console.log(toGeez(ethTime.hour)); // "፲፩"`
};

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState("converter");
  const [copied, setCopied] = useState(false);

  // Copy handler
  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_TEMPLATES[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full k-card overflow-hidden">
      <div className="border-b k-border px-4 sm:px-5 py-3 overflow-x-auto">
        <div role="tablist" aria-label="Playground demos" className="inline-flex rounded-lg bg-[var(--surface)] p-1 text-sm">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "whitespace-nowrap rounded-md px-3.5 py-1.5 transition-colors",
                activeTab === tab.key
                  ? "bg-[var(--bg)] text-[var(--fg)] font-medium shadow-sm"
                  : "k-muted hover:text-[var(--fg)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo on the left, code on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[520px]">
        <div className="lg:col-span-6 min-w-0 p-5 sm:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r k-border">
          {activeTab === "converter" && <ConverterDemo />}
          {activeTab === "grid" && <GridDemo />}
          {activeTab === "bahire" && <BahireDemo />}
          {activeTab === "clock" && <ClockDemo />}
        </div>

        <div className="lg:col-span-6 bg-[var(--code-bg)] text-[var(--code-fg)] flex flex-col font-mono text-sm min-w-0">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-xs text-[var(--code-fg)]/60">
            <span>example.js</span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 hover:text-[var(--code-fg)] transition-colors"
              aria-label="Copy example code"
            >
              {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="flex-1 overflow-x-auto px-6 py-6">
            <pre className="text-[0.82rem] leading-relaxed">
              <code>{CODE_TEMPLATES[activeTab]}</code>
            </pre>
          </div>
          <div className="border-t border-white/10 px-6 py-3 text-xs text-[var(--code-fg)]/50">
            npm install kenat
          </div>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { key: "converter", label: "Conversion" },
  { key: "grid", label: "Month grid" },
  { key: "bahire", label: "Bahire Hasab" },
  { key: "clock", label: "Ethiopian time" },
];

/* ==================== DEMO SUB-COMPONENTS ==================== */

// 1. Converter Demo
function ConverterDemo() {
  const [ec, setEc] = useState({ year: 2018, month: 10, day: 25 });
  const [gc, setGc] = useState({ year: 2026, month: 7, day: 2 });

  const gcResult = useMemo(() => {
    try {
      const { year, month, day } = toGC(ec.year, ec.month, ec.day);
      return { ok: true, text: `${year}/${month}/${day}` };
    } catch {
      return { ok: false, text: "Invalid Ethiopian Date" };
    }
  }, [ec]);

  const ecResult = useMemo(() => {
    try {
      const { year, month, day } = toEC(gc.year, gc.month, gc.day);
      return { ok: true, text: `${year}/${month}/${day}` };
    } catch {
      return { ok: false, text: "Invalid Gregorian Date" };
    }
  }, [gc]);

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-white/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-600/60";

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h3 className="text-2xl font-semibold tracking-[-0.02em]">Date conversion</h3>

      <div className="border-b k-border">
        {/* EC to GC */}
        <div className="border-t k-border py-5">
          <span className="text-sm k-muted block mb-2.5">Ethiopian → Gregorian</span>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={ec.year}
              onChange={(e) => setEc({ ...ec, year: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Year" aria-label="Year"
            />
            <input
              type="number"
              value={ec.month}
              onChange={(e) => setEc({ ...ec, month: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Month" aria-label="Month"
            />
            <input
              type="number"
              value={ec.day}
              onChange={(e) => setEc({ ...ec, day: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Day" aria-label="Day"
            />
          </div>
          <p aria-live="polite" className={`mt-3 flex items-baseline gap-2 ${gcResult.ok ? '' : 'text-red-700 dark:text-red-400'}`}>
            {!gcResult.ok && <FiXCircle className="self-center" />}<span className="text-sm k-subtle">Gregorian</span> <span className={`font-mono text-lg font-semibold tabular ${gcResult.ok ? 'k-accent' : ''}`}>{gcResult.text}</span>
          </p>
        </div>

        {/* GC to EC */}
        <div className="border-t k-border py-5">
          <span className="text-sm k-muted block mb-2.5">Gregorian → Ethiopian</span>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={gc.year}
              onChange={(e) => setGc({ ...gc, year: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Year" aria-label="Year"
            />
            <input
              type="number"
              value={gc.month}
              onChange={(e) => setGc({ ...gc, month: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Month" aria-label="Month"
            />
            <input
              type="number"
              value={gc.day}
              onChange={(e) => setGc({ ...gc, day: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Day" aria-label="Day"
            />
          </div>
          <p aria-live="polite" className={`mt-3 flex items-baseline gap-2 ${ecResult.ok ? '' : 'text-red-700 dark:text-red-400'}`}>
            {!ecResult.ok && <FiXCircle className="self-center" />}<span className="text-sm k-subtle">Ethiopian</span> <span className={`font-mono text-lg font-semibold tabular ${ecResult.ok ? 'k-accent' : ''}`}>{ecResult.text}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// 2. Month Grid Demo
function GridDemo() {
  const [date, setDate] = useState(() => {
    const today = new MonthGrid().generate();
    return { year: parseInt(today.year), month: today.month };
  });

  const gridData = useMemo(() => {
    try {
      const grid = new MonthGrid({
        year: date.year,
        month: date.month,
        weekdayLang: "amharic",
        weekStart: 1,
        mode: "public"
      });
      return grid.generate();
    } catch {
      return null;
    }
  }, [date]);

  const goNextMonth = () => {
    setDate((d) => (d.month === 13 ? { year: d.year + 1, month: 1 } : { ...d, month: d.month + 1 }));
  };

  const goPrevMonth = () => {
    setDate((d) => (d.month === 1 ? { year: d.year - 1, month: 13 } : { ...d, month: d.month - 1 }));
  };

  if (!gridData) return <div className="text-center font-mono text-sm">Generating grid...</div>;

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="flex items-center justify-between border-b k-border pb-3">
        <button onClick={goPrevMonth} aria-label="Previous month" className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
          <FiChevronLeft className="text-lg" />
        </button>
        <span className="flex items-baseline gap-2">
          <span className="k-am text-xl">{monthNames.amharic[gridData.month - 1]}</span>
          <span className="k-muted text-lg tabular">{gridData.year}</span>
        </span>
        <button onClick={goNextMonth} aria-label="Next month" className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
          <FiChevronRight className="text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs k-accent mb-1">
        {gridData.headers.map((h, i) => (
          <div key={i}>{h.slice(0, 2)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {gridData.days.map((day, i) => {
          if (!day) return <div key={i} className="aspect-square" />;
          const isToday = day.isToday;
          const isHoliday = day.holidays.length > 0;
          return (
            <div
              key={i}
              title={isHoliday ? day.holidays.map((h) => h.name).join(", ") : undefined}
              className={clsx(
                "aspect-square flex flex-col justify-center items-center rounded-lg transition-colors",
                isToday
                  ? "bg-sky-500 text-white font-semibold"
                  : isHoliday
                  ? "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 font-semibold ring-1 ring-inset ring-purple-300 dark:ring-purple-500/40"
                  : "hover:bg-[var(--surface)]"
              )}
            >
              <span className="text-sm font-medium leading-none tabular">{day.ethiopian.day}</span>
              <span className="text-[9px] opacity-70 tabular mt-0.5">{day.gregorian.day}</span>
            </div>
          );
        })}
      </div>

      <div className="text-xs k-muted flex items-center gap-6 border-t k-border pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[1px] bg-sky-500"></span>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[1px] ring-1 ring-inset ring-purple-400 bg-purple-100 dark:bg-purple-500/20"></span>
          <span>Holiday</span><span className="ml-auto k-subtle">Gregorian day beneath</span>
        </div>
      </div>
    </div>
  );
}

// 3. Bahire Hasab Demo
function BahireDemo() {
  const currentEthYear = useMemo(() => new Kenat().getEthiopian().year, []);
  const [year, setYear] = useState(currentEthYear);
  const [bahireData, setBahireData] = useState(null);

  useEffect(() => {
    try {
      if (year >= 1 && year <= 9999) {
        const data = getBahireHasab(year, { lang: "amharic" });
        setBahireData(data);
      }
    } catch {
      setBahireData(null);
    }
  }, [year]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return `${date.year}/${String(date.month).padStart(2, "0")}/${String(date.day).padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <h3 className="text-2xl font-semibold tracking-[-0.02em]">Bahire Hasab</h3>

      <label className="flex items-center gap-3 text-sm k-muted">
        Ethiopian year
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value || "1"))}
          className="w-28 px-3 py-2 rounded-lg bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[var(--fg)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-600/60"
        />
      </label>

      {bahireData && (
        <dl className="border-b k-border">
          {[
            ["Evangelist", "ወንጌላዊ", bahireData.evangelist.name, true],
            ["Wenber", "ወንበር", bahireData.wenber, false],
            ["New Year falls on", "ዘመን መለወጫ", bahireData.newYear.dayName, true],
            ["Fast of Nineveh", "ነነዌ", formatDate(bahireData.nineveh), false],
          ].map(([en, am, value, geez]) => (
            <div key={en} className="flex items-baseline justify-between gap-4 border-t k-border py-3">
              <dt className="text-sm k-muted">
                {en} <span className="k-am k-subtle">{am}</span>
              </dt>
              <dd className={geez ? "k-am text-lg" : "font-mono text-sm tabular"}>{value}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 border-t k-border py-3">
            <dt className="text-sm k-muted">
              Easter <span className="k-am k-subtle">ትንሣኤ</span>
            </dt>
            <dd className="font-mono text-lg font-semibold k-accent tabular">
              {formatDate(bahireData.movableFeasts.fasika.ethiopian)}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}

// 4. Clock Demo
function ClockDemo() {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-5">
      <div className="text-center">
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">Ethiopian time</h3>
        <p className="text-sm k-muted mt-2 max-w-xs">
          The Ethiopian day starts at sunrise, so 6:00 AM Gregorian reads as 12:00.
        </p>
      </div>
      <EthiopianTimePanel size={220} compact />
    </div>
  );
}
