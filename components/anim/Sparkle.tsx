import type { CSSProperties } from "react";

/** Four-point sparkle, the little glint of something freshly cleaned. */
export function Sparkle({ size = 24, color = "#FFD54A", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path d="M12 0c.9 6.3 4.8 10.2 12 12-7.2 1.8-11.1 5.7-12 12-.9-6.3-4.8-10.2-12-12C7.2 10.2 11.1 6.3 12 0z" fill={color} />
    </svg>
  );
}
