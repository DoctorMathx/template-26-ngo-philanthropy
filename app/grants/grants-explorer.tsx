"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Download, Search, X } from "lucide-react";
import type { FocusSlug, Grant } from "@/lib/types";
import { grants, grantCountries, grantYears } from "@/mock/grants";
import { focusAreas } from "@/mock/focus-areas";
import { siteConfig } from "@/lib/site-config";
import { cn, compactNaira, compactUsd, formatNaira, formatUsd } from "@/lib/utils";

const PAGE_SIZE = 10;
const RATE = siteConfig.fx.ngnPerUsd;

const AMOUNT_BANDS = [
  { id: "lt1", label: "Under $1m", min: 0, max: 1_000_000 },
  { id: "1to5", label: "$1m – $5m", min: 1_000_000, max: 5_000_000 },
  { id: "5to10", label: "$5m – $10m", min: 5_000_000, max: 10_000_000 },
  { id: "gt10", label: "$10m and above", min: 10_000_000, max: Infinity },
] as const;

const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "largest", label: "Largest amount" },
  { id: "smallest", label: "Smallest amount" },
  { id: "grantee", label: "Grantee A–Z" },
  { id: "country", label: "Country A–Z" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function GrantsExplorer() {
  const sp = useSearchParams();
  const validFocus = focusAreas.map((f) => f.slug) as string[];
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [focus, setFocus] = useState<string[]>(list(sp.get("focus")).filter((f) => validFocus.includes(f)));
  const [countries, setCountries] = useState<string[]>(list(sp.get("country")).filter((c) => grantCountries.includes(c)));
  const [years, setYears] = useState<number[]>(list(sp.get("year")).map(Number).filter((y) => grantYears.includes(y)));
  const [bands, setBands] = useState<string[]>(list(sp.get("amount")).filter((b) => AMOUNT_BANDS.some((x) => x.id === b)));
  const [sort, setSort] = useState<SortId>((SORTS.find((s) => s.id === sp.get("sort"))?.id ?? "newest") as SortId);
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exported, setExported] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keep the URL shareable without triggering navigation.
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (focus.length) p.set("focus", focus.join(","));
    if (countries.length) p.set("country", countries.join(","));
    if (years.length) p.set("year", years.join(","));
    if (bands.length) p.set("amount", bands.join(","));
    if (sort !== "newest") p.set("sort", sort);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `/grants?${qs}` : "/grants");
  }, [q, focus, countries, years, bands, sort]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = grants.filter((g) => {
      if (needle && ![g.grantee, g.purpose, g.country, g.id, g.region].some((t) => t.toLowerCase().includes(needle))) return false;
      if (focus.length && !focus.includes(g.focus)) return false;
      if (countries.length && !countries.includes(g.country)) return false;
      if (years.length && !years.includes(g.year)) return false;
      if (bands.length && !bands.some((b) => { const band = AMOUNT_BANDS.find((x) => x.id === b)!; return g.amountUsd >= band.min && g.amountUsd < band.max; })) return false;
      return true;
    });
    const sorters: Record<SortId, (a: Grant, b: Grant) => number> = {
      newest: (a, b) => b.year - a.year || b.amountUsd - a.amountUsd,
      largest: (a, b) => b.amountUsd - a.amountUsd,
      smallest: (a, b) => a.amountUsd - b.amountUsd,
      grantee: (a, b) => a.grantee.localeCompare(b.grantee),
      country: (a, b) => a.country.localeCompare(b.country) || b.year - a.year,
    };
    return out.sort(sorters[sort]);
  }, [q, focus, countries, years, bands, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const totalUsd = filtered.reduce((s, g) => s + g.amountUsd, 0);
  const activeCount = focus.length + countries.length + years.length + bands.length + (q ? 1 : 0);

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(1);
  };
  const clearAll = () => {
    setQ("");
    setFocus([]);
    setCountries([]);
    setYears([]);
    setBands([]);
    setPage(1);
  };
  const goPage = (n: number) => {
    setPage(n);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const money = (usd: number) => (currency === "usd" ? formatUsd(usd) : formatNaira(usd * RATE));
  const moneyAlt = (usd: number) => (currency === "usd" ? compactNaira(usd * RATE) : compactUsd(usd));

  const exportCsv = () => {
    const header = ["Grant ID", "Grantee", "Country", "Region", "Focus area", "Type", "Year", "Duration (months)", "Amount (USD)", `Amount (NGN @ ${RATE})`, "Purpose"];
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = filtered.map((g) => [g.id, g.grantee, g.country, g.region, focusAreas.find((f) => f.slug === g.focus)?.name ?? g.focus, g.type, g.year, g.durationMonths, g.amountUsd, g.amountUsd * RATE, g.purpose].map(esc).join(","));
    const csv = "﻿" + [header.map(esc).join(","), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meridian-committed-grants-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(`Downloaded ${filtered.length} ${filtered.length === 1 ? "grant" : "grants"} as CSV.`);
    setTimeout(() => setExported(null), 4000);
  };

  const Filters = (
    <div className="space-y-8">
      <FilterGroup title="Focus area">
        {focusAreas.map((f) => (
          <Check key={f.slug} checked={focus.includes(f.slug)} onChange={() => toggle(focus, f.slug as string, setFocus)} label={<><span className="chip-dot" style={{ background: f.color }} aria-hidden="true" />{f.name}</>} count={grants.filter((g) => g.focus === f.slug).length} />
        ))}
      </FilterGroup>
      <FilterGroup title="Year">
        <div className="grid grid-cols-2 gap-x-3">
          {grantYears.map((y) => <Check key={y} checked={years.includes(y)} onChange={() => toggle(years, y, setYears)} label={String(y)} count={grants.filter((g) => g.year === y).length} />)}
        </div>
      </FilterGroup>
      <FilterGroup title="Amount (US$)">
        {AMOUNT_BANDS.map((b) => <Check key={b.id} checked={bands.includes(b.id)} onChange={() => toggle(bands, b.id as string, setBands)} label={b.label} count={grants.filter((g) => g.amountUsd >= b.min && g.amountUsd < b.max).length} />)}
      </FilterGroup>
      <FilterGroup title="Country">
        <div className="max-h-[280px] overflow-y-auto pr-1 -mr-1">
          {grantCountries.map((c) => <Check key={c} checked={countries.includes(c)} onChange={() => toggle(countries, c, setCountries)} label={c} count={grants.filter((g) => g.country === c).length} />)}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="container-x py-10 md:py-14">
      {/* Search + controls */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-4 items-end">
        <div className="min-w-0">
          <label htmlFor="grant-search" className="label">Search grants</label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="grant-search"
              type="search"
              className="input !pl-11 !min-h-[52px] text-[16px]"
              placeholder="Grantee, purpose, country or grant ID"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px] sm:flex-none">
            <label htmlFor="grant-sort" className="label">Sort by</label>
            <select id="grant-sort" className="input !min-h-[52px] sm:min-w-[190px]" value={sort} onChange={(e) => { setSort(e.target.value as SortId); setPage(1); }}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div role="radiogroup" aria-label="Display currency" className="flex border border-line-strong h-[52px]">
            {(["usd", "ngn"] as const).map((c) => (
              <button key={c} type="button" role="radio" aria-checked={currency === c} onClick={() => setCurrency(c)} className={cn("px-4 text-[14px] font-semibold min-w-[64px]", currency === c ? "bg-navy text-white" : "text-ink-2 hover:bg-paper")}>
                {c === "usd" ? "US$" : "₦"}
              </button>
            ))}
          </div>
          <button type="button" onClick={exportCsv} className="btn btn-outline !min-h-[52px] max-sm:flex-1" disabled={!filtered.length}>
            <Download className="w-4 h-4" aria-hidden="true" /> Export CSV
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{exported ?? ""}</p>
      {exported && <p className="mt-3 text-[13.5px] text-[color:var(--success)] font-semibold" aria-hidden="true">{exported}</p>}

      <div className="mt-8 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
        {/* Filters — desktop */}
        <aside className="hidden lg:block min-w-0" aria-label="Filters">
          <div className="flex items-center justify-between mb-6 border-b-2 border-[color:var(--navy)] pb-3">
            <h2 className="font-semibold text-navy">Filter</h2>
            {activeCount > 0 && <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-cobalt hover:underline min-h-[36px]">Clear all</button>}
          </div>
          {Filters}
        </aside>

        <div ref={resultsRef} className="scroll-mt-28 min-w-0">
          {/* Filters — mobile */}
          <div className="lg:hidden mb-5">
            <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-controls="mobile-filters" className="btn btn-outline w-full justify-between">
              <span>Filters {activeCount > 0 && `(${activeCount})`}</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")} aria-hidden="true" />
            </button>
            <div id="mobile-filters" hidden={!filtersOpen} className="border border-line border-t-0 p-4 sm:p-5">
              {Filters}
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-navy flex-1">Show {filtered.length} grants</button>
                {activeCount > 0 && <button type="button" onClick={clearAll} className="btn btn-outline">Clear</button>}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[color:var(--navy)] pb-3" aria-live="polite">
            <p className="text-navy">
              <strong className="font-serif text-2xl">{filtered.length}</strong> {filtered.length === 1 ? "grant" : "grants"} ·{" "}
              <strong className="font-serif text-2xl">{currency === "usd" ? compactUsd(totalUsd) : compactNaira(totalUsd * RATE)}</strong> committed
            </p>
            <p className="text-[13px] text-muted">
              {filtered.length ? `Showing ${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, filtered.length)}` : "No results"}
            </p>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <ul className="flex flex-wrap gap-2 mt-4" aria-label="Active filters">
              {q && <Chip label={`“${q}”`} onRemove={() => setQ("")} />}
              {focus.map((f) => <Chip key={f} label={focusAreas.find((x) => x.slug === f)?.name ?? f} onRemove={() => toggle(focus, f, setFocus)} />)}
              {years.map((y) => <Chip key={y} label={String(y)} onRemove={() => toggle(years, y, setYears)} />)}
              {bands.map((b) => <Chip key={b} label={AMOUNT_BANDS.find((x) => x.id === b)?.label ?? b} onRemove={() => toggle(bands, b, setBands)} />)}
              {countries.map((c) => <Chip key={c} label={c} onRemove={() => toggle(countries, c, setCountries)} />)}
            </ul>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl text-navy">No grants match these filters.</p>
              <button type="button" onClick={clearAll} className="btn btn-navy mt-6">Clear all filters</button>
            </div>
          ) : (
            <>
              <div className="hidden md:block mt-2 overflow-x-auto">
                <table className="data-table">
                  <caption className="sr-only">Committed grants, page {current} of {pages}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Grantee & purpose</th>
                      <th scope="col">Focus area</th>
                      <th scope="col">Country</th>
                      <th scope="col">Year</th>
                      <th scope="col" className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((g) => (
                      <tr key={g.id}>
                        <td className="max-w-[420px]">
                          <Link href={`/grants/${g.id}`} className="font-semibold text-navy hover:underline underline-offset-4">{g.grantee}</Link>
                          <p className="text-[13px] text-ink-2 mt-1 leading-snug">{g.purpose}</p>
                          <p className="text-[12px] text-muted mt-1">{g.id} · {g.type} · {g.durationMonths} months</p>
                        </td>
                        <td><FocusDot slug={g.focus} /></td>
                        <td className="whitespace-nowrap">{g.country}</td>
                        <td className="tabular">{g.year}</td>
                        <td className="text-right whitespace-nowrap">
                          <span className="font-semibold text-navy tabular">{money(g.amountUsd)}</span>
                          <div className="text-[12px] text-muted tabular">≈ {moneyAlt(g.amountUsd)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="md:hidden">
                {pageItems.map((g) => (
                  <li key={g.id} className="border-b border-line py-5">
                    <div className="flex justify-between gap-4">
                      <Link href={`/grants/${g.id}`} className="min-w-0 break-words font-semibold text-navy hover:underline underline-offset-4">{g.grantee}</Link>
                      <span className="font-semibold text-navy tabular whitespace-nowrap">{currency === "usd" ? compactUsd(g.amountUsd) : compactNaira(g.amountUsd * RATE)}</span>
                    </div>
                    <p className="text-[13.5px] text-ink-2 mt-1">{g.purpose}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-muted"><FocusDot slug={g.focus} /> <span>{g.country}</span> <span>{g.year}</span> <span>{g.durationMonths} months</span></div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {pages > 1 && (
                <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2 sm:gap-4">
                  <button type="button" onClick={() => goPage(current - 1)} disabled={current === 1} className="btn btn-outline btn-sm"><ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous</button>
                  <p className="sm:hidden text-[13.5px] text-muted tabular">Page {current} of {pages}</p>
                  <ul className="hidden sm:flex flex-wrap justify-center gap-1">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <li key={n}>
                        <button type="button" onClick={() => goPage(n)} aria-current={n === current ? "page" : undefined} aria-label={`Page ${n}`} className={cn("w-11 h-11 text-[14px] font-semibold", n === current ? "bg-navy text-white" : "text-ink-2 hover:bg-paper")}>{n}</button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => goPage(current + 1)} disabled={current === pages} className="btn btn-outline btn-sm">Next <ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
                </nav>
              )}
            </>
          )}
          <p className="mt-8 text-[12.5px] text-muted">Naira equivalents use a fixed reporting rate of ₦{RATE.toLocaleString("en-NG")} per US$ ({siteConfig.fx.asOf}). Grants are listed in the year committed; multi-year grants are paid in instalments.</p>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted mb-2">{title}</legend>
      {children}
    </fieldset>
  );
}

function Check({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: React.ReactNode; count: number }) {
  return (
    <label className="flex items-center gap-3 min-h-[40px] cursor-pointer text-[14px] text-ink-2 hover:text-navy">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-[18px] h-[18px] accent-[color:var(--cobalt)] shrink-0" />
      <span className="flex items-center gap-2 flex-1">{label}</span>
      <span className="text-[12px] text-muted tabular">{count}</span>
    </label>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <li>
      <button type="button" onClick={onRemove} className="inline-flex items-center gap-1.5 bg-paper border border-line px-3 min-h-[36px] text-[13px] font-semibold text-navy hover:border-[color:var(--navy)]" aria-label={`Remove filter ${label}`}>
        {label} <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </li>
  );
}

function FocusDot({ slug }: { slug: FocusSlug }) {
  const f = focusAreas.find((x) => x.slug === slug);
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 whitespace-nowrap">
      <span className="chip-dot" style={{ background: f?.color }} aria-hidden="true" />
      {f?.short}
    </span>
  );
}
