"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { boardGames, brainTeasers } from "@/data/board-games";
import { ExternalLink } from "lucide-react";

export default function GamesPage() {
  const [revealedPuzzles, setRevealedPuzzles] = useState<Set<number>>(new Set());

  const togglePuzzle = (i: number) => {
    setRevealedPuzzles((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Board Games</h1>
          <p className="text-muted mb-12">Strategy, Training, and Dissections</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {boardGames.map((game, i) => {
            const isExternal = game.status === "external";
            const isComingSoon = game.status === "coming-soon";

            const cardContent = (
                  <motion.div
                    whileHover={isComingSoon ? {} : { scale: 1.03, y: -4 }}
                    className={`group flex flex-col rounded-xl overflow-hidden bg-surface border border-border transition-all ${
                      isComingSoon ? "opacity-60" : "hover:border-accent/30 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
                    }`}
                  >
                    <div className="relative w-full h-40 overflow-hidden">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {isComingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="px-3 py-1 rounded-full bg-muted/20 text-sm text-foreground border border-border">
                            Coming Soon
                          </span>
                        </div>
                      )}
                      {isExternal && (
                        <div className="absolute top-2 right-2">
                          <ExternalLink className="w-4 h-4 text-white/70" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{game.title}</h3>
                      <p className="text-sm text-muted mt-1">{game.subtitle}</p>
                    </div>
                  </motion.div>
            );

            return (
              <ScrollReveal key={game.title} delay={i * 0.05}>
                {isComingSoon ? (
                  <div>{cardContent}</div>
                ) : isExternal ? (
                  <a href={game.href} target="_blank" rel="noopener noreferrer">{cardContent}</a>
                ) : (
                  <Link href={game.href}>{cardContent}</Link>
                )}
              </ScrollReveal>
            );
          })}
        </div>

        {/* Brain Teasers */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-8">Brain Teasers</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {brainTeasers.map((puzzle, i) => (
            <ScrollReveal key={puzzle.title} delay={i * 0.05}>
              <div
                className="rounded-xl overflow-hidden bg-surface border border-border hover:border-accent/20 transition-all"
                onClick={() => togglePuzzle(i)}
                role="button"
                tabIndex={0}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={revealedPuzzles.has(i) ? puzzle.solutionImage : puzzle.puzzleImage}
                    alt={puzzle.title}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-sm">{puzzle.title}</h3>
                  <p className="text-xs text-accent mt-1">
                    {revealedPuzzles.has(i) ? "Click to hide solution" : "Click to reveal solution"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
