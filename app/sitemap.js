import fs from "node:fs";
import path from "node:path";
import { SITE_URL, HOLIDAYS, YEARS, nowInEthiopia, toGC, addDaysGregorian, isoDate, daysInEthiopianMonth } from "@/lib/ethiopianDates";

/** MDX docs and blog posts, found by walking the app directory at build time. */
function contentRoutes(dir) {
  const root = path.join(process.cwd(), "app", dir);
  const out = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/^page\.(mdx|jsx?|tsx?)$/.test(entry.name)) {
        out.push("/" + path.relative(path.join(process.cwd(), "app"), d).split(path.sep).join("/"));
      }
    }
  };
  try {
    walk(root);
  } catch {
    /* directory missing: nothing to add */
  }
  return out;
}

export default function sitemap() {
  const now = new Date();
  const { ethiopian: e } = nowInEthiopia(now);
  const entry = (route, changeFrequency, priority) => ({ url: `${SITE_URL}${route}`, lastModified: now, changeFrequency, priority });

  const core = [
    entry("/", "weekly", 1),
    entry("/today", "daily", 0.95),
    entry("/holidays", "daily", 0.95),
    entry("/calendar", "monthly", 0.9),
    entry("/tools", "monthly", 0.8),
    ...["date-converter", "time-converter", "month-grid", "bahire-hasab", "holiday-browser"].map((t) => entry(`/tools/${t}`, "monthly", 0.8)),
    entry("/app", "monthly", 0.7),
    entry("/blog", "weekly", 0.6),
    entry("/privacy", "yearly", 0.2),
  ];

  const holidays = HOLIDAYS.map((h) => entry(`/holidays/${h.slug}`, "daily", 0.9));
  const years = YEARS.flatMap((y) => [
    entry(`/holidays/${y}`, "yearly", Math.abs(y - e.year) <= 1 ? 0.85 : 0.6),
    entry(`/calendar/${y}`, "yearly", Math.abs(y - e.year) <= 1 ? 0.85 : 0.6),
  ]);

  // Every day of the current Ethiopian year as a date page.
  const start = toGC(e.year, 1, 1);
  const length = 360 + daysInEthiopianMonth(e.year, 13);
  const days = Array.from({ length }, (_, i) => entry(`/date/${isoDate(addDaysGregorian(start, i))}`, "yearly", 0.4));

  const content = [...contentRoutes("doc"), ...contentRoutes("blog")]
    .filter((r) => r !== "/blog")
    .map((r) => entry(r, "monthly", r.startsWith("/doc") ? 0.7 : 0.5));

  return [...core, ...holidays, ...years, ...content, ...days];
}
