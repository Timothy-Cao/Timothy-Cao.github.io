"use client";

import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/ui/page-header";
import ScrollReveal from "@/components/ui/scroll-reveal";
import PianoFocusCards from "@/components/ui/piano-carousel";
import { pianoYouTubers } from "@/data/piano";

export default function PianoPage() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <PageHeader
          eyebrow="Music"
          title="Piano YouTubers"
          description="My recommendations — channels worth a long coffee."
        />

        <ScrollReveal>
          <PianoFocusCards youtubers={pianoYouTubers} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
