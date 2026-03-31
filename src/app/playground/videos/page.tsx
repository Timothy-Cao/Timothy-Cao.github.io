"use client";

import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import VideoCarousel from "@/components/ui/video-carousel";
import { videoRecommendations, videosIntro } from "@/data/videos";

export default function VideosPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{videosIntro.title}</h1>
          <p className="text-muted mb-12 max-w-2xl leading-relaxed">
            {videosIntro.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <VideoCarousel videos={videoRecommendations} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
