/**
 * Server-side Ethiopian calendar data for the SEO pages (today, holidays,
 * year calendars, single-date pages). Everything is computed with kenat and
 * pinned to Addis Ababa time so "today" means today in Ethiopia.
 */
import { toEC, toGC, toGeez, monthNames, getHoliday, getHolidaysForYear } from "kenat";

export const SITE_URL = "https://kenat.et";
export const ET_TZ = "Africa/Addis_Ababa";

/** Years we pre-render holiday and calendar pages for. */
export const FIRST_YEAR = 2010;
export const LAST_YEAR = 2030;
export const YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);

export const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const WEEKDAYS_AM = ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"];
export const MONTHS_EN = monthNames.english;
export const MONTHS_AM = monthNames.amharic;
const GREG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Holiday catalogue: URL slug, the names people search for, and a short
 * plain-English answer used in titles, intros and FAQ structured data.
 */
export const HOLIDAYS = [
  { key: "enkutatash", slug: "enkutatash", short: "Enkutatash", alias: "Ethiopian New Year", search: ["Ethiopian New Year", "Enkutatash", "Meskerem 1", "Addis Amet"] },
  { key: "meskel", slug: "meskel", short: "Meskel", alias: "Finding of the True Cross", search: ["Meskel", "Demera", "Finding of the True Cross"] },
  { key: "beherbehereseb", slug: "nations-nationalities-day", short: "Nations, Nationalities and Peoples' Day", alias: "Nations, Nationalities and Peoples' Day", search: ["Nations Nationalities and Peoples Day", "Behereseboch Day"] },
  { key: "gena", slug: "genna", short: "Genna", alias: "Ethiopian Christmas", search: ["Ethiopian Christmas", "Genna", "Gena", "Lidet"] },
  { key: "timket", slug: "timket", short: "Timket", alias: "Ethiopian Epiphany", search: ["Timket", "Timkat", "Ethiopian Epiphany"] },
  { key: "martyrsDay", slug: "martyrs-day", short: "Martyrs' Day", alias: "Yekatit 12", search: ["Martyrs Day Ethiopia", "Yekatit 12"] },
  { key: "nineveh", slug: "nineveh", short: "Fast of Nineveh", alias: "Tsome Nenewe", search: ["Fast of Nineveh", "Tsome Nenewe", "Nenewe"] },
  { key: "adwa", slug: "adwa", short: "Adwa Victory Day", alias: "Victory of Adwa", search: ["Adwa Victory Day", "Battle of Adwa anniversary", "Adwa"] },
  { key: "abiyTsome", slug: "abiy-tsome", short: "Abiy Tsome", alias: "Ethiopian Great Lent", search: ["Abiy Tsome", "Hudade", "Ethiopian Lent", "Great Lent"] },
  { key: "eidFitr", slug: "eid-al-fitr", short: "Eid al-Fitr", alias: "Eid al-Fitr in Ethiopia", search: ["Eid al-Fitr Ethiopia", "Eid Fitr", "Ramadan end"] },
  { key: "debreZeit", slug: "debre-zeit", short: "Debre Zeit", alias: "Mid-Lent Sunday", search: ["Debre Zeit", "Mid-Lent"] },
  { key: "hosanna", slug: "hosanna", short: "Hosanna", alias: "Ethiopian Palm Sunday", search: ["Hosanna", "Hosaena", "Palm Sunday Ethiopia"] },
  { key: "siklet", slug: "siklet", short: "Siklet", alias: "Ethiopian Good Friday", search: ["Siklet", "Ethiopian Good Friday"] },
  { key: "labour", slug: "labour-day", short: "Labour Day", alias: "International Labour Day", search: ["Labour Day Ethiopia", "May Day Ethiopia"] },
  { key: "fasika", slug: "fasika", short: "Fasika", alias: "Ethiopian Easter", search: ["Ethiopian Easter", "Fasika", "Orthodox Easter Ethiopia"] },
  { key: "patriots", slug: "patriots-day", short: "Patriots' Victory Day", alias: "Arbegnoch Day", search: ["Patriots Victory Day", "Arbegnoch Qen"] },
  { key: "eidAdha", slug: "eid-al-adha", short: "Eid al-Adha", alias: "Arafa", search: ["Eid al-Adha Ethiopia", "Arafa", "Eid Adha"] },
  { key: "rikbeKahnat", slug: "rikbe-kahnat", short: "Rikbe Kahnat", alias: "Meeting of the Priests", search: ["Rikbe Kahnat"] },
  { key: "erget", slug: "erget", short: "Erget", alias: "Ethiopian Ascension", search: ["Erget", "Ascension Ethiopia"] },
  { key: "paraclete", slug: "paraclete", short: "Paraclete", alias: "Ethiopian Pentecost", search: ["Paraclete", "Pentecost Ethiopia", "Peraklitos"] },
  { key: "tsomeHawaryat", slug: "tsome-hawaryat", short: "Tsome Hawaryat", alias: "Apostles' Fast", search: ["Tsome Hawaryat", "Apostles Fast"] },
  { key: "tsomeDihnet", slug: "tsome-dihnet", short: "Tsome Dihnet", alias: "Fast of Salvation", search: ["Tsome Dihnet", "Wednesday Friday fast"] },
  { key: "moulid", slug: "moulid", short: "Mawlid", alias: "Birth of the Prophet", search: ["Mawlid Ethiopia", "Moulid", "Mawlid an-Nabi"] },
];
export const HOLIDAY_BY_SLUG = Object.fromEntries(HOLIDAYS.map((h) => [h.slug, h]));
export const HOLIDAY_BY_KEY = Object.fromEntries(HOLIDAYS.map((h) => [h.key, h]));

/** The headline holidays shown in quick-link lists. */
export const MAJOR_SLUGS = ["enkutatash", "meskel", "genna", "timket", "adwa", "fasika", "eid-al-fitr", "eid-al-adha"];

/* ---------- dates ---------- */

/** Days since the epoch for a Gregorian {year, month, day}; safe for subtraction. */
export function dayNumber({ year, month, day }) {
  return Math.round(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function weekdayIndex(g) {
  return new Date(Date.UTC(g.year, g.month - 1, g.day)).getUTCDay();
}

export function addDaysGregorian(g, n) {
  const d = new Date(Date.UTC(g.year, g.month - 1, g.day + n));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

export function isoDate(g) {
  return `${g.year}-${String(g.month).padStart(2, "0")}-${String(g.day).padStart(2, "0")}`;
}

export function parseIsoDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "");
  if (!m) return null;
  const g = { year: +m[1], month: +m[2], day: +m[3] };
  const d = new Date(Date.UTC(g.year, g.month - 1, g.day));
  if (d.getUTCMonth() + 1 !== g.month || d.getUTCDate() !== g.day) return null;
  if (g.year < 1900 || g.year > 2100) return null;
  return g;
}

export function formatGregorian(g, { weekday = false } = {}) {
  const base = `${GREG_MONTHS[g.month - 1]} ${g.day}, ${g.year}`;
  return weekday ? `${WEEKDAYS_EN[weekdayIndex(g)]}, ${base}` : base;
}

export function formatEthiopian(e) {
  return `${MONTHS_EN[e.month - 1]} ${e.day}, ${e.year}`;
}

export function formatEthiopianAmharic(e) {
  return `${MONTHS_AM[e.month - 1]} ${e.day} ቀን ${e.year} ዓ.ም.`;
}

export function formatEthiopianGeez(e) {
  return `${MONTHS_AM[e.month - 1]} ${toGeez(e.day)} ${toGeez(e.year)}`;
}

export function daysInEthiopianMonth(year, month) {
  if (month < 13) return 30;
  return (year + 1) % 4 === 0 ? 6 : 5;
}

/** The current date and time in Ethiopia (Addis Ababa), whatever the server's timezone. */
export function nowInEthiopia(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ET_TZ,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  const gregorian = { year: +parts.year, month: +parts.month, day: +parts.day };
  return { gregorian, ethiopian: toEC(gregorian.year, gregorian.month, gregorian.day), hour: +parts.hour % 24, minute: +parts.minute };
}

/** Traditional Ethiopian clock reading (hours counted from 6 a.m. / 6 p.m.). */
export function ethiopianClock(hour, minute) {
  const h = ((hour + 6) % 12) || 12;
  return `${h}:${String(minute).padStart(2, "0")}`;
}

/* ---------- holidays ---------- */

function decorate(h, amharicByKey) {
  const g = h.gregorian ?? toGC(h.ethiopian.year, h.ethiopian.month, h.ethiopian.day);
  const meta = HOLIDAY_BY_KEY[h.key];
  return { ...h, gregorian: g, amharic: amharicByKey[h.key], slug: meta?.slug, short: meta?.short ?? h.name, alias: meta?.alias };
}

const yearCache = new Map();

/**
 * All holidays in an Ethiopian year with both calendars filled in. kenat's
 * getHolidaysForYear throws for a few years (a Bahire Hasab edge case), so we
 * fall back to asking for each holiday on its own and skipping any that fail.
 */
export function holidaysForYear(year) {
  if (yearCache.has(year)) return yearCache.get(year);
  let en, am;
  try {
    en = getHolidaysForYear(year, { lang: "english" });
    am = getHolidaysForYear(year, { lang: "amharic" });
  } catch {
    en = [];
    am = [];
    for (const { key } of HOLIDAYS) {
      try {
        const e = getHoliday(key, year, { lang: "english" });
        const a = getHoliday(key, year, { lang: "amharic" });
        if (e) en.push(e);
        if (a) am.push(a);
      } catch {
        /* skip a holiday kenat cannot compute for this year */
      }
    }
  }
  const amharicByKey = Object.fromEntries(am.map((h) => [h.key, h.name]));
  const list = en
    .map((h) => decorate(h, amharicByKey))
    .sort((a, b) => dayNumber(a.gregorian) - dayNumber(b.gregorian));
  yearCache.set(year, list);
  return list;
}

/** Every occurrence of one holiday across a range of Ethiopian years, oldest first. */
export function occurrences(key, fromYear, toYear) {
  const out = [];
  for (let y = fromYear; y <= toYear; y++) out.push(...holidaysForYear(y).filter((h) => h.key === key));
  return out;
}

/** The previous and next occurrence of a holiday relative to `today` (Gregorian). */
export function holidayAround(key, today) {
  const etYear = toEC(today.year, today.month, today.day).year;
  const list = occurrences(key, etYear - 2, etYear + 2);
  const t = dayNumber(today);
  const next = list.find((h) => dayNumber(h.gregorian) >= t) ?? null;
  const prev = [...list].reverse().find((h) => dayNumber(h.gregorian) < t) ?? null;
  return {
    next,
    prev,
    daysUntil: next ? dayNumber(next.gregorian) - t : null,
    daysSince: prev ? t - dayNumber(prev.gregorian) : null,
  };
}

/** Upcoming holidays from `today`, across the year boundary. */
export function upcomingHolidays(today, count = 6) {
  const etYear = toEC(today.year, today.month, today.day).year;
  const t = dayNumber(today);
  return [...holidaysForYear(etYear), ...holidaysForYear(etYear + 1)]
    .filter((h) => dayNumber(h.gregorian) >= t)
    .slice(0, count)
    .map((h) => ({ ...h, daysUntil: dayNumber(h.gregorian) - t }));
}

export function holidaysOnDate(g) {
  const e = toEC(g.year, g.month, g.day);
  const t = dayNumber(g);
  return holidaysForYear(e.year).filter((h) => dayNumber(h.gregorian) === t);
}

/** Human phrase for a day count: "today", "tomorrow", "in 12 days". */
export function untilPhrase(days) {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

export function sincePhrase(days) {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

/** Gregorian years an Ethiopian year spans, e.g. 2019 → "2026/27". */
export function gregorianSpan(etYear) {
  const start = toGC(etYear, 1, 1).year;
  return `${start}/${String(start + 1).slice(2)}`;
}

/* ---------- year calendar ---------- */

export function yearMonths(year) {
  return MONTHS_EN.map((name, i) => {
    const month = i + 1;
    const days = daysInEthiopianMonth(year, month);
    const start = toGC(year, month, 1);
    const end = toGC(year, month, days);
    return { month, name, amharic: MONTHS_AM[i], days, start, end, firstWeekday: weekdayIndex(start) };
  });
}

export { toEC, toGC, toGeez };
