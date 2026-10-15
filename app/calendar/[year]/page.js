import { notFound } from "next/navigation";
import { YearCalendar, yearCalendarMetadata } from "@/components/Dates/YearCalendar";
import { YEARS } from "@/lib/ethiopianDates";

export const revalidate = 86400;

function parseYear(s) {
  if (!/^\d{4}$/.test(s)) return null;
  const y = +s;
  return y >= 1900 && y <= 2100 ? y : null;
}

export function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }) {
  const year = parseYear((await params).year);
  return year ? yearCalendarMetadata(year, `/calendar/${year}`) : {};
}

export default async function CalendarYearPage({ params }) {
  const year = parseYear((await params).year);
  if (!year) notFound();
  return <YearCalendar year={year} path={`/calendar/${year}`} />;
}
