import { useEffect, useState, useMemo } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  duration?: number;
  onComplete?: () => void;
}

const SERVICES = [
  "WEDDING",
  "PORTRAIT",
  "EDITORIAL",
  "FASHION",
  "LANDSCAPE",
  "FINE ART",
  "DOCUMENTARY",
  "EVENTS",
  "BRANDING",
  "STREET",
  "CINEMATIC",
  "STUDIO",
  "ARCHITECTURE",
  "TRAVEL",
  "PRODUCT",
  "CONCEPT",
];

function useStars(count = 80) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * 4 + 2,
        delay: Math.random() * 4,
      })),
    [count]
  );
}

function useLocalTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  const ss = time.getSeconds().toString().padStart(2, "0");
  const h12 = ((time.getHours() + 11) % 12) + 1;
  const ampm = time.getHours() >= 12 ? "PM" : "AM";
  return { full: `${hh}:${mm}:${ss}`, pretty: `${h12}:${mm} ${ampm}` };
}

export default function LoadingScreen({
  duration = 4000,
  onComplete,
}: LoadingScreenProps) {
  const stars = useStars(90);
  const time = useLocalTime();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [scrambleTick, setScrambleTick] = useState(0);

  // Re-scramble the brand name every 3.5s during the load
  useEffect(() => {
    const id = setInterval(() => setScrambleTick((t) => t + 1), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setFadeOut(true);
        setTimeout(() => onComplete?.(), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  const counter = Math.floor(progress);
  const accent = "#C4956A";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] overflow-hidden text-white font-mono",
        "bg-[#0a0908] transition-opacity duration-700",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Starfield ── */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: `twinkle ${s.twinkle}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Top-left: brand + coordinates ── */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 text-[10px] md:text-[11px] tracking-[0.18em] text-white/70 flex flex-wrap gap-x-6 gap-y-1 max-w-[80vw]">
        <span className="font-semibold">MAGICAL EYES</span>
        <span>40° 42' 51.0036" N</span>
        <span>74° 0' 21.5028" W</span>
      </div>

      {/* ── Top-right: live time ── */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] md:text-[11px] tracking-[0.18em] text-white/70">
        Local time: {time.full} ({time.pretty})
      </div>

      {/* ── Center: 3D rotating HUD + brand name below ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ perspective: "1200px" }}>
        <div
          className="relative w-[min(60vw,360px)] aspect-square"
          style={{
            transformStyle: "preserve-3d",
            animation:
              "hud-enter 1.4s cubic-bezier(0.22,1,0.36,1) both, hud-float 6s ease-in-out 1.4s infinite",
          }}
        >
          {/* Outer rotating service ring (SVG textPath) */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full"
            style={{
              animation: "spin-hud 40s linear infinite",
            }}
          >
            <defs>
              <path id="service-ring" d="M 200,200 m -185,0 a 185,185 0 1,1 370,0 a 185,185 0 1,1 -370,0" />
            </defs>
            <circle
              cx="200"
              cy="200"
              r="185"
              fill="none"
              stroke={accent}
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
            <text
              fill="white"
              fillOpacity="0.55"
              fontSize="9"
              letterSpacing="3"
              fontFamily="monospace"
            >
              <textPath href="#service-ring" startOffset="0">
                {SERVICES.map((s) => `${s}  ·  `).join("")}
              </textPath>
            </text>
          </svg>

          {/* Tick marks ring (counter-rotates slowly) */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full"
            style={{ animation: "spin-hud-rev 60s linear infinite" }}
          >
            <circle
              cx="200"
              cy="200"
              r="160"
              fill="none"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="0.6"
            />
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 2 * Math.PI;
              const major = i % 5 === 0;
              const r1 = 160;
              const r2 = major ? 150 : 156;
              const x1 = 200 + Math.cos(angle) * r1;
              const y1 = 200 + Math.sin(angle) * r1;
              const x2 = 200 + Math.cos(angle) * r2;
              const y2 = 200 + Math.sin(angle) * r2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeOpacity={major ? 0.45 : 0.18}
                  strokeWidth={major ? 1 : 0.6}
                />
              );
            })}
          </svg>

          {/* Progress arc */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="200"
              cy="200"
              r="135"
              fill="none"
              stroke={accent}
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />
            <circle
              cx="200"
              cy="200"
              r="135"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 135}
              strokeDashoffset={2 * Math.PI * 135 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 100ms linear" }}
            />
          </svg>

          {/* Inner faint rings */}
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          <div className="absolute inset-[26%] rounded-full border border-white/5" />

          {/* Cardinal cross-hairs */}
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                transform: `translate(0, -50%) rotate(${deg}deg)`,
                width: "50%",
                height: "1px",
              }}
            >
              <span
                className="absolute right-0 h-px"
                style={{
                  width: "12%",
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3))",
                }}
              />
            </span>
          ))}

          {/* Center countdown */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="font-light text-white tracking-tighter"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1,
                fontFamily: "'Ebrima', 'Century Gothic', sans-serif",
                textShadow: `0 0 30px ${accent}40`,
              }}
            >
              {String(counter).padStart(3, "0")}
            </div>
            <div className="mt-2 text-[9px] tracking-[0.4em] uppercase text-white/40">
              Loading
            </div>
          </div>

          {/* Subtle accent pulse */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accent}10 0%, transparent 60%)`,
              animation: "hud-pulse 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── Brand name — below the HUD ── */}
        <div className="mt-10 text-center pointer-events-none">
          <h1
            className="font-bold uppercase text-white leading-none"
            style={{
              fontSize: "clamp(22px, 3.5vw, 42px)",
              fontFamily: "'Ebrima', 'Century Gothic', sans-serif",
              letterSpacing: "0.18em",
              textShadow: `0 0 30px ${accent}30`,
            }}
          >
            <TextScramble
              key={`brand-${scrambleTick}`}
              text="MAGICAL EYES"
              trigger="mount"
              speed={70}
            />
          </h1>
          <p className="mt-2 text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/40">
            <TextScramble
              key={`sub-${scrambleTick}`}
              text="Photography Studio"
              trigger="mount"
              delay={400}
              speed={50}
            />
          </p>
        </div>
      </div>

      {/* ── Bottom-left: brand text ── */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 max-w-xs">
        <p className="text-[10px] tracking-[0.18em] text-white/50 mb-1">
          since <span className="ml-2">2018</span>
        </p>
        <p className="text-[14px] md:text-[16px] tracking-[0.18em] uppercase text-white font-semibold leading-tight">
          <TextScramble text="Creative" trigger="mount" speed={45} />
          <br />
          <TextScramble text="Photography" trigger="mount" delay={120} speed={45} />
          <br />
          <TextScramble text="Studio" trigger="mount" delay={240} speed={45} />
        </p>
      </div>

      {/* ── Bottom-right: tagline ── */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right">
        <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-white/70 leading-relaxed">
          <TextScramble text="Capturing" trigger="mount" speed={50} />
          <br />
          <TextScramble text="Timeless" trigger="mount" delay={150} speed={50} />
          <br />
          <TextScramble text="Memories" trigger="mount" delay={300} speed={50} />
          <br />
          <TextScramble text="Worldwide_" trigger="mount" delay={450} speed={50} />
        </p>
      </div>

      {/* ── Bottom progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px w-full bg-white/5">
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, transparent, ${accent}, ${accent})`,
              transition: "width 100ms linear",
            }}
          />
        </div>
      </div>

      {/* Inline keyframes (component-scoped via style tag) */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes spin-hud {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-hud-rev {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes hud-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.04); }
        }
        /* Entrance — scale + fade + 3D tilt-in */
        @keyframes hud-enter {
          0% {
            opacity: 0;
            transform: scale(0.6) rotateX(35deg) rotateY(-18deg);
            filter: blur(12px);
          }
          60% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg);
            filter: blur(0);
          }
        }
        /* Continuous breathing + gentle 3D float */
        @keyframes hud-float {
          0%, 100% {
            transform: translateY(0) scale(1) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-6px) scale(1.015) rotateX(2deg) rotateY(-2deg);
          }
          50% {
            transform: translateY(0) scale(1.02) rotateX(0deg) rotateY(2deg);
          }
          75% {
            transform: translateY(6px) scale(1.015) rotateX(-2deg) rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}
