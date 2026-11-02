import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarClock, FileText, MapPin, Timer, Wallet } from "lucide-react";
import { FocusChip, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { granteeResources, grantmakingSteps, opportunities } from "@/mock/opportunities";
import { focusAreas } from "@/mock/focus-areas";
import { compactUsd, daysLeft, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { LoiForm } from "./loi-form";

export const metadata: Metadata = {
  title: "Grant opportunities",
  description: "Open calls for proposals, eligibility, budget ranges and deadlines — plus how our grantmaking works, a letter-of-inquiry form and resources for grantees.",
};

const STATUS_CLASS = { Open: "tag-open", "Opening soon": "tag-soon", Closed: "tag-closed" } as const;

export default function GrantOpportunitiesPage() {
  const order = { Open: 0, "Opening soon": 1, Closed: 2 } as const;
  const list = [...opportunities].sort((a, b) => order[a.status] - order[b.status] || a.deadline.localeCompare(b.deadline));
  return (
    <>
      <PageHero
        crumbs={[{ label: "How we work", href: "/how-we-work" }, { label: "Grant opportunities" }]}
        eyebrow="For grant seekers"
        title="Grant opportunities"
        lede="Apply to an open call, or send a general letter of inquiry aligned to one of our focus-area strategies. We reply to every LOI."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#calls" className="btn btn-navy">View open calls</a>
          <a href="#loi" className="btn btn-outline">Submit a letter of inquiry</a>
          <a href="#resources" className="btn btn-outline">Resources for grantees</a>
        </div>
      </PageHero>

      <Section id="calls">
        <SectionHeader eyebrow="Calls for proposals" title={`${opportunities.filter((o) => o.status === "Open").length} calls open now`} />
        <ul className="space-y-6">
          {list.map((o) => {
            const f = focusAreas.find((x) => x.slug === o.focus)!;
            const dl = daysLeft(o.deadline);
            return (
              <li key={o.slug} id={o.slug} className="scroll-mt-28 border border-line border-l-4 bg-white" style={{ borderLeftColor: f.color }}>
                <article className="p-6 md:p-8 grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`tag ${STATUS_CLASS[o.status]}`}>{o.status}</span>
                      <FocusChip slug={o.focus} />
                    </div>
                    <h3 className="mt-3 hd-3 text-navy">{o.title}</h3>
                    <p className="mt-3 text-ink-2">{o.summary}</p>
                    <div className="mt-6 grid sm:grid-cols-2 gap-6 text-[14px]">
                      <div>
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">Eligibility</h4>
                        <ul className="mt-2 space-y-1.5 list-disc pl-5 text-ink-2">{o.eligibility.map((e) => <li key={e}>{e}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">We’re looking for</h4>
                        <ul className="mt-2 space-y-1.5 list-disc pl-5 text-ink-2">{o.priorities.map((e) => <li key={e}>{e}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                  <aside className="bg-paper p-5 self-start">
                    <dl className="space-y-3 text-[14px]">
                      <div className="flex gap-3"><Wallet className="w-5 h-5 text-muted shrink-0" aria-hidden="true" /><div><dt className="text-muted text-[12.5px]">Budget range</dt><dd className="font-semibold text-navy">{compactUsd(o.budgetMinUsd)} – {compactUsd(o.budgetMaxUsd)}</dd></div></div>
                      <div className="flex gap-3"><Timer className="w-5 h-5 text-muted shrink-0" aria-hidden="true" /><div><dt className="text-muted text-[12.5px]">Duration</dt><dd className="font-semibold text-navy">{o.duration}</dd></div></div>
                      <div className="flex gap-3"><MapPin className="w-5 h-5 text-muted shrink-0" aria-hidden="true" /><div><dt className="text-muted text-[12.5px]">Geography</dt><dd className="font-semibold text-navy">{o.geography}</dd></div></div>
                      <div className="flex gap-3"><CalendarClock className="w-5 h-5 text-muted shrink-0" aria-hidden="true" /><div><dt className="text-muted text-[12.5px]">{o.status === "Opening soon" ? "Opens" : "Deadline"}</dt><dd className="font-semibold text-navy">{formatDate(o.status === "Opening soon" ? o.opens : o.deadline, { day: "numeric", month: "long", year: "numeric" })}{o.status === "Open" && <span className="block text-coral text-[13px]">{dl} days left</span>}</dd></div></div>
                    </dl>
                    {o.status === "Open" ? (
                      <Link href={`/how-we-work/grant-opportunities?call=${o.slug}#loi`} className="btn btn-primary w-full mt-5">Submit an LOI for this call</Link>
                    ) : o.status === "Opening soon" ? (
                      <Link href="/#newsletter" className="btn btn-outline w-full mt-5">Notify me when it opens</Link>
                    ) : (
                      <p className="mt-5 text-[13px] text-muted">This call has closed. Successful grants will appear in the database.</p>
                    )}
                  </aside>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="paper" id="process">
        <SectionHeader eyebrow="How our grantmaking works" title="From letter of inquiry to partnership" />
        <ol className="relative grid lg:grid-cols-6 gap-6 lg:gap-4">
          <span className="hidden lg:block absolute top-5 left-5 right-5 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
          {grantmakingSteps.map((s, i) => (
            <li key={s.title} className="relative flex lg:block gap-4">
              <span className="relative z-10 w-10 h-10 shrink-0 bg-navy text-white flex items-center justify-center font-serif text-lg">{i + 1}</span>
              <div className="min-w-0 lg:mt-4">
                <h3 className="font-semibold text-navy">{s.title}</h3>
                <p className="mt-1 text-[13.5px] text-ink-2">{s.body}</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-wider text-cobalt">{s.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="loi" className="scroll-mt-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <div>
            <p className="eyebrow">Apply</p>
            <h2 className="hd-2 text-navy mt-3">Submit a letter of inquiry</h2>
            <p className="lede mt-4">Four short steps, about 20 minutes. You can apply to an open call or send a general LOI aligned to a focus-area strategy.</p>
            <ul className="mt-6 space-y-2 text-[14.5px] text-ink-2">
              <li>· We reply to every LOI within six weeks.</li>
              <li>· Only invited applicants submit full proposals.</li>
              <li>· Questions? {siteConfig.brand.grantsEmail}</li>
            </ul>
          </div>
          <div className="border border-line p-6 md:p-8">
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <LoiForm />
            </Suspense>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="resources">
        <SectionHeader eyebrow="For grantees" title="Resources for current grantees" lede="Templates, guidelines and policies. Your programme officer can help with anything not covered here." />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--line)] border border-line">
          {granteeResources.map((r) => (
            <li key={r.title} className="bg-white">
              <a href="#" className="flex gap-4 p-6 h-full group">
                <FileText className="w-6 h-6 text-cobalt shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-navy group-hover:underline underline-offset-4">{r.title}</span>
                  <span className="block text-[14px] text-ink-2 mt-1">{r.body}</span>
                  <span className="block text-[12px] text-muted mt-2 uppercase tracking-wider font-bold">{r.format}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
