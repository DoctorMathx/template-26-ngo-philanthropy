import type { PooledFund } from "@/lib/types";
import { IMG } from "./images";

// Pooled funds that individuals and companies can co-fund alongside the foundation.
// Gifts are matched naira-for-naira up to each fund's annual matching cap.

export const funds: PooledFund[] = [
  {
    slug: "malaria-free-africa",
    name: "Malaria-Free Africa Fund",
    focus: "global-health",
    tagline: "Nets, vaccines and chemoprevention for the children most at risk.",
    description:
      "The fund pools gifts from individuals, companies and diaspora networks to buy dual-ingredient bed nets, deliver seasonal malaria chemoprevention and roll out malaria vaccines in the highest-burden local government areas of northern Nigeria and the Sahel.",
    image: IMG.children,
    imageAlt: "A group of smiling children crowding together for a photo",
    raisedNaira: 1_284_000_000,
    goalNaira: 2_000_000_000,
    matchCapNaira: 1_000_000_000,
    matchedNaira: 812_000_000,
    coFunders: 18_420,
    uses: [
      { label: "Dual-ingredient bed nets", pct: 44 },
      { label: "Seasonal chemoprevention", pct: 31 },
      { label: "Vaccine roll-out support", pct: 17 },
      { label: "Surveillance & evaluation", pct: 8 },
    ],
    minCorporate: 25_000_000,
    perks: ["Quarterly data dashboard by LGA", "Named co-funder recognition in the annual report", "Field visit for corporate partners above ₦100m"],
  },
  {
    slug: "smallholder-prosperity",
    name: "Smallholder Prosperity Fund",
    focus: "agricultural-development",
    tagline: "Climate-resilient seed, soil health and fair markets for women farmers.",
    description:
      "The fund backs farmer cooperatives and local seed companies so that smallholders — most of them women — can grow drought-tolerant crops, cut post-harvest losses and sell at fair prices.",
    image: IMG.farmerWeeding,
    imageAlt: "A farmer bending over to tend crops in a green field",
    raisedNaira: 642_000_000,
    goalNaira: 1_200_000_000,
    matchCapNaira: 600_000_000,
    matchedNaira: 402_000_000,
    coFunders: 6_910,
    uses: [
      { label: "Improved seed & inputs", pct: 38 },
      { label: "Storage & aggregation", pct: 27 },
      { label: "Digital & radio advisory", pct: 20 },
      { label: "Market linkages", pct: 15 },
    ],
    minCorporate: 20_000_000,
    perks: ["Harvest-season impact report", "Supply-chain partnership introductions", "Employee field days in Kaduna or Oyo"],
  },
  {
    slug: "girls-learning",
    name: "Girls’ Learning Fund",
    focus: "education-digital-skills",
    tagline: "Bursaries, safe transport and great teaching to keep girls in school.",
    description:
      "The fund keeps adolescent girls in secondary school through bursaries, safe transport and menstrual-health support, and funds structured literacy so every child can read by ten.",
    image: IMG.classroom,
    imageAlt: "Pupils in green uniforms seated in a classroom",
    raisedNaira: 438_000_000,
    goalNaira: 800_000_000,
    matchCapNaira: 400_000_000,
    matchedNaira: 301_000_000,
    coFunders: 9_240,
    uses: [
      { label: "Bursaries & fees", pct: 46 },
      { label: "Teacher coaching", pct: 24 },
      { label: "Safe transport", pct: 18 },
      { label: "Menstrual health", pct: 12 },
    ],
    minCorporate: 15_000_000,
    perks: ["Annual learning-outcomes report", "Mentoring opportunities for staff volunteers", "Scholar letters for individual donors"],
  },
  {
    slug: "women-digital-finance",
    name: "Women’s Digital Finance Fund",
    focus: "financial-inclusion",
    tagline: "Mobile accounts, savings and credit for women in the informal economy.",
    description:
      "The fund onboards market women and rural traders onto safe digital accounts, trains agents, and funds savings groups that build the credit histories women need to grow.",
    image: IMG.market,
    imageAlt: "Colourful fresh vegetables on a market stall",
    raisedNaira: 214_000_000,
    goalNaira: 500_000_000,
    matchCapNaira: 250_000_000,
    matchedNaira: 168_000_000,
    coFunders: 3_120,
    uses: [
      { label: "Account onboarding & ID", pct: 35 },
      { label: "Agent training", pct: 25 },
      { label: "Savings groups", pct: 25 },
      { label: "Consumer protection", pct: 15 },
    ],
    minCorporate: 10_000_000,
    perks: ["Financial-health survey results", "Co-designed product pilots for financial-sector partners", "Named market cohorts"],
  },
];

export const getFund = (slug: string) => funds.find((f) => f.slug === slug);
export const totalMatched = funds.reduce((s, f) => s + f.matchedNaira, 0);
export const totalRaised = funds.reduce((s, f) => s + f.raisedNaira, 0);
export const totalCoFunders = funds.reduce((s, f) => s + f.coFunders, 0);
