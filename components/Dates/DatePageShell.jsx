import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { DateQuickLinks } from "@/components/Dates/DateQuickLinks";
import { SITE_URL, MONTHS_EN, WEEKDAYS_EN, weekdayIndex, isoDate } from "@/lib/ethiopianDates";

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes quotes; "<" is escaped so the data can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function breadcrumbLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: `${SITE_URL}${t.href}`,
    })),
  };
}

export function faqLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Shared frame for the date pages: breadcrumbs, heading, content, FAQ, quick links. */
export function DatePageShell({ trail, eyebrow, title, lede, children, faqs, jsonLd = [] }) {
  const ld = [breadcrumbLd(trail), ...(faqs?.length ? [faqLd(faqs)] : []), ...jsonLd];
  return (
    <div className="k-page min-h-screen overflow-x-clip">
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-12 pb-24 lg:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm k-subtle">
          <ol className="flex flex-wrap items-center gap-1.5">
            {trail.map((t, i) => (
              <li key={t.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < trail.length - 1 ? (
                  <Link href={t.href} className="hover:text-[var(--fg)] transition-colors">{t.label}</Link>
                ) : (
                  <span aria-current="page" className="k-muted">{t.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          {eyebrow && <p className="text-sm font-medium k-accent">{eyebrow}</p>}
          <h1 className="mt-2 text-[2.2rem] sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05]">{title}</h1>
          {lede && <p className="mt-5 text-lg k-muted leading-relaxed max-w-2xl">{lede}</p>}
        </header>

        <div className="mt-12">{children}</div>

        {faqs?.length > 0 && (
          <section aria-labelledby="faq" className="mt-20 max-w-3xl">
            <h2 id="faq" className="text-2xl font-semibold tracking-[-0.02em]">Questions people ask</h2>
            <dl className="mt-6 divide-y divide-[var(--border)] border-y k-border">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-medium">{f.q}</dt>
                  <dd className="mt-2 k-muted leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <DateQuickLinks className="mt-20" />
      </main>
      <SiteFooter />
    </div>
  );
}

/** A labelled stat in a ruled list. */
export function Fact({ label, children }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="k-subtle shrink-0">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

/** Table of holidays with both calendars and an optional relative-day column. */
export function HolidayTable({ holidays, caption, showYear = true, relative }) {
  return (
    <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="text-sm k-subtle">
          <tr className="border-b k-border">
            <th scope="col" className="py-3 pr-4 font-medium">Holiday</th>
            <th scope="col" className="py-3 pr-4 font-medium">Ethiopian date</th>
            <th scope="col" className="py-3 pr-4 font-medium">Gregorian date</th>
            {relative && <th scope="col" className="py-3 font-medium text-right">When</th>}
          </tr>
        </thead>
        <tbody>
          {holidays.map((h) => (
            <tr key={`${h.key}-${h.gregorian.year}-${h.gregorian.month}-${h.gregorian.day}`} className="border-b k-border align-top">
              <td className="py-3 pr-4">
                {h.slug ? (
                  <Link href={`/holidays/${h.slug}`} className="k-link font-medium">{h.short}</Link>
                ) : (
                  <span className="font-medium">{h.name}</span>
                )}
                {h.amharic && <span className="k-am block text-sm k-subtle mt-0.5">{h.amharic}</span>}
              </td>
              <td className="py-3 pr-4 tabular">
                {MONTH(h.ethiopian.month)} {h.ethiopian.day}{showYear ? `, ${h.ethiopian.year}` : ""}
              </td>
              <td className="py-3 pr-4 tabular">
                <Link href={`/date/${iso(h.gregorian)}`} className="hover:text-[var(--accent)] transition-colors">
                  {WEEK(h.gregorian)}, {GMONTH(h.gregorian.month)} {h.gregorian.day}{showYear ? `, ${h.gregorian.year}` : ""}
                </Link>
              </td>
              {relative && <td className="py-3 text-right k-muted whitespace-nowrap">{relative(h)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MONTH = (m) => MONTHS_EN[m - 1];
const GMONTH = (m) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
const WEEK = (g) => WEEKDAYS_EN[weekdayIndex(g)].slice(0, 3);
const iso = isoDate;
