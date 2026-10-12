/** Our van doing the rounds across the bottom of the contact card. */
export function Van() {
  return (
    <div className="relative h-24 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-4 h-0.5 bg-[repeating-linear-gradient(90deg,#CBD5EE_0_18px,transparent_18px_30px)]" />
      <svg viewBox="0 0 120 64" className="van absolute bottom-3 left-0 h-16 w-auto">
        <g className="van-bounce">
          <path d="M6 18a8 8 0 0 1 8-8h58l20 18h14a8 8 0 0 1 8 8v12a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#2F4BFF" />
          <path d="M74 14h-2v16h28z" fill="#BFE8FF" />
          <rect x="14" y="24" width="48" height="16" rx="8" fill="#FFFFFF" />
          <circle cx="24" cy="32" r="4.5" fill="#2F4BFF" />
          <circle cx="31" cy="29" r="2.5" fill="#BFE8FF" stroke="#2F4BFF" strokeWidth="1.2" />
          <rect x="38" y="30" width="20" height="4" rx="2" fill="#16205B" />
          <rect x="102" y="38" width="8" height="4" rx="2" fill="#FFD54A" />
        </g>
        <circle cx="28" cy="52" r="8" fill="#16205B" />
        <circle cx="28" cy="52" r="3" fill="#CBD5EE" />
        <circle cx="92" cy="52" r="8" fill="#16205B" />
        <circle cx="92" cy="52" r="3" fill="#CBD5EE" />
      </svg>
    </div>
  );
}
