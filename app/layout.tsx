import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { UtilityBar } from "@/components/layout/utility-bar";
import { MobileDonateBar } from "@/components/layout/mobile-donate-bar";
import { siteConfig } from "@/lib/site-config";

const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], display: "swap", style: ["normal", "italic"] });
const sans = Public_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-26-ngo-philanthropy.vercel.app").replace(/\/$/, "");

export const viewport: Viewport = { themeColor: "#0B1F3A" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: ["philanthropy Africa", "foundation Nigeria", "grants Africa", "malaria", "maternal health", "smallholder agriculture", "financial inclusion", "gender equality", "education", "pooled fund", "FinStore template"],
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteUrl,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] btn btn-primary">
          Skip to content
        </a>
        <UtilityBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileDonateBar />
      </body>
    </html>
  );
}
