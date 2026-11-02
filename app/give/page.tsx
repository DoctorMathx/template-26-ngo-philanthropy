import type { Metadata } from "next";
import Link from "next/link";
import { Building2, HandCoins, Users } from "lucide-react";
import { PageHero, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { FundCard } from "@/components/ui/cards";
import { StackedBar } from "@/components/charts/bars";
import { Accordion } from "@/components/ui/accordion";
import { funds, totalCoFunders, totalMatched, totalRaised } from "@/mock/funds";
import { faqs, partnerTiers } from "@/mock/organisation";
import { compactNaira, formatNaira } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { IMG } from "@/mock/images";
import { MatchCalculator } from "./match-calculator";

export const metadata: Metadata = {
  title: "Give — pooled funds, matched 1:1",
  description: "Co-fund alongside the Meridian Foundation. Individuals and companies can join pooled funds such as the Malaria-Free Africa Fund — every naira matched, zero overhead.",
};

const PALETTE = ["#0B1F3A", "#0072CE", "#00A3AD", "#F2795B"];

export default function GivePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Give" }]}
        eyebrow="Co-funding & giving"
        title="Give alongside the foundation. Every naira matched."
        lede={`Our pooled funds let individuals, families and companies co-fund proven programmes with us. ${siteConfig.matching.note} And because the foundation pays all its own costs, 100% of your gift is granted.`}
        image={IMG.coinsHands}
        imageAlt="Cupped hands holding coins and a handwritten note"
        caption="Every gift to a pooled fund is ring-fenced and audited separately."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#funds" className="btn btn-navy">Choose a fund</a>
          <a href="#calculator" className="btn btn-outline">See your gift doubled</a>
        </div>
      </PageHero>

      <section className="bg-navy on-dark">
        <div className="container-x py-4">
          <StatRow dark items={[{ value: compactNaira(totalRaised), label: "raised by co-funders" }, { value: compactNaira(totalMatched), label: "matched by the foundation" }, { value: totalCoFunders.toLocaleString("en-NG"), label: "individual & corporate co-funders" }, { value: "0%", label: "overhead on pooled-fund gifts" }]} />
        </div>
      </section>

      <Section id="how">
        <SectionHeader eyebrow="How pooled funds work" title="Three steps from your gift to a grant" />
        <ol className="grid md:grid-cols-3 gap-px bg-[color:var(--line)] border border-line">
          {[
            { icon: HandCoins, t: "You give", d: "Choose a fund and give once, monthly or annually — by card, bank transfer or USSD." },
            { icon: Users, t: "We match", d: "The foundation adds a naira for every naira, up to each fund’s annual matching cap." },
            { icon: Building2, t: "Partners deliver", d: "The pooled fund makes audited grants to vetted partners. You get quarterly data on results." },
          ].map((s, i) => (
            <li key={s.t} className="bg-white p-7">
              <div className="flex items-center gap-3"><span className="font-serif text-3xl text-cobalt">{i + 1}</span><s.icon className="w-6 h-6 text-navy" strokeWidth={1.5} aria-hidden="true" /></div>
              <h3 className="mt-4 font-semibold text-navy text-lg">{s.t}</h3>
              <p className="mt-1.5 text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="calculator">
        <SectionHeader eyebrow="Matching calculator" title="See your gift doubled" />
        <MatchCalculator />
      </Section>

      <Section id="funds">
        <SectionHeader eyebrow="Pooled funds" title="Choose a fund" lede="Each fund has a published strategy, a matching cap and a separately audited account." />
        <div className="grid md:grid-cols-2 gap-8">
          {funds.map((f) => <FundCard key={f.slug} f={f} />)}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeader eyebrow="Use of funds" title="Where pooled-fund money goes" />
        <div className="grid md:grid-cols-2 gap-10">
          {funds.map((f) => (
            <div key={f.slug} className="bg-white border border-line p-6">
              <h3 className="font-semibold text-navy mb-4">{f.name}</h3>
              <StackedBar ariaLabel={`Use of funds for ${f.name}`} data={f.uses.map((u, i) => ({ label: u.label, value: u.pct, color: PALETTE[i] }))} format={(n) => `${n}%`} height={20} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="corporate">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12">
          <div>
            <p className="eyebrow">For companies</p>
            <h2 className="hd-2 text-navy mt-3">Corporate co-funding</h2>
            <p className="lede mt-4">Companies can join a pooled fund from {formatNaira(Math.min(...funds.map((f) => f.minCorporate)))} a year, with matching, data dashboards and recognition. For larger, multi-year partnerships see <Link href="/partnerships" className="link">Partner with us</Link>.</p>
            <Link href="/partnerships#enquire" className="btn btn-navy mt-6">Talk to our partnerships team</Link>
          </div>
          <ul className="grid md:grid-cols-3 gap-6">
            {partnerTiers.map((t) => (
              <li key={t.name} className="border-t-4 border-[color:var(--navy)] pt-5">
                <h3 className="font-semibold text-navy text-lg">{t.name}</h3>
                <p className="font-serif text-xl text-cobalt mt-1">{t.range}</p>
                <p className="mt-2 text-[14.5px] text-ink-2">{t.body}</p>
                <ul className="mt-3 space-y-1 text-[13.5px] text-ink-2">{t.perks.map((p) => <li key={p}>— {p}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="hd-2 text-navy mt-3">Giving & matching FAQ</h2>
            <p className="mt-4 text-ink-2">Contact {siteConfig.brand.givingEmail} or WhatsApp {siteConfig.brand.whatsapp}.</p>
          </div>
          <Accordion items={faqs[0].items.concat(faqs[1].items)} />
        </div>
      </Section>
    </>
  );
}
