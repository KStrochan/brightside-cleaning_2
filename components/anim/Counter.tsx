"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";

type CounterProps = { value: number; decimals?: number; suffix?: string };

const format = (n: number, decimals: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Counts up from zero the first time it scrolls into view. Renders the final number on the server. */
export function Counter({ value, decimals = 0, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, "0px 0px -15% 0px");
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1800;
    let start = 0;
    let frame = requestAnimationFrame(function tick(now) {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setShown(value * easeOutExpo(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(shown, decimals)}
      {suffix}
    </span>
  );
}
