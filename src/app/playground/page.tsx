"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/ui/page-header";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { playgroundCards, GALLERY_IMAGE_COUNT, type PlaygroundCard } from "@/data/playground";
import { Clock3, Construction, ExternalLink } from "lucide-react";

const getImagePath = (index: number) => `/assets/media/Photo Gallery/${index + 1}.jpg`;

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

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

  const renderCard = (card: PlaygroundCard, hero = false) => {
    const isGallery = card.hoverEffect === "gallery";
    const isSpin = card.hoverEffect === "spin";
    const isComingSoon = card.comingSoon;
    const domain = card.external ? getDomain(card.href) : null;

    const coverHeight = hero ? "h-64 md:h-80" : "h-44";

    const cardContent = (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`group h-full flex flex-col rounded-xl overflow-hidden bg-surface border border-border transition-[border-color,box-shadow] duration-300 ${
          isComingSoon
            ? "border-dashed hover:border-accent/30"
            : "hover:border-accent/30 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
        }`}
        onMouseEnter={() => handleHover(card.hoverEffect, true)}
        onMouseLeave={() => handleHover(card.hoverEffect, false)}
      >
        <div className={`relative w-full ${coverHeight} overflow-hidden ${isSpin ? "flex items-center justify-center" : ""}`}>
          {isComingSoon ? (
            <div className="absolute inset-0 bg-background">
              <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="relative h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center mb-3">
                  <Construction className="w-6 h-6 text-muted" />
                </div>
                <span className="text-[10px] font-mono font-medium text-muted uppercase tracking-[0.24em]">Preview</span>
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
              sizes={hero ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized={isGallery}
            />
          )}

          {/* Cover gradient scrim — unifies cards with mixed cover art */}
          {!isComingSoon && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface/95 via-surface/30 to-transparent"
            />
          )}

          {card.hoverEffect === "grain" && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
          )}

          {card.external && !isComingSoon && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-2 py-0.5 text-[10px] font-mono text-white/70 backdrop-blur">
              <ExternalLink className="w-3 h-3" />
              {domain}
            </div>
          )}

          {isComingSoon && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-2 py-0.5 text-[10px] font-mono text-muted uppercase tracking-wider backdrop-blur">
              <Clock3 className="w-3 h-3" />
              Soon
            </div>
          )}
        </div>

        <div className={`p-4 ${hero ? "md:p-6" : ""}`}>
          <h3 className={`font-semibold text-foreground transition-colors group-hover:text-accent ${hero ? "text-xl md:text-2xl" : ""}`}>
            {card.title}
          </h3>
          <p className={`text-muted mt-1 ${hero ? "text-base" : "text-sm"}`}>{card.subtitle}</p>
          {isComingSoon && card.statusLabel && (
            <p className="text-xs text-muted/70 mt-3 font-mono">{card.statusLabel}</p>
          )}
        </div>
      </motion.div>
    );

    // Wrap hero cards with a subtle pulsing accent glow to hint
    // 'featured / most interesting' without being noisy
    const wrapped = hero ? (
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none hero-pulse"
        />
        <div className="relative">{cardContent}</div>
      </div>
    ) : (
      cardContent
    );

    if (isComingSoon) return <Link href={card.href}>{wrapped}</Link>;
    if (card.external) return <a href={card.href} target="_blank" rel="noopener noreferrer">{wrapped}</a>;
    return <Link href={card.href}>{wrapped}</Link>;
  };

  const liveCards = playgroundCards.filter((c) => !c.comingSoon);
  const comingSoonCards = playgroundCards.filter((c) => c.comingSoon);
  const featured = liveCards.slice(0, 2);
  const rest = liveCards.slice(2);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <PageHeader
          eyebrow="Playground"
          title="My Projects"
          description="Games, Music, AI, Helpers, Tools, etc. Check it out!"
        />

        {/* Featured: two equal-size heroes */}
        {featured.length > 0 && (
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured[0] && (
              <ScrollReveal>{renderCard(featured[0], true)}</ScrollReveal>
            )}
            {featured[1] && (
              <ScrollReveal delay={0.06}>{renderCard(featured[1], true)}</ScrollReveal>
            )}
          </div>
        )}

        {/* Rest of live work */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.04}>
              {renderCard(card)}
            </ScrollReveal>
          ))}
        </div>

        {/* Coming soon — softer presentation */}
        {comingSoonCards.length > 0 && (
          <div className="mt-24">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
                Cooking up
              </h2>
              <span className="block flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonCards.map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.04}>
                  {renderCard(card)}
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
