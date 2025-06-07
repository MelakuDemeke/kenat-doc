"use client"

import React, { useState } from "react"
import EthiopianDatePicker from "./EthiopianDatePicker"

export default function EthiopianDatePickerWrapper() {
    const [selected, setSelected] = useState(null)

    return (
        <div className="space-y-4">
            <EthiopianDatePicker onChange={setSelected} />
            {selected && (
                <p className="text-center text-sm text-blue-600 dark:text-blue-300 font-mono">
                    Selected: {selected.year}/{selected.month}/{selected.day}
                </p>
            )}
        </div>
    )
}
