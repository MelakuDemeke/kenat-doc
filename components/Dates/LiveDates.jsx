"use client";

import { useEffect, useState } from "react";
import { toEC, toGeez, monthNames } from "kenat";
import { dayPart } from "@/lib/dayPart";

const ET_TZ = "Africa/Addis_Ababa";

function ethiopiaNow() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ET_TZ, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date()).map((x) => [x.type, x.value])
  );
  return { g: { year: +p.year, month: +p.month, day: +p.day }, hour: +p.hour % 24, minute: +p.minute };
}

const dayNo = (g) => Math.round(Date.UTC(g.year, g.month - 1, g.day) / 86_400_000);

/**
 * A day count that is server-rendered (good for crawlers) and then corrected
 * in the browser, so a cached page never shows a stale countdown.
 */
export function LiveDays({ target, mode = "until", initial }) {
  const [text, setText] = useState(initial);
  useEffect(() => {
    const [y, m, d] = target.split("-").map(Number);
    const diff = dayNo({ year: y, month: m, day: d }) - dayNo(ethiopiaNow().g);
    if (mode === "relative") {
      setText(diff === 0 ? "today" : diff > 0 ? (diff === 1 ? "tomorrow" : `in ${diff} days`) : diff === -1 ? "yesterday" : `${-diff} days ago`);
      return;
    }
    const n = mode === "until" ? diff : -diff;
    if (n < 0) return;
    if (mode === "until") setText(n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`);
    else setText(n === 0 ? "today" : n === 1 ? "yesterday" : `${n} days ago`);
  }, [target, mode]);
  return <span suppressHydrationWarning>{text}</span>;
}

/** Bare day number for big countdown figures. */
export function LiveDayCount({ target, mode = "until", initial }) {
  const [n, setN] = useState(initial);
  useEffect(() => {
    const [y, m, d] = target.split("-").map(Number);
    const diff = dayNo({ year: y, month: m, day: d }) - dayNo(ethiopiaNow().g);
    const v = mode === "until" ? diff : -diff;
    if (v >= 0) setN(v);
  }, [target, mode]);
  return <span suppressHydrationWarning>{n}</span>;
}

/** Current time in Ethiopia on both clocks, ticking every 20 seconds. */
export function LiveEthiopianTime({ initial }) {
  const [t, setT] = useState(initial);
  useEffect(() => {
    const tick = () => {
      const { hour, minute } = ethiopiaNow();
      const mm = String(minute).padStart(2, "0");
      setT({
        ethiopian: `${((hour + 6) % 12) || 12}:${mm}`,
        part: dayPart(hour).am,
        partEn: dayPart(hour).en,
        international: `${String(hour).padStart(2, "0")}:${mm}`,
      });
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span suppressHydrationWarning>
      <span className="tabular">{t.ethiopian}</span> <span className="k-am">{t.part}</span>
      <span className="block k-subtle font-normal text-sm">{t.partEn} · {t.international} EAT (UTC+3)</span>
    </span>
  );
}

/** The Ethiopian date headline; re-checks after midnight in Addis Ababa. */
export function LiveEthiopianDate({ initial }) {
  const [e, setE] = useState(initial);
  useEffect(() => {
    const check = () => {
      const { g } = ethiopiaNow();
      setE(toEC(g.year, g.month, g.day));
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span suppressHydrationWarning className="block">
      <span className="flex flex-wrap items-baseline gap-x-4">
        <span className="k-am text-5xl sm:text-6xl leading-tight">{monthNames.amharic[e.month - 1]}</span>
        <span className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] tabular leading-none k-accent">{e.day}</span>
        <span className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] tabular k-muted">{e.year}</span>
      </span>
      <span className="mt-3 block text-lg k-muted">
        {monthNames.english[e.month - 1]} {e.day}, {e.year} E.C. ·{" "}
        <span className="k-am">{toGeez(e.day)} {monthNames.amharic[e.month - 1]} {toGeez(e.year)}</span>
      </span>
    </span>
  );
}
