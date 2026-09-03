import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import {
  CAMERA_PATHS,
  CAMERA_VIEW_BOX,
  RELEASE_CENTER,
  RELEASE_RADIUS,
  RELEASE_TRACK,
} from "./cameraGeometry";
import styles from "./MagicalEyesLoader.module.css";
import { WORDMARK_PATHS } from "./wordmarkGeometry";

/**
 * Window, in ms, across which the per-path draw delays are spread. The reveal
 * finishes at roughly LEAD_IN + DRAW_WINDOW + the CSS --me-draw-dur.
 */
const DRAW_WINDOW_MS = 1500;
const LEAD_IN_MS = 140;

/** Split of the delay between document order and scatter. Must sum to 1. */
const ORDERED_SHARE = 0.6;
const SCATTER_SHARE = 0.4;

/** Fallback dash length if getTotalLength() is unavailable (jsdom, SSR hydrate). */
const FALLBACK_PATH_LENGTH = 2000;

/** Must match the .gate transition duration in the stylesheet. */
const EXIT_DURATION_MS = 620;

/**
 * The wordmark traces itself on after the plate has largely assembled, then
 * inks in — the letters arrive as hairline outlines and only afterwards go
 * solid. Delays are measured from the same clock as the plate hairlines; the
 * ink hand-off lives in the stylesheet.
 */
const MARK_LEAD_IN_MS = 1500;
const MARK_DRAW_WINDOW_MS = 900;
/** Must match --me-mark-ink-delay in the stylesheet. */
const MARK_INK_DELAY_MS = 3150;

export interface MagicalEyesLoaderProps {
  /**
   * Called once the visitor commits to entering. `withAudio` is false when they
   * choose the silent link — forward it to your audio context so the unlock
   * gesture is not wasted.
   */
  onEnter?: (withAudio: boolean) => void;
  /**
   * Gate the controls until your assets are ready. While false the release and
   * both buttons are disabled; the draw-on animation still plays.
   */
  ready?: boolean;
  /** Wordmark leading capital, set in the display face. */
  markLead?: string;
  /** Remainder of the wordmark, set smaller and letterspaced. */
  markRest?: string;
  className?: string;
}

/**
 * Deterministic pseudo-random value in [0, 1) for a given index.
 *
 * The reveal needs to look scattered rather than sequential, but it must be
 * identical on every load — otherwise visual regression snapshots are useless
 * and the animation feels different each visit. Hashing the index gives both.
 */
function scatterAt(index: number): number {
  const x = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MagicalEyesLoader({
  onEnter,
  ready = true,
  markLead = "M",
  markRest = "AGICAL EYES",
  className,
}: MagicalEyesLoaderProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const exitTimer = useRef<number | null>(null);
  const [exiting, setExiting] = useState(false);

  /**
   * Measure each path and seed its dash offset, then flip data-ready to reveal
   * the artwork. All of it imperative: path length is only knowable after
   * layout, and routing the reveal through state would both cost a second
   * render and trip react-hooks/set-state-in-effect.
   */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (prefersReducedMotion()) {
      svg.dataset.ready = "true";
      return;
    }

    const strokes = svg.querySelectorAll<SVGPathElement>(`.${styles.stroke}`);
    const count = strokes.length;

    strokes.forEach((path, index) => {
      let length = FALLBACK_PATH_LENGTH;
      try {
        const measured = path.getTotalLength();
        if (Number.isFinite(measured) && measured > 0) length = measured;
      } catch {
        // Detached or zero-length node — keep the fallback.
      }

      const ordered = (index / count) * DRAW_WINDOW_MS * ORDERED_SHARE;
      const scattered = scatterAt(index) * DRAW_WINDOW_MS * SCATTER_SHARE;

      path.style.setProperty("--me-len", String(length));
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = String(length);
      path.style.animationDelay = `${Math.round(LEAD_IN_MS + ordered + scattered)}ms`;
    });

    // Same treatment for the engraving, on its own later clock. Left to right
    // with no scatter: the eye reads a word in that order, and a scattered
    // wordmark looks like a glitch rather than a hand writing.
    const traces = svg.querySelectorAll<SVGPathElement>(`.${styles.markTrace}`);
    traces.forEach((path, index) => {
      let length = FALLBACK_PATH_LENGTH;
      try {
        const measured = path.getTotalLength();
        if (Number.isFinite(measured) && measured > 0) length = measured;
      } catch {
        // Detached or zero-length node — keep the fallback.
      }

      const delay = MARK_LEAD_IN_MS + (index / traces.length) * MARK_DRAW_WINDOW_MS;
      path.style.setProperty("--me-len", String(length));
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = String(length);
      // me-draw runs per glyph, me-trace-settle for all of them at once. One
      // scalar would drive both, so the pair has to be written out.
      path.style.animationDelay = `${Math.round(delay)}ms, ${MARK_INK_DELAY_MS}ms`;
    });

    svg.dataset.ready = "true";
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
    };
  }, []);

  const handleEnter = useCallback(
    (withAudio: boolean) => {
      if (!ready || exiting) return;
      setExiting(true);
      exitTimer.current = window.setTimeout(() => {
        onEnter?.(withAudio);
      }, prefersReducedMotion() ? 0 : EXIT_DURATION_MS);
    },
    [exiting, onEnter, ready],
  );

  const handleReleaseKey = useCallback(
    (event: ReactKeyboardEvent<SVGGElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleEnter(true);
    },
    [handleEnter],
  );

  return (
    <div
      className={className ? `${styles.gate} ${className}` : styles.gate}
      data-exiting={exiting || undefined}
    >
      {/* Never painted — the wordmark the visitor sees is engraved on the plate
          below. This exists so the page has a real heading. */}
      <h1 className={styles.mark}>{markLead + markRest}</h1>

      <svg
        ref={svgRef}
        className={styles.camera}
        viewBox={CAMERA_VIEW_BOX}
        role="img"
        aria-label={`Technical line drawing of a camera top plate bearing the ${markLead}${markRest} wordmark`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="me-release-grad" cx="40%" cy="38%" r="78%">
            <stop className={styles.releaseStopLit} offset="0%" />
            <stop className={styles.releaseStopMid} offset="50%" />
            <stop className={styles.releaseStopDeep} offset="100%" />
          </radialGradient>
          <path id="me-release-track" d={RELEASE_TRACK} />
        </defs>

        <g>
          {CAMERA_PATHS.map((path, index) => (
            <path
              key={index}
              className={styles.stroke}
              d={path.d}
              transform={path.transform}
            />
          ))}
        </g>

        {/* Two passes over the same geometry: the hairline trace that draws
            itself on, then the ink that fades in behind it. Keeping both means
            the finished engraving carries the outline's weight, which is what
            holds it together against the plate at small sizes. */}
        <g className={styles.markInk}>
          {WORDMARK_PATHS.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
        <g>
          {WORDMARK_PATHS.map((d, index) => (
            <path key={index} className={styles.markTrace} d={d} />
          ))}
        </g>

        <g
          className={styles.release}
          role="button"
          tabIndex={ready ? 0 : -1}
          aria-disabled={!ready || undefined}
          aria-label={`Enter ${markLead}${markRest}`}
          onClick={() => handleEnter(true)}
          onKeyDown={handleReleaseKey}
        >
          <circle
            className={styles.releaseDisc}
            cx={RELEASE_CENTER.x}
            cy={RELEASE_CENTER.y}
            r={RELEASE_RADIUS}
          />
          {/* One copy only — a second at the opposite offset reads upside down.
              50% is top dead centre of the track; see RELEASE_TRACK. */}
          <text className={styles.releaseLabel}>
            <textPath href="#me-release-track" startOffset="50%" textAnchor="middle">
              CLICK TO ENTER
            </textPath>
          </text>
          <circle
            className={styles.releaseHit}
            cx={RELEASE_CENTER.x}
            cy={RELEASE_CENTER.y}
            r={44}
          />
        </g>
      </svg>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.enter}
          disabled={!ready}
          onClick={() => handleEnter(true)}
        >
          ENTER WITH AUDIO
        </button>
        <button
          type="button"
          className={styles.enterSilent}
          disabled={!ready}
          onClick={() => handleEnter(false)}
        >
          [ ENTER WITHOUT SOUND ]
        </button>
      </div>
    </div>
  );
}
