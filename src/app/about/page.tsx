"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { useTheme } from "@/components/theme-provider";
import ContactForm from "@/components/contact-form";
import { bio, hobbies, currentInterests, websiteCredits } from "@/data/about";

const RESUME_URL = "/assets/media/Timothy_Cao_Resume.pdf";

const profileImage: Record<string, string> = {
  limitless: "/assets/media/profile/cyber.jpg",
  matrix: "/assets/media/profile/matrix.png",
  crimson: "/assets/media/profile/crimson.png",
};

export default function AboutPage() {
  const { theme } = useTheme();
  const currentProfile = profileImage[theme.name] ?? "/assets/media/profile/cyber.jpg" /* limitless fallback */;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero section */}
        <ScrollReveal>
          <div className="relative mb-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[640px] max-w-full h-[280px] -z-10 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 65%)",
              }}
            />
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-accent/80">
              <span className="block h-px w-6 bg-accent/40" />
              About
            </p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-accent/20 shrink-0">
                <Image
                  src={currentProfile}
                  alt="Timothy Cao"
                  fill
                  sizes="(min-width: 768px) 160px, 128px"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-accent/5 blur-xl -z-10 scale-150" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                  {bio.greeting}
                </h1>
                <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                  {bio.personal}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Long Standing Hobbies */}
        <ScrollReveal>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
              Long Standing
            </h2>
            <span className="block flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            {hobbies.map((hobby, i) => (
              <motion.span
                key={hobby}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-foreground/85 bg-white/[0.02] transition-colors hover:border-accent/40 hover:text-accent"
              >
                {hobby}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Recent Interests */}
        <ScrollReveal>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
              Recently
            </h2>
            <span className="block flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-3 mb-24">
            {currentInterests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-muted bg-white/[0.02] transition-colors hover:border-accent/40 hover:text-accent"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Resume */}
        <ScrollReveal>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
              Resume
            </h2>
            <span className="block flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
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
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface mb-24">
            <div className="blur-[6px] select-none pointer-events-none">
              <object
                data={`${RESUME_URL}#view=FitH&toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-[200px] md:h-[240px]"
                aria-label="Timothy Cao Resume (blurred preview)"
              >
                <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
                  <p className="text-muted">Your browser can&apos;t preview PDFs inline.</p>
                </div>
              </object>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-full border border-accent/40 bg-[rgba(10,10,10,0.75)] px-5 py-2 backdrop-blur-md text-sm font-medium uppercase tracking-[0.2em] text-accent shadow-[0_0_30px_var(--color-accent-glow)]">
                Under Construction
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pudding + Contact — paired side by side */}
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pudding */}
            <div className="rounded-2xl bg-surface border border-border p-6 flex flex-col">
              <p className="mb-3 text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
                Pet
              </p>
              <h3 className="text-lg font-bold mb-4">Meet Pudding</h3>
              <div className="relative w-full flex-1 min-h-[260px] rounded-xl overflow-hidden">
                <Image
                  src="/assets/media/about/rabbit.jpg"
                  alt="Pudding the rabbit"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-muted leading-relaxed">{bio.pudding}</p>
            </div>

            {/* Contact */}
            <div className="rounded-2xl bg-surface border border-border p-6">
              <p className="mb-4 text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
                Reach out
              </p>
              <h3 className="text-lg font-bold mb-1">Get in touch</h3>
              <p className="text-xs text-muted mb-5">
                Anything except my car&apos;s extended warranty.
              </p>
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* Credits */}
        <ScrollReveal className="mt-20">
          <div className="space-y-4 text-sm text-muted">
            <p>{websiteCredits.builtWith}</p>
            <p className="text-xs">{websiteCredits.disclaimer}</p>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </PageTransition>
  );
}
