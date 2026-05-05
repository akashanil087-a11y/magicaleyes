import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticCursorProps {
  children: ReactNode;
  /** How strongly elements are pulled toward the cursor. 0 = no pull, 1 = full pull */
  magneticFactor?: number;
  /** Diameter of the custom cursor in px */
  cursorSize?: number;
  /** CSS mix-blend-mode for the cursor blob */
  blendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
}

/**
 * Magnetic cursor wrapper.
 *
 * Inside the wrapped area, the native cursor is hidden and a custom blob
 * follows the mouse. Any descendant with `data-magnetic` will be pulled
 * toward the cursor when hovered, and the cursor itself snaps to it.
 */
export function MagneticCursor({
  children,
  magneticFactor = 0.4,
  cursorSize = 30,
  blendMode = "exclusion",
  className,
}: MagneticCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Smoothed positions
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const activeMagnetic = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Find magnetic element under the cursor (or in nearby radius)
      const el = (e.target as HTMLElement | null)?.closest(
        "[data-magnetic]"
      ) as HTMLElement | null;

      if (el && container.contains(el)) {
        activeMagnetic.current = el;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Snap target toward element center
        target.current.x = cx + (e.clientX - cx) * (1 - magneticFactor);
        target.current.y = cy + (e.clientY - cy) * (1 - magneticFactor);

        // Translate the magnetic element toward cursor
        const dx = (e.clientX - cx) * magneticFactor;
        const dy = (e.clientY - cy) * magneticFactor;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)";
      } else if (activeMagnetic.current) {
        activeMagnetic.current.style.transform = "translate(0, 0)";
        activeMagnetic.current = null;
      }
    };

    const onMouseLeave = () => {
      if (activeMagnetic.current) {
        activeMagnetic.current.style.transform = "translate(0, 0)";
        activeMagnetic.current = null;
      }
      cursor.style.opacity = "0";
    };

    const onMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const animate = () => {
      // Lerp toward target
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      cursor.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (activeMagnetic.current) {
        activeMagnetic.current.style.transform = "";
        activeMagnetic.current = null;
      }
    };
  }, [magneticFactor]);

  return (
    <div ref={containerRef} className={cn("relative cursor-none", className)}>
      {children}

      {/* Custom cursor blob — fixed to viewport, blended */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-white opacity-0 transition-opacity duration-300 z-[9999]"
        style={{
          width: cursorSize,
          height: cursorSize,
          mixBlendMode: blendMode,
          willChange: "transform",
        }}
      />
    </div>
  );
}
