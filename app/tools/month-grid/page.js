"use client";

import React, { useState, useEffect, useMemo } from "react";
import { LiveAmharicDateTime } from "@/components/Landing/LiveAmharicDateTime";
import MonthGridExample from "@/components/MonthGridExample";

export default function MonthGridPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="mb-12">
                <LiveAmharicDateTime />
            </div>
            <MonthGridExample />
        </div>
    );
}
