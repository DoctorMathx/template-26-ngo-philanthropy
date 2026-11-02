import type { FocusSlug, Grant } from "@/lib/types";

// Committed grants database. All grantees are fictional. Amounts are in US dollars;
// naira equivalents are calculated at siteConfig.fx.ngnPerUsd.

type Row = [grantee: string, country: string, focus: FocusSlug, amountUsd: number, year: number, months: number, purpose: string, type?: Grant["type"]];

const REGION: Record<string, Grant["region"]> = {
  Nigeria: "West Africa", Ghana: "West Africa", Senegal: "West Africa", "Sierra Leone": "West Africa", "Côte d’Ivoire": "West Africa", Niger: "West Africa",
  Kenya: "East Africa", Ethiopia: "East Africa", Uganda: "East Africa", Tanzania: "East Africa", Rwanda: "East Africa",
  "South Africa": "Southern Africa", Malawi: "Southern Africa", Mozambique: "Southern Africa", Zambia: "Southern Africa",
  "DR Congo": "Central Africa", Cameroon: "Central Africa", Egypt: "North Africa", Morocco: "North Africa",
  "Multiple countries": "Pan-African",
};

const H: FocusSlug = "global-health";
const A: FocusSlug = "agricultural-development";
const F: FocusSlug = "financial-inclusion";
const G: FocusSlug = "gender-equality";
const E: FocusSlug = "education-digital-skills";

const rows: Row[] = [
  ["Sahel Malaria Consortium", "Nigeria", H, 18_500_000, 2026, 48, "To scale seasonal malaria chemoprevention to 4.2 million children under five across seven northern states.", "Project"],
  ["Lakeside Institute for Health Research", "Kenya", H, 6_200_000, 2026, 36, "To evaluate the integration of the R21 malaria vaccine into routine immunisation schedules in western Kenya.", "Research"],
  ["Mama Salama Midwives Network", "Tanzania", H, 3_400_000, 2026, 36, "To train and mentor 1,800 midwives in emergency obstetric and newborn care in Lake Zone regions.", "Project"],
  ["ColdLink Africa", "Multiple countries", H, 9_750_000, 2026, 60, "To deploy solar direct-drive vaccine refrigerators and remote temperature monitoring to 3,000 health facilities.", "Programme-related investment"],
  ["Northern States PHC Alliance", "Nigeria", H, 12_000_000, 2025, 48, "To strengthen primary health care governance and community health worker payment systems in Kano, Katsina and Sokoto.", "Core support"],
  ["Kanem Community Health Trust", "Niger", H, 2_150_000, 2025, 24, "To reach zero-dose children in nomadic communities through mobile vaccination teams.", "Project"],
  ["Blantyre Newborn Care Collaborative", "Malawi", H, 1_850_000, 2025, 36, "To expand kangaroo mother care units in 22 district hospitals.", "Project"],
  ["Zambezi Health Data Initiative", "Mozambique", H, 4_300_000, 2024, 36, "To build a district health information dashboard for malaria and maternal health surveillance.", "Project"],
  ["Ubuntu Clinical Trials Network", "South Africa", H, 7_600_000, 2024, 60, "To support phase III trials of a long-acting malaria monoclonal antibody.", "Research"],
  ["Accra Maternal Outcomes Lab", "Ghana", H, 950_000, 2023, 24, "To study the causes of postpartum haemorrhage deaths and test a community referral protocol.", "Research"],
  ["Lagos Emergency Obstetric Network", "Nigeria", H, 5_100_000, 2023, 36, "To build a coordinated emergency transport and referral system for obstetric emergencies in Lagos State.", "Project"],
  ["Great Lakes Bed Net Partnership", "Uganda", H, 14_200_000, 2022, 36, "To distribute dual-active-ingredient nets in districts with confirmed pyrethroid resistance.", "Project"],
  ["Savanna Seed Partnership", "Nigeria", A, 8_400_000, 2026, 48, "To bring drought-tolerant maize and sorghum varieties to 600,000 farmers through 40 local seed companies.", "Project"],
  ["Rift Valley Agronomy Centre", "Kenya", A, 3_900_000, 2026, 36, "To develop site-specific fertiliser recommendations from soil-spectroscopy data for 12 counties.", "Research"],
  ["Harvest Bridge Cooperatives", "Ghana", A, 2_250_000, 2026, 36, "To build hermetic storage and aggregation centres that cut post-harvest losses for 25,000 farmers.", "Project"],
  ["Oja Market Systems Lab", "Nigeria", A, 1_200_000, 2025, 24, "To pilot price-information and off-taker matching for tomato and pepper farmers in Kaduna and Plateau.", "Project"],
  ["SoilWise Africa", "Ethiopia", A, 5_600_000, 2025, 48, "To scale agricultural lime and soil-acidity management across the Ethiopian highlands.", "Project"],
  ["Radio Gona Farmer Network", "Tanzania", A, 780_000, 2025, 24, "To broadcast interactive radio advisory in Swahili and Sukuma reaching 1.2 million listeners.", "Project"],
  ["Copperbelt Livestock Health Trust", "Zambia", A, 2_900_000, 2024, 36, "To vaccinate smallholder cattle and goats and train community animal-health workers.", "Project"],
  ["Lake Victoria Aquaculture Fund", "Uganda", A, 4_100_000, 2024, 60, "To provide patient capital to women-led fish-farming enterprises around Lake Victoria.", "Programme-related investment"],
  ["Cassava Value Chain Initiative", "Nigeria", A, 6_750_000, 2023, 48, "To link 80,000 cassava growers to processors with improved varieties and mechanised peeling.", "Project"],
  ["Sahel Resilience Research Hub", "Senegal", A, 1_650_000, 2023, 36, "To study climate-adaptive crop calendars and early-warning systems for millet farmers.", "Research"],
  ["Pan-African Instant Payments Lab", "Multiple countries", F, 15_000_000, 2026, 60, "To support open-source, interoperable instant payment switches in six central banks.", "Core support"],
  ["AgentLink Nigeria", "Nigeria", F, 4_800_000, 2026, 36, "To expand agent-banking liquidity and training for 20,000 rural agents, half of them women.", "Project"],
  ["Women’s Money Network Africa", "Kenya", F, 2_600_000, 2025, 36, "To design savings and insurance products with and for women in the informal economy.", "Project"],
  ["Open ID Africa Initiative", "Ethiopia", F, 6_300_000, 2025, 48, "To support privacy-protecting digital ID enrolment for 3 million women and rural residents.", "Project"],
  ["Fair Credit Research Centre", "South Africa", F, 1_400_000, 2025, 24, "To study over-indebtedness from digital lending apps and propose supervisory tools.", "Research"],
  ["Kasi Fintech Collective", "South Africa", F, 900_000, 2024, 24, "To provide grants and mentoring to fintechs serving township micro-enterprises.", "Project"],
  ["Cash Transfer Digitisation Unit", "Ghana", F, 3_500_000, 2024, 36, "To move social-protection cash transfers onto mobile money with grievance redress.", "Project"],
  ["Remit Fair Initiative", "Multiple countries", F, 2_100_000, 2023, 36, "To reduce the cost of intra-African remittances through price transparency and new corridors.", "Project"],
  ["Adaeze Women’s Fund", "Nigeria", G, 5_000_000, 2026, 60, "To provide flexible core funding to 60 women-led grassroots organisations across Nigeria.", "Core support"],
  ["Bright Futures Girls’ Network", "Ethiopia", G, 2_700_000, 2026, 36, "To run safe-space mentoring clubs that delay child marriage for 45,000 adolescent girls.", "Project"],
  ["Sahel Gender Data Observatory", "Senegal", G, 1_100_000, 2025, 36, "To produce sex-disaggregated time-use and asset-ownership surveys with national statistics offices.", "Research"],
  ["Women in Agribusiness Africa", "Uganda", G, 1_750_000, 2025, 36, "To provide business coaching and finance links to 8,000 women agri-entrepreneurs.", "Project"],
  ["Lead Her Council", "Kenya", G, 650_000, 2024, 24, "To build a leadership pipeline of women in county public-health and finance roles.", "Project"],
  ["Childcare Works Coalition", "Nigeria", G, 1_300_000, 2024, 36, "To pilot community childcare centres in Lagos markets so women traders can work full days.", "Project"],
  ["ReadRight Africa", "Nigeria", E, 11_500_000, 2026, 60, "To support three states to adopt structured pedagogy for literacy in Hausa, Yoruba and English.", "Project"],
  ["Kalamu Teacher Coaching Trust", "Kenya", E, 3_200_000, 2026, 36, "To train 6,000 instructional coaches and build a teacher-support SMS platform.", "Project"],
  ["CodeBridge Academy", "Rwanda", E, 2_400_000, 2026, 24, "To train 5,000 young people in software, data and cloud skills with employer-backed placements.", "Project"],
  ["Girls in STEM Collective", "Ghana", E, 1_150_000, 2025, 36, "To provide bursaries and mentoring to 3,500 girls studying science in senior high school.", "Project"],
  ["Learning Metrics Lab", "Multiple countries", E, 2_050_000, 2025, 36, "To build open, low-cost foundational learning assessments aligned to national curricula.", "Research"],
  ["Freetown Digital Classrooms", "Sierra Leone", E, 870_000, 2024, 24, "To trial solar-powered radio and tablet lessons for out-of-school children.", "Research"],
  ["Lagos Youth Tech Pathways", "Nigeria", E, 3_600_000, 2024, 36, "To connect 12,000 young people in Lagos to digital-skills training and first jobs.", "Project"],
  ["Northern Girls Secondary Bursary Fund", "Nigeria", E, 4_250_000, 2023, 48, "To keep 22,000 girls in senior secondary school in Bauchi, Gombe and Jigawa.", "Project"],
  ["Johannesburg Data Science Fellows", "South Africa", E, 1_050_000, 2022, 24, "To fund a fellowship placing young data scientists in public-health agencies.", "Project"],
  ["Kinshasa Literacy Partnership", "DR Congo", E, 1_900_000, 2023, 36, "To support French and Lingala early-grade reading materials for 900 schools.", "Project"],
  ["Douala Maternal Health Coalition", "Cameroon", H, 2_350_000, 2022, 36, "To improve facility-based delivery quality in the Littoral Region.", "Project"],
  ["Nile Delta Smallholder Water Project", "Egypt", A, 1_600_000, 2022, 36, "To introduce low-cost drip irrigation and water-use monitoring for smallholders.", "Project"],
];

export const grants: Grant[] = rows.map(([grantee, country, focus, amountUsd, year, months, purpose, type], i) => ({
  id: `MF-${year}-${String(1040 + i * 7).padStart(4, "0")}`,
  grantee,
  country,
  focus,
  amountUsd,
  year,
  durationMonths: months,
  purpose,
  type: type ?? "Project",
  region: REGION[country] ?? "Pan-African",
}));

export const getGrant = (id: string) => grants.find((g) => g.id === id);
export const grantCountries = Array.from(new Set(grants.map((g) => g.country))).sort();
export const grantYears = Array.from(new Set(grants.map((g) => g.year))).sort((a, b) => b - a);
export const grantsByFocus = (slug: string) => grants.filter((g) => g.focus === slug).sort((a, b) => b.year - a.year || b.amountUsd - a.amountUsd);

// Committed grants by year (USD m), all focus areas — used on the home page and transparency.
export const commitmentsByYear = [
  { year: 2017, health: 210, agriculture: 140, finance: 60, gender: 30, education: 55 },
  { year: 2018, health: 228, agriculture: 152, finance: 72, gender: 36, education: 61 },
  { year: 2019, health: 245, agriculture: 160, finance: 84, gender: 41, education: 66 },
  { year: 2020, health: 302, agriculture: 158, finance: 98, gender: 44, education: 70 },
  { year: 2021, health: 296, agriculture: 171, finance: 105, gender: 49, education: 74 },
  { year: 2022, health: 288, agriculture: 186, finance: 112, gender: 55, education: 81 },
  { year: 2023, health: 301, agriculture: 194, finance: 121, gender: 61, education: 88 },
  { year: 2024, health: 318, agriculture: 205, finance: 128, gender: 66, education: 94 },
  { year: 2025, health: 326, agriculture: 214, finance: 137, gender: 72, education: 101 },
];
