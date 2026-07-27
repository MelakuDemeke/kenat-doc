"use client";

import { usePathname } from "next/navigation";
import { Search } from "nextra/components";

/**
 * Documentation search is only meaningful on documentation pages — the index is
 * built from /doc content, so offering it on the landing page, tools, blog or the
 * API console returns nothing useful and just adds noise to the navbar.
 */
export function ConditionalSearch() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/doc")) return null;
  return <Search />;
}
