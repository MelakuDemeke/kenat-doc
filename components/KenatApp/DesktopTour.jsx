"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";
import { WindowFrame } from "@/components/KenatApp/DeviceFrames";

const VIEWS = [
  {
    key: "calendar",
    label: "Calendar",
    desc: "Month, week, day, schedule and year views. Ethiopian dates lead, Gregorian sits in every cell, and the day panel keeps today's agenda and the next holiday in view.",
    alt: "Kenat for Windows month view: Ethiopian month Hidar with Gregorian dates in each cell, events, fasting bands and a day panel",
  },
  {
    key: "bahire-hasab",
    label: "Bahire Hasab",
    desc: "The year worked out step by step, from Amete Alem to Nineveh, beside the full timeline of movable fasts and feasts.",
    alt: "Kenat for Windows Bahire Hasab page: the derivation chain and the feasts timeline",
  },
  {
    key: "convert",
    label: "Convert",
    desc: "Type or pick either date and the other follows. Below it: the weekday, how far it is from today and the holidays that week.",
    alt: "Kenat for Windows converter showing an Ethiopian and a Gregorian date side by side",
  },
  {
    key: "holidays",
    label: "Holidays",
    desc: "Every public, Orthodox, Muslim and cultural holiday of the year, grouped by month, each with its own artwork.",
    alt: "Kenat for Windows holidays page listing holidays by Ethiopian month with artwork",
  },
  {
    key: "tasks",
    label: "Tasks",
    desc: "Tasks with Ethiopian due dates and repeats, in a board on wide windows.",
    alt: "Kenat for Windows tasks page",
  },
  {
    key: "widgets",
    label: "Widgets",
    desc: "Put today's date, the month, a clock, a countdown and more on the desktop. Each one floats, resizes and can stay on top.",
    alt: "Kenat for Windows widgets page with today, month, countdown, analog clock, digital clock and two-month widgets",
  },
];

export function DesktopTour() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (e.key === "Home" || e.key === "End" || step) {
      e.preventDefault();
      const next =
        e.key === "Home" ? 0 : e.key === "End" ? VIEWS.length - 1 : (active + step + VIEWS.length) % VIEWS.length;
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
      <div
        role="tablist"
        aria-label="Kenat for Windows pages"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="lg:col-span-4 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:gap-1 lg:overflow-visible"
      >
        {VIEWS.map((v, i) => {
          const on = i === active;
          return (
            <button
              key={v.key}
              ref={(el) => (tabs.current[i] = el)}
              role="tab"
              id={`desk-tab-${v.key}`}
              aria-selected={on}
              aria-controls="desk-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={clsx(
                "shrink-0 rounded-xl text-left transition-colors lg:px-4 lg:py-3.5",
                "px-3.5 py-2 text-sm lg:text-base",
                on
                  ? "bg-[var(--bg)] shadow-sm ring-1 ring-[var(--border)] dark:bg-[var(--surface)]"
                  : "k-muted hover:bg-[var(--bg)]/70 hover:text-[var(--fg)] dark:hover:bg-white/5"
              )}
            >
              <span className={clsx("font-semibold tracking-[-0.01em]", on && "text-[var(--fg)]")}>{v.label}</span>
              <span
                className={clsx(
                  "mt-1 hidden text-[0.94rem] leading-relaxed k-muted",
                  on ? "lg:block" : "lg:hidden"
                )}
              >
                {v.desc}
              </span>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8 min-w-0">
        <p className="mb-4 text-[0.95rem] leading-relaxed k-muted lg:hidden">{VIEWS[active].desc}</p>
        <div id="desk-panel" role="tabpanel" aria-labelledby={`desk-tab-${VIEWS[active].key}`}>
          <WindowFrame>
            {VIEWS.map((v, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={v.key}
                src={`/app/desktop/${v.key}.webp`}
                alt={i === active ? v.alt : ""}
                aria-hidden={i !== active}
                width={1360}
                height={832}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={clsx(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none",
                  i === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </WindowFrame>
        </div>
      </div>
    </div>
  );
}
