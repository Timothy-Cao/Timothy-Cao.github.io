"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  badge?: ReactNode;
}

export default function Accordion({ title, children, isOpen, onToggle, badge }: AccordionProps) {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden transition-colors hover:border-accent/20">
      <button
        className="w-full p-4 text-left flex justify-between items-center gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-semibold text-foreground truncate">{title}</span>
          {badge}
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl text-muted flex-shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
