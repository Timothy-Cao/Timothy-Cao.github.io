"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themes } from "@/components/theme-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
        aria-label="Change theme"
      >
        <div
          className="w-4 h-4 rounded-full border border-white/20 transition-all duration-200 group-hover:scale-150 group-hover:shadow-[0_0_12px_var(--color-accent-glow)]"
          style={{ background: theme.accent }}
        />
        {/* Hint label — desktop only, always visible */}
        <span className="hidden md:flex items-center gap-1 text-xs text-white/90 z-[9999] ml-3 pointer-events-none select-none">
          <motion.span
            key="theme-arrow"
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ←
          </motion.span>
          Theme
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-8 bg-surface border border-border rounded-lg shadow-xl py-2 min-w-[160px] z-50"
          >
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => { setTheme(t.name); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-sm transition-colors hover:bg-white/5 ${
                  theme.name === t.name ? "text-foreground" : "text-muted"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: t.accent }}
                />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground hover:text-accent transition-colors"
        >
          TC
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group text-sm font-medium transition-colors"
            >
              <span
                className={
                  isActive(pathname, link.href) ? "text-accent" : "text-muted hover:text-foreground"
                }
              >
                {link.label}
              </span>
              {isActive(pathname, link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </Link>
          ))}
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
