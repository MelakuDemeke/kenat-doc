import Link from "next/link";
import { notFound } from "next/navigation";
import { DatePageShell, Fact, HolidayTable } from "@/components/Dates/DatePageShell";
import { LiveDays } from "@/components/Dates/LiveDates";
import {
  parseIsoDate, toEC, formatGregorian, formatEthiopian, formatEthiopianAmharic, formatEthiopianGeez, holidaysOnDate,
  addDaysGregorian, isoDate, weekdayIndex, WEEKDAYS_EN, WEEKDAYS_AM, MONTHS_EN, daysInEthiopianMonth, SITE_URL,
} from "@/lib/ethiopianDates";

// Pages are rendered on first visit and then cached; a date never changes.
export function generateStaticParams() {
  return [];
}

function load(param) {
  const g = parseIsoDate(param);
  if (!g) return null;
  return { g, e: toEC(g.year, g.month, g.day) };
}

export async function generateMetadata({ params }) {
  const d = load((await params).date);
  if (!d) return {};
  const { g, e } = d;
  const holidays = holidaysOnDate(g);
  const title = `${formatGregorian(g)} in Ethiopian Calendar: ${formatEthiopian(e)} E.C.`;
  const description = `${formatGregorian(g, { weekday: true })} is ${formatEthiopian(e)} in the Ethiopian calendar (${formatEthiopianAmharic(e)}).${holidays.length ? ` Holiday: ${holidays.map((h) => h.short).join(", ")}.` : ""} Convert any date between the Ethiopian and Gregorian calendars.`;
  return {
    title,
    description,
    keywords: [
      `${formatGregorian(g)} Ethiopian date`, `${formatEthiopian(e)} in Gregorian`, `${MONTHS_EN[e.month - 1]} ${e.day} ${e.year}`,
      "Ethiopian date converter", "Gregorian to Ethiopian",
    ],
    alternates: { canonical: `/date/${isoDate(g)}` },
    openGraph: { title, description, url: `${SITE_URL}/date/${isoDate(g)}` },
  };
}

export default async function DatePage({ params }) {
  const d = load((await params).date);
  if (!d) notFound();
  const { g, e } = d;
  const w = weekdayIndex(g);
  const holidays = holidaysOnDate(g);
  const prev = addDaysGregorian(g, -1);
  const next = addDaysGregorian(g, 1);
  const dayOfYear = (e.month - 1) * 30 + e.day;
  const yearLength = 360 + daysInEthiopianMonth(e.year, 13);

  const faqs = [
    {
      q: `What is ${formatGregorian(g)} in the Ethiopian calendar?`,
      a: `${formatGregorian(g, { weekday: true })} is ${WEEKDAYS_EN[w]}, ${formatEthiopian(e)} E.C. In Amharic: ${WEEKDAYS_AM[w]}, ${formatEthiopianAmharic(e)}.`,
    },
    {
      q: `What is ${formatEthiopian(e)} E.C. in the Gregorian calendar?`,
      a: `${MONTHS_EN[e.month - 1]} ${e.day}, ${e.year} in the Ethiopian calendar is ${formatGregorian(g, { weekday: true })}.`,
    },
  ];

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Ethiopian calendar", href: "/calendar" }, { label: String(e.year), href: `/calendar/${e.year}` }, { label: formatEthiopian(e), href: `/date/${isoDate(g)}` }]}
      eyebrow={formatGregorian(g, { weekday: true })}
      title={`${formatEthiopian(e)} E.C.`}
      lede={`${formatGregorian(g)} in the Gregorian calendar is ${MONTHS_EN[e.month - 1]} ${e.day}, ${e.year} in the Ethiopian calendar, a ${WEEKDAYS_EN[w]}.`}
      faqs={faqs}
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <section aria-label="Both calendars" className="k-card p-6 sm:p-8">
          <p className="k-am k-muted text-lg">{WEEKDAYS_AM[w]} · {WEEKDAYS_EN[w]}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-4">
            <span className="k-am text-5xl leading-tight">{formatEthiopianGeez(e).split(" ")[0]}</span>
            <span className="text-6xl font-semibold tracking-[-0.04em] tabular leading-none k-accent">{e.day}</span>
            <span className="text-3xl font-semibold tracking-[-0.03em] tabular k-muted">{e.year}</span>
          </p>
          <dl className="mt-8 divide-y divide-[var(--border)] border-y k-border text-[0.95rem]">
            <Fact label="Gregorian">{formatGregorian(g, { weekday: true })}</Fact>
            <Fact label="Ethiopian">{formatEthiopian(e)} E.C.</Fact>
            <Fact label="In Amharic"><span className="k-am">{formatEthiopianAmharic(e)}</span></Fact>
            <Fact label="Ge'ez numerals"><span className="k-am">{formatEthiopianGeez(e)}</span></Fact>
            <Fact label="Day of the year">{dayOfYear} of {yearLength}</Fact>
            <Fact label="From today"><LiveDays target={isoDate(g)} mode="relative" initial="" /></Fact>
          </dl>
        </section>

        <section aria-label="Navigate">
          <div className="flex flex-wrap gap-3">
            <Link href={`/date/${isoDate(prev)}`} className="k-btn k-btn-ghost">← {formatGregorian(prev)}</Link>
            <Link href={`/date/${isoDate(next)}`} className="k-btn k-btn-ghost">{formatGregorian(next)} →</Link>
          </div>
          <ul className="mt-6 space-y-2.5">
            <li><Link href={`/calendar/${e.year}#${MONTHS_EN[e.month - 1].toLowerCase()}`} className="k-link">{MONTHS_EN[e.month - 1]} {e.year} month calendar</Link></li>
            <li><Link href={`/holidays/${e.year}`} className="k-link">Ethiopian holidays {e.year}</Link></li>
            <li><Link href="/today" className="k-link">Today&apos;s Ethiopian date</Link></li>
            <li><Link href="/tools/date-converter" className="k-link">Convert another date</Link></li>
          </ul>
        </section>
      </div>

      {holidays.length > 0 && (
        <section aria-labelledby="holidays-on-day" className="mt-16">
          <h2 id="holidays-on-day" className="text-2xl font-semibold tracking-[-0.02em]">Holidays on this day</h2>
          <div className="mt-6">
            <HolidayTable holidays={holidays} caption="Holidays on this day" />
          </div>
        </section>
      )}
    </DatePageShell>
  );
}
