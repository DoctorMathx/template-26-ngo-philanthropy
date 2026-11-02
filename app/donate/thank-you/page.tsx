import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouClient } from "./thank-you-client";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your donation receipt from the Meridian Foundation.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="container-x py-32 text-muted">Preparing your receipt…</div>}>
      <ThankYouClient />
    </Suspense>
  );
}
