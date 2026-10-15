"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { toGeez } from "kenat";
import { EthiopianClockFace, useEthiopianNow } from "@/components/EthiopianClockFace";

const GREGORIAN_TIME = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

function NumeralToggle({ useGeez, onChange }) {
  const options = [
    { value: true, label: "ግዕዝ", hint: "Ge'ez numerals", am: true },
    { value: false, label: "123", hint: "Arabic numerals" },
  ];
  return (
    <div role="radiogroup" aria-label="Numerals" className="inline-flex rounded-lg bg-[var(--surface)] p-1 text-sm">
      {options.map((o) => (
        <button
          key={o.label}
          role="radio"
          aria-checked={useGeez === o.value}
          title={o.hint}
          onClick={() => onChange(o.value)}
          className={clsx(
            "rounded-md px-3.5 py-1.5 transition-colors",
            o.am && "k-am",
            useGeez === o.value ? "bg-[var(--bg)] text-[var(--fg)] font-medium shadow-sm" : "k-muted hover:text-[var(--fg)]"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Analog Ethiopian clock with a matching digital readout and the Gregorian equivalent. */
export function EthiopianTimePanel({ size = 240, compact = false }) {
  const [useGeez, setUseGeez] = useState(false);
  const live = useEthiopianNow();
  const fmt = (n) => (useGeez ? toGeez(n) : String(n).padStart(2, "0"));

  return (
    <div className={clsx("flex flex-col items-center", compact ? "gap-5" : "gap-6")}>
      <EthiopianClockFace useGeez={useGeez} size={size} className="max-w-full h-auto" />

      <div className="text-center min-h-[4.5rem]" aria-live="off">
        {live ? (
          <>
            <div className={clsx("flex items-baseline justify-center gap-2 font-semibold tracking-[-0.03em] tabular", compact ? "text-4xl" : "text-5xl")}>
              <span className={useGeez ? "k-am" : ""}>
                {useGeez ? toGeez(live.eth.hour) : live.eth.hour}:{fmt(live.eth.minute)}
              </span>
              <span className="text-xl k-subtle font-medium">:{fmt(live.now.getSeconds())}</span>
            </div>
            <p className="mt-1.5 text-sm k-muted">
              <span className="k-am">{live.period.am}</span> · {live.period.en} · {GREGORIAN_TIME.format(live.now)} Gregorian
            </p>
          </>
        ) : (
          <div className="mx-auto h-12 w-40 rounded-lg bg-[var(--surface)] animate-pulse" />
        )}
      </div>

      <NumeralToggle useGeez={useGeez} onChange={setUseGeez} />
    </div>
  );
}
