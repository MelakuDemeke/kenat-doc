import { getHolidaysForYear } from "kenat";
import { handler, ok } from "@/lib/api/respond.js";
import { parse, query, EthiopianYear, HolidayQuery } from "@/lib/api/validate.js";
import { cacheForYear } from "@/lib/api/freshness.js";

export const runtime = "edge";

/** GET /api/v1/holidays/2018?tags=public,christian&lang=english */
export const GET = handler(async (req, { params }) => {
  const ethYear = parse(EthiopianYear, (await params).year);
  const { lang, tags } = parse(HolidayQuery, query(req));

  const holidays = getHolidaysForYear(ethYear, { lang, filter: tags });

  return ok(holidays, {
    meta: { year: ethYear, lang, tags, count: holidays.length },
    cache: cacheForYear(ethYear),
  });
});
