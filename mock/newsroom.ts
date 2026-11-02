import type { PressRelease } from "@/lib/types";

export const pressReleases: PressRelease[] = [
  {
    slug: "progress-report-2026",
    title: "Meridian Foundation’s 2026 Progress Report warns child-survival gains could stall without new investment",
    date: "2026-09-22",
    location: "Lagos",
    summary: "Eight continental indicators show historic progress since 2000, but scenario modelling finds that funding cuts could reverse a decade of gains in malaria and immunisation.",
    focus: "global-health",
    body: [
      "The Meridian Foundation today published its 2026 Progress Report, tracking eight indicators of health, prosperity and learning across sub-Saharan Africa.",
      "The report finds that child mortality has halved since 2000 and account ownership has more than doubled since 2011. But it warns that progress on malaria has plateaued since 2015 and that routine immunisation has only just recovered from pandemic disruptions.",
      "“The difference between our best- and worst-case scenarios is measured in millions of children’s lives,” said the foundation’s Chief Executive. “The tools exist. The question is whether we fund them.”",
      "The full report, data and methodology are available at meridianfoundation.org/progress.",
    ],
  },
  {
    slug: "malaria-free-africa-fund-match",
    title: "Foundation commits ₦1 billion to match public gifts to the Malaria-Free Africa Fund",
    date: "2026-09-05",
    location: "Lagos",
    summary: "Every naira given by individuals and companies to the pooled fund will be matched one-to-one, up to ₦1bn in 2026–27.",
    focus: "global-health",
    body: [
      "The Meridian Foundation will match every naira donated to its Malaria-Free Africa Fund, up to ₦1 billion, the foundation announced today.",
      "The fund pools gifts from individuals, companies and diaspora networks to buy next-generation bed nets and deliver seasonal chemoprevention in high-burden states.",
    ],
  },
  {
    slug: "instant-payments-commitment",
    title: "$15 million commitment to open-source instant payment systems in six African central banks",
    date: "2026-07-17",
    location: "Nairobi",
    summary: "The five-year grant will support interoperable, low-cost payment switches designed to include women and rural users.",
    focus: "financial-inclusion",
    body: [
      "The Meridian Foundation today announced a $15 million, five-year grant to the Pan-African Instant Payments Lab.",
      "The grant will support six central banks to deploy open-source instant payment switches, with consumer protection and fraud prevention built in from the start.",
    ],
  },
  {
    slug: "nairobi-office-expansion",
    title: "Meridian Foundation expands Nairobi office to lead East Africa agriculture portfolio",
    date: "2026-05-12",
    location: "Nairobi",
    summary: "The expanded office will house the foundation’s agricultural development and gender equality teams for East Africa.",
    body: [
      "The Meridian Foundation has expanded its Nairobi office at Riverside Square, which will now lead the foundation’s agricultural development work in Kenya, Ethiopia, Tanzania and Uganda.",
    ],
  },
  {
    slug: "2025-annual-report",
    title: "Meridian Foundation publishes 2025 annual report and audited accounts",
    date: "2026-04-28",
    location: "Lagos",
    summary: "The foundation committed $847 million in new grants in 2025, its largest annual total to date.",
    body: [
      "The Meridian Foundation today published its 2025 annual report and audited financial statements.",
      "In 2025 the foundation committed $847 million in new grants across five focus areas, with 61% of grant funds going to organisations headquartered in Africa.",
    ],
  },
];

export const mediaContacts = [
  { name: "Temitope Aina-Hassan", role: "Head of Media Relations", region: "Lagos · West Africa", email: "media@meridianfoundation.org", phone: "+234 1 555 0195" },
  { name: "Wanjiru Kamau", role: "Communications Manager", region: "Nairobi · East Africa", email: "media.ea@meridianfoundation.org", phone: "+254 20 555 0149" },
  { name: "Thabo Nkosi", role: "Communications Manager", region: "Johannesburg · Southern Africa", email: "media.sa@meridianfoundation.org", phone: "+27 11 555 0177" },
];

export const factSheet = [
  { k: "Founded", v: "2009, endowed by the Okonjo-Bello family" },
  { k: "Headquarters", v: "Lagos, Nigeria — with offices in Nairobi and Johannesburg" },
  { k: "Endowment", v: "$4.2 billion (31 December 2025)" },
  { k: "Grants committed since founding", v: "$6.9 billion" },
  { k: "Grants committed in 2025", v: "$847 million" },
  { k: "Active grants", v: "522 in 31 countries" },
  { k: "Staff", v: "214 across three offices" },
  { k: "Focus areas", v: "Global Health · Agricultural Development · Financial Inclusion · Gender Equality · Education & Digital Skills" },
  { k: "Registration", v: "Incorporated Trustees, Nigeria" },
];

export const getPressRelease = (slug: string) => pressReleases.find((p) => p.slug === slug);
