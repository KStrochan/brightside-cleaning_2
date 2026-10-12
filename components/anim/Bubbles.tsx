import type { CSSProperties } from "react";

type Bubble = { size: number; left: number; dur: number; delay: number; sway: number };

// Fixed values rather than Math.random(), so server and browser render the same bubbles.
const FIELD: Bubble[] = [
  { size: 46, left: 6, dur: 11, delay: 0, sway: 18 },
  { size: 22, left: 14, dur: 8, delay: 2.5, sway: -12 },
  { size: 64, left: 28, dur: 14, delay: 5, sway: 22 },
  { size: 18, left: 41, dur: 7, delay: 1, sway: 10 },
  { size: 34, left: 55, dur: 10, delay: 6.5, sway: -16 },
  { size: 26, left: 67, dur: 9, delay: 3.5, sway: 14 },
  { size: 52, left: 78, dur: 12.5, delay: 0.8, sway: -20 },
  { size: 16, left: 88, dur: 7.5, delay: 4.2, sway: 9 },
  { size: 30, left: 95, dur: 10.5, delay: 7.5, sway: -11 },
];

export function Bubbles({ count = FIELD.length, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {FIELD.slice(0, count).map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={
            {
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
              "--sway": `${b.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
