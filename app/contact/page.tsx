import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/ui/primitives";
import { SmartForm } from "@/components/ui/smart-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Meridian Foundation — offices in Lagos, Nairobi and Johannesburg; grants, partnerships, giving and media enquiries.",
};

export default function ContactPage() {
  const b = siteConfig.brand;
  const desks = [
    { k: "Grant enquiries", v: b.grantsEmail },
    { k: "Partnerships", v: b.partnershipsEmail },
    { k: "Giving & receipts", v: b.givingEmail },
    { k: "Media", v: b.mediaEmail },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} eyebrow="Contact" title="Get in touch" lede="Choose the right desk for the fastest reply. For grant applications, please use the letter-of-inquiry form rather than email." />
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12">
          <div className="space-y-8">
            <ul className="border-t-2 border-[color:var(--navy)]">
              {desks.map((d) => (
                <li key={d.k} className="py-4 border-b border-line flex flex-wrap justify-between gap-2">
                  <span className="font-semibold text-navy">{d.k}</span>
                  <a href={`mailto:${d.v}`} className="link text-[15px] min-h-[32px] inline-flex items-center">{d.v}</a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-[15px] text-ink-2">
              <li className="flex gap-3"><Phone className="w-5 h-5 text-cobalt shrink-0" aria-hidden="true" /><a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:underline">{b.phone}</a></li>
              <li className="flex gap-3"><MessageCircle className="w-5 h-5 text-cobalt shrink-0" aria-hidden="true" /><a href={b.whatsappLink} className="hover:underline" target="_blank" rel="noreferrer">WhatsApp {b.whatsapp}</a></li>
              <li className="flex gap-3"><Mail className="w-5 h-5 text-cobalt shrink-0" aria-hidden="true" /><a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a></li>
              <li className="flex gap-3"><Clock className="w-5 h-5 text-cobalt shrink-0" aria-hidden="true" />{b.hours}</li>
            </ul>
          </div>
          <div className="border border-line p-6 md:p-8">
            <h2 className="hd-3 text-navy mb-6">Send us a message</h2>
            <SmartForm
              submitLabel="Send message"
              successTitle="Message sent"
              successBody="Thank you. The right team will reply within two working days."
              summaryTemplate="Routed to: {topic}"
              fields={[
                { name: "name", label: "Full name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "org", label: "Organisation", half: true },
                { name: "topic", label: "Topic", type: "select", required: true, half: true, options: ["Grants & applications", "Partnerships & co-funding", "Giving & receipts", "Media", "Careers", "Other"].map((x) => ({ value: x, label: x })) },
                { name: "message", label: "Message", type: "textarea", required: true, minLength: 20, maxLength: 1500 },
                { name: "consent", label: "I agree to Meridian storing my details to respond to this message.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
      <Section tone="paper">
        <ul className="grid md:grid-cols-3 gap-6">
          {siteConfig.offices.map((o) => (
            <li key={o.city} className="bg-white border border-line">
              <div className="aspect-[16/9] grid-paper relative flex items-center justify-center" role="img" aria-label={`Map placeholder for the ${o.city} office`}>
                <span className="w-4 h-4 bg-[color:var(--coral)] ring-4 ring-white" aria-hidden="true" />
              </div>
              <div className="p-6">
                <p className="font-serif text-2xl text-navy">{o.city}</p>
                <p className="text-[13.5px] font-semibold text-cobalt">{o.role} · {o.timezone}</p>
                <p className="mt-2 text-[14px] text-ink-2">{o.address}</p>
                <p className="mt-1 text-[14px] text-ink-2">{o.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
