import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/primitives";
import { GrantsExplorer } from "./grants-explorer";
import { grants, grantCountries } from "@/mock/grants";
import { compactUsd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Committed grants database",
  description: "Search, filter and export every grant the Meridian Foundation has committed — grantee, country, focus area, amount in US$ and naira, year, duration and purpose.",
};

export default function GrantsPage() {
  const total = grants.reduce((s, g) => s + g.amountUsd, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Committed grants" }]}
        eyebrow="Committed grants"
        title="Every grant we make, in one searchable database."
        lede="Grants appear here within 30 days of signature. Filter by focus area, country, year and amount, then export your results as a spreadsheet."
      >
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5 max-w-lg text-[13px]">
          <div><dt className="text-muted">Grants listed</dt><dd className="font-serif text-2xl text-navy">{grants.length}</dd></div>
          <div><dt className="text-muted">Value listed</dt><dd className="font-serif text-2xl text-navy">{compactUsd(total)}</dd></div>
          <div><dt className="text-muted">Countries</dt><dd className="font-serif text-2xl text-navy">{grantCountries.length}</dd></div>
        </dl>
      </PageHero>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading grants…</div>}>
        <GrantsExplorer />
      </Suspense>
    </>
  );
}
