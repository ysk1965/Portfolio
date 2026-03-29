"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  "hero",
  "about",
  "career",
  "projects",
  "skills",
  "sharing",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}

export { SECTIONS };
