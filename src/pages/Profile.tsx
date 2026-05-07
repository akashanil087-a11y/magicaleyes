import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  SiClaude,
  SiOpenai,
  SiYarn,
  SiNpm,
  SiMongodb,
  SiGithub,
} from "react-icons/si";
import akashhhh from "@/assets/pj/akashhhh.jpeg";
import akku from "@/assets/pj/akku.jpg";

/* ─── Data (sourced from About.tsx) ─────────────────────────── */
const skills = [
  "Front-End Engineering",
  "React & TypeScript",
  "UI/UX Design",
  "Tailwind CSS",
  "Software Testing",
  "Photographer",
];

const journey = [
  {
    role: "Front-End Engineer & UI/UX Developer",
    place: "NOMS Technologies — Pune, India",
    period: "Mar 2022 – Present (Lead Front-End Engineer)",
    current: true,
  },
  {
    role: "Software Tester",
    place: "NOMS Technologies — Pune, India",
    period: "Mar 2022 – Present (QA Engineer & Software Tester)",
  },
  {
    role: "Magical Eyes Photography",
    place: "Founder · Cinematic Photographer",
  },
];

/* ─── Tool icons (brand-accurate, react-icons/si where available) ── */
function FigmaIcon() {
  // Figma is multi-color in real life — render the 5-segment glyph
  // manually so we keep all 5 brand colors instead of a single-color glyph.
  return (
    <svg viewBox="0 0 38 57" className="w-5 h-7" aria-hidden="true">
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
      <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
    </svg>
  );
}
function LightroomIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#001E36" />
      <text
        x="16"
        y="22"
        fontFamily="Arial Black, sans-serif"
        fontSize="13"
        fontWeight={900}
        fill="#31A8FF"
        textAnchor="middle"
      >
        Lr
      </text>
    </svg>
  );
}
function SnapseedIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id="snapseed-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBC05" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#snapseed-grad)" />
      <path
        d="M16 7 C 11 12 11 18 16 25 C 21 18 21 12 16 7 Z"
        fill="#fff"
      />
    </svg>
  );
}
function GeminiIcon() {
  // Gemini's 4-point pinched-arc star with Google's blue→violet→coral
  // gradient. Inline so the gradient defs stay scoped to this icon.
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id="gemini-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1C7ED6" />
          <stop offset="0.5" stopColor="#9B5CF6" />
          <stop offset="1" stopColor="#FF7E5F" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gemini-grad)"
        d="M12 1 C 12 8 16 12 23 12 C 16 12 12 16 12 23 C 12 16 8 12 1 12 C 8 12 12 8 12 1 Z"
      />
    </svg>
  );
}
function ClaudeIcon() {
  return (
    <span className="w-7 h-7 flex items-center justify-center">
      <SiClaude size={26} color="#D97757" />
    </span>
  );
}
function ChatGPTIcon() {
  return (
    <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
      <SiOpenai size={18} color="#fff" />
    </span>
  );
}

function VSCodeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#0078D4" />
      <path
        d="M22 6 L11 16 L22 26 L26 24 L26 8 Z"
        fill="#fff"
      />
      <path d="M11 16 L7 13 L7 19 Z" fill="#fff" />
    </svg>
  );
}
function YarnIcon() {
  return (
    <span className="w-7 h-7 rounded-full bg-[#2C8EBB] flex items-center justify-center">
      <SiYarn size={18} color="#fff" />
    </span>
  );
}
function NPMIcon() {
  return (
    <span className="w-7 h-7 rounded-md bg-[#CB3837] flex items-center justify-center">
      <SiNpm size={18} color="#fff" />
    </span>
  );
}
function MongoDBIcon() {
  return (
    <span className="w-7 h-7 rounded-md bg-[#001E2B] flex items-center justify-center">
      <SiMongodb size={20} color="#47A248" />
    </span>
  );
}
function GitHubIcon() {
  return (
    <span className="w-7 h-7 rounded-full bg-[#181717] flex items-center justify-center">
      <SiGithub size={18} color="#fff" />
    </span>
  );
}
function AWSIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#232F3E" />
      <text
        x="16"
        y="16"
        fontFamily="Arial Black, sans-serif"
        fontSize="9"
        fontWeight={900}
        fill="#fff"
        textAnchor="middle"
      >
        aws
      </text>
      <path
        d="M8 21 Q 16 26 24 21"
        stroke="#FF9900"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M22 19 L25 21 L22 23" stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tools = [
  { name: "Figma", icon: <FigmaIcon /> },
  { name: "Lightroom", icon: <LightroomIcon /> },
  { name: "Snapseed", icon: <SnapseedIcon /> },
  { name: "Gemini", icon: <GeminiIcon /> },
  { name: "Claude", icon: <ClaudeIcon /> },
  { name: "ChatGPT", icon: <ChatGPTIcon /> },
  { name: "VS Code", icon: <VSCodeIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
  { name: "MongoDB", icon: <MongoDBIcon /> },
  { name: "AWS", icon: <AWSIcon /> },
  { name: "Yarn", icon: <YarnIcon /> },
  { name: "NPM", icon: <NPMIcon /> },
];

/* ─── Reusable: green “selection-box” corner markers ────────── */
function SelectionBox({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className="absolute inset-x-3 top-3 h-px bg-green-400/70" />
      <span className="absolute inset-x-3 bottom-3 h-px bg-green-400/70" />
      <span className="absolute inset-y-3 left-3 w-px bg-green-400/70" />
      <span className="absolute inset-y-3 right-3 w-px bg-green-400/70" />
      {[
        "top-2 left-2",
        "top-2 right-2",
        "bottom-2 left-2",
        "bottom-2 right-2",
        "top-2 left-1/2 -translate-x-1/2",
        "bottom-2 left-1/2 -translate-x-1/2",
        "top-1/2 left-2 -translate-y-1/2",
        "top-1/2 right-2 -translate-y-1/2",
      ].map((c, i) => (
        <span key={i} className={`absolute w-2 h-2 bg-green-400 ${c}`} />
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Profile() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Back button */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-10 pt-24 md:pt-28">
        <motion.button
          type="button"
          onClick={goBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -3 }}
          className="group inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-white/65 hover:text-green-400 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </motion.button>
      </div>

      {/* ════════════════════ SECTION 1 — JOURNEY + SKILLS ═══════ */}
      <section className="relative pt-12 pb-4 md:pt-20 md:pb-6 px-4 md:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 md:top-2 text-center select-none pointer-events-none"
        >
          <h2
            className="font-black uppercase tracking-tighter text-white/6 leading-[0.85]"
            style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
          >
            AKASH
          </h2>
          <p className="mt-2 md:mt-3 text-[10px] md:text-sm tracking-[0.5em] uppercase text-white/45">
            FRONT-END ENGINEER
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left — Creative Journey (slides in from left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 rounded-3xl bg-zinc-900/85 backdrop-blur-sm border border-white/10 p-6 md:p-7"
          >
            <h3 className="text-base md:text-lg font-bold text-green-400 mb-5 tracking-wide">
              CREATIVE JOURNEY
            </h3>
            <ul className="relative space-y-5">
              <span
                aria-hidden="true"
                className="absolute left-1.25 top-2 bottom-2 w-px bg-white/10"
              />
              {journey.map((j) => (
                <li key={j.role} className="relative pl-6">
                  <span
                    className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${
                      j.current
                        ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                        : "bg-green-400/70"
                    }`}
                  />
                  <p className="text-[13px] md:text-sm font-semibold text-white">
                    {j.role}
                  </p>
                  <p className="text-[12px] text-white/65 mt-0.5">{j.place}</p>
                  {j.period && (
                    <p className="text-[11px] text-white/50 mt-0.5">{j.period}</p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center portrait (fades up + scales in) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 relative aspect-3/4 md:mt-12"
          >
            <img
              src={akashhhh}
              alt="Akash Anil portrait"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-linear-to-b from-transparent via-transparent to-black/60"
            />
            <SelectionBox className="rounded-2xl" />
          </motion.div>

          {/* Right — Skills + Education (slides in from right) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 md:pt-6"
          >
            <h3 className="text-base md:text-lg font-bold text-green-400 mb-5 tracking-wide">
              SKILL LEVEL
            </h3>
            <ul className="space-y-2.5">
              {skills.map((s) => (
                <li key={s} className="text-[13px] md:text-sm text-white/85 leading-relaxed">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-zinc-900/85 backdrop-blur-sm border border-white/10 p-6">
              <h3 className="text-sm font-bold text-green-400 mb-4 tracking-wide">
                EDUCATION
              </h3>
              <p className="text-[14px] md:text-[15px] font-semibold text-white leading-snug">
                BCA — Bachelor of
                <br />
                Computer Application
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════ TOOLS MARQUEE — full-bleed scrolling strip ═════════════ */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden border-y border-white/10 bg-black py-3 md:py-4 select-none mt-2 mb-0"
      >
        <style>{`
          @keyframes tools-marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .tools-marquee-track {
            display: flex;
            width: max-content;
            align-items: center;
            gap: 2.5rem;
            animation: tools-marquee-scroll 38s linear infinite;
          }
          @media (min-width: 768px) {
            .tools-marquee-track { gap: 3.5rem; }
          }
        `}</style>

        <div className="tools-marquee-track">
          {[...Array(2)].flatMap((_, dup) =>
            [
              "FIGMA",
              "LIGHTROOM",
              "SNAPSEED",
              "GEMINI",
              "CLAUDE",
              "CHATGPT",
              "VS CODE",
              "GITHUB",
              "MONGODB",
              "AWS",
              "YARN",
              "NPM",
            ].map((name, i) => (
              <div
                key={`${dup}-${i}`}
                className="flex items-center gap-10 md:gap-14 shrink-0"
              >
                <span
                  className="text-2xl md:text-4xl font-black text-green-400 leading-none shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  aria-hidden="true"
                >
                  *
                </span>
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tight whitespace-nowrap text-white">
                  {name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ════════════════════ SECTION 2 — ABOUT + TOOLS ════════ */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 md:px-10">
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* About me */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-zinc-900/85 backdrop-blur-sm border border-white/10 p-6 md:p-8"
            >
              <h3 className="text-base md:text-lg font-bold text-green-400 mb-4 tracking-wide">
                ABOUT ME
              </h3>
              <p className="text-[13px] md:text-sm text-white/75 leading-[1.85]">
                I'm a photographer who found home behind the lens — building stories
                that blur the line between cinema, ceremony, and quiet moments. I chase
                light, frame emotion, and now blend AI-driven workflows to push every
                frame further.
              </p>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="rounded-3xl bg-zinc-900/85 backdrop-blur-sm border border-white/10 p-6 md:p-8"
            >
              <h3 className="text-base md:text-lg font-bold text-green-400 mb-5 tracking-wide">
                TOOLS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 hover:border-green-400/40 hover:bg-black/40 transition-colors"
                  >
                    <span className="shrink-0 flex items-center justify-center">
                      {t.icon}
                    </span>
                    <span className="text-[12px] md:text-[13px] tracking-wide text-white/85">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — second portrait */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-4/5">
              <img
                src={akku}
                alt="Akash Anil portrait"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl md:grayscale md:hover:grayscale-0 transition-[filter] duration-1000 ease-in-out"
              />
              <SelectionBox className="rounded-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="relative max-w-6xl mx-auto mt-16 md:mt-24 pt-6 flex items-center gap-4 text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-white/55">
          <span>Akash Anil · Portfolio</span>
          <span className="flex-1 h-px bg-white/15" />
          <span>{year}</span>
        </div>

        <div className="relative max-w-6xl mx-auto mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] tracking-[0.18em] text-white/55">
          <Link to="/contact" className="inline-flex items-center gap-3 self-start group">
            <span className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
              Mē
            </span>
            <span>
              CONTACT
              <span className="block text-[9px] text-white/35">CLICK NOW</span>
            </span>
          </Link>
          <p>akashanil1131@gmail.com</p>
        </div>
      </section>
    </div>
  );
}
