import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { compactNaira, compactUsd, daysLeft, formatDate, formatUsd, cn } from "@/lib/utils";
import { focusAreas, focusName } from "@/mock/focus-areas";
import { indicators, progressMeta } from "@/mock/progress";
import { commitmentsByYear, grants } from "@/mock/grants";
import { funds, totalCoFunders, totalMatched } from "@/mock/funds";
import { campaigns } from "@/mock/campaigns";
import { opportunities } from "@/mock/opportunities";
import { stories } from "@/mock/stories";
import { pressReleases } from "@/mock/newsroom";
import { events } from "@/mock/events";
import { finances, impactHeadline } from "@/mock/organisation";
import { IMG } from "@/mock/images";
import { ArrowLink, FocusChip, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { CampaignCard, FocusAreaCard, StoryCard } from "@/components/ui/cards";
import { IndicatorChart, ScenarioLegend } from "@/components/charts/indicator-chart";
import { StackedColumns, StackedBar } from "@/components/charts/bars";
import { NewsletterForm } from "@/components/ui/newsletter";

export function Hero() {
  const h = siteConfig.home;
  return (
    <section className="bg-white">
      <div className="container-x pt-12 md:pt-16 pb-14 md:pb-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 items-center">
        <div className="fade-up">
          <p className="eyebrow mb-5">A pan-African philanthropic foundation · est. {siteConfig.org.founded}</p>
          <h1 className="hd-display text-navy">
            Where you are born should not decide <em className="italic text-[color:var(--cobalt-ink)]">how long you live.</em>
          </h1>
          <p className="lede mt-6 max-w-xl">
            We make evidence-led grants in health, agriculture, financial inclusion, gender equality and education — and we publish every one of them.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={h.heroCta.href} className="btn btn-navy btn-lg">{h.heroCta.label}</Link>
            <Link href={h.heroCtaSecondary.href} className="btn btn-outline btn-lg">{h.heroCtaSecondary.label}</Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2" aria-label="Focus areas">
            {focusAreas.map((f) => (
              <li key={f.slug}><Link href={`/our-work/${f.slug}`} className="chip min-h-[32px] hover:text-navy hover:underline underline-offset-4"><span className="chip-dot" style={{ background: f.color }} aria-hidden="true" />{f.name}</Link></li>
            ))}
          </ul>
        </div>
        <figure className="relative">
          <div className="relative aspect-[5/4] bg-paper-2">
            <Image src={IMG.children} alt="A group of smiling children gathered together, looking at the camera" fill priority sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
          </div>
          <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6 sm:w-[300px] bg-white border border-line p-5 sm:shadow-[0_20px_40px_-24px_rgba(11,31,58,.45)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Child mortality, sub-Saharan Africa</p>
            <p className="mt-2 font-serif text-[2.2rem] leading-none text-navy tabular">−54%</p>
            <p className="mt-1.5 text-[13px] text-ink-2">deaths before age five since 2000 — but progress is slowing.</p>
            <Link href="/progress#child-mortality" className="arrow-link text-[13.5px] !min-h-[36px]">See the data <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
          <figcaption className="caption sm:max-w-[calc(100%-330px)]">Children in Kebbi State, one of the regions served by our seasonal malaria programme.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function FactStrip() {
  return (
    <section className="bg-navy on-dark" aria-label="The foundation in numbers">
      <div className="container-x py-4 md:py-6">
        <StatRow items={impactHeadline as unknown as { value: string; label: string }[]} dark />
      </div>
    </section>
  );
}

export function FocusAreasModule() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our work"
        title="Five focus areas, one goal: a healthy, productive life for every African."
        lede="Each strategy is built on evidence, shaped by African partners and measured against a public results framework."
        action={<ArrowLink href="/our-work">All focus areas</ArrowLink>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {focusAreas.map((f) => <FocusAreaCard key={f.slug} f={f} />)}
        <Link href="/impact" className="bg-paper p-7 flex flex-col justify-between group min-h-[220px]">
          <div>
            <p className="eyebrow">Results</p>
            <p className="mt-3 font-serif text-[1.45rem] leading-snug text-navy">38.4m bed nets. 2.1m farmers. 3.9m pupils. See what our partners achieved.</p>
          </div>
          <span className="arrow-link mt-6 group-hover:underline">Our results <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
      </div>
    </Section>
  );
}

export function ProgressTeaser() {
  const ind = indicators[0];
  return (
    <Section tone="paper">
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 items-start">
        <div>
          <p className="eyebrow">{progressMeta.title} {progressMeta.edition}</p>
          <h2 className="hd-2 text-navy mt-3">Is Africa on track? Eight indicators, three possible futures.</h2>
          <p className="lede mt-5">{ind.headline}</p>
          <ol className="mt-8 border-t border-line">
            {indicators.slice(0, 8).map((i) => (
              <li key={i.slug} className="border-b border-line">
                <Link href={`/progress#${i.slug}`} className="flex items-center justify-between gap-4 min-h-[48px] py-2 group">
                  <span className="flex items-center gap-3">
                    <span className="font-serif text-muted tabular w-6">{String(i.number).padStart(2, "0")}</span>
                    <span className="font-semibold text-navy group-hover:underline underline-offset-4">{i.title}</span>
                  </span>
                  <span className="chip-dot" style={{ background: focusAreas.find((f) => f.slug === i.focus)?.color }} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/progress" className="btn btn-navy mt-8">Read the Progress Report</Link>
        </div>
        <div className="bg-white border border-line p-5 md:p-8">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">Indicator 01 · {ind.title}</p>
          <h3 className="mt-2 font-serif text-[1.5rem] leading-snug text-navy">{ind.question}</h3>
          <p className="text-[13px] text-muted mt-1">{ind.unit}, sub-Saharan Africa</p>
          <ScenarioLegend className="mt-5 hidden sm:block" />
          <div className="mt-4"><IndicatorChart ind={ind} compact /></div>
          <p className="mt-4 text-[12px] text-muted">{ind.source}</p>
        </div>
      </div>
    </Section>
  );
}

export function GrantsTeaser() {
  const latest = [...grants].sort((a, b) => b.year - a.year || b.amountUsd - a.amountUsd).slice(0, 6);
  const keys = [
    { key: "health", label: "Global Health", color: "#0072CE" },
    { key: "agriculture", label: "Agricultural Development", color: "#3E8E41" },
    { key: "finance", label: "Financial Inclusion", color: "#00838F" },
    { key: "education", label: "Education & Digital Skills", color: "#C26A00" },
    { key: "gender", label: "Gender Equality", color: "#B03A78" },
  ];
  return (
    <Section>
      <SectionHeader
        eyebrow="Committed grants"
        title="Every grant we make, published within 30 days."
        lede="Search the full database by grantee, country, focus area, year and amount — and download it as a spreadsheet."
        action={<Link href="/grants" className="btn btn-navy">Search all grants</Link>}
      />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12">
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted mb-4">New commitments by year, US$ millions</h3>
          <StackedColumns
            ariaLabel="Stacked column chart of grant commitments by year and focus area, 2017 to 2025, rising from 495 to 850 million US dollars."
            rows={commitmentsByYear.map((r) => ({ label: String(r.year), values: r }))}
            keys={keys}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table min-w-[520px]">
            <caption className="sr-only">Six most recent large grants</caption>
            <thead>
              <tr><th scope="col">Grantee</th><th scope="col">Focus</th><th scope="col" className="text-right">Amount</th></tr>
            </thead>
            <tbody>
              {latest.map((g) => (
                <tr key={g.id}>
                  <td>
                    <Link href={`/grants/${g.id}`} className="font-semibold text-navy hover:underline underline-offset-4">{g.grantee}</Link>
                    <div className="text-[12.5px] text-muted">{g.country} · {g.year} · {g.durationMonths} months</div>
                  </td>
                  <td><FocusChip slug={g.focus} /></td>
                  <td className="text-right tabular font-semibold text-navy whitespace-nowrap">{formatUsd(g.amountUsd)}<div className="text-[12px] text-muted font-normal">{compactNaira(g.amountUsd * siteConfig.fx.ngnPerUsd)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export function PooledFundsModule() {
  return (
    <section className="bg-navy on-dark py-16 md:py-24 meridian-lines">
      <div className="container-x">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12">
          <div>
            <p className="eyebrow">Co-fund with us</p>
            <h2 className="hd-2 text-white mt-3">Give alongside the foundation. We match every naira.</h2>
            <p className="lede mt-5">{siteConfig.matching.note} The foundation covers all its own costs, so 100% of your gift is granted.</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dark pt-6">
              <div><dt className="text-[13px] text-on-dark-muted">Matched so far</dt><dd className="font-serif text-4xl text-white mt-1">{compactNaira(totalMatched)}</dd></div>
              <div><dt className="text-[13px] text-on-dark-muted">Co-funders</dt><dd className="font-serif text-4xl text-white mt-1">{totalCoFunders.toLocaleString("en-NG")}</dd></div>
            </dl>
            <Link href="/give" className="btn btn-light mt-8">Explore pooled funds</Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-px bg-[color:var(--navy-3)] border border-dark">
            {funds.map((f) => {
              const pct = Math.round((f.raisedNaira / f.goalNaira) * 100);
              return (
                <li key={f.slug} className="bg-navy p-6 flex flex-col">
                  <span className="chip text-on-dark-muted"><span className="chip-dot" style={{ background: focusAreas.find((x) => x.slug === f.focus)?.color }} aria-hidden="true" />{focusName(f.focus)}</span>
                  <h3 className="mt-2 font-serif text-[1.35rem] text-white leading-snug">{f.name}</h3>
                  <p className="mt-1 text-[14px] text-on-dark-muted">{f.tagline}</p>
                  <div className="mt-auto pt-5">
                    <div className="flex justify-between text-[13px] mb-1.5"><span className="text-on-dark-muted">{compactNaira(f.raisedNaira)} of {compactNaira(f.goalNaira)}</span><span className="font-semibold text-white">{pct}%</span></div>
                    <div className="bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></div>
                    <Link href={`/donate?designation=fund:${f.slug}`} className="arrow-link mt-3">Give — matched 1:1 <span className="sr-only">to the {f.name}</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function OpportunitiesModule() {
  const open = opportunities.filter((o) => o.status !== "Closed").slice(0, 3);
  return (
    <Section>
      <SectionHeader eyebrow="For grant seekers" title="Open calls for proposals" action={<ArrowLink href="/how-we-work/grant-opportunities">All opportunities & how to apply</ArrowLink>} />
      <ul className="border-t-2 border-[color:var(--navy)]">
        {open.map((o) => (
          <li key={o.slug} className="border-b border-line">
            <Link href={`/how-we-work/grant-opportunities#${o.slug}`} className="grid md:grid-cols-[minmax(0,1fr)_auto_auto] gap-x-10 gap-y-2 py-6 group items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3"><span className={o.status === "Open" ? "tag tag-open" : "tag tag-soon"}>{o.status}</span><FocusChip slug={o.focus} /></div>
                <h3 className="mt-2 font-serif text-[1.35rem] text-navy group-hover:underline underline-offset-4 leading-snug">{o.title}</h3>
              </div>
              <div className="text-[14px]"><span className="text-muted block text-[12px] uppercase tracking-wider font-bold">Budget</span>{compactUsd(o.budgetMinUsd)}–{compactUsd(o.budgetMaxUsd)}</div>
              <div className="text-[14px]"><span className="text-muted block text-[12px] uppercase tracking-wider font-bold">{o.status === "Open" ? "Deadline" : "Opens"}</span>{formatDate(o.status === "Open" ? o.deadline : o.opens)}{o.status === "Open" && <span className="text-coral font-semibold"> · {daysLeft(o.deadline)} days</span>}</div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function CampaignsModule() {
  return (
    <Section tone="paper">
      <SectionHeader eyebrow="Current appeals" title="Time-bound appeals, matched by the foundation" action={<ArrowLink href="/campaigns">All appeals</ArrowLink>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => <CampaignCard key={c.slug} c={c} />)}
      </div>
    </Section>
  );
}

export function StoriesModule() {
  const [lead, ...rest] = stories;
  return (
    <Section>
      <SectionHeader eyebrow="Ideas & stories" title="From the field and the data" action={<ArrowLink href="/stories">All stories</ArrowLink>} />
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10">
        <StoryCard s={lead} large />
        <div className="grid gap-8">
          {rest.slice(0, 3).map((s) => (
            <article key={s.slug} className="grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-4 sm:gap-5 relative group border-t border-line pt-5">
              <div className="relative aspect-square bg-paper-2"><Image src={s.image} alt={s.imageAlt} fill sizes="120px" className="object-cover" /></div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-cobalt">{s.type}</span>
                <h3 className="mt-1 font-serif text-[1.15rem] leading-snug text-navy"><Link href={`/stories/${s.slug}`} className="group-hover:underline underline-offset-4 after:absolute after:inset-0">{s.title}</Link></h3>
                <p className="mt-1 text-[12.5px] text-muted">{formatDate(s.date)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function NewsroomModule() {
  return (
    <Section tone="paper">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12">
        <div>
          <p className="eyebrow">Newsroom</p>
          <h2 className="hd-2 text-navy mt-3">Press releases & statements</h2>
          <p className="lede mt-4">For media enquiries, contact {siteConfig.brand.mediaEmail}.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/newsroom" className="btn btn-navy">Visit the newsroom</Link>
            <Link href="/newsroom#fact-sheet" className="btn btn-outline"><Download className="w-4 h-4" aria-hidden="true" /> Fact sheet</Link>
          </div>
        </div>
        <ul className="border-t-2 border-[color:var(--navy)]">
          {pressReleases.slice(0, 4).map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/newsroom/${p.slug}`} className="block py-5 group">
                <p className="text-[12.5px] text-muted">{formatDate(p.date, { day: "numeric", month: "long", year: "numeric" })} · {p.location}</p>
                <h3 className="mt-1 font-serif text-[1.2rem] text-navy leading-snug group-hover:underline underline-offset-4">{p.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function TransparencyModule() {
  return (
    <Section>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 items-center">
        <div>
          <p className="eyebrow">Transparency</p>
          <h2 className="hd-2 text-navy mt-3">Of every ₦1,000 we spend, ₦924 goes to partners.</h2>
          <p className="lede mt-5">Audited annually by {siteConfig.org.auditor}. {finances.pooledFundNote}</p>
          <Link href="/transparency" className="btn btn-navy mt-8">Financials & governance</Link>
        </div>
        <div className="border border-line p-6 md:p-8">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted mb-5">{finances.year} expenditure, US$ millions</h3>
          <StackedBar ariaLabel={`Expenditure in ${finances.year} by category`} data={finances.expenditure} format={(n) => `$${n}m`} />
        </div>
      </div>
    </Section>
  );
}

export function EventsModule() {
  const list = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return (
    <Section tone="paper">
      <SectionHeader eyebrow="Events" title="Convenings, briefings & webinars" action={<ArrowLink href="/events">All events</ArrowLink>} />
      <ul className="grid md:grid-cols-3 gap-6">
        {list.map((e) => (
          <li key={e.slug} className="bg-white border border-line p-6 flex gap-5">
            <div className="text-center shrink-0 w-16 border-r border-line pr-5">
              <div className="text-[12px] font-bold uppercase tracking-wider text-cobalt">{formatDate(e.date, { month: "short" })}</div>
              <div className="font-serif text-4xl text-navy leading-none mt-1">{formatDate(e.date, { day: "numeric" })}</div>
            </div>
            <div>
              <span className="tag">{e.type}</span>
              <h3 className="mt-2 font-semibold text-navy leading-snug"><Link href={`/events#${e.slug}`} className="hover:underline underline-offset-4">{e.title}</Link></h3>
              <p className="mt-2 text-[13px] text-muted flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />{e.city} · {e.format}</p>
              <p className="text-[13px] text-muted flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />{e.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function FinalCtaModule() {
  return (
    <section className="relative bg-navy on-dark overflow-hidden">
      <Image src={IMG.lagos} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy)] via-[color:var(--navy)]/90 to-[color:var(--navy)]/40" />
      <div className="container-x relative py-20 md:py-28 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-12 items-end">
        <div>
          <p className="eyebrow">Lagos · Nairobi · Johannesburg</p>
          <h2 className="hd-1 text-white mt-4 max-w-2xl">The tools exist. The question is whether we fund them.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-light btn-lg">Give — matched 1:1</Link>
            <Link href="/partnerships" className="btn btn-ghost-light btn-lg">Partner with us</Link>
            <Link href="/how-we-work/grant-opportunities" className="btn btn-ghost-light btn-lg">Apply for a grant</Link>
          </div>
        </div>
        <div className={cn("border-t border-dark pt-6")}>
          <p className="font-semibold text-white mb-3">Get the Progress Report data in your inbox</p>
          <NewsletterForm dark compact />
        </div>
      </div>
    </section>
  );
}
