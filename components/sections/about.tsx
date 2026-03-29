"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import { achievements, narrative } from "@/data/about";
import { AchievementBadge } from "@/components/ui/achievement-badge";
import { Button } from "@/components/ui/button";

const VISIBLE_PARAGRAPHS = 3;

function renderWithHighlights(
  text: string,
  highlights: string[],
): React.ReactNode {
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="font-medium text-foreground">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center font-heading text-3xl font-bold"
      >
        About
      </motion.h2>

      {/* Achievement badges */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {achievements.map((achievement, index) => (
          <AchievementBadge
            key={achievement.label}
            label={achievement.label}
            value={achievement.value}
            icon={achievement.icon ?? ""}
            index={index}
          />
        ))}
      </div>

      {/* Narrative */}
      <div className="space-y-5">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg font-semibold leading-relaxed tracking-tight text-foreground"
        >
          {narrative.summary}
        </motion.p>

        <div className="my-6 h-px w-16 bg-border" />

        {/* First 2 paragraphs always visible */}
        {narrative.paragraphs.slice(0, VISIBLE_PARAGRAPHS).map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            className="text-[0.9375rem] leading-[1.75] text-muted-foreground"
          >
            {renderWithHighlights(p, narrative.highlights)}
          </motion.p>
        ))}

        {/* Remaining paragraphs: always visible on desktop, toggled on mobile */}
        {narrative.paragraphs.length > VISIBLE_PARAGRAPHS && (
          <>
            <div
              className={`space-y-5 md:block ${expanded ? "block" : "hidden"}`}
            >
              {narrative.paragraphs.slice(VISIBLE_PARAGRAPHS).map((p, i) => (
                <motion.p
                  key={i + VISIBLE_PARAGRAPHS}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * (i + VISIBLE_PARAGRAPHS + 1),
                  }}
                  className="text-[0.9375rem] leading-[1.75] text-muted-foreground"
                >
                  {renderWithHighlights(p, narrative.highlights)}
                </motion.p>
              ))}
            </div>

            {/* Mobile-only toggle button */}
            <div className="pt-2 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? (
                  <>
                    접기 <ChevronUp className="ml-1 size-4" />
                  </>
                ) : (
                  <>
                    더 보기 <ChevronDown className="ml-1 size-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
