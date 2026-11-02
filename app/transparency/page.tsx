import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { StackedBar, StackedColumns } from "@/components/charts/bars";
import { board, finances } from "@/mock/organisation";
import { commitmentsByYear } from "@/mock/grants";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Income and expenditure, of every ₦1,000, annual reports and audited accounts, registration, governance and board of trustees.",
};

export default function TransparencyPage() {
  const income = finances.income.reduce((s, x) => s + x.value, 0);
  const spend = finances.expenditure.reduce((s, x) => s + x.value, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Transparency" }]}
        eyebrow="Transparency & financials"
        title="Every grant, every audit, every evaluation — public."
        lede={`Our accounts are audited every year by ${siteConfig.org.auditor}. Pooled funds are audited separately. Here is where the money comes from and where it goes.`}
      />

      <Section>
        <SectionHeader eyebrow={`Financial year ${finances.year}`} title="Income and expenditure" lede="US$ millions. Income exceeds spending in strong market years; the surplus is retained in the endowment to protect future grantmaking." />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="border border-line p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-5"><h3 className="font-semibold text-navy">Income</h3><span className="font-serif text-3xl text-navy">${income}m</span></div>
            <StackedBar ariaLabel={`Income in ${finances.year} by source`} data={finances.income} format={(n) => `$${n}m`} />
          </div>
          <div className="border border-line p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-5"><h3 className="font-semibold text-navy">Expenditure</h3><span className="font-serif text-3xl text-navy">${spend}m</span></div>
            <StackedBar ariaLabel={`Expenditure in ${finances.year} by category`} data={finances.expenditure} format={(n) => `$${n}m`} />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 items-center">
          <div>
            <p className="eyebrow">Of every ₦1,000</p>
            <h2 className="hd-2 text-navy mt-3">Of every ₦1,000 the foundation spends…</h2>
            <p className="lede mt-4">{finances.pooledFundNote}</p>
          </div>
          <div className="bg-white border border-line p-6 md:p-8">
            <div className="flex h-16 w-full" aria-hidden="true">
              {finances.perThousand.map((p, i) => (
                <span key={p.label} className="h-full flex items-end p-2 text-[12px] font-semibold" style={{ width: `${p.amount / 10}%`, background: ["#0B1F3A", "#0072CE", "#F2795B"][i], color: i === 2 ? "#0B1F3A" : "#fff" }}>{p.amount > 100 ? `₦${p.amount}` : ""}</span>
              ))}
            </div>
            <dl className="mt-6 space-y-3">
              {finances.perThousand.map((p, i) => (
                <div key={p.label} className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <dt className="flex items-center gap-2 text-ink-2"><span className="chip-dot" style={{ background: ["#0B1F3A", "#0072CE", "#F2795B"][i] }} aria-hidden="true" />{p.label}</dt>
                  <dd className="font-serif text-2xl text-navy tabular">₦{p.amount}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Trend" title="Grant commitments, 2017–2025" lede="New commitments per year, US$ millions, by focus area." />
        <StackedColumns
          ariaLabel="Stacked column chart of grant commitments by year and focus area"
          rows={commitmentsByYear.map((r) => ({ label: String(r.year), values: r }))}
          keys={[
            { key: "health", label: "Global Health", color: "#0072CE" },
            { key: "agriculture", label: "Agricultural Development", color: "#3E8E41" },
            { key: "finance", label: "Financial Inclusion", color: "#00838F" },
            { key: "education", label: "Education & Digital Skills", color: "#C26A00" },
            { key: "gender", label: "Gender Equality", color: "#B03A78" },
          ]}
        />
      </Section>

      <Section tone="paper" id="reports">
        <SectionHeader eyebrow="Reports" title="Annual reports & audited accounts" />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--line)] border border-line">
          {finances.reports.map((r) => (
            <li key={r.title} className="bg-white">
              <a href="#" className="flex items-center justify-between gap-4 p-6 group min-h-[88px]">
                <span><span className="block font-semibold text-navy group-hover:underline underline-offset-4">{r.title}</span><span className="block text-[13px] text-muted mt-1">{r.meta}</span></span>
                <Download className="w-5 h-5 text-cobalt shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="governance">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-12">
          <div>
            <p className="eyebrow">Governance</p>
            <h2 className="hd-2 text-navy mt-3">Registration, audit & policies</h2>
          </div>
          <dl className="border-t-2 border-[color:var(--navy)]">
            {finances.governance.map((g) => (
              <div key={g.k} className="grid sm:grid-cols-[220px_minmax(0,1fr)] gap-1 sm:gap-6 py-4 border-b border-line">
                <dt className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{g.k}</dt>
                <dd className="text-navy">{g.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="paper" id="board">
        <SectionHeader eyebrow="Board of trustees" title="Who holds us accountable" lede="The board meets quarterly. Its grants committee approves every grant above $1m; its audit & risk committee oversees the external audit." />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {board.map((p) => (
            <li key={p.name} className="border-t-2 border-[color:var(--navy)] pt-4">
              <p className="font-serif text-xl text-navy">{p.name}</p>
              <p className="text-[13.5px] font-semibold text-cobalt mt-1">{p.role}</p>
              <p className="text-[14px] text-ink-2 mt-2">{p.bio}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
