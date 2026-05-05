import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { LocationMap } from "@/components/ui/expand-map";
import heroImage from "@/assets/magical eyes.jpg";

const NAVY = "#1a2238";
const GOLD = "#c4956a";
const GOLD_HOVER = "#b38559";
const HAIRLINE = "#e5dfd4";

const infoCards = [
  {
    label: "Phone Numbers",
    lines: ["8943572124"],
  },
  {
    label: "Email Address",
    lines: ["hello@magicaleyes.com", "studio@magicaleyes.com"],
  },
];

/* ============================================================
   HERO
   ============================================================ */
function HeroSection() {
  return (
    <section className="relative pt-32 md:pt-40 pb-6 md:pb-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[11px] md:text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            — Get In Touch
          </p>

          <h1
            className="font-display text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-8"
            style={{ color: NAVY }}
          >
            Contact <span className="italic">Us</span>
          </h1>

          <p className="text-[15px] md:text-base text-gray-500 leading-[1.85] max-w-md mb-10">
            Whether you're planning a wedding, capturing a milestone, or
            commissioning a portrait — we'd love to hear your story. Tell us
            what you have in mind, and we'll craft something unforgettable
            together.
          </p>

          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full text-white text-[12px] tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            Contact Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* RIGHT — hero image with curved bottom-left bite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <div
            className="relative w-full h-105 md:h-130 lg:h-150 overflow-hidden rounded-3xl"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 160px at 0% 100%, transparent 159px, black 160px)",
              maskImage:
                "radial-gradient(circle 160px at 0% 100%, transparent 159px, black 160px)",
            }}
          >
            <img
              src={heroImage}
              alt="Magical Eyes studio"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* warm tint overlay to keep it on-brand */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#1a2238]/10 via-transparent to-[#c4956a]/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   INFO GRID
   ============================================================ */
function InfoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {infoCards.map((card, i) => {
        const isRightCol = i % 2 === 1;
        const isBottomRow = i >= 2;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="px-6 md:px-8 py-10 md:py-12 relative"
            style={{
              borderRight: !isRightCol ? `1px solid ${HAIRLINE}` : undefined,
              borderBottom: !isBottomRow ? `1px solid ${HAIRLINE}` : undefined,
            }}
          >
            <p
              className="font-display text-xl md:text-2xl mb-4 italic"
              style={{ color: NAVY }}
            >
              {card.label}
            </p>
            <div className="space-y-1.5">
              {card.lines.map((line) => (
                <p key={line} className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ============================================================
   FORM CARD
   ============================================================ */
function ContactForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
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
    setData({ firstName: "", lastName: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-8 md:p-12 border border-[#ece6d9] shadow-[0_30px_80px_-40px_rgba(26,34,56,0.25)]"
    >
      <div className="text-center mb-10">
        <h2
          className="font-display text-3xl md:text-4xl mb-3"
          style={{ color: NAVY }}
        >
          Contact <span className="italic">&amp;</span> Message
        </h2>
        <p className="text-[13px] text-gray-400 tracking-wide">
          We'll get back to you within 24 hours
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* First / Last name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PillInput
            placeholder="First Name"
            value={data.firstName}
            onChange={handle("firstName")}
            required
          />
          <PillInput
            placeholder="Last Name"
            value={data.lastName}
            onChange={handle("lastName")}
            required
          />
        </div>

        {/* Email */}
        <PillInput
          type="email"
          placeholder="Your Email"
          value={data.email}
          onChange={handle("email")}
          required
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
          }
        />

        {/* Message */}
        <div className="relative">
          <span className="absolute left-5 top-5 text-gray-400 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <textarea
            placeholder="Your Message"
            rows={5}
            required
            value={data.message}
            onChange={handle("message")}
            className="w-full bg-white border border-[#ece6d9] rounded-3xl pl-12 pr-5 py-4 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/15 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-3 w-full py-4 rounded-full text-white text-[12px] tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ backgroundColor: NAVY }}
        >
          {sent ? "Message Sent ✓" : "Send Message"}
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-4 tracking-wide">
          Your details stay private · We never share your information
        </p>
      </form>
    </motion.div>
  );
}

/* Pill input helper */
function PillInput({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full bg-white border border-[#ece6d9] rounded-full ${
          icon ? "pl-12" : "pl-6"
        } pr-5 py-4 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/15 transition-all`}
      />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Contact() {
  return (
    <div className="bg-[#f5f3f0] min-h-screen">
      <HeroSection />

      {/* Section 2 — info + form */}
      <section
        id="contact-form"
        className="px-6 md:px-12 lg:px-16 pb-24 md:pb-32 scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-start">
          {/* LEFT — map + info grid */}
          <div className="lg:pt-6 flex flex-col gap-8">
            <LocationMap />
            <InfoGrid />
          </div>

          {/* RIGHT — form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
