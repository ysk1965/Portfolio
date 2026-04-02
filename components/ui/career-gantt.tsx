"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { careerEvents, positionEvents } from "@/data/career";
import type { CareerEvent } from "@/data/types";

interface GanttSegment {
  label?: string;
  start: number;
  end: number;
  color?: string;
  icon?: string;
  eventId?: string; // links to careerEvents
  tooltip?: string; // fallback if no eventId
}

interface GanttItem {
  label: string;
  segments: GanttSegment[];
  color: string;
  icon?: string;
}

interface GanttRow {
  category: string;
  items: GanttItem[];
}

const EPOCH_YEAR = 2019;
const CURRENT_MONTH = toMonths(2026, 4);

function toMonths(year: number, month: number): number {
  return (year - EPOCH_YEAR) * 12 + (month - 1);
}

function formatDate(months: number): string {
  const year = EPOCH_YEAR + Math.floor(months / 12);
  const month = (months % 12) + 1;
  return `${year}.${String(month).padStart(2, "0")}`;
}

// Build lookup map
const eventMap = new Map<string, CareerEvent>();
for (const e of [...careerEvents, ...positionEvents]) {
  eventMap.set(e.id, e);
}

const positions: GanttItem[] = [
  {
    label: "Programmer",
    segments: [
      {
        start: toMonths(2019, 4),
        end: toMonths(2022, 4),
        color: "var(--accent)",
        eventId: "position-client-programmer",
      },
      {
        start: toMonths(2022, 4),
        end: CURRENT_MONTH,
        label: "Product Owner",
        color: "var(--cta)",
        eventId: "position-product-owner",
      },
    ],
    color: "var(--accent)",
  },
];

const companies: GanttItem[] = [
  {
    label: "KRAFTON",
    segments: [
      {
        start: toMonths(2019, 4),
        end: toMonths(2020, 4),
        icon: "/symbol/ci_krafton.jpg",
        color: "var(--accent)",
        eventId: "krafton-join",
      },
      {
        start: toMonths(2020, 4),
        end: CURRENT_MONTH,
        label: "COOKAPPS",
        icon: "/symbol/symbol_9.png",
        color: "var(--cta)",
        eventId: "cookapps-join",
      },
    ],
    color: "var(--accent)",
  },
];

const projects: GanttItem[] = [
  {
    label: "TERA Origin",
    segments: [
      {
        start: toMonths(2019, 4),
        end: toMonths(2020, 4),
        color: "var(--accent)",
        icon: "/icon/AppIcon_TERAOrigin.webp",
        eventId: "tera-origin-project",
      },
      {
        start: toMonths(2020, 4),
        end: toMonths(2021, 1),
        label: "랜덤로얄",
        icon: "/icon/AppIcon_RandomRoyale.webp",
        eventId: "random-royale-project",
      },
      {
        start: toMonths(2021, 1),
        end: toMonths(2022, 4),
        label: "오늘도던전",
        icon: "/icon/AppIcon_AFKDungeon.webp",
        eventId: "dungeon-today",
      },
      {
        start: toMonths(2022, 4),
        end: toMonths(2024, 9),
        label: "무명기사단",
        icon: "/icon/AppIcon_UnknownKnights.webp",
        eventId: "po-transition",
      },
      {
        start: toMonths(2024, 9),
        end: toMonths(2025, 2),
        label: "GoWest",
        icon: "/icon/AppIcon_GoWest.webp",
        eventId: "gowest-project",
      },
      {
        start: toMonths(2025, 2),
        end: toMonths(2025, 10),
        label: "무명기사단",
        icon: "/icon/AppIcon_UnknownKnights.webp",
        eventId: "china-launch",
      },
      {
        start: toMonths(2025, 10),
        end: CURRENT_MONTH,
        label: "스텔라나이츠",
        icon: "/icon/AppIcon_AutoBattler.webp",
        eventId: "ax-transformation",
      },
    ],
    color: "var(--cta)",
    icon: "/icon/AppIcon_TERAOrigin.webp",
  },
  {
    label: "스텔라나이츠",
    segments: [
      {
        start: toMonths(2024, 4),
        end: toMonths(2024, 9),
        eventId: "stella-knights-project",
      },
    ],
    color: "var(--cta)",
    icon: "/icon/AppIcon_AutoBattler.webp",
  },
  {
    label: "SuperRookie",
    segments: [
      {
        start: toMonths(2024, 4),
        end: toMonths(2024, 9),
        eventId: "super-rookie-project",
      },
    ],
    color: "var(--cta)",
    icon: "/icon/AppIcon_SuperRookie.jpeg",
  },
];

const rows: GanttRow[] = [
  { category: "Position", items: positions },
  { category: "Company", items: companies },
  { category: "Project", items: projects },
];

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

function HoverCard({
  event,
  period,
  icon,
}: {
  event: CareerEvent;
  period: string;
  icon?: string;
}) {
  const displayIcon = icon ?? event.icon;
  return (
    <div className="w-72 rounded-lg border border-border bg-card p-4 shadow-xl">
      <div className="flex items-center gap-3">
        {displayIcon && (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-[22%] shadow-sm">
            <Image
              src={displayIcon}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            {event.title}
          </h4>
          <p className="text-[11px] text-muted-foreground">{period}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{event.description}</p>
      {event.details && (
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground/80">
          {event.details}
        </p>
      )}
      {event.metric && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
          {event.metric}
        </div>
      )}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SimpleTooltip({
  label,
  period,
  tooltip,
}: {
  label: string;
  period: string;
  tooltip?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl whitespace-nowrap">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{period}</p>
      {tooltip && (
        <p className="mt-1 text-[11px] text-muted-foreground/80 max-w-[240px] whitespace-normal">
          {tooltip}
        </p>
      )}
    </div>
  );
}

function GanttBar({
  seg,
  item,
  left,
  width,
  isInView,
  prefersReduced,
  delay,
}: {
  seg: GanttSegment;
  item: GanttItem;
  left: number;
  width: number;
  isInView: boolean;
  prefersReduced: boolean | null;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [cardPos, setCardPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const barRef = useRef<HTMLDivElement>(null);
  const displayLabel = seg.label ?? item.label;
  const segColor = seg.color ?? item.color;
  const segIcon = seg.icon ?? item.icon;
  const period = `${formatDate(seg.start)} ~ ${seg.end === CURRENT_MONTH ? "현재" : formatDate(seg.end)}`;
  const event = seg.eventId ? eventMap.get(seg.eventId) : undefined;

  const updateCardPos = useCallback(() => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    setCardPos({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  }, []);

  useEffect(() => {
    if (!hovered) return;
    updateCardPos();
    window.addEventListener("scroll", updateCardPos, true);
    return () => window.removeEventListener("scroll", updateCardPos, true);
  }, [hovered, updateCardPos]);

  return (
    <>
      <motion.div
        ref={barRef}
        className="absolute top-0 h-full rounded-md flex items-center overflow-visible"
        style={{
          left: `${left}%`,
          zIndex: hovered ? 20 : 1,
        }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${width}%` } : { width: 0 }}
        transition={
          prefersReduced
            ? { duration: 0.01 }
            : { duration: 0.6, delay, ease: "easeOut" }
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative flex h-full w-full cursor-pointer items-center overflow-hidden rounded-md transition-all duration-200"
          style={{
            backgroundColor: segColor,
            boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
            transform: hovered ? "scale(1, 1.15)" : "scale(1, 1)",
          }}
        >
          <div className="flex items-center gap-1.5 px-2 min-w-0">
            {segIcon ? (
              <div className="relative size-4 shrink-0 overflow-hidden rounded-[22%] sm:size-5">
                <Image
                  src={segIcon}
                  alt={displayLabel}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="flex size-4 shrink-0 items-center justify-center rounded-[22%] bg-white/25 text-[8px] font-bold text-white sm:size-5 sm:text-[9px]">
                {displayLabel.charAt(0)}
              </span>
            )}
            <span className="truncate text-[10px] font-medium text-white sm:text-xs whitespace-nowrap">
              {displayLabel}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hover Card — rendered via portal to avoid overflow clipping */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && cardPos && (
              <motion.div
                className="pointer-events-none fixed z-50"
                style={{
                  top: cardPos.top - window.scrollY,
                  left: cardPos.left - window.scrollX,
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="border-[6px] border-transparent border-b-border" />
                </div>
                <div className="flex justify-center -mt-[13px]">
                  <div className="border-[6px] border-transparent border-b-card" />
                </div>
                {event ? (
                  <HoverCard event={event} period={period} icon={segIcon} />
                ) : (
                  <SimpleTooltip
                    label={displayLabel}
                    period={period}
                    tooltip={seg.tooltip}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function CareerGantt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  const totalMonths = CURRENT_MONTH;

  return (
    <motion.div
      ref={ref}
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReduced ? 0 : 12 }
      }
      transition={
        prefersReduced ? { duration: 0.01 } : { duration: 0.5, ease: "easeOut" }
      }
    >
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 overflow-x-auto overflow-y-visible">
        {/* Year header */}
        <div className="flex min-w-[600px]">
          <div className="w-20 shrink-0 sm:w-24" />
          <div className="relative flex-1">
            <div className="flex">
              {years.map((year) => {
                const startMonth = toMonths(year, 1);
                const endMonth = Math.min(toMonths(year + 1, 1), totalMonths);
                const width = ((endMonth - startMonth) / totalMonths) * 100;
                if (width <= 0) return null;
                return (
                  <div
                    key={year}
                    className="text-xs font-medium text-muted-foreground border-l border-border/50 pl-1"
                    style={{ width: `${width}%` }}
                  >
                    {year}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <div key={row.category} className="mt-3">
            <div className="flex min-w-[600px] items-start">
              <div className="w-20 shrink-0 pt-1 sm:w-24">
                <span className="text-xs font-semibold text-foreground">
                  {row.category}
                </span>
              </div>
              <div className="relative flex-1">
                {/* Grid lines */}
                <div className="pointer-events-none absolute inset-0 flex">
                  {years.map((year) => {
                    const startMonth = toMonths(year, 1);
                    const endMonth = Math.min(
                      toMonths(year + 1, 1),
                      totalMonths,
                    );
                    const width = ((endMonth - startMonth) / totalMonths) * 100;
                    if (width <= 0) return null;
                    return (
                      <div
                        key={year}
                        className="border-l border-border/30"
                        style={{ width: `${width}%` }}
                      />
                    );
                  })}
                </div>

                {/* Bars */}
                <div className="relative flex flex-col gap-1 py-1">
                  {row.items.map((item, i) => (
                    <motion.div
                      key={`${item.label}-${i}`}
                      className="relative h-7 sm:h-8"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={
                        prefersReduced
                          ? { duration: 0.01 }
                          : { duration: 0.3, delay: 0.1 + i * 0.04 }
                      }
                    >
                      {item.segments.map((seg, si) => {
                        const segLeft = (seg.start / totalMonths) * 100;
                        const segWidth =
                          ((seg.end - seg.start) / totalMonths) * 100;

                        return (
                          <GanttBar
                            key={si}
                            seg={seg}
                            item={item}
                            left={segLeft}
                            width={segWidth}
                            isInView={isInView}
                            prefersReduced={prefersReduced}
                            delay={0.2 + i * 0.06 + si * 0.1}
                          />
                        );
                      })}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
