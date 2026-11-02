"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { opportunities } from "@/mock/opportunities";
import { focusAreas } from "@/mock/focus-areas";
import { cn, compactUsd, formatUsd, isEmail, isPhone } from "@/lib/utils";
import { shortCode } from "@/lib/hash";

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "Ethiopia", "Uganda", "Tanzania", "Rwanda", "Senegal", "Sierra Leone", "Niger", "Cameroon", "Malawi", "Mozambique", "Zambia", "South Africa", "Other African country"];
const ORG_TYPES = ["Registered non-profit / NGO", "University or research institute", "Social enterprise", "Community-based organisation", "Government agency (via technical partner)"];
const BUDGETS = ["Under $200k", "$200k – $1m", "$1m – $5m", "Over $5m"];

type V = {
  call: string;
  focus: string;
  orgName: string;
  orgType: string;
  regNo: string;
  country: string;
  website: string;
  annualBudget: string;
  title: string;
  amount: string;
  months: string;
  summary: string;
  outcomes: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  safeguarding: boolean;
  accurate: boolean;
};

const STEPS = ["Opportunity", "Organisation", "Proposal", "Contact & submit"] as const;

export function LoiForm() {
  const sp = useSearchParams();
  const qCall = opportunities.find((o) => o.slug === sp.get("call") && o.status === "Open");
  const [step, setStep] = useState(0);
  const [v, setV] = useState<V>({
    call: qCall?.slug ?? "",
    focus: qCall?.focus ?? "",
    orgName: "",
    orgType: "",
    regNo: "",
    country: "",
    website: "",
    annualBudget: "",
    title: "",
    amount: "",
    months: "",
    summary: "",
    outcomes: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    safeguarding: false,
    accurate: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // If the user clicks "Submit an LOI for this call" while on the page, follow the new ?call= value.
  const spCall = sp.get("call");
  const [lastSpCall, setLastSpCall] = useState(spCall);
  if (spCall !== lastSpCall) {
    setLastSpCall(spCall);
    const c = opportunities.find((o) => o.slug === spCall && o.status === "Open");
    if (c) {
      setV((prev) => ({ ...prev, call: c.slug, focus: c.focus }));
      setStep(0);
    }
  }
  const [done, setDone] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const call = opportunities.find((o) => o.slug === v.call);
  const set = <K extends keyof V>(k: K, val: V[K]) => {
    const next = { ...v, [k]: val };
    if (k === "call") {
      const c = opportunities.find((o) => o.slug === val);
      if (c) next.focus = c.focus;
    }
    setV(next);
    if (errors[k as string]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!v.focus) e.focus = "Choose the focus area your work fits best.";
    }
    if (s === 1) {
      if (v.orgName.trim().length < 3) e.orgName = "Enter your organisation’s legal name.";
      if (!v.orgType) e.orgType = "Choose an organisation type.";
      if (!/^[A-Z]{2,5}[/\s-]?[A-Z0-9/\s-]{3,}$/i.test(v.regNo.trim())) e.regNo = "Enter a registration number, e.g. CAC/IT/NO 123456 or RC 1234567.";
      if (!v.country) e.country = "Choose a country.";
      if (v.website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v.website.trim())) e.website = "Enter a valid web address.";
      if (!v.annualBudget) e.annualBudget = "Choose your annual budget range.";
    }
    if (s === 2) {
      if (v.title.trim().length < 8) e.title = "Give your project a short descriptive title.";
      const amt = parseInt(v.amount.replace(/[,\s$]/g, ""), 10);
      if (!/^\d+$/.test(v.amount.replace(/[,\s$]/g, "")) || !amt) e.amount = "Enter the amount requested in US dollars (whole number).";
      else if (call && (amt < call.budgetMinUsd || amt > call.budgetMaxUsd)) e.amount = `This call funds ${formatUsd(call.budgetMinUsd)} – ${formatUsd(call.budgetMaxUsd)}.`;
      else if (!call && (amt < 25_000 || amt > 10_000_000)) e.amount = "General LOIs: $25,000 – $10,000,000.";
      const m = parseInt(v.months, 10);
      if (!/^\d+$/.test(v.months) || m < 6 || m > 60) e.months = "Duration must be 6–60 months.";
      if (v.summary.trim().length < 150) e.summary = `Summarise the problem and your approach in at least 150 characters (${v.summary.trim().length} so far).`;
      if (v.summary.length > 1500) e.summary = "Please keep the summary under 1,500 characters.";
      if (v.outcomes.trim().length < 40) e.outcomes = "Describe at least one measurable outcome.";
    }
    if (s === 3) {
      if (!v.name.trim()) e.name = "Enter the contact person’s name.";
      if (!v.role.trim()) e.role = "Enter their role.";
      if (!isEmail(v.email)) e.email = "Enter a valid email address.";
      if (v.phone && !isPhone(v.phone)) e.phone = "Enter a valid phone number.";
      if (!v.safeguarding) e.safeguarding = "Please confirm you have a safeguarding policy (or will adopt one before signature).";
      if (!v.accurate) e.accurate = "Please confirm the information is accurate.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    const first = Object.keys(e).find((k) => e[k]);
    if (first) {
      document.getElementById(`loi-${first}`)?.focus();
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      document.getElementById("loi")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setSending(true);
      setTimeout(() => {
        setDone(`LOI-${new Date().getFullYear()}-${shortCode(`${v.email}|${v.orgName}|${v.title}`)}`);
        setSending(false);
      }, 800);
    }
  };

  if (done) {
    return (
      <div role="status" aria-live="polite" className="py-6">
        <CheckCircle2 className="w-11 h-11 text-[color:var(--success)]" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="hd-2 text-navy mt-4">Letter of inquiry received</h3>
        <p className="lede mt-3">Thank you, {v.name.split(" ")[0]}. Your reference is <strong className="text-navy font-mono">{done}</strong>.</p>
        <dl className="mt-6 border-t border-line text-[14.5px] max-w-xl">
          {[
            ["Organisation", v.orgName],
            ["Opportunity", call?.title ?? "General letter of inquiry"],
            ["Focus area", focusAreas.find((f) => f.slug === v.focus)?.name ?? ""],
            ["Requested", `${formatUsd(parseInt(v.amount.replace(/[,\s$]/g, ""), 10))} over ${v.months} months`],
          ].map(([k, val]) => (
            <div key={k} className="flex justify-between gap-6 py-3 border-b border-line"><dt className="text-muted">{k}</dt><dd className="text-navy font-medium text-right">{val}</dd></div>
          ))}
        </dl>
        <p className="mt-6 text-ink-2 max-w-xl">A programme officer will review your LOI within 4–6 weeks{call ? ` of the ${new Date(call.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long" })} deadline` : ""}. We’ll email {v.email} at every stage — including if we decide not to proceed, with reasons.</p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => { setDone(null); setStep(0); }}>Submit another LOI</button>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? <p id={`loi-${k}-err`} className="field-error">{errors[k]}</p> : null);
  const a = (k: string) => ({ id: `loi-${k}`, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `loi-${k}-err` : undefined });

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
      {/* Stepper */}
      <ol className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-8" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1", i <= step ? "bg-[color:var(--cobalt)]" : "bg-paper-2")} aria-hidden="true" />
            <span className={cn("block mt-2 text-[11px] sm:text-[12px] leading-tight font-semibold break-words", i === step ? "text-navy" : "text-muted")}>
              <span className="sr-only">Step {i + 1} of {STEPS.length}: </span>{s}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="space-y-5">
          <legend className="hd-3 text-navy mb-2">Which opportunity are you applying to?</legend>
          <div>
            <label htmlFor="loi-call" className="label">Open call</label>
            <select {...a("call")} className="input" value={v.call} onChange={(e) => set("call", e.target.value)}>
              <option value="">General letter of inquiry (no specific call)</option>
              {opportunities.filter((o) => o.status === "Open").map((o) => <option key={o.slug} value={o.slug}>{o.title}</option>)}
            </select>
            {call && <p className="mt-2 text-[13px] text-ink-2 bg-paper p-3">Budget {compactUsd(call.budgetMinUsd)}–{compactUsd(call.budgetMaxUsd)} · {call.duration} · {call.geography} · Deadline {new Date(call.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>}
          </div>
          <div>
            <label htmlFor="loi-focus" className="label">Focus area *</label>
            <select {...a("focus")} className="input" value={v.focus} onChange={(e) => set("focus", e.target.value)} disabled={!!call}>
              <option value="">Select…</option>
              {focusAreas.map((f) => <option key={f.slug} value={f.slug}>{f.name}</option>)}
            </select>
            {call && <p className="mt-1.5 text-[12.5px] text-muted">Set by the call you selected.</p>}
            {err("focus")}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="grid sm:grid-cols-2 gap-5">
          <legend className="hd-3 text-navy mb-2 sm:col-span-2">About your organisation</legend>
          <div className="sm:col-span-2"><label htmlFor="loi-orgName" className="label">Organisation legal name *</label><input {...a("orgName")} className="input" value={v.orgName} onChange={(e) => set("orgName", e.target.value)} autoComplete="organization" />{err("orgName")}</div>
          <div><label htmlFor="loi-orgType" className="label">Organisation type *</label><select {...a("orgType")} className="input" value={v.orgType} onChange={(e) => set("orgType", e.target.value)}><option value="">Select…</option>{ORG_TYPES.map((t) => <option key={t}>{t}</option>)}</select>{err("orgType")}</div>
          <div><label htmlFor="loi-regNo" className="label">Registration number *</label><input {...a("regNo")} className="input" placeholder="CAC/IT/NO 123456" value={v.regNo} onChange={(e) => set("regNo", e.target.value)} />{err("regNo")}</div>
          <div><label htmlFor="loi-country" className="label">Country of registration *</label><select {...a("country")} className="input" value={v.country} onChange={(e) => set("country", e.target.value)}><option value="">Select…</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select>{err("country")}</div>
          <div><label htmlFor="loi-annualBudget" className="label">Annual budget (last FY) *</label><select {...a("annualBudget")} className="input" value={v.annualBudget} onChange={(e) => set("annualBudget", e.target.value)}><option value="">Select…</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>{err("annualBudget")}</div>
          <div className="sm:col-span-2"><label htmlFor="loi-website" className="label">Website</label><input {...a("website")} className="input" placeholder="www.example.org" value={v.website} onChange={(e) => set("website", e.target.value)} autoComplete="url" />{err("website")}</div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="grid sm:grid-cols-2 gap-5">
          <legend className="hd-3 text-navy mb-2 sm:col-span-2">Your proposed work</legend>
          <div className="sm:col-span-2"><label htmlFor="loi-title" className="label">Project title *</label><input {...a("title")} className="input" value={v.title} onChange={(e) => set("title", e.target.value)} />{err("title")}</div>
          <div>
            <label htmlFor="loi-amount" className="label">Amount requested (US$) *</label>
            <input {...a("amount")} inputMode="numeric" className="input" placeholder={call ? `${call.budgetMinUsd.toLocaleString("en-US")} – ${call.budgetMaxUsd.toLocaleString("en-US")}` : "e.g. 250,000"} value={v.amount} onChange={(e) => set("amount", e.target.value)} />
            {err("amount")}
          </div>
          <div><label htmlFor="loi-months" className="label">Duration (months) *</label><input {...a("months")} inputMode="numeric" className="input" placeholder="24" value={v.months} onChange={(e) => set("months", e.target.value.replace(/[^\d]/g, "").slice(0, 2))} />{err("months")}</div>
          <div className="sm:col-span-2">
            <label htmlFor="loi-summary" className="label">Problem and approach *</label>
            <textarea {...a("summary")} className="input !min-h-[180px]" value={v.summary} onChange={(e) => set("summary", e.target.value)} />
            <div className="flex justify-between">{err("summary") ?? <span className="mt-1.5 text-[12.5px] text-muted">150–1,500 characters.</span>}<span className={cn("mt-1.5 text-[12px] tabular", v.summary.length > 1500 ? "text-[color:var(--danger)]" : "text-muted")}>{v.summary.length}/1500</span></div>
          </div>
          <div className="sm:col-span-2"><label htmlFor="loi-outcomes" className="label">Expected outcomes *</label><textarea {...a("outcomes")} className="input" placeholder="e.g. 85% DTP3 coverage in 12 target wards by month 24" value={v.outcomes} onChange={(e) => set("outcomes", e.target.value)} />{err("outcomes")}</div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="grid sm:grid-cols-2 gap-5">
          <legend className="hd-3 text-navy mb-2 sm:col-span-2">Contact person</legend>
          <div><label htmlFor="loi-name" className="label">Full name *</label><input {...a("name")} className="input" value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />{err("name")}</div>
          <div><label htmlFor="loi-role" className="label">Role *</label><input {...a("role")} className="input" value={v.role} onChange={(e) => set("role", e.target.value)} autoComplete="organization-title" />{err("role")}</div>
          <div><label htmlFor="loi-email" className="label">Email *</label><input {...a("email")} type="email" className="input" value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />{err("email")}</div>
          <div><label htmlFor="loi-phone" className="label">Phone</label><input {...a("phone")} type="tel" className="input" placeholder="+234…" value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />{err("phone")}</div>
          <div className="sm:col-span-2 space-y-2 border-t border-line pt-5">
            <label htmlFor="loi-safeguarding" className="flex items-start gap-3 text-[14px] text-ink-2 cursor-pointer min-h-[44px]"><input {...a("safeguarding")} type="checkbox" checked={v.safeguarding} onChange={(e) => set("safeguarding", e.target.checked)} className="mt-0.5 w-5 h-5 accent-[color:var(--cobalt)] shrink-0" />We have a safeguarding policy, or will adopt one before any grant agreement is signed. *</label>
            {err("safeguarding")}
            <label htmlFor="loi-accurate" className="flex items-start gap-3 text-[14px] text-ink-2 cursor-pointer min-h-[44px]"><input {...a("accurate")} type="checkbox" checked={v.accurate} onChange={(e) => set("accurate", e.target.checked)} className="mt-0.5 w-5 h-5 accent-[color:var(--cobalt)] shrink-0" />The information in this letter of inquiry is accurate to the best of my knowledge. *</label>
            {err("accurate")}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-outline"><ChevronLeft className="w-4 h-4" aria-hidden="true" /> Back</button>
        {Object.values(errors).some(Boolean) && <p role="alert" className="text-[13.5px] text-[color:var(--danger)] font-medium">Please fix the highlighted fields.</p>}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {step < STEPS.length - 1 ? <>Continue <ChevronRight className="w-4 h-4" aria-hidden="true" /></> : sending ? "Submitting…" : "Submit letter of inquiry"}
        </button>
      </div>
      <p className="mt-4 text-[12.5px] text-muted">Demo template — nothing is sent. Your answers stay in this browser tab.</p>
    </form>
  );
}
