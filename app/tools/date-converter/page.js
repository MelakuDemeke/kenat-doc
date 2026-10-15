"use client";

import { useState, useEffect } from "react";
import { toGC, toEC } from "kenat";
import { SectionBackground } from "../../../components/Landing/SectionBackground";
import { FiXCircle } from "react-icons/fi";

function EthiopianToGregorian() {
    const todayGC = new Date();
    const todayEC = toEC(todayGC.getFullYear(), todayGC.getMonth() + 1, todayGC.getDate());
    const [ecDate, setEcDate] = useState({ year: todayEC.year, month: todayEC.month, day: todayEC.day });
    const [convertedGc, setConvertedGc] = useState(null);

    useEffect(() => {
        if (ecDate && ecDate.year && ecDate.month && ecDate.day) {
            try {
                const result = toGC(ecDate.year, ecDate.month, ecDate.day);
                setConvertedGc({ ok: true, text: `${result.year}/${result.month}/${result.day}` });
            } catch (err) {
                const message = err?.toJSON ? err.toJSON().message : "Invalid EC date";
                setConvertedGc({ ok: false, text: message });
            }
        } else {
            setConvertedGc(null);
        }
    }, [ecDate]);

    const handleInputChange = (field, value) => {
        setEcDate((prev) => ({ ...prev, [field]: value ? parseInt(value) : undefined }));
    };

    return (
        <div className="p-6 k-card">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] mb-6">
                Ethiopian to Gregorian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={ecDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={ecDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={ecDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
            </div>

            {convertedGc && (
                <div aria-live="polite" className="mt-6 border-t k-border pt-5 flex items-baseline justify-between gap-4">
                    <p className="k-muted">{convertedGc.ok ? 'Converted date' : 'Error'}</p>
                    <p className={`flex items-center gap-2 ${convertedGc.ok ? 'font-mono text-2xl font-semibold k-accent tabular' : 'text-lg text-red-700 dark:text-red-400'}`}>
                        {!convertedGc.ok && <FiXCircle />} {convertedGc.text}
                    </p>
                </div>
            )}
        </div>
    );
}

function GregorianToEthiopian() {
    const todayGC = new Date();
    const [gcDate, setGcDate] = useState({ year: todayGC.getFullYear(), month: todayGC.getMonth() + 1, day: todayGC.getDate() });
    const [convertedEc, setConvertedEc] = useState(null);

    useEffect(() => {
        if (gcDate && gcDate.year && gcDate.month && gcDate.day) {
            try {
                const result = toEC(gcDate.year, gcDate.month, gcDate.day);
                setConvertedEc({ ok: true, text: `${result.year}/${result.month}/${result.day}` });
            } catch (err) {
                const message = err?.toJSON ? err.toJSON().message : "Invalid GC date";
                setConvertedEc({ ok: false, text: message });
            }
        } else {
            setConvertedEc(null);
        }
    }, [gcDate]);

    const handleInputChange = (field, value) => {
        setGcDate((prev) => ({ ...prev, [field]: value ? parseInt(value) : undefined }));
    };

    return (
        <div className="p-6 k-card">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] mb-6">
                Gregorian to Ethiopian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={gcDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={gcDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={gcDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-white/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/60"
                />
            </div>

            {convertedEc && (
                <div aria-live="polite" className="mt-6 border-t k-border pt-5 flex items-baseline justify-between gap-4">
                    <p className="k-muted">{convertedEc.ok ? 'Converted date' : 'Error'}</p>
                    <p className={`flex items-center gap-2 ${convertedEc.ok ? 'font-mono text-2xl font-semibold k-accent tabular' : 'text-lg text-red-700 dark:text-red-400'}`}>
                        {!convertedEc.ok && <FiXCircle />} {convertedEc.text}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function DateConverterPage() {
    return (
        <div className="relative min-h-screen k-page">
            <SectionBackground rotation={10} />
            <main className="container mx-auto px-5 pt-24 pb-16">
                <section className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] pb-2">
                        Date Converter
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mt-4 max-w-3xl mx-auto">
                        Seamlessly convert dates between the Ethiopian and Gregorian
                        calendars.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <EthiopianToGregorian />
                    <GregorianToEthiopian />
                </div>
            </main>
        </div>
    );
}
