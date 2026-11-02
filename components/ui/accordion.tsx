"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t-2 border-[color:var(--navy)]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${uid}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left min-h-[56px] font-semibold text-navy text-[16.5px] hover:text-[color:var(--cobalt-ink)]"
              >
                {it.q}
                {isOpen ? <Minus className="w-5 h-5 shrink-0" aria-hidden="true" /> : <Plus className="w-5 h-5 shrink-0" aria-hidden="true" />}
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} hidden={!isOpen} className="pb-6 pr-10 text-ink-2 leading-relaxed">
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
