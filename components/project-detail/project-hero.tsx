import Image from "next/image";
import type { Project } from "@/data/types";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="w-full">
      {/* Project Metadata */}
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        <div className="flex items-center gap-5">
          {project.icon && (
            <div className="relative size-16 shrink-0 overflow-hidden rounded-[22%] shadow-lg md:size-20">
              <Image
                src={project.icon}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl font-heading">
            {project.title}
          </h1>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{project.period}</span>
          {project.company && (
            <>
              <span className="hidden sm:inline" aria-hidden="true">
                &middot;
              </span>
              <span>{project.company}</span>
            </>
          )}
          {project.publisher && (
            <>
              <span className="hidden sm:inline" aria-hidden="true">
                &middot;
              </span>
              <span>퍼블리싱: {project.publisher}</span>
            </>
          )}
          <span className="hidden sm:inline" aria-hidden="true">
            &middot;
          </span>
          <span>{project.role}</span>
        </div>
      </div>
    </section>
  );
}
