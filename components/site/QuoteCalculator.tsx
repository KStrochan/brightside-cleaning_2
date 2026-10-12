"use client";

import { useMemo, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { submitLead } from "@/app/actions";
import { Odometer } from "@/components/anim/Odometer";
import { Sparkle } from "@/components/anim/Sparkle";
import { LeadForm } from "@/components/LeadForm";
import {
  BATHROOMS,
  ROOMS,
  bookableDays,
  extras,
  formatDay,
  formatHours,
  formatUsd,
  frequencies,
  openSlots,
  properties,
  quote,
  services,
  type ExtraId,
  type Frequency,
  type Property,
  type Service,
} from "@/lib/quote";

const noop = () => () => {};
const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="grid content-start gap-4">
      <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-fg text-base text-white">
          {n}
        </span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Stepper({ label, value, min, max, onChange, format }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; format?: (v: number) => string }) {
  const shown = format ? format(value) : String(value);
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl bg-card px-5 py-3 shadow-sm shadow-fg/5">
      <span className="font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className="grid h-10 w-10 place-items-center rounded-full border-2 border-fg text-xl font-bold transition active:scale-90 disabled:opacity-30">
          −
        </button>
        <span className="relative grid h-8 w-16 place-items-center overflow-hidden text-center font-display text-xl font-bold" aria-live="polite">
          <span key={shown} className="num-in">
            {shown}
          </span>
        </span>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className="grid h-10 w-10 place-items-center rounded-full border-2 border-fg text-xl font-bold transition active:scale-90 disabled:opacity-30">
          +
        </button>
      </div>
    </div>
  );
}

function Cleaner({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 32 40" className="pop-in h-12 w-10" style={{ "--d": `${i * 0.06}s` } as CSSProperties} aria-hidden="true">
      <circle cx="16" cy="11" r="8" fill="#FFD54A" />
      <path d="M2 40c0-10 6-16 14-16s14 6 14 16z" fill="#BFE8FF" />
    </svg>
  );
}

const pill =
  "cursor-pointer rounded-full border-2 border-fg/15 bg-card px-4 py-2 font-semibold transition has-[:checked]:border-fg has-[:checked]:bg-fg has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-accent has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-40";

export function QuoteCalculator() {
  const [property, setProperty] = useState<Property>("apartment");
  const [rooms, setRooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [service, setService] = useState<Service>("standard");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [picked, setPicked] = useState<ExtraId[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  // "Today" only exists in the browser; the server renders the page without dates.
  const today = useSyncExternalStore(noop, todayIso, () => null);
  const days = useMemo(() => (today ? bookableDays(today, 10) : []), [today]);

  const result = quote({ property, rooms, bathrooms, service, frequency, extras: picked });
  const effectiveFrequency = service === "move" ? "once" : frequency;
  const roomLabel = properties.find((p) => p.id === property)!.roomLabel;
  const activeDate = date ?? days[0] ?? null;
  const slots = activeDate ? openSlots(activeDate, result.duration) : [];
  const chosenTime = time && slots.includes(time) ? time : null;

  const toggleExtra = (id: ExtraId) => setPicked((list) => (list.includes(id) ? list.filter((e) => e !== id) : [...list, id]));

  const summary = [
    `Booking request: ${services.find((s) => s.id === service)!.label.toLowerCase()} for ${property === "apartment" || property === "office" ? "an" : "a"} ${property}`,
    `with ${rooms === 0 && property !== "office" ? "no separate bedroom" : `${rooms} ${roomLabel.toLowerCase()}`} and ${bathrooms} ${bathrooms === 1 ? "bathroom" : "bathrooms"},`,
    `${frequencies.find((f) => f.id === effectiveFrequency)!.label.toLowerCase()}.`,
    picked.length ? `Extras: ${extras.filter((e) => picked.includes(e.id)).map((e) => e.label.toLowerCase()).join(", ")}.` : "",
    `Quoted ${formatUsd(result.price)} per visit, ${result.cleaners} ${result.cleaners === 1 ? "cleaner" : "cleaners"} for about ${formatHours(result.duration)}.`,
    chosenTime && activeDate ? `First visit: ${formatDay(activeDate).long} at ${chosenTime}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid gap-14">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="grid gap-12">
          <Step n={1} title="Your place">
            <div className="flex flex-wrap gap-2">
              {properties.map((p) => (
                <label key={p.id} className={pill}>
                  <input type="radio" name="property" value={p.id} checked={property === p.id} onChange={() => setProperty(p.id)} className="sr-only" />
                  {p.label}
                </label>
              ))}
            </div>
            <Stepper label={roomLabel} value={rooms} min={ROOMS.min} max={ROOMS.max} onChange={setRooms} format={(v) => (v === 0 && property !== "office" ? "Studio" : String(v))} />
            <Stepper label="Bathrooms" value={bathrooms} min={BATHROOMS.min} max={BATHROOMS.max} onChange={setBathrooms} />
          </Step>

          <Step n={2} title="Kind of clean">
            <div className="grid gap-3 sm:grid-cols-3">
              {services.map((s) => (
                <label
                  key={s.id}
                  className="grid cursor-pointer content-start gap-1 rounded-3xl border-2 border-transparent bg-card p-5 shadow-sm shadow-fg/5 transition has-[:checked]:border-accent has-[:checked]:shadow-lg has-[:checked]:shadow-accent/15 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-accent"
                >
                  <input type="radio" name="service" value={s.id} checked={service === s.id} onChange={() => setService(s.id)} className="sr-only" />
                  <span className="font-display text-lg font-bold">{s.label}</span>
                  <span className="text-sm text-muted">{s.note}</span>
                </label>
              ))}
            </div>
          </Step>

          <Step n={3} title="How often">
            <div className="flex flex-wrap gap-2">
              {frequencies.map((f) => (
                <label key={f.id} className={pill}>
                  <input
                    type="radio"
                    name="frequency"
                    value={f.id}
                    checked={effectiveFrequency === f.id}
                    disabled={service === "move" && f.id !== "once"}
                    onChange={() => setFrequency(f.id)}
                    className="sr-only"
                  />
                  {f.label}
                  {f.discount ? <span className="ml-2 rounded-full bg-sponge px-2 py-0.5 text-xs font-bold text-fg">−{f.discount * 100}%</span> : null}
                </label>
              ))}
            </div>
            {service === "move" ? <p className="text-sm text-muted">A move clean is a single visit, so it is always booked as one time.</p> : null}
          </Step>

          <Step n={4} title="Extras">
            <div className="flex flex-wrap gap-2">
              {extras.map((e) => {
                const on = picked.includes(e.id);
                return (
                  <label key={e.id} className={`${pill} inline-flex items-center gap-2`}>
                    <input type="checkbox" checked={on} onChange={() => toggleExtra(e.id)} className="sr-only" />
                    <span
                      aria-hidden="true"
                      className={`grid h-5 place-items-center overflow-hidden rounded-full bg-sponge text-xs font-black text-fg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${on ? "w-5 scale-100" : "-mr-2 w-0 scale-0 -rotate-90"}`}
                    >
                      ✓
                    </span>
                    {e.label}
                    <span className={`text-sm ${on ? "text-white/70" : "text-muted"}`}>+{formatHours(e.hours)}</span>
                  </label>
                );
              })}
            </div>
          </Step>
        </div>

        <aside className="relative overflow-hidden rounded-[36px] bg-fg p-7 text-bg shadow-2xl shadow-fg/25 lg:sticky lg:top-24" aria-label="Your price">
          <Sparkle size={56} color="#2F4BFF" className="twinkle absolute right-6 top-6" />
          <p className="relative text-bg/75">Price per visit</p>
          <div className="relative flex items-end gap-3">
            <Odometer value={formatUsd(result.price)} className="font-display text-7xl font-extrabold tracking-tight text-sponge" />
            {result.discount > 0 ? (
              <span key={result.discount} className="fade-up mb-2 text-bg/60 line-through">
                {formatUsd(result.fullPrice)}
              </span>
            ) : null}
          </div>
          {result.discount > 0 ? (
            <p key={`save-${result.discount}`} className="pop-in relative mt-3 inline-block rounded-full bg-accent px-3 py-1 text-sm font-bold text-white">
              You save {formatUsd(result.fullPrice - result.price)} every visit
            </p>
          ) : null}

          <div className="relative mt-7 grid gap-4 border-t border-bg/15 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-bg/70">Your team</p>
                <p className="font-bold">
                  {result.cleaners} {result.cleaners === 1 ? "cleaner" : "cleaners"}
                </p>
              </div>
              <div className="flex -space-x-2">
                {Array.from({ length: result.cleaners }, (_, i) => (
                    <Cleaner key={i} i={i} />
                  ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-bg/70">Time in your home</p>
              <p className="font-bold">About {formatHours(result.duration)}</p>
            </div>
          </div>

          <a href="#book" className="relative mt-7 flex w-full justify-center rounded-full bg-sponge px-6 py-3.5 font-bold text-fg no-underline transition hover:-translate-y-0.5">
            Choose a day
          </a>
          <p className="relative mt-3 text-center text-sm text-bg/60">No payment now. You pay after the clean.</p>
        </aside>
      </div>

      <section id="book" className="grid scroll-mt-24 gap-10 rounded-[40px] bg-surface p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
        <Step n={5} title="Pick a day and time">
          {days.length === 0 ? (
            <p className="text-muted">Loading the diary…</p>
          ) : (
            <>
              <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
                {days.map((d) => {
                  const f = formatDay(d);
                  const selected = d === activeDate;
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setDate(d);
                        setTime(null);
                      }}
                      className={`grid h-fit w-[4.5rem] shrink-0 snap-start justify-items-center rounded-3xl px-2 py-3 transition ${selected ? "bg-fg text-white shadow-lg" : "bg-card hover:-translate-y-0.5"}`}
                    >
                      <span className="text-sm">{f.weekday}</span>
                      <span className="font-display text-2xl font-bold">{f.day}</span>
                      <span className="text-xs">{f.month}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {slots.length === 0 ? <p className="col-span-full text-muted">Fully booked. Try the next day.</p> : null}
                {slots.map((t) => (
                  <button
                    key={`${activeDate}-${t}`}
                    type="button"
                    aria-pressed={chosenTime === t}
                    onClick={() => setTime(t)}
                    className={`rounded-full border-2 px-4 py-2.5 font-bold transition ${chosenTime === t ? "border-accent bg-accent text-white" : "border-fg/15 bg-card hover:border-fg"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {chosenTime && activeDate ? (
                <p key={`${activeDate}-${chosenTime}`} className="fade-up flex items-center gap-2 font-semibold">
                  <Sparkle size={18} color="#2F4BFF" />
                  {formatDay(activeDate).long}, arriving at {chosenTime}
                </p>
              ) : null}
            </>
          )}
        </Step>
        <div className="grid content-start gap-4 rounded-[32px] bg-card p-6 sm:p-8">
          <h2 className="text-3xl">Send the booking</h2>
          <p className="text-muted">We confirm your cleaner by text within two hours. Your choices are already in the message.</p>
          <LeadForm key={summary} action={submitLead} defaultMessage={summary} submitLabel="Request this booking" />
        </div>
      </section>
    </div>
  );
}
