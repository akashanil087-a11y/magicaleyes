
import { motion} from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import akkuImg from "@/assets/pj/akku.jpg";
import magicalEyesLogo from "@/assets/magical-eyes.jpg";

/* ─── CountUp helper ─────────────────────────────────────────── */

/* ─── Data ───────────────────────────────────────────────────── */
const skills = ["FRONT-END ENGINEER","SOFTWARE TESTER", "UI/UX DESIGNER", "PHOTOGRAPHER"];

const journey = [
  {
    role: "FRONT-END ENGINEER & UI/UX DEVELOPER",
    place: "NOMS Technologies — Pune, India",
    period: "Mar 2022 – Present (Lead Front-End Engineer)",
    accent: true,
  },
  {
    role: "SOFTWARE TESTER",
    place: "NOMS Technologies — Pune, India",
    period: "Mar 2022 – Present (QA Engineer & Software Tester)",
  },
  {
    role: "Magical Eyes Photography",
  },
  
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function About() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white pt-24 md:pt-28 pb-16 overflow-hidden">
      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* ════════════════════════ HEADER STRIP ════════════════════════ */}
        <div className="relative grid grid-cols-12 gap-6 mb-10">
          {/* Massive faint wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-7"
          >
            <h1 className="text-[14vw] md:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter text-white/[0.07] select-none">
              AKASH
              <br />
              ANIL
            </h1>
            <p className="mt-3 text-[11px] md:text-xs tracking-[0.35em] uppercase text-white/55 font-medium">
              FRONT-END ENGINEER · UI/UX DESIGNER · PHOTOGRAPHER
            </p>
          </motion.div>

          {/* Education — top right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:pt-8"
          >
            <h3 className="text-base md:text-lg font-bold tracking-wide mb-3">
              EDUCATION
            </h3>
            <p className="text-[13px] md:text-sm text-white/75 leading-relaxed">
              BCA — Bachelor of
              <br />
              Computer Application
            </p>
          </motion.div>

          {/* Vertical "EX. PHOTOGRAPHER" badge */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute top-4 right-2 text-[10px] tracking-[0.4em] uppercase text-white/30"
            style={{ writingMode: "vertical-rl" }}
          >
            EST. PHOTOGRAPHER
          </span>
        </div>

        {/* ════════════════════════ MAIN GRID ════════════════════════ */}
        <div className="relative grid grid-cols-12 gap-6">
          {/* ─── LEFT COLUMN ─── */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            {/* Creative DNA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl bg-zinc-900/85 backdrop-blur-sm border border-white/5 p-7"
            >
              <h3 className="text-lg font-bold tracking-wide mb-5">
                ABOUT ME
              </h3>
              
              <p className="text-[13px] text-white/70 leading-[1.65]">
                I'm a photographer who found home behind the lens — building
                stories that blur the line between cinema, ceremony, and quiet
                moments. I chase light, frame emotion, and now blend AI-driven
                workflows to push every frame further.
              </p>
            </motion.div>

            {/* Portfolio card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="rounded-2xl bg-zinc-900/85 backdrop-blur-sm border border-white/5 p-6 flex items-center gap-5"
            >
              <Link
                to="/portfolio"
                className="w-14 h-14 rounded-lg bg-black flex items-center justify-center shrink-0 overflow-hidden hover:bg-zinc-800 transition-colors"
                aria-label="View portfolio"
              >
                <img
                  src={magicalEyesLogo}
                  alt="Magical Eyes"
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1">
                <p className="text-base font-bold tracking-wide">PORTFOLIO</p>
                <Link
                  to="/portfolio"
                  className="text-[13px] text-white/65 hover:text-white transition-colors"
                >
                  
                </Link>
              </div>
              <svg
                viewBox="0 0 40 40"
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400 shrink-0"
                aria-hidden="true"
              >
                <path d="M30 20 L10 20" />
                <path d="M18 12 L10 20 L18 28" />
              </svg>
            </motion.div>

          </div>

          {/* ─── CENTRE COLUMN — portrait ─── */}
          <div className="hidden md:flex col-span-4 relative items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              {/* Circular text orbiting the portrait */}
              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 w-full h-auto -rotate-12 text-white/45"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="about-orbit"
                    d="M 160,160 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                  />
                </defs>
                <text fontSize="11" letterSpacing="6" fill="currentColor" fontWeight="500">
                  <textPath href="#about-orbit" startOffset="0">
                    PHOTOGRAPHER · DIRECTOR · STORYTELLER · PHOTOGRAPHER · DIRECTOR · STORYTELLER ·
                  </textPath>
                </text>
              </svg>

              <img
                src={akkuImg}
                alt="Akash Anil"
                className="relative w-full aspect-[3/4] object-cover rounded-2xl grayscale hover:grayscale-0 contrast-110 transition-[filter] duration-1800 ease-in-out"
              />

              {/* Hand-drawn green arrow */}
              <svg
                viewBox="0 0 160 80"
                className="absolute -top-4 right-4 w-28 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M10 20 Q 60 5 90 35 T 150 65"
                  className="opacity-90"
                />
                <path d="M150 65 L 130 50 M 150 65 L 138 80" />
              </svg>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="md:text-right"
            >
              <h3 className="text-base md:text-lg font-bold tracking-wide mb-4 text-green-400">
                SKILLS
              </h3>
              <ul className="text-[13px] md:text-sm text-white/75 leading-[1.85] space-y-0.5">
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </motion.div>

            {/* Creative Journey */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl bg-zinc-900/85 backdrop-blur-sm border border-white/5 p-7"
            >
              <h3 className="text-lg font-bold tracking-wide mb-6">
                CREATIVE JOURNEY
              </h3>
              <div className="space-y-5">
                {journey.map((j) => (
                  <div key={j.role}>
                    <p
                      className={`text-[13px] font-bold tracking-wide ${
                        j.accent ? "text-green-400" : "text-white"
                      }`}
                    >
                      {j.role.toUpperCase()}
                    </p>
                    <p className="text-[13px] text-white/85 mt-0.5">
                      {j.place}
                    </p>
                    <p className="text-[11px] text-white/55 mt-0.5">
                      {j.period}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════ CONTACT FOOTER ════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px]"
        >
          <a
            href="mailto:akashanil1131@gmail.com"
            className="group flex items-center gap-3 text-white/85 hover:text-white transition-colors"
          >
            <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-green-400 group-hover:text-black">
              <Mail size={14} />
            </span>
            akashanil1131@gmail.com
          </a>
          <a
            href="tel:+918943572124"
            className="group flex items-center gap-3 text-white/85 hover:text-white transition-colors"
          >
            <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-green-400 group-hover:text-black">
              <Phone size={14} />
            </span>
            +91 8943572124
          </a>
          <span className="group flex items-center gap-3 text-white/85">
            <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-green-400 group-hover:text-black">
              <MapPin size={14} />
            </span>
            Kerala, India
          </span>
        </motion.div>
      </div>
    </div>
  );
}
