import { toGC } from "kenat";
import { handler, ok, Cache } from "@/lib/api/respond.js";
import { parse, query, EthiopianInput } from "@/lib/api/validate.js";

export const runtime = "edge";

/** GET /api/v1/convert/to-gregorian?year=2018&month=11&day=20 */
export const GET = handler(async (req) => {
  const { year, month, day } = parse(EthiopianInput, query(req));
  const gregorian = toGC(year, month, day);

  return ok(
    { ethiopian: { year, month, day }, gregorian },
    { meta: { calendar: "gregorian" }, cache: Cache.IMMUTABLE }
  );
});
