"use client";

import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export default function Meteors({ count = 15 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animationRef = useRef<number>(0);
  const accentRef = useRef({ r: 0, g: 229, b: 255 });
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const updateAccent = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      const r = parseInt(hex.slice(1, 3), 16) || 0;
      const g = parseInt(hex.slice(3, 5), 16) || 0;
      const b = parseInt(hex.slice(5, 7), 16) || 0;
      accentRef.current = { r, g, b };
    };
    updateAccent();
    window.addEventListener("themechange", updateAccent);
    window.addEventListener("storage", updateAccent);

    const spawnMeteor = (initialSpread = false): Meteor => {
      const x = canvas.width * (0.2 + Math.random() * 1.0);
      const y = initialSpread
        ? Math.random() * -canvas.height * 0.8
        : Math.random() * -150 - 50;
      return {
        x,
        y,
        speed: Math.random() * 4 + 3,
        length: Math.random() * 120 + 60,
        opacity: Math.random() * 0.7 + 0.3,
      };
    };

    meteorsRef.current = Array.from({ length: count }, () => spawnMeteor(true));

    const angle = (215 * Math.PI) / 180;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    const animate = (time = 0) => {
      animationRef.current = requestAnimationFrame(animate);
      if (time - lastFrameTimeRef.current < 33) return;
      lastFrameTimeRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { r, g, b } = accentRef.current;

      for (let i = 0; i < meteorsRef.current.length; i++) {
        const m = meteorsRef.current[i];

        m.x += dx * m.speed;
        m.y += dy * m.speed;

        const tailX = m.x - dx * m.length;
        const tailY = m.y - dy * m.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${m.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${m.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Brighter head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${m.opacity})`;
        ctx.fill();

        // Soft glow around head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${m.opacity * 0.15})`;
        ctx.fill();

        if (m.x < -200 || m.y > canvas.height + 200) {
          meteorsRef.current[i] = spawnMeteor(false);
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", updateAccent);
      window.removeEventListener("storage", updateAccent);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
