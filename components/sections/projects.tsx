"use client";

import { Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getProjectsByCategory } from "@/data/projects";
import { gamejamProjects } from "@/data/gamejam-projects";
import { ProjectCard } from "@/components/ui/project-card";
import { GameJamCard } from "@/components/ui/gamejam-card";
import { TabFilter } from "@/components/ui/tab-filter";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  { id: "career", label: "커리어 프로젝트" },
  { id: "side", label: "사이드 프로젝트" },
  { id: "gamejam", label: "게임잼 프로젝트" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabParam = searchParams.get("tab");
  const activeTab =
    tabParam === "side"
      ? "side"
      : tabParam === "gamejam"
        ? "gamejam"
        : "career";

  const handleTabChange = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const filtered =
    activeTab !== "gamejam"
      ? getProjectsByCategory(activeTab as "career" | "side")
      : [];

  // Group career projects by company
  const groupedByCompany =
    activeTab === "career"
      ? filtered.reduce<Record<string, typeof filtered>>((acc, project) => {
          const company = project.company ?? "기타";
          if (!acc[company]) acc[company] = [];
          acc[company].push(project);
          return acc;
        }, {})
      : null;

  return (
    <>
      <TabFilter tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      <div className="mt-10">
        {activeTab === "career" && groupedByCompany ? (
          Object.entries(groupedByCompany).map(([company, companyProjects]) => (
            <div key={company} className="mb-10 last:mb-0">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {company}
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {companyProjects.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    custom={i}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : activeTab === "gamejam" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {gamejamProjects.map((project, i) => (
              <motion.div
                key={project.youtubeId}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <GameJamCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="font-heading mb-10 text-3xl font-bold tracking-tight text-foreground">
        Projects
      </h2>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
