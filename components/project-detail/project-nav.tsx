"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects } from "@/data/projects";

interface ProjectNavProps {
  slug: string;
  category: "career" | "side";
}

export function ProjectNav({ slug, category }: ProjectNavProps) {
  const { prev, next } = getAdjacentProjects(slug, category);

  return (
    <nav className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-8">
        <div className="flex items-center justify-between">
          {/* Previous Project */}
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              <motion.span
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.span>
              <div className="text-left">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  이전 프로젝트
                </p>
                <p className="text-sm font-medium">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next Project */}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  다음 프로젝트
                </p>
                <p className="text-sm font-medium">{next.title}</p>
              </div>
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
