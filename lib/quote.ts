export type Property = "apartment" | "house" | "office";
export type Service = "standard" | "deep" | "move";
export type Frequency = "once" | "monthly" | "biweekly" | "weekly";
export type ExtraId = "oven" | "fridge" | "windows" | "cabinets" | "laundry" | "balcony";

export type QuoteInput = {
  property: Property;
  rooms: number;
  bathrooms: number;
  service: Service;
  frequency: Frequency;
  extras: ExtraId[];
};

export type Quote = {
  /** Total work, in cleaner-hours. */
  hours: number;
  cleaners: number;
  /** How long the team stays, in hours. */
  duration: number;
  /** Price of one visit before the repeat discount. */
  fullPrice: number;
  /** Price of one visit the customer pays. */
  price: number;
  discount: number;
};

export const HOURLY_RATE = 42;
export const MIN_PRICE = 95;
export const ROOMS = { min: 0, max: 6 };
export const BATHROOMS = { min: 1, max: 5 };

export const properties: { id: Property; label: string; roomLabel: string }[] = [
  { id: "apartment", label: "Apartment", roomLabel: "Bedrooms" },
  { id: "house", label: "House", roomLabel: "Bedrooms" },
  { id: "office", label: "Office", roomLabel: "Rooms" },
];

export const services: { id: Service; label: string; note: string }[] = [
  { id: "standard", label: "Regular clean", note: "Dusting, floors, kitchen and bathrooms" },
  { id: "deep", label: "Deep clean", note: "Everything above, plus skirting, grout, limescale and behind furniture" },
  { id: "move", label: "Move in or out", note: "An empty home cleaned inside cupboards and appliances, ready for keys" },
];

export const frequencies: { id: Frequency; label: string; discount: number }[] = [
  { id: "once", label: "One time", discount: 0 },
  { id: "monthly", label: "Every month", discount: 0.1 },
  { id: "biweekly", label: "Every two weeks", discount: 0.15 },
  { id: "weekly", label: "Every week", discount: 0.2 },
];

export const extras: { id: ExtraId; label: string; hours: number }[] = [
  { id: "oven", label: "Inside the oven", hours: 0.75 },
  { id: "fridge", label: "Inside the fridge", hours: 0.5 },
  { id: "windows", label: "Inside windows", hours: 1 },
  { id: "cabinets", label: "Inside cabinets", hours: 1 },
  { id: "laundry", label: "Laundry and ironing", hours: 0.5 },
  { id: "balcony", label: "Balcony or patio", hours: 0.5 },
];

const BASE_HOURS: Record<Property, number> = { apartment: 1.5, house: 2, office: 2 };
const SERVICE_FACTOR: Record<Service, number> = { standard: 1, deep: 1.6, move: 1.9 };

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(Math.max(Math.round(value), min), max);
const roundTo = (value: number, step: number) => Math.round(value / step) * step;

export function quote(input: QuoteInput): Quote {
  const rooms = clamp(input.rooms, ROOMS);
  const bathrooms = clamp(input.bathrooms, BATHROOMS);
  // A move clean is a single visit, so it never gets a repeat discount.
  const frequency = input.service === "move" ? "once" : input.frequency;

  const extraHours = extras.filter((e) => input.extras.includes(e.id)).reduce((sum, e) => sum + e.hours, 0);
  const hours = roundTo((BASE_HOURS[input.property] + 0.75 * rooms + 0.75 * bathrooms) * SERVICE_FACTOR[input.service] + extraHours, 0.25);

  const cleaners = hours > 8 ? 3 : hours > 4 ? 2 : 1;
  const duration = Math.ceil((hours / cleaners) * 2) / 2;

  const fullPrice = Math.max(roundTo(hours * HOURLY_RATE, 5), MIN_PRICE);
  const discount = frequencies.find((f) => f.id === frequency)!.discount;
  const price = Math.max(roundTo(fullPrice * (1 - discount), 5), MIN_PRICE);

  return { hours, cleaners, duration, fullPrice, price, discount };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function formatHours(value: number): string {
  if (value < 1) return `${Math.round(value * 60)} minutes`;
  const whole = Math.floor(value);
  const half = value - whole >= 0.5;
  return `${whole}${half ? "½" : ""} ${whole === 1 && !half ? "hour" : "hours"}`;
}

/* Booking days and times */

export const SLOTS = ["08:00", "10:30", "13:00", "15:30"];

export function weekday(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay();
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d! + days)).toISOString().slice(0, 10);
}

/** The next `count` working days (no Sundays), starting tomorrow. */
export function bookableDays(today: string, count: number): string[] {
  const days: string[] = [];
  for (let offset = 1; days.length < count; offset++) {
    const day = addDays(today, offset);
    if (weekday(day) !== 0) days.push(day);
  }
  return days;
}

/** Stable pseudo-random answer, so the demo diary looks the same on every visit. */
function booked(key: string): boolean {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return (h >>> 0) % 100 < 35;
}

/** Start times still open on a day. Long jobs cannot start in the last slot. */
export function openSlots(date: string, duration: number): string[] {
  return SLOTS.filter((time, index) => {
    if (duration > 4 && index === SLOTS.length - 1) return false;
    return !booked(`${date}|${time}`);
  });
}

export function formatDay(iso: string): { weekday: string; day: string; month: string; long: string } {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y!, m! - 1, d!));
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: "UTC" }).format(date);
  return {
    weekday: f({ weekday: "short" }),
    day: f({ day: "numeric" }),
    month: f({ month: "short" }),
    long: f({ weekday: "long", month: "long", day: "numeric" }),
  };
}
