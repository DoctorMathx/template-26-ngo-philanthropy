import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Breadcrumbs, Figure, FocusChip, ProgressBar, Section } from "@/components/ui/primitives";
import { HBarChart } from "@/components/charts/bars";
import { campaigns, getCampaign } from "@/mock/campaigns";
import { getFund } from "@/mock/funds";
import { compactNaira, daysLeft, formatDate, formatNaira, formatNumber, percent } from "@/lib/utils";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Appeal not found" };
  return { title: c.title, description: c.summary };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const fund = getFund(c.fund);
  const pct = percent(c.raised, c.goal);
  const days = daysLeft(c.deadline);
  const budgetTotal = c.budget.reduce((s, b) => s + b.amount, 0);
  const donateHref = (amount?: number, frequency?: string) => {
    const p = new URLSearchParams({ campaign: c.slug });
    if (amount) p.set("amount", String(amount));
    if (frequency) p.set("frequency", frequency);
    return `/donate?${p.toString()}`;
  };

  return (
    <>
      <section className="bg-white border-b border-line">
        <div className="container-x pt-8 pb-12">
          <Breadcrumbs items={[{ label: "Appeals", href: "/campaigns" }, { label: c.title }]} />
          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3"><span className="tag tag-solid">Matched 1:1</span><FocusChip slug={c.focus} /></div>
              <h1 className="hd-1 text-navy mt-4">{c.title}</h1>
              <p className="lede mt-4">{c.summary}</p>
              <p className="mt-4 text-[14px] text-muted flex items-center gap-1.5"><MapPin className="w-4 h-4" aria-hidden="true" />{c.location}</p>
            </div>
            <div className="border border-line border-t-4 border-t-[color:var(--navy)] p-6">
              <div className="font-serif text-4xl text-navy tabular">{formatNaira(c.raised)}</div>
              <p className="text-[14px] text-muted">raised of {formatNaira(c.goal)} goal</p>
              <div className="mt-4"><ProgressBar value={c.raised} max={c.goal} label={`${pct}% of goal raised`} /></div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-[13px]">
                <div><dt className="text-muted">Funded</dt><dd className="font-serif text-2xl text-navy">{pct}%</dd></div>
                <div><dt className="text-muted">Donors</dt><dd className="font-serif text-2xl text-navy">{formatNumber(c.donors)}</dd></div>
                <div><dt className="text-muted">Days left</dt><dd className="font-serif text-2xl text-coral">{days}</dd></div>
              </dl>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {c.presets.map((a) => <Link key={a} href={donateHref(a)} className="btn btn-outline">{compactNaira(a)}</Link>)}
              </div>
              <Link href={donateHref()} className="btn btn-primary btn-lg w-full mt-3">Give to this appeal</Link>
              <Link href={donateHref(c.presets[0], "monthly")} className="block text-center text-[14px] font-semibold text-cobalt hover:underline mt-3 min-h-[44px] leading-[44px]">Or give {compactNaira(c.presets[0])} monthly</Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12">
          <div>
            <Figure src={c.image} alt={c.imageAlt} caption={c.caption} priority />
            <div className="prose-body mt-6">
              {c.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <h2 className="hd-2 text-navy mt-14">Use of funds</h2>
            <p className="mt-2 text-ink-2">Costed budget for this appeal ({formatNaira(budgetTotal)}).</p>
            <div className="mt-6 border border-line p-6">
              <HBarChart ariaLabel="Appeal budget breakdown" data={c.budget.map((b) => ({ label: b.label, value: b.amount, display: compactNaira(b.amount), color: "var(--navy)" }))} />
            </div>

            <h2 className="hd-2 text-navy mt-14">Updates</h2>
            <ol className="mt-6 border-l-2 border-line pl-6 space-y-8">
              {c.updates.map((u) => (
                <li key={u.date} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 bg-[color:var(--cobalt)]" aria-hidden="true" />
                  <p className="text-[13px] text-muted">{formatDate(u.date, { day: "numeric", month: "long", year: "numeric" })}</p>
                  <h3 className="font-semibold text-navy mt-1">{u.title}</h3>
                  <p className="text-ink-2 mt-1">{u.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="space-y-8">
            <div className="bg-paper p-6">
              <h2 className="font-semibold text-navy">Recent donors</h2>
              <ul className="mt-3 divide-y divide-[color:var(--line)]">
                {c.recentDonors.map((d, i) => (
                  <li key={i} className="flex justify-between gap-3 py-3 text-[14px]">
                    <span><span className="text-navy font-medium">{d.name}</span><span className="block text-[12px] text-muted">{d.when}</span></span>
                    <span className="font-semibold text-navy tabular">{formatNaira(d.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {fund && (
              <div className="border border-line p-6">
                <p className="eyebrow">Part of</p>
                <h2 className="font-serif text-xl text-navy mt-2">{fund.name}</h2>
                <p className="mt-2 text-[14px] text-ink-2">{fund.tagline}</p>
                <Link href={`/give#${fund.slug}`} className="arrow-link">About the fund →</Link>
              </div>
            )}
            <div className="bg-navy on-dark p-6">
              <p className="font-serif text-xl text-white">Every naira matched — until {formatDate(c.deadline, { day: "numeric", month: "long" })}.</p>
              <Link href={donateHref()} className="btn btn-light w-full mt-5">Give now</Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
