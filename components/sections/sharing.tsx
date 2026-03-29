"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sharingItems } from "@/data/sharing";
import { SharingCard } from "@/components/ui/sharing-card";

export function Sharing() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Sharing
        </h2>
        <p className="mt-2 text-muted-foreground">발표와 세션</p>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-64px" }}
        >
          {sharingItems.map((item, index) => (
            <SharingCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
