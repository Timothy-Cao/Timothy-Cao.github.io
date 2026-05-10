"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const log: { tag: string; line: string; tone?: "ok" | "err" }[] = [
  { tag: "$", line: "fetch /requested-page" },
  { tag: ">", line: "resolving route", tone: "ok" },
  { tag: ">", line: "matching pattern", tone: "ok" },
  { tag: ">", line: "no handler found", tone: "err" },
  { tag: "!", line: "404 — page not in map", tone: "err" },
  { tag: "$", line: "suggestion: try /about or /playground" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-6 py-16">
      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-full h-[420px] -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 70%)",
        }}
      />

      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      <div className="relative w-full max-w-2xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-accent/80"
        >
          <span className="block h-px w-6 bg-accent/40" />
          Lost
        </motion.p>

        {/* Big 404 with glitchy split text */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[120px] md:text-[180px] leading-[0.9] font-bold tracking-tight font-mono"
          aria-label="404"
        >
          <span className="text-foreground">4</span>
          <span
            className="text-accent inline-block"
            style={{
              textShadow:
                "0 0 18px var(--color-accent-glow), 0 0 36px var(--color-accent-glow)",
            }}
          >
            0
          </span>
          <span className="text-foreground">4</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-2 text-2xl md:text-3xl font-bold tracking-tight"
        >
          That page is off the map.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-3 text-muted text-base max-w-md"
        >
          Either it moved, never existed, or you mistyped a URL the way I
          mistype variable names.
        </motion.p>

        {/* Terminal log card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 rounded-xl border border-border bg-[rgba(10,10,10,0.7)] backdrop-blur-sm overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-white/[0.02]">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="text-[10px] text-muted/70 ml-2 font-mono">
              tim@portfolio:~/router
            </span>
          </div>
          {/* Log */}
          <div className="px-4 py-3 font-mono text-xs leading-relaxed">
            {log.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.14, duration: 0.25 }}
                className="flex items-baseline gap-2"
              >
                <span
                  className={`select-none ${
                    entry.tone === "err" ? "text-red-400/80" : "text-accent/70"
                  }`}
                >
                  {entry.tag}
                </span>
                <span
                  className={`flex-1 ${
                    entry.tone === "err"
                      ? "text-red-300/90"
                      : entry.tone === "ok"
                      ? "text-foreground/80"
                      : "text-foreground/80"
                  }`}
                >
                  {entry.line}
                </span>
                {entry.tone === "ok" && (
                  <span className="text-green-400/80 text-[10px] uppercase tracking-wider">
                    ok
                  </span>
                )}
                {entry.tone === "err" && (
                  <span className="text-red-400/80 text-[10px] uppercase tracking-wider">
                    err
                  </span>
                )}
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <motion.div
              className="flex items-baseline gap-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + log.length * 0.14 }}
            >
              <span className="text-accent/70 select-none">$</span>
              <motion.span
                className="block w-[7px] h-3.5 bg-accent/80"
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)]"
          >
            Take me home
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
          >
            Browse projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
