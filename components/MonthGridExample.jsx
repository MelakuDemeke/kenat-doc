"use client"
import React, { useState, useEffect } from 'react'
import { MonthGrid } from 'kenat'
import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'

export default function MonthGridExample() {
    const [gridInstance, setGridInstance] = useState(null)
    const [gridData, setGridData] = useState(null)

    // Initial setup
    useEffect(() => {
        const instance = new MonthGrid({})
        setGridInstance(instance)
        setGridData(instance.generate())
    }, [])

    const rerender = (overrides = {}) => {
        const updated = new MonthGrid({
            year: gridInstance.year,
            month: gridInstance.month,
            useGeez: overrides.useGeez ?? gridInstance.useGeez,
            weekStart: overrides.weekStart ?? gridInstance.weekStart,
            weekdayLang: overrides.weekdayLang ?? gridInstance.weekdayLang,
        })
        setGridInstance(updated)
        setGridData(updated.generate())
    }

    const toggleGeez = () => rerender({ useGeez: !gridInstance.useGeez })
    const toggleLang = () => rerender({
        weekdayLang: gridInstance.weekdayLang === 'amharic' ? 'english' : 'amharic',
    })
    const toggleWeekStart = () => rerender({ weekStart: gridInstance.weekStart === 1 ? 0 : 1 })

    const goNext = () => {
        const up = gridInstance.up().generate()
        setGridData(up)
    }

    const goPrev = () => {
        const down = gridInstance.down().generate()
        setGridData(down)
    }

    if (!gridData) return null

    return (
        <div className="max-w-3xl mx-auto p-4 border rounded-xl shadow-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
            <div className="flex items-center justify-between mb-4">
                <button onClick={goPrev} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded hover:bg-gray-300 dark:hover:bg-zinc-600">
                    ⬅️
                </button>
                <h2 className="text-lg font-semibold">
                    {gridData.monthName} {gridData.year}
                </h2>
                <button onClick={goNext} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded hover:bg-gray-300 dark:hover:bg-zinc-600">
                    ➡️
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <Toggle label="Ge'ez" enabled={gridInstance.useGeez} onChange={toggleGeez} />
                <Toggle
                    label={`Lang (${gridInstance.weekdayLang === 'amharic' ? 'AM' : 'EN'})`}
                    enabled={gridInstance.weekdayLang === 'english'}
                    onChange={toggleLang}
                />
                <Toggle
                    label={`Week Start (${gridInstance.weekStart === 1 ? 'Mon' : 'Sun'})`}
                    enabled={gridInstance.weekStart === 0}
                    onChange={toggleWeekStart}
                />
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2">
                {gridData.headers.map((h, i) => (
                    <div key={i} className="p-1">{h}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-1 text-sm">
                {gridData.days.map((day, i) => {
                    if (!day) return <div key={i} className="p-2" />
                    const isToday = day.isToday
                    const isHoliday = day.holidays.length > 0
                    return (
                        <div
                            key={i}
                            className={clsx(
                                'rounded-lg p-2 border',
                                isToday && 'bg-blue-200 dark:bg-blue-800 font-bold',
                                isHoliday && 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700'
                            )}
                        >
                            <div>{day.ethiopian.day}</div>
                            <div className="text-xs text-zinc-500">{day.gregorian.month}/{day.gregorian.day}</div>
                            {isHoliday && (
                                <div className="text-[10px] mt-1 text-red-600 dark:text-red-400">
                                    {day.holidays.map(h => h.name.amharic).join(', ')}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Toggle({ label, enabled, onChange }) {
    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm">{label}</span>
            <Switch
                checked={enabled}
                onChange={onChange}
                className={clsx(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition',
                    enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-600'
                )}
            >
                <span
                    className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition',
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    )}
                />
            </Switch>
        </div>
    )
}
