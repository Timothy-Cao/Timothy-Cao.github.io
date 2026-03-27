"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isRepel, setIsRepel] = useState(false);
  const { theme } = useTheme();

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, [data-hover]")
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, visible]);

  // Toggle cursor: none based on theme
  useEffect(() => {
    const isCyan = theme.name === "cyber";
    document.documentElement.setAttribute("data-custom-cursor", isCyan ? "true" : "false");
  }, [theme]);

  // Watch attract/repel mode changes from particles
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const mode = document.documentElement.getAttribute("data-cyber-mode");
      setIsRepel(mode === "repel");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-cyber-mode"] });
    return () => observer.disconnect();
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Only render custom cursor for Cyber Cyan
  if (theme.name !== "cyber") {
    return null;
  }

  const dotColor = isRepel ? "#b388ff" : "#00e5ff";
  const glowColor = isRepel ? "rgba(179,136,255,0.4)" : "var(--color-accent-glow)";
  const dimColor = isRepel ? "rgba(179,136,255,0.2)" : "var(--color-accent-dim)";
  const borderColor = isRepel ? "rgba(179,136,255,0.5)" : "rgba(0,229,255,0.5)";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: hovering ? 12 : 8,
            height: hovering ? 12 : 8,
            backgroundColor: dotColor,
            boxShadow: hovering
              ? `0 0 20px ${dimColor}, 0 0 40px ${glowColor}`
              : `0 0 10px ${dimColor}`,
          }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            border: `1px solid ${borderColor}`,
            boxShadow: hovering ? `0 0 15px ${glowColor}` : "none",
          }}
        />
      </motion.div>
    </>
  );
}
