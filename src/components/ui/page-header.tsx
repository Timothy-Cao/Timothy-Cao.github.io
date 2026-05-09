"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Render a subtle radial accent glow behind the header */
  glow?: boolean;
  className?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  glow = true,
  className = "",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`relative mb-14 md:mb-20 ${className}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[640px] max-w-full h-[280px] -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 65%)",
          }}
        />
      )}

      <div className={`relative max-w-3xl ${alignClass}`}>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-accent/80"
          >
            <span className="block h-px w-6 bg-accent/40" />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  );
}
