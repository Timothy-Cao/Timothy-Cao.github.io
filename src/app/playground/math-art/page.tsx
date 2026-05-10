"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/ui/page-header";
import { mathArtSections } from "@/data/math-art";

export default function MathArtPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = mathArtSections.length;
  const section = mathArtSections[index];

  const goTo = (next: number) => {
    if (next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(((next % total) + total) % total);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <PageHeader
          eyebrow="Learn"
          title="Mathematical Art"
          description="How bored have you gotten in math class?"
        />

        {/* Tab strip — clickable section titles */}
        <div className="relative mb-6 -mx-2 overflow-x-auto pb-2">
          <div role="tablist" className="flex items-center gap-2 px-2">
            {mathArtSections.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goTo(i)}
                  className={`relative shrink-0 rounded-full border px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/[0.02] text-muted hover:border-accent/25 hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Page card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-8"
            >
              {/* Page meta */}
              <div className="mb-3 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                <span className="text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block h-px flex-1 bg-border" />
                <span>{String(total).padStart(2, "0")}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm md:text-base leading-relaxed text-muted">
                {section.description}
              </p>

              {/* Content */}
              {section.type === "iframe" && section.content && (
                <iframe
                  src={section.content}
                  title={section.title}
                  className="mt-6 w-full h-[420px] rounded-lg border border-border"
                  loading="lazy"
                />
              )}

              {section.type === "video" && section.content && (
                <iframe
                  src={section.content}
                  title={section.title}
                  className="mt-6 w-full aspect-video rounded-lg border border-border"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              )}

              {section.type === "images" && section.images && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {section.images.map((img) => (
                    <figure key={img.src} className="text-center">
                      <Image
                        src={img.src}
                        alt={img.caption}
                        width={300}
                        height={200}
                        className="rounded-lg w-full h-auto border border-border"
                        unoptimized
                      />
                      <figcaption className="text-xs text-muted mt-2">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {section.type === "link" && section.link && (
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  Visit
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          {/* Dot indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {mathArtSections.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to section ${i + 1}`}
                  className={`rounded-full transition-all ${
                    active
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-white/15 hover:bg-white/30"
                  }`}
                />
              );
            })}
          </div>

          <span className="sm:hidden text-xs font-mono text-muted">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={next}
            disabled={index === total - 1}
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next section"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted/70 hidden md:block">
          Use ← → arrow keys to flip between pages
        </p>
      </div>
    </PageTransition>
  );
}
