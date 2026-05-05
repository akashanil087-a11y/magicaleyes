import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactLenis from "lenis/react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import MusicPlayer from "@/components/ui/music-player";
import CreativeHero from "@/components/ui/creative-hero";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { ImageSwiper } from "@/components/ui/image-swiper";
import { TextScramble } from "@/components/ui/text-scramble";
import { Typewriter } from "@/components/ui/typewriter";
import bgMusic from "@/components/gallery/kontraa-no-sleep-hiphop-music-473847.mp3";
import ownerPhoto from "@/assets/owner/akaa.png";
import heroBg from "@/assets/pj/pj1.jpg";
import pj2 from "@/assets/pj/pj2.jpg";
import pj3 from "@/assets/pj/pj3.jpg";
import pj4 from "@/assets/pj/pj4.jpg";
import pj5 from "@/assets/pj/pj5.jpg";
import pj6 from "@/assets/pj/pj6.jpg";
import pj7 from "@/assets/pj/pj7.jpg";
import pj8 from "@/assets/pj/pj8.jpg";
import pj17 from "@/assets/pj/pj17.jpg";
import pj18 from "@/assets/pj/pj18.jpg";
import pj19 from "@/assets/pj/pj19.jpg";
import pj20 from "@/assets/pj/pj20.jpeg";
import pj21 from "@/assets/pj/pj21.jpeg";

const galleryImages = [pj2, pj3, pj4, pj5, pj6, pj7];
const sliderImages = [pj8, pj17, pj18, pj19, pj20, pj21];

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const t = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const };
const vp = { once: true, margin: "-80px" };

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Responsive sizing for mobile ImageSwiper card.
  // ImageSwiper's outer <section> width = cardWidth + 32 (internal buffer for
  // shadow / 3D stack), so we subtract 32 here plus a 24px outer gutter to
  // guarantee the swiper never busts the viewport on any phone.
  const [swiperSize, setSwiperSize] = useState({ w: 320, h: 448 });
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const w = Math.min(Math.max(vw - 56, 260), 460);
      const h = Math.round(w * 1.4);
      setSwiperSize({ w, h });
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    <ReactLenis root>
      <article className="relative">
        {/* ══════ 1. HERO — 3D Creative Hero ══════ */}
        <div className="relative">
          {/* Auth button — top-right on desktop, hidden on mobile (use navbar menu instead) */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 hidden md:block">
            <button
              onClick={handleAuthClick}
              className="border border-white/40 hover:border-white hover:bg-white hover:text-gray-900 text-white text-[12px] tracking-[0.2em] uppercase px-6 py-2.5 transition-all duration-500 cursor-pointer"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
          <CreativeHero />
        </div>

        {/* ══════ 2. INTRO ══════ */}
        <section className="relative bg-[#f0ece6] py-12 md:py-16 px-8 md:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20"
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
            >
              <motion.div variants={fadeLeft} transition={t}>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#8b7d6b] mb-3 italic">Let's Create Together</p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-snug italic">
                  <TextScramble
                    text={"Capturing The Moments,\nCreating Your Memories"}
                    trigger="view"
                    speed={55}
                  />
                </h2>
              </motion.div>
              <motion.div className="flex items-end" variants={fadeRight} transition={t}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Every frame is a story waiting to be told. We blend artistry with authenticity
                  to create photographs that transcend time — preserving the raw beauty of your
                  most cherished moments with cinematic elegance.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ══════ 3. INFINITE IMAGE SLIDER ══════ */}
        <section className="relative">
          <ImageAutoSlider images={sliderImages} />
        </section>

        {/* ══════ 4. ABOUT ══════ */}
        <section className="relative bg-[#f5f3f0] pt-12 pb-8 md:py-32 px-8 md:px-16">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div className="relative overflow-hidden rounded-2xl aspect-4/5" initial="hidden" whileInView="visible" viewport={vp} variants={scaleIn} transition={t}>
              <img src={ownerPhoto} alt="About" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-1000 ease-in-out" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
              <motion.p variants={fadeUp} transition={t} className="text-[11px] tracking-[0.3em] uppercase text-[#8b7d6b] mb-3 italic">About Me</motion.p>
              <motion.h2 variants={fadeUp} transition={t} className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-snug italic">
                <TextScramble text="Capturing stories that matter" trigger="view" speed={55} />
              </motion.h2>
              <motion.p variants={fadeUp} transition={t} className="text-gray-500 leading-relaxed mb-4 min-h-[5.5em]">
                <Typewriter
                  words={[
                    "I'm a passionate photographer dedicated to capturing life's most beautiful moments. From weddings to nature landscapes, I strive to tell stories through my lens with authenticity and emotion.",
                  ]}
                  speed={22}
                  loop={false}
                  startOnView
                  cursor
                  cursorChar="▍"
                />
              </motion.p>
              <motion.p variants={fadeUp} transition={t} className="text-gray-500 leading-relaxed mb-8 min-h-[3.5em]">
                <Typewriter
                  words={[
                    "With years of experience in cinematic photography, I bring a unique perspective to every project — blending artistry with modern techniques.",
                  ]}
                  speed={22}
                  loop={false}
                  startOnView
                  cursor
                  cursorChar="▍"
                />
              </motion.p>
              <motion.div variants={fadeUp} transition={t}>
                <Link to="/about" className="inline-flex items-center gap-2 text-[13px] tracking-[0.15em] uppercase text-gray-800 border border-gray-300 px-6 py-2.5 hover:border-gray-500 transition-colors">
                  More about me
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════ 5. GALLERY ══════ */}
        <section className="relative bg-[#f0ece6] pt-6 pb-12 md:py-20 px-3 md:px-6">
          {/* Desktop: horizontal accordion */}
          <motion.div
            className="hidden md:flex items-center gap-2 h-[80vh] w-full mx-auto"
            initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={t}
          >
            {galleryImages.map((src, i) => (
              <div key={i} className="relative group grow transition-all w-56 rounded-xl overflow-hidden h-full duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center" src={src} alt="" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>

          {/* Mobile: stack-card swiper */}
          <div className="md:hidden w-full max-w-full overflow-hidden flex flex-col items-center justify-center pt-4">
            <ImageSwiper
              images={galleryImages.join(",")}
              cardWidth={swiperSize.w}
              cardHeight={swiperSize.h}
            />
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-[#8b7d6b]/70">
              Swipe to explore
            </p>
          </div>
        </section>

        {/* ══════ 6. CTA ══════ */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
              <motion.div variants={fadeUp} transition={t} className="flex justify-center mb-8">
                <MagneticText text="HOVER ME" hoverText="LET'S TALK" className="text-white" />
              </motion.div>
              <motion.h2 variants={fadeUp} transition={t} className="text-4xl md:text-6xl lg:text-7xl font-light text-white italic leading-[1.15] mb-6">
                Let's work <span className="text-[#c4956a]">together</span>
              </motion.h2>
              <motion.p variants={fadeUp} transition={t} className="text-white/50 text-sm max-w-md mx-auto mb-10">
                Get in touch and let's create something beautiful.
              </motion.p>
              <motion.div variants={fadeUp} transition={t} className="flex justify-center">
                <Link to="/contact">
                  <MagneticButton>Get in touch</MagneticButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </article>
    </ReactLenis>
    {/* Music player (bottom-right) — outside Lenis for true fixed positioning */}
    <MusicPlayer src={bgMusic} />
  </>
  );
}
