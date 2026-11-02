import type { Metadata } from "next";
import Link from "next/link";
import { Download, Share2 } from "lucide-react";
import { Breadcrumbs, FocusChip, Section } from "@/components/ui/primitives";
import { IndicatorChart, ScenarioLegend, SCENARIO } from "@/components/charts/indicator-chart";
import { Sparkline } from "@/components/charts/bars";
import { indicators, progressMeta } from "@/mock/progress";
import { focusAreas } from "@/mock/focus-areas";
import { formatDate } from "@/lib/utils";
import { ProgressNav } from "./progress-nav";

export const metadata: Metadata = {
  title: `${progressMeta.title} ${progressMeta.edition}`,
  description: progressMeta.subtitle,
};

const color = (slug: string) => focusAreas.find((f) => f.slug === slug)?.color ?? "#0B1F3A";

function changeSince(ind: (typeof indicators)[number]) {
  const first = ind.actual[0];
  const last = ind.actual[ind.actual.length - 1];
  const pct = Math.round(((last.y - first.y) / first.y) * 100);
  const good = ind.higherIsBetter ? pct > 0 : pct < 0;
  return { pct, good, from: first.x };
}

function outlook(ind: (typeof indicators)[number]) {
  const cur = ind.current[ind.current.length - 1].y;
  const best = ind.best[ind.best.length - 1].y;
  const gap = Math.abs(best - cur) / Math.abs(best - ind.actual[ind.actual.length - 1].y || 1);
  if (ind.target) {
    const meets = ind.higherIsBetter ? cur >= ind.target.value : cur <= ind.target.value;
    if (meets) return { label: "On track", tone: "tag-open" };
  }
  return gap > 0.5 ? { label: "Off track", tone: "tag-soon" } : { label: "Improving", tone: "tag" };
}

export default function ProgressPage() {
  return (
    <>
      {/* Cover */}
      <section className="bg-navy on-dark meridian-lines">
        <div className="container-x pt-8 pb-16 md:pb-24">
          <Breadcrumbs dark items={[{ label: "Progress Report" }]} />
          <div className="mt-12 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-end">
            <div>
              <p className="eyebrow">{progressMeta.title} · {progressMeta.edition} edition</p>
              <h1 className="hd-display text-white mt-5">Is Africa on track?</h1>
              <p className="lede mt-6 max-w-2xl !text-[1.25rem]">{progressMeta.subtitle}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#child-mortality" className="btn btn-light btn-lg">Start reading</a>
                <a href="#" className="btn btn-ghost-light btn-lg"><Download className="w-4 h-4" aria-hidden="true" /> Download PDF & data</a>
              </div>
            </div>
            <div className="border-t border-dark pt-6">
              <p className="text-[13px] text-on-dark-muted">How to read the charts</p>
              <div className="mt-3 bg-white p-4">
                <ScenarioLegend />
              </div>
              <p className="mt-4 text-[13px] text-on-dark-muted">Published {formatDate(progressMeta.published, { day: "numeric", month: "long", year: "numeric" })} by the Meridian Data & Evidence team. All data shown in this template are illustrative.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scorecard — small multiples */}
      <Section tone="paper" labelledBy="scorecard-h">
        <h2 id="scorecard-h" className="hd-2 text-navy">The scorecard</h2>
        <p className="lede mt-3 max-w-2xl">Where each indicator stands today, and whether the current trajectory reaches where the best-performing countries show it could be by 2035.</p>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--line)] border border-line">
          {indicators.map((ind) => {
            const c = changeSince(ind);
            const o = outlook(ind);
            const last = ind.actual[ind.actual.length - 1];
            return (
              <li key={ind.slug} className="bg-white">
                <a href={`#${ind.slug}`} className="block p-5 h-full hover:bg-[#FAFBFC] group">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-serif text-muted tabular">{String(ind.number).padStart(2, "0")}</span>
                    <span className={`tag ${o.tone}`}>{o.label}</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-navy group-hover:underline underline-offset-4">{ind.title}</h3>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <div className="font-serif text-3xl text-navy tabular leading-none">{ind.yMax <= 5 ? last.y.toFixed(2) : last.y}</div>
                      <div className="text-[11.5px] text-muted mt-1 max-w-[9rem] leading-tight">{ind.unit}, {last.x}</div>
                    </div>
                    <Sparkline values={ind.actual.map((p) => p.y)} color={color(ind.focus)} width={96} height={40} />
                  </div>
                  <p className={`mt-3 text-[12.5px] font-semibold ${c.good ? "text-[color:var(--success)]" : "text-coral"}`}>
                    {c.pct > 0 ? "+" : ""}{c.pct}% since {c.from}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Chapters */}
      <div className="container-x py-12 md:py-20 grid lg:grid-cols-[220px_minmax(0,1fr)] gap-12">
        <aside className="hidden lg:block">
          <ProgressNav items={indicators.map((i) => ({ slug: i.slug, number: i.number, title: i.title, color: color(i.focus) }))} />
        </aside>
        <div className="space-y-20 md:space-y-28">
          {indicators.map((ind) => (
            <article key={ind.slug} id={ind.slug} className="scroll-mt-28" aria-labelledby={`${ind.slug}-h`}>
              <div className="flex flex-wrap items-center gap-4 border-t-4 pt-5" style={{ borderTopColor: color(ind.focus) }}>
                <span className="font-serif text-5xl text-navy leading-none tabular">{String(ind.number).padStart(2, "0")}</span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{ind.title}</p>
                  <FocusChip slug={ind.focus} />
                </div>
              </div>
              <h2 id={`${ind.slug}-h`} className="hd-2 text-navy mt-6 max-w-3xl">{ind.headline}</h2>
              <p className="mt-3 text-[15px] text-ink-2"><span className="font-semibold text-navy">{ind.question}</span> — {ind.unit}, sub-Saharan Africa.</p>

              <figure className="mt-8 border border-line p-4 md:p-8">
                <ScenarioLegend className="mb-4 hidden sm:block" />
                <IndicatorChart ind={ind} animate />
                <figcaption className="mt-3 text-[12px] text-muted">{ind.source}</figcaption>
              </figure>

              <div className="mt-8 grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10">
                <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-2">
                  {ind.narrative.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="fact self-start" style={{ borderTopColor: SCENARIO.worst }}>
                  <div className="fact-num text-coral">{ind.stat.value}</div>
                  <p className="mt-3 text-[15px] text-ink-2 leading-snug">{ind.stat.label}</p>
                  <p className="fact-source">Meridian scenario modelling (illustrative)</p>
                  <Link href={`/our-work/${ind.focus}`} className="arrow-link mt-2 text-[14px]">What we fund in this area →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <Section tone="paper" id="methodology">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2 className="hd-2 text-navy mt-3">How we built the scenarios</h2>
          </div>
          <div>
            <p className="text-ink-2 leading-relaxed">{progressMeta.methodology}</p>
            <ul className="mt-6 grid sm:grid-cols-3 gap-6 text-[14px]">
              <li className="border-t-2 pt-3" style={{ borderTopColor: SCENARIO.current }}><strong className="text-navy">Current trajectory</strong><p className="text-ink-2 mt-1">The 2015–2024 trend, extended.</p></li>
              <li className="border-t-2 pt-3" style={{ borderTopColor: SCENARIO.best }}><strong className="text-navy">Best case</strong><p className="text-ink-2 mt-1">Every country improves at the pace of the top performers.</p></li>
              <li className="border-t-2 pt-3" style={{ borderTopColor: SCENARIO.worst }}><strong className="text-navy">Worst case</strong><p className="text-ink-2 mt-1">Funding cuts and climate shocks reverse coverage gains.</p></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="btn btn-navy"><Download className="w-4 h-4" aria-hidden="true" /> Download the dataset (CSV)</a>
              <a href={`https://x.com/intent/tweet?text=${encodeURIComponent("Is Africa on track? The 2026 Progress Report from Meridian Foundation")}`} target="_blank" rel="noreferrer" className="btn btn-outline"><Share2 className="w-4 h-4" aria-hidden="true" /> Share the report</a>
              <Link href="/newsroom/progress-report-2026" className="btn btn-outline">Press release</Link>
            </div>
            <p className="mt-6 text-[13px] text-muted">Charts and data are published under a Creative Commons Attribution licence. Please credit “Meridian Foundation Progress Report 2026”.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
