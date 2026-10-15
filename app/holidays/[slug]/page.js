import Link from "next/link";
import { notFound } from "next/navigation";
import { DatePageShell, Fact, HolidayTable } from "@/components/Dates/DatePageShell";
import { LiveDayCount, LiveDays } from "@/components/Dates/LiveDates";
import {
  nowInEthiopia, holidaysForYear, holidayAround, occurrences, untilPhrase, sincePhrase, isoDate, gregorianSpan,
  formatGregorian, formatEthiopian, formatEthiopianAmharic, HOLIDAYS, HOLIDAY_BY_SLUG, MAJOR_SLUGS, YEARS,
  MONTHS_EN, dayNumber, SITE_URL,
} from "@/lib/ethiopianDates";

export const revalidate = 3600;

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

export function generateStaticParams() {
  return [...HOLIDAYS.map((h) => ({ slug: h.slug })), ...YEARS.map((y) => ({ slug: String(y) }))];
}

function parseYear(slug) {
  if (!/^\d{4}$/.test(slug)) return null;
  const y = +slug;
  return y >= MIN_YEAR && y <= MAX_YEAR ? y : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const year = parseYear(slug);
  if (year) {
    const span = gregorianSpan(year);
    const title = `Ethiopian Holidays ${year} E.C. (${span}) with Gregorian Dates`;
    const description = `All Ethiopian holidays in ${year} E.C. (Gregorian ${span}): Enkutatash, Meskel, Genna, Timket, Adwa, Fasika, Eid and every movable fast and feast, each with its Ethiopian and Gregorian date.`;
    return {
      title,
      description,
      keywords: [`Ethiopian holidays ${year}`, `Ethiopian holidays ${span.slice(0, 4)}`, `${year} Ethiopian calendar holidays`, `Fasika ${year}`, `Ethiopian Easter ${+span.slice(0, 4) + 1}`],
      alternates: { canonical: `/holidays/${year}` },
      openGraph: { title, description, url: `${SITE_URL}/holidays/${year}` },
    };
  }

  const meta = HOLIDAY_BY_SLUG[slug];
  if (!meta) return {};
  const { gregorian: g } = nowInEthiopia();
  const { next, prev, daysUntil, daysSince } = holidayAround(meta.key, g);
  const gYear = next?.gregorian.year ?? g.year;
  const title = `${meta.short} ${gYear}: When Is ${meta.alias === meta.short ? meta.short : meta.alias}? Date & Countdown`;
  const parts = [];
  if (next) parts.push(`${meta.short} ${gYear} falls on ${formatGregorian(next.gregorian, { weekday: true })} (${formatEthiopian(next.ethiopian)} E.C.), ${untilPhrase(daysUntil)}.`);
  if (prev) parts.push(`The last ${meta.short} was ${sincePhrase(daysSince)}, on ${formatGregorian(prev.gregorian)}.`);
  parts.push("Dates for past and future years in both calendars.");
  const description = parts.join(" ");
  return {
    title,
    description,
    keywords: [
      ...meta.search,
      ...meta.search.slice(0, 2).flatMap((s) => [`${s} ${gYear}`, `when is ${s}`, `how many days until ${s}`, `how long ago was ${s}`]),
      `${meta.short} date`,
    ],
    alternates: { canonical: `/holidays/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/holidays/${slug}`, type: "article" },
  };
}

export default async function HolidaySlugPage({ params }) {
  const { slug } = await params;
  const year = parseYear(slug);
  if (year) return <YearHolidays year={year} />;
  const meta = HOLIDAY_BY_SLUG[slug];
  if (!meta) notFound();
  return <SingleHoliday meta={meta} />;
}

function YearHolidays({ year }) {
  const list = holidaysForYear(year);
  const span = gregorianSpan(year);
  const byMonth = MONTHS_EN.map((name, i) => ({ name, month: i + 1, items: list.filter((h) => h.ethiopian.month === i + 1) })).filter((m) => m.items.length);
  const find = (key) => list.find((h) => h.key === key);
  const faqs = [
    ["enkutatash", "When is Enkutatash"],
    ["gena", "When is Ethiopian Christmas (Genna)"],
    ["timket", "When is Timket"],
    ["fasika", "When is Ethiopian Easter (Fasika)"],
    ["abiyTsome", "When does Abiy Tsome (Lent) start"],
  ]
    .map(([key, q]) => {
      const h = find(key);
      return h && { q: `${q} in ${year} E.C.?`, a: `${formatEthiopian(h.ethiopian)} E.C., which is ${formatGregorian(h.gregorian, { weekday: true })}.` };
    })
    .filter(Boolean);

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Ethiopian holidays", href: "/holidays" }, { label: String(year), href: `/holidays/${year}` }]}
      eyebrow={`Gregorian ${span}`}
      title={`Ethiopian holidays ${year} E.C.`}
      lede={`${list.length} holidays, fasts and feasts in the Ethiopian year ${year}, which runs from ${formatGregorian(list.find((h) => h.key === "enkutatash")?.gregorian ?? list[0].gregorian)} until the next Enkutatash.`}
      faqs={faqs}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {year > MIN_YEAR && <Link href={`/holidays/${year - 1}`} className="k-btn k-btn-ghost">← {year - 1}</Link>}
        {year < MAX_YEAR && <Link href={`/holidays/${year + 1}`} className="k-btn k-btn-ghost">{year + 1} →</Link>}
        <Link href={`/calendar/${year}`} className="k-link ml-auto">Full {year} calendar</Link>
      </div>
      <div className="mt-10 space-y-12">
        {byMonth.map((m) => (
          <section key={m.month} aria-labelledby={`m-${m.month}`}>
            <h2 id={`m-${m.month}`} className="text-xl font-semibold tracking-[-0.02em]">{m.name}</h2>
            <div className="mt-4">
              <HolidayTable holidays={m.items} caption={`${m.name} ${year} holidays`} />
            </div>
          </section>
        ))}
      </div>
    </DatePageShell>
  );
}

function SingleHoliday({ meta }) {
  const { gregorian: g, ethiopian: e } = nowInEthiopia();
  const { next, prev, daysUntil, daysSince } = holidayAround(meta.key, g);
  const sample = next ?? prev;
  const history = occurrences(meta.key, e.year - 5, e.year + 10);
  const t = dayNumber(g);
  const isFixed = sample && !sample.movable;
  const isPublic = sample?.tags.includes("public");
  const related = MAJOR_SLUGS.filter((s) => s !== meta.slug).map((s) => HOLIDAY_BY_SLUG[s]);

  const faqs = [
    next && {
      q: `When is ${meta.short} ${next.gregorian.year}?`,
      a: `${meta.short} ${next.gregorian.year} is on ${formatGregorian(next.gregorian, { weekday: true })}, which is ${formatEthiopian(next.ethiopian)} in the Ethiopian calendar (${formatEthiopianAmharic(next.ethiopian)}).`,
    },
    next && {
      q: `How many days until ${meta.short}?`,
      a: daysUntil === 0 ? `${meta.short} is today.` : `There are ${daysUntil} days until ${meta.short} (${formatGregorian(next.gregorian)}).`,
    },
    prev && {
      q: `How long ago was ${meta.short}?`,
      a: `The last ${meta.short} was ${daysSince} days ago, on ${formatGregorian(prev.gregorian, { weekday: true })} (${formatEthiopian(prev.ethiopian)} E.C.).`,
    },
    sample && {
      q: `Does the date of ${meta.short} change every year?`,
      a: isFixed
        ? `In the Ethiopian calendar ${meta.short} is always ${MONTHS_EN[sample.ethiopian.month - 1]} ${sample.ethiopian.day}. Its Gregorian date can shift by a day around leap years.`
        : meta.key === "eidFitr" || meta.key === "eidAdha" || meta.key === "moulid"
          ? `Yes. ${meta.short} follows the Islamic lunar calendar, so it moves about 11 days earlier each year in both the Ethiopian and Gregorian calendars.`
          : `Yes. ${meta.short} is a movable feast computed with Bahire Hasab, the Ethiopian Orthodox reckoning tied to the date of Fasika (Easter).`,
    },
    sample && {
      q: `Is ${meta.short} a public holiday in Ethiopia?`,
      a: isPublic ? `Yes, ${meta.short} is a public holiday in Ethiopia.` : `No, ${meta.short} is a religious observance rather than a public holiday.`,
    },
  ].filter(Boolean);

  const eventLd = next && {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${meta.short} ${next.gregorian.year}${meta.alias !== meta.short ? ` (${meta.alias})` : ""}`,
    description: next.description,
    startDate: isoDate(next.gregorian),
    endDate: isoDate(next.gregorian),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: "Ethiopia", address: { "@type": "PostalAddress", addressCountry: "ET" } },
    url: `${SITE_URL}/holidays/${meta.slug}`,
  };

  return (
    <DatePageShell
      trail={[{ label: "Home", href: "/" }, { label: "Ethiopian holidays", href: "/holidays" }, { label: meta.short, href: `/holidays/${meta.slug}` }]}
      eyebrow={meta.alias !== meta.short ? meta.alias : "Ethiopian holiday"}
      title={`${meta.short}${next ? ` ${next.gregorian.year}` : ""}`}
      lede={sample?.description}
      faqs={faqs}
      jsonLd={eventLd ? [eventLd] : []}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
        {next && (
          <section aria-label={`Countdown to ${meta.short}`} className="k-card p-6 sm:p-8">
            <p className="k-subtle text-sm">Days until {meta.short}</p>
            <p className="mt-2 text-7xl sm:text-8xl font-semibold tracking-[-0.05em] tabular leading-none k-accent">
              <LiveDayCount target={isoDate(next.gregorian)} initial={daysUntil} />
            </p>
            {next.amharic && <p className="k-am mt-5 text-2xl">{next.amharic}</p>}
            <dl className="mt-6 divide-y divide-[var(--border)] border-y k-border text-[0.95rem]">
              <Fact label="Gregorian">{formatGregorian(next.gregorian, { weekday: true })}</Fact>
              <Fact label="Ethiopian">{formatEthiopian(next.ethiopian)} E.C.</Fact>
              <Fact label="In Amharic"><span className="k-am">{formatEthiopianAmharic(next.ethiopian)}</span></Fact>
            </dl>
          </section>
        )}

        <section aria-label="Quick facts">
          <dl className="divide-y divide-[var(--border)] border-y k-border text-[0.95rem]">
            {prev && (
              <Fact label={`Last ${meta.short}`}>
                <LiveDays target={isoDate(prev.gregorian)} mode="since" initial={sincePhrase(daysSince)} />
                <span className="block k-subtle font-normal text-sm">{formatGregorian(prev.gregorian, { weekday: true })}</span>
              </Fact>
            )}
            {next && (
              <Fact label={`Next ${meta.short}`}>
                <LiveDays target={isoDate(next.gregorian)} initial={untilPhrase(daysUntil)} />
                <span className="block k-subtle font-normal text-sm">{formatGregorian(next.gregorian, { weekday: true })}</span>
              </Fact>
            )}
            {sample && <Fact label="Type">{isFixed ? "Fixed date" : "Movable date"}{isPublic ? " · public holiday" : ""}</Fact>}
            {sample && <Fact label="Tags">{sample.tags.join(", ")}</Fact>}
            <Fact label="Also called">{meta.search.slice(0, 3).join(", ")}</Fact>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/holidays" className="k-btn k-btn-ghost">All holidays</Link>
            <Link href="/today" className="k-btn k-btn-ghost">Today&apos;s date</Link>
          </div>
        </section>
      </div>

      <section aria-labelledby="dates" className="mt-16">
        <h2 id="dates" className="text-2xl font-semibold tracking-[-0.02em]">{meta.short} dates by year</h2>
        <div className="mt-6">
          <HolidayTable
            holidays={history}
            caption={`${meta.short} dates`}
            relative={(h) => {
              const d = dayNumber(h.gregorian) - t;
              return d >= 0 ? untilPhrase(d) : <span className="k-subtle">{sincePhrase(-d)}</span>;
            }}
          />
        </div>
      </section>

      <section aria-labelledby="related" className="mt-16">
        <h2 id="related" className="text-2xl font-semibold tracking-[-0.02em]">Other Ethiopian holidays</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {related.map((h) => (
            <li key={h.slug}>
              <Link href={`/holidays/${h.slug}`} className="inline-flex rounded-lg border k-border px-3 py-1.5 text-sm k-muted hover:border-[var(--accent)] hover:text-[var(--fg)] transition-colors">
                {h.short}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DatePageShell>
  );
}
