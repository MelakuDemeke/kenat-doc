"use client"

import React, { useState, useEffect, useMemo } from 'react'
// +++ START: Import 'toGC' to handle missing dates +++
import Kenat, { getHolidaysForYear, HolidayTags, toGC, monthNames } from 'kenat'
// +++ END: Import 'toGC' +++
import { FiCalendar, FiTag } from 'react-icons/fi'

const tagColors = {
  [HolidayTags.PUBLIC]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [HolidayTags.RELIGIOUS]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [HolidayTags.CHRISTIAN]: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  [HolidayTags.MUSLIM]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [HolidayTags.STATE]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [HolidayTags.CULTURAL]: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  [HolidayTags.OTHER]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

export default function HolidayBrowserExample() {
  const [year, setYear] = useState(() => new Kenat().getEthiopian().year)
  const [allHolidays, setAllHolidays] = useState([])
  const [selectedTags, setSelectedTags] =useState([])
  const [lang, setLang] = useState('amharic')
  const [error, setError] = useState('')

  const inputClass = 'w-full px-4 py-2.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-base'

  useEffect(() => {
    setError('')
    if (isNaN(year) || year < 1 || year > 9999) {
      setError('Please enter a valid Ethiopian year.')
      setAllHolidays([])
      return
    }
    try {
      const holidays = getHolidaysForYear(year, { lang })
      setAllHolidays(holidays)
    } catch (err) {
      setError(err.message || 'Could not fetch holidays for this year.')
      setAllHolidays([])
    }
  }, [year, lang])
  
  const handleTagChange = (tag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  const filteredHolidays = useMemo(() => {
    if (selectedTags.length === 0) {
      return allHolidays;
    }
    return allHolidays.filter(holiday => 
      holiday.tags.some(tag => selectedTags.includes(tag))
    )
  }, [allHolidays, selectedTags])

  const ethMonthNames = lang === 'amharic' ? monthNames.amharic : monthNames.english;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded-3xl border border-white/20 bg-white/10 dark:bg-zinc-800/40 backdrop-blur-md shadow-lg text-zinc-800 dark:text-zinc-100">
      <h2 className="text-xl font-semibold mb-6 text-center"> Ethiopian Holiday Browser</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <label htmlFor="year-input" className="block text-sm font-medium mb-2">Ethiopian Year</label>
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value || '0'))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lang-select" className="block text-sm font-medium mb-2">Language</label>
            <select id="lang-select" value={lang} onChange={(e) => setLang(e.target.value)} className={inputClass}>
                <option value="amharic">Amharic (አማርኛ)</option>
                <option value="english">English</option>
            </select>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-white/10 dark:bg-zinc-900/20 mb-8">
        <h3 className="font-semibold mb-3 text-base flex items-center gap-2"><FiTag /> Filter by Tag</h3>
        <div className="flex flex-wrap gap-3">
          {Object.values(HolidayTags).map(tag => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer text-sm">
              <input 
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag]}`}>{tag}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-4">
          {`Showing ${filteredHolidays.length} of ${allHolidays.length} holidays for ${year} E.C.`}
        </p>
        <div className="space-y-3">
          {error && <p className="text-center text-red-500">{error}</p>}
          {filteredHolidays.map((holiday) => {
            // +++ START: Safely get Gregorian date +++
            // If holiday.gregorian doesn't exist, calculate it from the Ethiopian date.
            const gregorianDate = holiday.gregorian || toGC(holiday.ethiopian.year, holiday.ethiopian.month, holiday.ethiopian.day);
            // +++ END: Safely get Gregorian date +++

            return (
              <div key={`${holiday.key}-${holiday.ethiopian.day}`} className="p-4 rounded-lg bg-white/5 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <div>
                  <p className="font-bold">{holiday.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex items-center gap-2">
                    <FiCalendar />
                    {`${ethMonthNames[holiday.ethiopian.month - 1]} ${holiday.ethiopian.day}, ${holiday.ethiopian.year}`}
                    <span className="text-zinc-400 dark:text-zinc-500">/</span>
                    {/* +++ START: Use the safe gregorianDate variable +++ */}
                    {`${gregorianDate.day}/${gregorianDate.month}/${gregorianDate.year}`}
                    {/* +++ END: Use the safe gregorianDate variable +++ */}
                  </p>
                </div>
                <div className="flex flex-wrap justify-end gap-2" style={{maxWidth: '40%'}}>
                  {holiday.tags.map(tag => (
                    <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag]}`}>{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}