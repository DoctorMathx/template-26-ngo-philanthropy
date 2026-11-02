import type { Campaign } from "@/lib/types";
import { IMG } from "./images";

// Time-bound appeals. Each one feeds a pooled fund and is matched by the foundation.

export const campaigns: Campaign[] = [
  {
    slug: "rainy-season-malaria-2027",
    title: "Before the rains: protect 250,000 children from malaria",
    fund: "malaria-free-africa",
    focus: "global-health",
    summary: "Seasonal malaria chemoprevention for children under five in Zamfara and Kebbi — delivered door to door before the 2027 rainy season.",
    story: [
      "Every year between July and October, the rains bring a surge in malaria across Nigeria’s Sahel belt. Children under five account for most of the deaths.",
      "Seasonal malaria chemoprevention (SMC) — four monthly doses of preventive medicine given door to door by trained community distributors — cuts clinical malaria in young children by up to 75% during the high-transmission season.",
      "This appeal funds medicines, distributor stipends, training and the independent coverage survey for 250,000 children in 14 local government areas. Every naira you give is matched by the foundation.",
    ],
    image: IMG.boyPeek,
    imageAlt: "A young boy peeking over a ledge and smiling",
    caption: "A child in Kebbi State, where seasonal malaria chemoprevention begins in June.",
    goal: 450_000_000,
    raised: 318_600_000,
    donors: 6_204,
    deadline: "2027-03-31",
    location: "Zamfara & Kebbi States, Nigeria",
    budget: [
      { label: "SMC medicines (4 cycles)", amount: 198_000_000 },
      { label: "Community distributor stipends", amount: 126_000_000 },
      { label: "Training & supervision", amount: 72_000_000 },
      { label: "Independent coverage survey", amount: 54_000_000 },
    ],
    updates: [
      { date: "2026-10-21", title: "Microplanning complete in 9 LGAs", body: "Ward-level maps and household lists are finalised, with 1,140 distributors recruited from their own communities." },
      { date: "2026-09-30", title: "Matching extended", body: "Following strong early support, the foundation has extended its 1:1 match to the full ₦450m goal." },
      { date: "2026-09-05", title: "Appeal launched", body: "The 2027 appeal opens with a ₦50m lead gift from a Lagos-based bank." },
    ],
    recentDonors: [
      { name: "Chiamaka E.", amount: 50_000, when: "2 hours ago" },
      { name: "Anonymous", amount: 250_000, when: "5 hours ago" },
      { name: "Tolu & Femi A.", amount: 25_000, when: "yesterday" },
      { name: "Halima S.", amount: 10_000, when: "yesterday" },
      { name: "Kano Rotary Club", amount: 1_000_000, when: "2 days ago" },
    ],
    presets: [10_000, 25_000, 100_000, 500_000],
  },
  {
    slug: "seeds-of-resilience",
    title: "Seeds of Resilience: drought-tolerant seed for 40,000 women farmers",
    fund: "smallholder-prosperity",
    focus: "agricultural-development",
    summary: "Getting certified drought-tolerant maize and sorghum seed into the hands of women farmers in Kaduna, Niger and Plateau before planting season.",
    story: [
      "The 2025 dry spell cost many farmers in the middle belt half their harvest. Drought-tolerant varieties exist, but too few farmers — especially women — can buy them on time.",
      "This appeal funds seed vouchers, agronomy training and village demonstration plots run by women lead farmers, plus storage bags that keep the harvest safe from pests.",
    ],
    image: IMG.maizeSprouts,
    imageAlt: "Young maize seedlings growing in rows of dark soil",
    caption: "Drought-tolerant maize at a demonstration plot in Kaduna State.",
    goal: 240_000_000,
    raised: 131_200_000,
    donors: 2_870,
    deadline: "2027-02-15",
    location: "Kaduna, Niger & Plateau States, Nigeria",
    budget: [
      { label: "Seed vouchers", amount: 120_000_000 },
      { label: "Demonstration plots", amount: 48_000_000 },
      { label: "Hermetic storage bags", amount: 42_000_000 },
      { label: "Training & monitoring", amount: 30_000_000 },
    ],
    updates: [
      { date: "2026-10-12", title: "Seed companies selected", body: "Six Nigerian seed companies have been certified to supply vouchers." },
      { date: "2026-08-28", title: "Appeal launched", body: "We’re aiming to reach 40,000 women farmers before the April planting window." },
    ],
    recentDonors: [
      { name: "Ngozi O.", amount: 50_000, when: "3 hours ago" },
      { name: "Abuja Agro Traders", amount: 500_000, when: "yesterday" },
      { name: "Anonymous", amount: 20_000, when: "2 days ago" },
    ],
    presets: [25_000, 50_000, 150_000, 500_000],
  },
  {
    slug: "back-to-school-girls",
    title: "Back to school: keep 5,000 girls in secondary school",
    fund: "girls-learning",
    focus: "education-digital-skills",
    summary: "Bursaries, transport and menstrual-health kits for girls at risk of dropping out in Bauchi, Gombe and Jigawa.",
    story: [
      "Between JSS3 and SS1, thousands of girls in northern Nigeria leave school — because of fees, the distance to the nearest senior secondary school, or pressure to marry.",
      "A bursary of ₦100,000 a year covers fees, books, uniforms and transport. Combined with mentoring and menstrual-health kits, it keeps nine in ten participating girls in school through to SS3.",
    ],
    image: IMG.boyWriting,
    imageAlt: "Students writing in exercise books at a classroom desk",
    caption: "Students at a government secondary school in Gombe State.",
    goal: 500_000_000,
    raised: 377_400_000,
    donors: 4_512,
    deadline: "2027-01-10",
    location: "Bauchi, Gombe & Jigawa States, Nigeria",
    budget: [
      { label: "Bursaries", amount: 300_000_000 },
      { label: "Safe transport", amount: 90_000_000 },
      { label: "Mentoring clubs", amount: 60_000_000 },
      { label: "Menstrual-health kits", amount: 50_000_000 },
    ],
    updates: [
      { date: "2026-10-27", title: "3,800 girls enrolled", body: "Bursaries have been paid for the first term for 3,800 girls across 61 schools." },
      { date: "2026-09-08", title: "Appeal launched", body: "Gifts are matched 1:1 by the foundation up to ₦250m." },
    ],
    recentDonors: [
      { name: "Aisha B.", amount: 100_000, when: "1 hour ago" },
      { name: "Anonymous", amount: 25_000, when: "4 hours ago" },
      { name: "Emeka N.", amount: 100_000, when: "yesterday" },
    ],
    presets: [25_000, 100_000, 200_000, 500_000],
  },
];

export const getCampaign = (slug: string) => campaigns.find((c) => c.slug === slug);
