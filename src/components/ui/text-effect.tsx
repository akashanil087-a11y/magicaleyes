import type { TargetAndTransition } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  opacity: 0,
  y: 40,
  scale: 0.7,
  rotateY: -15,
  filter: "blur(8px)",
};

const animateProps: TargetAndTransition = {
  opacity: 1,
  y: 0,
  scale: 1,
  rotateY: 0,
  filter: "blur(0px)",
};

interface MagicalEyesEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation speed multiplier. <1 = faster, >1 = slower. Default 1 */
  speed?: number;
  /** Fires when the last letter finishes animating */
  onAnimationComplete?: () => void;
}

const TEXT = ["M", "A", "G", "I", "C", "A", "L", " ", "E", "Y", "E", "S"];

export function MagicalEyesEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: MagicalEyesEffectProps) {
  const calc = (x: number) => x * speed;
  const lastIndex = TEXT.length - 1;

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-start",
        className
      )}
      style={{ perspective: "1000px" }}
      {...props}
    >
      <div className="flex flex-wrap items-baseline">
        {TEXT.map((char, i) =>
          char === " " ? (
            <span
              key={`space-${i}`}
              className="inline-block w-[0.35em] md:w-[0.5em]"
            />
          ) : (
            <motion.span
              key={`${char}-${i}`}
              initial={initialProps}
              animate={animateProps}
              transition={{
                duration: calc(0.7),
                delay: calc(i * 0.09),
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 220,
                damping: 18,
                opacity: { duration: 0.4, delay: calc(i * 0.09) },
                filter: { duration: 0.6, delay: calc(i * 0.09) },
              }}
              onAnimationComplete={
                i === lastIndex ? onAnimationComplete : undefined
              }
              className="inline-block leading-[0.9] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char}
            </motion.span>
          )
        )}
      </div>

      {/* Underline tech accent — draws after the letters land */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.6 }}
        transition={{
          duration: calc(1.2),
          delay: calc(TEXT.length * 0.09 + 0.3),
          ease: "easeOut",
        }}
        style={{ transformOrigin: "left" }}
        className="mt-3 h-px w-full bg-gradient-to-r from-white/60 via-white/30 to-transparent"
      />
    </div>
  );
}

export default MagicalEyesEffect;
