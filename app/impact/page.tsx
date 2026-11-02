import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { Sparkline, HBarChart } from "@/components/charts/bars";
import { results, impactHeadline } from "@/mock/organisation";
import { focusAreas, focusName } from "@/mock/focus-areas";
import { grants } from "@/mock/grants";
import { compactUsd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our results",
  description: "What the foundation’s grantees achieved — bed nets, children protected from malaria, farmers reached, first digital accounts, girls mentored and pupils taught.",
};

const regions = ["West Africa", "East Africa", "Southern Africa", "Central Africa", "North Africa", "Pan-African"] as const;

export default function ImpactPage() {
  const byRegion = regions.map((r) => ({ label: r, value: grants.filter((g) => g.region === r).reduce((s, g) => s + g.amountUsd, 0) })).filter((r) => r.value > 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our results" }]}
        eyebrow="Our results"
        title="What our partners achieved."
        lede="Results reported by grantees against our shared framework, verified through site visits and independent evaluations. Continental trends are in the Progress Report; this page shows what our money bought."
      >
        <Link href="/progress" className="btn btn-outline">Read the Progress Report</Link>
      </PageHero>

      <section className="bg-navy on-dark"><div className="container-x py-4"><StatRow dark items={impactHeadline as unknown as { value: string; label: string }[]} /></div></section>

      <Section>
        <SectionHeader eyebrow="Cumulative results, 2019–2026" title="Six numbers we track every quarter" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--line)] border border-line">
          {results.map((r) => {
            const f = focusAreas.find((x) => x.slug === r.focus)!;
            return (
              <li key={r.label} className="bg-white p-7">
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-muted"><span className="chip-dot" style={{ background: f.color }} aria-hidden="true" />{focusName(f.slug)}</div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div className="fact-num text-navy">{r.value}</div>
                  <Sparkline values={r.spark} color={f.color} ariaLabel={`Trend 2019 to 2026 for ${r.label}`} />
                </div>
                <p className="mt-3 text-ink-2">{r.label}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[12px] text-muted">Illustrative template data. Results are attributed to the grants that funded them; where we co-fund with others, we report our proportional share.</p>
      </Section>

      <Section tone="paper">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="hd-3 text-navy">Listed grants by region</h2>
            <p className="mt-2 text-ink-2 text-[15px]">From the public grants database.</p>
            <div className="mt-6 bg-white border border-line p-6">
              <HBarChart ariaLabel="Grant value by region" data={byRegion.map((r) => ({ ...r, display: compactUsd(r.value), color: "var(--navy)" }))} />
            </div>
          </div>
          <div>
            <h2 className="hd-3 text-navy">Committed to date, by focus area</h2>
            <p className="mt-2 text-ink-2 text-[15px]">Cumulative since 2009.</p>
            <div className="mt-6 bg-white border border-line p-6">
              <HBarChart ariaLabel="Cumulative commitments by focus area" data={focusAreas.map((f) => ({ label: f.short, value: f.committedUsd, color: f.color, display: compactUsd(f.committedUsd) }))} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12">
          <div>
            <p className="eyebrow">How we measure</p>
            <h2 className="hd-2 text-navy mt-3">Honest about attribution</h2>
          </div>
          <div className="space-y-4 text-ink-2 leading-relaxed">
            <p>Every grant reports against two to five indicators from our shared results framework. Our Data & Evidence team checks a sample of reported numbers through site visits and phone surveys every year.</p>
            <p>Grants above $5m are independently evaluated, usually with a comparison group. We publish every evaluation report — including the ones that show a programme did not work.</p>
            <Link href="/transparency#reports" className="arrow-link">Evaluations register →</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
