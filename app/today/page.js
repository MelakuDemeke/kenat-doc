import Link from "next/link";
import { DatePageShell, Fact, HolidayTable } from "@/components/Dates/DatePageShell";
import { LiveDays, LiveEthiopianDate, LiveEthiopianTime } from "@/components/Dates/LiveDates";
import { dayPart } from "@/lib/dayPart";
import {
  nowInEthiopia, ethiopianClock, formatGregorian, formatEthiopian, formatEthiopianAmharic, formatEthiopianGeez,
  upcomingHolidays, holidayAround, holidaysForYear, untilPhrase, isoDate, gregorianSpan, daysInEthiopianMonth,
  WEEKDAYS_EN, WEEKDAYS_AM, weekdayIndex, MONTHS_EN, toGC, SITE_URL,
} from "@/lib/ethiopianDates";

// Re-render at most every 15 minutes; the live widgets correct anything in between.
export const revalidate = 900;

export async function generateMetadata() {
  const { ethiopian: e, gregorian: g } = nowInEthiopia();
  const title = `Today's Ethiopian Date: ${formatEthiopian(e)} E.C.`;
  const description = `Today in Ethiopia is ${WEEKDAYS_EN[weekdayIndex(g)]}, ${formatEthiopian(e)} in the Ethiopian calendar (${formatEthiopianAmharic(e)}), which is ${formatGregorian(g)}. See the current Ethiopian time, year and the next holidays.`;
  return {
    title,
    description,
    keywords: [
      "Ethiopian date today", "today's date in Ethiopia", "Ethiopian calendar today", "what is today in Ethiopian calendar",
      "የዛሬ ቀን", "ዛሬ ስንት ነው", "Ethiopian time now", "what year is it in Ethiopia", "current Ethiopian year",
    ],
    alternates: { canonical: "/today" },
    openGraph: { title, description, url: `${SITE_URL}/today`, type: "website" },
  };
}

export default function TodayPage() {
  const { gregorian: g, ethiopian: e, hour, minute } = nowInEthiopia();
  const part = dayPart(hour);
  const upcoming = upcomingHolidays(g, 6);
  const newYear = holidayAround("enkutatash", g);
  const thisMonth = holidaysForYear(e.year).filter((h) => h.ethiopian.month === e.month);
  const monthDays = daysInEthiopianMonth(e.year, e.month);
  const daysLeftInYear = (() => {
    const end = toGC(e.year, 13, daysInEthiopianMonth(e.year, 13));
    return Math.round((Date.UTC(end.year, end.month - 1, end.day) - Date.UTC(g.year, g.month - 1, g.day)) / 86_400_000);
  })();
  const weekday = weekdayIndex(g);
  const yearGap = g.year - e.year;

  const faqs = [
    {
      q: "What is today's date in the Ethiopian calendar?",
      a: `Today is ${WEEKDAYS_EN[weekday]}, ${formatEthiopian(e)} E.C. (${formatEthiopianAmharic(e)}). In the Gregorian calendar that is ${formatGregorian(g)}.`,
    },
    {
      q: "What year is it in Ethiopia?",
      a: `It is ${e.year} in the Ethiopian calendar (E.C.), which runs from September ${gregorianSpan(e.year).slice(0, 4)} to September ${+gregorianSpan(e.year).slice(0, 4) + 1}. The Ethiopian year is ${yearGap} years behind the Gregorian year right now; the gap is 7 years from Enkutatash (September 11 or 12) to December 31 and 8 years from January 1 until the next Enkutatash.`,
    },
    {
      q: "Why is the Ethiopian calendar 7 or 8 years behind?",
      a: "The Ethiopian Orthodox Church dates the Annunciation differently from the Western church, so its year count starts about seven to eight years later. The calendar also has 13 months: twelve of 30 days and Pagume, which has 5 days, or 6 in a leap year.",
    },
    {
      q: "What time is it in Ethiopia now?",
      a: `Ethiopia uses East Africa Time (UTC+3). Ethiopians count hours from sunrise, so the international ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} is ${ethiopianClock(hour, minute)} ${part.en.toLowerCase()} (${part.am}) on the Ethiopian clock.`,
    },
    {
      q: "When is the next Ethiopian New Year?",
      a: newYear.next
        ? `Enkutatash, the Ethiopian New Year ${newYear.next.ethiopian.year}, falls on ${formatGregorian(newYear.next.gregorian, { weekday: true })}, ${untilPhrase(newYear.daysUntil)}.`
        : "Enkutatash falls on Meskerem 1, which is September 11 (September 12 in the year before a Gregorian leap year).",
    },
  ];

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Today in Ethiopia", href: "/today" }]}
      eyebrow="Today in Ethiopia"
      title="Today's date in the Ethiopian calendar"
      lede={`Today is ${WEEKDAYS_EN[weekday]}, ${formatEthiopian(e)} E.C., which is ${formatGregorian(g)}. The date updates live for Addis Ababa time.`}
      faqs={faqs}
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <section aria-label="Today's Ethiopian date" className="k-card p-6 sm:p-8">
          <p className="k-am k-muted text-lg">{WEEKDAYS_AM[weekday]} · {WEEKDAYS_EN[weekday]}</p>
          <div className="mt-2">
            <LiveEthiopianDate initial={e} />
          </div>
          <dl className="mt-8 divide-y divide-[var(--border)] border-y k-border text-[0.95rem]">
            <Fact label="Gregorian">{formatGregorian(g, { weekday: true })}</Fact>
            <Fact label="In Amharic"><span className="k-am">{formatEthiopianAmharic(e)}</span></Fact>
            <Fact label="Ge'ez numerals"><span className="k-am">{formatEthiopianGeez(e)}</span></Fact>
            <div id="time" className="scroll-mt-24">
              <Fact label="Time in Ethiopia">
                <LiveEthiopianTime
                  initial={{ ethiopian: ethiopianClock(hour, minute), part: part.am, partEn: part.en, international: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}` }}
                />
              </Fact>
            </div>
          </dl>
        </section>

        <section aria-label="This year at a glance">
          <dl id="year" className="scroll-mt-24 divide-y divide-[var(--border)] border-y k-border text-[0.95rem]">
            <Fact label="Ethiopian year">
              <Link href={`/calendar/${e.year}`} className="k-link">{e.year} E.C.</Link>
              <span className="block k-subtle font-normal text-sm">Gregorian {gregorianSpan(e.year)}</span>
            </Fact>
            <Fact label="Month">
              {MONTHS_EN[e.month - 1]} (month {e.month} of 13)
              <span className="block k-subtle font-normal text-sm">Day {e.day} of {monthDays}</span>
            </Fact>
            <Fact label="Days left this year">{daysLeftInYear}</Fact>
            {newYear.next && (
              <Fact label="Next Enkutatash">
                <Link href="/holidays/enkutatash" className="k-link">
                  <LiveDays target={isoDate(newYear.next.gregorian)} initial={untilPhrase(newYear.daysUntil)} />
                </Link>
                <span className="block k-subtle font-normal text-sm">{formatGregorian(newYear.next.gregorian)}</span>
              </Fact>
            )}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/date-converter" className="k-btn">Convert a date</Link>
            <Link href={`/date/${isoDate(g)}`} className="k-btn k-btn-ghost">Share today&apos;s date</Link>
          </div>
        </section>
      </div>

      <section aria-labelledby="upcoming" className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="upcoming" className="text-2xl font-semibold tracking-[-0.02em]">Upcoming Ethiopian holidays</h2>
          <Link href="/holidays" className="k-link text-sm shrink-0">All holidays</Link>
        </div>
        <div className="mt-6">
          <HolidayTable
            holidays={upcoming}
            caption="Upcoming Ethiopian holidays"
            relative={(h) => <LiveDays target={isoDate(h.gregorian)} initial={untilPhrase(h.daysUntil)} />}
          />
        </div>
      </section>

      {thisMonth.length > 0 && (
        <section aria-labelledby="this-month" className="mt-16">
          <h2 id="this-month" className="text-2xl font-semibold tracking-[-0.02em]">Holidays in {MONTHS_EN[e.month - 1]} {e.year}</h2>
          <div className="mt-6">
            <HolidayTable holidays={thisMonth} caption={`Holidays in ${MONTHS_EN[e.month - 1]} ${e.year}`} />
          </div>
        </section>
      )}
    </DatePageShell>
  );
}
