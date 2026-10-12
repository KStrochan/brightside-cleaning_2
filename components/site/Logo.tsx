/** Two overlapping soap bubbles with a sparkle: the Brightside mark. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="16" cy="22" r="13" fill="#2F4BFF" />
      <circle cx="27" cy="14" r="8" fill="#BFE8FF" stroke="#2F4BFF" strokeWidth="2.5" />
      <circle cx="11" cy="17" r="3" fill="#FFFFFF" opacity="0.85" />
      <path d="M33 26l1.4 3.2 3.2 1.4-3.2 1.4L33 35.2l-1.4-3.2-3.2-1.4 3.2-1.4z" fill="#FFD54A" />
    </svg>
  );
}
