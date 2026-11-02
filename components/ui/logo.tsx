import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** Meridian mark: a globe with meridian lines, drawn in SVG. */
export function LogoMark({ className, light }: { className?: string; light?: boolean }) {
  const c = light ? "#FFFFFF" : "#0B1F3A";
  return (
    <svg viewBox="0 0 40 40" className={cn("w-9 h-9", className)} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke={c} strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="8" ry="18" fill="none" stroke={c} strokeWidth="1.5" />
      <line x1="20" y1="2" x2="20" y2="38" stroke="#0072CE" strokeWidth="2" />
      <line x1="3" y1="14" x2="37" y2="14" stroke={c} strokeWidth="1" opacity=".6" />
      <line x1="3" y1="26" x2="37" y2="26" stroke={c} strokeWidth="1" opacity=".6" />
      <circle cx="20" cy="14" r="2.4" fill="#F2795B" />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark light={light} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[1.35rem] tracking-tight", light ? "text-white" : "text-navy")}>{siteConfig.brand.short}</span>
        <span className={cn("text-[9.5px] font-bold tracking-[0.28em] uppercase mt-1", light ? "text-on-dark-muted" : "text-muted")}>Foundation</span>
      </span>
    </span>
  );
}
