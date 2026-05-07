import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX, Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

function CustomSlider({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    onChange(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div
      ref={barRef}
      role="slider"
      tabIndex={0}
      aria-valuenow={Math.round(value)}
      className={cn(
        "relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer select-none",
        className
      )}
      onMouseDown={handleClick}
    >
      {/* Fill — pointer-events-none so clicks pass through to parent */}
      <div
        className="absolute top-0 left-0 h-full bg-white rounded-full pointer-events-none transition-[width] duration-100"
        style={{ width: `${value}%` }}
      />
      {/* Thumb knob */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md pointer-events-none transition-[left] duration-100"
        style={{ left: `calc(${value}% - 6px)` }}
      />
    </div>
  );
}

export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(isFinite(p) ? p : 0);
      setCurrentTime(audio.currentTime);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleVolumeChange = useCallback(
    (val: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const v = val / 100;
      audio.volume = v;
      setVolume(v);
      if (v === 0) {
        setIsMuted(true);
        audio.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audio.muted = false;
      }
    },
    [isMuted]
  );

  const handleSeek = useCallback((val: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const time = (val / 100) * audio.duration;
    if (isFinite(time)) {
      audio.currentTime = time;
      setProgress(val);
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} loop />

      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
        {/* Expanded player panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#111111e6] backdrop-blur-xl rounded-2xl p-5 w-72 shadow-2xl shadow-black/40 border border-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-white/60" />
                  <span className="text-white text-xs font-medium tracking-wide uppercase">
                    Now Playing
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Track info */}
              <div className="mb-4">
                <p className="text-white text-sm font-medium truncate">
                  No Sleep
                </p>
                <p className="text-white/40 text-xs">Kontraa · Hip-Hop</p>
              </div>

              {/* Progress / seek bar */}
              <div className="mb-4">
                <CustomSlider value={progress} onChange={handleSeek} />
                <div className="flex justify-between mt-1.5">
                  <span className="text-white/40 text-[10px]">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-white/40 text-[10px]">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Play / Pause */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-white/90 cursor-pointer transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  {/* Mute / Unmute */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-[18px] h-[18px]" />
                    ) : volume > 0.5 ? (
                      <Volume2 className="w-[18px] h-[18px]" />
                    ) : (
                      <Volume1 className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>

                {/* Volume slider */}
                <div className="w-20">
                  <CustomSlider
                    value={isMuted ? 0 : volume * 100}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating toggle button — no motion.div wrapper */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
            "bg-[#111111cc] backdrop-blur-md text-white hover:bg-[#111111ee] border border-white/15 hover:border-green-400",
            "shadow-lg shadow-black/30 hover:shadow-[0_0_22px_rgba(74,222,128,0.65),inset_0_0_14px_rgba(74,222,128,0.18)] hover:scale-105 active:scale-95"
          )}
        >
          {isPlaying ? (
            <div className="flex items-center gap-[3px] pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className={cn(
                    "w-[3px] rounded-full",
                    i === 2 ? "bg-white" : "bg-green-400"
                  )}
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          ) : (
            <Music className="w-5 h-5 pointer-events-none" />
          )}
        </button>
      </div>
    </>
  );
}
