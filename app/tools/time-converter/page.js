"use client";

import { useState, useEffect } from "react";
import { SectionBackground } from "../../../components/Landing/SectionBackground";

export default function TimeConverterPage() {
    const [modernTime, setModernTime] = useState({ hour: "", minute: "" });
    const [ethiopianTime, setEthiopianTime] = useState(null);
    const [currentEthiopianTime, setCurrentEthiopianTime] = useState("");

    useEffect(() => {
        const updateCurrentEthiopianTime = () => {
            const now = new Date();
            const hour = (now.getHours() + 6) % 12 || 12;
            const minute = now.getMinutes();
            const period = now.getHours() < 6 || now.getHours() >= 18 ? "ለሊት" : "ቀን";
            setCurrentEthiopianTime(`${hour}:${minute.toString().padStart(2, "0")} ${period}`);
        };

        updateCurrentEthiopianTime();
        const interval = setInterval(updateCurrentEthiopianTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const convertToEthiopianTime = () => {
        if (modernTime.hour !== "" && modernTime.minute !== "") {
            const hour = (parseInt(modernTime.hour) + 6) % 12 || 12;
            const period = parseInt(modernTime.hour) < 6 || parseInt(modernTime.hour) >= 18 ? "ለሊት" : "ቀን";
            setEthiopianTime(`${hour}:${modernTime.minute} ${period}`);
        } else {
            setEthiopianTime(null);
        }
    };

    return (
        <div className="relative min-h-screen text-zinc-900 dark:text-white selection:bg-purple-500/50">
            <SectionBackground rotation={170} />
            <main className="container mx-auto px-4 py-16">
                <section className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 pb-4">
                        Time Converter
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mt-4 max-w-3xl mx-auto">
                        Convert modern 24-hour time to traditional Ethiopian time.
                    </p>
                </section>

                <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg transition-all transform hover:-translate-y-2 duration-300">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                        Modern to Ethiopian Time
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <input
                            type="number"
                            placeholder="Hour (0-23)"
                            value={modernTime.hour}
                            onChange={(e) => setModernTime({ ...modernTime, hour: e.target.value })}
                            className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="number"
                            placeholder="Minute (0-59)"
                            value={modernTime.minute}
                            onChange={(e) => setModernTime({ ...modernTime, minute: e.target.value })}
                            className="w-full p-3 bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        onClick={convertToEthiopianTime}
                        className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105"
                    >
                        Convert
                    </button>

                    {ethiopianTime && (
                        <div className="mt-6 text-center bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-lg border border-purple-500/20">
                            <p className="text-lg text-zinc-600 dark:text-zinc-300">Converted Time:</p>
                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                {ethiopianTime}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 text-center bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-lg border border-purple-500/20">
                        <p className="text-lg text-zinc-600 dark:text-zinc-300">Current Ethiopian Time:</p>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                            {currentEthiopianTime}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
