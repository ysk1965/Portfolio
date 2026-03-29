"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FileText, Play } from "lucide-react";
import type { SharingItem } from "@/data/types";

interface SharingCardProps {
  item: SharingItem;
  index: number;
}

function getLinkIcon(label: string) {
  if (label.toLowerCase().includes("youtube")) return Play;
  return FileText;
}

export function SharingCard({ item, index }: SharingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-64px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="group rounded-xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 24 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut" as const, delay: index * 0.1 }
      }
    >
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
        <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {item.tagLabel}
        </span>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>

      <div className="flex flex-wrap gap-2">
        {item.links.map((link) => {
          const Icon = getLinkIcon(link.label);
          const isYoutube = link.label.toLowerCase().includes("youtube");
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isYoutube
                  ? "inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                  : "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              }
            >
              <Icon className="size-3.5" />
              {link.label}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
