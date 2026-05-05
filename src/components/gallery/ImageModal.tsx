import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  /** Full list of images for the carousel. */
  images: string[];
  /** Index of the image to start on. */
  initialIndex?: number;
}

export default function ImageModal({
  open,
  setOpen,
  images,
  initialIndex = 0,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

  // Sync the active index whenever the modal opens with a new starting frame.
  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const goTo = useCallback(
    (next: number) => {
      const last = images.length - 1;
      const wrapped = ((next % images.length) + images.length) % images.length;
      setDirection(wrapped > index || (index === last && wrapped === 0) ? 1 : -1);
      setIndex(wrapped);
    },
    [images.length, index]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard nav while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, setOpen]);

  if (!images.length) return null;
  const current = images[index];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none! w-screen h-screen p-0 bg-black/95 border-0 rounded-none flex items-center justify-center overflow-hidden"
      >
        {/* Image stage */}
        <div className="relative w-full h-full flex items-center justify-center px-6 md:px-20 py-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current}
              src={current}
              alt={`Frame ${index + 1}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 40, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-full max-h-full object-contain shadow-2xl shadow-black/60"
            />
          </AnimatePresence>
        </div>

        {/* Close (top-right) */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Side arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/15 text-amber-200/80 hover:text-amber-200 hover:border-amber-200/60 flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/15 text-amber-200/80 hover:text-amber-200 hover:border-amber-200/60 flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Bottom controls — dots + counter */}
        <div className="fixed bottom-6 inset-x-0 z-50 px-6 md:px-10 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] tracking-[0.4em] text-white/40 pointer-events-auto">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to frame ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === index
                    ? "w-6 bg-amber-300"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          <span
            className="text-[10px] tracking-[0.4em] text-white/40 pointer-events-auto"
            aria-hidden="true"
          >
            {index + 1}/{images.length}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
