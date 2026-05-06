import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { LocationMap } from "@/components/ui/expand-map";

const ACCENT = "#4ade80"; // green-400 — matches the site's dark/green theme

/* ============================================================
   HERO
   ============================================================ */
function HeroSection() {
  return (
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-5"
          style={{ color: ACCENT }}
        >
          — Get In Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight"
        >
          Let's start
          <br />
          <span className="italic font-extralight">a conversation.</span>
        </motion.h1>
      </div>
    </section>
  );
}

/* ============================================================
   FORM (left column)
   ============================================================ */
function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    brief: "",
  });
  const [sent, setSent] = useState(false);

  const handle =
    (key: keyof typeof data) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Contact submission:", data);
    setSent(true);
    setData({ name: "", email: "", company: "", brief: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      onSubmit={onSubmit}
      className="flex flex-col gap-10"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <UnderlineInput
          label="Name"
          placeholder="Your name"
          value={data.name}
          onChange={handle("name")}
          required
        />
        <UnderlineInput
          label="Email"
          type="email"
          placeholder="you@name.com"
          value={data.email}
          onChange={handle("email")}
          required
          dot
        />
      </div>

      {/* Company */}
      <UnderlineInput
        label="Subject"
        placeholder="What is this regarding?"
        value={data.company}
        onChange={handle("company")}
      />

      {/* Brief */}
      <div>
        <label className="block text-[11px] tracking-[0.3em] uppercase text-white/85 font-medium mb-3">
          Brief
        </label>
        <textarea
          placeholder="Tell us about your project…"
          rows={5}
          required
          value={data.brief}
          onChange={handle("brief")}
          className="w-full bg-transparent border-b border-white/20 pb-3 text-[15px] text-white placeholder:text-white/45 focus:outline-none focus:border-green-400 transition-colors resize-y"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white text-[12px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
          style={{ backgroundColor: ACCENT }}
        >
          {sent ? "Message sent ✓" : "Send message →"}
        </button>
      </div>
    </motion.form>
  );
}

/* ============================================================
   INFO CARD (right column) — dark gradient panel
   ============================================================ */
function InfoCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl p-10 md:p-12 lg:p-14 text-white bg-linear-to-br from-[#0d0a08] via-[#1a1410] to-[#0d0a08]"
    >
      {/* Soft amber halo, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40"
        style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
      />

      <p
        className="relative font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-12"
        style={{ color: ACCENT }}
      >
        // 01 — Direct line
      </p>

      <div className="relative space-y-12">
        {/* EMAIL */}
        <div>
          <h3 className="text-xl font-bold tracking-wide mb-4">EMAIL</h3>
          <a
            href="mailto:akashanil1131@gmail.com"
            className="block text-[15px] md:text-base font-medium underline decoration-1 underline-offset-[6px] hover:opacity-80 transition-opacity"
            style={{ textDecorationColor: ACCENT }}
          >
            akashanil1131@gmail.com
          </a>
        </div>

        {/* WHERE */}
        <div>
          <h3 className="text-xl font-bold tracking-wide mb-3">WHERE</h3>
          <p className="text-[15px] md:text-base text-white/85">
            Kerala · India · Worldwide
          </p>
        </div>

        {/* AVAILABILITY */}
        <div>
          <h3 className="text-xl font-bold tracking-wide mb-3">STATUS</h3>
          <p className="text-[15px] md:text-base text-white/85">
            AVAILABLE
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

/* Single-line bottom-border input */
interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Show the small accent dot beside the label (matches the reference). */
  dot?: boolean;
}
function UnderlineInput({ label, dot, ...props }: UnderlineInputProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/85 font-medium mb-3">
        <span>{label}</span>
        {dot && (
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 rounded-full bg-blue-600"
          />
        )}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-white/20 pb-3 text-[15px] text-white placeholder:text-white/45 focus:outline-none focus:border-green-400 transition-colors"
      />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Contact() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <HeroSection />

      <section
        id="contact-form"
        className="px-6 md:px-12 lg:px-16 pb-16 md:pb-24 scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          <ContactForm />
          <InfoCard />
        </div>
      </section>

      {/* Map */}
      <section className="px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <p
            className="text-[11px] tracking-[0.4em] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            — Find us
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white italic mb-10">
            Where we're based
          </h2>
          <LocationMap />
        </motion.div>
      </section>
    </div>
  );
}
