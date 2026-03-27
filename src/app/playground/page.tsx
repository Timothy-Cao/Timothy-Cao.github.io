"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { playgroundCards, GALLERY_IMAGE_COUNT } from "@/data/playground";

const getImagePath = (index: number) => `/assets/media/Photo Gallery/${index + 1}.jpg`;

export default function PlaygroundPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [gallerySpeed, setGallerySpeed] = useState(1000);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const pianoAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicAudioRef.current = new Audio("/assets/media/audio/hover_sound.mp3");
    musicAudioRef.current.preload = "auto";
    musicAudioRef.current.volume = 0.15;

    pianoAudioRef.current = new Audio("/merry christmas mr. lawrence if hisaishi composed it.mp3");
    pianoAudioRef.current.preload = "auto";
    pianoAudioRef.current.volume = 0.3;

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
    } else if (effect === "music" && musicAudioRef.current) {
      if (hovering) {
        musicAudioRef.current.currentTime = 0;
        musicAudioRef.current.play().catch(() => {});
      } else {
        musicAudioRef.current.pause();
        musicAudioRef.current.currentTime = 0;
      }
    } else if (effect === "keys" && pianoAudioRef.current) {
      if (hovering) {
        pianoAudioRef.current.currentTime = 1;
        pianoAudioRef.current.play().catch(() => {});
      } else {
        pianoAudioRef.current.pause();
        pianoAudioRef.current.currentTime = 1;
      }
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Playground</h1>
          <p className="text-muted mb-12 max-w-lg">
            A collection of random things. Check them out!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playgroundCards.map((card, i) => {
            const isGallery = card.hoverEffect === "gallery";
            const isSpin = card.hoverEffect === "spin";

            return (
              <ScrollReveal key={card.title} delay={i * 0.05}>
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex flex-col rounded-xl overflow-hidden bg-surface border border-border hover:border-accent/30 hover:shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300"
                    onMouseEnter={() => handleHover(card.hoverEffect, true)}
                    onMouseLeave={() => handleHover(card.hoverEffect, false)}
                  >
                    <div className={`relative w-full h-44 overflow-hidden ${isSpin ? "flex items-center justify-center" : ""}`}>
                      {isSpin ? (
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
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={isGallery}
                      />
                      )}
                      {card.hoverEffect === "grain" && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">{card.subtitle}</p>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
