import Image from "next/image";
import { unsplash } from "@/lib/unsplash";
import { Sparkle } from "./Sparkle";

const GLINTS = [
  { top: "14%", left: "22%", size: 30, delay: 1.5 },
  { top: "38%", left: "70%", size: 22, delay: 1.85 },
  { top: "66%", left: "34%", size: 18, delay: 2.05 },
  { top: "20%", left: "86%", size: 26, delay: 2.2 },
];

/**
 * The hero photo starts behind fogged glass. A squeegee crosses it once and leaves it clear.
 * Pure CSS, so it plays before any JavaScript has loaded.
 */
export function HeroWipe({ photo, alt }: { photo: string; alt: string }) {
  return (
    <div className="wipe squircle aspect-[4/5] bg-surface shadow-2xl shadow-accent/15 sm:aspect-[5/6]">
      <Image
        src={unsplash(photo, 1200)}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 80vw, 100vw"
        className="object-cover"
      />
      <div className="wipe__fog" aria-hidden="true" />
      <svg className="wipe__blade" viewBox="0 0 60 400" preserveAspectRatio="none" aria-hidden="true">
        <rect x="20" y="0" width="14" height="400" rx="7" fill="#2F4BFF" />
        <rect x="31" y="6" width="5" height="388" rx="2.5" fill="#16205B" />
        <rect x="0" y="182" width="26" height="36" rx="10" fill="#FFD54A" />
      </svg>
      {GLINTS.map((g, i) => (
        <span key={i} className="glint" style={{ top: g.top, left: g.left, animationDelay: `${g.delay}s` }} aria-hidden="true">
          <Sparkle size={g.size} color="#FFFFFF" className="twinkle drop-shadow-[0_0_8px_rgba(255,213,74,0.9)]" />
        </span>
      ))}
    </div>
  );
}
