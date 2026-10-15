"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Time, toGeez } from "kenat";
import { dayPart } from "@/lib/dayPart";

const C = 120; // centre of the 240×240 viewBox


function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  // Rounded so server and client render identical attribute strings.
  return [Math.round((C + r * Math.cos(a)) * 100) / 100, Math.round((C + r * Math.sin(a)) * 100) / 100];
}

/** Angles for the Ethiopian dial: the hour hand points at the Ethiopian hour (12 at sunrise / sunset). */
function anglesFor(date) {
  const ms = date.getMilliseconds();
  const s = date.getSeconds() + ms / 1000;
  const m = date.getMinutes() + s / 60;
  const ethHour = (date.getHours() + 6) % 12; // 0 means 12
  return { hour: (ethHour + m / 60) * 30, minute: m * 6, second: s * 6 };
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/**
 * Analog Ethiopian clock drawn in SVG. Hours count from sunrise (6:00 → 12),
 * labels can be Ge'ez or Arabic numerals, and the second hand sweeps smoothly.
 */
export function EthiopianClockFace({ useGeez = true, size = 240, className = "" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [period, setPeriod] = useState(null);

  useEffect(() => {
    let raf;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let last = -1;
    const tick = () => {
      const now = new Date();
      const a = anglesFor(now);
      const secAngle = reduce ? Math.floor(a.second / 6) * 6 : a.second;
      hourRef.current?.setAttribute("transform", `rotate(${a.hour} ${C} ${C})`);
      minuteRef.current?.setAttribute("transform", `rotate(${a.minute} ${C} ${C})`);
      secondRef.current?.setAttribute("transform", `rotate(${secAngle} ${C} ${C})`);
      const p = dayPart(now.getHours()).am;
      if (p !== last) {
        last = p;
        setPeriod(p);
      }
      raf = reduce ? setTimeout(tick, 1000) : requestAnimationFrame(tick);
    };
    tick();
    return () => (reduce ? clearTimeout(raf) : cancelAnimationFrame(raf));
  }, []);

  const part = period ? dayPart(new Date().getHours()) : null;
  const night = part?.night;

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label="Analog clock showing the current Ethiopian time"
      className={className}
    >
      <defs>
        <radialGradient id={`face-${uid}`} cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="var(--clock-face-hi)" />
          <stop offset="100%" stopColor="var(--clock-face)" />
        </radialGradient>
        <filter id={`shadow-${uid}`} filterUnits="userSpaceOnUse" x="0" y="0" width="240" height="240">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Bezel and face */}
      <circle cx={C} cy={C} r="118" fill="var(--clock-bezel)" />
      <circle cx={C} cy={C} r="110" fill={`url(#face-${uid})`} stroke="var(--border)" />

      {/* Minute ticks */}
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        const [x1, y1] = polar(major ? 94 : 99, i * 6);
        const [x2, y2] = polar(104, i * 6);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={major ? "var(--fg)" : "var(--subtle)"}
            strokeOpacity={major ? 0.85 : 0.45}
            strokeWidth={major ? 2.4 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Ethiopian hour numerals */}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const [x, y] = polar(78, n * 30);
        return (
          <text
            key={n}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--fg)"
            style={{
              fontFamily: useGeez ? "var(--font-am)" : "var(--font-sans)",
              fontSize: useGeez ? 15 : 16,
              fontWeight: n % 3 === 0 ? 700 : 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {useGeez ? toGeez(n) : n}
          </text>
        );
      })}

      {/* Day / night badge */}
      {period && (
        <g transform={`translate(${C} ${C + 36})`}>
          <rect x="-36" y="-12" width="72" height="24" rx="12" fill="var(--clock-chip)" />
          <g transform="translate(-28 -7)" color={night ? "#0284c7" : "#f59e0b"}>
            {night ? <MoonIcon width="14" height="14" /> : <SunIcon width="14" height="14" />}
          </g>
          <text x="7" y="1" textAnchor="middle" dominantBaseline="central" fill="var(--muted)" style={{ fontFamily: "var(--font-am)", fontSize: 11, fontWeight: 600 }}>
            {part.am}
          </text>
        </g>
      )}

      {/* Hands (rotated imperatively each frame) */}
      <g ref={hourRef} filter={`url(#shadow-${uid})`}>
        <line x1={C} y1={C + 12} x2={C} y2={C - 52} stroke="var(--fg)" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g ref={minuteRef} filter={`url(#shadow-${uid})`}>
        <line x1={C} y1={C + 14} x2={C} y2={C - 80} stroke="var(--fg)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <g ref={secondRef}>
        <line x1={C} y1={C + 20} x2={C} y2={C - 90} stroke="var(--clock-second)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx={C} cy={C - 90} r="2.5" fill="var(--clock-second)" />
      </g>
      <circle cx={C} cy={C} r="5.5" fill="var(--fg)" />
      <circle cx={C} cy={C} r="2.5" fill="var(--clock-second)" />
    </svg>
  );
}

/** Live digital readout that matches the clock face. */
export function useEthiopianNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const eth = Time.fromGregorian(now.getHours(), now.getMinutes());
  return { now, eth, period: dayPart(now.getHours()) };
}
