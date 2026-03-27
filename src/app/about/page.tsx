"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { bio, hobbies, currentInterests, timeline, websiteCredits } from "@/data/about";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero section */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-accent/20 shrink-0">
              <Image
                src="/profile.jpg"
                alt="Timothy Cao"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-accent/5 blur-xl -z-10 scale-150" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{bio.greeting}</h1>
              <p className="text-muted leading-relaxed">{bio.personal}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Long Term Hobbies */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-6">Long Term Hobbies</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {hobbies.map((hobby, i) => (
              <motion.span
                key={hobby}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px var(--color-accent-glow)",
                }}
                className="px-4 py-2 rounded-full border border-accent/20 text-sm text-accent bg-accent/5 transition-colors hover:border-accent/50 hover:bg-accent/10"
              >
                {hobby}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Current Interests */}
        <ScrollReveal>
          <h3 className="text-lg font-semibold mb-4 text-muted">Current Interests</h3>
          <div className="flex flex-wrap gap-3 mb-20">
            {currentInterests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px var(--color-accent-glow)",
                }}
                className="px-4 py-2 rounded-full border border-accent/20 text-sm text-accent/70 bg-accent/5 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-10">Journey</h2>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 -translate-x-1/2" />

          {timeline.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`relative flex flex-col md:flex-row items-start gap-6 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1/2 mt-1.5 z-10" />

                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-xs text-accent font-mono">{item.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pudding */}
        <ScrollReveal className="mt-20">
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

        {/* Credits */}
        <ScrollReveal className="mt-20">
          <div className="space-y-4 text-sm text-muted">
            <p>{websiteCredits.builtWith}</p>
            <p className="text-xs">{websiteCredits.disclaimer}</p>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
