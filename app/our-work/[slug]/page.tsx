import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArrowLink, FactCard, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { StoryCard } from "@/components/ui/cards";
import { ChartDataTable, LineChart } from "@/components/charts/line-chart";
import { HBarChart } from "@/components/charts/bars";
import { focusAreas, getFocusArea } from "@/mock/focus-areas";
import { grantsByFocus } from "@/mock/grants";
import { stories } from "@/mock/stories";
import { indicators } from "@/mock/progress";
import { funds } from "@/mock/funds";
import { opportunities } from "@/mock/opportunities";
import { compactNaira, compactUsd, formatDate, formatNumber, formatUsd, daysLeft } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return focusAreas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFocusArea(slug);
  if (!f) return { title: "Focus area not found" };
  return { title: `${f.name} — strategy, data & grants`, description: f.summary };
}

export default async function FocusAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFocusArea(slug);
  if (!f) notFound();

  const related = grantsByFocus(f.slug);
  const relatedStories = stories.filter((s) => s.focus === f.slug);
  const moreStories = relatedStories.length ? relatedStories : stories.slice(0, 2);
  const inds = indicators.filter((i) => i.focus === f.slug);
  const fund = funds.find((x) => x.focus === f.slug);
  const opps = opportunities.filter((o) => o.focus === f.slug && o.status !== "Closed");
  const byCountry = Object.entries(
    related.reduce<Record<string, number>>((acc, g) => ({ ...acc, [g.country]: (acc[g.country] ?? 0) + g.amountUsd }), {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const allX = f.chart.series.flatMap((s) => s.points.map((p) => p.x));
  const colors = [f.color, "#0B1F3A", "#F2795B"];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Our work", href: "/our-work" }, { label: f.name }]}
        accent={f.color}
        eyebrow="Focus area"
        title={f.name}
        lede={f.tagline}
        image={f.image}
        imageAlt={f.imageAlt}
        caption={f.caption}
      >
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5 max-w-lg text-[13px]">
          <div><dt className="text-muted">Committed</dt><dd className="font-serif text-2xl text-navy">{compactUsd(f.committedUsd)}</dd></div>
          <div><dt className="text-muted">Active grants</dt><dd className="font-serif text-2xl text-navy">{f.activeGrants}</dd></div>
          <div><dt className="text-muted">Countries</dt><dd className="font-serif text-2xl text-navy">{f.countries.length}</dd></div>
        </dl>
      </PageHero>

      {/* In-page navigation */}
      <nav aria-label="On this page" className="sticky top-[72px] z-30 bg-white border-b border-line">
        <ul className="container-x flex gap-6 overflow-x-auto no-scrollbar text-[14px] font-semibold">
          {[["strategy", "Strategy"], ["numbers", "The challenge in numbers"], ["data", "Data"], ["partners", "Partners"], ["grants", "Grants"], ["stories", "Stories"]].map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="inline-flex items-center min-h-[48px] text-ink-2 hover:text-navy whitespace-nowrap border-b-2 border-transparent hover:border-[color:var(--cobalt)]">{label}</a></li>
          ))}
        </ul>
      </nav>

      <Section id="strategy">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-12">
          <aside>
            <p className="eyebrow">Strategy overview</p>
            <div className="mt-6 border-t-2 pt-4" style={{ borderTopColor: f.color }}>
              <p className="text-[13px] text-muted">Led by</p>
              <p className="font-semibold text-navy">{f.director.name}</p>
              <p className="text-[13.5px] text-ink-2">{f.director.role}</p>
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[13px] text-muted mb-2">Priority countries</p>
              <ul className="flex flex-wrap gap-2">{f.countries.map((c) => <li key={c} className="tag">{c}</li>)}</ul>
            </div>
          </aside>
          <div>
            <p className="font-serif text-[1.6rem] md:text-[1.9rem] leading-snug text-navy">{f.summary}</p>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {f.strategy.map((s) => (
                <div key={s.heading} className="border-t border-line pt-4">
                  <h2 className="font-semibold text-navy">{s.heading}</h2>
                  <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <h2 className="mt-14 text-[13px] font-bold uppercase tracking-[0.1em] text-muted">Strategic priorities</h2>
            <ol className="mt-4 grid sm:grid-cols-2 gap-px bg-[color:var(--line)] border border-line">
              {f.priorities.map((p, i) => (
                <li key={p.title} className="bg-white p-6">
                  <span className="font-serif text-2xl" style={{ color: f.color }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-[14.5px] text-ink-2">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="numbers">
        <SectionHeader eyebrow="The challenge in numbers" title={`Why ${f.name.toLowerCase()} matters`} />
        <div className={`grid sm:grid-cols-2 ${f.facts.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-10`}>
          {f.facts.map((fact) => <FactCard key={fact.label} fact={fact} color={f.color} />)}
        </div>
      </Section>

      <Section id="data">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12">
          <div>
            <p className="eyebrow">Data</p>
            <h2 className="hd-2 text-navy mt-3">{f.chart.title}</h2>
            <p className="mt-4 text-ink-2">{f.chart.subtitle}.</p>
            {inds.length > 0 && (
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-[13px] font-semibold text-navy">Tracked in the Progress Report</p>
                <ul className="mt-2 space-y-1">
                  {inds.map((i) => <li key={i.slug}><ArrowLink href={`/progress#${i.slug}`}>{i.number}. {i.title}</ArrowLink></li>)}
                </ul>
              </div>
            )}
          </div>
          <div className="border border-line p-5 md:p-8 text-navy">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-2 mb-4">
              {f.chart.series.map((s, i) => (
                <li key={s.label} className="flex items-center gap-2"><svg width="24" height="8" aria-hidden="true"><line x1="0" x2="24" y1="4" y2="4" stroke={colors[i]} strokeWidth="3" strokeDasharray={s.kind === "target" ? "5 4" : undefined} /></svg>{s.label}</li>
              ))}
            </ul>
            <LineChart
              ariaLabel={`${f.chart.title}. ${f.chart.subtitle}.`}
              series={f.chart.series.map((s, i) => ({ label: s.label, points: s.points, color: colors[i], dashed: s.kind === "target", area: i === 0, dots: s.points.length < 8 }))}
              xMin={Math.min(...allX)}
              xMax={Math.max(...allX)}
              yMax={f.chart.yMax}
              format={(n) => (f.chart.yMax < 10 ? n.toFixed(1) : String(Math.round(n)))}
              mobileLegend={false}
            />
            <p className="mt-4 text-[12px] text-muted">{f.chart.source}</p>
            <ChartDataTable caption={f.chart.subtitle} series={f.chart.series} />
          </div>
        </div>
      </Section>

      <Section tone="paper" id="partners">
        <SectionHeader eyebrow="Key partners" title="We work through African institutions" lede="A selection of the grantees and partners delivering this strategy. 61% of our grant dollars go to organisations headquartered in Africa." />
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[color:var(--line)] border border-line">
          {f.partners.map((p) => (
            <li key={p} className="bg-white min-h-[110px] flex items-center justify-center text-center px-5 py-6">
              <span className="font-serif text-[1.15rem] text-navy leading-tight">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="grants">
        <SectionHeader
          eyebrow="Related grants"
          title={`Recent ${f.short.toLowerCase()} grants`}
          action={<Link href={`/grants?focus=${f.slug}`} className="btn btn-navy">All {f.short.toLowerCase()} grants <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>}
        />
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12">
          <div className="overflow-x-auto">
            <table className="data-table min-w-[560px]">
              <caption className="sr-only">Recent grants in {f.name}</caption>
              <thead><tr><th scope="col">Grantee & purpose</th><th scope="col">Year</th><th scope="col" className="text-right">Amount</th></tr></thead>
              <tbody>
                {related.slice(0, 6).map((g) => (
                  <tr key={g.id}>
                    <td><Link href={`/grants/${g.id}`} className="font-semibold text-navy hover:underline underline-offset-4">{g.grantee}</Link><div className="text-[13px] text-ink-2 mt-0.5">{g.purpose}</div><div className="text-[12px] text-muted mt-1">{g.country} · {g.durationMonths} months</div></td>
                    <td className="tabular">{g.year}</td>
                    <td className="text-right tabular font-semibold text-navy whitespace-nowrap">{formatUsd(g.amountUsd)}<div className="text-[12px] text-muted font-normal">{compactNaira(g.amountUsd * siteConfig.fx.ngnPerUsd)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted mb-5">Listed grants by country</h3>
            <HBarChart ariaLabel={`Grants in ${f.name} by country`} data={byCountry.map(([c, v]) => ({ label: c, value: v, color: f.color, display: compactUsd(v) }))} />
            {opps.length > 0 && (
              <div className="mt-10 bg-paper p-6">
                <p className="eyebrow">Open call</p>
                {opps.map((o) => (
                  <div key={o.slug} className="mt-3">
                    <p className="font-semibold text-navy">{o.title}</p>
                    <p className="text-[13px] text-muted mt-1">Deadline {formatDate(o.deadline)} · {daysLeft(o.deadline)} days left</p>
                    <ArrowLink href={`/how-we-work/grant-opportunities#${o.slug}`}>Eligibility & how to apply</ArrowLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {fund && (
        <section className="bg-navy on-dark">
          <div className="container-x py-14 md:py-16 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-center">
            <div>
              <p className="eyebrow">Co-fund this work</p>
              <h2 className="hd-2 text-white mt-3">{fund.name}</h2>
              <p className="lede mt-3">{fund.tagline} {formatNumber(fund.coFunders)} people and companies have joined — and the foundation matches every naira up to {compactNaira(fund.matchCapNaira)} this year.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={`/donate?designation=fund:${fund.slug}`} className="btn btn-light btn-lg">Give — matched 1:1</Link>
              <Link href={`/give#${fund.slug}`} className="btn btn-ghost-light btn-lg">About the fund</Link>
            </div>
          </div>
        </section>
      )}

      <Section id="stories">
        <SectionHeader eyebrow="Stories" title="From the field" action={<ArrowLink href="/stories">All stories</ArrowLink>} />
        <div className="grid md:grid-cols-3 gap-10">
          {moreStories.slice(0, 3).map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted mb-5">Other focus areas</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.filter((x) => x.slug !== f.slug).map((x) => (
            <li key={x.slug}><Link href={`/our-work/${x.slug}`} className="block border-t-4 pt-4 group min-h-[44px]" style={{ borderTopColor: x.color }}><span className="font-serif text-xl text-navy group-hover:underline underline-offset-4">{x.name}</span></Link></li>
          ))}
        </ul>
      </Section>
    </>
  );
}
