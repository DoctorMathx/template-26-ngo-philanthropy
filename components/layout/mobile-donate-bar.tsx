"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate")) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line px-4 py-3 flex gap-2 no-print" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <Link href="/give" className="btn btn-outline flex-1 min-w-0 px-3">Pooled funds</Link>
      <Link href="/donate" className="btn btn-primary flex-[1.4] min-w-0 px-3">Donate · matched 1:1</Link>
    </div>
  );
}
