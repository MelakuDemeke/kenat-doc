import Link from "next/link";
import { DatePageShell } from "@/components/Dates/DatePageShell";
import {
  yearMonths, holidaysForYear, gregorianSpan, formatGregorian, isoDate, addDaysGregorian, toGeez,
  daysInEthiopianMonth, SITE_URL,
} from "@/lib/ethiopianDates";

const HEAD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function yearCalendarMetadata(year, canonical) {
  const span = gregorianSpan(year);
  const title = `Ethiopian Calendar ${year} E.C. (${span}): All 13 Months with Gregorian Dates`;
  const description = `The full Ethiopian calendar for ${year} E.C. (Gregorian ${span}): all 13 months from Meskerem to Pagume side by side with Gregorian dates, weekdays, Ge'ez numerals and every holiday.`;
  return {
    title,
    description,
    keywords: [
      `Ethiopian calendar ${year}`, `${year} Ethiopian calendar`, `Ethiopian calendar ${span.slice(0, 4)}`, `Ethiopian calendar ${+span.slice(0, 4) + 1}`,
      `የ${year} ዓ.ም. ቀን መቁጠሪያ`, "Ethiopian calendar with Gregorian dates", "Ethiopian months", "Pagume",
    ],
    alternates: { canonical },
    openGraph: { title, description, url: `${SITE_URL}${canonical}` },
  };
}

export function YearCalendar({ year, today, path }) {
  const months = yearMonths(year);
  const holidays = holidaysForYear(year);
  const byDay = new Map();
  for (const h of holidays) {
    const k = `${h.ethiopian.month}-${h.ethiopian.day}`;
    byDay.set(k, [...(byDay.get(k) ?? []), h]);
  }
  const todayIso = today ? isoDate(today) : null;
  const span = gregorianSpan(year);
  const pagume = daysInEthiopianMonth(year, 13);

  const faqs = [
    {
      q: `When does the Ethiopian year ${year} start and end?`,
      a: `${year} E.C. starts on Meskerem 1, ${formatGregorian(months[0].start, { weekday: true })}, and ends on Pagume ${pagume}, ${formatGregorian(months[12].end, { weekday: true })}.`,
    },
    {
      q: `Is ${year} a leap year in the Ethiopian calendar?`,
      a: pagume === 6
        ? `Yes. ${year} E.C. is a leap year, so Pagume has 6 days and the year has 366 days.`
        : `No. ${year} E.C. is a regular year: Pagume has 5 days and the year has 365 days.`,
    },
    {
      q: "How many months are in the Ethiopian calendar?",
      a: "Thirteen. Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miyazia, Ginbot, Sene, Hamle and Nehase have 30 days each, and Pagume has 5 or 6.",
    },
  ];

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Ethiopian calendar", href: "/calendar" }, ...(path !== "/calendar" ? [{ label: String(year), href: path }] : [])]}
      eyebrow={`Gregorian ${span}`}
      title={`Ethiopian calendar ${year}`}
      lede={`All 13 months of ${year} E.C., from ${formatGregorian(months[0].start)} to ${formatGregorian(months[12].end)}, with the Gregorian date under every day and holidays marked.`}
      faqs={faqs}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link href={`/calendar/${year - 1}`} className="k-btn k-btn-ghost">← {year - 1}</Link>
        <Link href={`/calendar/${year + 1}`} className="k-btn k-btn-ghost">{year + 1} →</Link>
        <Link href={`/holidays/${year}`} className="k-link ml-auto">{year} holidays list</Link>
      </div>

      <nav aria-label="Months" className="mt-8 flex flex-wrap gap-2 text-sm">
        {months.map((m) => (
          <a key={m.month} href={`#${m.name.toLowerCase()}`} className="rounded-lg border k-border px-3 py-1.5 k-muted hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors">
            {m.name}
          </a>
        ))}
      </nav>

      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {months.map((m) => {
          const cells = [...Array(m.firstWeekday).fill(null), ...Array.from({ length: m.days }, (_, i) => i + 1)];
          const monthHolidays = holidays.filter((h) => h.ethiopian.month === m.month);
          return (
            <section key={m.month} id={m.name.toLowerCase()} aria-labelledby={`h-${m.month}`} className="scroll-mt-24">
              <h2 id={`h-${m.month}`} className="flex items-baseline justify-between gap-3">
                <span className="text-lg font-semibold tracking-[-0.01em]">
                  {m.name} <span className="k-am k-muted font-normal">{m.amharic}</span>
                </span>
                <span className="text-xs k-subtle tabular whitespace-nowrap">
                  {GM[m.start.month - 1]} {m.start.day} – {GM[m.end.month - 1]} {m.end.day}
                </span>
              </h2>
              <table className="mt-3 w-full table-fixed text-center text-sm">
                <caption className="sr-only">{m.name} {year} E.C.</caption>
                <thead>
                  <tr className="text-xs k-subtle">
                    {HEAD.map((d) => <th key={d} scope="col" className="pb-2 font-medium">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(cells.length / 7) }, (_, r) => (
                    <tr key={r}>
                      {cells.slice(r * 7, r * 7 + 7).concat(Array(Math.max(0, 7 - cells.slice(r * 7, r * 7 + 7).length)).fill(null)).map((day, c) => {
                        if (!day) return <td key={c} />;
                        const g = addDaysGregorian(m.start, day - 1);
                        const hs = byDay.get(`${m.month}-${day}`);
                        const isToday = isoDate(g) === todayIso;
                        return (
                          <td key={c} className="p-0.5">
                            <Link
                              href={`/date/${isoDate(g)}`}
                              title={hs ? hs.map((h) => h.short).join(", ") : formatGregorian(g)}
                              className={`block rounded-lg py-1.5 leading-tight transition-colors hover:bg-[var(--surface)] ${isToday ? "ring-2 ring-[var(--accent)]" : ""} ${hs ? "bg-[var(--accent-soft)] k-accent font-semibold" : ""}`}
                            >
                              <span className="block tabular">{day}</span>
                              <span className="block text-[0.65rem] k-subtle font-normal tabular">{g.day === 1 ? GM[g.month - 1] : g.day}</span>
                            </Link>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {monthHolidays.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm">
                  {monthHolidays.map((h) => (
                    <li key={`${h.key}-${h.ethiopian.day}`} className="flex gap-2">
                      <span className="tabular k-subtle w-6 shrink-0 text-right">{h.ethiopian.day}</span>
                      <Link href={`/holidays/${h.slug}`} className="k-muted hover:text-[var(--fg)] transition-colors">{h.short}</Link>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs k-subtle k-am">{m.amharic} {toGeez(year)}</p>
            </section>
          );
        })}
      </div>
    </DatePageShell>
  );
}
