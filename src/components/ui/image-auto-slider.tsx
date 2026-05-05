// Auto-import every photography image from assets/pj as the default fallback
const pjModules = import.meta.glob("@/assets/pj/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const allGalleryImages = Object.entries(pjModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

interface ImageAutoSliderProps {
  /** Override the images shown. Defaults to every image in src/assets/pj */
  images?: string[];
  className?: string;
}

export function ImageAutoSlider({
  images = allGalleryImages,
  className,
}: ImageAutoSliderProps) {
  // Duplicate the array for a seamless infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes ias-scroll-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ias-infinite-scroll {
          animation: ias-scroll-right 30s linear infinite;
        }
        .ias-scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
        .ias-image-item {
          transition: transform 0.4s ease, filter 0.4s ease;
        }
        .ias-image-item:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }
      `}</style>

      <div className={`w-full relative overflow-hidden flex items-center justify-center py-8 ${className ?? ""}`}>
        <div className="ias-scroll-container w-full">
          <div className="ias-infinite-scroll flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="ias-image-item flex-shrink-0 w-72 h-96 sm:w-80 sm:h-[28rem] md:w-96 md:h-[32rem] lg:w-[28rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={image}
                  alt={`Gallery image ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const Component = ImageAutoSlider;
export default ImageAutoSlider;
