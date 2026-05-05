import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/portfolio", label: "Work", shape: "triangle" as const },
  { to: "/about", label: "About", shape: "square" as const },
  { to: "/contact", label: "Contact", shape: "circle" as const },
];

// Widths for the decorative pale-blue bars between logo and nav.
const barWidths = [120, 110, 36, 28, 20, 12, 8, 4];

function ShapeIcon({ shape }: { shape: "triangle" | "square" | "circle" }) {
  if (shape === "triangle") {
    return (
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M0 0 L9 4.5 L0 9 Z" />
      </svg>
    );
  }
  if (shape === "square") {
    return (
      <span
        aria-hidden="true"
        className="shrink-0 inline-block w-2 h-2 border border-current"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="shrink-0 inline-block w-2 h-2 border border-current rounded-full"
    />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Pages that have their own dark backgrounds and can host a transparent
  // navbar — the home hero video and the Portfolio page (full-screen black
  // horizontal-scroll gallery).
  const transparentRoutes = ["/", "/portfolio"];
  const allowTransparent = transparentRoutes.includes(location.pathname);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !allowTransparent || scrolled;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 text-white/90 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "bg-[#2a1810]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo — stacked wordmark */}
        <Link
          to="/"
          aria-label="Home"
          className="font-bold text-[15px] md:text-[17px] leading-[1.05] tracking-tight hover:text-white transition-colors"
        >
          Magical Eyes
        </Link>

        {/* Centre — decorative pale-blue bars (desktop only) */}
        <div
          aria-hidden="true"
          className="hidden lg:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nav-bars"
        >
          <style>{`
            @keyframes nav-bar-sweep {
              0%, 8%   { transform: scaleX(0); opacity: 0; }
              22%, 60% { transform: scaleX(1); opacity: 1; }
              74%, 100% { transform: scaleX(0); opacity: 0; }
            }
            .nav-bars > span {
              background-color: rgb(186 230 253 / 0.7);
              transform-origin: left center;
              animation: nav-bar-sweep 4.2s ease-in-out infinite;
            }
          `}</style>
          {barWidths.map((w, i) => (
            <span
              key={i}
              style={{
                width: w,
                animationDelay: `${i * 0.18}s`,
              }}
              className="h-2 rounded-sm"
            />
          ))}
        </div>

        {/* Right — nav links with shape icons (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`group flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                <ShapeIcon shape={l.shape} />
                <span>{l.label}</span>
                {l.label === "Work" && (
                  <span aria-hidden="true" className="ml-0.5 text-[10px]">
                    ↓
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile — hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden w-8 h-6 flex flex-col justify-center gap-1.5 cursor-pointer"
        >
          <span
            className={`w-full h-0.5 bg-white/80 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-1.25" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white/80 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-1.25" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 pt-1 flex flex-col gap-4 border-t border-white/5">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-3 text-[12px] tracking-[0.25em] uppercase transition-colors ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                <ShapeIcon shape={l.shape} />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
