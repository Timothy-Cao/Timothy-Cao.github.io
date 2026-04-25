"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface LiteYouTubePlayerProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export default function LiteYouTubePlayer({ youtubeId, title, className = "" }: LiteYouTubePlayerProps) {
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  const loaded = loadedId === youtubeId;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg bg-black ${className}`}>
      {loaded ? (
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoadedId(youtubeId)}
          className="group relative h-full w-full overflow-hidden text-left"
          aria-label={`Load video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 fill-current pl-1" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/85">
            Load video
          </span>
        </button>
      )}

      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/75 backdrop-blur transition-colors hover:text-white"
        aria-label={`Open ${title} on YouTube`}
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
