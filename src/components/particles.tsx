"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
}

interface HexNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  neighbors: number[];
  pulseTime: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseMovingRef = useRef(false);
  const mouseMoveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPulseRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const matrixDropsRef = useRef<MatrixDrop[]>([]);
  const hexNodesRef = useRef<HexNode[]>([]);
  const animationRef = useRef<number>(0);
  const pulseTimeRef = useRef(0);
  const wavesRef = useRef<{ ox: number; oy: number; time: number }[]>([]);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 12000), 120);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const initMatrixDrops = useCallback((width: number, height: number) => {
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: MatrixDrop[] = [];
    for (let i = 0; i < columns; i++) {
      const length = Math.floor(Math.random() * 15) + 5;
      const chars: string[] = [];
      for (let j = 0; j < length; j++) {
        chars.push(Math.random() > 0.5 ? "1" : "0");
      }
      drops.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: Math.random() * 1.5 + 0.5,
        chars,
        length,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    matrixDropsRef.current = drops;
  }, []);

  const initHexGrid = useCallback((width: number, height: number) => {
    const nodes: HexNode[] = [];
    const hexSize = 80;
    const hexH = hexSize * Math.sqrt(3);
    const cols = Math.ceil(width / (hexSize * 1.5)) + 2;
    const rows = Math.ceil(height / hexH) + 2;

    // Create nodes with organic randomization
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : hexSize * 0.75;
        const x = col * hexSize * 1.5 + offsetX + (Math.random() - 0.5) * hexSize * 0.4;
        const y = row * hexH * 0.5 + (Math.random() - 0.5) * hexSize * 0.4;
        nodes.push({ x, y, baseX: x, baseY: y, neighbors: [], pulseTime: -1 });
      }
    }

    // Find neighbors
    const neighborDist = hexSize * 1.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < neighborDist) {
          nodes[i].neighbors.push(j);
          nodes[j].neighbors.push(i);
        }
      }
    }

    hexNodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getAccentHex = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();

    const getAccentRGB = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) || 0;
      const g = parseInt(hex.slice(3, 5), 16) || 0;
      const b = parseInt(hex.slice(5, 7), 16) || 0;
      return { r, g, b };
    };

    const getMode = () => {
      const hex = getAccentHex().toLowerCase();
      if (hex === "#00ff41") return "matrix";
      if (hex === "#ff1744") return "hex";
      return "particles";
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
      initMatrixDrops(canvas.width, canvas.height);
      initHexGrid(canvas.width, canvas.height);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseMovingRef.current = true;
      if (mouseMoveTimerRef.current) clearTimeout(mouseMoveTimerRef.current);
      mouseMoveTimerRef.current = setTimeout(() => {
        mouseMovingRef.current = false;
      }, 100);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    const fontSize = 16;

    const animateMatrix = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      const drops = matrixDropsRef.current;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        drop.y += drop.speed;

        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * fontSize;
          if (charY < -fontSize || charY > canvas.height + fontSize) continue;

          const fade = j === 0 ? 1 : Math.max(0, 1 - j / drop.length);
          const alpha = drop.opacity * fade;

          if (j === 0) {
            ctx.fillStyle = `rgba(180, 255, 180, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          }

          ctx.fillText(drop.chars[j], drop.x, charY);

          if (Math.random() < 0.01) {
            drop.chars[j] = Math.random() > 0.5 ? "1" : "0";
          }
        }

        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = Math.random() * -200;
          drop.speed = Math.random() * 1.5 + 0.5;
          drop.opacity = Math.random() * 0.4 + 0.1;
        }
      }
    };

    const animateHex = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = hexNodesRef.current;
      const mouse = mouseRef.current;
      pulseTimeRef.current += 0.016;
      const now = pulseTimeRef.current;

      // Spawn a new ripple wave when mouse moves, max once per 1s
      if (mouseMovingRef.current && now - lastPulseRef.current > 1.0) {
        wavesRef.current.push({ ox: mouse.x, oy: mouse.y, time: now });
        lastPulseRef.current = now;
      }

      // Ripple wave settings
      const waveSpeed = 200; // pixels per second
      const waveWidth = 80; // width of the bright ring
      const waveDuration = 3; // seconds until wave fully fades

      // Remove expired waves
      wavesRef.current = wavesRef.current.filter(w => now - w.time < waveDuration);

      // Mouse influence — shift nodes slightly toward mouse
      const mouseInfluenceRadius = 250;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouse.x - n.baseX;
        const dy = mouse.y - n.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluenceRadius && dist > 0) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          n.x = n.baseX + (dx / dist) * force * 12;
          n.y = n.baseY + (dy / dist) * force * 12;
        } else {
          n.x += (n.baseX - n.x) * 0.03;
          n.y += (n.baseY - n.y) * 0.03;
        }
      }

      // Helper: compute wave brightness for a point
      const getWaveBrightness = (px: number, py: number) => {
        let brightness = 0;
        for (const wave of wavesRef.current) {
          const elapsed = now - wave.time;
          const radius = elapsed * waveSpeed;
          const dist = Math.sqrt((px - wave.ox) ** 2 + (py - wave.oy) ** 2);
          const delta = Math.abs(dist - radius);
          if (delta < waveWidth) {
            const ringBrightness = 1 - delta / waveWidth;
            const timeFade = Math.max(0, 1 - elapsed / waveDuration);
            brightness = Math.max(brightness, ringBrightness * timeFade);
          }
        }
        return brightness;
      };

      // Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const ni of n.neighbors) {
          if (ni <= i) continue;
          const n2 = nodes[ni];

          let alpha = 0.06;

          // Wave ripple brightness
          const midX = (n.x + n2.x) / 2;
          const midY = (n.y + n2.y) / 2;
          alpha += getWaveBrightness(midX, midY) * 0.7;

          // Mouse proximity glow
          const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
          if (mouseDist < mouseInfluenceRadius) {
            alpha += (1 - mouseDist / mouseInfluenceRadius) * 0.15;
          }

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(255, 23, 68, ${Math.min(alpha, 0.6)})`;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let alpha = 0.08;
        let size = 1.5;

        const wavePulse = getWaveBrightness(n.x, n.y);
        alpha += wavePulse * 0.9;
        size += wavePulse * 3;

        const mouseDist = Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2);
        if (mouseDist < mouseInfluenceRadius) {
          const proximity = 1 - mouseDist / mouseInfluenceRadius;
          alpha += proximity * 0.3;
          size += proximity * 1.5;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 23, 68, ${Math.min(alpha, 0.9)})`;
        ctx.fill();
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const hex = getAccentHex();
      const { r, g, b } = getAccentRGB(hex);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.15 * (1 - cdist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    let lastMode = getMode();

    const animate = () => {
      const mode = getMode();

      if (mode !== lastMode) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lastMode = mode;
      }

      if (mode === "matrix") {
        animateMatrix();
      } else if (mode === "hex") {
        animateHex();
      } else {
        animateParticles();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (mouseMoveTimerRef.current) clearTimeout(mouseMoveTimerRef.current);
    };
  }, [initParticles, initMatrixDrops, initHexGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
