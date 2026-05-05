import { forwardRef, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  base: React.ReactNode;
  overlay: React.ReactNode;
  /** Accent color exposed as `--accent-color`, `borderColor`, etc. */
  accent?: string;
  /** Foreground color when on the accent. */
  textOnAccent?: string;
  /** Muted foreground when on the accent. */
  mutedOnAccent?: string;
  /** Where the reveal circle starts inside the card. Default top-left (64,64). */
  origin?: { x: number; y: number; r?: number };
  /** Final radius of the reveal expressed as a CSS unit. Default 160%. */
  expandTo?: string;
}

export const RevealCardContainer = forwardRef<HTMLDivElement, RevealCardProps>(
  (
    {
      base,
      overlay,
      accent = "var(--primary)",
      textOnAccent = "#fff",
      mutedOnAccent = "rgba(255,255,255,0.8)",
      origin = { x: 64, y: 64, r: 50 },
      expandTo = "160%",
      className,
      ...rest
    },
    ref
  ) => {
    const holderRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const assignRef = useCallback(
      (el: HTMLDivElement | null) => {
        holderRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    const startClip = `circle(${origin.r ?? 50}px at ${origin.x}px ${origin.y}px)`;
    const expandClip = `circle(${expandTo} at ${origin.x}px ${origin.y}px)`;

    useEffect(() => {
      if (!overlayRef.current) return;
      gsap.set(overlayRef.current, { clipPath: startClip });
    }, [startClip]);

    const reveal = () => {
      gsap.to(overlayRef.current, {
        clipPath: expandClip,
        duration: 0.8,
        ease: "expo.inOut",
      });
    };
    const conceal = () => {
      gsap.to(overlayRef.current, {
        clipPath: startClip,
        duration: 1,
        ease: "expo.out",
      });
    };

    return (
      <div
        ref={assignRef}
        onMouseEnter={reveal}
        onMouseLeave={conceal}
        style={
          {
            "--accent-color": accent,
            "--on-accent-foreground": textOnAccent,
            "--on-accent-muted-foreground": mutedOnAccent,
          } as React.CSSProperties
        }
        className={cn("relative overflow-hidden rounded-2xl", className)}
        {...rest}
      >
        <div className="relative z-0">{base}</div>
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 h-full w-full pointer-events-none"
        >
          {overlay}
        </div>
      </div>
    );
  }
);
RevealCardContainer.displayName = "RevealCardContainer";

export default RevealCardContainer;
