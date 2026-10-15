"use client";

import { useEffect, useMemo, useState } from "react";
import Kenat, { toGeez, monthNames, getHolidaysForYear } from "kenat";
import { dayPart } from "@/lib/dayPart";

const GREGORIAN = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function nextHoliday(et) {
  const order = (d) => d.month * 100 + d.day;
  const today = order(et);
  const sorted = (year) =>
    getHolidaysForYear(year, { lang: "english" })
      .filter((h) => h.ethiopian)
      .sort((a, b) => order(a.ethiopian) - order(b.ethiopian));
  try {
    return sorted(et.year).find((h) => order(h.ethiopian) >= today) ?? sorted(et.year + 1)[0] ?? null;
  } catch {
    return null;
  }
}

export function TodayCard() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Kenat());
    const t = setInterval(() => setNow(new Kenat()), 30_000);
    return () => clearInterval(t);
  }, []);

  const data = useMemo(() => {
    if (!now) return null;
    const et = now.getEthiopian();
    const gc = now.getGregorian();
    const time = now.getCurrentTime();
    return {
      et,
      weekday: now.format({ lang: "amharic", showWeekday: true }).split(",")[0],
      month: monthNames.amharic[et.month - 1],
      monthEn: monthNames.english?.[et.month - 1],
      gregorian: GREGORIAN.format(new Date(gc.year, gc.month - 1, gc.day)),
      time: `${time.hour}:${String(time.minute).padStart(2, "0")}`,
      period: dayPart(new Date().getHours()).am,
      holiday: nextHoliday(et),
    };
  }, [now]);

  return (
    <figure
      className="relative k-card w-full max-w-[26rem] mx-auto lg:mx-0 overflow-visible"
      aria-label="Today's date in the Ethiopian calendar, computed live by kenat"
    >
      <div className="flex items-center justify-between border-b k-border px-6 py-3.5 text-sm">
        <span className="font-medium">Today</span>
        <span className="inline-flex items-center gap-1.5 k-subtle">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          Live
        </span>
      </div>

      <div className="px-6 pt-6 pb-6 min-h-[22rem]">
        {data ? (
          <>
            <div className="relative">
              <span className="k-am k-muted text-base">{data.weekday}</span>
            </div>

            <div className="relative mt-1 flex items-baseline gap-3 k-rise">
              <span className="k-am text-5xl sm:text-6xl leading-tight tracking-tight">{data.month}</span>
              <span className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] tabular leading-none k-accent">
                {data.et.day}
              </span>
            </div>

            <div className="relative mt-2 flex items-baseline gap-2 text-sm k-muted k-rise k-rise-2">
              <span>
                {data.monthEn} {data.et.day}, {data.et.year} E.C.
              </span>
              <span aria-hidden="true">·</span>
              <span className="k-am">{toGeez(data.et.day)} {data.month} {toGeez(data.et.year)}</span>
            </div>

            <dl className="mt-7 divide-y divide-[var(--border)] border-y k-border text-sm k-rise k-rise-3">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="k-subtle">Gregorian</dt>
                <dd className="text-right font-medium">{data.gregorian}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="k-subtle">Ethiopian time</dt>
                <dd className="text-right font-medium tabular">
                  {data.time} <span className="k-am k-muted font-normal">{data.period}</span>
                </dd>
              </div>
              {data.holiday && (
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="k-subtle shrink-0">Next holiday</dt>
                  <dd className="text-right font-medium">
                    {data.holiday.name}
                    <span className="block k-subtle font-normal">
                      {monthNames.english?.[data.holiday.ethiopian.month - 1]} {data.holiday.ethiopian.day}
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </>
        ) : (
          <div className="space-y-4" aria-busy="true">
            <div className="h-4 w-16 rounded bg-[var(--surface)] animate-pulse" />
            <div className="h-14 w-56 rounded-lg bg-[var(--surface)] animate-pulse" />
            <div className="h-4 w-40 rounded bg-[var(--surface)] animate-pulse" />
            <div className="h-28 w-full rounded-lg bg-[var(--surface)] animate-pulse" />
          </div>
        )}
      </div>

      <figcaption className="border-t k-border px-6 py-3 text-xs k-subtle">
        Computed in your browser by <code className="font-mono">kenat</code>
      </figcaption>
    </figure>
  );
}
