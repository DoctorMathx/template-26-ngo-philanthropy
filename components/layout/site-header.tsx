"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { FocusIcon } from "@/components/ui/primitives";
import { mainNav } from "@/mock/navigation";
import { focusAreas } from "@/mock/focus-areas";
import { cn, compactUsd } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus on route change (state-derived, no effect needed).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line" ref={navRef}>
      <div className="container-x flex items-center justify-between h-[72px] gap-3 xl:gap-6">
        <Link href="/" aria-label="Meridian Foundation — home" className="shrink-0 min-h-[44px] flex items-center">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-stretch h-full">
          <ul className="flex items-stretch h-full">
            {mainNav.map((g) => (
              <li key={g.id} className="flex">
                <button
                  type="button"
                  aria-expanded={open === g.id}
                  aria-controls={`mega-${g.id}`}
                  onClick={() => setOpen(open === g.id ? null : g.id)}
                  className={cn(
                    "px-3 xl:px-4 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap text-[14.5px] font-semibold border-b-2 -mb-px transition-colors",
                    open === g.id || active(g.href) ? "border-[color:var(--cobalt)] text-navy" : "border-transparent text-ink-2 hover:text-navy"
                  )}
                >
                  {g.label}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", open === g.id && "rotate-180")} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/grants" className="hidden md:inline-flex btn btn-sm text-navy hover:bg-paper" aria-label="Search committed grants">
            <Search className="w-4 h-4" aria-hidden="true" /> <span className="hidden xl:inline">Search grants</span>
          </Link>
          <Link href="/donate" className="hidden sm:inline-flex btn btn-primary btn-sm">Donate</Link>
          <button type="button" className="lg:hidden w-11 h-11 flex items-center justify-center text-navy" aria-expanded={mobile} aria-controls="mobile-nav" aria-label={mobile ? "Close menu" : "Open menu"} onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menus */}
      {mainNav.map((g) => (
        <div key={g.id} id={`mega-${g.id}`} hidden={open !== g.id} className="hidden lg:block absolute inset-x-0 top-full bg-white border-b border-line shadow-[0_24px_40px_-24px_rgba(11,31,58,.35)]">
          <div className="container-x py-10 grid grid-cols-[minmax(0,1fr)_320px] gap-12">
            {g.kind === "focus" ? (
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <p className="eyebrow">Focus areas</p>
                  <Link href="/our-work" className="arrow-link text-[14px]">All of our work <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                </div>
                <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
                  {focusAreas.map((f) => (
                    <li key={f.slug}>
                      <Link href={`/our-work/${f.slug}`} className="group flex gap-3 py-3 border-t-2 hover:bg-paper -mx-2 px-2" style={{ borderTopColor: f.color }}>
                        <FocusIcon area={f} className="w-5 h-5 mt-0.5 text-navy shrink-0" />
                        <span>
                          <span className="block font-semibold text-navy group-hover:underline underline-offset-4">{f.name}</span>
                          <span className="block text-[13px] text-muted mt-0.5">{f.activeGrants} active grants · {compactUsd(f.committedUsd)} committed</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/impact" className="group flex gap-3 py-3 border-t-2 border-[color:var(--navy)] hover:bg-paper -mx-2 px-2">
                      <span>
                        <span className="block font-semibold text-navy group-hover:underline underline-offset-4">Our results</span>
                        <span className="block text-[13px] text-muted mt-0.5">What our partners achieved, by focus area</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-10">
                {g.columns?.map((col) => (
                  <div key={col.heading}>
                    <p className="eyebrow mb-4">{col.heading}</p>
                    <ul className="space-y-1">
                      {col.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link href={l.href} className="group block py-2.5 -mx-2 px-2 hover:bg-paper">
                            <span className="block font-semibold text-navy group-hover:underline underline-offset-4">{l.label}</span>
                            {l.desc && <span className="block text-[13px] text-muted mt-0.5">{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {g.feature ? (
              <Link href={g.feature.href} className="bg-navy on-dark p-7 flex flex-col justify-between min-h-[220px] group meridian-lines">
                <div>
                  <p className="eyebrow">{g.feature.eyebrow}</p>
                  <p className="mt-3 font-serif text-[1.35rem] leading-snug text-white">{g.feature.title}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sky group-hover:underline underline-offset-4">{g.feature.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
            ) : (
              <div className="bg-paper p-7">
                <p className="eyebrow">Stay informed</p>
                <p className="mt-3 font-serif text-[1.3rem] leading-snug text-navy">Data, grant calls and stories — one email a month.</p>
                <Link href="/#newsletter" className="arrow-link mt-4">Subscribe <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Mobile drawer */}
      <div id="mobile-nav" hidden={!mobile} className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-white overflow-y-auto border-t border-line">
        <nav aria-label="Mobile" className="container-x py-4">
          <ul>
            {mainNav.map((g) => {
              const isOpen = mobileGroup === g.id;
              const links = g.kind === "focus" ? [...focusAreas.map((f) => ({ label: f.name, href: `/our-work/${f.slug}` })), { label: "All of our work", href: "/our-work" }, { label: "Our results", href: "/impact" }, { label: "Progress Report", href: "/progress" }] : g.columns?.flatMap((c) => c.links) ?? [];
              return (
                <li key={g.id} className="border-b border-line">
                  <button type="button" aria-expanded={isOpen} aria-controls={`m-${g.id}`} onClick={() => setMobileGroup(isOpen ? null : g.id)} className="w-full flex items-center justify-between min-h-[56px] font-semibold text-navy text-[17px]">
                    {g.label}
                    <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  <ul id={`m-${g.id}`} hidden={!isOpen} className="pb-3">
                    {links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="flex items-center min-h-[44px] pl-3 text-ink-2 border-l-2 border-line hover:border-[color:var(--cobalt)] hover:text-navy">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href="/donate" className="btn btn-primary">Donate</Link>
            <Link href="/grants" className="btn btn-outline"><Search className="w-4 h-4" aria-hidden="true" /> Grants</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
