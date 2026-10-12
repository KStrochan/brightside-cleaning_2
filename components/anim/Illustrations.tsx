import type { Illustration } from "@/content/home";

const INK = "#16205B";
const BLUE = "#2F4BFF";
const SPONGE = "#FFD54A";
const BUBBLE = "#BFE8FF";

function Spray() {
  return (
    <>
      <rect x="18" y="86" width="96" height="6" rx="3" fill={BUBBLE} />
      <path d="M40 44h26l6 10v30a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V54z" fill={BLUE} />
      <rect x="40" y="58" width="26" height="16" rx="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="44" y="62" width="14" height="3" rx="1.5" fill={BLUE} />
      <rect x="44" y="67" width="9" height="3" rx="1.5" fill={BLUE} />
      <path d="M42 28h22l10 6v6H42z" fill={INK} />
      <rect x="46" y="38" width="14" height="7" fill={INK} />
      <path className="ill-trigger" d="M56 40h8l-2 14h-5z" fill={SPONGE} />
      <circle className="ill-mist" cx="82" cy="32" r="4" fill={BUBBLE} />
      <circle className="ill-mist" cx="84" cy="27" r="3" fill={BUBBLE} />
      <circle className="ill-mist" cx="84" cy="37" r="3" fill={BUBBLE} />
    </>
  );
}

function Vacuum() {
  return (
    <>
      <rect x="10" y="86" width="112" height="6" rx="3" fill={BUBBLE} />
      <circle className="ill-dust" cx="84" cy="82" r="2" fill={INK} opacity="0.5" />
      <circle className="ill-dust" cx="96" cy="83" r="1.6" fill={INK} opacity="0.5" />
      <circle className="ill-dust" cx="108" cy="81" r="2.2" fill={INK} opacity="0.5" />
      <g className="ill-glide">
        <path d="M70 30c14 0 20 10 20 22v24" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <rect x="80" y="74" width="26" height="8" rx="4" fill={INK} />
        <rect x="24" y="48" width="44" height="30" rx="15" fill={BLUE} />
        <rect x="30" y="54" width="18" height="10" rx="5" fill={BUBBLE} />
        <circle cx="60" cy="56" r="3" fill={SPONGE} />
        <g className="ill-wheel">
          <circle cx="34" cy="80" r="7" fill={INK} />
          <rect x="33" y="74" width="2" height="12" fill="#FFFFFF" />
        </g>
        <g className="ill-wheel">
          <circle cx="58" cy="80" r="7" fill={INK} />
          <rect x="57" y="74" width="2" height="12" fill="#FFFFFF" />
        </g>
      </g>
    </>
  );
}

function Bucket() {
  return (
    <>
      <rect x="10" y="86" width="112" height="6" rx="3" fill={BUBBLE} />
      <g className="ill-mop">
        <rect x="74" y="6" width="5" height="64" rx="2.5" fill={INK} />
        <path d="M64 66h25l4 18H60z" fill={SPONGE} />
        <path d="M66 72v10M72 72v12M78 72v12M84 72v10" stroke="#E0B52E" strokeWidth="2" />
      </g>
      <path d="M26 46h44l-6 40H32z" fill={BLUE} />
      <path className="ill-water" d="M28 50h40l-1 8c-6 3-12 3-19 0s-13-3-19 0z" fill={BUBBLE} />
      <path d="M26 46c0-12 44-12 44 0" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="40" cy="44" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="50" cy="40" r="3" fill="#FFFFFF" opacity="0.9" />
    </>
  );
}

function Desk() {
  return (
    <>
      <rect x="10" y="74" width="112" height="7" rx="3.5" fill={INK} />
      <rect x="18" y="81" width="5" height="12" fill={INK} />
      <rect x="109" y="81" width="5" height="12" fill={INK} />
      <rect x="32" y="28" width="52" height="34" rx="5" fill={BLUE} />
      <rect x="37" y="33" width="42" height="24" rx="3" fill={BUBBLE} />
      <rect x="54" y="62" width="8" height="8" fill={INK} />
      <rect x="44" y="69" width="28" height="5" rx="2" fill={INK} />
      <path d="M94 56h14v14a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4z" fill={SPONGE} />
      <path d="M108 60h3a3 3 0 0 1 0 6h-3" fill="none" stroke={SPONGE} strokeWidth="2.5" />
      <path className="ill-steam" d="M98 50c-2-3 2-5 0-8M104 50c-2-3 2-5 0-8" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path className="ill-shine" d="M44 38l1.5 3.5L49 43l-3.5 1.5L44 48l-1.5-3.5L39 43l3.5-1.5z" fill="#FFFFFF" />
      <path className="ill-shine" d="M70 44l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#FFFFFF" />
    </>
  );
}

const DRAWINGS: Record<Illustration, () => React.JSX.Element> = { spray: Spray, vacuum: Vacuum, bucket: Bucket, desk: Desk };

export function ServiceIllustration({ name }: { name: Illustration }) {
  const Drawing = DRAWINGS[name];
  return (
    <svg viewBox="0 0 132 100" className="ill h-28 w-auto" aria-hidden="true">
      <Drawing />
    </svg>
  );
}
