"use client"

import React, { useState, useEffect } from 'react'
import Kenat from 'kenat'
import { clsx } from 'clsx'
import { FiChevronDown } from 'react-icons/fi'

export default function BahireHasabExample() {
  const [year, setYear] = useState(() => new Kenat().getEthiopian().year)
  const [lang, setLang] = useState('amharic')
  const [bahireHasabData, setBahireHasabData] = useState(null)
  const [openFeast, setOpenFeast] = useState(null)

  const inputClass = 'w-full px-4 py-2.5 rounded-lg bg-white/20 dark:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-600 backdrop-blur text-base'

  const calculateBahireHasab = () => {
    // Validate year to be a reasonable number
    if (isNaN(year) || year < 1 || year > 9999) {
        setBahireHasabData(null)
        return
    }
    const k = new Kenat({ year, month: 1, day: 1 })
    const data = k.getBahireHasab({ lang })
    setBahireHasabData(data)
    // Set the first feast as open by default
    if (data && data.movableFeasts) {
        setOpenFeast(Object.keys(data.movableFeasts)[0])
    }
  }

  // Effect to run calculation when year or language changes
  useEffect(() => {
    calculateBahireHasab()
  }, [year, lang])

  const formatDate = (date) => {
      if (!date) return 'N/A';
      return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`;
  }


  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded-3xl border border-white/20 bg-white/10 dark:bg-zinc-800/40 backdrop-blur-md shadow-lg text-zinc-800 dark:text-zinc-100">
      <h2 className="text-xl font-semibold mb-6 text-center">📜 Bahire Hasab Calculator</h2>

      {/* --- Controls --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
            <label htmlFor="year-input" className="block text-sm font-medium mb-2">Ethiopian Year</label>
            <input
                id="year-input"
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value || '0'))}
                className={inputClass}
                placeholder="Enter Year (e.g., 2017)"
            />
        </div>
        <div>
            <label htmlFor="lang-select" className="block text-sm font-medium mb-2">Language</label>
            <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className={inputClass}
            >
                <option value="amharic">Amharic (አማርኛ)</option>
                <option value="english">English</option>
            </select>
        </div>
      </div>

      {/* --- Results --- */}
      {bahireHasabData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- Main Figures --- */}
            <div className="lg:col-span-1 space-y-4">
                <InfoCard title="Evangelist" value={bahireHasabData.evangelist.name} />
                <InfoCard title="New Year's Day" value={bahireHasabData.newYear.dayName} />
                <InfoCard title="Fast of Nineveh" value={formatDate(bahireHasabData.nineveh)} />
            </div>

            {/* --- Core Values & Movable Feasts --- */}
            <div className="lg:col-span-2 space-y-6">
                {/* Core Values Grid */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Core Values</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        <ValueBox label="Amete Alem" value={bahireHasabData.ameteAlem} />
                        <ValueBox label="Wenber" value={bahireHasabData.wenber} />
                        <ValueBox label="Abektie" value={bahireHasabData.abektie} />
                        <ValueBox label="Metqi" value={bahireHasabData.metqi} />
                    </div>
                </div>

                {/* Movable Feasts Accordion */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Movable Feasts</h3>
                    <div className="space-y-2">
                        {Object.values(bahireHasabData.movableFeasts).map((feast) => (
                            <div key={feast.key} className="border border-zinc-200/80 dark:border-zinc-700/60 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setOpenFeast(openFeast === feast.key ? null : feast.key)}
                                    className="w-full flex justify-between items-center p-4 text-left bg-white/5 dark:bg-zinc-900/30 hover:bg-white/10 dark:hover:bg-zinc-900/50"
                                >
                                    <span className="font-medium">{feast.name}</span>
                                    <FiChevronDown className={clsx("transition-transform", openFeast === feast.key && "rotate-180")} />
                                </button>
                                {openFeast === feast.key && (
                                    <div className="p-4 bg-white/5 dark:bg-zinc-900/20 text-sm">
                                        <p className="mb-4 text-zinc-600 dark:text-zinc-300">{feast.description}</p>
                                        <div className="flex justify-between font-mono text-xs">
                                            <span>Ethiopian: {formatDate(feast.ethiopian)}</span>
                                            <span>Gregorian: {formatDate(feast.gregorian)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      ) : <p className="text-center text-zinc-500">Enter a valid year to see the Bahire Hasab results.</p>}
    </div>
  )
}

// Sub-components for styling
const InfoCard = ({ title, value }) => (
  <div className="p-4 rounded-lg bg-white/10 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-700/60 shadow-inner">
    <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
)

const ValueBox = ({ label, value }) => (
    <div className="p-3 rounded-lg bg-white/5 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-700/50">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="font-bold text-lg font-mono">{value}</p>
    </div>
)