"use client";

import React, { useState, useEffect, useMemo } from "react";
import Kenat, { toEC, toGC, MonthGrid, getBahireHasab, Time, toGeez, HolidayTags, monthNames } from "kenat";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { FiCopy, FiCheck, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiSettings, FiActivity, FiXCircle } from "react-icons/fi";
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
console.log(ethTime.period); // "ማታ" (Night)
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
    <div className="w-full max-w-6xl mx-auto my-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Interactive Playground</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {["converter", "grid", "bahire", "clock"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-3 py-1.5 rounded-lg font-mono text-xs capitalize transition-all duration-200 border",
                activeTab === tab
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-sm font-semibold"
                  : "bg-transparent text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              {tab === "bahire" ? "Bahire Hasab" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Interactive Demos */}
        <div className="col-span-1 lg:col-span-6 p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
          {activeTab === "converter" && <ConverterDemo />}
          {activeTab === "grid" && <GridDemo />}
          {activeTab === "bahire" && <BahireDemo />}
          {activeTab === "clock" && <ClockDemo />}
        </div>

        {/* Right Column: Code Snippet */}
        <div className="col-span-1 lg:col-span-6 bg-zinc-950 p-6 flex flex-col justify-between font-mono text-sm relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all text-xs"
            >
              {copied ? (
                <>
                  <FiCheck className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto pt-6 lg:pt-8 text-zinc-300">
            <pre className="text-xs leading-relaxed font-mono select-all">
              <code>{CODE_TEMPLATES[activeTab]}</code>
            </pre>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500">
            <span>npm i kenat</span>
            <span>index.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    "w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-sky-500";

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
          <FiCalendar className="text-sky-500" />
          Date Conversion
        </h3>
        <p className="text-xs text-zinc-500 mt-1">Convert seamlessly between Ethiopian (EC) and Gregorian (GC) calendars.</p>
      </div>

      <div className="space-y-4">
        {/* EC to GC */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Ethiopian (EC) → Gregorian (GC)</span>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={ec.year}
              onChange={(e) => setEc({ ...ec, year: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Year"
            />
            <input
              type="number"
              value={ec.month}
              onChange={(e) => setEc({ ...ec, month: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Month"
            />
            <input
              type="number"
              value={ec.day}
              onChange={(e) => setEc({ ...ec, day: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Day"
            />
          </div>
          <p className={`mt-3 text-sm font-mono font-semibold flex items-center gap-1 ${gcResult.ok ? 'text-sky-600 dark:text-sky-400' : 'text-red-600 dark:text-red-400'}`}>
            {!gcResult.ok && <FiXCircle />} GC Date: <span className="underline decoration-dotted">{gcResult.text}</span>
          </p>
        </div>

        {/* GC to EC */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Gregorian (GC) → Ethiopian (EC)</span>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={gc.year}
              onChange={(e) => setGc({ ...gc, year: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Year"
            />
            <input
              type="number"
              value={gc.month}
              onChange={(e) => setGc({ ...gc, month: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Month"
            />
            <input
              type="number"
              value={gc.day}
              onChange={(e) => setGc({ ...gc, day: parseInt(e.target.value || "1") })}
              className={inputClass}
              placeholder="Day"
            />
          </div>
          <p className={`mt-3 text-sm font-mono font-semibold flex items-center gap-1 ${ecResult.ok ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`}>
            {!ecResult.ok && <FiXCircle />} EC Date: <span className="underline decoration-dotted">{ecResult.text}</span>
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
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button onClick={goPrevMonth} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
          <FiChevronLeft className="text-lg" />
        </button>
        <span className="font-mono text-sm font-bold">
          {monthNames.amharic[gridData.month - 1]} {gridData.year}
        </span>
        <button onClick={goNextMonth} className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
          <FiChevronRight className="text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
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
                "aspect-square flex flex-col justify-center items-center rounded border transition-colors",
                isToday
                  ? "bg-sky-500 text-white border-sky-600 font-semibold"
                  : isHoliday
                  ? "bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-200 dark:border-indigo-800/80"
                  : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-900/80"
              )}
            >
              <span className="font-bold">{day.ethiopian.day}</span>
              <span className="text-[8px] opacity-70">{day.gregorian.day}</span>
            </div>
          );
        })}
      </div>

      <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded bg-sky-500"></span>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded bg-indigo-500"></span>
          <span>Holiday</span>
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
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
          <FiActivity className="text-purple-500" />
          Bahire Hasab Calculations
        </h3>
        <p className="text-xs text-zinc-500 mt-1">Compute Ethiopian movable feasts, fasts, and calendar variables.</p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value || "1"))}
          className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Ethiopian Year"
        />
      </div>

      {bahireData && (
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
            <span className="text-[10px] text-zinc-500 block mb-1">Evangelist (ወንጌላዊ)</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{bahireData.evangelist.name}</span>
          </div>
          <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
            <span className="text-[10px] text-zinc-500 block mb-1">Wenber (ወንበር)</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{bahireData.wenber}</span>
          </div>
          <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
            <span className="text-[10px] text-zinc-500 block mb-1">New Year Day</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{bahireData.newYear.dayName}</span>
          </div>
          <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
            <span className="text-[10px] text-zinc-500 block mb-1">Nineveh Fast</span>
            <span className="font-bold text-zinc-850 dark:text-zinc-200">{formatDate(bahireData.nineveh)}</span>
          </div>
          <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10 col-span-2 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-zinc-500 block mb-0.5">Easter (ትንሳኤ)</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatDate(bahireData.movableFeasts.fasika.ethiopian)}</span>
            </div>
            <span className="text-[10px] border border-indigo-200 dark:border-indigo-950 px-2 py-0.5 rounded bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">Movable Feast</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 4. Clock Demo
function ClockDemo() {
  const [now, setNow] = useState(() => new Date());
  const [ethTime, setEthTime] = useState(() => Time.fromGregorian(now.getHours(), now.getMinutes()));
  const [useGeez, setUseGeez] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      setEthTime(Time.fromGregorian(current.getHours(), current.getMinutes()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => (useGeez ? toGeez(num) : num.toString().padStart(2, "0"));

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6">
      <div className="text-center">
        <h3 className="text-lg font-bold flex items-center justify-center gap-2">
          <FiClock className="text-emerald-500" />
          Geez Clock System
        </h3>
        <p className="text-xs text-zinc-500 mt-1">Ethiopian 12h clock starts at sunrise (6:00 AM Gregorian is 12:00 in Ethiopia).</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Analog Clock representation wrapper */}
        <div className="relative w-40 h-40 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900 flex items-center justify-center shadow-inner">
          <Clock value={now} renderNumbers={false} size={150} className="pointer-events-none" />
          {/* Overlay Ge'ez markers */}
          {[12, 3, 6, 9].map((val) => {
            const label = useGeez ? toGeez(val) : val.toString();
            return (
              <span
                key={val}
                className={clsx(
                  "absolute font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600",
                  val === 12 && "top-2",
                  val === 3 && "right-3",
                  val === 6 && "bottom-2",
                  val === 9 && "left-3"
                )}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Digital display */}
        <div className="text-center font-mono space-y-1">
          <div className="text-2xl font-bold tracking-wider">
            {formatNum(ethTime.hour)}:{formatNum(ethTime.minute)}:{formatNum(now.getSeconds())}
          </div>
          <div className="text-xs text-zinc-500">
            {ethTime.period} • {useGeez ? "ግዕዝ" : "Arabic"}
          </div>
        </div>

        {/* Switch */}
        <button
          onClick={() => setUseGeez(!useGeez)}
          className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors"
        >
          Toggle: {useGeez ? "Ge'ez Numbers" : "Standard Numbers"}
        </button>
      </div>
    </div>
  );
}
