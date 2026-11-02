import type { Metadata } from "next";
import { Suspense } from "react";
import { FileCheck2, Lock, Scale } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/primitives";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once, monthly or annually to a Meridian Foundation pooled fund or appeal — matched 1:1, zero overhead. Card, bank transfer or USSD.",
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-white border-b border-line">
        <div className="container-x pt-8 pb-10">
          <Breadcrumbs items={[{ label: "Give", href: "/give" }, { label: "Donate" }]} />
          <h1 className="hd-1 text-navy mt-8 max-w-3xl">Make a gift. We’ll match it.</h1>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[13.5px] text-ink-2">
            <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-cobalt" aria-hidden="true" /> Secure, encrypted payment</li>
            <li className="flex items-center gap-2"><Scale className="w-4 h-4 text-cobalt" aria-hidden="true" /> Pooled-fund gifts matched 1:1 · 0% overhead</li>
            <li className="flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-cobalt" aria-hidden="true" /> Instant receipt from a registered not-for-profit</li>
          </ul>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading donation form…</div>}>
        <DonateClient />
      </Suspense>
    </>
  );
}
