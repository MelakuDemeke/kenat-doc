import { pageMetadata } from "@/lib/seo";

// Metadata for the /tools index (a client page). Each tool's own layout overrides it.
export const metadata = pageMetadata({
  title: "Free Ethiopian Calendar Tools",
  description:
    "Free online Ethiopian calendar tools: Ethiopian ↔ Gregorian date converter, Ethiopian time converter, month calendar, holiday browser and Bahire Hasab calculator.",
  path: "/tools",
});

export default function ToolsLayout({ children }) {
  return children;
}
