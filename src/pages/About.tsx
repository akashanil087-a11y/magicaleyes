import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import akkuImg from "@/assets/pj/akku.jpg";

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ to, duration = 1.8, suffix = "+" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCount(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats: Array<{ value: number; suffix: string; label: string }> = [
  { value: 500, suffix: "+", label: "Projects" },
  { value: 8, suffix: "+", label: "Years" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Awards" },
];

export default function About() {
  return (
    <div className="bg-[#f5f3f0] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Me</h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="overflow-hidden rounded-3xl aspect-4/5">
            <img src={akkuImg} alt="About" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
              Where art meets vision and every frame becomes timeless
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                At MAGICAL EYES, I believe photography is more than capturing images — it's about
                preserving emotions, telling stories, and creating art that transcends time.
              </p>
              <p>
                With years of experience in cinematic photography, I bring a unique perspective to
                every project. My approach blends traditional craftsmanship with modern innovation
                to deliver images that are both striking and soulful.
              </p>
              <p>
                Whether it's the intimate moments of a wedding, the raw beauty of nature, or the
                depth of a portrait — I pour my passion into every frame.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-8 text-center border border-gray-100"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tabular-nums">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
