"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/types";

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 md:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-10">
          {/* Description */}
          <motion.div {...fadeIn}>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              프로젝트 소개
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>

          {/* Responsibilities */}
          {project.responsibilities.length > 0 && (
            <motion.div
              {...fadeIn}
              transition={
                prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.1 }
              }
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                담당 업무
              </h2>
              <ul className="space-y-2">
                {project.responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Detail Sections */}
          {project.detailSections?.map((section, index) => (
            <motion.div
              key={index}
              {...fadeIn}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.5, delay: 0.1 * (index + 2) }
              }
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                {section.title}
              </h2>
              {section.image && (
                <div className="relative w-full mb-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8 print:contents">
          {/* Achievements */}
          {project.achievements.length > 0 && (
            <motion.div
              {...fadeIn}
              transition={
                prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.2 }
              }
              className="print:order-1"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                주요 성과
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 text-center"
                  >
                    {achievement.icon && (
                      <span className="text-xl mb-1 block">
                        {achievement.icon}
                      </span>
                    )}
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {achievement.value}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {achievement.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <motion.div
              {...fadeIn}
              transition={
                prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.3 }
              }
              className="print:order-2"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                기술 스택
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links */}
          {project.links.length > 0 && (
            <motion.div
              {...fadeIn}
              transition={
                prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.4 }
              }
              className="print:order-4"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                링크
              </h3>
              <div className="flex flex-col gap-3">
                {project.links.map((link) => {
                  const ytId = extractYouTubeId(link.url);
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                      {ytId && (
                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                            alt={link.label}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-transform duration-300 group-hover:scale-110">
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 ml-0.5"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="px-3 py-2">
                        <span className="text-sm text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50 transition-colors">
                          {link.label}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
