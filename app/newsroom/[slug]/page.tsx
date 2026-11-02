import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, FocusChip } from "@/components/ui/primitives";
import { getPressRelease, mediaContacts, pressReleases } from "@/mock/newsroom";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return pressReleases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPressRelease(slug);
  if (!p) return { title: "Press release not found" };
  return { title: p.title, description: p.summary };
}

export default async function PressReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPressRelease(slug);
  if (!p) notFound();
  const contact = mediaContacts[0];
  return (
    <article className="bg-white">
      <div className="container-x pt-8"><Breadcrumbs items={[{ label: "Newsroom", href: "/newsroom" }, { label: "Press release" }]} /></div>
      <div className="container-narrow py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-3"><span className="tag">Press release</span>{p.focus && <FocusChip slug={p.focus} />}</div>
        <h1 className="hd-1 text-navy mt-4">{p.title}</h1>
        <p className="lede mt-5">{p.summary}</p>
        <div className="prose-body mt-8 border-t border-line pt-4">
          {p.body.map((para, i) => <p key={i}>{i === 0 ? <><strong className="text-navy">{p.location.toUpperCase()}, {formatDate(p.date, { day: "numeric", month: "long", year: "numeric" })} —</strong> {para}</> : para}</p>)}
          <h2>About the Meridian Foundation</h2>
          <p>{siteConfig.brand.description} Registered as {siteConfig.org.legalName}.</p>
          <p className="text-center">###</p>
        </div>
        <div className="mt-10 bg-paper p-6">
          <p className="eyebrow">Media contact</p>
          <p className="mt-2 font-semibold text-navy">{contact.name}, {contact.role}</p>
          <p className="text-[14px] text-ink-2"><a href={`mailto:${contact.email}`} className="link">{contact.email}</a> · {contact.phone}</p>
        </div>
        <Link href="/newsroom" className="arrow-link mt-8">← All press releases</Link>
      </div>
    </article>
  );
}
