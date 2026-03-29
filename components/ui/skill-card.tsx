"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/data/types";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-64px" });
  const prefersReducedMotion = useReducedMotion();

  const tagVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: (i: number) => ({
          opacity: 1,
          transition: { delay: i * 0.03, duration: 0.2 },
        }),
      };

  let globalTagIndex = 0;

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <h4 className="mb-3 text-lg font-semibold text-foreground">
        {category.title}
      </h4>

      {category.description && (
        <p className="mb-4 text-sm text-muted-foreground">
          {category.description}
        </p>
      )}

      {category.subCategories?.map((sub) => {
        const startIndex = globalTagIndex;
        globalTagIndex += sub.items.length;

        return (
          <div key={sub.title} className="mb-4 last:mb-0">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              {sub.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {sub.items.map((item, i) => (
                <motion.span
                  key={item.name}
                  className="inline-flex rounded-md bg-muted px-3 py-1 text-sm text-foreground"
                  variants={tagVariants}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  custom={startIndex + i}
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          </div>
        );
      })}

      {!category.subCategories && category.items && (
        <div className="flex flex-wrap gap-2">
          {category.items.map((item, i) => (
            <motion.span
              key={item.name}
              className="inline-flex rounded-md bg-muted px-3 py-1 text-sm text-foreground"
              variants={tagVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              custom={i}
            >
              {item.name}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
