"use client";
import { EtDatetime } from "kenat";

export function EthiopianYearBadge() {
  return <>{new EtDatetime().year}</>;
}
