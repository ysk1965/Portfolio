"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { careerEvents } from "@/data/career";
import { TimelineNode } from "@/components/ui/timeline-node";
import { CareerGantt } from "@/components/ui/career-gantt";

export function Career() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref}>
      {/* Section heading */}
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
        Career
      </motion.h2>

      {/* Gantt Chart */}
      <div className="mt-8 md:mt-10">
        <CareerGantt />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line - desktop center */}
        <div className="absolute left-[0.75rem] top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-px" />

        {/* Vertical line - mobile left */}
        <div className="absolute left-[0.75rem] top-0 block h-full w-px bg-border md:hidden" />

        {/* Timeline nodes */}
        <div className="flex flex-col gap-8 md:gap-10">
          {careerEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={
                prefersReduced
                  ? { duration: 0.01 }
                  : { duration: 0.3, delay: index * 0.05 }
              }
            >
              <TimelineNode event={event} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
