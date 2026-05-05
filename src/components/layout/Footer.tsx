import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Routes that should render with no footer (full-bleed experiences).
const HIDE_FOOTER_ROUTES = ["/portfolio"];

const menuLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/magical_eyes004/" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

// Decorative bar widths matching the navbar style.
const barWidths = [120, 110, 36, 28, 20, 12, 8, 4];

const istTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function ArrowIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 9 L9 2" />
      <path d="M3.5 2 L9 2 L9 7.5" />
    </svg>
  );
}

export default function Footer() {
  const location = useLocation();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (HIDE_FOOTER_ROUTES.includes(location.pathname)) return null;

  return (
    <footer className="bg-black text-white">
      <div className="px-6 md:px-10 pt-20 md:pt-28 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Studio name */}
          <div className="md:col-span-6">
            <h2 className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight">
              Photography <span className="text-white/40">+</span>
              <br />
              Cinematic Storytelling
            </h2>
          </div>

          {/* Menu + Socials */}
          <div className="md:col-span-3 flex flex-col gap-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
                Menu
              </p>
              <ul className="flex flex-col gap-2.5">
                {menuLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-[14px] text-white/85 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
                Socials
              </p>
              <ul className="flex flex-col gap-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between max-w-45 text-[14px] text-white/85 hover:text-white transition-colors"
                    >
                      <span>{s.label}</span>
                      <span className="text-white/60 group-hover:text-white transition-colors">
                        <ArrowIcon />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
              Get in touch
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:akashanil1131@gmail.com"
                  className="text-[14px] text-white/85 hover:text-white transition-colors"
                >
                  akashanil1131@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918943572124"
                  className="text-[14px] text-white/85 hover:text-white transition-colors"
                >
                  +91 8943572124
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Local time + location */}
          <div className="font-mono text-[11px] tracking-wider leading-tight text-white/85">
            <p className="uppercase">{istTime.format(now)}</p>
            <p className="text-white/55 mt-1">KERALA, IN</p>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-white/55">
            <a href="#" className="hover:text-white transition-colors">
              Terms of use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Decorative bars — staggered wave animation */}
          <div
            aria-hidden="true"
            className="hidden md:flex items-center gap-2 footer-bars"
          >
            <style>{`
              @keyframes footer-bar-wave {
                0%, 100% { transform: scaleY(1); opacity: 0.5; }
                50%      { transform: scaleY(1.8); opacity: 1; }
              }
              .footer-bars > span {
                display: block;
                transform-origin: center;
                animation: footer-bar-wave 1.6s ease-in-out infinite;
              }
            `}</style>
            {barWidths.map((w, i) => (
              <span
                key={i}
                style={{
                  width: w,
                  animationDelay: `${i * 0.12}s`,
                }}
                className="h-2 rounded-sm bg-white/25"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
