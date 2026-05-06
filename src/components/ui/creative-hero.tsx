import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import heroVideo from "@/assets/pj/hiyuki-wuthering-waves-ultimate-moewalls-com.mp4";
import { MagicalEyesEffect } from "@/components/ui/text-effect";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RevealCardContainer } from "@/components/ui/animated-profile-card";

/* ─────────── Hero — CSS-only animated, no WebGL ─────────── */
export default function CreativeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Magnetic CTA effect (GSAP only on the button — proven safe)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      const dist = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
      );
      if (dist < 150) {
        gsap.to(ctaRef.current, {
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
          duration: 0.6,
        });
      } else {
        gsap.to(ctaRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#020202] flex flex-col selection:bg-white selection:text-black overflow-hidden"
    >
      {/* ── Background video ── */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Soft gradient overlay — darker only behind text/cards, lets the
          centre and top of the video read cleanly. */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/40 via-black/10 to-black/55 pointer-events-none" />

      <motion.div
        initial={{ filter: "blur(20px)", scale: 1.02, opacity: 0 }}
        animate={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full flex flex-col md:flex-row px-6 pt-28 pb-12 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-10"
      >
        {/* ── Left side ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-8 md:pb-8 w-full gap-8 md:gap-0">
          {/* Photographer credit pill (replaces the live clock) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </span>
            <span className="font-mono text-[11px] md:text-[13px] font-medium text-white tracking-wider whitespace-nowrap">
              Frame by Akash Anil
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl lg:-translate-y-8 pr-0 md:pr-12">
            <h1 className="text-[clamp(2.5rem,6vw,6.5rem)] font-black leading-[0.9] tracking-tighter text-white uppercase">
              <MagicalEyesEffect speed={1} />
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-8 font-mono text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-sm leading-relaxed"
            >
              Timeless Elegance Captured in Every Frame
            </motion.p>
          </div>

          {/* Magnetic CTA */}
          <motion.button
            ref={ctaRef}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            onClick={() => navigate("/portfolio")}
            className="w-fit flex items-center gap-8 group lg:-translate-y-20 cursor-pointer"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white transition-all duration-500 overflow-hidden">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:stroke-black stroke-white transition-colors duration-500"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-mono text-[15px] md:text-[17px] font-bold text-white uppercase tracking-[0.25em]">
              Portfolio
            </span>
          </motion.button>
        </div>

        {/* ── Right side: command deck ── */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col gap-4 justify-center">
          {[
            {
              id: "001",
              title: "AVAILABILITY",
              val: "Open",
              type: "progress" as const,
            },
            {
              id: "002",
              title: "STUDIO STATS",
              val: "200+ Shoots",
              type: "data" as const,
            },
            {
              id: "003",
              title: "EXPERTISE",
              val: "Creative Photography",
              type: "text" as const,
            },
          ].map((item, i) => {
            // Renders the inner card body. `accent` swaps the colour palette so
            // the overlay variant pops on hover (amber bg + dark text), while
            // the base stays in the original dark glassy look.
            const renderBody = (accent: boolean) => (
              <div className="p-6 sm:p-7 h-full">
                <span
                  className={`font-mono text-[9px] uppercase tracking-widest block mb-3 ${
                    accent ? "text-black/60" : "text-white/40"
                  }`}
                >
                  {item.id} // {item.title}
                </span>
                {item.type === "progress" ? (
                  <div className="flex justify-between items-end mt-2">
                    <h4
                      className={`text-2xl sm:text-3xl font-bold tracking-tighter ${
                        accent ? "text-black" : "text-white"
                      }`}
                    >
                      {item.val}
                    </h4>
                    <div
                      className={`h-0.5 w-20 rounded-full overflow-hidden ${
                        accent ? "bg-black/10" : "bg-white/5"
                      }`}
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "60%" }}
                        transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                        className={`h-full ${accent ? "bg-black" : "bg-green-400"}`}
                      />
                    </div>
                  </div>
                ) : item.type === "data" ? (
                  <div className="mt-4 flex flex-col gap-3">
                    <div
                      className={`flex justify-between text-[10px] font-mono ${
                        accent ? "text-black/80" : "text-white/60"
                      }`}
                    >
                      <span>Weddings Captured</span>
                      <span>120+</span>
                    </div>
                    <div
                      className={`h-px w-full ${
                        accent ? "bg-black/15" : "bg-white/10"
                      }`}
                    />
                    <div
                      className={`flex justify-between text-[10px] font-mono ${
                        accent ? "text-black/80" : "text-white/60"
                      }`}
                    >
                      <span>Years Active</span>
                      <span>Since 2018</span>
                    </div>
                  </div>
                ) : (
                  <h3
                    className={`text-sm font-medium mt-3 leading-snug ${
                      accent ? "text-black/80" : "text-white/80"
                    }`}
                  >
                    Transforming fleeting moments into{" "}
                    <span
                      className={`italic ${accent ? "text-black" : "text-white"}`}
                    >
                      timeless apertures
                    </span>
                    .
                  </h3>
                )}
              </div>
            );

            return (
              <motion.div
                key={item.id}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.6 + i * 0.12,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <RevealCardContainer
                  accent="#4ade80"
                  origin={{ x: 20, y: 20, r: 8 }}
                  expandTo="180%"
                  className="cursor-pointer"
                  base={
                    <GlowCard glowColor="amber" customSize className="w-full">
                      {renderBody(false)}
                    </GlowCard>
                  }
                  overlay={
                    <div className="h-full w-full rounded-2xl bg-green-400">
                      {renderBody(true)}
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
