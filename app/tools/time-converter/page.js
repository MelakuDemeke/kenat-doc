"use client";

import { useMemo, useState } from "react";
import { Time, toGeez } from "kenat";
import { FiArrowRight } from "react-icons/fi";
import { EthiopianTimePanel } from "@/components/EthiopianTimePanel";
import { dayPart } from "@/lib/dayPart";



function toTwelveHour(h, m) {
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function TimeConverterPage() {
    const [value, setValue] = useState("17:30");

    const result = useMemo(() => {
        const match = /^(\d{1,2}):(\d{2})$/.exec(value);
        if (!match) return null;
        const h = Number(match[1]);
        const m = Number(match[2]);
        if (h > 23 || m > 59) return null;
        const eth = Time.fromGregorian(h, m);
        return { h, m, eth, period: dayPart(h) };
    }, [value]);

    return (
        <div className="relative min-h-screen k-page">
            <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-16 pb-24 lg:pt-24">
                <header className="max-w-2xl">
                    <h1 className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
                        Time Converter
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl k-muted leading-relaxed">
                        Ethiopian time counts hours from sunrise and sunset, so 6:00 AM is 12:00 in the morning and
                        6:00 PM is 12:00 at night. Convert any time below.
                    </p>
                </header>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <section aria-labelledby="now-heading" className="k-card px-6 py-8">
                        <h2 id="now-heading" className="text-sm font-medium k-muted mb-6">
                            Right now
                        </h2>
                        <EthiopianTimePanel size={240} />
                    </section>

                    <section aria-labelledby="convert-heading" className="k-card p-6 sm:p-8 flex flex-col">
                        <h2 id="convert-heading" className="text-sm font-medium k-muted">
                            Convert a time
                        </h2>

                        <label className="mt-6 block">
                            <span className="text-sm font-medium">Gregorian time</span>
                            <input
                                type="time"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="mt-2 w-full rounded-xl border k-border bg-[var(--bg)] px-4 py-3 text-2xl font-semibold tabular tracking-[-0.02em] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            />
                        </label>

                        <div className="my-6 flex items-center gap-3 k-subtle" aria-hidden="true">
                            <span className="h-px flex-1 bg-[var(--border)]" />
                            <FiArrowRight className="rotate-90" />
                            <span className="h-px flex-1 bg-[var(--border)]" />
                        </div>

                        <div aria-live="polite" className="rounded-2xl bg-[var(--surface)] p-6">
                            <p className="text-sm font-medium k-muted">Ethiopian time</p>
                            {result ? (
                                <>
                                    <p className="mt-2 text-5xl font-semibold tracking-[-0.04em] tabular">
                                        {result.eth.hour}:{String(result.eth.minute).padStart(2, "0")}
                                        <span className="ml-3 text-2xl font-medium k-accent">
                                            <span className="k-am">{result.period.am}</span> · {result.period.en}
                                        </span>
                                    </p>
                                    <p className="mt-3 text-sm k-muted">
                                        <span className="k-am">
                                            {toGeez(result.eth.hour)}:{toGeez(result.eth.minute)}
                                        </span>{" "}
                                        in Ge&apos;ez numerals · {toTwelveHour(result.h, result.m)} Gregorian
                                    </p>
                                </>
                            ) : (
                                <p className="mt-2 text-lg k-muted">Enter a time to convert it.</p>
                            )}
                        </div>

                        <pre className="mt-6 overflow-x-auto rounded-xl bg-[var(--code-bg)] px-4 py-3 font-mono text-[13px] leading-relaxed text-[var(--code-fg)]">
                            <code>{`import { Time } from 'kenat'

Time.fromGregorian(${result ? `${result.h}, ${result.m}` : "17, 30"})
// → ${result ? JSON.stringify({ hour: result.eth.hour, minute: result.eth.minute, period: result.eth.period }) : "{ hour: 11, minute: 30, period: 'night' }"}`}</code>
                        </pre>
                    </section>
                </div>
            </main>
        </div>
    );
}
