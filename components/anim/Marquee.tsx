import type { CSSProperties, ReactNode } from "react";

/** Endless strip. The content is rendered twice so the loop has no seam. */
export function Marquee({ children, speed = 32, reverse = false }: { children: ReactNode; speed?: number; reverse?: boolean }) {
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`} style={{ "--speed": `${speed}s` } as CSSProperties}>
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
