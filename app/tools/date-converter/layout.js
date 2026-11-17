import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { ToolGuide } from "@/components/ToolGuide";
import { DATE_CONVERTER_FAQS } from "@/lib/faqs";
import { TOOL_GUIDES } from "@/lib/toolGuides";

export const metadata = pageMetadata({
  title: "Ethiopian Date Converter: Ethiopian ↔ Gregorian",
  description:
    "Convert any date from the Ethiopian calendar to Gregorian, or Gregorian to Ethiopian, instantly. Handles Pagume and leap years. Free, no sign-up.",
  path: "/tools/date-converter",
  keywords: ["Ethiopian date converter", "convert Ethiopian to Gregorian", "Gregorian to Ethiopian", "Ethiopian calendar converter", "የቀን መቀየሪያ"],
});

export default function DateConverterLayout({ children }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pb-20">
        <ToolGuide guide={TOOL_GUIDES["date-converter"]} className="pt-16 border-t k-border" />
        <FaqSection faqs={DATE_CONVERTER_FAQS} className="mt-16" />
      </div>
    </>
  );
}
