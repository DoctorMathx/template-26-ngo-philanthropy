import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui/primitives";
import { Accordion } from "@/components/ui/accordion";
import { faqs } from "@/mock/organisation";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about giving and matching, receipts and tax, applying for grants, and using our data.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "FAQ" }]} eyebrow="Help" title="Frequently asked questions" lede="Can’t find what you need? Contact us and the right team will reply within two working days." />
      <Section>
        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-12">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 self-start">
            <ul className="space-y-1">
              {faqs.map((g) => (
                <li key={g.group}><a href={`#${g.group.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="block min-h-[44px] leading-[44px] text-ink-2 hover:text-navy font-semibold">{g.group}</a></li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-outline mt-6">Contact us</Link>
          </nav>
          <div className="space-y-14">
            {faqs.map((g) => (
              <section key={g.group} id={g.group.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                <h2 className="hd-3 text-navy mb-4">{g.group}</h2>
                <Accordion items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
