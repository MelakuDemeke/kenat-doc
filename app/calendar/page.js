import { YearCalendar, yearCalendarMetadata } from "@/components/Dates/YearCalendar";
import { nowInEthiopia } from "@/lib/ethiopianDates";

export const revalidate = 3600;

export async function generateMetadata() {
  const year = nowInEthiopia().ethiopian.year;
  return yearCalendarMetadata(year, `/calendar/${year}`);
}

export default function CalendarPage() {
  const { gregorian, ethiopian } = nowInEthiopia();
  return <YearCalendar year={ethiopian.year} today={gregorian} path="/calendar" />;
}
