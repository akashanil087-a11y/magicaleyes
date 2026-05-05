import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/magical eyes.jpg";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Desktop - Floating pill navbar */}
      <div className="hidden md:flex items-center justify-between bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-sm border border-gray-100">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MAGICAL EYES" className="w-8 h-8 rounded-md object-cover" />
          <span className="text-[15px] font-semibold text-gray-800 tracking-wide">
            MAGICAL EYES
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[14px] transition-colors duration-200 ${
                location.pathname === l.to
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MAGICAL EYES" className="w-8 h-8 rounded-md object-cover" />
          <span className="text-[14px] font-semibold text-gray-800">MAGICAL EYES</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-8 h-6 flex flex-col justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-full h-[2px] bg-gray-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`w-full h-[2px] bg-gray-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg border border-gray-100 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[15px] py-1 ${
                location.pathname === l.to ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
