"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, CheckCircle2, Copy, Download, Printer, Share2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, parsePositiveInt } from "@/lib/utils";
import { designationLabel, matchedFundFor } from "@/lib/designations";

const METHOD: Record<string, string> = { card: "Card", bank: "Bank transfer", ussd: "USSD" };
const FREQ: Record<string, string> = { "one-time": "One-time", monthly: "Monthly", annual: "Annual" };

export function ThankYouClient() {
  const sp = useSearchParams();
  const [copied, setCopied] = useState(false);
  const total = parsePositiveInt(sp.get("amount"));
  const gift = parsePositiveInt(sp.get("gift")) ?? total;
  const fee = parsePositiveInt(sp.get("fee")) ?? 0;
  const designation = sp.get("designation");
  const fund = matchedFundFor(designation);
  const matchedQ = parsePositiveInt(sp.get("matched")) ?? 0;
  const matched = fund ? Math.min(matchedQ, gift ?? 0) : 0;
  const ref = (sp.get("ref") ?? "").replace(/[^A-Z0-9-]/gi, "").slice(0, 20) || "MF-PENDING";
  const frequency = FREQ[sp.get("frequency") ?? ""] ? (sp.get("frequency") as string) : "one-time";
  const method = METHOD[sp.get("method") ?? ""] ? (sp.get("method") as string) : "card";
  const name = (sp.get("name") ?? "").slice(0, 40) || "friend";
  const company = sp.get("company")?.slice(0, 60);
  const tribute = sp.get("tribute");
  const tributeName = sp.get("tributeName")?.slice(0, 48);
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const suffix = frequency === "monthly" ? " / month" : frequency === "annual" ? " / year" : "";

  if (!total) {
    return (
      <section className="bg-paper py-28">
        <div className="container-x max-w-xl">
          <h1 className="hd-1 text-navy">No donation found</h1>
          <p className="lede mt-4">This receipt link is missing details. If you’ve just donated, check your email for your receipt — or start a new gift.</p>
          <Link href="/donate" className="btn btn-navy btn-lg mt-8">Go to donate</Link>
        </div>
      </section>
    );
  }

  const shareText = fund ? `I just gave to the ${fund.name} — and @meridianfdn matched it 1:1. Join me:` : `I just supported ${siteConfig.brand.name}. Join me:`;
  const shareUrl = `https://${siteConfig.brand.domain}/give`;
  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: siteConfig.brand.name, text: shareText, url: shareUrl });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try { await navigator.clipboard.writeText(`${shareText} ${shareUrl}`); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="bg-navy on-dark meridian-lines">
        <div className="container-x py-16 md:py-20">
          <CheckCircle2 className="w-12 h-12 text-sky fade-up" strokeWidth={1.5} aria-hidden="true" />
          <h1 className="hd-display text-white mt-6 fade-up">Thank you, {name}.</h1>
          <p className="lede mt-5 max-w-2xl fade-up">
            {method === "card" ? "Your gift is confirmed." : "We’ve logged your pledge. As soon as your transfer lands we’ll email your official receipt."}
            {fund && matched ? <> With the foundation’s match, <strong className="text-white">{formatNaira((gift ?? 0) + matched)}</strong> will be granted through the {fund.name}{suffix}.</> : null}
          </p>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="container-x grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8 items-start">
          <div className="bg-white border border-line border-t-4 border-t-[color:var(--navy)] p-6 md:p-8 print-area">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Donation receipt</p>
                <p className="mt-2 font-serif text-2xl text-navy">{siteConfig.org.legalName}</p>
                <p className="text-[13px] text-muted">{siteConfig.brand.address}</p>
              </div>
              <span className={method === "card" ? "tag tag-open shrink-0" : "tag tag-soon shrink-0"}>{method === "card" ? "Paid" : "Pending transfer"}</span>
            </div>
            <dl className="mt-6 border-t-2 border-[color:var(--navy)] text-[14.5px]">
              {[
                ["Reference", ref],
                ["Date", date],
                ...(company ? [["Donor", company]] : []),
                ["Donation", formatNaira(gift ?? total)],
                ...(fee ? [["Processing fee covered", formatNaira(fee)]] : []),
                ["Total charged", `${formatNaira(total)}${suffix}`],
                ["Frequency", FREQ[frequency]],
                ["Designation", designationLabel(designation)],
                ...(fund ? [["Matched by the foundation", matched ? formatNaira(matched) : "Matching cap reached"]] : []),
                ["Payment method", METHOD[method]],
                ...(tribute && tributeName ? [[`In ${tribute === "memory" ? "memory" : "honour"} of`, tributeName]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3 border-b border-line">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-navy text-right tabular">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[12.5px] text-muted leading-relaxed"><strong className="text-ink-2">Tax note:</strong> {siteConfig.donation.receiptNote}</p>
            <div className="mt-6 flex flex-wrap gap-2 no-print">
              <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm"><Printer className="w-4 h-4" aria-hidden="true" /> Print receipt</button>
              <a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" aria-hidden="true" /> Download PDF</a>
            </div>
          </div>

          <aside className="space-y-6 no-print">
            <div className="bg-navy on-dark p-6 md:p-7">
              <h2 className="font-serif text-2xl text-white">Double your reach</h2>
              <p className="mt-2 text-[14.5px] text-on-dark-muted">Friends who hear about a matched gift are far more likely to give. Share the fund — no amounts are shown.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button type="button" onClick={share} className="btn btn-light">{copied ? <><Check className="w-4 h-4" aria-hidden="true" /> Copied</> : <><Share2 className="w-4 h-4" aria-hidden="true" /> Share</>}</button>
                <a className="btn btn-ghost-light" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}>WhatsApp</a>
                <a className="btn btn-ghost-light" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X / Twitter</a>
                <a className="btn btn-ghost-light" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}>LinkedIn</a>
              </div>
              <button type="button" className="mt-2 w-full btn btn-ghost-light" onClick={async () => { try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                <Copy className="w-4 h-4" aria-hidden="true" /> Copy link
              </button>
            </div>
            <div className="bg-white border border-line p-6 md:p-7">
              <h2 className="font-serif text-2xl text-navy">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[14.5px] text-ink-2">
                {[
                  "Your receipt arrives by email within a few minutes.",
                  fund ? `Your gift and the foundation’s match are added to the ${fund.name}’s next grant round.` : "Your gift is allocated to the designation you chose within 7 days.",
                  "You’ll receive quarterly results data from the work you support.",
                  frequency !== "one-time" ? "You can change or cancel your regular gift any time by email or WhatsApp." : "Consider a monthly gift — it gives partners predictable funding.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 bg-paper-2 text-navy font-serif flex items-center justify-center shrink-0">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/progress" className="btn btn-navy">Read the Progress Report <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                <Link href="/get-involved" className="btn btn-outline">Start a giving circle</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
