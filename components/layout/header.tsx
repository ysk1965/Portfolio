"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowLeft, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useActiveSection,
  SECTIONS,
  type SectionId,
} from "@/lib/hooks/use-active-section";
import { MobileNav } from "./mobile-nav";
import { PdfDownloadButton } from "@/components/pdf/pdf-download-button";

const NAV_LABELS: Record<SectionId, string> = {
  hero: "Home",
  about: "About",
  education: "Education",
  career: "Career",
  projects: "Projects",
  skills: "Skills",
  sharing: "Sharing",
  contact: "Contact",
};

export function Header() {
  const pathname = usePathname();
  const isMain = pathname === "/";
  const activeSection = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto max-w-6xl flex items-center justify-between h-16 px-4 md:px-6">
          {isMain ? (
            <>
              <Link
                href="/"
                className="font-heading text-lg font-bold tracking-tight cursor-pointer"
              >
                Portfolio
              </Link>

              {/* Desktop nav */}
              <ul className="hidden md:flex items-center gap-1">
                {SECTIONS.filter((s) => s !== "hero").map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer",
                        activeSection === id
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {NAV_LABELS[id]}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1">
                <PdfDownloadButton />
                {/* Mobile hamburger */}
                <button
                  className="md:hidden p-2 cursor-pointer"
                  onClick={() => setMobileOpen(true)}
                  aria-label="메뉴 열기"
                >
                  <Menu className="size-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/#projects"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                <span>돌아가기</span>
              </Link>
              <button
                onClick={() => {
                  const imgs = document.querySelectorAll<HTMLImageElement>(
                    'img[loading="lazy"]',
                  );
                  imgs.forEach((img) => img.setAttribute("loading", "eager"));
                  Promise.all(
                    Array.from(document.images)
                      .filter((img) => !img.complete)
                      .map(
                        (img) =>
                          new Promise<void>((r) => {
                            img.onload = () => r();
                            img.onerror = () => r();
                          }),
                      ),
                  ).then(() => window.print());
                }}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="PDF 내보내기"
              >
                <FileDown className="size-5" />
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      {/* Mobile nav overlay */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
        labels={NAV_LABELS}
      />
    </>
  );
}
