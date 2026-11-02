import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs, FocusChip, Section } from "@/components/ui/primitives";
import { getGrant, grants } from "@/mock/grants";
import { getFocusArea } from "@/mock/focus-areas";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, formatUsd } from "@/lib/utils";

export function generateStaticParams() {
  return grants.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const g = getGrant(id);
  if (!g) return { title: "Grant not found" };
  return { title: `${g.grantee} — ${formatUsd(g.amountUsd)} (${g.year})`, description: g.purpose };
}

export default async function GrantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGrant(id);
  if (!g) notFound();
  const f = getFocusArea(g.focus)!;
  const similar = grants.filter((x) => x.focus === g.focus && x.id !== g.id).slice(0, 4);
  const endYear = g.year + Math.floor(g.durationMonths / 12);

  return (
    <>
      <section className="bg-white border-b border-line">
        <div className="container-x pt-8 pb-12">
          <Breadcrumbs items={[{ label: "Committed grants", href: "/grants" }, { label: g.id }]} />
          <div className="mt-8 max-w-4xl">
            <span className="block w-12 h-1 mb-6" style={{ background: f.color }} aria-hidden="true" />
            <FocusChip slug={g.focus} />
            <h1 className="hd-1 text-navy mt-3">{g.grantee}</h1>
            <p className="lede mt-5">{g.purpose}</p>
          </div>
        </div>
      </section>
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-12">
          <dl className="border-t-2 border-[color:var(--navy)]">
            {[
              ["Grant ID", g.id],
              ["Amount committed", `${formatUsd(g.amountUsd)} (≈ ${formatNaira(g.amountUsd * siteConfig.fx.ngnPerUsd)})`],
              ["Date committed", String(g.year)],
              ["Duration", `${g.durationMonths} months (${g.year}–${endYear})`],
              ["Grant type", g.type],
              ["Country", g.country],
              ["Region", g.region],
              ["Focus area", f.name],
              ["Focus-area lead", f.director.name],
            ].map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[200px_minmax(0,1fr)] gap-1 sm:gap-6 py-4 border-b border-line">
                <dt className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{k}</dt>
                <dd className="text-navy font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <aside>
            <div className="bg-paper p-6">
              <p className="eyebrow">About this grant</p>
              <p className="mt-3 text-[14.5px] text-ink-2">This record is part of our committed grants database. Naira equivalents use a fixed reporting rate of ₦{siteConfig.fx.ngnPerUsd.toLocaleString("en-NG")}/US$. For questions, contact {siteConfig.brand.grantsEmail}.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/our-work/${f.slug}`} className="btn btn-navy btn-sm">{f.name} strategy</Link>
                <Link href="/grants" className="btn btn-outline btn-sm"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> All grants</Link>
              </div>
            </div>
            <h2 className="mt-10 text-[13px] font-bold uppercase tracking-[0.1em] text-muted">Similar grants</h2>
            <ul className="mt-3 border-t border-line">
              {similar.map((s) => (
                <li key={s.id} className="border-b border-line py-3">
                  <Link href={`/grants/${s.id}`} className="font-semibold text-navy hover:underline underline-offset-4">{s.grantee}</Link>
                  <p className="text-[12.5px] text-muted">{s.country} · {s.year} · {formatUsd(s.amountUsd)}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
