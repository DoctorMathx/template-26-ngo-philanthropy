import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, Phone } from "lucide-react";
import { FocusChip, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { factSheet, mediaContacts, pressReleases } from "@/mock/newsroom";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, statements, media contacts, fact sheet and brand assets from the Meridian Foundation.",
};

export default function NewsroomPage() {
  const [lead, ...rest] = pressReleases;
  return (
    <>
      <PageHero crumbs={[{ label: "Newsroom" }]} eyebrow="Newsroom" title="Press releases, facts and media contacts" lede="For interviews, data requests and statements, contact the press office. We aim to respond within four working hours, Monday to Friday.">
        <div className="flex flex-wrap gap-3">
          <a href="#contacts" className="btn btn-navy">Media contacts</a>
          <a href="#fact-sheet" className="btn btn-outline">Fact sheet</a>
          <a href="#assets" className="btn btn-outline">Logos & photos</a>
        </div>
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12">
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted">Latest release</h2>
            <article className="mt-4 border-t-4 border-[color:var(--navy)] pt-6">
              <p className="text-[13px] text-muted">{formatDate(lead.date, { day: "numeric", month: "long", year: "numeric" })} · {lead.location}</p>
              <h3 className="hd-2 text-navy mt-2"><Link href={`/newsroom/${lead.slug}`} className="hover:underline underline-offset-4 decoration-1">{lead.title}</Link></h3>
              <p className="lede mt-4">{lead.summary}</p>
              <Link href={`/newsroom/${lead.slug}`} className="arrow-link mt-3">Read the release →</Link>
            </article>
            <h2 className="mt-14 text-[13px] font-bold uppercase tracking-[0.1em] text-muted">All press releases</h2>
            <ul className="mt-4 border-t-2 border-[color:var(--navy)]">
              {rest.map((p) => (
                <li key={p.slug} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">{formatDate(p.date, { day: "numeric", month: "long", year: "numeric" })} · {p.location} {p.focus && <FocusChip slug={p.focus} />}</div>
                  <h3 className="mt-1 font-serif text-[1.3rem] text-navy leading-snug"><Link href={`/newsroom/${p.slug}`} className="hover:underline underline-offset-4">{p.title}</Link></h3>
                  <p className="mt-1 text-[14.5px] text-ink-2">{p.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-8">
            <div id="contacts" className="bg-navy on-dark p-6 scroll-mt-28">
              <h2 className="font-serif text-2xl text-white">Media contacts</h2>
              <ul className="mt-4 divide-y divide-[color:var(--navy-3)]">
                {mediaContacts.map((c) => (
                  <li key={c.email} className="py-4">
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-[13px] text-on-dark-muted">{c.role} · {c.region}</p>
                    <a href={`mailto:${c.email}`} className="mt-2 flex items-center gap-2 text-[14px] text-sky hover:underline min-h-[36px]"><Mail className="w-4 h-4" aria-hidden="true" />{c.email}</a>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-[14px] text-sky hover:underline min-h-[36px]"><Phone className="w-4 h-4" aria-hidden="true" />{c.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div id="fact-sheet" className="border border-line p-6 scroll-mt-28">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl text-navy">Fact sheet</h2>
                <a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" aria-hidden="true" /> PDF</a>
              </div>
              <dl className="mt-4 text-[14px]">
                {factSheet.map((f) => (
                  <div key={f.k} className="py-3 border-b border-line last:border-b-0">
                    <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted">{f.k}</dt>
                    <dd className="text-navy mt-0.5">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper" id="assets">
        <SectionHeader eyebrow="Brand assets" title="Logos, photography & data" />
        <ul className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Logo pack", d: "SVG and PNG, full colour, navy and reversed.", m: "ZIP · 2.4 MB" },
            { t: "Leadership headshots", d: "High-resolution portraits of the CEO and directors.", m: "ZIP · 18 MB" },
            { t: "Progress Report charts & data", d: "All charts as SVG plus the underlying CSV files (CC BY 4.0).", m: "ZIP · 3.1 MB" },
          ].map((a) => (
            <li key={a.t} className="bg-white border border-line">
              <a href="#" className="block p-6 group h-full">
                <Download className="w-5 h-5 text-cobalt" aria-hidden="true" />
                <p className="mt-3 font-semibold text-navy group-hover:underline underline-offset-4">{a.t}</p>
                <p className="text-[14px] text-ink-2 mt-1">{a.d}</p>
                <p className="text-[12px] font-bold uppercase tracking-wider text-muted mt-3">{a.m}</p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-muted">Please credit photography “Meridian Foundation” unless a photographer is named in the file metadata.</p>
      </Section>
    </>
  );
}
