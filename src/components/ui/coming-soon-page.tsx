"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, Construction, Sparkles } from "lucide-react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { ComingSoonProject } from "@/data/playground";

interface ComingSoonPageProps {
  project: ComingSoonProject;
}

export default function ComingSoonPage({ project }: ComingSoonPageProps) {
  return (
    <PageTransition>
      <main className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Playground
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="relative overflow-hidden rounded-lg border border-border bg-surface">
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="relative p-8 md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent mb-8">
                <Clock3 className="w-3.5 h-3.5" />
                {project.statusLabel}
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
                  <p className="text-lg text-muted mb-6">{project.subtitle}</p>
                  <p className="text-sm md:text-base text-foreground/80 leading-7 max-w-2xl">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg border border-accent/20 bg-accent/10 flex items-center justify-center">
                      <Construction className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Coming Soon</p>
                      <p className="text-xs text-muted">Planned before public launch</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-3 text-sm text-foreground/85">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </PageTransition>
  );
}
