"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme, themes } from "@/components/theme-provider";

const links = [
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/40 px-1.5 py-1 backdrop-blur-sm"
      role="radiogroup"
      aria-label="Change theme"
    >
      {themes.map((t, i) => {
        const active = theme.name === t.name;
        return (
          <motion.button
            key={t.name}
            onClick={() => setTheme(t.name)}
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            title={t.label}
            className="relative flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Selected ring — animated layout transition between buttons */}
            {active && (
              <motion.span
                layoutId="theme-active-ring"
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: t.accent,
                  boxShadow: `0 0 12px ${t.accentGlow}, inset 0 0 6px ${t.accentGlow}`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Idle pulsing dot */}
            <motion.span
              className="block rounded-full"
              style={{ background: t.accent }}
              animate={
                active
                  ? { width: 12, height: 12, opacity: 1 }
                  : {
                      width: [8, 9, 8],
                      height: [8, 9, 8],
                      opacity: [0.55, 0.85, 0.55],
                    }
              }
              transition={
                active
                  ? { type: "spring", stiffness: 400, damping: 25 }
                  : {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.35,
                    }
              }
            />
          </motion.button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenForPath, setMobileOpenForPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileOpen = mobileOpenForPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.8)] backdrop-blur-xl border-b border-accent/10 h-14"
          : "bg-transparent h-16"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Home logo — terminal-style "TIMCAO ▮" with blinking accent cursor */}
        <Link
          href="/"
          aria-label="Home"
          className="group relative flex items-center gap-2 rounded-md px-2 py-1 -ml-2 transition-colors"
        >
          <span className="font-mono font-bold text-base md:text-lg tracking-[0.22em] text-foreground transition-all duration-300 group-hover:text-accent group-hover:[text-shadow:0_0_14px_var(--color-accent-glow)]">
            TIMCAO
          </span>
          <motion.span
            className="block w-[3px] h-4 md:h-5 bg-accent rounded-[1px]"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 8px var(--color-accent-glow)" }}
            aria-hidden="true"
          />
          {/* Subtle underline that draws in on hover */}
          <span className="pointer-events-none absolute left-2 right-2 bottom-0 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>

        {/* Desktop links — pill bar with animated active background */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="relative flex items-center gap-1 rounded-full border border-border/60 bg-surface/40 p-1 backdrop-blur-sm"
          >
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-accent/12 border border-accent/40"
                      style={{ boxShadow: "0 0 14px var(--color-accent-glow)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      active ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => {
              setMobileOpenForPath((current) => (current === pathname ? null : pathname));
            }}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-accent/10"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(pathname, link.href) ? "text-accent" : "text-muted hover:text-foreground"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
