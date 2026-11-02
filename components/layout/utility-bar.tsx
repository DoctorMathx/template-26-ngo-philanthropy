import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function UtilityBar() {
  return (
    <div className="bg-navy on-dark text-[13px]">
      <div className="container-x flex items-center justify-between gap-4 min-h-[40px]">
        <p className="truncate">
          <span className="text-sky font-semibold">New:</span> The 2026 Progress Report — eight indicators, three scenarios to 2035.{" "}
          <Link href="/progress" className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-2 min-h-[40px]">Read it <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></Link>
        </p>
        <nav aria-label="Utility" className="hidden md:flex items-center gap-5 shrink-0">
          <Link href="/newsroom" className="text-on-dark-muted hover:text-white min-h-[40px] inline-flex items-center">Newsroom</Link>
          <Link href="/how-we-work/grant-opportunities" className="text-on-dark-muted hover:text-white min-h-[40px] inline-flex items-center">For grantees</Link>
          <Link href="/contact" className="text-on-dark-muted hover:text-white min-h-[40px] inline-flex items-center">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
