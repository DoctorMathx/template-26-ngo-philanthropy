import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Campaign, FocusArea, PooledFund, Story } from "@/lib/types";
import { compactNaira, daysLeft, formatDate, formatNumber, percent } from "@/lib/utils";
import { FocusChip, FocusIcon, ProgressBar } from "./primitives";
import { compactUsd } from "@/lib/utils";

export function StoryCard({ s, large }: { s: Story; large?: boolean }) {
  return (
    <article className="group relative">
      <div className={large ? "relative aspect-[16/10] bg-paper-2" : "relative aspect-[3/2] bg-paper-2"}>
        <Image src={s.image} alt={s.imageAlt} fill sizes={large ? "(min-width:1024px) 640px, 100vw" : "(min-width:1024px) 400px, 100vw"} className="object-cover" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-cobalt">{s.type}</span>
        <FocusChip slug={s.focus} />
      </div>
      <h3 className={large ? "mt-2 hd-2 text-navy" : "mt-2 font-serif text-[1.4rem] leading-tight text-navy"}>
        <Link href={`/stories/${s.slug}`} className="group-hover:underline underline-offset-4 decoration-1 after:absolute after:inset-0">
          {s.title}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.dek}</p>
      <p className="mt-3 text-[12.5px] text-muted">{formatDate(s.date, { day: "numeric", month: "long", year: "numeric" })} · {s.readMins} min read</p>
    </article>
  );
}

export function CampaignCard({ c }: { c: Campaign }) {
  const pct = percent(c.raised, c.goal);
  return (
    <article className="card card-hover flex flex-col relative">
      <div className="relative aspect-[16/10] bg-paper-2">
        <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width:1024px) 400px, 100vw" className="object-cover" />
        <span className="absolute top-3 left-3 tag tag-solid">Matched 1:1</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <FocusChip slug={c.focus} />
        <h3 className="mt-2 font-serif text-[1.3rem] leading-snug text-navy">
          <Link href={`/campaigns/${c.slug}`} className="hover:underline underline-offset-4 after:absolute after:inset-0">{c.title}</Link>
        </h3>
        <div className="mt-auto pt-6">
          <div className="flex justify-between items-baseline text-[14px] mb-2">
            <span><strong className="text-navy font-serif text-xl">{compactNaira(c.raised)}</strong> <span className="text-muted">of {compactNaira(c.goal)}</span></span>
            <span className="font-semibold text-navy tabular">{pct}%</span>
          </div>
          <ProgressBar value={c.raised} max={c.goal} label={`${pct}% of goal raised`} />
          <div className="mt-3 flex justify-between text-[12.5px] text-muted">
            <span>{formatNumber(c.donors)} donors</span>
            <span>{daysLeft(c.deadline)} days left</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FundCard({ f }: { f: PooledFund }) {
  const pct = percent(f.raisedNaira, f.goalNaira);
  const matchPct = percent(f.matchedNaira, f.matchCapNaira);
  return (
    <article className="card flex flex-col" id={f.slug}>
      <div className="relative aspect-[16/9] bg-paper-2">
        <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <FocusChip slug={f.focus} />
        <h3 className="mt-2 hd-3 text-navy">{f.name}</h3>
        <p className="mt-2 text-[15px] text-ink-2">{f.tagline}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4 text-[13px]">
          <div><dt className="text-muted">Raised</dt><dd className="font-serif text-xl text-navy">{compactNaira(f.raisedNaira)}</dd></div>
          <div><dt className="text-muted">Matched</dt><dd className="font-serif text-xl text-coral">{compactNaira(f.matchedNaira)}</dd></div>
          <div><dt className="text-muted">Co-funders</dt><dd className="font-serif text-xl text-navy">{formatNumber(f.coFunders)}</dd></div>
        </dl>
        <div className="mt-4 text-[13px] text-ink-2">
          <div className="flex justify-between mb-1.5"><span>Towards {compactNaira(f.goalNaira)} goal</span><span className="font-semibold tabular">{pct}%</span></div>
          <ProgressBar value={f.raisedNaira} max={f.goalNaira} label={`${pct}% of fund goal raised`} />
          <div className="flex justify-between mt-3 mb-1.5"><span>Matching used ({compactNaira(f.matchCapNaira)} cap)</span><span className="font-semibold tabular">{matchPct}%</span></div>
          <ProgressBar value={f.matchedNaira} max={f.matchCapNaira} label={`${matchPct}% of matching cap used`} color="var(--coral)" />
        </div>
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          <Link href={`/donate?designation=fund:${f.slug}`} className="btn btn-primary">Give to this fund</Link>
          <Link href={`/donate?designation=fund:${f.slug}&frequency=monthly&amount=10000`} className="btn btn-outline">Give monthly</Link>
        </div>
      </div>
    </article>
  );
}

export function FocusAreaCard({ f }: { f: FocusArea }) {
  return (
    <article className="group relative border-t-4 pt-5" style={{ borderTopColor: f.color }}>
      <div className="flex items-center gap-3">
        <FocusIcon area={f} className="w-6 h-6 text-navy" />
        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">{f.activeGrants} active grants · {compactUsd(f.committedUsd)}</span>
      </div>
      <h3 className="mt-3 font-serif text-[1.55rem] leading-tight text-navy">
        <Link href={`/our-work/${f.slug}`} className="group-hover:underline underline-offset-4 decoration-1 after:absolute after:inset-0">{f.name}</Link>
      </h3>
      <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{f.summary}</p>
      <span className="mt-4 arrow-link" aria-hidden="true">Strategy, data & grants <ArrowRight className="w-4 h-4" /></span>
    </article>
  );
}
