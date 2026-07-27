import { toEC } from "kenat";
import { handler, ok, Cache } from "@/lib/api/respond.js";
import { parse, query, GregorianInput } from "@/lib/api/validate.js";

export const runtime = "edge";

/** GET /api/v1/convert/to-ethiopian?date=2026-07-27 */
export const GET = handler(async (req) => {
  const { year, month, day } = parse(GregorianInput, query(req));
  const ethiopian = toEC(year, month, day);

  return ok(
    { gregorian: { year, month, day }, ethiopian },
    { meta: { calendar: "ethiopian" }, cache: Cache.IMMUTABLE }
  );
});
