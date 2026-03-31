"use client";

import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import PianoFocusCards from "@/components/ui/piano-carousel";
import { pianoYouTubers } from "@/data/piano";

export default function PianoPage() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Piano YouTubers</h1>
          <p className="text-muted mb-12">My recommendations</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <PianoFocusCards youtubers={pianoYouTubers} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
