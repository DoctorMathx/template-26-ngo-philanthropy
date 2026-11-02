"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky chapter index with scroll-spy for the Progress Report. */
export function ProgressNav({ items }: { items: { slug: string; number: number; title: string; color: string }[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Indicators" className="sticky top-[96px]">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted mb-3">Indicators</p>
      <ol className="border-l border-line">
        {items.map((i) => (
          <li key={i.slug}>
            <a
              href={`#${i.slug}`}
              aria-current={active === i.slug ? "true" : undefined}
              className={cn(
                "flex items-center gap-3 min-h-[40px] pl-4 -ml-px border-l-2 text-[14px] transition-colors",
                active === i.slug ? "font-semibold text-navy" : "border-transparent text-ink-2 hover:text-navy"
              )}
              style={active === i.slug ? { borderLeftColor: i.color } : undefined}
            >
              <span className="font-serif text-muted tabular w-5">{String(i.number).padStart(2, "0")}</span>
              {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
