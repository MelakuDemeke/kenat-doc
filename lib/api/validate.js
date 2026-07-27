import { z } from "zod";
import { ApiError } from "./errors.js";

/**
 * Supported range. kenat's conversion is reliable well beyond this, but pinning a
 * range keeps error messages honest and stops absurd input from reaching the core.
 */
const EC_YEAR = z.coerce.number().int().min(1).max(9999);
const GC_YEAR = z.coerce.number().int().min(8).max(9999);

export const Lang = z.enum(["amharic", "english"]).default("amharic");

export const HOLIDAY_TAGS = ["public", "religious", "christian", "muslim", "state", "cultural", "other"];

/** `?tags=public,christian` -> ["public","christian"] */
export const TagFilter = z
  .string()
  .optional()
  .transform((v) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : null))
  .refine((tags) => tags === null || tags.every((t) => HOLIDAY_TAGS.includes(t)), {
    message: `tags must be a comma-separated list of: ${HOLIDAY_TAGS.join(", ")}`,
  });

/** Accepts either `?date=YYYY-MM-DD` or discrete `?year=&month=&day=`. */
const isoDate = z.string().regex(/^\d{1,4}-\d{1,2}-\d{1,2}$/, "date must be in YYYY-MM-DD form");

function splitParts(schema) {
  return z
    .object({ date: isoDate.optional(), year: schema.optional(), month: z.coerce.number().int().min(1).max(13).optional(), day: z.coerce.number().int().min(1).max(31).optional() })
    .transform((v, ctx) => {
      if (v.date) {
        const [year, month, day] = v.date.split("-").map(Number);
        return { year, month, day };
      }
      if (v.year === undefined || v.month === undefined || v.day === undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Supply either `date=YYYY-MM-DD` or all of `year`, `month`, `day`." });
        return z.NEVER;
      }
      return { year: v.year, month: v.month, day: v.day };
    });
}

export const GregorianInput = splitParts(GC_YEAR).refine((d) => d.month <= 12, {
  message: "Gregorian month must be between 1 and 12.",
});
export const EthiopianInput = splitParts(EC_YEAR);

export const EthiopianYear = EC_YEAR;
export const EthiopianMonth = z.coerce.number().int().min(1).max(13);

/** Shared query shape for every holiday endpoint. */
export const HolidayQuery = z.object({ lang: Lang, tags: TagFilter });

/** `?calendar=` selects which calendar an input date is expressed in. */
export const CalendarChoice = z.enum(["ethiopian", "gregorian"]).default("ethiopian");

export const BULK_LIMIT = 1000;

/** Parses a Zod schema, converting failures into a 400 with the first useful message. */
export function parse(schema, input) {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  const issue = result.error.issues[0];
  const path = issue.path.length ? `${issue.path.join(".")}: ` : "";
  throw new ApiError("INVALID_REQUEST", `${path}${issue.message}`);
}

/** Turns a URL's search params into a plain object for schema parsing. */
export function query(req) {
  return Object.fromEntries(new URL(req.url).searchParams);
}
