import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageModal from "@/components/gallery/ImageModal";

import pj1 from "@/assets/pj/pj1.jpg";
import pj2 from "@/assets/pj/pj2.jpg";
import pj3 from "@/assets/pj/pj3.jpg";
import pj4 from "@/assets/pj/pj4.jpg";
import pj5 from "@/assets/pj/pj5.jpg";
import pj6 from "@/assets/pj/pj6.jpg";
import pj7 from "@/assets/pj/pj7.jpg";
import pj8 from "@/assets/pj/pj8.jpg";
import pj9 from "@/assets/pj/pj9.jpg";
import pj10 from "@/assets/pj/pj10.jpg";
import pj11 from "@/assets/pj/pj11.jpg";
import pj12 from "@/assets/pj/pj12.jpg";
import pj13 from "@/assets/pj/pj13.jpg";
import pj14 from "@/assets/pj/pj14.jpg";
import pj15 from "@/assets/pj/pj15.jpg";
import pj16 from "@/assets/pj/pj16.jpg";
import pj17 from "@/assets/pj/pj17.jpg";
import pj18 from "@/assets/pj/pj18.jpg";
import pj20 from "@/assets/pj/pj20.jpeg";
import pj21 from "@/assets/pj/pj21.jpeg";
import pj22 from "@/assets/pj/pj22.jpg";
import pj23 from "@/assets/pj/pj23.jpg";
import pj24 from "@/assets/pj/pj24.jpg";
import pj28 from "@/assets/pj/pj28.jpg";
import pj29 from "@/assets/pj/pj29.jpg";
import pj31 from "@/assets/pj/pj31.jpg";
import akashhhh from "@/assets/pj/akashhhh.jpeg";

const galleryImages: string[] = [
  pj1, pj3, pj4, pj31, pj5,
  pj7, pj8, pj22, pj28, pj9, pj10, pj11, pj12,
  pj13, pj14, pj15, pj16, pj17, pj18,
  pj20, pj23, pj21,
  pj24, pj29 ,pj2,pj6 ,
];

// Layout math for the horizontal-on-vertical scroll. The row contains
// 1 intro card + N image cards. Each card is CARD_W vw wide with GAP vw
// between them. We translate the row left by exactly (rowWidth - 100vw)
// so the last card lines up flush with the right edge.
const CARD_W = 45; // vw
const GAP = 2; // vw
const TOTAL_ITEMS = galleryImages.length + 1; // +1 for the intro card
const ROW_WIDTH = TOTAL_ITEMS * (CARD_W + GAP) - GAP;
const TRAVEL = ROW_WIDTH - 100;
// Section height drives scroll length. Slightly larger than horizontal travel
// so each viewport scroll advances roughly one card width — feels deliberate.
const SECTION_HEIGHT = Math.round(TRAVEL * 1.1);

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  // `target` + `["start start", "end end"]` means progress = 0 the moment the
  // sticky inner pins to the viewport top, and progress = 1 the moment it
  // releases at the bottom. Without this explicit offset, framer-motion uses
  // ["start end", "end start"] and the horizontal motion is spread over a
  // much longer scroll range than the visible sticky window — making it look
  // like the row isn't moving.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${TRAVEL}vw`]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const open = (i: number) => {
    setModalIndex(i);
    setModalOpen(true);
  };

  const scrollByPage = (dir: "prev" | "next") => {
    window.scrollBy({
      top: dir === "next" ? window.innerHeight : -window.innerHeight,
      behavior: "smooth",
    });
  };

  const year = new Date().getFullYear();

  return (
    <div className="bg-black text-white">
      {/* ====== Desktop: horizontal-on-vertical scroll ====== */}
      <section
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: `${SECTION_HEIGHT}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Soft cinematic backdrop — first frame, blurred & dimmed */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={pj1}
              alt=""
              className="w-full h-full object-cover opacity-25 blur-md scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
          </div>

          <div className="relative h-full flex items-center pt-24 pb-24">
            <motion.div
              style={{ x }}
              className="flex items-center gap-[2vw] pl-[3vw] pr-[3vw] will-change-transform"
            >
              {/* Intro card */}
              <article
                className="relative shrink-0 w-[45vw] h-[72vh] border border-green-400/15 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-12 overflow-hidden"
              >
                {/* Faded portrait backdrop */}
                <img
                  src={akashhhh}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-50o mix-blend-luminosity pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/85 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center">
                  <p className="text-[10px] tracking-[0.5em] text-green-400/80 mb-5">
                    ARTWORK
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-serif tracking-[0.2em] mb-7">
                    PHOTOGRAPHY&nbsp;I
                  </h2>
                  <div className="w-8 h-px bg-green-400/60 mb-9" />
                  <div className="space-y-7">
                    <div>
                      <p className="text-[10px] tracking-[0.5em] text-white/50 mb-2">
                        PHOTOGRAPHER
                      </p>
                      <p className="text-[13px] tracking-[0.3em]">AKASH ANIL</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.5em] text-white/50 mb-2">
                        STUDIO
                      </p>
                      <p className="text-[13px] tracking-[0.3em]">MAGICAL EYES</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.5em] text-white/50 mb-2">
                        YEAR
                      </p>
                      <p className="text-[13px] tracking-[0.3em]">{year}</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Image cards */}
              {galleryImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => open(i)}
                  className="shrink-0 w-[45vw] h-[72vh] overflow-hidden cursor-pointer group block"
                  aria-label={`Open frame ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Frame ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== Mobile: simple vertical stack ====== */}
      <div className="md:hidden pt-28 pb-32 px-4">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.5em] text-amber-300/80 mb-2">
            ARTWORK
          </p>
          <h2 className="text-3xl font-serif tracking-[0.2em] mb-4">
            PHOTOGRAPHY&nbsp;I
          </h2>
          <div className="w-8 h-px bg-amber-300/60 mx-auto" />
        </div>
        <div className="space-y-3">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              className="w-full block aspect-4/5 overflow-hidden"
              aria-label={`Open frame ${i + 1}`}
            >
              <img
                src={src}
                alt={`Frame ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ====== Bottom bar — copyright + nav arrows ====== */}
      <div className="fixed bottom-5 inset-x-0 z-40 px-6 md:px-10 flex items-center justify-between pointer-events-none">
        <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 pointer-events-auto">
          {year} © MAGICAL EYES
        </p>

        <div className="hidden md:flex items-center gap-10 pointer-events-auto">
          <button
            type="button"
            onClick={() => scrollByPage("prev")}
            aria-label="Previous"
            className="text-amber-200/70 hover:text-amber-200 transition-colors text-lg cursor-pointer"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => scrollByPage("next")}
            aria-label="Next"
            className="text-amber-200/70 hover:text-amber-200 transition-colors text-lg cursor-pointer"
          >
            &gt;
          </button>
        </div>

        {/* Spacer to keep the copyright text balanced on desktop */}
        <span className="hidden md:block w-24" aria-hidden="true" />
      </div>

      <ImageModal
        open={modalOpen}
        setOpen={setModalOpen}
        images={galleryImages}
        initialIndex={modalIndex}
      />
    </div>
  );
}
