"use client";

import { useState } from "react";
import Link from "next/link";
import { funds } from "@/mock/funds";
import { cn, compactNaira, formatNaira } from "@/lib/utils";

const PRESETS = [10_000, 50_000, 250_000, 1_000_000];

export function MatchCalculator() {
  const [amount, setAmount] = useState(50_000);
  const [raw, setRaw] = useState("50000");
  const [fundSlug, setFundSlug] = useState(funds[0].slug);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const fund = funds.find((f) => f.slug === fundSlug)!;
  const remaining = Math.max(0, fund.matchCapNaira - fund.matchedNaira);
  const annual = frequency === "monthly" ? amount * 12 : amount;
  const matched = Math.min(annual, remaining);
  const total = annual + matched;
  const valid = amount >= 1000;
  const youPct = total ? (annual / total) * 100 : 50;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10">
      <div className="space-y-6">
        <div>
          <label htmlFor="mc-fund" className="label">Pooled fund</label>
          <select id="mc-fund" className="input" value={fundSlug} onChange={(e) => setFundSlug(e.target.value)}>
            {funds.map((f) => <option key={f.slug} value={f.slug}>{f.name}</option>)}
          </select>
          <p className="mt-1.5 text-[12.5px] text-muted">{compactNaira(remaining)} of matching left this year.</p>
        </div>
        <div>
          <span className="label" id="mc-amount-label">Your gift</span>
          <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="mc-amount-label">
            {PRESETS.map((p) => (
              <button key={p} type="button" aria-pressed={amount === p} onClick={() => { setAmount(p); setRaw(String(p)); }} className={cn("min-h-[48px] border text-[14px] font-semibold", amount === p ? "bg-navy text-white border-[color:var(--navy)]" : "border-line-strong text-navy hover:border-[color:var(--navy)]")}>
                {compactNaira(p)}
              </button>
            ))}
          </div>
          <label htmlFor="mc-custom" className="sr-only">Custom amount in naira</label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted font-semibold">₦</span>
            <input id="mc-custom" inputMode="numeric" className="input !pl-8" value={raw} onChange={(e) => { const d = e.target.value.replace(/[^\d]/g, "").slice(0, 10); setRaw(d); setAmount(d ? parseInt(d, 10) : 0); }} aria-describedby={!valid ? "mc-err" : undefined} aria-invalid={!valid || undefined} />
          </div>
          {!valid && <p id="mc-err" className="field-error">Minimum gift is ₦1,000.</p>}
        </div>
        <div role="radiogroup" aria-label="Frequency" className="flex border border-line-strong w-fit">
          {(["one-time", "monthly"] as const).map((f) => (
            <button key={f} type="button" role="radio" aria-checked={frequency === f} onClick={() => setFrequency(f)} className={cn("px-5 min-h-[44px] text-[14px] font-semibold", frequency === f ? "bg-navy text-white" : "text-ink-2")}>
              {f === "one-time" ? "One-time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-paper p-6 md:p-8" aria-live="polite">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{frequency === "monthly" ? "Over 12 months" : "Your gift, doubled"}</p>
        <div className="mt-4 flex h-14 w-full" aria-hidden="true">
          <span className="h-full bg-navy flex items-center px-3 text-white text-[13px] font-semibold overflow-hidden" style={{ width: `${youPct}%` }}>You</span>
          <span className="h-full flex items-center px-3 text-navy text-[13px] font-semibold overflow-hidden" style={{ width: `${100 - youPct}%`, background: "var(--coral)" }}>Matched</span>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 [&>div]:min-w-0">
          <div><dt className="text-[12.5px] text-muted">You give</dt><dd className="font-serif text-xl sm:text-2xl text-navy tabular">{valid ? compactNaira(annual) : "—"}</dd></div>
          <div><dt className="text-[12.5px] text-muted">We match</dt><dd className="font-serif text-xl sm:text-2xl text-coral tabular">{valid ? compactNaira(matched) : "—"}</dd></div>
          <div><dt className="text-[12.5px] text-muted">Total granted</dt><dd className="font-serif text-xl sm:text-2xl text-navy tabular">{valid ? compactNaira(total) : "—"}</dd></div>
        </dl>
        {matched < annual && valid && <p className="mt-3 text-[13px] text-coral font-semibold">This gift exceeds the remaining match for {fund.name}; the excess is still granted in full.</p>}
        <p className="mt-4 text-[14px] text-ink-2">100% goes to grants: the foundation pays all its own costs. Your receipt will show {valid ? formatNaira(annual) : "your gift"} given and {valid ? formatNaira(matched) : "the amount"} matched.</p>
        <Link
          href={valid ? `/donate?amount=${amount}&frequency=${frequency}&designation=fund:${fund.slug}` : "#mc-custom"}
          className="btn btn-primary btn-lg w-full mt-6"
        >
          Give {valid ? formatNaira(amount) : ""}{frequency === "monthly" ? "/month" : ""} to this fund
        </Link>
      </div>
    </div>
  );
}
