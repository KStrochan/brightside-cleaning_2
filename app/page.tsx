import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Bubbles } from "@/components/anim/Bubbles";
import { Counter } from "@/components/anim/Counter";
import { Faq } from "@/components/anim/Faq";
import { HeroWipe } from "@/components/anim/HeroWipe";
import { ServiceIllustration } from "@/components/anim/Illustrations";
import { Marquee } from "@/components/anim/Marquee";
import { ProcessPath } from "@/components/anim/ProcessPath";
import { RoomChecklist } from "@/components/anim/RoomChecklist";
import { Sparkle } from "@/components/anim/Sparkle";
import { Sponge } from "@/components/anim/Sponge";
import { faqs, photos, promises, reviews, services, stats } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { formatUsd } from "@/lib/quote";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, { path: "/" });

function Stars() {
  return (
    <span className="relative inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="relative h-5 w-5">
          <Sparkle size={20} color="#CBD5EE" className="absolute inset-0" />
          <span className="star absolute inset-0" style={{ "--d": `${0.3 + i * 0.12}s` } as CSSProperties}>
            <Sparkle size={20} color="#FFD54A" />
          </span>
        </span>
      ))}
    </span>
  );
}

function Message({ who, text, delay, className }: { who: string; text: string; delay: string; className: string }) {
  return (
    <div className={`msg absolute z-10 max-w-[15rem] rounded-3xl bg-card px-4 py-3 shadow-xl shadow-fg/15 ${className}`} style={{ "--d": delay } as CSSProperties} aria-hidden="true">
      <p className="text-xs font-bold text-accent">{who}</p>
      <p className="text-sm leading-snug">{text}</p>
    </div>
  );
}

function ReviewCard({ name, area, text }: { name: string; area: string; text: string }) {
  return (
    <figure className="mx-2.5 grid w-[20rem] shrink-0 content-between gap-4 rounded-[28px] bg-card p-6 shadow-sm shadow-fg/5">
      <blockquote className="text-[1.05rem] leading-relaxed">{text}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-bubble font-display font-bold text-fg">
          {name[0]}
        </span>
        <span>
          <span className="block font-bold">{name}</span>
          <span className="text-sm text-muted">{area}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  const half = Math.ceil(reviews.length / 2);

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Bubbles />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
          <div className="grid content-start gap-7">
            <p className="flex flex-wrap items-center gap-2 font-semibold">
              <Stars />
              <span>4.9 from 1,240 reviews in Harborview</span>
            </p>
            <h1 className="text-[clamp(3.2rem,8.5vw,6.4rem)] font-extrabold">Get your Saturdays back.</h1>
            <p className="max-w-xl text-xl text-muted">
              The same vetted cleaner, at the same time, for a price you see before you book. Homes from {formatUsd(95)} a visit, offices too.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="btn text-lg">
                Get a price in a minute
              </Link>
              <Link href="/#rooms" className="btn-ghost text-lg">
                See what we clean
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <HeroWipe photo={photos.living} alt="Bright living room with a sofa, plants and a large window" />
            <Message who="Marta, your cleaner" text="Morning! Arriving at 10:30 with everything I need." delay="2.4s" className="-left-3 top-8 sm:-left-10" />
            <Message who="Marta, your cleaner" text="All done. Keys are back in the lockbox. See you in two weeks." delay="3.4s" className="-right-2 bottom-10 sm:-right-8" />
          </div>
        </div>
      </section>

      {/* Promise ticker */}
      <div className="overflow-hidden py-8">
        <div className="tilt relative z-10 -mx-8 bg-sponge py-4 shadow-lg shadow-sponge/30">
        <Marquee speed={36}>
          <ul className="flex items-center">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-6 whitespace-nowrap px-3 font-display text-xl font-bold text-fg sm:text-2xl">
                {p}
                <Sparkle size={22} color="#2F4BFF" />
              </li>
            ))}
          </ul>
        </Marquee>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-4 py-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="text-5xl sm:text-6xl">Pick the clean you need</h2>
          <p className="text-lg text-muted md:justify-self-end md:max-w-md">
            Every price includes products, equipment and travel. Regular cleans get up to 20% off each visit.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link
              key={s.name}
              href="/quote"
              className="service-card group grid content-start gap-4 rounded-[32px] bg-card p-6 text-fg no-underline shadow-sm shadow-fg/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/10"
            >
              <span className={`grid h-40 place-items-center rounded-[24px] ${i % 2 ? "bg-bubble/60" : "bg-surface"}`}>
                <ServiceIllustration name={s.illustration} />
              </span>
              <h3 className="text-2xl">{s.name}</h3>
              <p className="text-muted">{s.text}</p>
              <p className="mt-auto font-bold">
                from <span className="font-display text-2xl">{formatUsd(s.from)}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="scroll-mt-24 bg-card/60 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6">
          <div className="grid max-w-2xl gap-4">
            <h2 className="text-5xl sm:text-6xl">What a visit covers</h2>
            <p className="text-lg text-muted">The same checklist every time, so nothing depends on who had a good day. Pick a room.</p>
          </div>
          <RoomChecklist />
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6">
        <h2 className="max-w-2xl text-5xl sm:text-6xl">Three steps, then a clean home</h2>
        <ProcessPath />
      </section>

      {/* Numbers */}
      <section className="relative overflow-hidden bg-accent text-white">
        <Bubbles count={6} />
        <dl className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="grid gap-1">
              <dt className="order-2 text-white">{s.label}</dt>
              <dd className="order-1 font-display text-6xl font-extrabold tracking-tight">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Cleaner */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-[40px] bg-surface">
            <Image
              src={unsplash(photos.cleaner, 1000)}
              alt="Cleaner in a bright kitchen holding a broom"
              width={1000}
              height={1250}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="kenburns aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <svg viewBox="0 0 200 200" className="absolute -top-8 right-0 h-36 w-36 sm:-right-10 sm:h-44 sm:w-44" aria-hidden="true">
            <defs>
              <path id="badge-ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
            </defs>
            <circle cx="100" cy="100" r="98" fill="#FFD54A" />
            <g className="spin-slow" style={{ transformOrigin: "100px 100px" }}>
            <text fill="#16205B" fontSize="17.5" fontWeight="700" letterSpacing="1.2">
              <textPath href="#badge-ring" textLength="452" lengthAdjust="spacing">Employed • Insured • Background-checked •</textPath>
            </text>
            </g>
            <path d="M100 74c2.2 15.6 11.8 25.2 26 26-14.2.8-23.8 10.4-26 26-2.2-15.6-11.8-25.2-26-26 14.2-.8 23.8-10.4 26-26z" fill="#2F4BFF" />
          </svg>
        </div>
        <div className="grid gap-6">
          <h2 className="text-5xl sm:text-6xl">The same person, every time</h2>
          <p className="text-lg text-muted">
            Our cleaners are on our payroll, with a proper wage and paid holiday, not booked through an app by the hour. Most of them have been with us for
            more than three years.
          </p>
          <p className="text-lg text-muted">
            You meet your cleaner on the first visit and keep them. They learn how you like the bed made, which plant hates water and where the cat hides.
          </p>
          <ul className="grid gap-3 font-semibold">
            {["Background-checked and trained in-house", "Insured for up to $1M of damage", "A colleague who has read their notes covers holidays"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Sparkle size={20} color="#2F4BFF" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-24 overflow-hidden bg-surface py-24">
        <div className="mx-auto mb-12 grid max-w-6xl gap-4 px-4 sm:px-6">
          <h2 className="max-w-2xl text-5xl sm:text-6xl">What people say after the first month</h2>
        </div>
        <div className="grid gap-5">
          <Marquee speed={60}>
            <div className="flex">
              {reviews.slice(0, half).map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </div>
          </Marquee>
          <Marquee speed={70} reverse>
            <div className="flex">
              {reviews.slice(half).map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-4">
          <h2 className="text-5xl sm:text-6xl">Questions before you book</h2>
          <p className="text-lg text-muted">
            Anything else, call us on{" "}
            <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="font-bold">
              {site.contact.phone}
            </a>
            .
          </p>
        </div>
        <Faq items={faqs} />
      </section>

      {/* Call to action */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 overflow-hidden rounded-[44px] bg-bubble px-8 py-14 sm:px-14 md:grid-cols-[1.4fr_1fr]">
          <div className="relative grid gap-6">
            <h2 className="text-5xl sm:text-6xl">Your first clean, priced in a minute</h2>
            <p className="max-w-lg text-lg">Tell us the size of your home and how often. Pick a day. That&apos;s it, and you pay after the visit.</p>
            <div>
              <Link href="/quote" className="btn text-lg">
                Get my price
              </Link>
            </div>
          </div>
          <Sponge className="relative mx-auto h-56 w-auto" />
        </div>
      </section>
    </main>
  );
}
