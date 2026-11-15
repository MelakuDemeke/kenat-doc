import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ethiopian Date Converter: Ethiopian ↔ Gregorian",
  description:
    "Convert any date from the Ethiopian calendar to Gregorian, or Gregorian to Ethiopian, instantly. Handles Pagume and leap years. Free, no sign-up.",
  path: "/tools/date-converter",
  keywords: ["Ethiopian date converter", "convert Ethiopian to Gregorian", "Gregorian to Ethiopian", "Ethiopian calendar converter", "የቀን መቀየሪያ"],
});

export default function DateConverterLayout({ children }) {
  return children;
}
