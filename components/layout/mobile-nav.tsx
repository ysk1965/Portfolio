"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionId } from "@/lib/hooks/use-active-section";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  activeSection: SectionId;
  labels: Record<SectionId, string>;
}

export function MobileNav({
  open,
  onClose,
  activeSection,
  labels,
}: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 z-50 h-full w-64 bg-background border-l border-border shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-heading text-lg font-bold">Menu</span>
              <button
                onClick={onClose}
                className="p-2 cursor-pointer"
                aria-label="메뉴 닫기"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="flex flex-col p-4 gap-1">
              {SECTIONS.filter((s) => s !== "hero").map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 cursor-pointer",
                      activeSection === id
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {labels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
