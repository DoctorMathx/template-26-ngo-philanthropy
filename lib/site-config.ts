// Central config — change these values (or swap the whole file) and the template rebrands.
// Brand, organisation, offices, donation & matching settings, FX rate and homepage modules all live here.

export type HomeModule =
  | "hero"
  | "factStrip"
  | "focusAreas"
  | "progressTeaser"
  | "grantsTeaser"
  | "pooledFunds"
  | "opportunities"
  | "campaigns"
  | "stories"
  | "newsroom"
  | "transparency"
  | "events"
  | "finalCta";

export const siteConfig = {
  brand: {
    name: "Meridian Foundation",
    short: "Meridian",
    tagline: "Evidence-led philanthropy for a healthier, more prosperous Africa.",
    description:
      "Meridian Foundation is a pan-African philanthropic foundation making grants in global health, agricultural development, financial inclusion, gender equality and education — from offices in Lagos, Nairobi and Johannesburg.",
    domain: "meridianfoundation.org",
    email: "info@meridianfoundation.org",
    grantsEmail: "grants@meridianfoundation.org",
    partnershipsEmail: "partnerships@meridianfoundation.org",
    mediaEmail: "media@meridianfoundation.org",
    givingEmail: "giving@meridianfoundation.org",
    phone: "+234 1 555 0190",
    whatsapp: "+234 809 555 0190",
    whatsappLink: "https://wa.me/2348095550190",
    address: "Meridian House, 7 Alfred Rewane Road, Ikoyi, Lagos 106104",
    city: "Lagos, Nigeria",
    hours: "Mon–Fri, 8:30–17:00 WAT",
    social: {
      linkedin: "https://linkedin.com/company/meridianfoundation",
      twitter: "https://x.com/meridianfdn",
      youtube: "https://youtube.com/@meridianfoundation",
      instagram: "https://instagram.com/meridianfoundation",
    },
  },

  offices: [
    { city: "Lagos", role: "Headquarters", address: "Meridian House, 7 Alfred Rewane Road, Ikoyi, Lagos 106104, Nigeria", phone: "+234 1 555 0190", timezone: "WAT (UTC+1)" },
    { city: "Nairobi", role: "East Africa office", address: "4th Floor, Riverside Square, Riverside Drive, Nairobi, Kenya", phone: "+254 20 555 0144", timezone: "EAT (UTC+3)" },
    { city: "Johannesburg", role: "Southern Africa office", address: "18 Fricker Road, Illovo, Johannesburg 2196, South Africa", phone: "+27 11 555 0172", timezone: "SAST (UTC+2)" },
  ],

  org: {
    legalName: "The Meridian Foundation (Incorporated Trustees)",
    founded: 2009,
    endowedBy: "the Okonjo-Bello family",
    auditor: "Babatunde Hale & Partners (Chartered Accountants)",
    endowmentUsd: 4_200_000_000,
  },

  // Fixed reporting rate used to show grant amounts in naira alongside US dollars.
  fx: { ngnPerUsd: 1550, asOf: "30 September 2026" },

  donation: {
    currency: "₦",
    feeRate: 0.015,
    minAmount: 1000,
    bank: {
      bankName: "Guaranty Trust Bank Plc",
      accountName: "Meridian Foundation — Pooled Funds",
      accountNumber: "0248117390",
      usdAccount: "GTBank USD domiciliary 0248117406 · SWIFT GTBINGLA",
    },
    ussd: {
      code: "*737*000*0248117390#",
      label: "GTBank USSD (*737#)",
      hint: "Dial from any Nigerian line; replace 000 with your amount, e.g. *737*50000*0248117390#",
    },
    frequencies: [
      { id: "one-time", label: "One-time" },
      { id: "monthly", label: "Monthly" },
      { id: "annual", label: "Annual" },
    ],
    presets: [
      { amount: 10000, impact: "protects a family of five with two long-lasting insecticidal bed nets for three years" },
      { amount: 25000, impact: "covers a full course of routine childhood vaccines for 12 children in a hard-to-reach ward" },
      { amount: 50000, impact: "gives a smallholder farmer drought-tolerant seed and a season of extension advice" },
      { amount: 100000, impact: "keeps a girl in senior secondary school for a full year — fees, books and transport" },
      { amount: 250000, impact: "trains and equips a community health worker for a year of home visits" },
      { amount: 500000, impact: "funds digital-payments onboarding for 200 market women in a rural LGA" },
    ],
    receiptNote:
      "Meridian Foundation is a registered non-profit under Part F of CAMA 2020. Gifts to pooled funds are matched as stated and are spent only through audited grants. Corporate gifts may be deductible under Section 25 of the Companies Income Tax Act, subject to FIRS conditions.",
  },

  matching: {
    // The foundation matches public gifts to pooled funds naira-for-naira up to this cap per fund per year.
    ratio: 1,
    note: "The foundation matches every naira given to a pooled fund, up to each fund’s annual matching cap.",
  },

  home: {
    // Reorder / toggle homepage modules per organisation.
    modules: [
      "hero",
      "factStrip",
      "focusAreas",
      "progressTeaser",
      "grantsTeaser",
      "pooledFunds",
      "opportunities",
      "campaigns",
      "stories",
      "newsroom",
      "transparency",
      "events",
      "finalCta",
    ] as HomeModule[],
    heroCta: { label: "Explore our work", href: "/our-work" },
    heroCtaSecondary: { label: "Read the 2026 Progress Report", href: "/progress" },
  },
} as const;
