"use client"
import React, { useState } from 'react'
import Kenat from 'kenat'
import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'

export default function MonthGridExample() {
  const today = Kenat.now().getEthiopian()

  const [year, setYear] = useState(today.year)
  const [month, setMonth] = useState(today.month)
  const [useGeez, setUseGeez] = useState(false)
  const [lang, setLang] = useState('amharic')
  const [weekStart, setWeekStart] = useState(1)

  const calendar = Kenat.getMonthCalendar(year, month, {
    useGeez,
    weekdayLang: lang,
    weekStart,
  })

  const nextMonth = () => {
    if (month === 13) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const prevMonth = () => {
    if (month === 1) {
      setMonth(13)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-xl shadow-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded hover:bg-gray-300 dark:hover:bg-zinc-600">
          ⬅️
        </button>
        <h2 className="text-lg font-semibold">
          {calendar.monthName} {calendar.year}
        </h2>
        <button onClick={nextMonth} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded hover:bg-gray-300 dark:hover:bg-zinc-600">
          ➡️
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <Toggle label="Ge'ez" enabled={useGeez} onChange={setUseGeez} />
        <Toggle
          label={`Language (${lang === 'amharic' ? 'AM' : 'EN'})`}
          enabled={lang === 'english'}
          onChange={() => setLang(lang === 'amharic' ? 'english' : 'amharic')}
        />
        <Toggle
          label={`Week Start (${weekStart === 1 ? 'Mon' : 'Sun'})`}
          enabled={weekStart === 0}
          onChange={() => setWeekStart(weekStart === 1 ? 0 : 1)}
        />
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2">
        {calendar.headers.map((h, i) => (
          <div key={i} className="p-1">{h}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-1 text-sm">
        {calendar.days.map((day, i) => {
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
