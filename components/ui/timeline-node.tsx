"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { CareerEvent } from "@/data/types";
import { cn } from "@/lib/utils";

interface TimelineNodeProps {
  event: CareerEvent;
  index: number;
}

const dotColorMap: Record<CareerEvent["type"], string> = {
  join: "bg-accent",
  project: "bg-foreground",
  "role-change": "bg-cta",
  milestone: "bg-accent",
};

const dotRingMap: Record<CareerEvent["type"], string> = {
  join: "ring-accent/30",
  project: "ring-foreground/20",
  "role-change": "ring-cta/30",
  milestone: "ring-accent/30",
};

const cardAccentMap: Record<CareerEvent["type"], string> = {
  join: "border-l-accent border-l-2",
  project: "border-l-foreground/30 border-l-2",
  "role-change": "border-l-cta border-l-2",
  milestone: "border-l-accent border-l-2",
};

const cardBgMap: Record<CareerEvent["type"], string> = {
  join: "",
  project: "",
  "role-change": "",
  milestone: "bg-accent/5 border-accent/20",
};

export function TimelineNode({ event, index }: TimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const isEven = index % 2 === 0;

  const variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, x: isEven ? -30 : 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: "easeOut" as const },
        },
      };

  const mobileVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: "easeOut" as const },
        },
      };

  function CardContent({ titleSize = "text-base" }: { titleSize?: string }) {
    return (
      <>
        <div className="flex items-center gap-3">
          {event.icon && (
            <div className="relative size-10 shrink-0 overflow-hidden rounded-[22%] shadow-sm">
              <Image
                src={event.icon}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h3 className={cn(titleSize, "font-semibold text-foreground")}>
            {event.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {event.description}
        </p>
        {event.details && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
            {event.details}
          </p>
        )}
        {event.metric && (
          <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
            {event.metric}
          </div>
        )}
        {event.tags && event.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_3rem_1fr] md:gap-4 md:items-start">
        {/* Left column */}
        {isEven ? (
          <motion.div
            className="flex justify-end text-right"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="py-1">
              <p className="text-sm font-medium text-muted-foreground">
                {event.date}
              </p>
              {event.company && (
                <p className="text-xs text-muted-foreground/70">
                  {event.company}
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-end"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div
              className={cn(
                "rounded-lg border border-border bg-card p-4 max-w-md w-full",
                cardAccentMap[event.type],
                cardBgMap[event.type],
              )}
            >
              <CardContent />
            </div>
          </motion.div>
        )}

        {/* Center dot */}
        <div className="flex justify-center">
          <div className="relative flex h-full items-start pt-2">
            <span
              className={cn(
                "relative z-10 block rounded-full ring-4",
                dotColorMap[event.type],
                dotRingMap[event.type],
                event.type === "milestone" ? "size-4" : "size-3",
              )}
            />
          </div>
        </div>

        {/* Right column */}
        {isEven ? (
          <motion.div
            className="flex justify-start"
            variants={{
              ...variants,
              hidden: { ...variants.hidden, x: prefersReduced ? 0 : 30 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div
              className={cn(
                "rounded-lg border border-border bg-card p-4 max-w-md w-full",
                cardAccentMap[event.type],
                cardBgMap[event.type],
              )}
            >
              <CardContent />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-start py-1"
            variants={{
              ...variants,
              hidden: { ...variants.hidden, x: prefersReduced ? 0 : 30 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {event.date}
              </p>
              {event.company && (
                <p className="text-xs text-muted-foreground/70">
                  {event.company}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="grid grid-cols-[1.5rem_1fr] gap-4 md:hidden">
        {/* Left line + dot */}
        <div className="flex justify-center">
          <div className="relative flex h-full items-start pt-1">
            <span
              className={cn(
                "relative z-10 block rounded-full ring-4",
                dotColorMap[event.type],
                dotRingMap[event.type],
                event.type === "milestone" ? "size-4" : "size-3",
              )}
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={mobileVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-xs font-medium text-muted-foreground">
            {event.date}
            {event.company && (
              <span className="ml-2 text-muted-foreground/70">
                {event.company}
              </span>
            )}
          </p>
          <div
            className={cn(
              "mt-2 rounded-lg border border-border bg-card p-3",
              cardAccentMap[event.type],
              cardBgMap[event.type],
            )}
          >
            <CardContent titleSize="text-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
