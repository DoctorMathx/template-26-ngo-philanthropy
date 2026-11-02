import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, SectionHeader, FocusIcon } from "@/components/ui/primitives";
import { HBarChart } from "@/components/charts/bars";
import { focusAreas } from "@/mock/focus-areas";
import { compactUsd, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our work",
  description: "Global Health, Agricultural Development, Financial Inclusion, Gender Equality and Education & Digital Skills — the foundation’s five focus areas.",
};

export default function OurWorkPage() {
  const total = focusAreas.reduce((s, f) => s + f.committedUsd, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our work" }]}
        eyebrow="Our work"
        title="Five focus areas. One results framework. Every grant public."
        lede="Our programmes are organised into five focus areas. Each has a published strategy, a set of continental indicators we track every year, and a team based in Lagos, Nairobi or Johannesburg."
      />

      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 items-start">
          <div>
            <SectionHeader eyebrow="Where the money goes" title="Grants committed since 2009, by focus area" className="!mb-6" />
            <p className="text-ink-2">Global Health remains our largest area of investment, but Financial Inclusion and Education are the fastest-growing portfolios. In total we have committed {compactUsd(total)} through these five strategies.</p>
          </div>
          <div className="border border-line p-6 md:p-8">
            <HBarChart
              ariaLabel="Horizontal bar chart of cumulative grants committed by focus area"
              data={focusAreas.map((f) => ({ label: f.name, value: f.committedUsd, color: f.color, display: compactUsd(f.committedUsd) }))}
            />
            <p className="text-[12px] text-muted mt-5">Cumulative commitments, US$, 2009–September 2026.</p>
          </div>
        </div>
      </Section>

      <section className="bg-paper py-4">
        {focusAreas.map((f, i) => (
          <article key={f.slug} className="container-x py-12 md:py-16 border-b border-line last:border-b-0">
            <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <figure>
                <div className="relative aspect-[3/2] bg-paper-2">
                  <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                </div>
                <figcaption className="caption">{f.caption}</figcaption>
              </figure>
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-1" style={{ background: f.color }} aria-hidden="true" />
                  <FocusIcon area={f} className="w-5 h-5 text-navy" />
                </div>
                <h2 className="hd-2 text-navy mt-4">{f.name}</h2>
                <p className="mt-3 font-serif italic text-[1.25rem] text-ink-2">{f.tagline}</p>
                <p className="mt-4 text-ink-2 leading-relaxed">{f.summary}</p>
                <dl className="mt-6 grid grid-cols-3 border-t border-line pt-4 gap-4 text-[13px]">
                  <div><dt className="text-muted">Committed</dt><dd className="font-serif text-2xl text-navy">{compactUsd(f.committedUsd)}</dd></div>
                  <div><dt className="text-muted">Active grants</dt><dd className="font-serif text-2xl text-navy">{formatNumber(f.activeGrants)}</dd></div>
                  <div><dt className="text-muted">Countries</dt><dd className="font-serif text-2xl text-navy">{f.countries.length}</dd></div>
                </dl>
                <Link href={`/our-work/${f.slug}`} className="btn btn-navy mt-7">Explore {f.short.toLowerCase()} strategy <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
