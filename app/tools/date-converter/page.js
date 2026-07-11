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
        <div className="p-6 rounded-2xl bg-white/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg transition-all transform hover:-translate-y-2 duration-300">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Ethiopian to Gregorian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={ecDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={ecDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={ecDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {convertedGc && (
                <div className={`mt-6 text-center p-4 rounded-lg border ${convertedGc.ok ? 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20' : 'bg-red-500/10 dark:bg-red-500/20 border-red-500/20'}`}>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">{convertedGc.ok ? 'Converted Date:' : 'Error:'}</p>
                    <p className={`text-2xl font-bold flex items-center justify-center gap-2 ${convertedGc.ok ? 'text-purple-700 dark:text-purple-300' : 'text-red-700 dark:text-red-300'}`}>
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
        <div className="p-6 rounded-2xl bg-white/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg transition-all transform hover:-translate-y-2 duration-300">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Gregorian to Ethiopian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={gcDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={gcDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={gcDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {convertedEc && (
                <div className={`mt-6 text-center p-4 rounded-lg border ${convertedEc.ok ? 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/20' : 'bg-red-500/10 dark:bg-red-500/20 border-red-500/20'}`}>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">{convertedEc.ok ? 'Converted Date:' : 'Error:'}</p>
                    <p className={`text-2xl font-bold flex items-center justify-center gap-2 ${convertedEc.ok ? 'text-sky-700 dark:text-sky-300' : 'text-red-700 dark:text-red-300'}`}>
                        {!convertedEc.ok && <FiXCircle />} {convertedEc.text}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function DateConverterPage() {
    return (
        <div className="relative min-h-screen text-zinc-900 dark:text-white selection:bg-purple-500/50">
            <SectionBackground rotation={10} />
            <main className="container mx-auto px-4 py-16">
                <section className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 pb-4">
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
