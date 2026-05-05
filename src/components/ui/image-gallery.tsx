import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Auto-import every photography image as the default fallback
const pjModules = import.meta.glob("@/assets/pj/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const allGalleryImages = Object.entries(pjModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

interface ImageGalleryProps {
  /** Override the images shown. Defaults to every image in src/assets/pj */
  images?: string[];
  /** Number of columns on large screens. Default 3 */
  columns?: number;
  /** Click handler — receives the image src */
  onImageClick?: (src: string) => void;
  className?: string;
}

export function ImageGallery({
  images = allGalleryImages,
  columns = 3,
  onImageClick,
  className,
}: ImageGalleryProps) {
  // Distribute images into N columns (round-robin) so each column flows independently
  const cols: string[][] = Array.from({ length: columns }, () => []);
  images.forEach((src, i) => {
    cols[i % columns].push(src);
  });

  const colsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center py-6 px-2 md:px-4",
        className
      )}
    >
      <div className={cn("mx-auto grid w-full max-w-7xl gap-3 md:gap-4", colsClass)}>
        {cols.map((colImages, colIdx) => (
          <div key={colIdx} className="grid gap-3 md:gap-4">
            {colImages.map((src, idx) => {
              // Deterministic portrait/landscape based on index so layout is stable
              const isPortrait = (colIdx + idx) % 3 !== 0;
              const ratio = isPortrait ? 9 / 16 : 16 / 9;
              return (
                <AnimatedImage
                  key={`${colIdx}-${idx}`}
                  alt={`Gallery image ${colIdx}-${idx}`}
                  src={src}
                  ratio={ratio}
                  onClick={onImageClick ? () => onImageClick(src) : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  ratio: number;
  className?: string;
  onClick?: () => void;
}

function AnimatedImage({ alt, src, ratio, className, onClick }: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className={cn(
        "bg-accent relative size-full rounded-lg border border-white/5 overflow-hidden",
        onClick && "cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <img
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out",
          isInView && !isLoading && "opacity-100",
          onClick && "group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        )}
      />
    </AspectRatio>
  );
}

export default ImageGallery;
