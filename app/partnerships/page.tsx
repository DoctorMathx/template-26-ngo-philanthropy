import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, Section, SectionHeader, StatRow } from "@/components/ui/primitives";
import { SmartForm } from "@/components/ui/smart-form";
import { fundingPartners, grantManagement, partnerTiers } from "@/mock/organisation";
import { focusAreas } from "@/mock/focus-areas";
import { funds } from "@/mock/funds";
import { siteConfig } from "@/lib/site-config";
import { IMG } from "@/mock/images";

export const metadata: Metadata = {
  title: "Partner with us",
  description: "Co-fund with the Meridian Foundation: partnership tiers for corporates, foundations and bilateral funders, how co-funding is managed, current partners and a proposal enquiry form.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partner with us" }]}
        eyebrow="Funding partnerships"
        title="Put your capital behind what works — with a partner that pays its own way."
        lede="Companies, foundations, family offices and bilateral funders co-invest with us through pooled funds and programme partnerships. We bring due diligence, African networks and rigorous measurement; the endowment covers our costs."
        image={IMG.handshake}
        imageAlt="Two people shaking hands across a table"
        caption="Signing a co-funding agreement for the Smallholder Prosperity Fund."
      >
        <a href="#enquire" className="btn btn-navy">Start a conversation</a>
      </PageHero>

      <section className="bg-navy on-dark"><div className="container-x py-4"><StatRow dark items={[{ value: "48", label: "institutional co-funders" }, { value: "$118m", label: "co-funding received in 2025" }, { value: "0%", label: "overhead deducted from co-funding" }, { value: "100%", label: "of pooled funds independently audited" }]} /></div></section>

      <Section>
        <SectionHeader eyebrow="Why partner with us" title="What co-funders get" />
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: "Proven pipeline", d: "Access to 522 vetted, active grantees and a pipeline of evidence-backed programmes in 31 countries." },
            { t: "Leverage", d: "Our match and our convening power multiply your contribution — and bring governments to the table." },
            { t: "Data you can report", d: "Quarterly dashboards aligned to SDG indicators; ESG and CSR-ready reporting." },
            { t: "Zero overhead", d: "The endowment pays our operating costs. Every naira you commit is granted." },
          ].map((x) => (
            <li key={x.t} className="border-t-2 border-[color:var(--navy)] pt-4">
              <h3 className="font-semibold text-navy text-lg">{x.t}</h3>
              <p className="mt-2 text-ink-2">{x.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="tiers">
        <SectionHeader eyebrow="Partnership tiers" title="Three ways to co-fund" />
        <div className="grid md:grid-cols-3 gap-6">
          {partnerTiers.map((t, i) => (
            <div key={t.name} className={i === 2 ? "bg-navy on-dark p-7" : "bg-white border border-line p-7"}>
              <h3 className={i === 2 ? "font-serif text-2xl text-white" : "font-serif text-2xl text-navy"}>{t.name}</h3>
              <p className={i === 2 ? "mt-1 font-semibold text-sky" : "mt-1 font-semibold text-cobalt"}>{t.range}</p>
              <p className={i === 2 ? "mt-3 text-on-dark-muted" : "mt-3 text-ink-2"}>{t.body}</p>
              <ul className="mt-5 space-y-2 text-[14.5px]">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2.5"><Check className={i === 2 ? "w-4 h-4 mt-1 text-sky shrink-0" : "w-4 h-4 mt-1 text-cobalt shrink-0"} aria-hidden="true" /><span className={i === 2 ? "text-on-dark" : "text-ink-2"}>{p}</span></li>
                ))}
              </ul>
              <a href="#enquire" className={i === 2 ? "btn btn-light w-full mt-7" : "btn btn-outline w-full mt-7"}>Enquire about {t.name.toLowerCase()}</a>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Current partners" title="Who we co-fund with" lede="A selection of the companies, foundations and funders co-investing with us in 2026." />
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[color:var(--line)] border border-line">
          {fundingPartners.map((p) => (
            <li key={p.name} className="bg-white min-h-[120px] flex flex-col items-center justify-center text-center px-4 py-6">
              <span className="font-serif text-[1.2rem] text-navy leading-tight tracking-tight">{p.name}</span>
              <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{p.type} · {p.tier}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="stewardship">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <div>
            <p className="eyebrow">Stewardship</p>
            <h2 className="hd-2 text-navy mt-3">How grant funds are managed</h2>
            <p className="lede mt-4">The same controls that govern our $4.2bn endowment apply to every naira of co-funding.</p>
          </div>
          <ol className="border-t-2 border-[color:var(--navy)]">
            {grantManagement.map((g, i) => (
              <li key={g.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 py-5 border-b border-line">
                <span className="font-serif text-2xl text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="font-semibold text-navy">{g.title}</h3><p className="mt-1 text-ink-2">{g.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="enquire">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 className="hd-2 text-navy mt-3">Propose a partnership</h2>
            <p className="lede mt-4">Tell us about your organisation and interests. A member of our partnerships team will reply within three working days.</p>
            <p className="mt-6 text-ink-2">Or email <a className="link" href={`mailto:${siteConfig.brand.partnershipsEmail}`}>{siteConfig.brand.partnershipsEmail}</a></p>
          </div>
          <div className="border border-line p-6 md:p-8">
            <SmartForm
              submitLabel="Send enquiry"
              successTitle="Thank you — we’ll be in touch"
              successBody="Our partnerships team will reply within three working days with suggested next steps and a call time."
              summaryTemplate="Enquiry from {org} · {tier} · interest: {interest}"
              fields={[
                { name: "org", label: "Organisation", required: true, half: true },
                { name: "orgType", label: "Organisation type", type: "select", required: true, half: true, options: ["Company", "Foundation", "Family office", "Bilateral / multilateral", "Giving circle"].map((x) => ({ value: x, label: x })) },
                { name: "name", label: "Your name", required: true, half: true },
                { name: "role", label: "Role", required: true, half: true },
                { name: "email", label: "Work email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "tier", label: "Partnership tier", type: "select", required: true, half: true, options: partnerTiers.map((t) => ({ value: `${t.name} (${t.range})`, label: `${t.name} — ${t.range}` })) },
                { name: "interest", label: "Area of interest", type: "select", half: true, options: [...funds.map((f) => ({ value: f.name, label: f.name })), ...focusAreas.map((f) => ({ value: f.name, label: `${f.name} (programme)` }))] },
                { name: "message", label: "What would you like to achieve?", type: "textarea", required: true, minLength: 30, maxLength: 1200 },
                { name: "consent", label: "I agree to be contacted about this enquiry.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
