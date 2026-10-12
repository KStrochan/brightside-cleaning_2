import type { Metadata } from "next";
import { Bubbles } from "@/components/anim/Bubbles";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Get a price and book",
  description: "Work out the price of your clean in a minute, then pick a day and time. No payment until after the visit.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <Bubbles count={5} className="opacity-70" />
        <div className="relative mx-auto grid max-w-6xl gap-4 px-4 pb-10 pt-14 sm:px-6">
          <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,5rem)] font-extrabold">Your price, before anyone picks up a cloth</h1>
          <p className="max-w-2xl text-xl text-muted">Change anything and the price updates as you go. What you see here is what you pay per visit.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <QuoteCalculator />
      </div>
    </main>
  );
}
