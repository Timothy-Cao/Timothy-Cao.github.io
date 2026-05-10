"use client";

import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/ui/page-header";
import ScrollReveal from "@/components/ui/scroll-reveal";
import VideoCarousel from "@/components/ui/video-carousel";
import { videoRecommendations, videosIntro } from "@/data/videos";

export default function VideosPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <PageHeader
          eyebrow="Visual"
          title={videosIntro.title}
          description={videosIntro.description}
        />

        <ScrollReveal>
          <VideoCarousel videos={videoRecommendations} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
