"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import AudioPlayer from "@/components/ui/audio-player";
import { compositions } from "@/data/music";
import { Star, X } from "lucide-react";

export default function MusicPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const favorites = compositions.filter((c) => c.isFavorite);
  const others = compositions.filter((c) => !c.isFavorite);
  const sorted = [...favorites, ...others];

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Musical Composition</h1>
          <p className="text-muted mb-12">
            Disclaimer: I am not liable to headaches induced by my songs
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.map((comp, i) => (
            <ScrollReveal key={comp.title} delay={i * 0.03}>
              <div className="p-4 rounded-xl bg-surface border border-border hover:border-accent/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      {comp.title}
                      {comp.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                    </h3>
                    <p className="text-sm text-muted mt-1">{comp.description}</p>
                  </div>
                </div>

                {comp.type === "audio" ? (
                  <AudioPlayer src={comp.src} />
                ) : (
                  <button
                    onClick={() => setActiveVideo(comp.src)}
                    className="w-full py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm hover:bg-accent/20 transition-colors"
                  >
                    Watch Video
                  </button>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <button className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close">
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={activeVideo}
                title="Music Video"
                className="w-full max-w-3xl aspect-video rounded-lg"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
