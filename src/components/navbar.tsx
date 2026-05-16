"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useTheme, themes } from "@/components/theme-provider";

const links = [
  { href: "/playground", label: "Playground" },
];

const mobileTabs = [
  { href: "/playground", label: "Playground", Icon: LayoutGrid },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-2 py-1.5 backdrop-blur-sm"
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
            // Bigger tap target on mobile (40x40), tighter on desktop (36x36)
            // where pointers are precise.
            className="relative flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
          >
            {active && (
              <motion.span
                layoutId="theme-active-ring"
                className="absolute inset-1 rounded-full border"
                style={{
                  borderColor: t.accent,
                  boxShadow: `0 0 14px ${t.accentGlow}, inset 0 0 6px ${t.accentGlow}`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.span
              className="block rounded-full"
              style={{ background: t.accent }}
              animate={
                active
                  ? { width: 16, height: 16, opacity: 1 }
                  : {
                      width: [11, 13, 11],
                      height: [11, 13, 11],
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR — logo + (desktop pills) + theme. Pills are hidden on
          mobile; routes live in the bottom bar instead. */}
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
          {/* TIMCAO ▮ logo */}
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
            <span className="pointer-events-none absolute left-2 right-2 bottom-0 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          {/* Right cluster: pill bar on desktop only, theme selector everywhere */}
          <div className="flex items-center gap-3">
            <div
              className="hidden md:flex relative items-center gap-1 rounded-full border border-border/60 bg-surface/40 p-1 backdrop-blur-sm"
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
        </div>
      </motion.nav>

      {/* BOTTOM TAB BAR — mobile only. Two tabs in the thumb zone.
          Desktop keeps the top pill bar. */}
      <motion.nav
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-accent/10 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl"
        // Respect iOS safe-area / home indicator
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Primary"
      >
        <div className="relative grid grid-cols-1">
          {mobileTabs.map((tab) => {
            const active = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className="relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] focus:outline-none focus-visible:bg-white/[0.04]"
              >
                {active && (
                  <motion.span
                    layoutId="mobile-tab-pill"
                    className="absolute inset-x-3 top-1 bottom-1 rounded-2xl bg-accent/10 border border-accent/30"
                    style={{ boxShadow: "0 0 18px var(--color-accent-glow)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <tab.Icon
                  className={`relative z-10 w-5 h-5 transition-colors ${
                    active ? "text-accent" : "text-muted"
                  }`}
                  strokeWidth={1.75}
                />
                <span
                  className={`relative z-10 text-[11px] font-medium tracking-wide transition-colors ${
                    active ? "text-accent" : "text-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
