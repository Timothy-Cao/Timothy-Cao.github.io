"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isRepel, setIsRepel] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const cursorX = useSpring(0, { stiffness: 2000, damping: 80 });
  const cursorY = useSpring(0, { stiffness: 2000, damping: 80 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-hover]")) return;
      setExpanded((prev) => {
        const next = !prev;
        document.documentElement.setAttribute("data-cursor-boost", next ? "true" : "false");
        return next;
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY, visible]);

  // Always keep default cursor visible
  useEffect(() => {
    document.documentElement.setAttribute("data-custom-cursor", "false");
  }, [theme, isHome]);

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

  if (theme.name !== "limitless" || !isHome) {
    return null;
  }

  const ringColor = isRepel ? "rgba(255,23,68,0.5)" : "rgba(41,121,255,0.5)";
  const glowColor = isRepel ? "rgba(255,23,68,0.3)" : "rgba(41,121,255,0.3)";
  const ringSize = expanded ? 48 : 24;

  return (
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
        className="rounded-full transition-all duration-200"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${ringColor}`,
          boxShadow: expanded
            ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`
            : `0 0 8px ${glowColor}`,
        }}
      />
    </motion.div>
  );
}
