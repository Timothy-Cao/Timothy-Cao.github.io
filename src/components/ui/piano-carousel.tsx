"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PianoYouTuber } from "@/data/piano";

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

interface PianoCarouselProps {
  youtubers: PianoYouTuber[];
}

function PianoCard({
  yt,
  index,
  total,
  isCurrent,
}: {
  yt: PianoYouTuber;
  index: number;
  total: number;
  isCurrent: boolean;
}) {
  const colorIdx = index % cardColors.length;

  return (
    <div
      className={`rounded-2xl border border-border overflow-hidden bg-gradient-to-br ${cardColors[colorIdx]} backdrop-blur-sm h-full`}
    >
      <div className="relative p-6 md:p-8">
        <span className={`text-sm font-mono ${cardAccents[colorIdx]} opacity-70`}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h2 className="text-xl md:text-2xl font-bold mt-2 flex items-center gap-3">
          {yt.name}
          <a
            href={yt.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-normal ${cardAccents[colorIdx]} hover:underline`}
            onClick={(e) => e.stopPropagation()}
          >
            {yt.handle}
          </a>
        </h2>

        {yt.description && (
          <p className="text-muted mt-2 text-sm">{yt.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {yt.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {isCurrent ? (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="grid grid-cols-2 gap-3">
            {yt.videoIds.map((videoId, j) => (
              <div key={`${yt.handle}-${j}`} className="rounded-lg overflow-hidden bg-black">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${yt.name} video ${j + 1}`}
                  style={{ border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="w-full aspect-video bg-white/5 rounded-lg flex items-center justify-center">
            <span className="text-4xl opacity-20">🎹</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PianoCarousel({ youtubers }: PianoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const id = useId();

  const prevIdx = current > 0 ? current - 1 : null;
  const nextIdx = current < youtubers.length - 1 ? current + 1 : null;

  const prev = () => {
    if (current === 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  };
  const next = () => {
    if (current === youtubers.length - 1) return;
    setDirection(1);
    setCurrent((c) => c + 1);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative flex items-center justify-center gap-4 md:gap-6">
        {/* Previous card preview */}
        {prevIdx !== null ? (
          <button
            onClick={prev}
            className="hidden md:block flex-shrink-0 w-44 lg:w-52 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Previous channel"
          >
            <PianoCard yt={youtubers[prevIdx]} index={prevIdx} total={youtubers.length} isCurrent={false} />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-44 lg:w-52" />
        )}

        {/* Center card */}
        <div className="flex-shrink-0 w-full md:w-[32rem] lg:w-[36rem] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <PianoCard yt={youtubers[current]} index={current} total={youtubers.length} isCurrent={true} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows */}
          {current > 0 && (
            <button
              onClick={prev}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
              aria-label="Previous channel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {current < youtubers.length - 1 && (
            <button
              onClick={next}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
              aria-label="Next channel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Next card preview */}
        {nextIdx !== null ? (
          <button
            onClick={next}
            className="hidden md:block flex-shrink-0 w-44 lg:w-52 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Next channel"
          >
            <PianoCard yt={youtubers[nextIdx]} index={nextIdx} total={youtubers.length} isCurrent={false} />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-44 lg:w-52" />
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {youtubers.map((_, i) => (
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
            aria-label={`Go to channel ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
