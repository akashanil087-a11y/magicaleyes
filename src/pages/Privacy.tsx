import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    body: ["We may collect:"],
    list: [
      "Name",
      "Email address",
      "Phone number",
      "Messages submitted through contact forms",
      "Booking details",
      "Browser/device information for analytics",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: ["Your information may be used to:"],
    list: [
      "Respond to inquiries",
      "Manage photography bookings",
      "Improve website experience",
      "Send updates or service-related communication",
    ],
    footer: "We do not sell or rent your personal information to third parties.",
  },
  {
    title: "3. Cookies",
    body: [
      "Our website may use cookies to enhance user experience and analyze website traffic.",
      "Users can disable cookies through browser settings if preferred.",
    ],
  },
  {
    title: "4. Data Protection",
    body: [
      "We implement reasonable security measures to protect user information from unauthorized access, disclosure, or misuse.",
    ],
  },
  {
    title: "5. Third-Party Services",
    body: ["We may use trusted third-party services such as:"],
    list: ["Google Analytics", "Social media integrations", "Payment gateways"],
    footer:
      "These services may collect information according to their own privacy policies.",
  },
  {
    title: "6. Copyright Protection",
    body: [
      "All images, visual content, branding materials, and creative works on this website are copyrighted by Magical Eyes.",
      "Downloading, screenshotting, reproducing, editing, or reusing any photographs without permission is strictly prohibited.",
    ],
  },
  {
    title: "7. Children's Privacy",
    body: [
      "This website is not intended for children under 13 years of age. We do not knowingly collect personal data from children.",
    ],
  },
  {
    title: "8. Policy Updates",
    body: [
      "We may update this Privacy Policy periodically. Changes will be reflected on this page with updated revisions.",
    ],
  },
  {
    title: "9. Contact Us",
    body: [
      "For privacy-related concerns or copyright issues, please contact us through the official contact section of the website.",
    ],
  },
];

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="mt-5 text-[14px] text-white/70 leading-relaxed max-w-2xl">
            At Magical Eyes, your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your information.
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
