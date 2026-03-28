"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function MultitaskerPage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Multitasker</h1>
          <p className="text-muted mb-12">How many things can you juggle at once?</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-surface border border-border"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-6xl">🧠</span>
            <p className="text-lg font-semibold text-accent">Coming Soon</p>
            <p className="text-sm text-muted max-w-sm">
              A game that throws increasingly many tasks at you simultaneously. How long can you keep up? Stay tuned!
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
