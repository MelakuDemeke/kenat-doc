import HolidayBrowserExample from "@/components/HolidayBrowserExample";

export default function HolidayBrowserPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-4xl font-bold text-center my-6">Holiday Browser - Ethiopian Holidays</h1>
            <HolidayBrowserExample />
        </div>
    );
}
