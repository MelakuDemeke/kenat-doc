import { toEC } from "kenat";
import { Cache } from "./respond.js";

/** Today's date in the Ethiopian calendar, computed from the server clock. */
export function currentEthiopianYear() {
  const now = new Date();
  return toEC(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()).year;
}

/**
 * Past years are settled history and can be cached indefinitely. The current and
 * future years cannot: Eid al-Fitr and Eid al-Adha depend on the official Ethiopian
 * moon-sighting announcement, and the government occasionally declares one-off
 * holidays. Those get a short TTL so a correction propagates the same day.
 */
export function cacheForYear(ethYear, now = currentEthiopianYear()) {
  return ethYear < now ? Cache.IMMUTABLE : Cache.HOUR;
}
