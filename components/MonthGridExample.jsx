"use client"
import React, { useState, useEffect, useRef } from 'react'
import { MonthGrid, HolidayTags } from 'kenat' // <-- Import HolidayTags
import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'
import Confetti from 'react-confetti'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// +++ START: Add Modal Component +++
function HolidayModal({ holiday, onClose }) {
  if (!holiday) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{holiday.name}</h3>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">{holiday.description}</p>
        <button
          onClick={onClose}
          className="w-full px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
// +++ END: Add Modal Component +++

export default function MonthGridExample() {
  const [gridInstance, setGridInstance] = useState(null)
  const [gridData, setGridData] = useState(null)
  const containerRef = useRef(null)
  const [holidayFilter, setHolidayFilter] = useState(null)
  // +++ START: Add State for Modal +++
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  // +++ END: Add State for Modal +++

  useEffect(() => {
    const instance = new MonthGrid({
      weekdayLang: 'amharic',
    })
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
      holidayFilter: overrides.holidayFilter !== undefined ? overrides.holidayFilter : holidayFilter,
    })
    setGridInstance(updated)
    setGridData(updated.generate())
  }

  const handleFilterChange = (tag) => {
    let newFilter;
    if (tag === 'all') {
      newFilter = null;
    } else {
      const currentFilter = holidayFilter || [];
      if (currentFilter.includes(tag)) {
        newFilter = currentFilter.filter(t => t !== tag);
      } else {
        newFilter = [...currentFilter, tag];
      }
      if (newFilter.length === 0) {
        newFilter = null;
      }
    }
    setHolidayFilter(newFilter);
    rerender({ holidayFilter: newFilter });
  };
  const toggleGeez = () => rerender({ useGeez: !gridInstance.useGeez })
  const toggleLang = () =>
    rerender({ weekdayLang: gridInstance.weekdayLang === 'amharic' ? 'english' : 'amharic' })
  const toggleWeekStart = () => rerender({ weekStart: gridInstance.weekStart === 1 ? 0 : 1 })

  const goNext = () => setGridData(gridInstance.up().generate())
  const goPrev = () => setGridData(gridInstance.down().generate())

  if (!gridData) return null

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto p-6 rounded-3xl border border-white/20 bg-white/10 dark:bg-zinc-800/40 backdrop-blur-md shadow-lg"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-zinc-900 dark:text-white">
        <button onClick={goPrev} className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md">
          <FiChevronLeft className="text-2xl" />
        </button>
        <h2 className="text-2xl font-bold tracking-wide text-center">
          {gridData.monthName} {gridData.year}
        </h2>
        <button onClick={goNext} className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md">
           <FiChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Toggles */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <Toggle label="Ge'ez Numerals" enabled={gridInstance.useGeez} onChange={toggleGeez} />
        <Toggle
          label={`Language (${gridInstance.weekdayLang === 'amharic' ? 'amharic' : 'english'})`}
          enabled={gridInstance.weekdayLang === 'english'}
          onChange={toggleLang}
        />
        <Toggle
          label={`Week Start (${gridInstance.weekStart === 1 ? 'Mon' : 'Sun'})`}
          enabled={gridInstance.weekStart === 0}
          onChange={toggleWeekStart}
        />
      </div>

      
      {/* Holiday Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-8 p-3 rounded-xl bg-white/10 dark:bg-zinc-800/30">
        <span className="text-sm font-medium text-zinc-900 dark:text-white">Filter Holidays:</span>
        <FilterCheckbox label="All" value="all" checked={!holidayFilter} onChange={() => handleFilterChange('all')} />
        {Object.values(HolidayTags).map(tag => (
          <FilterCheckbox key={tag} label={tag} value={tag} checked={holidayFilter?.includes(tag) ?? false} onChange={() => handleFilterChange(tag)} />
        ))}
      </div>

      
      {/* Headers */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-zinc-700 dark:text-white/80 mb-2">
        {gridData.headers.map((h, i) => ( <div key={i} className="py-1"> {h} </div> ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm relative">
        {gridData.days.map((day, i) => {
          if (!day) return <div key={i} className="p-2" />

          const isToday = day.isToday
          const isHoliday = day.holidays.length > 0

          return (
            <div
              key={i}
              // +++ START: Add Click Handler and Cursor Style +++
              onClick={() => isHoliday && setSelectedHoliday(day.holidays[0])}
              className={clsx(
                'relative rounded-xl p-2 border backdrop-blur-md transition shadow-inner overflow-hidden',
                isToday
                  ? '!bg-emerald-900 text-white ring-2 ring-emerald-300 dark:ring-emerald-400 shadow-lg z-10'
                  : isHoliday
                  ? '!bg-indigo-900 text-white border-indigo-500 shadow-md cursor-pointer'
                  : 'bg-white/10 dark:bg-zinc-800/30 hover:bg-white/20 dark:hover:bg-zinc-700/50'
              )}
              // +++ END: Add Click Handler and Cursor Style +++
            >
              {isHoliday && (
                <Confetti numberOfPieces={30} recycle={false} gravity={0.1} wind={0} width={80} height={60} scalar={0.2} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
              )}
              <div className="relative z-10">{day.ethiopian.day}</div>
              <div className="text-xs text-zinc-600 dark:text-white/70 relative z-10">
                {day.gregorian.month}/{day.gregorian.day}
              </div>
              {isHoliday && (
                <div className="text-[10px] mt-1 text-indigo-900 dark:text-indigo-200 italic relative z-10">
                  {day.holidays.map((h) => h.name).join(', ')}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* +++ START: Render Modal Conditionally +++ */}
      {selectedHoliday && (
        <HolidayModal holiday={selectedHoliday} onClose={() => setSelectedHoliday(null)} />
      )}
      {/* +++ END: Render Modal Conditionally +++ */}
    </div>
  )
}

function Toggle({ label, enabled, onChange }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-zinc-900 dark:text-white">{label}</span>
      <Switch checked={enabled} onChange={onChange} className={clsx('relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300', enabled ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-500')}>
        <span className={clsx('inline-block h-4 w-4 transform rounded-full bg-white shadow transition', enabled ? 'translate-x-6' : 'translate-x-1')} />
      </Switch>
    </div>
  )
}

function FilterCheckbox({ label, value, checked, onChange }) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer text-sm text-zinc-900 dark:text-white">
            <input type="checkbox" value={value} checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <span>{label}</span>
        </label>
    )
}