"use client";

import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/ui/page-header";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";

const RESUME_URL = "/assets/media/Timothy_Cao_Resume.pdf";

const compileLog: { tag: string; line: string; status?: "ok" | "wip" }[] = [
  { tag: "$", line: "compile resume.tex" },
  { tag: ">", line: "parse structure", status: "ok" },
  { tag: ">", line: "inline edits", status: "ok" },
  { tag: ">", line: "tighten kerning", status: "ok" },
  { tag: ">", line: "polish wording", status: "wip" },
  { tag: ">", line: "metric review", status: "wip" },
  { tag: "$", line: "eta: soon™" },
];

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <PageHeader
          eyebrow="Resume"
          title="A quick look at my work"
          description="Currently being polished. Grab the PDF below for the latest stable cut."
        />

        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
            {/* Blurred preview */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
              <div className="blur-[6px] select-none pointer-events-none">
                <object
                  data={`${RESUME_URL}#view=FitH&toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-[80vh] min-h-[600px]"
                  aria-label="Timothy Cao Resume (blurred preview)"
                >
                  <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
                    <p className="text-muted">
                      Your browser can&apos;t preview PDFs inline.
                    </p>
                  </div>
                </object>
              </div>

              {/* Under construction overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rounded-full border border-accent/40 bg-[rgba(10,10,10,0.75)] px-5 py-2 backdrop-blur-md text-sm font-medium uppercase tracking-[0.2em] text-accent shadow-[0_0_30px_var(--color-accent-glow)]">
                  Under Construction
                </div>
              </div>
            </div>

            {/* Terminal status panel */}
            <div className="rounded-xl border border-border bg-[rgba(10,10,10,0.7)] backdrop-blur-sm overflow-hidden lg:sticky lg:top-24">
              {/* Terminal title bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="text-[10px] text-muted/70 ml-2 font-mono">tim@portfolio:~/resume</span>
              </div>
              {/* Log */}
              <div className="px-4 py-3 font-mono text-xs leading-relaxed">
                {compileLog.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.18, duration: 0.3 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-accent/70 select-none">{entry.tag}</span>
                    <span className="text-foreground/80 flex-1">{entry.line}</span>
                    {entry.status === "ok" && (
                      <span className="text-green-400/80 text-[10px] uppercase tracking-wider">ok</span>
                    )}
                    {entry.status === "wip" && (
                      <span className="text-yellow-400/80 text-[10px] uppercase tracking-wider">wip</span>
                    )}
                  </motion.div>
                ))}
                {/* blinking cursor */}
                <motion.div
                  className="flex items-baseline gap-2 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + compileLog.length * 0.18 }}
                >
                  <span className="text-accent/70 select-none">$</span>
                  <motion.span
                    className="block w-[7px] h-3.5 bg-accent/80"
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              {/* Footer note */}
              <div className="px-4 py-3 border-t border-border bg-white/[0.01]">
                <p className="text-[11px] text-muted leading-relaxed">
                  The blurred preview is a real-time view of the latest version. Download to read it un-fuzzed.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </PageTransition>
  );
}
