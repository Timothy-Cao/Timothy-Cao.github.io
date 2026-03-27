"use client";

import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { videoRecommendations, videosIntro } from "@/data/videos";

export default function VideosPage() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{videosIntro.title}</h1>
          <p className="text-muted mb-12 max-w-2xl leading-relaxed">
            {videosIntro.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoRecommendations.map((video, i) => (
            <ScrollReveal key={video.youtubeId} delay={i * 0.03}>
              <div className="rounded-xl overflow-hidden bg-surface border border-border hover:border-accent/20 transition-all">
                <div className="w-full aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{video.title}</h3>
                  <p className="text-sm text-accent/70">{video.creator}</p>
                  {video.description && (
                    <p className="text-sm text-muted mt-2">{video.description}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
