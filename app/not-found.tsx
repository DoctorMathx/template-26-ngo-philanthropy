import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 items-center">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="hd-display text-navy mt-4">This page is off the chart.</h1>
          <p className="lede mt-5 max-w-lg">The page you were looking for may have moved. Try one of these instead, or search our grants database.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-navy">Home</Link>
            <Link href="/our-work" className="btn btn-outline">Our work</Link>
            <Link href="/grants" className="btn btn-outline">Search grants</Link>
            <Link href="/progress" className="btn btn-outline">Progress Report</Link>
          </div>
        </div>
        <svg viewBox="0 0 400 240" className="w-full max-w-md text-navy" role="img" aria-label="A line chart that drops off the edge of the axis">
          <line x1="30" y1="210" x2="390" y2="210" stroke="currentColor" strokeOpacity=".5" />
          {[60, 110, 160].map((y) => <line key={y} x1="30" x2="390" y1={y} y2={y} stroke="#DCE1E8" />)}
          <path d="M30 180 L90 150 L150 160 L210 110 L270 90 L300 70" fill="none" stroke="#0B1F3A" strokeWidth="3" />
          <path d="M300 70 L340 30 L380 -20" fill="none" stroke="#F2795B" strokeWidth="3" strokeDasharray="6 5" />
          <text x="300" y="120" fill="#B4462A" fontSize="40" fontFamily="Georgia, serif">404</text>
        </svg>
      </div>
    </section>
  );
}
