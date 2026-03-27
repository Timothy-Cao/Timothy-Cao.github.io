"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          setTriggered(true);
          indexRef.current = 0;
          setTimeout(() => setTriggered(false), 4000);
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!triggered) return null;

  return (
    <>
      {/* Confetti */}
      <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-[confetti-fall_3s_ease-out_forwards]"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              animationDelay: `${Math.random() * 0.5}s`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: [
                "#00e5ff", "#ff00ff", "#ffff00", "#00ff88", "#ff6600", "#aa66ff",
              ][Math.floor(Math.random() * 6)],
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
              transform: `rotate(${Math.random() * 360}deg)`,
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
