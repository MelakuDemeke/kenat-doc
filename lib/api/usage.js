import { isConfigured, pipeline } from "./redis.js";

/** Billing periods are calendar months in UTC, matching the quota reset. */
export function period(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** The previous N periods, newest first — used for the usage history table. */
export function recentPeriods(count = 6, from = new Date()) {
  return Array.from({ length: count }, (_, i) =>
    period(new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() - i, 1)))
  );
}

/**
 * Reads request counts for the given keys straight from the counters the middleware
 * increments, so the dashboard and the enforcement path can never disagree.
 *
 * @param {string[]} keyIds
 * @param {string[]} periods
 * @returns {Promise<Record<string, Record<string, number>>>} keyId -> period -> count
 */
export async function usageFor(keyIds, periods = [period()]) {
  const empty = Object.fromEntries(
    keyIds.map((id) => [id, Object.fromEntries(periods.map((p) => [p, 0]))])
  );
  if (!isConfigured || keyIds.length === 0) return empty;

  const pairs = keyIds.flatMap((id) => periods.map((p) => ({ id, p })));
  const counts = await pipeline(pairs.map(({ id, p }) => ["GET", `usage:${id}:${p}`]));

  pairs.forEach(({ id, p }, i) => {
    empty[id][p] = Number(counts[i] ?? 0);
  });
  return empty;
}

/** Sums a usage map into a single total per period. */
export function totalsByPeriod(usage, periods) {
  return Object.fromEntries(
    periods.map((p) => [p, Object.values(usage).reduce((sum, byPeriod) => sum + (byPeriod[p] ?? 0), 0)])
  );
}
