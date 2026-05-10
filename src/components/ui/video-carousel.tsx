"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search, Video } from "lucide-react";
import type { VideoRecommendation } from "@/data/videos";
import LiteYouTubePlayer from "@/components/ui/lite-youtube-player";

interface VideoCarouselProps {
  videos: VideoRecommendation[];
  /** Rendered above the player inside the main column. Used to keep the
   *  page header sharing a row with the right-hand library sidebar. */
  header?: ReactNode;
}

function matchesQuery(video: VideoRecommendation, query: string) {
  const haystack = `${video.title} ${video.creator} ${video.description}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function VideoCarousel({ videos, header }: VideoCarouselProps) {
  const [selectedId, setSelectedId] = useState(videos[0]?.youtubeId ?? "");
  const [query, setQuery] = useState("");

  const selected = videos.find((video) => video.youtubeId === selectedId) ?? videos[0];
  const filtered = useMemo(
    () => videos.filter((video) => matchesQuery(video, query.trim())),
    [query, videos],
  );

  if (!selected) {
    return (
      <div className="rounded-lg border border-border p-6 text-sm text-muted">
        No video recommendations are available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section>
        {header}
        <LiteYouTubePlayer key={selected.youtubeId} youtubeId={selected.youtubeId} title={selected.title} />

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-accent">
            {selected.creator}
          </span>
          <span className="text-muted">
            {String(videos.findIndex((video) => video.youtubeId === selected.youtubeId) + 1).padStart(2, "0")} /{" "}
            {String(videos.length).padStart(2, "0")}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold md:text-3xl">{selected.title}</h2>
        {selected.description ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted md:text-base">{selected.description}</p>
        ) : (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted md:text-base">
            A saved recommendation from {selected.creator}.
          </p>
        )}
      </section>

      <aside className="lg:relative">
        <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
            <Video className="h-4 w-4" />
            Library
          </h2>
          <span className="text-xs text-muted">{filtered.length} shown</span>
        </div>

        <label htmlFor="video-search" className="sr-only">
          Search videos
        </label>
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="video-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, creator, note"
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/40"
          />
        </div>

        <div className="max-h-[36rem] lg:max-h-none lg:flex-1 lg:min-h-0 space-y-2 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((video) => {
              const active = video.youtubeId === selected.youtubeId;
              return (
                <button
                  key={video.youtubeId}
                  type="button"
                  onClick={() => setSelectedId(video.youtubeId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    active
                      ? "border-accent/35 bg-accent/10"
                      : "border-border bg-surface hover:border-accent/25"
                  }`}
                  aria-current={active ? "true" : undefined}
                >
                  <span className="block text-xs text-accent/80">{video.creator}</span>
                  <span className="mt-1 block font-medium text-foreground">{video.title}</span>
                  {video.description && (
                    <span className="mt-1 block truncate text-xs text-muted">{video.description}</span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="rounded-lg border border-border p-4 text-sm text-muted">
              No videos match that search.
            </div>
          )}
        </div>
        </div>
      </aside>
    </div>
  );
}
