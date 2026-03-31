"use client";

import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Composition } from "@/data/music";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const cardColors = [
  "from-indigo-500/20 to-purple-600/20",
  "from-cyan-500/20 to-blue-600/20",
  "from-rose-500/20 to-pink-600/20",
  "from-emerald-500/20 to-teal-600/20",
  "from-amber-500/20 to-orange-600/20",
  "from-violet-500/20 to-fuchsia-600/20",
  "from-sky-500/20 to-indigo-600/20",
  "from-lime-500/20 to-green-600/20",
];

const cardAccents = [
  "text-indigo-400",
  "text-cyan-400",
  "text-rose-400",
  "text-emerald-400",
  "text-amber-400",
  "text-violet-400",
  "text-sky-400",
  "text-lime-400",
];

const waveIcons = ["♩", "♪", "♫", "♬", "𝄞"];

interface MusicCarouselProps {
  compositions: Composition[];
  volume: number;
}

function CardContent({
  comp,
  index,
  total,
  isCurrent,
  playing,
  onToggle,
  onSeek,
  currentTime,
  duration,
}: {
  comp: Composition;
  index: number;
  total: number;
  isCurrent: boolean;
  playing: boolean;
  onToggle: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentTime: number;
  duration: number;
}) {
  const colorIdx = index % cardColors.length;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`rounded-2xl border border-border overflow-hidden bg-gradient-to-br ${cardColors[colorIdx]} backdrop-blur-sm h-full`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-6 right-8 text-6xl opacity-[0.06] select-none">
          {waveIcons[index % waveIcons.length]}
        </span>
        <span className="absolute bottom-10 left-6 text-8xl opacity-[0.04] select-none rotate-12">
          {waveIcons[(index + 2) % waveIcons.length]}
        </span>
      </div>

      <div className="relative p-8 md:p-12">
        <span className={`text-sm font-mono ${cardAccents[colorIdx]} opacity-70`}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h2 className="text-2xl md:text-3xl font-bold mt-2 flex items-center gap-3">
          {comp.title}
          {comp.isFavorite && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
        </h2>

        {isCurrent ? (
          <p className="text-muted mt-2 text-sm md:text-base line-clamp-2 min-h-[2.5rem]">{comp.description}</p>
        ) : (
          <div className="min-h-[2.5rem]" />
        )}

        {isCurrent && (
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onToggle}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                playing
                  ? "bg-accent/20 border-accent/50 text-accent"
                  : "bg-white/5 border-white/20 text-foreground hover:border-accent/40 hover:text-accent"
              }`}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div className="flex-1 space-y-1">
              <div
                className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                onClick={onSeek}
                role="slider"
                aria-valuenow={currentTime}
                aria-valuemax={duration}
                tabIndex={0}
              >
                <div
                  className="h-full bg-accent rounded-full transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MusicCarousel({ compositions, volume }: MusicCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [direction, setDirection] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const id = useId();

  const comp = compositions[current];
  const prevIdx = current > 0 ? current - 1 : null;
  const nextIdx = current < compositions.length - 1 ? current + 1 : null;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => {
      setPlaying(false);
      if (current < compositions.length - 1) {
        setDirection(1);
        setCurrent((prev) => prev + 1);
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, [current, compositions.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = comp.src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (playing) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const prev = () => {
    if (current === 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  };
  const next = () => {
    if (current === compositions.length - 1) return;
    setDirection(1);
    setCurrent((c) => c + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const variants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <audio ref={audioRef} preload="metadata" />

      <div className="relative flex items-center justify-center gap-4 md:gap-6">
        {/* Previous card preview */}
        {prevIdx !== null ? (
          <button
            onClick={prev}
            className="hidden md:block flex-shrink-0 w-48 lg:w-56 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Previous track"
          >
            <CardContent
              comp={compositions[prevIdx]}
              index={prevIdx}
              total={compositions.length}
              isCurrent={false}
              playing={false}
              onToggle={() => {}}
              onSeek={() => {}}
              currentTime={0}
              duration={0}
            />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-48 lg:w-56" />
        )}

        {/* Center card */}
        <div className="flex-shrink-0 w-full md:w-[28rem] lg:w-[32rem] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <CardContent
                comp={comp}
                index={current}
                total={compositions.length}
                isCurrent={true}
                playing={playing}
                onToggle={toggle}
                onSeek={seek}
                currentTime={currentTime}
                duration={duration}
              />
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows */}
          <button
            onClick={prev}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
            aria-label="Previous track"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
            aria-label="Next track"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Next card preview */}
        {nextIdx !== null ? (
          <button
            onClick={next}
            className="hidden md:block flex-shrink-0 w-48 lg:w-56 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Next track"
          >
            <CardContent
              comp={compositions[nextIdx]}
              index={nextIdx}
              total={compositions.length}
              isCurrent={false}
              playing={false}
              onToggle={() => {}}
              onSeek={() => {}}
              currentTime={0}
              duration={0}
            />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-48 lg:w-56" />
        )}
      </div>

      {/* Track list dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {compositions.map((_, i) => (
          <button
            key={`${id}-dot-${i}`}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-accent"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to track ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
