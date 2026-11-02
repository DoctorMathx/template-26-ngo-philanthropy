# Meridian Foundation — FinStore NGO Template 26 (Philanthropy / Grantmaking Foundation)

A premium website template for large grantmaking foundations and philanthropies: an endowed, pan-African foundation that
makes grants across focus areas, publishes every grant, reports on continental progress with data, invites grant seekers
to apply, and lets individuals and companies co-fund pooled funds with matching.

The design language is **"clean institutional, data-forward"**: a white canvas, deep navy (`#0B1F3A`) for text and dark
bands, a confident cobalt accent (`#0072CE`, AA on white) and one warm coral highlight (`#F2795B`) used only in charts and
stat call-outs. Newsreader (serif headlines) is paired with Public Sans (body). The layout is a strict grid with thin rules,
rectangular imagery with captions, colour-coded focus areas, "fact" cards with big numbers and sources, a mega-menu by
focus area, and many pure-SVG/CSS data visualisations (line charts with scenario bands, stacked columns, stacked bars,
horizontal bars, sparklines, small multiples).

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No chart or UI libraries, no
backend: every form is fully interactive client-side and sends nothing, and every payment is simulated.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Data-driven homepage (modules below) |
| `/our-work` | The five focus areas (the foundation's "programmes"), with a commitments bar chart |
| `/our-work/[slug]` | Focus-area strategy: overview, priorities, "the challenge in numbers" fact cards, a data chart (with data table), key partners, related grants (table + by-country bars), open calls, pooled-fund CTA, stories |
| `/grants` | **Committed grants database** — 48 grants; search, multi-filters (focus area, country, year, amount band), sort, pagination, results count + total, US$/₦ toggle, active-filter chips, shareable URL, and a client-side **CSV export** |
| `/grants/[id]` | Grant record (amount in US$ and ₦, duration, type, region, similar grants) |
| `/progress` | **Progress Report** — a scrolling data story: scorecard of small multiples, then 8 indicators (child mortality, maternal mortality, malaria, vaccination coverage, smallholder yields, account ownership, girls' secondary completion, learning poverty), each with an SVG line chart of actual vs. current-trajectory / best-case / worst-case scenarios to 2035, narrative, stat call-out, source line and a "view data" table; sticky scroll-spy index; methodology |
| `/how-we-work` | Grantmaking principles, 6-step process, what we do/don't fund, grantee-perception chart |
| `/how-we-work/grant-opportunities` | Open calls (status, deadline + days left, budget range, duration, geography, eligibility), "how our grantmaking works" stepper, a **4-step letter-of-inquiry form** with validation (prefill with `?call=<slug>`), and resources for grantees (`#` downloads) |
| `/give` | **Pooled funds** (Malaria-Free Africa, Smallholder Prosperity, Girls' Learning, Women's Digital Finance) with raised/goal and matching-cap progress, a **matching calculator**, use-of-funds stacked bars, corporate co-funding tiers, FAQ — each fund feeds the donate flow |
| `/donate` | One-time/monthly/annual, preset amounts with impact lines, custom amount, designation (general / pooled fund / appeal / focus area), live 1:1 match preview, cover-fees, tribute, anonymous, individual or company, donor details, Card / Bank transfer (copyable account + reference) / USSD tabs, sticky summary. Prefill: `?amount=&frequency=&campaign=&fund=&programme=&designation=` |
| `/donate/thank-you` | Receipt (reference, date, gift, fee, matched amount, frequency, designation, method, tax note), print, share, next steps |
| `/campaigns`, `/campaigns/[slug]` | Time-bound appeals: raised vs goal, %, donors, days left; story, use of funds, updates timeline, recent donors, prefilled donate CTAs |
| `/partnerships` | Institutional funders & corporates: why partner, three tiers, current partners (styled text logos), how grant funds are managed, proposal enquiry form |
| `/transparency` | Income and expenditure (stacked bars), "of every ₦1,000", commitments trend, reports (`#`), registration & governance, board of trustees |
| `/impact` | Results attributed to grants (big numbers + sparklines), grants by region, commitments by focus area, methodology |
| `/stories`, `/stories/[slug]` | Features, data stories, perspectives and grantee voices |
| `/newsroom`, `/newsroom/[slug]` | Press releases, media contacts by region, fact sheet, brand assets |
| `/events` | Convenings, co-funder briefings, webinars, fundraiser; registration form |
| `/get-involved` | Skilled volunteering form, fundraiser / giving-circle form, partner routes |
| `/about` | Mission, vision, values, history timeline, executive team, board, offices |
| `/contact` | Desk emails, contact form, three offices with map placeholders |
| `/faq` | Grouped accordion: giving & matching, receipts & tax, applying for grants, data & media |

Also: `opengraph-image`, `twitter-image`, `sitemap.xml`, `robots.txt`, a custom 404, and permanent redirects
`/programmes → /our-work`, `/programmes/:slug → /our-work/:slug`, `/news → /newsroom`, `/funding → /partnerships`
(programmes *are* the focus areas, so there are no duplicate pages).

## Home modules

`siteConfig.home.modules` in `lib/site-config.ts` controls the homepage. Reorder or remove entries:

`hero` · `factStrip` · `focusAreas` · `progressTeaser` · `grantsTeaser` · `pooledFunds` · `opportunities` · `campaigns` ·
`stories` · `newsroom` · `transparency` · `events` · `finalCta`

## Customising (file map)

- **Brand, offices, legal name, bank & USSD details, donation presets, fee rate, matching note, FX rate (₦ per US$), home modules**: `lib/site-config.ts`
- **Focus areas** (strategy text, priorities, fact cards, chart series, partners, colours, directors): `mock/focus-areas.ts`
- **Committed grants** (add rows to the `rows` array; ids are generated) and commitments by year: `mock/grants.ts`
- **Progress Report** indicators (actual + scenario series, targets, narrative, sources) and methodology: `mock/progress.ts`
- **Pooled funds** (goal, raised, matching cap, use of funds): `mock/funds.ts`
- **Appeals**: `mock/campaigns.ts` · **Open calls, grantmaking steps, grantee resources**: `mock/opportunities.ts`
- **Stories**: `mock/stories.ts` · **Press releases, media contacts, fact sheet**: `mock/newsroom.ts` · **Events**: `mock/events.ts`
- **Mission, values, history, leadership, board, funding partners & tiers, financials, results, FAQs**: `mock/organisation.ts`
- **Mega-menu & footer navigation**: `mock/navigation.ts` · **Images** (verified Unsplash ids): `mock/images.ts`
- **Donation designations**: `lib/designations.ts` (built automatically from funds, appeals and focus areas)
- **Design tokens** (navy, cobalt, sky, coral, focus-area colours, paper, lines): `app/globals.css` `:root`
- **Charts**: `components/charts/` — `LineChart` (scenario bands, targets, projection divider, wide + phone layouts, data table), `IndicatorChart`, `HBarChart`, `StackedBar`, `StackedColumns`, `Sparkline`

Fonts are Newsreader and Public Sans, loaded through `next/font/google`. The only environment variable is
`NEXT_PUBLIC_SITE_URL`, which sets the canonical URL and `metadataBase`.

All organisations, people and figures are fictional or illustrative template data; chart source lines say so.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. For a production build, run `npm run build && npm start`.
