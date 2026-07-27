"use client";

import { useEffect, useState } from "react";
import { PRICING, TELEBIRR_NUMBER } from "@/lib/api/pricing.js";

/**
 * Prices are admin-editable and stored in Firestore, but both the marketing page and
 * the console render client-side. Seeding state with the compiled-in defaults means
 * the cards paint immediately at the right size and only the numbers settle, so an
 * edited price never causes a layout jump — and a failed fetch still shows something
 * sensible rather than an empty card.
 */
export function usePricing() {
  const [pricing, setPricing] = useState({
    plans: PRICING,
    telebirrNumber: TELEBIRR_NUMBER,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && !cancelled) setPricing({ ...data, live: true });
      })
      .catch(() => {
        /* defaults already rendered */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return pricing;
}
