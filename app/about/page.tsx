import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { board, history, impactHeadline, leadership, mission, values, vision } from "@/mock/organisation";
import { siteConfig } from "@/lib/site-config";
import { IMG } from "@/mock/images";

export const metadata: Metadata = {
  title: "About the foundation",
  description: "Mission, vision, values, history, leadership and board of trustees of the Meridian Foundation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About the foundation"
        title="A family foundation with a continental mandate."
        lede={`Endowed in ${siteConfig.org.founded} by ${siteConfig.org.endowedBy}, the Meridian Foundation is one of Africa’s largest private philanthropies — headquartered in Lagos, with offices in Nairobi and Johannesburg.`}
        image={IMG.lagos}
        imageAlt="Aerial view of Lagos with roads, buildings and the lagoon"
        caption="Lagos, home to the foundation’s headquarters since 2009."
      />

      <section className="bg-navy on-dark"><div className="container-x py-4"><StatRow dark items={impactHeadline as unknown as { value: string; label: string }[]} /></div></section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="border-t-4 border-[color:var(--navy)] pt-5">
            <p className="eyebrow">Mission</p>
            <p className="mt-3 font-serif text-[1.8rem] leading-snug text-navy">{mission}</p>
          </div>
          <div className="border-t-4 border-[color:var(--cobalt)] pt-5">
            <p className="eyebrow">Vision</p>
            <p className="mt-3 font-serif text-[1.8rem] leading-snug text-navy">{vision}</p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeader eyebrow="Values" title="How we behave" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((v) => (
            <li key={v.title} className="border-t-2 border-[color:var(--navy)] pt-4">
              <h3 className="font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-[14.5px] text-ink-2">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="history">
        <SectionHeader eyebrow="History" title="Seventeen years of grantmaking" />
        <ol className="relative border-t-2 border-[color:var(--navy)] grid sm:grid-cols-2 lg:grid-cols-4">
          {history.map((h) => (
            <li key={h.year} className="py-6 pr-6 border-b border-line lg:[&:nth-child(-n+4)]:border-b">
              <span className="font-serif text-4xl text-cobalt">{h.year}</span>
              <h3 className="mt-2 font-semibold text-navy">{h.title}</h3>
              <p className="mt-1 text-[14.5px] text-ink-2">{h.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="leadership">
        <SectionHeader eyebrow="Leadership" title="Executive team" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((p) => (
            <li key={p.name}>
              <div className="relative aspect-[4/5] bg-paper-2">
                {p.image && <Image src={p.image} alt={`Portrait of ${p.name}`} fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover grayscale-[20%]" />}
              </div>
              <p className="mt-4 font-serif text-xl text-navy">{p.name}</p>
              <p className="text-[13.5px] font-semibold text-cobalt">{p.role}</p>
              <p className="text-[12.5px] text-muted">{p.office}</p>
              <p className="mt-2 text-[14px] text-ink-2">{p.bio}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[12.5px] text-muted">All people shown are fictional; portraits are placeholder stock photography.</p>
      </Section>

      <Section id="board">
        <SectionHeader eyebrow="Governance" title="Board of trustees" action={<Link href="/transparency#governance" className="btn btn-outline">Governance & policies</Link>} />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {board.map((p) => (
            <li key={p.name} className="border-t-2 border-[color:var(--navy)] pt-4">
              <p className="font-serif text-xl text-navy">{p.name}</p>
              <p className="text-[13.5px] font-semibold text-cobalt mt-1">{p.role}</p>
              <p className="text-[14px] text-ink-2 mt-2">{p.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <SectionHeader eyebrow="Offices" title="Lagos · Nairobi · Johannesburg" />
        <ul className="grid md:grid-cols-3 gap-8">
          {siteConfig.offices.map((o, i) => (
            <li key={o.city}>
              <div className="relative aspect-[3/2] bg-paper-2"><Image src={[IMG.lagos, IMG.nairobi, IMG.johannesburg][i]} alt={`${o.city} skyline`} fill sizes="(min-width:768px) 400px, 100vw" className="object-cover" /></div>
              <p className="mt-4 font-serif text-2xl text-navy">{o.city}</p>
              <p className="text-[13.5px] font-semibold text-cobalt">{o.role}</p>
              <p className="mt-1 text-[14px] text-ink-2">{o.address}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
