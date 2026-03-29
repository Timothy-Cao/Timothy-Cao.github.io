"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { Mail, Send, Check } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const socials = [
  { icon: GithubIcon, label: "GitHub" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: TwitterIcon, label: "X / Twitter" },
  { icon: Mail, label: "Email" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formspree.io/f/myzyavkz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch {
      // silently fail
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-muted max-w-md mx-auto">
              Message me about anything except my car&apos;s extended warranty.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 focus:shadow-[0_0_10px_var(--color-accent-glow)] transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 focus:shadow-[0_0_10px_var(--color-accent-glow)] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 focus:shadow-[0_0_10px_var(--color-accent-glow)] transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  submitted
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)]"
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </ScrollReveal>

          {/* Social links + decoration */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-surface border border-border">
                <h2 className="text-lg font-semibold mb-6">Connect With Me</h2>
                <div className="space-y-4">
                  {socials.map((social) => (
                    <div
                      key={social.label}
                      className="flex items-center gap-4 p-3 rounded-lg opacity-40 cursor-default"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted/10 border border-muted/20 flex items-center justify-center">
                        <social.icon className="w-5 h-5 text-muted" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted">
                          {social.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated beam decoration */}
              <div className="relative h-px">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <motion.div
                  className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-accent to-transparent"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="text-center text-sm text-muted">
                <p>Based in California</p>
                <p className="mt-1">Usually responds within 24 hours</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
