"use client";

import { useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Accordion from "@/components/ui/accordion";
import { pianoYouTubers } from "@/data/piano";

export default function PianoPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Piano YouTubers</h1>
          <p className="text-muted mb-12">
            My secret piano page... Here&apos;s some of my favourite piano youtubers...
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {pianoYouTubers.map((yt) => (
            <ScrollReveal key={yt.handle}>
              <Accordion
                title={
                  <span className="flex items-center gap-3">
                    {yt.name}
                    <a
                      href={yt.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent/70 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {yt.handle}
                    </a>
                  </span>
                }
                isOpen={openId === yt.handle}
                onToggle={() => setOpenId(openId === yt.handle ? null : yt.handle)}
              >
                {yt.description && (
                  <p className="text-muted leading-relaxed mb-4">{yt.description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {yt.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin">
                  {yt.videoIds.map((videoId, j) => (
                    <div
                      key={`${yt.handle}-${j}`}
                      className="flex-none w-72 rounded-lg overflow-hidden bg-background"
                    >
                      {openId === yt.handle && (
                        <iframe
                          className="w-full aspect-video"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`${yt.name} video ${j + 1}`}
                          style={{ border: "none" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Accordion>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
