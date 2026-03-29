"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href="#about"
      className="inline-flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      aria-label="아래로 스크롤"
    >
      <span className="text-xs font-medium tracking-wide uppercase">
        Scroll
      </span>
      {prefersReducedMotion ? (
        <ChevronDown className="size-5" />
      ) : (
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      )}
    </a>
  );
}
