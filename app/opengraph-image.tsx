import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0B1F3A";
const COBALT = "#0072CE";
const CORAL = "#F2795B";
const SKY = "#7CC0FF";

export default async function Image() {
  const pts = [180, 172, 160, 150, 138, 128, 118, 110, 104, 98];
  const path = pts.map((y, i) => `${i ? "L" : "M"}${i * 52},${y}`).join(" ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, position: "relative", fontFamily: "serif" }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 80, top: 0, bottom: 0, width: 1, background: "rgba(124,192,255,.10)", display: "flex" }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", flex: 1, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ width: 3, height: 50, background: COBALT, display: "flex" }} />
              <div style={{ position: "absolute", top: 14, width: 10, height: 10, borderRadius: 999, background: CORAL, display: "flex" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, color: "#fff" }}>Meridian</span>
              <span style={{ fontSize: 13, letterSpacing: 6, color: SKY, fontFamily: "sans-serif", fontWeight: 700 }}>FOUNDATION</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
              <span style={{ fontSize: 68, lineHeight: 1.05, color: "#fff", letterSpacing: -1.5 }}>Evidence-led philanthropy for Africa.</span>
              <span style={{ marginTop: 22, fontSize: 24, color: "#A9B8CC", fontFamily: "sans-serif" }}>Health · Agriculture · Financial inclusion · Gender · Education</span>
            </div>
            <svg width="470" height="200" viewBox="0 0 470 200">
              <path d={path} fill="none" stroke="#fff" strokeWidth="5" />
              <path d="M468,98 L468,60" fill="none" stroke={COBALT} strokeWidth="5" strokeDasharray="10 8" />
              <path d="M468,98 L468,130" fill="none" stroke={CORAL} strokeWidth="5" strokeDasharray="10 8" />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: "#A9B8CC", letterSpacing: 3, fontFamily: "sans-serif", fontWeight: 700 }}>
            <span>LAGOS · NAIROBI · JOHANNESBURG</span>
            <span>{siteConfig.brand.domain.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
