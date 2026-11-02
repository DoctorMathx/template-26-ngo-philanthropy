"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Check, Copy, CreditCard, Hash, Info, Lock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, formatNaira, isEmail, isPhone, parsePositiveInt } from "@/lib/utils";
import { shortCode } from "@/lib/hash";
import { designationGroups, designationLabel, isValidDesignation, matchedFundFor } from "@/lib/designations";
import { getCampaign } from "@/mock/campaigns";
import { getFund } from "@/mock/funds";

type Frequency = "one-time" | "monthly" | "annual";
type Method = "card" | "bank" | "ussd";

const D = siteConfig.donation;
const FREQ_SUFFIX: Record<Frequency, string> = { "one-time": "", monthly: "/month", annual: "/year" };

export function DonateClient() {
  const sp = useSearchParams();
  const router = useRouter();

  // ---- Prefill from query params ----
  const qAmount = parsePositiveInt(sp.get("amount"));
  const qFreq = sp.get("frequency");
  const qCampaign = sp.get("campaign");
  const qFund = sp.get("fund");
  const qProgramme = sp.get("programme");
  const qDesignation = sp.get("designation");
  const initialDesignation = isValidDesignation(qDesignation)
    ? qDesignation
    : qCampaign && getCampaign(qCampaign)
      ? `campaign:${qCampaign}`
      : qFund && getFund(qFund)
        ? `fund:${qFund}`
        : qProgramme && isValidDesignation(`programme:${qProgramme}`)
          ? `programme:${qProgramme}`
          : "general";

  const presetAmounts = D.presets.map((p) => p.amount) as number[];
  const [frequency, setFrequency] = useState<Frequency>(qFreq === "monthly" || qFreq === "annual" || qFreq === "one-time" ? qFreq : "one-time");
  const [amount, setAmount] = useState<number | null>(qAmount ?? 50000);
  const [custom, setCustom] = useState(qAmount && !presetAmounts.includes(qAmount) ? String(qAmount) : "");
  const [designation, setDesignation] = useState(initialDesignation);
  const [coverFees, setCoverFees] = useState(true);
  const [tribute, setTribute] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeNotify, setTributeNotify] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [onBehalf, setOnBehalf] = useState<"individual" | "company">("individual");
  const [company, setCompany] = useState("");
  const [donor, setDonor] = useState({ first: "", last: "", email: "", phone: "", updates: true });
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [bankConfirmed, setBankConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fund = matchedFundFor(designation);
  const fee = amount && coverFees ? Math.ceil(amount * D.feeRate) : 0;
  const total = (amount ?? 0) + fee;
  const matchRemaining = fund ? Math.max(0, fund.matchCapNaira - fund.matchedNaira) : 0;
  const matched = fund && amount ? Math.min(amount, matchRemaining) : 0;
  const reference = donor.email && amount ? `MF-${shortCode(`${donor.email}|${amount}|${frequency}`)}` : "MF-XXXXXX";
  const ussdCode = D.ussd.code.replace("*000*", `*${total || "AMOUNT"}*`);
  const presetImpact = D.presets.find((p) => p.amount === amount)?.impact;

  const onCustom = (v: string) => {
    setCustom(v);
    const cleaned = v.replace(/[,\s₦]/g, "");
    if (!cleaned) return setAmount(null);
    setAmount(/^\d+$/.test(cleaned) && parseInt(cleaned, 10) > 0 ? parseInt(cleaned, 10) : null);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be unavailable; still show feedback */
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!amount) e.amount = custom ? "Amount must be a positive whole number of naira." : "Choose or enter an amount.";
    else if (amount < D.minAmount) e.amount = `The minimum gift is ${formatNaira(D.minAmount)}.`;
    else if (amount > 500_000_000) e.amount = "For gifts above ₦500m please contact our partnerships team.";
    if (onBehalf === "company" && !company.trim()) e.company = "Enter the company name for the receipt.";
    if (!donor.first.trim()) e.first = "First name is required.";
    if (!donor.last.trim()) e.last = "Last name is required.";
    if (!isEmail(donor.email)) e.email = "Enter a valid email for your receipt.";
    if (donor.phone && !isPhone(donor.phone)) e.phone = "Enter a valid phone number.";
    if (tribute && !tributeName.trim()) e.tributeName = "Who is this gift dedicated to?";
    if (tributeNotify && !isEmail(tributeNotify)) e.tributeNotify = "Enter a valid email or leave blank.";
    if (method === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (!card.name.trim()) e.cardName = "Name on card is required.";
      if (!/^\d{16,19}$/.test(digits)) e.cardNumber = "Enter a valid 16–19 digit card number.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m || +m[1] < 1 || +m[1] > 12) e.cardExpiry = "Use MM/YY.";
      else if (new Date(2000 + +m[2], +m[1], 0) < new Date()) e.cardExpiry = "This card has expired.";
      if (!/^\d{3,4}$/.test(card.cvc)) e.cardCvc = "3 or 4 digits.";
    }
    if (method === "bank" && !bankConfirmed) e.bank = "Please confirm you’ll use the reference above.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>(`[data-field="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    const ref = `MF-${shortCode(`${donor.email}|${total}|${Date.now()}`, 8)}`;
    const p = new URLSearchParams({
      ref,
      amount: String(total),
      gift: String(amount),
      fee: String(fee),
      matched: String(matched),
      frequency,
      designation,
      method,
      name: anonymous ? "Anonymous" : donor.first.trim(),
    });
    if (onBehalf === "company") p.set("company", company.trim().slice(0, 60));
    if (tribute) {
      p.set("tribute", tributeType);
      p.set("tributeName", tributeName.trim());
    }
    setTimeout(() => router.push(`/donate/thank-you?${p.toString()}`), 600);
  };

  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="field-error">{errors[k]}</p> : null);
  const aria = (k: string) => ({ "data-field": k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <section className="bg-paper py-10 md:py-14">
      <form noValidate onSubmit={submit} className="container-x grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 items-start">
        <div className="space-y-6">
          {/* Amount */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Gift amount and frequency</legend>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="hd-3 text-navy">1. Your gift</h2>
              <div className="inline-flex border border-line-strong" role="radiogroup" aria-label="Frequency">
                {D.frequencies.map((f) => (
                  <button key={f.id} type="button" role="radio" aria-checked={frequency === f.id} onClick={() => setFrequency(f.id as Frequency)} className={cn("px-4 min-h-[44px] text-[14px] font-semibold transition-colors", frequency === f.id ? "bg-navy text-white" : "text-ink-2 hover:bg-paper")}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {frequency !== "one-time" && (
              <p className="mt-3 text-[13.5px] text-cobalt font-medium">{frequency === "monthly" ? "Monthly" : "Annual"} gifts give partners predictable funding. Change or cancel any time.</p>
            )}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Preset amounts">
              {D.presets.map((p) => {
                const active = amount === p.amount && !custom;
                return (
                  <button key={p.amount} type="button" aria-pressed={active} onClick={() => { setAmount(p.amount); setCustom(""); }} className={cn("border px-4 py-3 text-left min-h-[60px] transition-colors", active ? "border-[color:var(--navy)] bg-navy text-white" : "border-line-strong bg-white hover:border-[color:var(--navy)]")}>
                    <span className="font-serif text-xl tabular">{formatNaira(p.amount)}</span>
                    <span className={cn("text-[12px] ml-1", active ? "text-sky" : "text-muted")}>{FREQ_SUFFIX[frequency]}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <label htmlFor="custom-amount" className="label">Other amount (₦)</label>
              <div className="relative max-w-xs">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-muted">₦</span>
                <input id="custom-amount" inputMode="numeric" className="input !pl-8" placeholder="e.g. 75000" value={custom} onChange={(e) => onCustom(e.target.value)} {...aria("amount")} />
              </div>
              {err("amount")}
            </div>
            <div className="mt-5 border-l-4 border-[color:var(--cobalt)] bg-paper p-4 text-[14.5px] text-ink-2" aria-live="polite">
              {amount ? (
                presetImpact ? <><strong className="text-navy">{formatNaira(amount)}</strong> {presetImpact}.</> : <><strong className="text-navy">{formatNaira(amount)}</strong> protects about <strong>{Math.max(1, Math.floor(amount / 5000))}</strong> people with insecticide-treated bed nets for three years.</>
              ) : "Choose an amount to see what it makes possible."}
            </div>
          </fieldset>

          {/* Designation */}
          <fieldset className="card p-6 md:p-8 space-y-5">
            <legend className="sr-only">Designation and options</legend>
            <h2 className="hd-3 text-navy">2. Where should it go?</h2>
            <div>
              <label htmlFor="designation" className="label">Designation</label>
              <select id="designation" className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                {designationGroups.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
              <p className="text-[12.5px] text-muted mt-1.5 flex gap-1.5"><Info className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />Gifts to pooled funds and appeals are matched 1:1 and carry zero overhead. Restricted gifts are spent only on the purpose you choose.</p>
            </div>
            {fund && (
              <div className="bg-[#FFF4EF] border border-[#F6CDB3] p-4 text-[14px] text-navy">
                <strong>Matched by the foundation:</strong> {fund.name} has {formatNaira(matchRemaining)} of matching left this year.{amount ? <> Your {formatNaira(amount)} becomes <strong>{formatNaira(amount + matched)}</strong>.</> : null}
              </div>
            )}
            <Check2 id="fees" checked={coverFees} onChange={setCoverFees} label={<>Cover the {(D.feeRate * 100).toFixed(1)}% processing fee{amount ? <> (+{formatNaira(Math.ceil(amount * D.feeRate))})</> : null} so 100% of my gift is granted</>} />
            <Check2 id="anon" checked={anonymous} onChange={setAnonymous} label="Give anonymously — don’t list my name in the annual report" />
            <Check2 id="tribute" checked={tribute} onChange={setTribute} label="Dedicate this gift in honour or memory of someone" />
            {tribute && (
              <div className="grid sm:grid-cols-2 gap-4 sm:pl-8">
                <div className="sm:col-span-2 inline-flex border border-line-strong w-fit" role="radiogroup" aria-label="Tribute type">
                  {(["honour", "memory"] as const).map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={tributeType === t} onClick={() => setTributeType(t)} className={cn("px-4 min-h-[44px] text-[14px] font-semibold", tributeType === t ? "bg-navy text-white" : "text-ink-2")}>In {t} of</button>
                  ))}
                </div>
                <div>
                  <label htmlFor="tributeName" className="label">Their name *</label>
                  <input id="tributeName" className="input" value={tributeName} onChange={(e) => setTributeName(e.target.value)} {...aria("tributeName")} />
                  {err("tributeName")}
                </div>
                <div>
                  <label htmlFor="tributeNotify" className="label">Notify someone (email, optional)</label>
                  <input id="tributeNotify" type="email" className="input" value={tributeNotify} onChange={(e) => setTributeNotify(e.target.value)} {...aria("tributeNotify")} />
                  {err("tributeNotify")}
                </div>
              </div>
            )}
          </fieldset>

          {/* Donor */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Your details</legend>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="hd-3 text-navy">3. Your details</h2>
              <div className="inline-flex border border-line-strong" role="radiogroup" aria-label="Giving as">
                {(["individual", "company"] as const).map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={onBehalf === t} onClick={() => setOnBehalf(t)} className={cn("px-4 min-h-[44px] text-[14px] font-semibold capitalize", onBehalf === t ? "bg-navy text-white" : "text-ink-2 hover:bg-paper")}>{t === "individual" ? "Individual" : "Company"}</button>
                ))}
              </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {onBehalf === "company" && (
                <div className="sm:col-span-2"><Field id="company" label="Company name (for the receipt) *" value={company} onChange={setCompany} aria={aria("company")} err={err("company")} autoComplete="organization" /></div>
              )}
              <Field id="first" label="First name *" value={donor.first} onChange={(v) => setDonor({ ...donor, first: v })} aria={aria("first")} err={err("first")} autoComplete="given-name" />
              <Field id="last" label="Last name *" value={donor.last} onChange={(v) => setDonor({ ...donor, last: v })} aria={aria("last")} err={err("last")} autoComplete="family-name" />
              <Field id="email" type="email" label="Email (for your receipt) *" value={donor.email} onChange={(v) => setDonor({ ...donor, email: v })} aria={aria("email")} err={err("email")} autoComplete="email" />
              <Field id="phone" type="tel" label="Phone / WhatsApp" value={donor.phone} onChange={(v) => setDonor({ ...donor, phone: v })} aria={aria("phone")} err={err("phone")} autoComplete="tel" placeholder="+234…" />
            </div>
            <div className="mt-4">
              <Check2 id="updates" checked={donor.updates} onChange={(v) => setDonor({ ...donor, updates: v })} label="Send me quarterly results from the fund I support and the annual Progress Report" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Payment method</legend>
            <h2 className="hd-3 text-navy">4. Payment</h2>
            <div className="mt-5 grid grid-cols-3 gap-2" role="tablist" aria-label="Payment method">
              {([
                { id: "card", label: "Card", icon: CreditCard },
                { id: "bank", label: "Bank transfer", icon: Building2 },
                { id: "ussd", label: "USSD", icon: Hash },
              ] as const).map((m) => (
                <button key={m.id} type="button" role="tab" id={`tab-${m.id}`} aria-selected={method === m.id} aria-controls={`panel-${m.id}`} onClick={() => setMethod(m.id)} className={cn("flex flex-col sm:flex-row items-center justify-center gap-2 border min-h-[56px] px-2 text-[14px] font-semibold transition-colors", method === m.id ? "border-[color:var(--navy)] bg-navy text-white" : "border-line-strong hover:border-[color:var(--navy)] text-navy")}>
                  <m.icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div id="panel-card" role="tabpanel" aria-labelledby="tab-card" className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><Field id="cardName" label="Name on card *" value={card.name} onChange={(v) => setCard({ ...card, name: v })} aria={aria("cardName")} err={err("cardName")} autoComplete="cc-name" /></div>
                <div className="sm:col-span-2">
                  <Field id="cardNumber" label="Card number *" inputMode="numeric" value={card.number} onChange={(v) => setCard({ ...card, number: v.replace(/[^\d]/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })} aria={aria("cardNumber")} err={err("cardNumber")} autoComplete="cc-number" placeholder="5399 0000 0000 0000" />
                </div>
                <Field id="cardExpiry" label="Expiry (MM/YY) *" inputMode="numeric" value={card.expiry} onChange={(v) => { const d = v.replace(/[^\d]/g, "").slice(0, 4); setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }); }} aria={aria("cardExpiry")} err={err("cardExpiry")} autoComplete="cc-exp" placeholder="08/29" />
                <Field id="cardCvc" label="CVC *" inputMode="numeric" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/[^\d]/g, "").slice(0, 4) })} aria={aria("cardCvc")} err={err("cardCvc")} autoComplete="cc-csc" placeholder="123" />
                <p className="sm:col-span-2 text-[12.5px] text-muted flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" aria-hidden="true" /> Demo template — no card is charged. Verve, Mastercard & Visa accepted.</p>
              </div>
            )}

            {method === "bank" && (
              <div id="panel-bank" role="tabpanel" aria-labelledby="tab-bank" className="mt-6">
                <div className="bg-navy on-dark p-5 md:p-6 space-y-3">
                  {[
                    { k: "Bank", v: D.bank.bankName },
                    { k: "Account name", v: D.bank.accountName },
                    { k: "Account number", v: D.bank.accountNumber, copy: true },
                    { k: "Amount", v: total ? formatNaira(total) : "—" },
                    { k: "Reference", v: reference, copy: reference !== "MF-XXXXXX" },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between gap-3 text-[14.5px]">
                      <span className="text-on-dark-muted">{r.k}</span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-white tabular text-right">{r.v}</span>
                        {r.copy && (
                          <button type="button" onClick={() => copy(r.v, r.k)} className="w-11 h-11 -my-2 flex items-center justify-center text-sky hover:bg-white/10" aria-label={`Copy ${r.k.toLowerCase()}`}>
                            {copied === r.k ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                          </button>
                        )}
                      </span>
                    </div>
                  ))}
                  <p className="text-[12.5px] text-on-dark-muted pt-3 border-t border-dark" aria-live="polite">
                    {copied ? "Copied to clipboard." : reference === "MF-XXXXXX" ? "Enter your email above to generate your unique reference." : "Use this reference so we can match your transfer and send your receipt."}
                  </p>
                </div>
                <p className="mt-3 text-[13px] text-muted">International donors: {D.bank.usdAccount}.</p>
                <div className="mt-4">
                  <Check2 id="bank" checked={bankConfirmed} onChange={setBankConfirmed} label="I’ll make the transfer using the reference above" />
                  {err("bank")}
                </div>
              </div>
            )}

            {method === "ussd" && (
              <div id="panel-ussd" role="tabpanel" aria-labelledby="tab-ussd" className="mt-6 bg-navy on-dark p-6 text-center">
                <div className="text-[13px] text-on-dark-muted">{D.ussd.label} — dial</div>
                <div className="mt-2 font-serif text-2xl sm:text-3xl text-white tracking-wide break-all">{ussdCode}</div>
                <button type="button" onClick={() => copy(ussdCode, "ussd")} className="btn btn-ghost-light btn-sm mt-4">
                  {copied === "ussd" ? <><Check className="w-4 h-4" aria-hidden="true" /> Copied</> : <><Copy className="w-4 h-4" aria-hidden="true" /> Copy code</>}
                </button>
                <p className="mt-4 text-[12.5px] text-on-dark-muted max-w-md mx-auto">{D.ussd.hint}. Use reference <strong className="text-white">{reference}</strong> when prompted.</p>
              </div>
            )}
          </fieldset>
        </div>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-white border border-line border-t-4 border-t-[color:var(--navy)] p-6 md:p-7" aria-live="polite">
            <p className="eyebrow">Summary</p>
            <dl className="mt-5 space-y-3 text-[14.5px]">
              <Row k="Gift" v={amount ? `${formatNaira(amount)}${FREQ_SUFFIX[frequency]}` : "—"} />
              <Row k="Frequency" v={D.frequencies.find((f) => f.id === frequency)!.label} />
              <Row k="Designation" v={designationLabel(designation)} />
              {coverFees && amount ? <Row k="Processing fee" v={`+${formatNaira(fee)}`} /> : null}
              {tribute && tributeName && <Row k={`In ${tributeType} of`} v={tributeName} />}
              {onBehalf === "company" && company && <Row k="Company" v={company} />}
              {anonymous && <Row k="Visibility" v="Anonymous" />}
            </dl>
            <div className="mt-5 pt-5 border-t border-line flex items-baseline justify-between">
              <span className="font-semibold text-navy">You pay {frequency !== "one-time" && <span className="text-muted font-normal">{FREQ_SUFFIX[frequency]}</span>}</span>
              <span className="font-serif text-4xl text-navy tabular">{total ? formatNaira(total) : "₦0"}</span>
            </div>
            {fund && amount ? (
              <div className="mt-4 bg-[#FFF4EF] p-4">
                <div className="flex h-3" aria-hidden="true">
                  <span className="bg-navy h-full" style={{ width: `${(amount / (amount + matched)) * 100}%` }} />
                  <span className="h-full" style={{ width: `${(matched / (amount + matched)) * 100}%`, background: "var(--coral)" }} />
                </div>
                <p className="mt-2 text-[13.5px] text-navy">+ <strong>{formatNaira(matched)}</strong> matched by the foundation → <strong>{formatNaira(amount + matched)}</strong> granted{frequency !== "one-time" ? FREQ_SUFFIX[frequency] : ""}.</p>
              </div>
            ) : null}
            <button type="submit" className="btn btn-primary btn-lg w-full mt-6" disabled={submitting}>
              {submitting ? "Processing…" : method === "card" ? <>Donate {total ? formatNaira(total) : ""} <Lock className="w-4 h-4" aria-hidden="true" /></> : "Confirm my gift"}
            </button>
            {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-[13px] text-[color:var(--danger)] font-medium">Please fix {Object.keys(errors).length} highlighted {Object.keys(errors).length === 1 ? "field" : "fields"}.</p>}
            <p className="mt-4 text-[12px] text-muted leading-relaxed">{D.receiptNote}</p>
          </div>
          <div className="card p-5 text-[13.5px] text-ink-2">
            Giving ₦10m or more, or on behalf of a company? <Link href="/partnerships#enquire" className="link font-semibold">Talk to our partnerships team</Link> about co-funding packages.
          </div>
        </aside>
      </form>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted shrink-0">{k}</dt>
      <dd className="text-navy text-right font-medium">{v}</dd>
    </div>
  );
}

function Check2({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label htmlFor={`cb-${id}`} className="flex items-start gap-3 text-[14.5px] text-ink-2 cursor-pointer min-h-[44px]">
      <input id={`cb-${id}`} data-field={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 w-5 h-5 accent-[color:var(--cobalt)] shrink-0" />
      <span>{label}</span>
    </label>
  );
}

function Field({ id, label, value, onChange, type = "text", aria, err, autoComplete, placeholder, inputMode }: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string; aria: Record<string, unknown>; err: React.ReactNode; autoComplete?: string; placeholder?: string; inputMode?: "numeric" | "text" }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} type={type} className="input" value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} inputMode={inputMode} {...aria} />
      {err}
    </div>
  );
}
