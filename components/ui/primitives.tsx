import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, HeartPulse, Scale, Smartphone, Sprout } from "lucide-react";
import type { Fact, FocusArea, FocusSlug } from "@/lib/types";
import { cn } from "@/lib/utils";
import { focusAreas } from "@/mock/focus-areas";

export const FOCUS_ICONS = { HeartPulse, Sprout, Smartphone, Scale, GraduationCap } as const;

export function Section({ children, tone = "white", className, id, labelledBy }: { children: React.ReactNode; tone?: "white" | "paper" | "navy"; className?: string; id?: string; labelledBy?: string }) {
  const bg = tone === "navy" ? "bg-navy on-dark" : tone === "paper" ? "bg-paper" : "bg-white";
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(bg, "py-16 md:py-24", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, lede, action, id, className, dark }: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; action?: React.ReactNode; id?: string; className?: string; dark?: boolean }) {
  return (
    <div className={cn("grid md:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end mb-10 md:mb-12", className)}>
      <div className="max-w-3xl min-w-0">
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 id={id} className={cn("hd-2", dark ? "text-white" : "text-navy")}>{title}</h2>
        {lede && <p className="lede mt-4">{lede}</p>}
      </div>
      {action && <div className="md:pb-1">{action}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  image,
  imageAlt,
  caption,
  crumbs,
  accent,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  caption?: string;
  crumbs?: { label: string; href?: string }[];
  accent?: string;
}) {
  return (
    <section className="bg-white border-b border-line">
      <div className="container-x pt-8 md:pt-10 pb-12 md:pb-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cn("grid gap-10 items-end", image ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : "")}>
          <div className={cn("max-w-3xl min-w-0", crumbs ? "mt-8" : "")}>
            {accent && <span className="block w-12 h-1 mb-6" style={{ background: accent }} aria-hidden="true" />}
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            <h1 className="hd-1 text-navy">{title}</h1>
            {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {image && (
            <figure>
              <div className="relative aspect-[4/3] bg-paper-2">
                <Image src={image} alt={imageAlt ?? ""} fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
              </div>
              {caption && <figcaption className="caption">{caption}</figcaption>}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items, dark }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  const link = dark ? "hover:text-white" : "hover:text-navy";
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[13px]", dark ? "text-on-dark-muted" : "text-muted")}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className={cn(link, "hover:underline underline-offset-4 inline-flex min-h-[32px] items-center")}>Home</Link></li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {it.href ? <Link href={it.href} className={cn(link, "hover:underline underline-offset-4 inline-flex min-h-[32px] items-center")}>{it.label}</Link> : <span aria-current="page" className={dark ? "text-white" : "text-ink-2"}>{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FactCard({ fact, color, className }: { fact: Fact; color?: string; className?: string }) {
  return (
    <div className={cn("fact", className)} style={color ? { borderTopColor: color } : undefined}>
      <div className={cn("fact-num", fact.highlight ? "text-coral" : "text-navy")}>{fact.value}</div>
      <p className="mt-3 text-[15px] leading-snug text-ink-2">{fact.label}</p>
      <p className="fact-source">{fact.source}</p>
    </div>
  );
}

export function FocusChip({ slug, className }: { slug: FocusSlug; className?: string }) {
  const f = focusAreas.find((x) => x.slug === slug);
  if (!f) return null;
  return (
    <span className={cn("chip", className)}>
      <span className="chip-dot" style={{ background: f.color }} aria-hidden="true" />
      {f.name}
    </span>
  );
}

export function FocusIcon({ area, className }: { area: FocusArea; className?: string }) {
  const I = FOCUS_ICONS[area.icon];
  return <I className={className} strokeWidth={1.5} aria-hidden="true" />;
}

export function Figure({ src, alt, caption, ratio = "aspect-[3/2]", sizes = "(min-width:1024px) 50vw, 100vw", priority }: { src: string; alt: string; caption?: string; ratio?: string; sizes?: string; priority?: boolean }) {
  return (
    <figure>
      <div className={cn("relative bg-paper-2", ratio)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
      {caption && <figcaption className="caption">{caption}</figcaption>}
    </figure>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("arrow-link", className)}>
      {children} <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </Link>
  );
}

export function ProgressBar({ value, max, label, color }: { value: number; max: number; label: string; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <span style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function StatRow({ items, dark }: { items: { value: string; label: string }[]; dark?: boolean }) {
  return (
    <dl className={cn("grid grid-cols-2 lg:grid-cols-4 border-t", dark ? "border-dark" : "border-line")}>
      {items.map((s, i) => (
        <div key={s.label} className={cn("py-6 pr-4", i % 2 === 1 && "pl-4 lg:pl-0", i > 0 && "lg:pl-6 lg:border-l", dark ? "lg:border-dark" : "lg:border-line")}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <div className={cn("font-serif text-[2.4rem] md:text-5xl leading-none tabular", dark ? "text-white" : "text-navy")}>{s.value}</div>
            <div className={cn("mt-2 text-[14px] leading-snug", dark ? "text-on-dark-muted" : "text-ink-2")}>{s.label}</div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
