import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleProps {
  text: string;
  /**
   * When the scramble animation should fire.
   * - "mount":   plays once when the component mounts
   * - "view":    plays once when the element scrolls into view (default)
   * - "hover":   plays every time the element is hovered
   */
  trigger?: "mount" | "view" | "hover";
  /** Delay in ms before the scramble begins */
  delay?: number;
  /** Approximate scramble duration in animation frames (~60fps) */
  speed?: number;
  className?: string;
}

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string;
}

/**
 * Decoding text effect — characters scramble through random glyphs
 * before locking into the target string, in left-to-right waves.
 *
 * Based on the canonical "TextScramble" algorithm (Justin Windle, 2014).
 */
export function TextScramble({
  text,
  trigger = "view",
  delay = 0,
  speed = 50,
  className,
}: TextScrambleProps) {
  const [output, setOutput] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRequestRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);

  const play = useCallback(() => {
    if (frameRequestRef.current !== null) {
      cancelAnimationFrame(frameRequestRef.current);
    }

    const queue: QueueItem[] = [];
    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * (speed * 0.8));
      const end = start + Math.floor(Math.random() * speed);
      queue.push({ from: "", to: text[i], start, end, char: "" });
    }

    let frame = 0;
    const update = () => {
      let result = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) {
          complete++;
          result += q.to;
        } else if (frame >= q.start) {
          // Preserve whitespace and line breaks — never scramble them
          if (q.to === " " || q.to === "\n") {
            result += q.to;
          } else {
            if (!q.char || Math.random() < 0.28) {
              q.char =
                SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
            result += q.char;
          }
        } else {
          result += q.from;
        }
      }

      setOutput(result);

      if (complete < queue.length) {
        frame++;
        frameRequestRef.current = requestAnimationFrame(update);
      } else {
        frameRequestRef.current = null;
      }
    };

    update();
  }, [text, speed]);

  // Reset output if text prop changes
  useEffect(() => {
    setOutput(text);
    hasPlayedRef.current = false;
  }, [text]);

  // Mount trigger
  useEffect(() => {
    if (trigger !== "mount") return;
    const timer = setTimeout(() => {
      play();
      hasPlayedRef.current = true;
    }, delay);
    return () => {
      clearTimeout(timer);
      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [trigger, delay, play]);

  // In-view trigger via IntersectionObserver
  useEffect(() => {
    if (trigger !== "view") return;
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            if (delay > 0) setTimeout(play, delay);
            else play();
          }
        }
      },
      { threshold: 0.2, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [trigger, delay, play]);

  // Hover handler
  const handleMouseEnter = trigger === "hover" ? play : undefined;

  return (
    <span
      ref={elementRef}
      className={cn("inline-block whitespace-pre-line", className)}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {output}
    </span>
  );
}

export default TextScramble;
