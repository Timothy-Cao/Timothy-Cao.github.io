"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Lightbox from "@/components/ui/lightbox";
import { GALLERY_IMAGE_COUNT } from "@/data/playground";

const images = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) => `/assets/media/Photo Gallery/${i + 1}.jpg`);

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gallery</h1>
          <p className="text-muted mb-12">Looking back on 2024</p>
        </ScrollReveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-lg group border border-border hover:border-accent/30 transition-all duration-300"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Gallery photo ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                unoptimized
              />
            </div>
          ))}
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              images={images}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNext={() => setLightboxIndex((prev) => (prev! + 1) % images.length)}
              onPrev={() => setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
