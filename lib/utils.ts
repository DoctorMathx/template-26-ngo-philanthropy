import { siteConfig } from "./site-config";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNaira(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

export function formatUsd(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function compactUsd(value: number) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")}bn`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return formatUsd(value);
}

export function compactNaira(value: number) {
  if (value >= 1_000_000_000_000) return `₦${(value / 1_000_000_000_000).toFixed(2).replace(/\.?0+$/, "")}tn`;
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}bn`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}k`;
  return formatNaira(value);
}

export const usdToNgn = (usd: number) => usd * siteConfig.fx.ngnPerUsd;

export function formatNumber(value: number, digits = 0) {
  return value.toLocaleString("en-NG", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

export function percent(part: number, whole: number) {
  if (!whole) return 0;
  return Math.min(100, Math.round((part / whole) * 100));
}

// Fixed "today" so static builds are deterministic; update when you refresh the mock data.
export const TODAY = new Date("2026-11-02T09:00:00+01:00");

export function daysLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - TODAY.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(iso).toLocaleDateString("en-GB", opts);
}

export const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function parsePositiveInt(v: string | null | undefined) {
  if (!v) return null;
  if (!/^\d+$/.test(v.trim())) return null;
  const n = parseInt(v, 10);
  return n > 0 && Number.isSafeInteger(n) ? n : null;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => /^\+?[\d\s()-]{7,}$/.test(v.trim());
