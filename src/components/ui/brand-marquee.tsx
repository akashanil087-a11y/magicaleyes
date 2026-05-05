import { cn } from "@/lib/utils";

interface BrandMarqueeProps {
  /** Word repeated across the marquee. */
  text?: string;
  /** Total seconds for one full loop. Smaller = faster. Default 32. */
  speed?: number;
  /** Number of times the word appears in one half of the track. */
  repeat?: number;
  className?: string;
}

/** Two overlapping ellipses forming an interlocked "ME" monogram —
 *  same construction as the "DB" glyph in the Bartolini reference. */
function MonogramME() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <ellipse cx="38" cy="30" rx="28" ry="29" />
      <ellipse cx="62" cy="30" rx="28" ry="29" />
      <text
        x="30"
        y="38"
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
        fontFamily="inherit"
      >
        M
      </text>
      <text
        x="70"
        y="38"
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
        fontFamily="inherit"
      >
        E
      </text>
    </svg>
  );
}

export default function BrandMarquee({
  text = "Magical Eyes",
  speed = 32,
  repeat = 5,
  className,
}: BrandMarqueeProps) {
  const items = Array.from({ length: repeat }, (_, i) => i);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#f0ece6] text-black py-14 md:py-20 select-none",
        className
      )}
    >
      <style>{`
        @keyframes brand-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .brand-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 4rem;
          animation: brand-marquee-scroll ${speed}s linear infinite;
        }
        @media (min-width: 768px) {
          .brand-marquee-track { gap: 6rem; }
        }
      `}</style>

      <div className="brand-marquee-track">
        {[...items, ...items].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-16 md:gap-24 shrink-0"
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none whitespace-nowrap">
              {text}
            </span>
            {/* Interlocking double-oval monogram */}
            <span
              aria-hidden="true"
              className="block w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 text-black/40 shrink-0"
            >
              <MonogramME />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
