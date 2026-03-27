"use client";

import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export default function Meteors({ count = 12 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
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

    // Spawn a meteor offscreen, already moving
    const spawnMeteor = (initialSpread = false): Meteor => {
      // Angle is 215deg — meteors move down-left
      // Start from top-right area, off screen
      const x = canvas.width * (0.3 + Math.random() * 0.9);
      const y = initialSpread
        ? Math.random() * -canvas.height * 0.5 // spread out initially so they don't all start at once
        : Math.random() * -100 - 50; // always start above viewport
      return {
        x,
        y,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 80 + 40,
        opacity: Math.random() * 0.6 + 0.3,
      };
    };

    // Initialize with spread-out positions so they trickle in naturally
    meteorsRef.current = Array.from({ length: count }, () => spawnMeteor(true));

    const getAccent = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      const r = parseInt(hex.slice(1, 3), 16) || 0;
      const g = parseInt(hex.slice(3, 5), 16) || 0;
      const b = parseInt(hex.slice(5, 7), 16) || 0;
      return { r, g, b };
    };

    // Direction vector for 215deg
    const angle = (215 * Math.PI) / 180;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { r, g, b } = getAccent();

      for (let i = 0; i < meteorsRef.current.length; i++) {
        const m = meteorsRef.current[i];

        // Move
        m.x += dx * m.speed;
        m.y += dy * m.speed;

        // Draw tail
        const tailX = m.x - dx * m.length;
        const tailY = m.y - dy * m.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${m.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${m.opacity})`;
        ctx.fill();

        // Respawn if off screen
        if (m.x < -200 || m.y > canvas.height + 200) {
          meteorsRef.current[i] = spawnMeteor(false);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
