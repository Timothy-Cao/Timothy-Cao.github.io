"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
const CONFETTI_COLORS = ["#00e5ff", "#ff00ff", "#ffff00", "#00ff88", "#ff6600", "#aa66ff"];

interface ConfettiPiece {
  left: string;
  animationDelay: string;
  width: string;
  height: string;
  backgroundColor: string;
  borderRadius: string;
  transform: string;
}

function createConfetti() {
  return Array.from({ length: 80 }, (): ConfettiPiece => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 0.5}s`,
    width: `${Math.random() * 8 + 4}px`,
    height: `${Math.random() * 8 + 4}px`,
    backgroundColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    borderRadius: Math.random() > 0.5 ? "50%" : "0",
    transform: `rotate(${Math.random() * 360}deg)`,
  }));
}

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          setConfetti(createConfetti());
          setTriggered(true);
          indexRef.current = 0;
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setTriggered(false), 4000);
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!triggered) return null;

  return (
    <>
      {/* Confetti */}
      <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
        {confetti.map((piece, i) => (
          <div
            key={i}
            className="absolute animate-[confetti-fall_3s_ease-out_forwards]"
            style={{
              left: piece.left,
              top: "-10px",
              animationDelay: piece.animationDelay,
              width: piece.width,
              height: piece.height,
              backgroundColor: piece.backgroundColor,
              borderRadius: piece.borderRadius,
              transform: piece.transform,
            }}
          />
        ))}
      </div>
      {/* Toast */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] bg-surface border border-accent/30 text-accent px-6 py-3 rounded-lg shadow-lg shadow-accent/10 animate-[fade-in-up_0.3s_ease-out]">
        You found the secret!
      </div>
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
