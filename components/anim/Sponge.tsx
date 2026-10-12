import type { CSSProperties } from "react";

const FOAM = [
  { x: "-34px", d: "0.25s", r: 9, cx: 52 },
  { x: "-8px", d: "0.35s", r: 13, cx: 80 },
  { x: "20px", d: "0.3s", r: 8, cx: 108 },
  { x: "40px", d: "0.45s", r: 11, cx: 128 },
];

/** A kitchen sponge that gets squeezed and puffs out foam, on a loop. */
export function Sponge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 160" className={className} aria-hidden="true">
      {FOAM.map((f, i) => (
        <circle
          key={i}
          className="foam"
          cx={f.cx}
          cy="70"
          r={f.r}
          fill="#FFFFFF"
          stroke="#BFE8FF"
          strokeWidth="2"
          style={{ "--x": f.x, "--d": f.d, transformBox: "fill-box", transformOrigin: "center" } as CSSProperties}
        />
      ))}
      <g className="sponge" style={{ transformBox: "fill-box" }}>
        <rect x="30" y="74" width="120" height="58" rx="16" fill="#FFD54A" stroke="#16205B" strokeWidth="3" />
        <path d="M30 112h120v4a16 16 0 0 1-16 16H46a16 16 0 0 1-16-16z" fill="#2F4BFF" stroke="#16205B" strokeWidth="3" />
        <circle cx="56" cy="90" r="5" fill="#E8B92E" />
        <circle cx="84" cy="98" r="3.5" fill="#E8B92E" />
        <circle cx="110" cy="88" r="4.5" fill="#E8B92E" />
        <circle cx="130" cy="100" r="3" fill="#E8B92E" />
        <circle cx="70" cy="82" r="2.5" fill="#E8B92E" />
      </g>
      <rect x="18" y="138" width="144" height="6" rx="3" fill="#16205B" opacity="0.15" />
    </svg>
  );
}
