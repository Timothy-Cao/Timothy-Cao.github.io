"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VideoRecommendation } from "@/data/videos";

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

interface VideoCarouselProps {
  videos: VideoRecommendation[];
}

function VideoCard({
  video,
  index,
  total,
  isCurrent,
}: {
  video: VideoRecommendation;
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

        <h2 className="text-xl md:text-2xl font-bold mt-2">{video.title}</h2>
        <p className={`text-sm mt-1 ${cardAccents[colorIdx]}`}>{video.creator}</p>
        {isCurrent ? (
          video.description ? (
            <p className="text-muted mt-2 text-sm line-clamp-2 min-h-[2.5rem]">{video.description}</p>
          ) : (
            <div className="min-h-[2.5rem]" />
          )
        ) : (
          <div className="min-h-[2.5rem]" />
        )}
      </div>

      {isCurrent && (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

      {!isCurrent && (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="w-full aspect-video bg-white/5 rounded-lg flex items-center justify-center">
            <span className="text-4xl opacity-20">▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const id = useId();

  const prevIdx = current > 0 ? current - 1 : null;
  const nextIdx = current < videos.length - 1 ? current + 1 : null;

  const prev = () => {
    if (current === 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  };
  const next = () => {
    if (current === videos.length - 1) return;
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
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative flex items-center justify-center gap-4 md:gap-6">
        {/* Previous card preview */}
        {prevIdx !== null ? (
          <button
            onClick={prev}
            className="hidden md:block flex-shrink-0 w-44 lg:w-52 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Previous video"
          >
            <VideoCard video={videos[prevIdx]} index={prevIdx} total={videos.length} isCurrent={false} />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-44 lg:w-52" />
        )}

        {/* Center card */}
        <div className="flex-shrink-0 w-full md:w-[32rem] lg:w-[36rem] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <VideoCard video={videos[current]} index={current} total={videos.length} isCurrent={true} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows */}
          <button
            onClick={prev}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all z-10"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Next card preview */}
        {nextIdx !== null ? (
          <button
            onClick={next}
            className="hidden md:block flex-shrink-0 w-44 lg:w-52 opacity-40 hover:opacity-60 scale-90 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
            aria-label="Next video"
          >
            <VideoCard video={videos[nextIdx]} index={nextIdx} total={videos.length} isCurrent={false} />
          </button>
        ) : (
          <div className="hidden md:block flex-shrink-0 w-44 lg:w-52" />
        )}
      </div>

      {/* Track dots */}
      <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
        {videos.map((_, i) => (
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
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
