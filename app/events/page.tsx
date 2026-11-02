import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { FocusChip, PageHero, Section } from "@/components/ui/primitives";
import { SmartForm } from "@/components/ui/smart-form";
import { events } from "@/mock/events";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Convenings, co-funder briefings, grantee webinars and fundraisers in Lagos, Nairobi, Johannesburg and online.",
};

export default function EventsPage() {
  const list = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHero crumbs={[{ label: "Events" }]} eyebrow="Events" title="Convenings, briefings & webinars" lede="Policy dialogues, co-funder briefings and webinars for prospective grantees — in Lagos, Nairobi, Johannesburg and online." />
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12">
          <ul className="border-t-2 border-[color:var(--navy)]">
            {list.map((e) => (
              <li key={e.slug} id={e.slug} className="border-b border-line py-7 grid grid-cols-[72px_minmax(0,1fr)] gap-6 scroll-mt-28">
                <div className="text-center border-r border-line pr-4">
                  <div className="text-[12px] font-bold uppercase tracking-wider text-cobalt">{formatDate(e.date, { month: "short" })}</div>
                  <div className="font-serif text-4xl text-navy leading-none mt-1">{formatDate(e.date, { day: "numeric" })}</div>
                  <div className="text-[12px] text-muted mt-1">{formatDate(e.date, { year: "numeric" })}</div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3"><span className="tag">{e.type}</span><span className="tag">{e.format}</span>{e.focus && <FocusChip slug={e.focus} />}</div>
                  <h2 className="mt-2 font-serif text-[1.5rem] text-navy leading-snug">{e.title}</h2>
                  <p className="mt-2 text-ink-2">{e.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-muted">
                    <li className="flex items-center gap-1.5"><Clock className="w-4 h-4" aria-hidden="true" />{e.time}</li>
                    <li className="flex items-center gap-1.5"><MapPin className="w-4 h-4" aria-hidden="true" />{e.venue}{e.city !== "Online" ? `, ${e.city}` : ""}</li>
                    <li className="flex items-center gap-1.5"><Users className="w-4 h-4" aria-hidden="true" />{e.audience}</li>
                  </ul>
                  <a href={`#register`} className="arrow-link mt-1">Register →</a>
                </div>
              </li>
            ))}
          </ul>
          <aside id="register" className="lg:sticky lg:top-24 self-start border border-line p-6 md:p-7 scroll-mt-28">
            <div className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-cobalt" aria-hidden="true" /><h2 className="font-serif text-2xl text-navy">Register</h2></div>
            <p className="mt-2 text-[14px] text-ink-2">Places are limited; we confirm by email within two working days.</p>
            <SmartForm
              className="mt-6"
              submitLabel="Register"
              successTitle="You’re registered"
              successBody="We’ve emailed your confirmation with joining details and a calendar invite."
              summaryTemplate="{event} · {attendees} attendee(s)"
              fields={[
                { name: "event", label: "Event", type: "select", required: true, options: list.map((e) => ({ value: `${e.title} (${formatDate(e.date)})`, label: `${formatDate(e.date, { day: "numeric", month: "short" })} — ${e.title}` })) },
                { name: "name", label: "Full name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "org", label: "Organisation", half: true },
                { name: "attendees", label: "Attendees", type: "number", min: 1, max: 4, defaultValue: "1", required: true, half: true },
                { name: "access", label: "Accessibility or dietary needs", type: "textarea", maxLength: 400 },
              ]}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
