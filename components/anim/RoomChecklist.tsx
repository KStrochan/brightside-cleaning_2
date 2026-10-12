"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { rooms, type RoomId } from "@/content/home";
import { useInView } from "@/lib/motion";
import { unsplash } from "@/lib/unsplash";
import { Sparkle } from "./Sparkle";

function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="tick h-6 w-6 shrink-0" aria-hidden="true" style={{ "--d": `${delay}s` } as CSSProperties}>
      <circle cx="12" cy="12" r="12" fill="#2F4BFF" />
      <path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pick a room, see the photo wipe in and watch its checklist tick itself off. */
export function RoomChecklist() {
  const [active, setActive] = useState<RoomId>(rooms[0]!.id);
  const [previous, setPrevious] = useState<RoomId | null>(null);
  const [pill, setPill] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const inView = useInView(ref, "0px 0px -25% 0px");
  const baseId = useId();
  const room = rooms.find((r) => r.id === active)!;
  const before = previous ? rooms.find((r) => r.id === previous) : null;

  // The dark pill slides under whichever tab is selected.
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (tab) setPill({ left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  function choose(id: RoomId) {
    if (id === active) return;
    setPrevious(active);
    setActive(id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = rooms[(index + step + rooms.length) % rooms.length]!;
    choose(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] bg-surface">
          {before ? (
            <Image key={`before-${before.id}`} src={unsplash(before.photo, 1100)} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          ) : null}
          <div key={room.id} className={`absolute inset-0 ${previous ? "reveal-right" : ""}`}>
            <Image src={unsplash(room.photo, 1100)} alt={room.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
        <div
          key={`badge-${room.id}`}
          className="pop-in absolute -bottom-5 right-6 flex items-center gap-2 rounded-full bg-sponge px-5 py-3 font-bold text-fg shadow-lg shadow-fg/10"
          style={{ "--d": "0.45s" } as CSSProperties}
        >
          <Sparkle size={18} color="#16205B" />
          {room.tasks.length} things, every visit
        </div>
      </div>

      <div className="grid gap-6">
        <div role="tablist" aria-label="Rooms" className="relative flex flex-wrap gap-2">
          {pill ? (
            <span
              aria-hidden="true"
              className="absolute rounded-full bg-fg transition-all duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
              style={pill}
            />
          ) : null}
          {rooms.map((r, i) => {
            const selected = r.id === active;
            return (
              <button
                key={r.id}
                ref={(el) => {
                  tabRefs.current[r.id] = el;
                }}
                id={`${baseId}-tab-${r.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(r.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative rounded-full px-5 py-2.5 font-bold transition-colors duration-300 ${
                  selected ? `text-white ${pill ? "" : "bg-fg"}` : "text-fg hover:bg-surface"
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${room.id}`}>
          <ul className="grid gap-3" key={inView ? room.id : "waiting"}>
            {room.tasks.map((task, i) => (
              <li key={task} className="flex items-start gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm shadow-fg/5">
                {inView ? <Tick delay={0.12 * i + 0.2} /> : <span className="h-6 w-6 shrink-0 rounded-full border-2 border-border" aria-hidden="true" />}
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
