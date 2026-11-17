import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { ToolGuide } from "@/components/ToolGuide";
import { HOLIDAY_BROWSER_FAQS } from "@/lib/faqs";
import { TOOL_GUIDES } from "@/lib/toolGuides";

export const metadata = pageMetadata({
  title: "Ethiopian Holiday Browser: Holidays by Month and Year",
  description:
    "Browse Ethiopian holidays for any month or year: public, Orthodox and Muslim holidays with Ethiopian and Gregorian dates, filtered by type.",
  path: "/tools/holiday-browser",
  keywords: ["Ethiopian holidays", "Ethiopian public holidays", "Ethiopian holidays this month", "Ethiopian Orthodox holidays", "Ethiopian holiday calendar"],
});

export default function HolidayBrowserLayout({ children }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pb-20">
        <ToolGuide guide={TOOL_GUIDES["holiday-browser"]} className="pt-16 border-t k-border" />
        <FaqSection faqs={HOLIDAY_BROWSER_FAQS} className="mt-16" />
      </div>
    </>
  );
}
