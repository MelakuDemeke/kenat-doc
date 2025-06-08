"use client"

import React, { useState } from 'react'
import { toEC, toGC } from 'kenat'

export default function DateConverterExample() {
  const [ec, setEc] = useState({ year: 2016, month: 10, day: 7 })
  const [gc, setGc] = useState({ year: 2024, month: 6, day: 7 })

  const gcResult = safeToGC(ec.year, ec.month, ec.day)
  const ecResult = safeToEC(gc.year, gc.month, gc.day)

  const inputClass =
    'w-full px-3 py-1.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-sm'

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 rounded-3xl border border-white/20 bg-white/10 dark:bg-zinc-800/40 backdrop-blur-md shadow-lg text-zinc-800 dark:text-zinc-100">
      <h2 className="text-xl font-semibold mb-6 text-center">📆 EC ↔ GC Date Converter</h2>

      <div className="grid gap-8">
        {/* EC to GC */}
        <div>
          <label className="block text-sm font-medium mb-2">Ethiopian Date (EC)</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={ec.year}
              onChange={(e) => setEc({ ...ec, year: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Year"
            />
            <input
              type="number"
              value={ec.month}
              onChange={(e) => setEc({ ...ec, month: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Month"
            />
            <input
              type="number"
              value={ec.day}
              onChange={(e) => setEc({ ...ec, day: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Day"
            />
          </div>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-300 font-mono">
            → {gcResult}
          </p>
        </div>

        {/* GC to EC */}
        <div>
          <label className="block text-sm font-medium mb-2">Gregorian Date (GC)</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={gc.year}
              onChange={(e) => setGc({ ...gc, year: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Year"
            />
            <input
              type="number"
              value={gc.month}
              onChange={(e) => setGc({ ...gc, month: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Month"
            />
            <input
              type="number"
              value={gc.day}
              onChange={(e) => setGc({ ...gc, day: parseInt(e.target.value || '0') })}
              className={inputClass}
              placeholder="Day"
            />
          </div>
          <p className="mt-2 text-sm text-purple-600 dark:text-purple-300 font-mono">
            → {ecResult}
          </p>
        </div>
      </div>
    </div>
  )
}

function safeToGC(y, m, d) {
  try {
    const { year, month, day } = toGC(y, m, d)
    return `${year}/${month}/${day}`
  } catch (err) {
    if (err?.toJSON) {
      const e = err.toJSON()
      return `❌ ${e.message}`
    }
    return "❌ Invalid EC date"
  }
}

function safeToEC(y, m, d) {
  try {
    const { year, month, day } = toEC(y, m, d)
    return `${year}/${month}/${day}`
  } catch (err) {
    if (err?.toJSON) {
      const e = err.toJSON()
      return `❌ ${e.message}`
    }
    return "❌ Invalid GC date"
  }
}
