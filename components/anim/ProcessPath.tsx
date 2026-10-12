"use client";

import { useRef, type CSSProperties } from "react";
import { steps } from "@/content/home";
import { useHydrated, useInView, useScrollProgress } from "@/lib/motion";

const WAVE = "M166 60 C 270 -10, 400 130, 500 60 S 730 -10, 833 60";

/** Three steps joined by a wavy line that draws itself as you scroll down to it. */
export function ProcessPath() {
  const ref = useRef<HTMLDivElement>(null);
  // Only hide the dots once JavaScript is here to bring them back.
  const armed = useHydrated();
  const seen = useInView(ref);
  useScrollProgress(ref);

  return (
    <div ref={ref} className={`relative ${seen ? "is-seen" : ""}`} data-armed={armed}>
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-x-0 top-6 hidden h-28 w-full md:block" aria-hidden="true">
        <path d={WAVE} fill="none" stroke="#CBD5EE" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
        <path d={WAVE} pathLength={1} className="draw-path" fill="none" stroke="#2F4BFF" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-6 left-7 top-6 w-1 rounded bg-border md:hidden" aria-hidden="true">
        <div className="grow-bar h-full w-full rounded bg-accent" />
      </div>
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 md:grid-cols-1 md:justify-items-center md:text-center">
            <span
              className="step-dot relative z-10 grid h-14 w-14 place-items-center rounded-full bg-accent font-display text-2xl font-bold text-white shadow-lg shadow-accent/30 md:mt-[3.25rem]"
              style={{ "--d": `${i * 0.18}s` } as CSSProperties}
            >
              {i + 1}
            </span>
            <div className="grid gap-2 md:max-w-xs">
              <h3 className="text-2xl">{step.title}</h3>
              <p className="text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
