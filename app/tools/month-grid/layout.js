import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ethiopian Calendar Month View with Gregorian Dates",
  description:
    "View any Ethiopian month as a calendar grid with Gregorian dates, Amharic or English weekday names and holidays marked on each day.",
  path: "/tools/month-grid",
  keywords: ["Ethiopian calendar", "Ethiopian month calendar", "Ethiopian calendar with Gregorian dates", "Amharic calendar"],
});

export default function MonthGridLayout({ children }) {
  return children;
}
