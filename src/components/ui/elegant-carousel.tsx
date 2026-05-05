import { useState, useEffect, useRef, useCallback } from "react";

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

const defaultSlides: SlideData[] = [
  {
    title: "Venetian Dusk",
    subtitle: "Autumn / Winter Collection",
    description:
      "Where ancient architecture meets the dying light — a palette drawn from terracotta, aged stone, and the shimmering canals of Venice at twilight.",
    accent: "#C4956A",
    imageUrl: "/images/p1.webp",
  },
  {
    title: "Nordic Silence",
    subtitle: "Spring / Summer Collection",
    description:
      "Inspired by the vast stillness of Scandinavian fjords — clean lines, muted tones, and the quiet power of unadorned beauty.",
    accent: "#8BA7B8",
    imageUrl: "/images/p2.webp",
  },
  {
    title: "Kyoto Garden",
    subtitle: "Resort Collection",
    description:
      "Moss-covered pathways and paper lanterns — an ode to the meditative elegance of Japanese garden design and its timeless restraint.",
    accent: "#7A9E7E",
    imageUrl: "/images/p3.webp",
  },
  {
    title: "Saharan Gold",
    subtitle: "Capsule Collection",
    description:
      "The desert reveals its secrets at dawn — liquid gold spilling across endless dunes, textures carved by centuries of wind and time.",
    accent: "#D4A955",
    imageUrl: "/images/p4.webp",
  },
];

interface ElegantCarouselProps {
  slides?: SlideData[];
}

export default function ElegantCarousel({ slides = defaultSlides }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);
      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;
    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 100 / (SLIDE_DURATION / 50)));
    }, 50);
    intervalRef.current = setInterval(goNext, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) { diff > 0 ? goNext() : goPrev(); }
  };

  const slide = slides[currentIndex];
  const vis = isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0";

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-20">
        {/* Left: Text */}
        <div className="flex flex-col justify-center">
          {/* Collection number */}
          <div className={`flex items-center gap-3 mb-8 transition-all duration-500 ${vis}`}>
            <span className="w-8 h-px" style={{ backgroundColor: slide.accent }} />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light text-white italic leading-[1.1] mb-4 transition-all duration-700 ${vis}`}>
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className={`text-[12px] tracking-[0.25em] uppercase mb-6 transition-all duration-700 delay-75 ${vis}`} style={{ color: slide.accent }}>
            {slide.subtitle}
          </p>

          {/* Description */}
          <p className={`text-white/50 text-sm leading-relaxed max-w-md mb-10 transition-all duration-700 delay-100 ${vis}`}>
            {slide.description}
          </p>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={goNext}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className={`overflow-hidden rounded-2xl transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            <img src={slide.imageUrl} alt={slide.title} className="w-full aspect-3/4 object-cover" />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${slide.accent}22 0%, transparent 50%)` }}
            />
          </div>
          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 rounded-tl-lg pointer-events-none transition-colors duration-700" style={{ borderColor: slide.accent + "60" }} />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 rounded-br-lg pointer-events-none transition-colors duration-700" style={{ borderColor: slide.accent + "60" }} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 pb-10 flex gap-4">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="flex-1 group text-left"
            aria-label={`Go to ${s.title}`}
          >
            <div className="h-px w-full bg-white/10 mb-2 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: i === currentIndex ? `${progress}%` : i < currentIndex ? "100%" : "0%",
                  backgroundColor: i === currentIndex ? slide.accent : "rgba(255,255,255,0.3)",
                }}
              />
            </div>
            <span className={`text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${i === currentIndex ? "text-white/70" : "text-white/25 group-hover:text-white/40"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
