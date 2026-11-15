import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bahire Hasab Calculator: Ethiopian Fasts and Feasts",
  description:
    "Calculate Bahire Hasab for any Ethiopian year: the Evangelist of the year, the start of Nineveh and the dates of Lent, Fasika and every other movable feast.",
  path: "/tools/bahire-hasab",
  keywords: ["Bahire Hasab", "ባሕረ ሐሳብ", "Ethiopian fasting calendar", "Fasika date", "Ethiopian Lent", "Ethiopian movable feasts"],
});

export default function BahireHasabLayout({ children }) {
  return children;
}
