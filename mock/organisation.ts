import type { Person } from "@/lib/types";
import { PORTRAIT } from "./images";

// About, leadership, board, history, values, partners, financials and FAQs.

export const mission = "To ensure every person in Africa has the chance to live a healthy, productive life.";
export const vision = "A continent in which where you are born no longer decides how long you live, whether you learn, or what you earn.";

export const values = [
  { title: "Evidence first", body: "We fund what works, measure honestly and change course when the data tells us to." },
  { title: "African leadership", body: "We back African institutions and leaders — 61% of our grant dollars go to organisations headquartered on the continent." },
  { title: "Patience with urgency", body: "Systems change takes decades. Children dying of malaria cannot wait. We hold both truths." },
  { title: "Radical transparency", body: "Every grant, every audit and every evaluation is public." },
  { title: "Partnership, not patronage", body: "Grantees are partners. We fund core costs, simplify reporting and ask for their feedback every year." },
];

export const history = [
  { year: 2009, title: "Foundation established", body: "Endowed by the Okonjo-Bello family in Lagos with an initial focus on malaria and maternal health in Nigeria." },
  { year: 2012, title: "Agriculture programme launched", body: "First grants to seed companies and farmer cooperatives in Nigeria’s middle belt." },
  { year: 2015, title: "Nairobi office opens", body: "East Africa portfolio grows to cover Kenya, Uganda, Tanzania and Ethiopia." },
  { year: 2018, title: "Financial inclusion & gender", body: "Two new focus areas, and a gender lens applied to every grant." },
  { year: 2020, title: "Pandemic response", body: "$120m in emergency grants for oxygen, testing and keeping essential services running." },
  { year: 2022, title: "Johannesburg office & pooled funds", body: "Public co-funding opens with the Malaria-Free Africa Fund and matching from the foundation." },
  { year: 2024, title: "First Progress Report", body: "An annual data report tracking continental progress, with scenarios to 2035." },
  { year: 2026, title: "$6.9bn committed", body: "522 active grants in 31 countries across five focus areas." },
];

export const leadership: Person[] = [
  { name: "Dr. Olusegun Bello-Okonjo", role: "Chief Executive Officer", bio: "Public-health physician and former state commissioner for health. Leads the foundation’s strategy and executive team.", image: PORTRAIT.manGlasses, office: "Lagos" },
  { name: "Dr. Ifeoma Nwachukwu", role: "Director, Global Health", bio: "Epidemiologist who led malaria programmes across West Africa for 15 years.", image: PORTRAIT.womanPortrait, office: "Lagos" },
  { name: "Kwame Asante-Mensah", role: "Director, Agricultural Development", bio: "Agricultural economist and former head of a regional seed-systems programme.", image: PORTRAIT.manSmiling, office: "Nairobi" },
  { name: "Amaka Obi-Lawson", role: "Director, Financial Inclusion", bio: "Former payments-system regulator and fintech founder.", image: PORTRAIT.womanGlasses, office: "Lagos" },
  { name: "Zanele Dlamini-Mokoena", role: "Director, Gender Equality", bio: "Feminist economist and former director of a pan-African women’s fund.", image: PORTRAIT.womanWhite, office: "Johannesburg" },
  { name: "Babajide Adeyemi-Cole", role: "Director, Education & Digital Skills", bio: "Former teacher and state education adviser; led a national literacy reform.", image: PORTRAIT.manThinking, office: "Lagos" },
  { name: "Nadia Hassan-Mwangi", role: "Chief Financial & Investment Officer", bio: "Chartered accountant overseeing the endowment, grants payments and audit.", image: PORTRAIT.womanAfro, office: "Nairobi" },
  { name: "Tunde Adebayo-Phillips", role: "Director, Data & Evidence", bio: "Statistician leading the Progress Report and the foundation’s evaluation function.", image: PORTRAIT.manBeard, office: "Lagos" },
];

export const board: Person[] = [
  { name: "Chief Adebola Okonjo-Bello", role: "Chair, Board of Trustees", bio: "Co-founder of the foundation and of a family industrial group." },
  { name: "Prof. Ngozi Eze-Umeh", role: "Vice-Chair", bio: "Professor of paediatrics and former university vice-chancellor." },
  { name: "Dr. Samuel Kiprono", role: "Trustee · Chair, Grants Committee", bio: "Former permanent secretary for agriculture in Kenya." },
  { name: "Lindiwe Mahlangu", role: "Trustee · Chair, Audit & Risk Committee", bio: "Chartered accountant and former audit partner." },
  { name: "Fatima Abubakar-Sule", role: "Trustee", bio: "Banker and financial-inclusion advocate." },
  { name: "Dr. Yaw Boateng", role: "Trustee", bio: "Economist and former central bank deputy governor." },
  { name: "Ifeoluwa Okonjo-Bello", role: "Trustee (family)", bio: "Next-generation family trustee; social investor." },
];

export const fundingPartners = [
  { name: "Atlantic Commerce Bank", type: "Corporate", tier: "Strategic" },
  { name: "Northbridge Philanthropies", type: "Foundation", tier: "Strategic" },
  { name: "Savanna Telecom", type: "Corporate", tier: "Strategic" },
  { name: "Kilimanjaro Trust", type: "Foundation", tier: "Programme" },
  { name: "Eko Energy Group", type: "Corporate", tier: "Programme" },
  { name: "Lakeshore Insurance", type: "Corporate", tier: "Programme" },
  { name: "Nordic Health Alliance", type: "Bilateral", tier: "Strategic" },
  { name: "Harmattan Capital", type: "Corporate", tier: "Fund" },
  { name: "Ubuntu Family Office", type: "Family office", tier: "Fund" },
  { name: "Diaspora Giving Circle UK", type: "Giving circle", tier: "Fund" },
  { name: "Zenara Pharmaceuticals", type: "Corporate", tier: "Programme" },
  { name: "Gulf of Guinea Shipping", type: "Corporate", tier: "Fund" },
];

export const partnerTiers = [
  { name: "Fund partner", range: "₦10m – ₦100m / yr", body: "Join a pooled fund alongside the foundation, with matching and quarterly results.", perks: ["Matched 1:1 up to the fund cap", "Quarterly data dashboard", "Recognition in the annual report"] },
  { name: "Programme partner", range: "₦100m – ₦1bn / yr", body: "Co-fund a defined programme within a focus area, with a dedicated relationship manager.", perks: ["Co-designed results framework", "Annual field visit and learning review", "Co-branded communications"] },
  { name: "Strategic partner", range: "₦1bn+ / multi-year", body: "Shape a multi-year strategy with us — joint governance, pooled due diligence and shared evaluation.", perks: ["Seat on the programme steering committee", "Independent evaluation shared in full", "Joint policy engagement"] },
];

export const grantManagement = [
  { title: "Ring-fenced accounts", body: "Co-funding is held in restricted accounts and spent only on the agreed fund or programme." },
  { title: "Zero overhead on co-funding", body: "The foundation covers 100% of its own operating costs from the endowment. Every co-funded naira goes to grants." },
  { title: "Due diligence on every grantee", body: "Governance, financial and safeguarding review before any grant is signed, refreshed every two years." },
  { title: "Independent audit", body: "Annual audit by Babatunde Hale & Partners, with a separate audit of each pooled fund." },
  { title: "Results you can see", body: "Quarterly dashboards, annual reports and independent evaluations — published, not just shared." },
];

export const finances = {
  year: 2025,
  // USD millions
  income: [
    { label: "Endowment investment returns", value: 612, color: "#0B1F3A" },
    { label: "Family contributions", value: 145, color: "#0072CE" },
    { label: "Co-funders & pooled funds", value: 118, color: "#00A3AD" },
    { label: "Other income", value: 14, color: "#B9C2CF" },
  ],
  expenditure: [
    { label: "Global Health grants", value: 326, color: "#0072CE" },
    { label: "Agricultural Development grants", value: 214, color: "#3E8E41" },
    { label: "Financial Inclusion grants", value: 137, color: "#00838F" },
    { label: "Education & Digital Skills grants", value: 101, color: "#C26A00" },
    { label: "Gender Equality grants", value: 72, color: "#B03A78" },
    { label: "Programme support & evaluation", value: 41, color: "#7E8CA3" },
    { label: "Administration", value: 28, color: "#B9C2CF" },
  ],
  perThousand: [
    { label: "Grants to partners", amount: 924 },
    { label: "Programme support, data & evaluation", amount: 44 },
    { label: "Administration & governance", amount: 32 },
  ],
  pooledFundNote: "Gifts to pooled funds carry zero overhead: ₦1,000 given = ₦1,000 granted (plus ₦1,000 matched).",
  reports: [
    { title: "Annual Report 2025", meta: "PDF · 84 pages" },
    { title: "Audited Financial Statements 2025", meta: "PDF · 46 pages" },
    { title: "Pooled Funds Audit 2025", meta: "PDF · 22 pages" },
    { title: "Annual Report 2024", meta: "PDF · 78 pages" },
    { title: "Audited Financial Statements 2024", meta: "PDF · 44 pages" },
    { title: "Evaluation Policy & Evaluations Register", meta: "PDF · 16 pages" },
  ],
  governance: [
    { k: "Legal form", v: "Incorporated Trustees under Part F, CAMA 2020" },
    { k: "Registration", v: "Registered with the Corporate Affairs Commission as an incorporated trustee" },
    { k: "External auditor", v: "Babatunde Hale & Partners (Chartered Accountants)" },
    { k: "Investment policy", v: "Endowment managed by an independent investment committee; fossil-fuel exclusion since 2021" },
    { k: "Conflict of interest", v: "Annual declarations by trustees and staff; register published" },
    { k: "Whistleblowing", v: "Independent, confidential hotline — integrity@meridianfoundation.org" },
  ],
};

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Giving & matching",
    items: [
      { q: "How does matching work?", a: "For every naira you give to a pooled fund, the foundation adds a naira from its endowment, until that fund’s annual matching cap is reached. Your receipt shows both your gift and the matched amount." },
      { q: "Does any of my gift go to overheads?", a: "No. The foundation pays all of its own operating costs from the endowment, so 100% of gifts to pooled funds are granted to partners." },
      { q: "Can I give monthly?", a: "Yes. Choose ‘Monthly’ on the donate page. You can change or cancel any time by emailing giving@meridianfoundation.org." },
      { q: "Can I give in US dollars or from abroad?", a: "Yes — card payments in any currency are accepted, and we have a USD domiciliary account for transfers. Diaspora giving circles can contact our giving team." },
    ],
  },
  {
    group: "Receipts & tax",
    items: [
      { q: "Will I get a receipt?", a: "Yes, by email within minutes for card payments, and within two working days of a bank transfer arriving." },
      { q: "Is my donation tax-deductible?", a: "Companies may deduct donations to approved bodies under Section 25 of the Companies Income Tax Act, subject to FIRS conditions. Please consult your tax adviser." },
    ],
  },
  {
    group: "Applying for grants",
    items: [
      { q: "Do you accept unsolicited proposals?", a: "We accept letters of inquiry against open calls and our published focus-area priorities. We do not accept full proposals unless invited." },
      { q: "Do you fund individuals?", a: "No. We fund registered organisations — non-profits, universities, research institutes, social enterprises and, in some cases, government agencies." },
      { q: "Do you fund indirect costs?", a: "Yes. We fund up to 20% indirect costs on project grants and full costs on core-support grants." },
      { q: "How long does a decision take?", a: "Most grants take three to five months from letter of inquiry to signed agreement. We tell you at every stage where your application stands." },
    ],
  },
  {
    group: "Data & media",
    items: [
      { q: "Can I reuse the Progress Report charts?", a: "Yes. Charts and data are published under a Creative Commons Attribution licence. Please credit ‘Meridian Foundation Progress Report 2026’." },
      { q: "How do I reach the press office?", a: "Email media@meridianfoundation.org or see regional contacts on the Newsroom page. We aim to respond within four working hours." },
    ],
  },
];

export const impactHeadline = [
  { value: "$6.9bn", label: "committed in grants since 2009" },
  { value: "522", label: "active grants in 31 countries" },
  { value: "61%", label: "of grant dollars to African-headquartered organisations" },
  { value: "214", label: "staff in Lagos, Nairobi & Johannesburg" },
];

// Results attributed to grantees' work (cumulative, illustrative).
export const results = [
  { focus: "global-health", value: "38.4m", label: "long-lasting bed nets distributed", spark: [4, 7, 11, 16, 21, 27, 32, 38.4] },
  { focus: "global-health", value: "11.2m", label: "children reached with seasonal malaria chemoprevention", spark: [0.8, 2, 3.5, 5, 6.6, 8.1, 9.8, 11.2] },
  { focus: "agricultural-development", value: "2.1m", label: "farmers planting improved, climate-resilient seed", spark: [0.2, 0.4, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1] },
  { focus: "financial-inclusion", value: "6.7m", label: "people — 58% women — opening a first digital account", spark: [0.3, 0.9, 1.6, 2.5, 3.6, 4.7, 5.8, 6.7] },
  { focus: "gender-equality", value: "184k", label: "adolescent girls in safe-space mentoring clubs", spark: [10, 28, 51, 77, 104, 131, 158, 184] },
  { focus: "education-digital-skills", value: "3.9m", label: "pupils taught with structured pedagogy", spark: [0.1, 0.3, 0.7, 1.2, 1.9, 2.6, 3.3, 3.9] },
] as const;
