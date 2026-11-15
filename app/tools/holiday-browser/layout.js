import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ethiopian Holiday Browser: Holidays by Month and Year",
  description:
    "Browse Ethiopian holidays for any month or year: public, Orthodox and Muslim holidays with Ethiopian and Gregorian dates, filtered by type.",
  path: "/tools/holiday-browser",
  keywords: ["Ethiopian holidays", "Ethiopian public holidays", "Ethiopian holidays this month", "Ethiopian Orthodox holidays", "Ethiopian holiday calendar"],
});

export default function HolidayBrowserLayout({ children }) {
  return children;
}
