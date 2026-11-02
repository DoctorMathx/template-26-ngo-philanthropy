import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { ArrowLink, PageHero, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { HBarChart } from "@/components/charts/bars";
import { grantmakingSteps } from "@/mock/opportunities";
import { values } from "@/mock/organisation";
import { IMG } from "@/mock/images";

export const metadata: Metadata = {
  title: "How we work",
  description: "Our grantmaking principles, process and what we do and don’t fund — plus what our grantees tell us about working with us.",
};

const perception = [
  { label: "Understands my organisation’s context", value: 86 },
  { label: "Reporting requirements are proportionate", value: 78 },
  { label: "Funds flexible / core costs", value: 71 },
  { label: "Responds quickly to questions", value: 82 },
  { label: "Treats us as a partner", value: 88 },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "How we work" }]}
        eyebrow="How we work"
        title="Patient, evidence-led grantmaking — with African partners in the lead."
        lede="We make grants to organisations that are closest to the problems we care about, fund them for long enough to make a difference, and publish what we learn."
        image={IMG.meeting}
        imageAlt="Colleagues gathered around a meeting table reviewing documents"
        caption="A grant review meeting at our Lagos office."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/how-we-work/grant-opportunities" className="btn btn-navy">See open calls</Link>
          <Link href="/grants" className="btn btn-outline">Browse committed grants</Link>
        </div>
      </PageHero>

      <section className="bg-navy on-dark">
        <div className="container-x py-4">
          <StatRow dark items={[{ value: "4.1 yrs", label: "average grant length" }, { value: "38%", label: "of grant dollars as flexible core support" }, { value: "61%", label: "to African-headquartered organisations" }, { value: "11 wks", label: "median time from LOI to decision" }]} />
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Principles" title="What guides our grantmaking" />
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {values.map((v, i) => (
            <li key={v.title} className="border-t-2 border-[color:var(--navy)] pt-4">
              <span className="font-serif text-2xl text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-semibold text-navy text-lg">{v.title}</h3>
              <p className="mt-2 text-ink-2">{v.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="process">
        <SectionHeader eyebrow="Process" title="How our grantmaking works" lede="From a two-page letter of inquiry to a signed agreement typically takes three to five months." action={<ArrowLink href="/how-we-work/grant-opportunities#loi">Submit a letter of inquiry</ArrowLink>} />
        <ol className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-[color:var(--line)] border border-line">
          {grantmakingSteps.map((s, i) => (
            <li key={s.title} className="bg-white p-5 relative">
              <span className="w-9 h-9 bg-navy text-white flex items-center justify-center font-serif text-lg">{i + 1}</span>
              <h3 className="mt-4 font-semibold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] text-ink-2">{s.body}</p>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-wider text-cobalt">{s.time}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="hd-3 text-navy">We fund</h2>
            <ul className="mt-5 space-y-3">
              {["Registered non-profits, universities and research institutes", "Social enterprises (through programme-related investments)", "Government agencies, through technical-assistance partners", "Core costs, evaluation and organisational strengthening", "Multi-year work aligned to a published focus-area strategy"].map((t) => (
                <li key={t} className="flex gap-3 text-ink-2"><Check className="w-5 h-5 text-[color:var(--success)] shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="hd-3 text-navy">We don’t fund</h2>
            <ul className="mt-5 space-y-3">
              {["Individuals, scholarships for named people or personal appeals", "Political campaigns or lobbying for candidates", "Religious activities (faith-based organisations delivering secular services are eligible)", "Building projects without a programme attached", "Retroactive costs or debt repayment"].map((t) => (
                <li key={t} className="flex gap-3 text-ink-2"><X className="w-5 h-5 text-coral shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 items-center">
          <div>
            <p className="eyebrow">Accountability to grantees</p>
            <h2 className="hd-2 text-navy mt-3">What our grantees tell us</h2>
            <p className="lede mt-4">Every year an independent firm surveys all of our grantees anonymously. We publish the results — and what we changed.</p>
            <Link href="/how-we-work/grant-opportunities#resources" className="arrow-link mt-4">Read the 2025 grantee perception report →</Link>
          </div>
          <div className="bg-white border border-line p-6 md:p-8">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted mb-5">% of grantees agreeing, 2025 (n = 412)</h3>
            <HBarChart ariaLabel="Grantee perception survey results" data={perception.map((p) => ({ label: p.label, value: p.value, display: `${p.value}%`, color: p.value < 75 ? "var(--coral)" : "var(--navy)" }))} max={100} />
            <p className="mt-5 text-[12px] text-muted">Coral = below our 75% target. Illustrative template data.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
