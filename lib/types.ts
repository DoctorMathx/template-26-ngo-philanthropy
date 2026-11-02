export type FocusSlug = "global-health" | "agricultural-development" | "financial-inclusion" | "gender-equality" | "education-digital-skills";

export type Fact = { value: string; label: string; source: string; highlight?: boolean };

export type Series = { label: string; points: { x: number; y: number }[]; kind?: "actual" | "projection" | "best" | "worst" | "target" };

export type FocusArea = {
  slug: FocusSlug;
  name: string;
  short: string;
  colorVar: string; // CSS var name, e.g. "--fa-health"
  color: string; // hex for SVG/OG use
  icon: "HeartPulse" | "Sprout" | "Smartphone" | "Scale" | "GraduationCap";
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  caption: string;
  strategy: { heading: string; body: string }[];
  priorities: { title: string; body: string }[];
  facts: Fact[];
  chart: {
    title: string;
    subtitle: string;
    unit: string;
    yMax: number;
    series: Series[];
    source: string;
  };
  partners: string[];
  committedUsd: number;
  activeGrants: number;
  countries: string[];
  director: { name: string; role: string };
};

export type Grant = {
  id: string;
  grantee: string;
  country: string;
  focus: FocusSlug;
  amountUsd: number;
  year: number;
  durationMonths: number;
  purpose: string;
  type: "Project" | "Core support" | "Research" | "Programme-related investment";
  region: "West Africa" | "East Africa" | "Southern Africa" | "Central Africa" | "North Africa" | "Pan-African";
};

export type Indicator = {
  slug: string;
  number: number;
  title: string;
  focus: FocusSlug;
  question: string;
  unit: string;
  yMin: number;
  yMax: number;
  higherIsBetter: boolean;
  actual: { x: number; y: number }[];
  current: { x: number; y: number }[];
  best: { x: number; y: number }[];
  worst: { x: number; y: number }[];
  target?: { year: number; value: number; label: string };
  headline: string;
  narrative: string[];
  stat: { value: string; label: string };
  source: string;
};

export type PooledFund = {
  slug: string;
  name: string;
  focus: FocusSlug;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  raisedNaira: number;
  goalNaira: number;
  matchCapNaira: number;
  matchedNaira: number;
  coFunders: number;
  uses: { label: string; pct: number }[];
  minCorporate: number;
  perks: string[];
};

export type Campaign = {
  slug: string;
  title: string;
  fund: string; // pooled fund slug
  focus: FocusSlug;
  summary: string;
  story: string[];
  image: string;
  imageAlt: string;
  caption: string;
  goal: number;
  raised: number;
  donors: number;
  deadline: string;
  location: string;
  budget: { label: string; amount: number }[];
  updates: { date: string; title: string; body: string }[];
  recentDonors: { name: string; amount: number; when: string }[];
  presets: number[];
};

export type Opportunity = {
  slug: string;
  title: string;
  focus: FocusSlug;
  status: "Open" | "Opening soon" | "Closed";
  opens: string;
  deadline: string;
  budgetMinUsd: number;
  budgetMaxUsd: number;
  duration: string;
  geography: string;
  summary: string;
  eligibility: string[];
  priorities: string[];
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  type: "Feature" | "Perspective" | "Data story" | "Grantee voice";
  focus: FocusSlug;
  date: string;
  author: string;
  authorRole: string;
  readMins: number;
  image: string;
  imageAlt: string;
  caption: string;
  body: { h?: string; p?: string; quote?: string }[];
  stat?: { value: string; label: string; source: string };
};

export type PressRelease = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
  body: string[];
  focus?: FocusSlug;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  format: "In person" | "Online" | "Hybrid";
  type: "Convening" | "Webinar" | "Briefing" | "Fundraiser";
  summary: string;
  audience: string;
  focus?: FocusSlug;
};

export type Person = { name: string; role: string; bio: string; image?: string; office?: string };
