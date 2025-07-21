"use client";

import { useState, useEffect } from "react";
import { toGC, toEC } from "kenat";

function EthiopianToGregorian() {
    const todayGC = new Date();
    const todayEC = toEC(todayGC.getFullYear(), todayGC.getMonth() + 1, todayGC.getDate());
    const [ecDate, setEcDate] = useState({ year: todayEC.year, month: todayEC.month, day: todayEC.day });
    const [convertedGc, setConvertedGc] = useState(null);

    useEffect(() => {
        if (ecDate && ecDate.year && ecDate.month && ecDate.day) {
            try {
                const result = toGC(ecDate.year, ecDate.month, ecDate.day);
                setConvertedGc(`${result.year}/${result.month}/${result.day}`);
            } catch (err) {
                if (err?.toJSON) {
                    const e = err.toJSON();
                    setConvertedGc(`❌ ${e.message}`);
                } else {
                    setConvertedGc(`❌ Invalid EC date`);
                }
            }
        } else {
            setConvertedGc(null);
        }
    }, [ecDate]);

    const handleInputChange = (field, value) => {
        setEcDate((prev) => ({ ...prev, [field]: value ? parseInt(value) : undefined }));
    };

    return (
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Ethiopian to Gregorian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={ecDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={ecDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={ecDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {convertedGc && (
                <div className="mt-6 text-center bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">Converted Date:</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {convertedGc}
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
                setConvertedEc(`${result.year}/${result.month}/${result.day}`);
            } catch (err) {
                if (err?.toJSON) {
                    const e = err.toJSON();
                    setConvertedEc(`❌ ${e.message}`);
                } else {
                    setConvertedEc(`❌ Invalid GC date`);
                }
            }
        } else {
            setConvertedEc(null);
        }
    }, [gcDate]);

    const handleInputChange = (field, value) => {
        setGcDate((prev) => ({ ...prev, [field]: value ? parseInt(value) : undefined }));
    };

    return (
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Gregorian to Ethiopian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Year"
                    value={gcDate.year || ""}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={gcDate.month || ""}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                    type="number"
                    placeholder="Day"
                    value={gcDate.day || ""}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {convertedEc && (
                <div className="mt-6 text-center bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">Converted Date:</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {convertedEc}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function DateConverterPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50">
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
