import { type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Wraps children sections in a sticky-scroll layout.
 * Each direct child <section> stacks on top of the previous one
 * with a rounded top and shadow, creating a card-stacking scroll effect.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <article className="relative">{children}</article>;
}

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  bgImage?: string;
  rounded?: boolean;
}

/**
 * A single sticky section inside SmoothScroll.
 * Sticks to top and gets covered by the next section scrolling over it.
 */
export function ScrollSection({
  children,
  className = "",
  overlay = false,
  overlayColor = "bg-black/40",
  bgImage,
  rounded = true,
}: ScrollSectionProps) {
  return (
    <section
      className={`sticky top-0 min-h-screen w-full overflow-hidden ${
        rounded ? "rounded-t-3xl" : ""
      } ${className}`}
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {overlay && <div className={`absolute inset-0 ${overlayColor}`} />}
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
