import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing this website, you agree to be bound by these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations.",
    ],
  },
  {
    title: "2. Intellectual Property Rights",
    body: [
      "All content on this website including photographs, logos, graphics, text, videos, designs, and branding are the property of Magical Eyes unless otherwise stated.",
      "You may not:",
    ],
    list: [
      "Copy, reproduce, distribute, or modify any content without written permission",
      "Use our images for commercial purposes without authorization",
      "Claim any content as your own",
    ],
    footer:
      "Unauthorized use may result in legal action under applicable copyright laws.",
  },
  {
    title: "3. Photography Usage",
    body: [
      "All photographs displayed are protected under copyright laws.",
      "Clients receiving edited photographs are granted personal usage rights only unless otherwise agreed in writing. Commercial usage, resale, or redistribution is prohibited without permission.",
    ],
  },
  {
    title: "4. User Responsibilities",
    body: ["Users agree not to:"],
    list: [
      "Use the website for unlawful activities",
      "Attempt to hack, damage, or disrupt the website",
      "Upload malicious files or harmful content",
      "Misuse contact forms or inquiry systems",
    ],
  },
  {
    title: "5. Booking & Payments",
    body: [
      "Photography bookings are confirmed only after payment or advance confirmation where applicable.",
      "Cancellation policies, refund eligibility, and rescheduling terms may vary depending on the project or event agreement.",
    ],
  },
  {
    title: "6. Third-Party Links",
    body: [
      "This website may contain links to third-party websites or platforms. We are not responsible for their content, privacy practices, or services.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: ["Magical Eyes shall not be held liable for:"],
    list: [
      "Temporary website downtime",
      "Data loss caused by technical issues",
      "Indirect or incidental damages arising from website usage",
    ],
  },
  {
    title: "8. Changes to Terms",
    body: [
      "We reserve the right to modify these Terms & Conditions at any time without prior notice. Continued use of the website means you accept the updated terms.",
    ],
  },
  {
    title: "9. Contact Information",
    body: [
      "For any questions regarding these Terms & Conditions, please contact us through the official website contact page.",
    ],
  },
];

export default function Terms() {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white pt-24 md:pt-28 pb-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]"
      />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <motion.button
          type="button"
          onClick={goBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -3 }}
          className="group mb-8 inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-white/65 hover:text-green-400 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-green-400 mb-3 italic">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-5 text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Welcome to Magical Eyes. By accessing or using this website, you
            agree to comply with the following Terms &amp; Conditions. Please
            read them carefully before using our services.
          </p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <h2 className="text-base md:text-lg font-bold tracking-wide mb-3">
                {s.title}
              </h2>
              <div className="space-y-3 text-[13px] md:text-sm text-white/75 leading-[1.75]">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.list && (
                  <ul className="list-disc list-outside pl-5 space-y-1.5 marker:text-green-400/80">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.footer && <p>{s.footer}</p>}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
