import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { ToolGuide } from "@/components/ToolGuide";
import { BAHIRE_HASAB_FAQS } from "@/lib/faqs";
import { TOOL_GUIDES } from "@/lib/toolGuides";

export const metadata = pageMetadata({
  title: "Bahire Hasab Calculator: Ethiopian Fasts and Feasts",
  description:
    "Calculate Bahire Hasab for any Ethiopian year: the Evangelist of the year, the start of Nineveh and the dates of Lent, Fasika and every other movable feast.",
  path: "/tools/bahire-hasab",
  keywords: ["Bahire Hasab", "ባሕረ ሐሳብ", "Ethiopian fasting calendar", "Fasika date", "Ethiopian Lent", "Ethiopian movable feasts"],
});

export default function BahireHasabLayout({ children }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pb-20">
        <ToolGuide guide={TOOL_GUIDES["bahire-hasab"]} className="pt-16 border-t k-border" />
        <FaqSection faqs={BAHIRE_HASAB_FAQS} className="mt-16" />
      </div>
    </>
  );
}
