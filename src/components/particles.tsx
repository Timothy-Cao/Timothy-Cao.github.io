"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number; // 0 = fresh (blue), 0→1 = blue→purple, >1 = fading out
  dead: boolean;
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
  const nextAutoPulseRef = useRef(0);
  const cyberAttractRef = useRef(true);

  const initParticles = useCallback((width: number, height: number) => {
    // More particles — denser field
    const count = Math.min(Math.floor((width * height) / 7000), 200);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        life: 0,
        dead: false,
      });
    }
    particlesRef.current = particles;
  }, []);

  const initMatrixDrops = useCallback((width: number, height: number) => {
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops: MatrixDrop[] = [];
    for (let i = 0; i < columns; i++) {
      const length = Math.floor(Math.random() * 20) + 5;
      const chars: string[] = [];
      for (let j = 0; j < length; j++) {
        chars.push(Math.random() > 0.5 ? "1" : "0");
      }
      drops.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: Math.random() * 2.0 + 0.5,
        chars,
        length,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }
    matrixDropsRef.current = drops;
  }, []);

  const initHexGrid = useCallback((width: number, height: number) => {
    const nodes: HexNode[] = [];
    const hexSize = 60;
    const hexH = hexSize * Math.sqrt(3);
    const cols = Math.ceil(width / (hexSize * 1.5)) + 5;
    const rows = Math.ceil(height / hexH) + 5;

    for (let row = -3; row < rows; row++) {
      for (let col = -3; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : hexSize * 0.75;
        const x = col * hexSize * 1.5 + offsetX + (Math.random() - 0.5) * hexSize * 0.3;
        const y = row * hexH * 0.5 + (Math.random() - 0.5) * hexSize * 0.3;
        nodes.push({ x, y, baseX: x, baseY: y, neighbors: [], pulseTime: -1 });
      }
    }

    const neighborDist = hexSize * 1.7;
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

    const onClick = (e: MouseEvent) => {
      cyberAttractRef.current = !cyberAttractRef.current;
      // Crimson hex: trigger a ripple wave on click
      wavesRef.current.push({ ox: e.clientX, oy: e.clientY, time: pulseTimeRef.current });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("click", onClick);

    // Schedule first auto-pulse
    nextAutoPulseRef.current = 5 + Math.random() * 5;

    const fontSize = 18;

    // ── Matrix Rain ──
    const animateMatrix = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.06)";
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
            // Lead character — bright white-green
            ctx.fillStyle = `rgba(200, 255, 200, ${Math.min(alpha * 1.2, 1)})`;
            ctx.font = `bold ${fontSize}px monospace`;
          } else if (j < 3) {
            // Near-head — bright green
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.9})`;
            ctx.font = `bold ${fontSize}px monospace`;
          } else {
            // Trail — standard green
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.7})`;
            ctx.font = `${fontSize}px monospace`;
          }

          ctx.fillText(drop.chars[j], drop.x, charY);

          // Occasionally mutate characters
          if (Math.random() < 0.02) {
            drop.chars[j] = Math.random() > 0.5 ? "1" : "0";
          }
        }

        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = Math.random() * -300;
          drop.speed = Math.random() * 2.0 + 0.5;
          drop.opacity = Math.random() * 0.6 + 0.3;
        }
      }
    };

    // ── Crimson Hex Network ──
    const animateHex = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = hexNodesRef.current;
      const mouse = mouseRef.current;
      pulseTimeRef.current += 0.016;
      const now = pulseTimeRef.current;

      // Mouse-triggered ripple wave (max once per 0.8s)
      if (mouseMovingRef.current && now - lastPulseRef.current > 0.8) {
        wavesRef.current.push({ ox: mouse.x, oy: mouse.y, time: now });
        lastPulseRef.current = now;
      }

      // Random auto-pulse every 5-10s
      if (now >= nextAutoPulseRef.current) {
        const rx = Math.random() * canvas.width;
        const ry = Math.random() * canvas.height;
        wavesRef.current.push({ ox: rx, oy: ry, time: now });
        nextAutoPulseRef.current = now + 5 + Math.random() * 5;
      }

      const waveSpeed = 250;
      const waveWidth = 120;
      const waveDuration = 3.5;

      wavesRef.current = wavesRef.current.filter(w => now - w.time < waveDuration);

      // Mouse influence
      const mouseInfluenceRadius = 280;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouse.x - n.baseX;
        const dy = mouse.y - n.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluenceRadius && dist > 0) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          n.x = n.baseX + (dx / dist) * force * 15;
          n.y = n.baseY + (dy / dist) * force * 15;
        } else {
          n.x += (n.baseX - n.x) * 0.03;
          n.y += (n.baseY - n.y) * 0.03;
        }
      }

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
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const ni of n.neighbors) {
          if (ni <= i) continue;
          const n2 = nodes[ni];

          let alpha = 0.04;

          const midX = (n.x + n2.x) / 2;
          const midY = (n.y + n2.y) / 2;
          const waveBright = getWaveBrightness(midX, midY);
          alpha += waveBright * 0.8;

          const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
          if (mouseDist < mouseInfluenceRadius) {
            alpha += (1 - mouseDist / mouseInfluenceRadius) * 0.2;
          }

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(255, 23, 68, ${Math.min(alpha, 0.75)})`;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let alpha = 0.06;
        let size = 1.5;

        const wavePulse = getWaveBrightness(n.x, n.y);
        alpha += wavePulse * 1.0;
        size += wavePulse * 4;

        const mouseDist = Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2);
        if (mouseDist < mouseInfluenceRadius) {
          const proximity = 1 - mouseDist / mouseInfluenceRadius;
          alpha += proximity * 0.4;
          size += proximity * 2;
        }

        // Glow for bright nodes
        if (alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 23, 68, ${alpha * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 23, 68, ${Math.min(alpha, 1.0)})`;
        ctx.fill();
      }
    };

    // ── Cyber Particles ──
    // Color gradient: blue → purple → red → orange → yellow → white
    // life goes from 0 to 5 (each merge adds ~0.08), reaching white triggers pop
    const colorStops = [
      { at: 0, r: 0, g: 229, b: 255 },     // cyan
      { at: 1, r: 179, g: 136, b: 255 },    // purple
      { at: 2, r: 255, g: 23, b: 68 },      // red
      { at: 3, r: 255, g: 152, b: 0 },      // orange
      { at: 4, r: 255, g: 235, b: 59 },     // yellow
      { at: 5, r: 255, g: 255, b: 255 },    // white
    ];

    const getParticleColor = (life: number, baseOpacity: number) => {
      const t = Math.min(Math.max(life, 0), 5);
      let i = 0;
      while (i < colorStops.length - 2 && colorStops[i + 1].at < t) i++;
      const a = colorStops[i];
      const b2 = colorStops[i + 1];
      const frac = (t - a.at) / (b2.at - a.at);
      return {
        r: Math.round(a.r + (b2.r - a.r) * frac),
        g: Math.round(a.g + (b2.g - a.g) * frac),
        b: Math.round(a.b + (b2.b - a.b) * frac),
        a: baseOpacity,
      };
    };

    // Pop effects — expanding bright rings where particles die
    const pops: { x: number; y: number; time: number; r: number; g: number; b: number }[] = [];

    const spawnFreshParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      dead: false,
    });

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const direction = cyberAttractRef.current ? 1 : -1;

      document.documentElement.setAttribute(
        "data-cyber-mode",
        cyberAttractRef.current ? "attract" : "repel"
      );

      const mergeRadius = 6;

      // Draw + update pop effects first (behind particles)
      for (let i = pops.length - 1; i >= 0; i--) {
        const pop = pops[i];
        pop.time += 0.016;
        const progress = pop.time / 0.4; // 0.4s total duration
        if (progress >= 1) {
          pops.splice(i, 1);
          continue;
        }
        const radius = 4 + progress * 25;
        const alpha = (1 - progress) * 0.6;
        ctx.beginPath();
        ctx.arc(pop.x, pop.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pop.r}, ${pop.g}, ${pop.b}, ${alpha})`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();
        // Inner flash
        if (progress < 0.3) {
          ctx.beginPath();
          ctx.arc(pop.x, pop.y, radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.3 - progress) * 2})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.dead) continue;

        // Mouse force
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 0) {
          const force = (300 - dist) / 300;
          p.vx += (dx / dist) * force * 0.06 * direction;
          p.vy += (dy / dist) * force * 0.06 * direction;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pop when reaching white (life >= 5)
        if (p.life >= 5) {
          const c = getParticleColor(p.life, 1);
          pops.push({ x: p.x, y: p.y, time: 0, r: c.r, g: c.g, b: c.b });
          p.dead = true;
          continue;
        }

        // Draw particle
        const color = getParticleColor(p.life, p.opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.fill();

        // Glow halo for hot particles
        if (p.life > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${(p.life / 5) * 0.12})`;
          ctx.fill();
        }

        // Pair check: connections + merge
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.dead) continue;

          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          // Merge if touching
          if (cdist < mergeRadius) {
            p.size = Math.min(p.size + p2.size * 0.2, 8);
            p.life += 0.6;
            p.vx = (p.vx + p2.vx) * 0.5;
            p.vy = (p.vy + p2.vy) * 0.5;
            p2.dead = true;
          }

          // Connection lines
          if (cdist < 150) {
            const lineColor = getParticleColor(Math.max(p.life, p2.life), 0.18 * (1 - cdist / 150));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${lineColor.a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Remove dead particles and spawn replacements
      const deadCount = particles.filter(p => p.dead).length;
      particlesRef.current = particles.filter(p => !p.dead);
      for (let i = 0; i < deadCount; i++) {
        particlesRef.current.push(spawnFreshParticle());
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
      window.removeEventListener("click", onClick);
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
