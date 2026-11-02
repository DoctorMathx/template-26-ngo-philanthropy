import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, HandHeart, Megaphone, Users } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { SmartForm } from "@/components/ui/smart-form";
import { funds } from "@/mock/funds";
import { focusAreas } from "@/mock/focus-areas";
import { IMG } from "@/mock/images";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer your expertise, start a giving circle or fundraiser for a pooled fund, or partner with the Meridian Foundation.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Get involved" }]}
        eyebrow="Get involved"
        title="Bring your skills, your network or your company."
        lede="Beyond giving, there are three ways to work with us: lend professional expertise to a grantee, rally your network behind a pooled fund, or partner as an institution."
        image={IMG.training}
        imageAlt="A room of people attending a training session"
        caption="Skilled volunteers run a financial-management clinic for grantee finance teams."
      />

      <Section>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--line)] border border-line">
          {[
            { icon: Briefcase, t: "Skilled volunteering", d: "Finance, data, legal and digital professionals support grantees through short, scoped projects.", href: "#volunteer" },
            { icon: Users, t: "Giving circles", d: "Pool gifts with friends, alumni or colleagues — matched 1:1 by the foundation.", href: "#fundraise" },
            { icon: Megaphone, t: "Fundraise", d: "Run, cycle, celebrate a birthday or mark Ramadan or Christmas with a fundraiser page.", href: "#fundraise" },
            { icon: HandHeart, t: "Partner", d: "Companies and foundations co-fund through our partnership tiers.", href: "/partnerships" },
          ].map((x) => (
            <li key={x.t} className="bg-white">
              <Link href={x.href} className="block p-7 h-full group">
                <x.icon className="w-7 h-7 text-cobalt" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="mt-4 font-semibold text-navy text-lg group-hover:underline underline-offset-4">{x.t}</h2>
                <p className="mt-2 text-[14.5px] text-ink-2">{x.d}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="volunteer">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <SectionHeader eyebrow="Skilled volunteering" title="Volunteer your expertise" lede="Projects run 4–12 weeks, mostly remote, with occasional site visits in Nigeria, Kenya or South Africa." />
          <div className="bg-white border border-line p-6 md:p-8">
            <SmartForm
              submitLabel="Apply to volunteer"
              successTitle="Application received"
              successBody="Our volunteer coordinator will match you with a grantee project and get in touch within two weeks."
              summaryTemplate="{skill} · {hours} hours/week · {city}"
              fields={[
                { name: "first", label: "First name", required: true, half: true },
                { name: "last", label: "Last name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
                { name: "city", label: "City", required: true, half: true, placeholder: "e.g. Lagos, Abuja, Nairobi" },
                { name: "skill", label: "Main skill", type: "select", required: true, half: true, options: ["Finance & audit", "Data & M&E", "Legal & governance", "Software & digital", "Communications", "Public health", "Agronomy"].map((x) => ({ value: x, label: x })) },
                { name: "hours", label: "Hours per week", type: "number", required: true, min: 2, max: 20, half: true },
                { name: "area", label: "Preferred focus area", type: "select", half: true, options: focusAreas.map((f) => ({ value: f.name, label: f.name })) },
                { name: "linkedin", label: "LinkedIn or CV link", type: "url" },
                { name: "why", label: "What would you like to contribute?", type: "textarea", required: true, minLength: 40, maxLength: 800 },
                { name: "consent", label: "I agree to Meridian’s volunteer code of conduct and safeguarding policy.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section id="fundraise">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <SectionHeader eyebrow="Fundraise & giving circles" title="Rally your network behind a fund" lede="We’ll set up a fundraising page, send you a toolkit, and the foundation will match what you raise up to the fund’s cap." />
          <div className="border border-line p-6 md:p-8">
            <SmartForm
              submitLabel="Start my fundraiser"
              successTitle="Your fundraiser is being set up"
              successBody="We’ll email your page link and toolkit within one working day."
              summaryTemplate="{type} for {fund} · target ₦{target}"
              fields={[
                { name: "name", label: "Your name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "type", label: "Type", type: "select", required: true, half: true, options: ["Giving circle", "Birthday / celebration", "Sporting challenge", "Workplace appeal", "Faith-community appeal"].map((x) => ({ value: x, label: x })) },
                { name: "fund", label: "Pooled fund", type: "select", required: true, half: true, options: funds.map((f) => ({ value: f.name, label: f.name })) },
                { name: "target", label: "Target (₦)", type: "number", required: true, min: 50000, max: 500000000, half: true },
                { name: "date", label: "Start date", type: "date", half: true },
                { name: "story", label: "Why are you fundraising?", type: "textarea", maxLength: 600 },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
