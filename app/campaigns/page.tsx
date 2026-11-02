import type { Metadata } from "next";
import { PageHero, Section, StatRow } from "@/components/ui/primitives";
import { CampaignCard } from "@/components/ui/cards";
import { campaigns } from "@/mock/campaigns";
import { compactNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Appeals",
  description: "Time-bound appeals feeding the foundation’s pooled funds — live progress, donors and days left. Every gift matched 1:1.",
};

export default function CampaignsPage() {
  const raised = campaigns.reduce((s, c) => s + c.raised, 0);
  const goal = campaigns.reduce((s, c) => s + c.goal, 0);
  const donors = campaigns.reduce((s, c) => s + c.donors, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Give", href: "/give" }, { label: "Appeals" }]}
        eyebrow="Current appeals"
        title="Appeals with a deadline — and a match."
        lede="Each appeal funds a specific, costed piece of work within one of our pooled funds. The foundation matches every naira, and we report back with data when it’s done."
      />
      <section className="bg-navy on-dark"><div className="container-x py-4"><StatRow dark items={[{ value: compactNaira(raised), label: "raised across live appeals" }, { value: compactNaira(goal), label: "combined goal" }, { value: donors.toLocaleString("en-NG"), label: "donors so far" }, { value: "1:1", label: "foundation match on every gift" }]} /></div></section>
      <Section tone="paper">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </Section>
    </>
  );
}
