"use client"

import React, { useEffect, useState } from "react"
import Clock from "react-clock"
import "react-clock/dist/Clock.css"
import { Time } from "kenat"
import { toGeez } from "kenat"
import { Switch } from "@headlessui/react"

export default function EthiopianClock() {
  const [now, setNow] = useState(new Date())
  const [ethTime, setEthTime] = useState(Time.fromGregorian(now.getHours(), now.getMinutes()))
  const [useGeez, setUseGeez] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date()
      setNow(current)
      setEthTime(Time.fromGregorian(current.getHours(), current.getMinutes()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatNum = (num) => (useGeez ? toGeez(num) : num.toString().padStart(2, "0"))

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Digital Clock */}
      <div className="text-5xl font-mono">
        {formatNum(ethTime.hour)}:{formatNum(ethTime.minute)}:{formatNum(now.getSeconds())}
      </div>
      <div className="text-lg">
        {ethTime.period} ({useGeez ? "ግዕዝ ቁጥሮች" : "Arabic numerals"})
      </div>

      {/* Analog Clock with white circle and black overlay numbers */}
      <div className="relative w-56 h-56 rounded-full bg-white shadow-md">
        {/* Overlay numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i + 1) / 12) * 2 * Math.PI
          const radius = 88
          const center = 112
          const x = center + radius * Math.sin(angle)
          const y = center - radius * Math.cos(angle)
          const label = useGeez ? toGeez(i + 1) : (i + 1).toString()

          return (
            <div
              key={i}
              className="absolute text-sm font-semibold text-black"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {label}
            </div>
          )
        })}

        {/* React Clock (hands only) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock
            value={now}
            renderNumbers={false}
            className="w-full h-full"
          />
        </div>

        {/* Clock color override */}
        
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Use Ge’ez</span>
        <Switch
          checked={useGeez}
          onChange={setUseGeez}
          className={`${
            useGeez ? "bg-blue-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              useGeez ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  )
}
