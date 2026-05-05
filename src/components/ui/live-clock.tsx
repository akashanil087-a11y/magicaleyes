import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface LiveClockProps {
  className?: string;
}

const time24Fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const time12Fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function LiveClock({ className }: LiveClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const t24 = time24Fmt.format(now);
  const t12 = time12Fmt.format(now);

  // Render via portal to document.body so no parent transform/perspective
  // context can break the `position: fixed` behavior.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "fixed top-24 right-8 z-60 select-none pointer-events-none",
        "text-white text-[13px] md:text-[14px] tracking-wider font-mono",
        "flex items-center gap-2.5",
        className
      )}
    >
      {/* Live indicator dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
      </span>
      <span>Local time: {t24} ({t12})</span>
    </div>,
    document.body
  );
}
