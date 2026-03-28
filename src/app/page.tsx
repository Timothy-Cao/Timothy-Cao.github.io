"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "@/components/particles";
import Meteors from "@/components/ui/meteors";
import BorderBeam from "@/components/ui/border-beam";
import PageTransition from "@/components/page-transition";
import { useTheme } from "@/components/theme-provider";

export default function Home() {
  const { theme } = useTheme();
  const isCyan = theme.name === "limitless";

  const profileImage: Record<string, string> = {
    cyber: "/assets/media/profile/cyber.jpg",
    matrix: "/assets/media/profile/matrix.png",
    crimson: "/assets/media/profile/crimson.png",
  };
  const currentProfile = profileImage[theme.name] ?? "/assets/media/profile/cyber.jpg";

  return (
    <PageTransition>
      <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        {isCyan && <Meteors count={18} />}

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-accent/30">
              <BorderBeam duration={6} />
              <Image
                key={currentProfile}
                src={currentProfile}
                alt="Timothy Cao"
                fill
                className="object-cover relative z-10"
                priority
              />
            </div>
            {/* Glow behind avatar */}
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl -z-10 scale-150" />
          </motion.div>

          {/* Name with text reveal */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {"Timothy Cao".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Terminal window with typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="relative rounded-lg border border-accent/20 bg-[rgba(10,10,10,0.8)] backdrop-blur-sm overflow-hidden w-[340px] md:w-[420px]"
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-accent/10 bg-[rgba(255,255,255,0.03)]">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
              <span className="text-[10px] text-muted/50 ml-2 font-mono">tim@portfolio</span>
            </div>
            {/* Terminal content */}
            <div className="px-5 py-3 font-mono text-xl md:text-2xl">
              <span className="text-muted/50 mr-2">$</span>
              <TypeAnimation
                sequence={[
                  "Security Engineer",
                  2000,
                  "Software Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent"
              />
              <span className="inline-block w-2.5 h-5 bg-accent/70 ml-1 animate-pulse align-middle" />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <Link
              href="/about"
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full border border-accent/30 text-accent font-medium transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] hover:bg-accent/5"
            >
              Explore
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
