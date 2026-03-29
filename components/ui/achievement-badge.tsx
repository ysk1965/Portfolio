"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  Users,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  users: Users,
  rocket: Rocket,
};

function parseNumericValue(value: string): {
  isNumeric: boolean;
  number: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    return {
      isNumeric: true,
      number: parseInt(match[2], 10),
      prefix: match[1],
      suffix: match[3],
    };
  }
  return { isNumeric: false, number: 0, prefix: "", suffix: "" };
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayNumber, setDisplayNumber] = useState(0);
  const parsed = parseNumericValue(value);

  useEffect(() => {
    if (!isInView || !parsed.isNumeric) return;

    const target = parsed.number;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, parsed.isNumeric, parsed.number]);

  if (!parsed.isNumeric) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-foreground"
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className="text-2xl font-bold text-foreground">
      {parsed.prefix}
      {isInView ? displayNumber : 0}
      {parsed.suffix}
    </span>
  );
}

interface AchievementBadgeProps {
  label: string;
  value: string;
  icon: string;
  index: number;
}

export function AchievementBadge({
  label,
  value,
  icon,
  index,
}: AchievementBadgeProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      {Icon && <Icon className="size-5 text-muted-foreground" />}
      <AnimatedValue value={value} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  );
}
