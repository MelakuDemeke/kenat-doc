import { z } from "zod";
import { getHolidaysInMonth, toEC, toGC } from "kenat";
import { handler, ok } from "@/lib/api/respond.js";
import { parse, query, Lang, TagFilter, CalendarChoice } from "@/lib/api/validate.js";
import { cacheForYear } from "@/lib/api/freshness.js";

export const runtime = "edge";

/**
 * A static segment, so Next resolves this before the `[year]` route — `is-holiday`
 * is never mistaken for a year.
 */
const IsHolidayQuery = z.object({
  date: z.string().regex(/^\d{1,4}-\d{1,2}-\d{1,2}$/, "date must be in YYYY-MM-DD form"),
  calendar: CalendarChoice,
  lang: Lang,
  tags: TagFilter,
});

/**
 * GET /api/v1/holidays/is-holiday?date=2018-01-01&calendar=ethiopian
 *
 * The highest-volume endpoint in practice — payroll and scheduling systems call it
 * per-date — so it answers with a boolean plus the matching holidays, and caches.
 */
export const GET = handler(async (req) => {
  const { date, calendar, lang, tags } = parse(IsHolidayQuery, query(req));
  const [y, m, d] = date.split("-").map(Number);

  const ethiopian = calendar === "gregorian" ? toEC(y, m, d) : { year: y, month: m, day: d };
  // Round-trip through toGC so an out-of-range Ethiopian date is rejected here
  // rather than silently returning an empty holiday list.
  const gregorian = calendar === "gregorian" ? { year: y, month: m, day: d } : toGC(ethiopian.year, ethiopian.month, ethiopian.day);

  const matches = getHolidaysInMonth(ethiopian.year, ethiopian.month, { lang, filter: tags }).filter(
    (h) => h.ethiopian.day === ethiopian.day
  );

  return ok(
    { isHoliday: matches.length > 0, ethiopian, gregorian, holidays: matches },
    { meta: { lang, tags }, cache: cacheForYear(ethiopian.year) }
  );
});
