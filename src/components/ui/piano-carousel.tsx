"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PianoYouTuber } from "@/data/piano";
import LiteYouTubePlayer from "@/components/ui/lite-youtube-player";

const cardColors = [
  "from-indigo-500/15 to-purple-600/15",
  "from-cyan-500/15 to-blue-600/15",
  "from-rose-500/15 to-pink-600/15",
  "from-emerald-500/15 to-teal-600/15",
  "from-amber-500/15 to-orange-600/15",
  "from-violet-500/15 to-fuchsia-600/15",
  "from-sky-500/15 to-indigo-600/15",
  "from-lime-500/15 to-green-600/15",
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

interface PianoFocusCardsProps {
  youtubers: PianoYouTuber[];
}

export default function PianoFocusCards({ youtubers }: PianoFocusCardsProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [videoIdx, setVideoIdx] = useState(0);

  const open = (i: number) => {
    setSelected(i);
    setVideoIdx(0);
  };

  const close = () => setSelected(null);

  const yt = selected !== null ? youtubers[selected] : null;
  const videoCount = yt?.videoIds.length ?? 0;

  useEffect(() => {
    if (selected === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") setVideoIdx((index) => Math.max(0, index - 1));
      if (event.key === "ArrowRight") setVideoIdx((index) => Math.min(videoCount - 1, index + 1));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, videoCount]);

  return (
    <>
      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {youtubers.map((yt, i) => {
          const colorIdx = i % cardColors.length;
          return (
            <motion.button
              key={yt.handle}
              onClick={() => open(i)}
              className={`text-left p-6 rounded-lg border border-border bg-gradient-to-br ${cardColors[colorIdx]} backdrop-blur-sm transition-all hover:border-accent/30 hover:scale-[1.02] active:scale-[0.98]`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold">{yt.name}</h3>
              <p className={`text-sm ${cardAccents[colorIdx]} mt-1`}>{yt.handle}</p>
              {yt.description && (
                <p className="text-sm text-muted mt-2 line-clamp-2">{yt.description}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {yt.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-0.5 rounded-full text-xs bg-accent/10 text-accent border border-accent/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">{yt.videoIds.length} videos</p>
            </motion.button>
          );
        })}
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {selected !== null && yt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`relative w-full max-w-3xl rounded-lg border border-border bg-gradient-to-br ${cardColors[selected % cardColors.length]} bg-surface overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    {yt.name}
                    <a
                      href={yt.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-normal ${cardAccents[selected % cardAccents.length]} hover:underline`}
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

                {/* Video player */}
                <div className="relative">
                  <LiteYouTubePlayer
                    key={`${yt.handle}-${videoIdx}`}
                    youtubeId={yt.videoIds[videoIdx]}
                    title={`${yt.name} video ${videoIdx + 1}`}
                  />

                  {/* Video nav arrows */}
                  {videoIdx > 0 && (
                    <button
                      onClick={() => setVideoIdx((v) => v - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
                      aria-label="Previous video"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {videoIdx < yt.videoIds.length - 1 && (
                    <button
                      onClick={() => setVideoIdx((v) => v + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
                      aria-label="Next video"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Video dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {yt.videoIds.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setVideoIdx(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === videoIdx
                          ? "w-6 h-2 bg-accent"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Video ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
