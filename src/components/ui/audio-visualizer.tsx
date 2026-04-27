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

const VISUALIZER_PALETTE: Record<CompositionCategory, { line: string; glow: string; fill: string; fillSoft: string; warm: string }> = {
  original: {
    line: "rgba(0, 229, 255, 0.86)",
    glow: "rgba(0, 229, 255, 0.22)",
    fill: "rgba(0, 229, 255, 0.48)",
    fillSoft: "rgba(255, 255, 255, 0.08)",
    warm: "rgba(255, 214, 125, 0.5)",
  },
  "ai-played": {
    line: "rgba(132, 235, 190, 0.84)",
    glow: "rgba(132, 235, 190, 0.18)",
    fill: "rgba(132, 235, 190, 0.42)",
    fillSoft: "rgba(0, 229, 255, 0.08)",
    warm: "rgba(255, 214, 125, 0.46)",
  },
  "ai-generated": {
    line: "rgba(190, 165, 255, 0.84)",
    glow: "rgba(190, 165, 255, 0.2)",
    fill: "rgba(190, 165, 255, 0.44)",
    fillSoft: "rgba(0, 229, 255, 0.08)",
    warm: "rgba(0, 229, 255, 0.42)",
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

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "rgba(255, 255, 255, 0.035)");
    background.addColorStop(0.5, palette.glow);
    background.addColorStop(1, "rgba(0, 0, 0, 0.18)");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let row = 1; row <= 3; row += 1) {
      const y = (height / 4) * row;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const barCount = 42;
    const margin = 14;
    const usableWidth = width - margin * 2;
    const step = usableWidth / barCount;
    const barWidth = Math.max(2, Math.min(7, step * 0.46));
    const centerY = height * 0.56;

    for (let index = 0; index < barCount; index += 1) {
      const dataIndex = visualData ? Math.floor((index / barCount) * visualData.length) : 0;
      const live = visualData ? visualData[dataIndex] / 255 : 0;
      const drift = Math.sin(time * 0.0016 + index * 0.58 + seed * 0.01);
      const ripple = Math.cos(time * 0.001 + index * 0.33 + seed * 0.02);
      const level = visualData
        ? Math.max(live, 0.04 + Math.max(0, drift) * 0.04)
        : 0.035 + (drift + 1) * 0.018;
      const barHeight = 8 + level * height * 0.6 + energy * Math.max(0, ripple) * 9;
      const x = margin + index * step + (step - barWidth) / 2;
      const y = centerY - barHeight / 2;
      const barGradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      barGradient.addColorStop(0, palette.warm);
      barGradient.addColorStop(0.5, palette.fill);
      barGradient.addColorStop(1, palette.fillSoft);
      ctx.fillStyle = barGradient;
      drawPill(ctx, x, y, barWidth, barHeight, 999);
    }

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowColor = palette.line;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const points = 90;
    for (let index = 0; index <= points; index += 1) {
      const x = (width / points) * index;
      const bin = visualData ? visualData[Math.floor((index / points) * visualData.length)] / 255 : 0;
      const pulse = Math.sin(time * 0.0018 + index * 0.28 + seed * 0.03);
      const counterPulse = Math.cos(time * 0.0011 + index * 0.17 + seed * 0.04);
      const amplitude = 7 + energy * 18 + (visualData ? bin * 9 : 0);
      const y = centerY + pulse * amplitude + counterPulse * 3;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = `rgba(255, 255, 255, ${0.12 + Math.min(energy, 0.5) * 0.18})`;
    ctx.beginPath();
    ctx.arc(width - 18, 18, 2.5 + energy * 5, 0, Math.PI * 2);
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
    <div className="mb-8 h-28 overflow-hidden rounded-lg border border-white/10 bg-black/20 md:h-32">
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}
