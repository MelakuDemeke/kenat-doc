"use client"

import React, { useState, useEffect } from 'react'
import { Time } from 'kenat'
import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'

export default function TimeConverterExample() {
  const [liveTime, setLiveTime] = useState(new Date())

  // Initialize state with the current time
  const [gregorian, setGregorian] = useState({
    hour: liveTime.getHours(),
    minute: liveTime.getMinutes(),
  })
  const [ethiopian, setEthiopian] = useState(() => 
    Time.fromGregorian(liveTime.getHours(), liveTime.getMinutes())
  )
  // +++ START: Add state for Geez toggle +++
  const [useGeez, setUseGeez] = useState(false)
  // +++ END: Add state for Geez toggle +++


  // Set up a live clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle changes from the Gregorian inputs
  const handleGregorianChange = (newHour, newMinute) => {
    const hour = isNaN(newHour) ? 0 : newHour;
    const minute = isNaN(newMinute) ? 0 : newMinute;
    
    const clampedHour = Math.max(0, Math.min(23, hour));
    const clampedMinute = Math.max(0, Math.min(59, minute));

    setGregorian({ hour: clampedHour, minute: clampedMinute });
    setEthiopian(Time.fromGregorian(clampedHour, clampedMinute));
  }

  // Handle changes from the Ethiopian inputs
  const handleEthiopianChange = (newHour, newMinute, newPeriod) => {
    const hour = isNaN(newHour) ? 1 : newHour;
    const minute = isNaN(newMinute) ? 0 : newMinute;

    const clampedHour = Math.max(1, Math.min(12, hour));
    const clampedMinute = Math.max(0, Math.min(59, minute));

    // +++ START: Bug Fix +++
    // Create a new Time instance to ensure the state holds a class object, not a plain object.
    const newEthTime = new Time(clampedHour, clampedMinute, newPeriod);
    setEthiopian(newEthTime);
    setGregorian(newEthTime.toGregorian());
    // +++ END: Bug Fix +++
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-base text-center font-mono'
  const liveTimeEth = Time.fromGregorian(liveTime.getHours(), liveTime.getMinutes());

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 rounded-3xl border border-white/20 bg-white/10 dark:bg-zinc-800/40 backdrop-blur-md shadow-lg text-zinc-800 dark:text-zinc-100">
      <h2 className="text-xl font-semibold mb-2 text-center">🕒 Time Converter</h2>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Live Time: {liveTime.toLocaleTimeString()} GC / {liveTimeEth.format({ lang: 'english', useGeez })} EC
      </p>

      {/* +++ START: Add Geez Toggle Switch +++ */}
      <div className="flex justify-center mb-8">
        <Toggle label="Use Ge'ez Numerals" enabled={useGeez} onChange={setUseGeez} />
      </div>
      {/* +++ END: Add Geez Toggle Switch +++ */}


      <div className="grid md:grid-cols-2 gap-8">
        
        {/* --- Gregorian to Ethiopian --- */}
        <div>
          <label className="block text-sm font-medium mb-2">Gregorian Time (24-hour)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={String(gregorian.hour).padStart(2, '0')}
              onChange={(e) => handleGregorianChange(parseInt(e.target.value), gregorian.minute)}
              className={inputClass}
            />
            <span className="font-bold text-2xl">:</span>
            <input
              type="number"
              value={String(gregorian.minute).padStart(2, '0')}
              onChange={(e) => handleGregorianChange(gregorian.hour, parseInt(e.target.value))}
              className={inputClass}
            />
          </div>
          <p className="mt-3 text-sm text-center text-blue-600 dark:text-blue-300">
            → Converts to: <span className="font-bold text-lg">{ethiopian.format({ lang: 'english', useGeez, zeroAsDash: false })}</span>
          </p>
        </div>

        {/* --- Ethiopian to Gregorian --- */}
        <div>
          <label className="block text-sm font-medium mb-2">Ethiopian Time</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={ethiopian.hour}
              onChange={(e) => handleEthiopianChange(parseInt(e.target.value), ethiopian.minute, ethiopian.period)}
              className={inputClass}
            />
            <span className="font-bold text-2xl">:</span>
            <input
              type="number"
              value={String(ethiopian.minute).padStart(2, '0')}
              onChange={(e) => handleEthiopianChange(ethiopian.hour, parseInt(e.target.value), ethiopian.period)}
              className={inputClass}
            />
            <select 
              value={ethiopian.period} 
              onChange={(e) => handleEthiopianChange(ethiopian.hour, ethiopian.minute, e.target.value)}
              className={`${inputClass} !px-2`}
            >
              <option value="day">day</option>
              <option value="night">night</option>
            </select>
          </div>
          <p className="mt-3 text-sm text-center text-purple-600 dark:text-purple-300">
            → Converts to: <span className="font-bold text-lg">{String(gregorian.hour).padStart(2, '0')}:{String(gregorian.minute).padStart(2, '0')}</span>
          </p>
        </div>

      </div>
    </div>
  )
}


// A reusable Toggle component for UI consistency
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