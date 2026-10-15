import Link from "next/link";

/**
 * Crawlable quick answers for the date questions people search for. Kept
 * year-agnostic (no hooks, no dates) so it renders the same on the server,
 * in client pages and in every year.
 */
export const DATE_QUICK_LINKS = [
  {
    heading: "Today",
    links: [
      { label: "Today's Ethiopian date", href: "/today" },
      { label: "What time is it in Ethiopia?", href: "/today#time" },
      { label: "What year is it in Ethiopia?", href: "/today#year" },
      { label: "Ethiopian calendar this year", href: "/calendar" },
    ],
  },
  {
    heading: "Holidays",
    links: [
      { label: "All Ethiopian holidays", href: "/holidays" },
      { label: "Enkutatash (New Year)", href: "/holidays/enkutatash" },
      { label: "Meskel", href: "/holidays/meskel" },
      { label: "Genna (Christmas)", href: "/holidays/genna" },
      { label: "Timket (Epiphany)", href: "/holidays/timket" },
      { label: "Fasika (Easter)", href: "/holidays/fasika" },
    ],
  },
  {
    heading: "More holidays",
    links: [
      { label: "Adwa Victory Day", href: "/holidays/adwa" },
      { label: "Abiy Tsome (Lent)", href: "/holidays/abiy-tsome" },
      { label: "Eid al-Fitr", href: "/holidays/eid-al-fitr" },
      { label: "Eid al-Adha", href: "/holidays/eid-al-adha" },
      { label: "Mawlid", href: "/holidays/moulid" },
      { label: "Patriots' Victory Day", href: "/holidays/patriots-day" },
    ],
  },
  {
    heading: "Convert",
    links: [
      { label: "Ethiopian ↔ Gregorian converter", href: "/tools/date-converter" },
      { label: "Ethiopian time converter", href: "/tools/time-converter" },
      { label: "Ethiopian month calendar", href: "/tools/month-grid" },
      { label: "Bahire Hasab (fasts & feasts)", href: "/tools/bahire-hasab" },
    ],
  },
];

export function DateQuickLinks({ className = "" }) {
  return (
    <section aria-labelledby="date-quick-links" className={className}>
      <h2 id="date-quick-links" className="text-2xl font-semibold tracking-[-0.02em]">Ethiopian calendar quick links</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t k-border pt-6">
        {DATE_QUICK_LINKS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h3 className="text-sm font-semibold">{group.heading}</h3>
            <ul className="mt-3 space-y-2.5">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.95rem] k-muted hover:text-[var(--fg)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </section>
  );
}
