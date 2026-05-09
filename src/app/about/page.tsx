"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { useTheme } from "@/components/theme-provider";
import ContactForm from "@/components/contact-form";
import { bio, hobbies, currentInterests, websiteCredits } from "@/data/about";

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

        {/* Pudding */}
        <ScrollReveal>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
              Long-distance
            </h2>
            <span className="block flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-surface border border-border">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden shrink-0">
              <Image
                src="/assets/media/about/rabbit.jpg"
                alt="Pudding the rabbit"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Meet Pudding</h3>
              <p className="text-muted leading-relaxed">{bio.pudding}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Get in touch */}
        <ScrollReveal className="mt-24">
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.28em] text-muted">
              Reach out
            </h2>
            <span className="block flex-1 h-px bg-border" />
          </div>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Get in touch</h3>
              <p className="text-muted">
                Message me about anything except my car&apos;s extended warranty.
              </p>
            </div>
            <ContactForm />
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
