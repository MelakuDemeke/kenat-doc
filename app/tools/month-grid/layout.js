import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { ToolGuide } from "@/components/ToolGuide";
import { MONTH_GRID_FAQS } from "@/lib/faqs";
import { TOOL_GUIDES } from "@/lib/toolGuides";

export const metadata = pageMetadata({
  title: "Ethiopian Calendar Month View with Gregorian Dates",
  description:
    "View any Ethiopian month as a calendar grid with Gregorian dates, Amharic or English weekday names and holidays marked on each day.",
  path: "/tools/month-grid",
  keywords: ["Ethiopian calendar", "Ethiopian month calendar", "Ethiopian calendar with Gregorian dates", "Amharic calendar"],
});

export default function MonthGridLayout({ children }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pb-20">
        <ToolGuide guide={TOOL_GUIDES["month-grid"]} className="pt-16 border-t k-border" />
        <FaqSection faqs={MONTH_GRID_FAQS} className="mt-16" />
      </div>
    </>
  );
}
