"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  fullWidth = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section id={id} ref={ref} className={cn("py-14 md:py-20", className)}>
      <motion.div
        className={cn(!fullWidth && "mx-auto max-w-6xl px-4 md:px-6")}
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 20 }
        }
        transition={
          prefersReduced
            ? { duration: 0.01 }
            : { duration: 0.4, ease: "easeOut" as const }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}
