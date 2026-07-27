/**
 * Minimal Upstash REST client.
 *
 * Deliberately not the `@upstash/redis` package: this is a few lines of fetch, works
 * unchanged on the edge runtime, and keeps the request path dependency-free — which
 * matters because every API call goes through it.
 */
const URL_ = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const isConfigured = Boolean(URL_ && TOKEN);

/**
 * Runs several commands in one round trip.
 * @param {string[][]} commands e.g. [["INCR","k"],["EXPIRE","k","60"]]
 * @returns {Promise<Array>} one result per command, in order
 */
export async function pipeline(commands) {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    // Counters must never be served from a cache.
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`upstash ${res.status}: ${await res.text()}`);

  const body = await res.json();
  return body.map((entry) => {
    if (entry.error) throw new Error(`upstash command failed: ${entry.error}`);
    return entry.result;
  });
}

/** Single command convenience wrapper. */
export async function command(...args) {
  const [result] = await pipeline([args.map(String)]);
  return result;
}
