import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  images: string[];
  initialIndex?: number;
}

const ACCENT = "text-green-400";
const ACCENT_BORDER = "border-green-400/70";
const year = new Date().getFullYear();

function DiamondButton({
  children,
  onClick,
  href,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  ariaLabel: string;
  className?: string;
}) {
  const Cmp: React.ElementType = href ? "a" : "button";
  return (
    <Cmp
      type={href ? undefined : "button"}
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={cn(
        `w-9 h-9 md:w-10 md:h-10 border ${ACCENT_BORDER} rotate-45 flex items-center justify-center transition-colors hover:bg-green-400/10 cursor-pointer`,
        className
      )}
    >
      <span className={cn("-rotate-45 inline-flex", ACCENT)}>{children}</span>
    </Cmp>
  );
}

export default function ImageModal({
  open,
  setOpen,
  images,
  initialIndex = 0,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

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
  const upcoming = images[(index + 1) % images.length];
  const previous = images[(index - 1 + images.length) % images.length];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none! w-screen h-screen p-0 bg-black border-0 rounded-none flex items-center justify-center overflow-hidden"
      >
        {/* Faint peeking neighbours — left & right edges */}
        <img
          src={previous}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[55vh] w-[6vw] object-cover opacity-25 blur-[2px]"
        />
        <img
          src={upcoming}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[55vh] w-[6vw] object-cover opacity-25 blur-[2px]"
        />

        {/* Top header — brand mark (left) + diamond social icons (right) */}
        <div className="fixed top-6 inset-x-0 z-40 px-6 md:px-10 flex items-start justify-between pointer-events-none">
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] leading-relaxed text-white/85 pointer-events-auto">
            MAGICAL
            <br />
            EYES
          </p>
        </div>

        {/* Image stage */}
        <div className="relative w-full h-full flex items-center justify-center px-[10vw] py-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 40, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-full max-h-full"
            >
              <img
                src={current}
                alt={`Frame ${index + 1}`}
                className="max-w-full max-h-[78vh] object-contain shadow-2xl shadow-black/60"
              />
              {/* Floating next-image thumbnail (top-right of main image) */}
              <button
                type="button"
                onClick={next}
                aria-label="Next frame preview"
                className="absolute top-1/3 -right-6 md:-right-12 w-32 h-20 md:w-40 md:h-24 overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-black/60 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={upcoming}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top-right — diamond close button (X icon, idle pulse + hover spin) */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: [0, -3, 0],
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 0 0 rgba(74,222,128,0)",
              "0 0 18px rgba(74,222,128,0.45)",
              "0 0 0 rgba(74,222,128,0)",
            ],
          }}
          transition={{
            opacity: { duration: 0.4 },
            y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed top-16 right-6 z-50 pointer-events-auto group rounded-md"
        >
          <DiamondButton ariaLabel="Close" onClick={() => setOpen(false)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110"
            >
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </DiamondButton>
        </motion.div>

        {/* Right — long arrow + horizontal rule */}
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 cursor-pointer group"
        >
          <span className="hidden md:block w-20 h-px bg-green-400/40 group-hover:bg-green-400 transition-colors" />
          <svg width="20" height="14" viewBox="0 0 30 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(ACCENT, "transition-transform group-hover:translate-x-1")}>
            <path d="M0 7 L28 7 M22 1 L29 7 L22 13" />
          </svg>
        </button>

        {/* Bottom bar — copyright (left) · TWEET | SHARE (centre) · counter (right) */}
        <div className="fixed bottom-6 inset-x-0 z-40 px-6 md:px-10 flex items-end justify-between text-[10px] md:text-[11px] tracking-[0.3em] uppercase pointer-events-none">
          <p className="text-white/55 pointer-events-auto">
            {year} © Magical Eyes
          </p>

          <div className="flex items-center gap-4 text-white/75 pointer-events-auto">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaTwitter className={ACCENT} />
              Tweet
            </a>
            <span className="text-white/25">|</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaFacebookF className={ACCENT} />
              Share
            </a>
          </div>

          <p className="text-white/85 font-mono pointer-events-auto">
            <span className="text-white">{index + 1}</span>
            <span className="text-white/40">/{images.length}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
