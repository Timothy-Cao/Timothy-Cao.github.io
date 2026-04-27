"use client";

import { useCallback, useEffect, useMemo, useRef, type RefObject } from "react";
import type { CompositionCategory } from "@/data/music";

export interface AudioGraph {
  analyser: AnalyserNode;
  context: AudioContext;
  data: Uint8Array<ArrayBuffer>;
}

interface AudioVisualizerProps {
  audioGraphRef: RefObject<AudioGraph | null>;
  category: CompositionCategory;
  playing: boolean;
  trackKey: string;
}

const VISUALIZER_PALETTE: Record<CompositionCategory, { glow: string; fill: string; fillSoft: string; warm: string }> = {
  original: {
    glow: "rgba(0, 229, 255, 0.13)",
    fill: "rgba(0, 229, 255, 0.23)",
    fillSoft: "rgba(255, 255, 255, 0.035)",
    warm: "rgba(255, 214, 125, 0.18)",
  },
  "ai-played": {
    glow: "rgba(132, 235, 190, 0.12)",
    fill: "rgba(132, 235, 190, 0.2)",
    fillSoft: "rgba(0, 229, 255, 0.035)",
    warm: "rgba(255, 214, 125, 0.16)",
  },
  "ai-generated": {
    glow: "rgba(190, 165, 255, 0.13)",
    fill: "rgba(190, 165, 255, 0.22)",
    fillSoft: "rgba(0, 229, 255, 0.035)",
    warm: "rgba(0, 229, 255, 0.14)",
  },
};

function hashTrackKey(trackKey: string) {
  let hash = 0;
  for (let index = 0; index < trackKey.length; index += 1) {
    hash = (hash * 31 + trackKey.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

export default function AudioVisualizer({ audioGraphRef, category, playing, trackKey }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const palette = VISUALIZER_PALETTE[category];
  const seed = useMemo(() => hashTrackKey(trackKey), [trackKey]);

  const drawFrame = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (!ctx || width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = Math.floor(width * dpr);
    const nextHeight = Math.floor(height * dpr);
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const graph = audioGraphRef.current;
    const liveGraph = playing && graph?.context.state !== "closed" ? graph : null;
    const visualData = liveGraph?.data ?? null;
    if (liveGraph) {
      liveGraph.analyser.getByteFrequencyData(liveGraph.data);
    }

    let energy = 0;
    if (visualData) {
      const sampleCount = Math.min(24, visualData.length);
      for (let index = 0; index < sampleCount; index += 1) energy += visualData[index] / 255;
      energy /= sampleCount;
    } else {
      energy = 0.05 + Math.sin(time * 0.0008 + seed) * 0.015;
    }

    const background = ctx.createRadialGradient(width * 0.74, height * 0.88, 0, width * 0.74, height * 0.88, width * 0.72);
    background.addColorStop(0, palette.glow);
    background.addColorStop(0.48, "rgba(255, 255, 255, 0.025)");
    background.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const fade = ctx.createLinearGradient(0, height * 0.18, 0, height);
    fade.addColorStop(0, "rgba(0, 0, 0, 0)");
    fade.addColorStop(1, "rgba(0, 0, 0, 0.18)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, width, height);

    const barCount = 52;
    const margin = 18;
    const usableWidth = width - margin * 2;
    const step = usableWidth / barCount;
    const barWidth = Math.max(1.4, Math.min(5, step * 0.38));
    const baseline = height + 10;
    const maxBarHeight = height * 0.52;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (let index = 0; index < barCount; index += 1) {
      const dataIndex = visualData ? Math.floor((index / barCount) * visualData.length) : 0;
      const live = visualData ? visualData[dataIndex] / 255 : 0;
      const drift = Math.sin(time * 0.0011 + index * 0.46 + seed * 0.01);
      const ripple = Math.cos(time * 0.0008 + index * 0.27 + seed * 0.02);
      const level = visualData
        ? Math.max(live * 0.76, 0.035 + Math.max(0, drift) * 0.025)
        : 0.035 + (drift + 1) * 0.012;
      const edgeFade = Math.sin((Math.PI * index) / (barCount - 1));
      const barHeight = (8 + level * maxBarHeight + energy * Math.max(0, ripple) * 7) * (0.32 + edgeFade * 0.68);
      const x = margin + index * step + (step - barWidth) / 2;
      const y = baseline - barHeight;
      const barGradient = ctx.createLinearGradient(0, y, 0, baseline);
      barGradient.addColorStop(0, palette.warm);
      barGradient.addColorStop(0.5, palette.fill);
      barGradient.addColorStop(1, palette.fillSoft);
      ctx.fillStyle = barGradient;
      drawPill(ctx, x, y, barWidth, barHeight, 999);
    }

    ctx.restore();

    ctx.fillStyle = `rgba(255, 255, 255, ${0.04 + Math.min(energy, 0.5) * 0.07})`;
    ctx.beginPath();
    ctx.arc(width - 18, height - 18, 1.8 + energy * 3, 0, Math.PI * 2);
    ctx.fill();
  }, [audioGraphRef, palette, playing, seed]);

  useEffect(() => {
    const tick = (time: number) => {
      drawFrame(time);
      animationRef.current = window.requestAnimationFrame(tick);
    };

    animationRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, [drawFrame]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}
