// Header mega-menu and footer navigation.

export type NavLink = { label: string; href: string; desc?: string };
export type NavGroup = { id: string; label: string; href: string; kind: "focus" | "columns"; columns?: { heading: string; links: NavLink[] }[]; feature?: { eyebrow: string; title: string; href: string; cta: string } };

export const mainNav: NavGroup[] = [
  {
    id: "work",
    label: "Our work",
    href: "/our-work",
    kind: "focus",
    feature: { eyebrow: "Progress Report 2026", title: "Eight indicators. Three scenarios. One question: is Africa on track?", href: "/progress", cta: "Read the report" },
  },
  {
    id: "grants",
    label: "Grants",
    href: "/grants",
    kind: "columns",
    columns: [
      {
        heading: "For grant seekers",
        links: [
          { label: "Grant opportunities", href: "/how-we-work/grant-opportunities", desc: "Open calls, eligibility and letters of inquiry" },
          { label: "How we work", href: "/how-we-work", desc: "Our grantmaking principles and process" },
          { label: "Resources for grantees", href: "/how-we-work/grant-opportunities#resources", desc: "Templates and guidelines" },
        ],
      },
      {
        heading: "Data",
        links: [
          { label: "Committed grants database", href: "/grants", desc: "Search and export every grant we’ve made" },
          { label: "Our results", href: "/impact", desc: "What our partners achieved" },
          { label: "Financials & transparency", href: "/transparency", desc: "Audits, reports and governance" },
        ],
      },
    ],
    feature: { eyebrow: "Now open", title: "Calls for proposals on zero-dose immunisation, women agri-entrepreneurs and literacy.", href: "/how-we-work/grant-opportunities", cta: "See open calls" },
  },
  {
    id: "give",
    label: "Give & partner",
    href: "/give",
    kind: "columns",
    columns: [
      {
        heading: "Individuals",
        links: [
          { label: "Pooled funds", href: "/give", desc: "Co-fund alongside the foundation — gifts matched 1:1" },
          { label: "Current appeals", href: "/campaigns", desc: "Time-bound campaigns with live progress" },
          { label: "Donate", href: "/donate", desc: "Card, bank transfer or USSD" },
        ],
      },
      {
        heading: "Institutions",
        links: [
          { label: "Partner with us", href: "/partnerships", desc: "Corporates, foundations and bilateral funders" },
          { label: "Get involved", href: "/get-involved", desc: "Volunteer, fundraise, join a giving circle" },
          { label: "Events", href: "/events", desc: "Briefings, convenings and webinars" },
        ],
      },
    ],
    feature: { eyebrow: "Matched 1:1", title: "Every naira given to the Malaria-Free Africa Fund is matched by the foundation.", href: "/give#malaria-free-africa", cta: "Join the fund" },
  },
  {
    id: "ideas",
    label: "Ideas & news",
    href: "/stories",
    kind: "columns",
    columns: [
      {
        heading: "Read",
        links: [
          { label: "Stories & perspectives", href: "/stories", desc: "Features, data stories and grantee voices" },
          { label: "Progress Report", href: "/progress", desc: "Our annual data report" },
        ],
      },
      {
        heading: "Media",
        links: [
          { label: "Newsroom", href: "/newsroom", desc: "Press releases, fact sheet, media contacts" },
          { label: "Events", href: "/events", desc: "Upcoming convenings and webinars" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    kind: "columns",
    columns: [
      {
        heading: "The foundation",
        links: [
          { label: "About us", href: "/about", desc: "Mission, history, leadership and board" },
          { label: "Transparency", href: "/transparency", desc: "Financials, audits and governance" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact & offices", href: "/contact", desc: "Lagos, Nairobi, Johannesburg" },
          { label: "FAQ", href: "/faq", desc: "Giving, grants, receipts and data" },
        ],
      },
    ],
  },
];

export const footerNav = [
  { heading: "Our work", links: [{ label: "Global Health", href: "/our-work/global-health" }, { label: "Agricultural Development", href: "/our-work/agricultural-development" }, { label: "Financial Inclusion", href: "/our-work/financial-inclusion" }, { label: "Gender Equality", href: "/our-work/gender-equality" }, { label: "Education & Digital Skills", href: "/our-work/education-digital-skills" }, { label: "Progress Report", href: "/progress" }] },
  { heading: "Grants", links: [{ label: "Committed grants", href: "/grants" }, { label: "Grant opportunities", href: "/how-we-work/grant-opportunities" }, { label: "How we work", href: "/how-we-work" }, { label: "Our results", href: "/impact" }] },
  { heading: "Give & partner", links: [{ label: "Pooled funds", href: "/give" }, { label: "Appeals", href: "/campaigns" }, { label: "Donate", href: "/donate" }, { label: "Partner with us", href: "/partnerships" }, { label: "Get involved", href: "/get-involved" }] },
  { heading: "Foundation", links: [{ label: "About", href: "/about" }, { label: "Transparency", href: "/transparency" }, { label: "Newsroom", href: "/newsroom" }, { label: "Stories", href: "/stories" }, { label: "Events", href: "/events" }, { label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }] },
];
