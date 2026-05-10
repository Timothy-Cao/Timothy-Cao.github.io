"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Music2, Pause, Play, SkipBack, SkipForward, Sparkles, Star } from "lucide-react";
import AudioVisualizer, { type AudioGraph } from "@/components/ui/audio-visualizer";
import type { Composition } from "@/data/music";

interface AudioWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

const CATEGORY_BADGE: Record<NonNullable<Composition["category"]>, string | null> = {
  original: null,
  "ai-played": null,
  "ai-generated": "AI generated",
};

const CATEGORY_NOTICE: Record<NonNullable<Composition["category"]>, string | null> = {
  original: null,
  "ai-played": null,
  "ai-generated": null,
};

interface MusicCarouselProps {
  compositions: Composition[];
  volume: number;
  /** Rendered above the player inside the main column. Lets the page
   *  header share its row with the right-hand sidebar. */
  header?: ReactNode;
}

function getAudioContextConstructor() {
  return window.AudioContext ?? (window as AudioWindow).webkitAudioContext ?? null;
}

export default function MusicCarousel({ compositions, volume, header }: MusicCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioGraphRef = useRef<AudioGraph | null>(null);
  const shouldResumeRef = useRef(false);
  const id = useId();

  const total = compositions.length;
  const comp = compositions[current] ?? compositions[0];
  const badge = comp ? CATEGORY_BADGE[comp.category] : null;
  const notice = comp ? CATEGORY_NOTICE[comp.category] : null;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Adjust state during render when the compositions prop changes (e.g.,
  // switching Originals -> AI on /music). React's "previous props" pattern
  // — setState calls during render are fine when guarded by the prev-prop
  // check; the existing audio effect below handles pausing via audio.load()
  // when `current` changes.
  const [prevCompositions, setPrevCompositions] = useState(compositions);
  if (compositions !== prevCompositions) {
    setPrevCompositions(compositions);
    setCurrent(0);
    setCurrentTime(0);
    setDuration(0);
  }

  // Refs can't be mutated in render, so defer to an effect.
  useEffect(() => {
    shouldResumeRef.current = false;
  }, [compositions]);

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;
    if (audioGraphRef.current) return audioGraphRef.current;

    const AudioContextConstructor = getAudioContextConstructor();
    if (!AudioContextConstructor) return null;

    try {
      const context = new AudioContextConstructor();
      const analyser = context.createAnalyser();
      const source = context.createMediaElementSource(audio);
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.86;
      source.connect(analyser);
      analyser.connect(context.destination);
      audioGraphRef.current = {
        analyser,
        context,
        data: new Uint8Array(analyser.frequencyBinCount),
      };
    } catch {
      return null;
    }

    return audioGraphRef.current;
  }, []);

  useEffect(() => {
    return () => {
      audioGraphRef.current?.context.close().catch(() => undefined);
      audioGraphRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !comp) return;

    audio.load();

    if (shouldResumeRef.current) {
      ensureAudioGraph()?.context.resume().catch(() => undefined);
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    shouldResumeRef.current = false;
  }, [current, comp, ensureAudioGraph]);

  const goTo = useCallback((index: number, resume = playing) => {
    if (total === 0) return;
    const nextIndex = Math.max(0, Math.min(index, total - 1));
    if (nextIndex === current) return;

    shouldResumeRef.current = resume;
    setCurrentTime(0);
    setDuration(0);
    setCurrent(nextIndex);
  }, [current, playing, total]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    ensureAudioGraph()?.context.resume().catch(() => undefined);
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const seek = (value: string) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleEnded = () => {
    if (current < total - 1) {
      shouldResumeRef.current = true;
      setCurrentTime(0);
      setDuration(0);
      setCurrent((index) => index + 1);
      return;
    }

    setPlaying(false);
  };

  if (!comp) {
    return (
      <div className="rounded-lg border border-border p-6 text-sm text-muted">
        No compositions are available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <audio
        ref={audioRef}
        src={comp.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={handleEnded}
      />

      <div>
        {header}
        <section className="relative overflow-hidden rounded-lg border border-border bg-surface p-6 md:p-8">
          <AudioVisualizer audioGraphRef={audioGraphRef} category={comp.category} playing={playing} trackKey={comp.src} />

        <div className="relative z-10 mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
              <Music2 className="h-4 w-4" />
              Now Playing
            </p>
            <h2 className="flex flex-wrap items-center gap-3 text-2xl font-bold md:text-3xl">
              {comp.title}
              {comp.isFavorite && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
              {badge && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                  <Sparkles className="h-3 w-3" />
                  {badge}
                </span>
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">{comp.description}</p>
            {notice && (
              <p className="mt-3 max-w-2xl text-xs italic text-muted/80">{notice}</p>
            )}
          </div>
          <span className="shrink-0 font-mono text-sm text-muted">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous track"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/40 bg-accent/15 text-accent transition-colors hover:bg-accent/20"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current pl-0.5" />}
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next track"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <div className="ml-2 flex-1">
            <input
              id={`${id}-progress`}
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={duration ? currentTime : 0}
              onChange={(event) => seek(event.target.value)}
              disabled={!duration}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent disabled:cursor-not-allowed"
              aria-label="Track progress"
            />
            <div className="mt-2 flex justify-between font-mono text-xs text-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        </section>
      </div>

      <section className="lg:relative">
        <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col">
        {/* Spacer above the playlist block: pushes the title+list to the
            bottom when the list doesn't fill the column. */}
        <div aria-hidden="true" className="hidden lg:block lg:flex-1 lg:min-h-0" />

        <div className="lg:flex lg:flex-col lg:min-h-0 lg:max-h-full">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Playlist</h2>
          <span className="text-xs text-muted">{total} tracks</span>
        </div>

        <div className="max-h-[34rem] lg:max-h-none lg:flex-1 lg:min-h-0 space-y-2 overflow-y-auto pr-1">
          {compositions.map((track, index) => {
            const selected = index === current;
            const trackBadge = CATEGORY_BADGE[track.category];
            return (
              <button
                key={track.src}
                type="button"
                onClick={() => goTo(index)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                  selected
                    ? "border-accent/35 bg-accent/10"
                    : "border-border bg-surface hover:border-accent/25"
                }`}
                aria-current={selected ? "true" : undefined}
              >
                <span className="w-7 shrink-0 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <span className="truncate">{track.title}</span>
                    {track.isFavorite && <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />}
                    {trackBadge && (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/25 bg-accent/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent/80"
                        title={trackBadge}
                      >
                        <Sparkles className="h-2.5 w-2.5" />
                        AI
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted">{track.description}</span>
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted">
                  {selected && playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current pl-0.5" />}
                </span>
              </button>
            );
          })}
        </div>
        </div>
        </div>
      </section>
    </div>
  );
}
