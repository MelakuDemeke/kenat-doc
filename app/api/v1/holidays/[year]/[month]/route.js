import { getHolidaysInMonth } from "kenat";
import { handler, ok } from "@/lib/api/respond.js";
import { parse, query, EthiopianYear, EthiopianMonth, HolidayQuery } from "@/lib/api/validate.js";
import { cacheForYear } from "@/lib/api/freshness.js";

export const runtime = "edge";

/** GET /api/v1/holidays/2018/11?tags=public — month is 1-13 (Pagume is 13). */
export const GET = handler(async (req, { params }) => {
  const { year, month } = await params;
  const ethYear = parse(EthiopianYear, year);
  const ethMonth = parse(EthiopianMonth, month);
  const { lang, tags } = parse(HolidayQuery, query(req));

  const holidays = getHolidaysInMonth(ethYear, ethMonth, { lang, filter: tags });

  return ok(holidays, {
    meta: { year: ethYear, month: ethMonth, lang, tags, count: holidays.length },
    cache: cacheForYear(ethYear),
  });
});
