"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MonthGrid, HolidayTags, monthNames } from "kenat";
import { Switch } from "@headlessui/react";
import Confetti from "react-confetti";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { clsx } from "clsx";

function HolidayModal({ holidays, onClose }) {
    if (!holidays || holidays.length === 0) return null;
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {holidays.map((holiday, index) => (
                    <div key={index}>
                        <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                            {holiday.name}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300">
                            {holiday.description}
                        </p>
                        {index < holidays.length - 1 && (
                            <hr className="my-6 border-zinc-200 dark:border-zinc-700" />
                        )}
                    </div>
                ))}
                <button
                    onClick={onClose}
                    className="w-full mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default function MonthGridPage() {
    const [gridData, setGridData] = useState(null);
    const [selectedHolidays, setSelectedHolidays] = useState(null);
    const [activeMode, setActiveMode] = useState("public");
    const [holidayFilter, setHolidayFilter] = useState([HolidayTags.PUBLIC]);
    const [showAllSaints, setShowAllSaints] = useState(false);

    const [date, setDate] = useState(() => {
        const todayInEC = new MonthGrid().generate();
        return { year: parseInt(todayInEC.year), month: todayInEC.month };
    });

    useEffect(() => {
        const instance = new MonthGrid({
            year: date.year,
            month: date.month,
            weekdayLang: "amharic",
            weekStart: 1,
            mode: activeMode,
            showAllSaints,
            holidayFilter,
        });
        setGridData(instance.generate());
    }, [date, activeMode, showAllSaints, holidayFilter]);

    const handleModeChange = (e) => {
        const newMode = e.target.value;
        setActiveMode(newMode);
        setShowAllSaints(false);
        setHolidayFilter(newMode === "none" ? null : [newMode]);
    };

    const handleFilterChange = (tag) => {
        let newFilter;
        if (tag === "all") {
            newFilter = null;
        } else {
            const current = holidayFilter || [];
            newFilter = current.includes(tag)
                ? current.filter((t) => t !== tag)
                : [...current, tag];
            if (newFilter.length === 0) newFilter = null;
        }
        setActiveMode("none");
        setHolidayFilter(newFilter);
    };

    const goNextMonth = () => {
        setDate((d) =>
            d.month === 13
                ? { year: d.year + 1, month: 1 }
                : { ...d, month: d.month + 1 }
        );
    };
    const goPrevMonth = () => {
        setDate((d) =>
            d.month === 1
                ? { year: d.year - 1, month: 13 }
                : { ...d, month: d.month - 1 }
        );
    };

    const yearOptions = useMemo(
        () => Array.from({ length: 201 }, (_, i) => 1900 + i),
        []
    );
    const amharicMonths = useMemo(
        () => monthNames.amharic.map((name, i) => ({ value: i + 1, label: name })),
        []
    );

    if (!gridData) return <div className="text-center p-4">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white/20 dark:bg-zinc-800/20 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-lg">
                <div className="flex items-center justify-between mb-6 text-zinc-900 dark:text-white">
                    <button
                        onClick={goPrevMonth}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md"
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <div className="flex items-center gap-2">
                        <select
                            value={gridData.month}
                            onChange={(e) =>
                                setDate((d) => ({ ...d, month: Number(e.target.value) }))
                            }
                            className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-base text-zinc-900 dark:text-white"
                        >
                            {amharicMonths.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={gridData.year}
                            onChange={(e) =>
                                setDate((d) => ({ ...d, year: Number(e.target.value) }))
                            }
                            className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-base text-zinc-900 dark:text-white"
                        >
                            {yearOptions.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={goNextMonth}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md"
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-zinc-900 dark:text-white">Mode:</span>
                        <select
                            value={activeMode}
                            onChange={handleModeChange}
                            className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-sm text-zinc-900 dark:text-white"
                        >
                            <option value="none">Custom Filter</option>
                            <option value="christian">Christian</option>
                            <option value="muslim">Muslim</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    {activeMode === "christian" && (
                        <div className="flex items-center space-x-4">
                            <span className="text-lg text-zinc-900 dark:text-white">Show All Saints</span>
                            <Switch
                                checked={showAllSaints}
                                onChange={setShowAllSaints}
                                className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 bg-indigo-500 shadow-md"
                            >
                                <span
                                    className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition translate-x-6"
                                />
                            </Switch>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-8 p-3 rounded-xl bg-white/10 dark:bg-zinc-800/30">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Filter Holidays:</span>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-zinc-900 dark:text-white">
                        <input
                            type="checkbox"
                            value="all"
                            checked={!holidayFilter || holidayFilter.length === 0}
                            onChange={() => handleFilterChange("all")}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>All</span>
                    </label>
                    {Object.values(HolidayTags).map((tag) => (
                        <label
                            key={tag}
                            className="flex items-center space-x-2 cursor-pointer text-sm text-zinc-900 dark:text-white"
                        >
                            <input
                                type="checkbox"
                                value={tag}
                                checked={holidayFilter?.includes(tag) ?? false}
                                onChange={() => handleFilterChange(tag)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{tag}</span>
                        </label>
                    ))}
                </div>

                <div className="grid grid-cols-7 text-center text-sm font-medium text-zinc-700 dark:text-white/80 mb-2">
                    {gridData.headers.map((h, i) => (
                        <div key={i} className="py-1">
                            {h}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm relative">
                    {gridData.days.map((day, i) => {
                        if (!day) return <div key={i} className="p-2" />;
                        const isToday = day.isToday;
                        const isHoliday = day.holidays.length > 0;
                        return (
                            <div
                                key={i}
                                onClick={() => isHoliday && setSelectedHolidays(day.holidays)}
                                className={clsx(
                                    "relative rounded-xl p-2 border backdrop-blur-md transition shadow-inner overflow-hidden",
                                    isToday
                                        ? "!bg-emerald-500 text-white ring-2 ring-emerald-300 dark:!bg-emerald-900 dark:ring-emerald-400 shadow-lg z-10"
                                        : isHoliday
                                            ? "bg-indigo-200 text-indigo-900 border-indigo-300 dark:!bg-indigo-900 dark:text-white dark:border-indigo-500 shadow-md cursor-pointer"
                                            : "bg-white/10 dark:bg-zinc-800/30 hover:bg-white/20 dark:hover:bg-zinc-700/50"
                                )}
                            >
                                {isHoliday && (
                                    <Confetti
                                        numberOfPieces={30}
                                        recycle={true}
                                        gravity={0.1}
                                        wind={0}
                                        width={80}
                                        height={60}
                                        scalar={0.2}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            pointerEvents: "none",
                                        }}
                                    />
                                )}
                                <div className="relative z-10">{day.ethiopian.day}</div>
                                <div
                                    className={clsx(
                                        "text-xs relative z-10",
                                        isHoliday
                                            ? "text-indigo-800 dark:text-white/70"
                                            : "text-zinc-600 dark:text-white/70"
                                    )}
                                >
                                    {day.gregorian.month}/{day.gregorian.day}
                                </div>
                                {isHoliday && (
                                    <div className="text-[10px] mt-1 text-indigo-900 dark:text-indigo-200 italic relative z-10">
                                        {day.holidays.map((h) => h.name).join(", ")}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {selectedHolidays && (
                    <HolidayModal
                        holidays={selectedHolidays}
                        onClose={() => setSelectedHolidays(null)}
                    />
                )}
            </div>

            {/* Ensure footer stays at the bottom of the page */}
            <footer className="mt-auto mb-12">
                {/* Footer content */}
            </footer>
        </div>
    );
}
