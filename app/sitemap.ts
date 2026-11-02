import type { MetadataRoute } from "next";
import { focusAreas } from "@/mock/focus-areas";
import { grants } from "@/mock/grants";
import { campaigns } from "@/mock/campaigns";
import { stories } from "@/mock/stories";
import { pressReleases } from "@/mock/newsroom";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-26-ngo-philanthropy.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/our-work", "/grants", "/progress", "/how-we-work", "/how-we-work/grant-opportunities", "/give", "/donate", "/campaigns", "/partnerships", "/transparency", "/impact", "/stories", "/newsroom", "/events", "/get-involved", "/about", "/contact", "/faq"];
  return [
    ...statics.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...focusAreas.map((f) => ({ url: `${siteUrl}/our-work/${f.slug}`, lastModified: now, priority: 0.9 })),
    ...grants.map((g) => ({ url: `${siteUrl}/grants/${g.id}`, lastModified: now, priority: 0.4 })),
    ...campaigns.map((c) => ({ url: `${siteUrl}/campaigns/${c.slug}`, lastModified: now })),
    ...stories.map((s) => ({ url: `${siteUrl}/stories/${s.slug}`, lastModified: new Date(s.date) })),
    ...pressReleases.map((p) => ({ url: `${siteUrl}/newsroom/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
