import { z } from "zod";
import { toEC, toGC } from "kenat";
import { handler, ok, Cache } from "@/lib/api/respond.js";
import { parse, BULK_LIMIT } from "@/lib/api/validate.js";
import { caller } from "@/lib/api/context.js";
import { requirePlan } from "@/lib/api/auth.js";
import { ApiError, fromKenatError } from "@/lib/api/errors.js";

export const runtime = "edge";

const BulkBody = z.object({
  direction: z.enum(["to-ethiopian", "to-gregorian"]),
  dates: z
    .array(z.string().regex(/^\d{1,4}-\d{1,2}-\d{1,2}$/, "each date must be YYYY-MM-DD"))
    .min(1, "dates must not be empty")
    .max(BULK_LIMIT, `a bulk request accepts at most ${BULK_LIMIT} dates`),
});

/**
 * POST /api/v1/convert/bulk
 * Body: { "direction": "to-ethiopian", "dates": ["2026-07-27", ...] }
 *
 * One bad date does not fail the batch — each item carries its own result or error
 * so a caller converting a spreadsheet gets partial success instead of nothing.
 */
export const POST = handler(async (req) => {
  const { plan } = caller(req);
  requirePlan(plan, "bulk");

  let body;
  try {
    body = await req.json();
  } catch {
    throw new ApiError("INVALID_REQUEST", "Request body must be valid JSON.");
  }

  const { direction, dates } = parse(BulkBody, body);
  const convert = direction === "to-ethiopian" ? toEC : toGC;

  const results = dates.map((input) => {
    const [year, month, day] = input.split("-").map(Number);
    try {
      return { input, ok: true, result: convert(year, month, day) };
    } catch (err) {
      const apiError = fromKenatError(err);
      return { input, ok: false, error: { code: apiError.code, message: apiError.message } };
    }
  });

  return ok(
    { direction, results },
    {
      meta: { count: results.length, failed: results.filter((r) => !r.ok).length },
      cache: Cache.NONE,
    }
  );
});
