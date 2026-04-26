"use client";

import { useMemo, useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import MusicCarousel from "@/components/ui/music-carousel";
import { compositions, type Composition, type CompositionCategory } from "@/data/music";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

type TabId = CompositionCategory;

interface Tab {
  id: TabId;
  label: string;
  notice?: string;
  quote?: string;
}

const TABS: Tab[] = [
  { id: "original", label: "Fully Mine" },
  {
    id: "ai-played",
    label: "Mine, AI Played",
    notice: "These are pieces I wrote, played back by AI. The composition is mine; the performance is synthesized.",
  },
  {
    id: "ai-generated",
    label: "AI Generated",
    notice: "These were fully AI generated, with only minor musical input from me.",
    quote: "Wow! AI generated music is getting a little too good... I feel like they play my pieces sound so beautifully. Even the music generated entirely on it's own sounds good. Scary!",
  },
];

function sortByFavorite(items: Composition[]) {
  const favorites = items.filter((c) => c.isFavorite);
  const others = items.filter((c) => !c.isFavorite);
  return [...favorites, ...others];
}

export default function MusicPage() {
  const [volume, setVolume] = useState(0.5);
  const [activeTab, setActiveTab] = useState<TabId>("original");

  const grouped = useMemo(() => {
    return {
      original: sortByFavorite(compositions.filter((c) => c.category === "original")),
      "ai-played": sortByFavorite(compositions.filter((c) => c.category === "ai-played")),
      "ai-generated": sortByFavorite(compositions.filter((c) => c.category === "ai-generated")),
    } satisfies Record<TabId, Composition[]>;
  }, []);

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const items = grouped[activeTab];

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Composition</h1>
          <p className="text-muted mb-8">
            Disclaimer: I am not liable to headaches induced by my songs
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-3 mb-8 max-w-xs">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
              className="text-muted hover:text-foreground transition-colors"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none bg-white/10 accent-accent cursor-pointer"
              aria-label="Volume"
            />
            <span className="text-xs text-muted font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            role="tablist"
            aria-label="Composition categories"
            className="mb-6 flex flex-wrap gap-2 border-b border-border"
          >
            {TABS.map((t) => {
              const selected = t.id === activeTab;
              const count = grouped[t.id].length;
              const showSparkle = t.id !== "original";
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative -mb-px flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {showSparkle && <Sparkles className="h-3.5 w-3.5 text-accent/70" />}
                  <span>{t.label}</span>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-muted">{count}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {tab.notice && (
          <ScrollReveal delay={0.18}>
            <div className="mb-4 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-muted">
              <p className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{tab.notice}</span>
              </p>
            </div>
          </ScrollReveal>
        )}

        {tab.quote && (
          <ScrollReveal delay={0.2}>
            <blockquote className="mb-6 rounded-lg border-l-2 border-accent/50 bg-surface px-4 py-3 text-sm italic text-muted">
              &ldquo;{tab.quote}&rdquo;
            </blockquote>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.25}>
          <MusicCarousel key={activeTab} compositions={items} volume={volume} />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
