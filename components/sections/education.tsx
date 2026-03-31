"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { educationItems } from "@/data/education";
import type { EducationItem } from "@/data/types";
import { cn } from "@/lib/utils";

const accentMap: Record<EducationItem["type"], string> = {
  education: "border-l-accent border-l-2",
  award: "border-l-cta border-l-2",
  activity: "border-l-foreground/30 border-l-2",
  certificate: "border-l-accent/60 border-l-2",
  launch: "border-l-emerald-500 border-l-2",
  join: "border-l-violet-500 border-l-2",
};

const tagLabelMap: Record<EducationItem["type"], string> = {
  education: "EDUCATION",
  activity: "ACTIVITY",
  launch: "LAUNCH",
  award: "AWARD",
  certificate: "ACTIVITY",
  join: "JOIN",
};

const tagStyleMap: Record<EducationItem["type"], string> = {
  education: "bg-accent/10 text-accent",
  activity: "bg-foreground/8 text-foreground/60",
  launch: "bg-emerald-500/10 text-emerald-600",
  award: "bg-cta/10 text-cta",
  certificate: "bg-foreground/8 text-foreground/60",
  join: "bg-violet-500/10 text-violet-600",
};

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref}>
      <motion.h2
        className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 16 }
        }
        transition={
          prefersReduced
            ? { duration: 0.01 }
            : { duration: 0.4, ease: "easeOut" as const }
        }
      >
        Education & Activities
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {educationItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={cn(
              "rounded-lg border border-border bg-card p-4",
              accentMap[item.type],
            )}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16 }
            }
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : {
                    duration: 0.35,
                    delay: index * 0.06,
                    ease: "easeOut" as const,
                  }
            }
          >
            <div className="flex items-start gap-3">
              {item.icon && (
                <div className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                      tagStyleMap[item.type],
                    )}
                  >
                    {tagLabelMap[item.type]}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.year}
                  </p>
                </div>
                <h3 className="mt-1 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
