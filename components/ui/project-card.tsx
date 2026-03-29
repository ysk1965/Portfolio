"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* 16:9 image container */}
      <div className="relative aspect-video overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-lg font-medium text-muted-foreground">
              {project.title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-white/80">
            {project.company ?? "사이드 프로젝트"}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
