import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 20, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-3")}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
};

interface ScrollTextProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export function ScrollText({
  text,
  className,
  textClassName,
}: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "w-full max-w-4xl text-center text-3xl md:text-5xl font-bold uppercase tracking-tight px-6",
          textClassName
        )}
        style={{ perspective: "500px" }}
      >
        {characters.map((char, i) => (
          <CharacterV1
            key={i}
            char={char}
            index={i}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

export { CharacterV1 };
