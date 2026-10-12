"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

export function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`rounded-3xl transition-colors duration-300 ${isOpen ? "bg-card shadow-lg shadow-fg/5" : "bg-surface/60"}`}>
            <h3 className="text-lg tracking-tight">
              <button
                type="button"
                id={`${baseId}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-bold"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sponge text-xl leading-none text-fg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={`${baseId}-a-${i}`} role="region" aria-labelledby={`${baseId}-q-${i}`} className="accordion" data-open={isOpen} inert={!isOpen}>
              <div>
                <p className={`max-w-prose px-6 pb-6 text-muted transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
