"use client";

import { Download, ExternalLink } from "lucide-react";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";

const RESUME_URL = "/assets/media/Timothy_Cao_Resume.pdf";

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume</h1>
              <p className="text-muted text-sm md:text-base">
                A quick look at my background. Open the PDF for the full version.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
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
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
            {/* Blur layer wraps the PDF; keeps it visible but makes small text illegible */}
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
        </ScrollReveal>
      </div>
      <Footer />
    </PageTransition>
  );
}
