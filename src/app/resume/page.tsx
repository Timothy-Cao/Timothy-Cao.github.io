"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BorderBeam from "@/components/ui/border-beam";

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative w-64 h-80 rounded-lg border border-accent/20 bg-surface flex items-center justify-center mb-8">
              <BorderBeam duration={6} />
              <div className="space-y-4 text-muted">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-1 bg-accent/20 rounded mx-auto"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-24 h-1 bg-accent/20 rounded mx-auto"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-28 h-1 bg-accent/20 rounded mx-auto"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Resume</h1>
            <p className="text-muted text-lg mb-2">Coming Soon</p>
            <p className="text-sm text-muted/60">Check back soon for my full resume</p>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </PageTransition>
  );
}
