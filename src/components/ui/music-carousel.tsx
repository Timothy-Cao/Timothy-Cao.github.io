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

// Simple deterministic color palette based on index
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

export default function MusicCarousel({ compositions, volume }: MusicCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const id = useId();

  const comp = compositions[current];

  // Update volume when slider changes
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
      // Auto-advance to next
      if (current < compositions.length - 1) {
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

  // Reset on track change
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
    setCurrent((c) => (c > 0 ? c - 1 : compositions.length - 1));
  };
  const next = () => {
    setCurrent((c) => (c < compositions.length - 1 ? c + 1 : 0));
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const colorIdx = current % cardColors.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <audio ref={audioRef} preload="metadata" />

      {/* Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl border border-border overflow-hidden bg-gradient-to-br ${cardColors[colorIdx]} backdrop-blur-sm`}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <span className="absolute top-6 right-8 text-6xl opacity-[0.06] select-none">
                {waveIcons[current % waveIcons.length]}
              </span>
              <span className="absolute bottom-10 left-6 text-8xl opacity-[0.04] select-none rotate-12">
                {waveIcons[(current + 2) % waveIcons.length]}
              </span>
            </div>

            <div className="relative p-8 md:p-12">
              {/* Track number */}
              <span className={`text-sm font-mono ${cardAccents[colorIdx]} opacity-70`}>
                {String(current + 1).padStart(2, "0")} / {String(compositions.length).padStart(2, "0")}
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold mt-2 flex items-center gap-3">
                {comp.title}
                {comp.isFavorite && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
              </h2>

              {/* Description */}
              <p className="text-muted mt-2 text-sm md:text-base">{comp.description}</p>

              {/* Player controls */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={toggle}
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
                    className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                    onClick={seek}
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
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
          aria-label="Previous track"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
          aria-label="Next track"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Track list dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {compositions.map((_, i) => (
          <button
            key={`${id}-dot-${i}`}
            onClick={() => setCurrent(i)}
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
