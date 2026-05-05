import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageSpotlightProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  orientation?: "portrait" | "landscape";
  className?: string;
}

/**
 * Dark-themed image with a spotlight reveal.
 *
 * Default state: image renders fully desaturated and darkened (black-shade theme).
 * Hover / touch: a circular spotlight follows the pointer and reveals the
 * original full-color image through a radial mask.
 */
export default function ImageSpotlight({
  src,
  alt = "",
  width,
  height,
  orientation = "portrait",
  className,
}: ImageSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(false);

  const updatePos = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => updatePos(e.clientX, e.clientY),
    [updatePos]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      updatePos(touch.clientX, touch.clientY);
    },
    [updatePos]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      updatePos(touch.clientX, touch.clientY);
      setActive(true);
    },
    [updatePos]
  );

  const aspect = orientation === "portrait" ? "aspect-3/4" : "aspect-video";

  // Spotlight radius — slightly larger on touch devices for a generous reveal area
  const SPOT_RADIUS = 160;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl group select-none touch-none",
        aspect,
        className
      )}
      style={{ width: width || undefined, height: height || undefined }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setActive(false)}
      onTouchCancel={() => setActive(false)}
    >
      {/* Base image — always dark / black-shade theme */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) brightness(0.32) contrast(1.05)" }}
      />

      {/* Subtle dark veil for depth */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Spotlight reveal — full-color image visible only inside the radial mask */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: active ? 1 : 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: `radial-gradient(circle ${SPOT_RADIUS}px at ${pos.x * 100}% ${pos.y * 100}%, black 0%, black 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${SPOT_RADIUS}px at ${pos.x * 100}% ${pos.y * 100}%, black 0%, black 40%, transparent 100%)`,
        }}
      />

      {/* Soft glow ring around the spotlight */}
      <div
        className="absolute pointer-events-none rounded-full transition-opacity duration-300"
        style={{
          opacity: active ? 0.2 : 0,
          width: SPOT_RADIUS * 2,
          height: SPOT_RADIUS * 2,
          left: `${pos.x * 100}%`,
          top: `${pos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
