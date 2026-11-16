"use client";

import { LiveAmharicDateTime } from "@/components/Landing/LiveAmharicDateTime";
import MonthGridExample from "@/components/MonthGridExample";

export default function MonthGridPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="sr-only">Ethiopian Calendar Month View with Gregorian Dates</h1>
            <div className="mb-12">
                <LiveAmharicDateTime />
            </div>
            <MonthGridExample />
        </div>
    );
}
