import { DOCS_BASE } from "@/lib/site.js";

/**
 * Stable, documented error codes. These are part of the public API contract —
 * renaming one is a breaking change, so add new codes rather than repurposing.
 */
export const ErrorCodes = {
  INVALID_REQUEST: { status: 400, message: "The request parameters are invalid." },
  INVALID_DATE: { status: 400, message: "The supplied date is not a valid calendar date." },
  BULK_LIMIT_EXCEEDED: { status: 400, message: "Too many items in a single bulk request." },
  MISSING_API_KEY: { status: 401, message: "No API key was supplied in the Authorization header." },
  INVALID_API_KEY: { status: 401, message: "The supplied API key is not valid." },
  PLAN_REQUIRED: { status: 403, message: "This endpoint is not available on your current plan." },
  NOT_FOUND: { status: 404, message: "No such endpoint." },
  RATE_LIMITED: { status: 429, message: "Rate limit exceeded. Slow down or upgrade your plan." },
  // 402 rather than 429: the month's allowance is gone, so retrying will not help —
  // the caller needs to upgrade or wait for the next billing period.
  QUOTA_EXCEEDED: { status: 402, message: "Monthly request quota exhausted." },
  INTERNAL: { status: 500, message: "Something went wrong on our end." },
};

const ERRORS_DOC = `${DOCS_BASE}/api/errors`;

export class ApiError extends Error {
  constructor(code, message) {
    const spec = ErrorCodes[code] ?? ErrorCodes.INTERNAL;
    super(message ?? spec.message);
    this.name = "ApiError";
    this.code = ErrorCodes[code] ? code : "INTERNAL";
    this.status = spec.status;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        docs: `${ERRORS_DOC}#${this.code.toLowerCase()}`,
      },
    };
  }
}

/**
 * kenat throws its own typed errors (InvalidEthiopianDateError etc). Map anything
 * that looks like a date-validation failure onto INVALID_DATE so callers get a
 * 400 with a useful message instead of an opaque 500.
 */
export function fromKenatError(err) {
  if (err instanceof ApiError) return err;
  const name = err?.name ?? "";
  if (/Invalid(Ethiopian|Gregorian)DateError|InvalidInputTypeError|InvalidDateFormatError/.test(name)) {
    return new ApiError("INVALID_DATE", err.message);
  }
  return new ApiError("INTERNAL");
}
