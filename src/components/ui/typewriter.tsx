import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  words: string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorChar?: string;
  /** When false, types each word once with no deletion / loop. Default true. */
  loop?: boolean;
  /** When true, the animation does not start until the component scrolls into view. Default false. */
  startOnView?: boolean;
  className?: string;
}

export function Typewriter({
  words,
  speed = 100,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
  loop = true,
  startOnView = false,
  className,
}: TypewriterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const [done, setDone] = useState(false);

  const currentWord = words[wordIndex] ?? "";

  // IntersectionObserver gate when startOnView is requested
  useEffect(() => {
    if (!startOnView || hasStarted) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView, hasStarted]);

  // Typing engine
  useEffect(() => {
    if (!hasStarted || done) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            setDisplayText(currentWord.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Reached end of current word
            const isLast = wordIndex === words.length - 1;
            if (!loop && isLast) {
              setDone(true);
              return;
            }
            setTimeout(() => {
              if (loop) {
                setIsDeleting(true);
              } else {
                // No-loop multi-word: move on without deleting
                setWordIndex((prev) => prev + 1);
                setCharIndex(0);
                setDisplayText("");
              }
            }, delayBetweenWords);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentWord.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [
    hasStarted,
    done,
    charIndex,
    currentWord,
    isDeleting,
    speed,
    delayBetweenWords,
    wordIndex,
    words,
    loop,
  ]);

  // Cursor blink
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span ref={containerRef} className={`inline-block ${className ?? ""}`}>
      <span>{displayText}</span>
      {cursor && !done && (
        <span
          className="ml-1 transition-opacity duration-75"
          style={{ opacity: showCursor ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

export default Typewriter;
