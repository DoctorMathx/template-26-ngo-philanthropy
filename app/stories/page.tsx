import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/primitives";
import { StoryCard } from "@/components/ui/cards";
import { stories } from "@/mock/stories";

export const metadata: Metadata = {
  title: "Stories & perspectives",
  description: "Features, data stories, perspectives and grantee voices from the Meridian Foundation.",
};

export default function StoriesPage() {
  const [lead, ...rest] = stories;
  return (
    <>
      <PageHero crumbs={[{ label: "Stories" }]} eyebrow="Ideas & stories" title="Stories from the field and the data" lede="Features, data stories, perspectives from our leaders and first-person accounts from grantees." />
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 pb-12 border-b border-line">
          <StoryCard s={lead} large />
          <div className="self-center">
            <p className="eyebrow">Featured</p>
            <p className="mt-3 font-serif text-[1.5rem] leading-snug text-navy">“{lead.body.find((b) => b.quote)?.quote}”</p>
            {lead.stat && (
              <div className="fact mt-8">
                <div className="fact-num text-coral">{lead.stat.value}</div>
                <p className="mt-2 text-[15px] text-ink-2">{lead.stat.label}</p>
                <p className="fact-source">{lead.stat.source}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
