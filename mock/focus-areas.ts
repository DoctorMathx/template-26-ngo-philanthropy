import type { FocusArea, FocusSlug } from "@/lib/types";
import { IMG } from "./images";

// The foundation's "programmes" are its five focus areas. Each has a strategy page at /our-work/[slug].
// All figures are illustrative template data, modelled on publicly reported continental trends.

const yrs = (from: number, vals: number[]) => vals.map((y, i) => ({ x: from + i, y }));

export const focusAreas: FocusArea[] = [
  {
    slug: "global-health",
    name: "Global Health",
    short: "Health",
    colorVar: "--fa-health",
    color: "#0072CE",
    icon: "HeartPulse",
    tagline: "No mother, newborn or child should die of a preventable cause.",
    summary:
      "We fund malaria control, maternal and newborn care and routine immunisation — and the primary health systems, data and supply chains that make them work at scale.",
    image: IMG.bloodPressure,
    imageAlt: "A community health worker checks a woman’s blood pressure at a clinic",
    caption: "A community health worker takes a blood-pressure reading during an antenatal outreach day.",
    strategy: [
      {
        heading: "Our approach",
        body: "Africa carries more than 90% of the world’s malaria deaths and the highest rates of maternal and newborn mortality. Our grants back proven, low-cost interventions — bed nets, seasonal malaria chemoprevention, skilled birth attendance, vaccines — and invest in the primary health care systems that deliver them every day, not just during campaigns.",
      },
      {
        heading: "Where we focus",
        body: "We work with ministries of health, national malaria programmes and community health worker networks in Nigeria, Kenya, Ghana, Uganda, Malawi and Mozambique, prioritising the districts with the highest burden and the weakest coverage.",
      },
      {
        heading: "How we measure success",
        body: "Every health grant reports against a shared results framework: under-five mortality, coverage of key interventions, stock-out rates and the share of births attended by skilled staff. Independent evaluators review our largest programmes every three years.",
      },
    ],
    priorities: [
      { title: "Malaria", body: "Next-generation nets, seasonal chemoprevention, surveillance and the new malaria vaccines delivered through routine immunisation." },
      { title: "Maternal & newborn health", body: "Skilled birth attendance, emergency obstetric care, kangaroo mother care and postnatal home visits in the first 48 hours." },
      { title: "Immunisation", body: "Reaching ‘zero-dose’ children with routine vaccines through better microplanning, cold chain and community demand." },
      { title: "Primary health care", body: "Community health workers, digital health records and last-mile supply chains for essential medicines." },
    ],
    facts: [
      { value: "1 in 14", label: "children in sub-Saharan Africa die before their fifth birthday", source: "UN IGME, 2025 (illustrative)", highlight: true },
      { value: "94%", label: "of global malaria deaths occur in the WHO African Region", source: "WHO World Malaria Report (illustrative)" },
      { value: "70%", label: "of the world’s maternal deaths happen in sub-Saharan Africa", source: "WHO maternal mortality estimates (illustrative)" },
      { value: "8.1m", label: "‘zero-dose’ children in Africa missed every routine vaccine", source: "WHO/UNICEF WUENIC (illustrative)" },
    ],
    chart: {
      title: "Malaria deaths are falling — but progress has stalled since 2015",
      subtitle: "Malaria deaths per 100,000 people at risk, WHO African Region",
      unit: "deaths per 100k",
      yMax: 160,
      series: [
        { label: "Actual", kind: "actual", points: yrs(2000, [149, 146, 140, 133, 126, 119, 112, 104, 96, 89, 82, 76, 71, 67, 63, 60, 58, 57, 56, 55, 60, 58, 55, 54, 52]) },
        { label: "Target pathway", kind: "target", points: yrs(2015, [60, 56, 51, 47, 42, 38, 34, 30, 26, 22, 18]) },
      ],
      source: "Source: WHO World Malaria Report series (illustrative template data).",
    },
    partners: ["Sahel Malaria Consortium", "Lakeside Institute for Health Research", "Northern States PHC Alliance", "Mama Salama Midwives Network", "ColdLink Africa", "Kanem Community Health Trust"],
    committedUsd: 1_240_000_000,
    activeGrants: 186,
    countries: ["Nigeria", "Kenya", "Ghana", "Uganda", "Malawi", "Mozambique"],
    director: { name: "Dr. Ifeoma Nwachukwu", role: "Director, Global Health" },
  },
  {
    slug: "agricultural-development",
    name: "Agricultural Development",
    short: "Agriculture",
    colorVar: "--fa-agriculture",
    color: "#3E8E41",
    icon: "Sprout",
    tagline: "Smallholder farmers feeding a continent — and earning a living doing it.",
    summary:
      "We help smallholder farmers, most of them women, grow more, lose less and sell for more: improved seed, soil health, climate adaptation, extension and fair access to markets.",
    image: IMG.farmers,
    imageAlt: "Smallholder farmers working rows of vegetables in a green field",
    caption: "Members of a farmer cooperative weed a demonstration plot for drought-tolerant varieties.",
    strategy: [
      {
        heading: "Our approach",
        body: "Two-thirds of working Africans earn a living from farming, yet cereal yields remain a fraction of global averages. We invest across the value chain — from breeding programmes and seed systems to digital advisory services and off-taker contracts — so that productivity gains reach farmers’ pockets.",
      },
      {
        heading: "Where we focus",
        body: "Nigeria’s grain belt, Kenya’s highlands, Ethiopia, Tanzania and Zambia, with a growing portfolio on climate-resilient livestock and aquaculture in the Sahel and the Lake Victoria basin.",
      },
      {
        heading: "How we measure success",
        body: "Yield per hectare, post-harvest loss, household farm income and the share of income controlled by women farmers — tracked through annual farm panels of 40,000 households.",
      },
    ],
    priorities: [
      { title: "Seed systems", body: "Drought- and heat-tolerant varieties of maize, sorghum, cassava and beans, delivered through local seed companies." },
      { title: "Soil health & inputs", body: "Site-specific fertiliser advice, lime, organic matter and affordable credit for inputs." },
      { title: "Digital advisory", body: "SMS, IVR and radio advice in local languages, reaching farmers who never meet an extension worker." },
      { title: "Markets", body: "Aggregation, storage and off-taker contracts that cut post-harvest loss and improve prices." },
    ],
    facts: [
      { value: "1.6 t/ha", label: "average cereal yield in sub-Saharan Africa — about 40% of the global average", source: "FAOSTAT (illustrative)", highlight: true },
      { value: "33m", label: "smallholder farms produce up to 70% of the region’s food supply", source: "IFAD (illustrative)" },
      { value: "30%", label: "of food produced is lost between harvest and market", source: "African Postharvest Losses Information System (illustrative)" },
    ],
    chart: {
      title: "Cereal yields are rising, but too slowly to keep pace with demand",
      subtitle: "Average cereal yield, tonnes per hectare, sub-Saharan Africa vs. world",
      unit: "t/ha",
      yMax: 4.5,
      series: [
        { label: "Sub-Saharan Africa", kind: "actual", points: yrs(2000, [1.12, 1.14, 1.13, 1.18, 1.2, 1.24, 1.27, 1.25, 1.3, 1.32, 1.36, 1.38, 1.37, 1.42, 1.45, 1.44, 1.48, 1.5, 1.52, 1.54, 1.55, 1.57, 1.56, 1.6, 1.62]) },
        { label: "World average", kind: "projection", points: yrs(2000, [3.06, 3.1, 3.12, 3.15, 3.32, 3.3, 3.34, 3.4, 3.52, 3.55, 3.6, 3.68, 3.66, 3.8, 3.9, 3.92, 4.0, 4.05, 4.02, 4.1, 4.12, 4.15, 4.13, 4.2, 4.24]) },
      ],
      source: "Source: FAOSTAT cereal production series (illustrative template data).",
    },
    partners: ["Savanna Seed Partnership", "Rift Valley Agronomy Centre", "Harvest Bridge Cooperatives", "Oja Market Systems Lab", "SoilWise Africa", "Radio Gona Farmer Network"],
    committedUsd: 860_000_000,
    activeGrants: 124,
    countries: ["Nigeria", "Kenya", "Ethiopia", "Tanzania", "Zambia", "Ghana"],
    director: { name: "Kwame Asante-Mensah", role: "Director, Agricultural Development" },
  },
  {
    slug: "financial-inclusion",
    name: "Financial Inclusion",
    short: "Finance",
    colorVar: "--fa-finance",
    color: "#00838F",
    icon: "Smartphone",
    tagline: "Digital money that works for the people banks never reached.",
    summary:
      "We back inclusive digital public infrastructure — instant payments, digital ID, agent networks and consumer protection — so that poor households can save, borrow, insure and get paid safely.",
    image: IMG.phoneHands,
    imageAlt: "Hands holding a mobile phone to make a payment",
    caption: "A trader confirms an instant payment on her phone at a market stall.",
    strategy: [
      {
        heading: "Our approach",
        body: "A woman with a mobile money account can receive a cash transfer in seconds, save without a mattress, and build the credit history she needs to grow her business. We fund the rails — interoperable instant payments, agent liquidity, digital ID — and the guardrails: consumer protection, fraud prevention and financial-health research.",
      },
      {
        heading: "Where we focus",
        body: "Nigeria, Kenya, Ethiopia, Ghana, Tanzania and regional payment initiatives that connect them — with a special focus on women, rural households and smallholder farmers.",
      },
      {
        heading: "How we measure success",
        body: "Account ownership and active use, the gender gap in account ownership, the cost of sending money, and the share of government payments made digitally.",
      },
    ],
    priorities: [
      { title: "Inclusive instant payments", body: "Low-cost, interoperable real-time payment systems that any bank, fintech or mobile operator can join." },
      { title: "Women’s financial inclusion", body: "Closing the gender gap through agent networks, product design and women’s digital ID enrolment." },
      { title: "Digital public infrastructure", body: "Digital ID and data-sharing standards built with privacy and redress from day one." },
      { title: "Consumer protection", body: "Supervision tools, complaints systems and research on digital-credit harms." },
    ],
    facts: [
      { value: "49%", label: "of adults in sub-Saharan Africa have an account — up from 23% in 2011", source: "World Bank Global Findex (illustrative)", highlight: true },
      { value: "12 pts", label: "gender gap in account ownership between men and women", source: "World Bank Global Findex (illustrative)" },
      { value: "7.9%", label: "average cost of sending $200 into the region — the highest of any region", source: "World Bank Remittance Prices Worldwide (illustrative)" },
    ],
    chart: {
      title: "Account ownership has doubled in a decade — the gender gap has not closed",
      subtitle: "Adults with an account at a financial institution or mobile money provider, %",
      unit: "%",
      yMax: 80,
      series: [
        { label: "Men", kind: "actual", points: [{ x: 2011, y: 27 }, { x: 2014, y: 38 }, { x: 2017, y: 48 }, { x: 2021, y: 55 }, { x: 2024, y: 60 }] },
        { label: "Women", kind: "projection", points: [{ x: 2011, y: 20 }, { x: 2014, y: 30 }, { x: 2017, y: 37 }, { x: 2021, y: 43 }, { x: 2024, y: 48 }] },
      ],
      source: "Source: World Bank Global Findex Database (illustrative template data).",
    },
    partners: ["Pan-African Instant Payments Lab", "AgentLink Nigeria", "Kasi Fintech Collective", "Women’s Money Network Africa", "Open ID Africa Initiative", "Fair Credit Research Centre"],
    committedUsd: 540_000_000,
    activeGrants: 71,
    countries: ["Nigeria", "Kenya", "Ethiopia", "Ghana", "Tanzania", "Rwanda"],
    director: { name: "Amaka Obi-Lawson", role: "Director, Financial Inclusion" },
  },
  {
    slug: "gender-equality",
    name: "Gender Equality",
    short: "Gender",
    colorVar: "--fa-gender",
    color: "#B03A78",
    icon: "Scale",
    tagline: "When women and girls have power over their own lives, everyone gains.",
    summary:
      "We invest in women’s economic power, girls’ agency and leadership, and the data that makes women’s lives visible — and we apply a gender lens to every grant we make.",
    image: IMG.entrepreneur,
    imageAlt: "A smiling woman entrepreneur in a yellow blazer holding a tablet",
    caption: "A participant in a women’s enterprise accelerator reviews her quarterly sales.",
    strategy: [
      {
        heading: "Our approach",
        body: "Gender equality is both a focus area and a lens. We make dedicated grants on women’s economic empowerment, adolescent girls and women’s leadership, and we require every programme across the foundation to disaggregate results by sex and report on who benefits.",
      },
      {
        heading: "Where we focus",
        body: "Nigeria, Kenya, Senegal, Ethiopia, Uganda and South Africa, with regional grants to women’s funds and research networks across the continent.",
      },
      {
        heading: "How we measure success",
        body: "Women’s income and control over assets, girls’ transition to secondary school, child marriage rates and women’s representation in decision-making.",
      },
    ],
    priorities: [
      { title: "Women’s economic power", body: "Enterprise finance, childcare solutions and collective enterprise for women in the informal economy." },
      { title: "Adolescent girls", body: "Safe spaces, life-skills mentoring and programmes that delay marriage and first birth." },
      { title: "Women’s leadership", body: "Support for women leaders in public health, agriculture and public finance." },
      { title: "Gender data", body: "Sex-disaggregated statistics and time-use surveys so policy sees women’s unpaid work." },
    ],
    facts: [
      { value: "1 in 3", label: "young women in sub-Saharan Africa are married before age 18", source: "UNICEF child marriage database (illustrative)", highlight: true },
      { value: "₦4.2tn", label: "estimated annual GDP gain in Nigeria from closing the gender gap in farm productivity", source: "Meridian analysis (illustrative)" },
      { value: "26%", label: "of seats in national parliaments in sub-Saharan Africa held by women", source: "Inter-Parliamentary Union (illustrative)" },
    ],
    chart: {
      title: "Child marriage is declining, but not fast enough to end it by 2030",
      subtitle: "Women aged 20–24 first married before age 18, sub-Saharan Africa, %",
      unit: "%",
      yMax: 50,
      series: [
        { label: "Actual", kind: "actual", points: yrs(2000, [44, 43.5, 43, 42.4, 41.8, 41.2, 40.5, 40, 39.3, 38.6, 38, 37.4, 36.8, 36.2, 35.6, 35, 34.5, 34, 33.4, 33, 32.6, 32.2, 31.8, 31.4, 31]) },
        { label: "Path to 2030 goal", kind: "target", points: yrs(2024, [31, 26, 21, 16, 11, 6, 1]) },
      ],
      source: "Source: UNICEF global databases (illustrative template data).",
    },
    partners: ["Adaeze Women’s Fund", "Bright Futures Girls’ Network", "Sahel Gender Data Observatory", "Women in Agribusiness Africa", "Lead Her Council"],
    committedUsd: 310_000_000,
    activeGrants: 58,
    countries: ["Nigeria", "Kenya", "Senegal", "Ethiopia", "Uganda", "South Africa"],
    director: { name: "Zanele Dlamini-Mokoena", role: "Director, Gender Equality" },
  },
  {
    slug: "education-digital-skills",
    name: "Education & Digital Skills",
    short: "Education",
    colorVar: "--fa-education",
    color: "#C26A00",
    icon: "GraduationCap",
    tagline: "Every child reading by ten. Every young person ready for a digital economy.",
    summary:
      "We fund foundational literacy and numeracy at scale, keep girls in secondary school, and connect young people to digital skills and the first jobs that use them.",
    image: IMG.girlBlackboard,
    imageAlt: "A schoolgirl writing on a chalkboard in a classroom",
    caption: "A Primary 4 pupil works through a structured-pedagogy numeracy lesson.",
    strategy: [
      {
        heading: "Our approach",
        body: "Nine in ten ten-year-olds in sub-Saharan Africa cannot read a simple text. We back structured pedagogy — teacher guides, lesson plans and coaching — that has been shown to double learning in a single school year, and we help governments adopt it system-wide.",
      },
      {
        heading: "Where we focus",
        body: "Nigeria, Kenya, Rwanda, Sierra Leone and Ghana for foundational learning; Lagos, Nairobi, Kigali and Johannesburg for digital-skills and youth-employment programmes.",
      },
      {
        heading: "How we measure success",
        body: "Learning poverty, girls’ secondary completion, youth digital-skills attainment and the share of trainees in work six months after graduating.",
      },
    ],
    priorities: [
      { title: "Foundational learning", body: "Structured pedagogy, mother-tongue instruction and assessment tools adopted by state education boards." },
      { title: "Girls’ secondary education", body: "Bursaries, safe transport and menstrual-health support that keep girls in school to completion." },
      { title: "Digital skills", body: "Coding, data and digital-marketing bootcamps with employer co-design and job placement." },
      { title: "EdTech evidence", body: "Rigorous trials of low-cost technology — radio, SMS, tablets — before anything is scaled." },
    ],
    facts: [
      { value: "89%", label: "of 10-year-olds in sub-Saharan Africa cannot read and understand a simple text", source: "World Bank learning poverty (illustrative)", highlight: true },
      { value: "42%", label: "of girls complete lower secondary school", source: "UNESCO Institute for Statistics (illustrative)" },
      { value: "230m", label: "digital jobs expected in the region by 2030", source: "IFC digital skills study (illustrative)" },
    ],
    chart: {
      title: "More girls are finishing secondary school — but most still do not",
      subtitle: "Upper-secondary completion rate, sub-Saharan Africa, %",
      unit: "%",
      yMax: 60,
      series: [
        { label: "Boys", kind: "projection", points: yrs(2010, [24, 25, 25.5, 26, 27, 27.5, 28, 29, 29.5, 30, 30.5, 31, 32, 32.5, 33]) },
        { label: "Girls", kind: "actual", points: yrs(2010, [17, 18, 18.5, 19.5, 20, 21, 22, 22.5, 23.5, 24, 25, 25.5, 26.5, 27, 28]) },
      ],
      source: "Source: UNESCO Institute for Statistics (illustrative template data).",
    },
    partners: ["ReadRight Africa", "Kalamu Teacher Coaching Trust", "CodeBridge Academy", "Girls in STEM Collective", "Learning Metrics Lab"],
    committedUsd: 420_000_000,
    activeGrants: 83,
    countries: ["Nigeria", "Kenya", "Rwanda", "Sierra Leone", "Ghana", "South Africa"],
    director: { name: "Babajide Adeyemi-Cole", role: "Director, Education & Digital Skills" },
  },
];

export const getFocusArea = (slug: string) => focusAreas.find((f) => f.slug === slug);
export const focusName = (slug: FocusSlug) => focusAreas.find((f) => f.slug === slug)?.name ?? slug;
export const focusColor = (slug: FocusSlug) => focusAreas.find((f) => f.slug === slug)?.color ?? "#0B1F3A";
export const focusShort = (slug: FocusSlug) => focusAreas.find((f) => f.slug === slug)?.short ?? slug;
