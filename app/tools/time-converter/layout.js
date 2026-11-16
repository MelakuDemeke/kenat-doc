import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { TIME_CONVERTER_FAQS } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Ethiopian Time Converter: 24-Hour to Ethiopian Time",
  description:
    "Convert 24-hour time to Ethiopian time and back. Ethiopian time counts two 12-hour cycles starting at 6 AM and 6 PM; see both side by side.",
  path: "/tools/time-converter",
  keywords: ["Ethiopian time", "Ethiopian time converter", "Ethiopian clock", "convert to Ethiopian time", "የኢትዮጵያ ሰዓት"],
});

export default function TimeConverterLayout({ children }) {
  return (
    <>
      {children}
      <FaqSection faqs={TIME_CONVERTER_FAQS} className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 py-16" />
    </>
  );
}
