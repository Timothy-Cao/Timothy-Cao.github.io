"use client";

import { useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import MusicCarousel from "@/components/ui/music-carousel";
import { compositions } from "@/data/music";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPage() {
  const [volume, setVolume] = useState(0.5);
  const favorites = compositions.filter((c) => c.isFavorite);
  const others = compositions.filter((c) => !c.isFavorite);
  const sorted = [...favorites, ...others];

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Composition</h1>
          <p className="text-muted mb-8">
            Disclaimer: I am not liable to headaches induced by my songs
          </p>
        </ScrollReveal>

        {/* Volume slider */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-3 mb-12 max-w-xs">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
              className="text-muted hover:text-foreground transition-colors"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none bg-white/10 accent-accent cursor-pointer"
              aria-label="Volume"
            />
            <span className="text-xs text-muted font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={0.2}>
          <MusicCarousel compositions={sorted} volume={volume} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
