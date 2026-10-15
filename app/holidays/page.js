import Link from "next/link";
import { DatePageShell, HolidayTable } from "@/components/Dates/DatePageShell";
import { LiveDays } from "@/components/Dates/LiveDates";
import {
  nowInEthiopia, holidaysForYear, upcomingHolidays, holidayAround, untilPhrase, isoDate, gregorianSpan,
  formatGregorian, HOLIDAYS, YEARS, SITE_URL,
} from "@/lib/ethiopianDates";

export const revalidate = 3600;

export async function generateMetadata() {
  const { ethiopian: e } = nowInEthiopia();
  const span = gregorianSpan(e.year);
  const title = `Ethiopian Holidays ${e.year} (${span}): Full List with Dates`;
  const description = `Every Ethiopian holiday in ${e.year} E.C. (${span}) with Ethiopian and Gregorian dates: Enkutatash, Meskel, Genna, Timket, Adwa, Fasika, Eid al-Fitr, Eid al-Adha and more, plus how many days are left until each one.`;
  return {
    title,
    description,
    keywords: [
      "Ethiopian holidays", `Ethiopian holidays ${e.year}`, `Ethiopian holidays ${span.slice(0, 4)}`, "Ethiopian public holidays",
      "next Ethiopian holiday", "Ethiopian holiday calendar", "የኢትዮጵያ በዓላት", "Ethiopian Orthodox holidays", "movable holidays Ethiopia",
    ],
    alternates: { canonical: "/holidays" },
    openGraph: { title, description, url: `${SITE_URL}/holidays`, type: "website" },
  };
}

export default function HolidaysPage() {
  const { gregorian: g, ethiopian: e } = nowInEthiopia();
  const thisYear = holidaysForYear(e.year);
  const nextYear = holidaysForYear(e.year + 1);
  const next = upcomingHolidays(g, 1)[0];
  const t = Math.round(Date.UTC(g.year, g.month - 1, g.day) / 86_400_000);
  const rel = (h) => {
    const d = Math.round(Date.UTC(h.gregorian.year, h.gregorian.month - 1, h.gregorian.day) / 86_400_000) - t;
    return d < 0 ? <span className="k-subtle">passed</span> : <LiveDays target={isoDate(h.gregorian)} initial={untilPhrase(d)} />;
  };
  const publicCount = thisYear.filter((h) => h.tags.includes("public")).length;

  const faqs = [
    next && {
      q: "What is the next Ethiopian holiday?",
      a: `The next holiday is ${next.short}${next.alias && next.alias !== next.short ? ` (${next.alias})` : ""} on ${formatGregorian(next.gregorian, { weekday: true })}, ${untilPhrase(next.daysUntil)}.`,
    },
    {
      q: `How many public holidays does Ethiopia have in ${e.year}?`,
      a: `Kenat lists ${publicCount} public holidays in ${e.year} E.C., alongside the major Orthodox fasts and feasts. Christian feasts follow the Ethiopian calendar, while Muslim holidays follow the lunar Hijri calendar, so their Ethiopian dates move every year.`,
    },
    {
      q: "Which Ethiopian holidays move every year?",
      a: "Fasika (Easter), Siklet (Good Friday), Hosanna, Abiy Tsome (Lent), the Fast of Nineveh, Debre Zeit, Erget, Paraclete and the Apostles' Fast are computed with Bahire Hasab. Eid al-Fitr, Eid al-Adha and Mawlid follow the Islamic lunar calendar.",
    },
  ].filter(Boolean);

  const holidayLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Ethiopian holidays ${e.year} E.C.`,
    itemListElement: thisYear.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/holidays/${h.slug}`,
      name: `${h.short} – ${formatGregorian(h.gregorian)}`,
    })),
  };

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Ethiopian holidays", href: "/holidays" }]}
      eyebrow={`${e.year} E.C. · ${gregorianSpan(e.year)}`}
      title={`Ethiopian holidays ${e.year}`}
      lede={
        next
          ? `The next holiday is ${next.short}, ${formatGregorian(next.gregorian, { weekday: true })}. Every date below is computed by kenat in both the Ethiopian and Gregorian calendars.`
          : "Every date below is computed by kenat in both the Ethiopian and Gregorian calendars."
      }
      faqs={faqs}
      jsonLd={[holidayLd]}
    >
      <section aria-labelledby="this-year">
        <h2 id="this-year" className="text-2xl font-semibold tracking-[-0.02em]">{e.year} E.C. ({gregorianSpan(e.year)})</h2>
        <div className="mt-6">
          <HolidayTable holidays={thisYear} caption={`Ethiopian holidays ${e.year}`} relative={rel} />
        </div>
      </section>

      <section aria-labelledby="next-year" className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="next-year" className="text-2xl font-semibold tracking-[-0.02em]">{e.year + 1} E.C. ({gregorianSpan(e.year + 1)})</h2>
          <Link href={`/holidays/${e.year + 1}`} className="k-link text-sm shrink-0">Open {e.year + 1}</Link>
        </div>
        <div className="mt-6">
          <HolidayTable holidays={nextYear} caption={`Ethiopian holidays ${e.year + 1}`} relative={rel} />
        </div>
      </section>

      <section aria-labelledby="by-holiday" className="mt-16">
        <h2 id="by-holiday" className="text-2xl font-semibold tracking-[-0.02em]">Countdown by holiday</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 border-t k-border pt-6">
          {HOLIDAYS.map((h) => {
            const around = holidayAround(h.key, g);
            return (
              <li key={h.slug} className="flex items-baseline justify-between gap-3">
                <Link href={`/holidays/${h.slug}`} className="k-link">{h.short}</Link>
                {around.next && (
                  <span className="text-sm k-subtle whitespace-nowrap">
                    <LiveDays target={isoDate(around.next.gregorian)} initial={untilPhrase(around.daysUntil)} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="by-year" className="mt-16">
        <h2 id="by-year" className="text-2xl font-semibold tracking-[-0.02em]">Holidays by year</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <li key={y}>
              <Link
                href={`/holidays/${y}`}
                className={`inline-flex rounded-lg border k-border px-3 py-1.5 text-sm tabular hover:border-[var(--accent)] transition-colors ${y === e.year ? "k-accent font-semibold" : "k-muted"}`}
              >
                {y} <span className="k-subtle ml-1.5">{gregorianSpan(y)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DatePageShell>
  );
}
