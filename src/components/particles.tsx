"use client";

import { useEffect, useRef, useCallback } from "react";

interface GridDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

interface GravityGrid {
  dots: GridDot[];
  cols: number;
  rows: number;
  spacing: number;
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

type ParticleMode = "particles" | "matrix" | "hex";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseMovingRef = useRef(false);
  const mouseMoveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPulseRef = useRef(0);
  const gridRef = useRef<GravityGrid | null>(null);
  const matrixDropsRef = useRef<MatrixDrop[]>([]);
  const hexNodesRef = useRef<HexNode[]>([]);
  const animationRef = useRef<number>(0);
  const pulseTimeRef = useRef(0);
  const wavesRef = useRef<{ ox: number; oy: number; time: number }[]>([]);
  const nextAutoPulseRef = useRef(0);
  const cyberAttractRef = useRef(true);
  const cyberModeAttrRef = useRef("");
  const modeRef = useRef<ParticleMode>("particles");
  const lastFrameTimeRef = useRef(0);
  const matrixTrailRef = useRef<{ x: number; y: number; vx: number; vy: number; char: string; life: number; fadeSpeed: number; size: number; isExplosion: boolean }[]>([]);

  const initGravityGrid = useCallback((width: number, height: number) => {
    const spacing = 50; // px between dots
    // Pad one cell on each side so warping near the edge still has neighbors
    const cols = Math.ceil(width / spacing) + 3;
    const rows = Math.ceil(height / spacing) + 3;
    const dots: GridDot[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing - spacing;
        const y = r * spacing - spacing;
        dots.push({ baseX: x, baseY: y, x, y });
      }
    }
    gridRef.current = { dots, cols, rows, spacing };
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
    // Larger hex size = fewer nodes = better perf. 75 ~= 36% fewer nodes than 60.
    const hexSize = 75;
    const hexH = hexSize * Math.sqrt(3);
    const rowSpacing = hexH * 0.5;
    const colSpacing = hexSize * 1.5;
    const cols = Math.ceil(width / colSpacing) + 6;
    const rows = Math.ceil(height / rowSpacing) + 6;

    for (let row = -3; row < rows; row++) {
      for (let col = -3; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : hexSize * 0.75;
        const x = col * hexSize * 1.5 + offsetX + (Math.random() - 0.5) * hexSize * 0.3;
        const y = row * hexH * 0.5 + (Math.random() - 0.5) * hexSize * 0.3;
        nodes.push({ x, y, baseX: x, baseY: y, neighbors: [], pulseTime: -1 });
      }
    }

    // Spatial grid for O(n) neighbor finding (was O(n²) ~285k iters at 1080p)
    const neighborDist = hexSize * 1.7;
    const neighborDistSq = neighborDist * neighborDist;
    const cellSize = neighborDist;
    const initGrid = new Map<string, number[]>();
    for (let i = 0; i < nodes.length; i++) {
      const gx = Math.floor(nodes[i].baseX / cellSize);
      const gy = Math.floor(nodes[i].baseY / cellSize);
      const key = `${gx},${gy}`;
      const bucket = initGrid.get(key);
      if (bucket) bucket.push(i);
      else initGrid.set(key, [i]);
    }
    for (let i = 0; i < nodes.length; i++) {
      const gx = Math.floor(nodes[i].baseX / cellSize);
      const gy = Math.floor(nodes[i].baseY / cellSize);
      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const bucket = initGrid.get(`${gx + ox},${gy + oy}`);
          if (!bucket) continue;
          for (const j of bucket) {
            if (j <= i) continue;
            const dx = nodes[i].baseX - nodes[j].baseX;
            const dy = nodes[i].baseY - nodes[j].baseY;
            if (dx * dx + dy * dy < neighborDistSq) {
              nodes[i].neighbors.push(j);
              nodes[j].neighbors.push(i);
            }
          }
        }
      }
    }

    hexNodesRef.current = nodes;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getAccentHex = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();

    const getMode = () => {
      const hex = getAccentHex().toLowerCase();
      if (hex === "#00ff41") return "matrix";
      if (hex === "#ff1744") return "hex";
      return "particles";
    };

    const setMode = () => {
      const mode = getMode();
      modeRef.current = mode;
      if (mode === "matrix" && matrixDropsRef.current.length === 0) {
        initMatrixDrops(canvas.width, canvas.height);
      } else if (mode === "hex" && hexNodesRef.current.length === 0) {
        initHexGrid(canvas.width, canvas.height);
      } else if (mode === "particles" && !gridRef.current) {
        initGravityGrid(canvas.width, canvas.height);
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const mode = modeRef.current;
      if (mode === "matrix") {
        initMatrixDrops(canvas.width, canvas.height);
      } else if (mode === "hex") {
        initHexGrid(canvas.width, canvas.height);
      } else {
        initGravityGrid(canvas.width, canvas.height);
      }
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
      // Crimson hex: trigger a ripple wave on click
      wavesRef.current.push({ ox: e.clientX, oy: e.clientY, time: pulseTimeRef.current });
      // Matrix: explosion of 0s and 1s from click point
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 6 + 2;
        matrixTrailRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: Math.random() > 0.5 ? "1" : "0",
          life: 0,
          fadeSpeed: 0.012 + Math.random() * 0.008,
          size: Math.random() * 10 + 12,
          isExplosion: true,
        });
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      cyberAttractRef.current = !cyberAttractRef.current;
    };

    setMode();
    const initialModeSync = requestAnimationFrame(setMode);
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("themechange", setMode);
    window.addEventListener("storage", setMode);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("click", onClick);
    window.addEventListener("contextmenu", onContextMenu);

    // Schedule first auto-pulse
    nextAutoPulseRef.current = 5 + Math.random() * 5;

    const fontSize = 18;

    let lastTrailX = -1000;
    let lastTrailY = -1000;

    // ── Matrix Rain ──
    const animateMatrix = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      const drops = matrixDropsRef.current;
      const mouse = mouseRef.current;

      // Spawn trail characters as mouse moves (stationary, just fade)
      if (mouseMovingRef.current) {
        const dx = mouse.x - lastTrailX;
        const dy = mouse.y - lastTrailY;
        const moveDist = Math.sqrt(dx * dx + dy * dy);
        if (moveDist > 10) {
          const count = Math.min(Math.floor(moveDist / 10), 3);
          for (let t = 0; t < count; t++) {
            const frac = (t + 1) / count;
            matrixTrailRef.current.push({
              x: lastTrailX + dx * frac + (Math.random() - 0.5) * 14,
              y: lastTrailY + dy * frac + (Math.random() - 0.5) * 14,
              vx: 0,
              vy: 0,
              char: Math.random() > 0.5 ? "1" : "0",
              life: 0,
              fadeSpeed: 0.018,
              size: Math.random() * 6 + 14,
              isExplosion: false,
            });
          }
          lastTrailX = mouse.x;
          lastTrailY = mouse.y;
        }
      }

      // Draw & update trail + explosion characters
      for (let t = matrixTrailRef.current.length - 1; t >= 0; t--) {
        const tc = matrixTrailRef.current[t];
        tc.life += tc.fadeSpeed;
        tc.x += tc.vx;
        tc.y += tc.vy;
        if (tc.isExplosion) {
          tc.vx *= 0.96;
          tc.vy *= 0.96;
        }

        if (tc.life >= 1) {
          matrixTrailRef.current.splice(t, 1);
          continue;
        }

        // Scramble occasionally
        if (Math.random() < 0.06) {
          tc.char = Math.random() > 0.5 ? "1" : "0";
        }

        const fadeIn = Math.min(tc.life * 10, 1);
        const fadeOut = 1 - tc.life;
        const alpha = fadeIn * fadeOut;

        // Bright glow
        ctx.font = `bold ${tc.size}px monospace`;
        ctx.shadowColor = tc.isExplosion
          ? `rgba(0, 255, 65, ${alpha})`
          : "rgba(0, 255, 65, 0.6)";
        ctx.shadowBlur = tc.isExplosion ? 18 * alpha : 10 * alpha;
        ctx.fillStyle = tc.isExplosion
          ? `rgba(200, 255, 200, ${alpha})`
          : `rgba(150, 255, 150, ${alpha * 0.85})`;
        ctx.fillText(tc.char, tc.x, tc.y);
        ctx.shadowBlur = 0;
      }

      // Draw rain drops
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        drop.y += drop.speed;

        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * fontSize;
          if (charY < -fontSize || charY > canvas.height + fontSize) continue;

          const fade = j === 0 ? 1 : Math.max(0, 1 - j / drop.length);
          const alpha = drop.opacity * fade;

          if (j === 0) {
            ctx.fillStyle = `rgba(200, 255, 200, ${Math.min(alpha * 1.2, 1)})`;
            ctx.font = `bold ${fontSize}px monospace`;
          } else if (j < 3) {
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.9})`;
            ctx.font = `bold ${fontSize}px monospace`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.7})`;
            ctx.font = `${fontSize}px monospace`;
          }

          ctx.fillText(drop.chars[j], drop.x, charY);

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
      const waves = wavesRef.current;
      const hasWaves = waves.length > 0;

      // Precompute wave radii once per frame instead of per-call
      const waveRadii: number[] = hasWaves ? new Array(waves.length) : [];
      const waveTimeFades: number[] = hasWaves ? new Array(waves.length) : [];
      for (let w = 0; w < waves.length; w++) {
        const elapsed = now - waves[w].time;
        waveRadii[w] = elapsed * waveSpeed;
        waveTimeFades[w] = Math.max(0, 1 - elapsed / waveDuration);
      }

      // Mouse influence — only iterate near-mouse nodes via spatial grid
      const mouseInfluenceRadius = 280;
      const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;
      const mouseActive = mouse.x > -500;

      // Reset all node positions toward base, then apply mouse force only to nearby
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += (n.baseX - n.x) * 0.03;
        n.y += (n.baseY - n.y) * 0.03;
      }

      if (mouseActive) {
        // Simple bbox check then sqrt only when in range
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = mouse.x - n.baseX;
          const dy = mouse.y - n.baseY;
          if (Math.abs(dx) > mouseInfluenceRadius || Math.abs(dy) > mouseInfluenceRadius) continue;
          const distSq = dx * dx + dy * dy;
          if (distSq >= mouseInfluenceRadiusSq || distSq === 0) continue;
          const dist = Math.sqrt(distSq);
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          n.x = n.baseX + (dx / dist) * force * 15;
          n.y = n.baseY + (dy / dist) * force * 15;
        }
      }

      // Wave brightness using precomputed values + squared distance early-out
      const getWaveBrightness = (px: number, py: number) => {
        if (!hasWaves) return 0;
        let brightness = 0;
        for (let w = 0; w < waves.length; w++) {
          const wave = waves[w];
          const radius = waveRadii[w];
          // Early reject: if farther than radius+waveWidth or closer than radius-waveWidth
          const wdx = px - wave.ox;
          const wdy = py - wave.oy;
          const distSq = wdx * wdx + wdy * wdy;
          const inner = radius - waveWidth;
          const outer = radius + waveWidth;
          if (distSq > outer * outer) continue;
          if (inner > 0 && distSq < inner * inner) continue;
          const dist = Math.sqrt(distSq);
          const delta = Math.abs(dist - radius);
          if (delta < waveWidth) {
            const ringBrightness = 1 - delta / waveWidth;
            const b = ringBrightness * waveTimeFades[w];
            if (b > brightness) brightness = b;
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

          if (hasWaves) {
            const waveBright = getWaveBrightness(midX, midY);
            alpha += waveBright * 0.8;
          }

          if (mouseActive) {
            const mdx = mouse.x - midX;
            const mdy = mouse.y - midY;
            if (Math.abs(mdx) <= mouseInfluenceRadius && Math.abs(mdy) <= mouseInfluenceRadius) {
              const mouseDistSq = mdx * mdx + mdy * mdy;
              if (mouseDistSq < mouseInfluenceRadiusSq) {
                const mouseDist = Math.sqrt(mouseDistSq);
                alpha += (1 - mouseDist / mouseInfluenceRadius) * 0.2;
              }
            }
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

        if (hasWaves) {
          const wavePulse = getWaveBrightness(n.x, n.y);
          alpha += wavePulse * 1.0;
          size += wavePulse * 4;
        }

        if (mouseActive) {
          const mdx = mouse.x - n.x;
          const mdy = mouse.y - n.y;
          if (Math.abs(mdx) <= mouseInfluenceRadius && Math.abs(mdy) <= mouseInfluenceRadius) {
            const mouseDistSq = mdx * mdx + mdy * mdy;
            if (mouseDistSq < mouseInfluenceRadiusSq) {
              const mouseDist = Math.sqrt(mouseDistSq);
              const proximity = 1 - mouseDist / mouseInfluenceRadius;
              alpha += proximity * 0.4;
              size += proximity * 2;
            }
          }
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

    // ── Limitless: Gravity-warped grid ──
    // Static grid of cyan dots; mouse acts as a gravity well (attract) or
    // anti-gravity source (repel via right-click). Dots displace toward/away
    // from the cursor with a capped magnitude so they never leave the page.
    // Connection lines are only drawn near the cursor — visualizes the warp
    // without per-frame O(n²) cost.
    const animateGravityGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grid = gridRef.current;
      if (!grid) return;
      const { dots } = grid;
      const mouse = mouseRef.current;
      const mouseActive = mouse.x > -500;
      const direction = cyberAttractRef.current ? 1 : -1;

      const nextCyberMode = cyberAttractRef.current ? "attract" : "repel";
      if (cyberModeAttrRef.current !== nextCyberMode) {
        document.documentElement.setAttribute("data-cyber-mode", nextCyberMode);
        cyberModeAttrRef.current = nextCyberMode;
      }

      // Always at the "boosted" magnitude (no toggle); cursor stays small visually
      const radius = 450;
      const radiusSq = radius * radius;
      const baseDisp = 60; // capped displacement so dots stay near base
      const lerp = 0.18;

      // Update dot positions
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let targetX = d.baseX;
        let targetY = d.baseY;

        if (mouseActive) {
          const dx = mouse.x - d.baseX;
          const dy = mouse.y - d.baseY;
          // Cheap bbox prefilter
          if (Math.abs(dx) < radius && Math.abs(dy) < radius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < radiusSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const t = 1 - dist / radius;
              const falloff = t * t; // ease so warp is dramatic near cursor
              const dispMag = falloff * baseDisp;
              targetX = d.baseX + (dx / dist) * dispMag * direction;
              targetY = d.baseY + (dy / dist) * dispMag * direction;
            }
          }
        }

        d.x += (targetX - d.x) * lerp;
        d.y += (targetY - d.y) * lerp;
      }

      // Draw dots — brighter and larger near cursor
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let alpha = 0.32;
        let size = 1.0;

        if (mouseActive) {
          const mdx = mouse.x - d.baseX;
          const mdy = mouse.y - d.baseY;
          if (Math.abs(mdx) < radius && Math.abs(mdy) < radius) {
            const distSq = mdx * mdx + mdy * mdy;
            if (distSq < radiusSq) {
              const t = 1 - Math.sqrt(distSq) / radius;
              alpha = 0.32 + t * 0.65;
              size = 1.0 + t * 1.8;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }
    };

    let lastMode = modeRef.current;

    const animate = (time = 0) => {
      animationRef.current = requestAnimationFrame(animate);

      if (time - lastFrameTimeRef.current < 33) return;
      lastFrameTimeRef.current = time;

      const mode = modeRef.current;

      if (mode !== lastMode) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lastMode = mode;
      }

      if (mode === "matrix") {
        animateMatrix();
      } else if (mode === "hex") {
        animateHex();
      } else {
        animateGravityGrid();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      cancelAnimationFrame(initialModeSync);
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", setMode);
      window.removeEventListener("storage", setMode);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("click", onClick);
      window.removeEventListener("contextmenu", onContextMenu);
      if (mouseMoveTimerRef.current) clearTimeout(mouseMoveTimerRef.current);
    };
  }, [initGravityGrid, initMatrixDrops, initHexGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
