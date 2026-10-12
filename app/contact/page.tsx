import type { Metadata } from "next";
import Link from "next/link";
import { submitLead } from "@/app/actions";
import { Bubbles } from "@/components/anim/Bubbles";
import { Van } from "@/components/anim/Van";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Contact",
  description: "Call, write or drop by Brightside Cleaning in Harborview.",
  path: "/contact",
});

export default function ContactPage() {
  const tel = site.contact.phone.replace(/[^+\d]/g, "");

  return (
    <main id="main" className="relative overflow-hidden">
      <Bubbles count={6} className="opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid content-start gap-8">
          <div className="grid gap-4">
            <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold">Say hello</h1>
            <p className="max-w-md text-xl text-muted">
              For a price and a booking, the <Link href="/quote">online form</Link> is quickest. For anything else, we&apos;re here.
            </p>
          </div>
          <div className="grid gap-6 rounded-[36px] bg-card p-7 shadow-sm shadow-fg/5">
            <div>
              <p className="text-sm text-muted">Phone</p>
              <a href={`tel:${tel}`} className="font-display text-3xl font-bold no-underline">
                {site.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted">Office</p>
              <p className="font-semibold">{site.contact.address}</p>
              <p className="text-muted">Come by for keys, lockboxes or a chat. Parking in the courtyard.</p>
            </div>
            <div>
              <p className="text-sm text-muted">Hours</p>
              <p>{site.contact.hours}</p>
            </div>
            <Van />
          </div>
        </div>
        <div className="grid content-start gap-5 rounded-[36px] bg-card p-7 shadow-sm shadow-fg/5 sm:p-9">
          <h2 className="text-4xl">Write to us</h2>
          <p className="text-muted">We answer within two working hours, usually sooner.</p>
          <LeadForm action={submitLead} />
        </div>
      </div>
    </main>
  );
}
