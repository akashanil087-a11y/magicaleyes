import { Link } from "react-router-dom";
import logo from "@/assets/magical eyes.jpg";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MAGICAL EYES" className="w-8 h-8 rounded-md object-cover" />
              <span className="text-[15px] font-semibold text-white tracking-wide">MAGICAL EYES</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Capturing the extraordinary in every moment. Photography that tells your story.
            </p>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Navigate</h3>
            <div className="flex flex-col gap-2.5">
              {[{ to: "/", label: "Home" }, { to: "/portfolio", label: "Portfolio" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((l) => (
                <Link key={l.to} to={l.to} className="text-gray-400 text-sm hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Contact</h3>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <span>hello@magicaleyes.com</span>
              <span>8943572124</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} MAGICAL EYES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
