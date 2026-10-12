import { describe, expect, test } from "vitest";
import { bookableDays, formatHours, formatUsd, openSlots, quote, type QuoteInput } from "@/lib/quote";

const base: QuoteInput = { property: "apartment", rooms: 2, bathrooms: 1, service: "standard", frequency: "once", extras: [] };

describe("quote", () => {
  test("prices a regular clean from rooms and bathrooms", () => {
    expect(quote(base)).toEqual({ hours: 3.75, cleaners: 1, duration: 4, fullPrice: 160, price: 160, discount: 0 });
  });

  test("takes the repeat discount off every visit", () => {
    const weekly = quote({ ...base, frequency: "weekly" });
    expect(weekly.discount).toBe(0.2);
    expect(weekly.price).toBe(130);
    expect(weekly.fullPrice).toBe(160);
  });

  test("a deep clean takes longer and sends a second cleaner", () => {
    const deep = quote({ ...base, service: "deep" });
    expect(deep.hours).toBe(6);
    expect(deep.cleaners).toBe(2);
    expect(deep.duration).toBe(3);
    expect(deep.price).toBe(250);
  });

  test("a move clean is always a single visit with no discount", () => {
    const move = quote({ ...base, service: "move", frequency: "weekly" });
    expect(move.discount).toBe(0);
    expect(move.price).toBe(move.fullPrice);
  });

  test("extras add time, and a big house gets a team of three", () => {
    const result = quote({ property: "house", rooms: 4, bathrooms: 3, service: "deep", frequency: "once", extras: ["oven", "windows"] });
    expect(result.hours).toBe(13.25);
    expect(result.cleaners).toBe(3);
    expect(result.duration).toBe(4.5);
    expect(result.price).toBe(555);
  });

  test("never goes below the minimum visit price", () => {
    expect(quote({ ...base, rooms: 0 }).price).toBe(95);
  });

  test("clamps rooms and bathrooms to what the form allows", () => {
    expect(quote({ ...base, rooms: 40, bathrooms: -2 })).toEqual(quote({ ...base, rooms: 6, bathrooms: 1 }));
  });
});

describe("booking helpers", () => {
  test("skips Sundays and starts tomorrow", () => {
    // 2026-10-10 is a Saturday, so the next day offered is Monday the 12th.
    expect(bookableDays("2026-10-10", 3)).toEqual(["2026-10-12", "2026-10-13", "2026-10-14"]);
  });

  test("open slots are stable and long jobs cannot start last", () => {
    expect(openSlots("2026-10-12", 3)).toEqual(openSlots("2026-10-12", 3));
    expect(openSlots("2026-10-12", 5)).not.toContain("15:30");
  });
});

describe("formatting", () => {
  test("formats dollars and hours", () => {
    expect(formatUsd(1555)).toBe("$1,555");
    expect(formatHours(4)).toBe("4 hours");
    expect(formatHours(1)).toBe("1 hour");
    expect(formatHours(2.5)).toBe("2½ hours");
    expect(formatHours(0.75)).toBe("45 minutes");
  });
});
