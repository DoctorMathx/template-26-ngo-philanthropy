import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // "Programmes" are the foundation's focus areas — keep one canonical URL for each.
  async redirects() {
    return [
      { source: "/programmes", destination: "/our-work", permanent: true },
      { source: "/programmes/:slug", destination: "/our-work/:slug", permanent: true },
      { source: "/news", destination: "/newsroom", permanent: true },
      { source: "/funding", destination: "/partnerships", permanent: true },
    ];
  },
};

export default nextConfig;
