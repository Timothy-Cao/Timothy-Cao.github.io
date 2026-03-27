"use client";

import { useState } from "react";
import Image from "next/image";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Accordion from "@/components/ui/accordion";
import { mathArtSections } from "@/data/math-art";
import { ExternalLink } from "lucide-react";

export default function MathArtPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Mathematical Art</h1>
          <p className="text-muted mb-12">
            How bored have you gotten in math class?
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {mathArtSections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.03}>
              <Accordion
                title={section.title}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <p className="text-muted leading-relaxed mb-4">{section.description}</p>

                {openIndex === i && section.type === "iframe" && section.content && (
                  <iframe
                    src={section.content}
                    title={section.title}
                    className="w-full h-[400px] rounded-lg border border-border"
                    style={{ border: "none" }}
                    loading="lazy"
                  />
                )}

                {openIndex === i && section.type === "video" && section.content && (
                  <iframe
                    src={section.content}
                    title={section.title}
                    className="w-full aspect-video rounded-lg"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                )}

                {section.type === "images" && section.images && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {section.images.map((img) => (
                      <div key={img.src} className="text-center">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          width={300}
                          height={200}
                          className="rounded-lg w-full h-auto"
                          unoptimized
                        />
                        <p className="text-xs text-muted mt-2">{img.caption}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "link" && section.link && (
                  <a
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    Visit <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </Accordion>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
