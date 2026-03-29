"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isRepel, setIsRepel] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lockedRef = useRef(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (lockedRef.current) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    const requestLock = () => {
      if (!isHome || theme.name !== "limitless") return;
      document.body.requestPointerLock?.();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setMouseDown(true);
        document.documentElement.setAttribute("data-cursor-boost", "true");
        requestLock();
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setMouseDown(false);
        document.documentElement.setAttribute("data-cursor-boost", "false");
        document.exitPointerLock?.();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isHome && theme.name === "limitless") {
        requestLock();
        // Release after a short delay since right click is just a toggle
        setTimeout(() => document.exitPointerLock?.(), 100);
      }
    };

    const handlePointerLockChange = () => {
      lockedRef.current = !!document.pointerLockElement;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.exitPointerLock?.();
    };
  }, [cursorX, cursorY, visible, isHome, theme.name]);

  // Toggle cursor: none based on theme AND page
  useEffect(() => {
    const showCustom = theme.name === "limitless" && isHome;
    document.documentElement.setAttribute("data-custom-cursor", showCustom ? "true" : "false");
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

  // Only render custom cursor for limitless theme on home page
  if (theme.name !== "limitless" || !isHome) {
    return null;
  }

  const dotColor = isRepel ? "#ff1744" : "#2979ff";
  const glowColor = isRepel ? "rgba(255,23,68,0.4)" : "rgba(41,121,255,0.4)";
  const dimColor = isRepel ? "rgba(255,23,68,0.2)" : "rgba(41,121,255,0.2)";
  const dotSize = mouseDown ? 24 : hovering ? 12 : 8;

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
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          boxShadow: mouseDown
            ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`
            : hovering
              ? `0 0 20px ${dimColor}, 0 0 40px ${glowColor}`
              : `0 0 10px ${dimColor}`,
        }}
      />
    </motion.div>
  );
}
