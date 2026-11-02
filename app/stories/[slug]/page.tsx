import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Figure, FocusChip, Section } from "@/components/ui/primitives";
import { StoryCard } from "@/components/ui/cards";
import { getStory, stories } from "@/mock/stories";
import { getFocusArea } from "@/mock/focus-areas";
import { funds } from "@/mock/funds";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.dek, openGraph: { type: "article", title: s.title, description: s.dek, images: [{ url: s.image }] } };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const f = getFocusArea(s.focus)!;
  const fund = funds.find((x) => x.focus === s.focus);
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-white">
          <div className="container-x pt-8">
            <Breadcrumbs items={[{ label: "Stories", href: "/stories" }, { label: s.type }]} />
          </div>
          <div className="container-narrow pt-10 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-cobalt">{s.type}</span>
              <FocusChip slug={s.focus} />
            </div>
            <h1 className="hd-1 text-navy mt-4">{s.title}</h1>
            <p className="lede mt-5">{s.dek}</p>
            <p className="mt-6 text-[14px] text-ink-2 border-t border-line pt-4">
              By <strong className="text-navy">{s.author}</strong>, {s.authorRole} · {formatDate(s.date, { day: "numeric", month: "long", year: "numeric" })} · {s.readMins} min read
            </p>
          </div>
          <div className="container-x max-w-[1040px]">
            <Figure src={s.image} alt={s.imageAlt} caption={s.caption} ratio="aspect-[16/9]" sizes="(min-width:1040px) 1040px, 100vw" priority />
          </div>
        </header>
        <div className="container-narrow py-12 md:py-16">
          <div className="prose-body">
            {s.body.map((b, i) => (b.h ? <h2 key={i}>{b.h}</h2> : b.quote ? <blockquote key={i}>“{b.quote}”</blockquote> : <p key={i}>{b.p}</p>))}
          </div>
          {s.stat && (
            <aside className="fact mt-12 bg-paper p-6" style={{ borderTopColor: f.color }}>
              <div className="fact-num text-coral">{s.stat.value}</div>
              <p className="mt-2 text-[15px] text-ink-2">{s.stat.label}</p>
              <p className="fact-source">{s.stat.source}</p>
            </aside>
          )}
          <div className="mt-12 border-t-2 border-[color:var(--navy)] pt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[13px] text-muted">Focus area</p>
              <Link href={`/our-work/${f.slug}`} className="arrow-link">{f.name} strategy →</Link>
            </div>
            {fund && (
              <div>
                <p className="text-[13px] text-muted">Support this work</p>
                <Link href={`/donate?designation=fund:${fund.slug}`} className="arrow-link">Give to the {fund.name} →</Link>
              </div>
            )}
          </div>
        </div>
      </article>
      <Section tone="paper">
        <h2 className="hd-3 text-navy mb-8">More stories</h2>
        <div className="grid md:grid-cols-3 gap-8">{more.map((m) => <StoryCard key={m.slug} s={m} />)}</div>
      </Section>
    </>
  );
}
