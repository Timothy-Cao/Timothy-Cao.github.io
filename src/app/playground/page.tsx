"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { playgroundCards, GALLERY_IMAGE_COUNT } from "@/data/playground";
import { Clock3, Construction, ExternalLink } from "lucide-react";

const getImagePath = (index: number) => `/assets/media/Photo Gallery/${index + 1}.jpg`;

export default function PlaygroundPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [gallerySpeed, setGallerySpeed] = useState(1000);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const pianoAudioRef = useRef<HTMLAudioElement | null>(null);

  const getMusicAudio = () => {
    if (!musicAudioRef.current) {
      const audio = new Audio("/assets/media/audio/hover_sound.mp3");
      audio.preload = "none";
      audio.volume = 0.15;
      musicAudioRef.current = audio;
    }
    return musicAudioRef.current;
  };

  const getPianoAudio = () => {
    if (!pianoAudioRef.current) {
      const audio = new Audio("/merry christmas mr. lawrence if hisaishi composed it.mp3");
      audio.preload = "none";
      audio.volume = 0.3;
      pianoAudioRef.current = audio;
    }
    return pianoAudioRef.current;
  };

  useEffect(() => {
    return () => {
      if (musicAudioRef.current) { musicAudioRef.current.pause(); musicAudioRef.current.currentTime = 0; }
      if (pianoAudioRef.current) { pianoAudioRef.current.pause(); pianoAudioRef.current.currentTime = 0; }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGE_COUNT);
    }, gallerySpeed);
    return () => clearInterval(interval);
  }, [gallerySpeed]);

  const handleHover = (effect: string | undefined, hovering: boolean) => {
    if (effect === "gallery") {
      setGallerySpeed(hovering ? 200 : 1000);
    } else if (effect === "music") {
      const audio = hovering ? getMusicAudio() : musicAudioRef.current;
      if (!audio) return;
      if (hovering) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    } else if (effect === "keys") {
      const audio = hovering ? getPianoAudio() : pianoAudioRef.current;
      if (!audio) return;
      if (hovering) {
        audio.currentTime = 1;
        audio.play().catch(() => {});
      } else {
        audio.pause();
        audio.currentTime = 1;
      }
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Playground</h1>
          <p className="text-muted mb-12 max-w-lg">
            Collection of things Tim has built over the years. Mix of my games, music, AIs, recommendations, practice tools & others
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playgroundCards.map((card, i) => {
            const isGallery = card.hoverEffect === "gallery";
            const isSpin = card.hoverEffect === "spin";
            const isComingSoon = card.comingSoon;

            const cardContent = (
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group flex flex-col rounded-xl overflow-hidden bg-surface border border-border transition-all duration-300 ${
                      isComingSoon
                        ? "border-dashed border-accent/20 hover:border-accent/40 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
                        : "hover:border-accent/30 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
                    }`}
                    onMouseEnter={() => handleHover(card.hoverEffect, true)}
                    onMouseLeave={() => handleHover(card.hoverEffect, false)}
                  >
                    <div className={`relative w-full h-44 overflow-hidden ${isSpin ? "flex items-center justify-center" : ""}`}>
                      {isComingSoon ? (
                        <div className="absolute inset-0 bg-background">
                          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
                          <div className="relative h-full flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-lg border border-accent/20 bg-accent/10 flex items-center justify-center mb-3">
                              <Construction className="w-6 h-6 text-accent" />
                            </div>
                            <span className="text-xs font-medium text-accent uppercase tracking-wider">Preview</span>
                          </div>
                        </div>
                      ) : isSpin ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={card.coverImage}
                          alt={card.title}
                          className="max-h-[300%] object-contain"
                          style={{
                            transitionProperty: "transform",
                            transitionDuration: "0.7s",
                            transitionTimingFunction: "ease-in-out",
                            transform: "scale(1) rotate(0deg)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.25) rotate(180deg)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = "scale(1) rotate(0deg)";
                          }}
                        />
                      ) : (
                      <Image
                        src={isGallery ? getImagePath(galleryIndex) : card.coverImage}
                        alt={card.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={isGallery}
                      />
                      )}
                      {card.hoverEffect === "grain" && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
                      )}
                      {card.external && (
                        <div className="absolute top-2 right-2">
                          <ExternalLink className="w-4 h-4 text-white/70" />
                        </div>
                      )}
                      {isComingSoon && (
                        <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-accent/20 bg-background/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-accent backdrop-blur">
                          <Clock3 className="w-3 h-3" />
                          Soon
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground transition-colors group-hover:text-accent">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">{card.subtitle}</p>
                      {isComingSoon && card.statusLabel && (
                        <p className="text-xs text-accent/80 mt-3">{card.statusLabel}</p>
                      )}
                    </div>
                  </motion.div>
            );

            return (
              <ScrollReveal key={card.title} delay={i * 0.05}>
                {isComingSoon ? (
                  <Link href={card.href}>{cardContent}</Link>
                ) : card.external ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer">{cardContent}</a>
                ) : (
                  <Link href={card.href}>{cardContent}</Link>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
