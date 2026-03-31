import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { ProjectContent } from "@/components/project-detail/project-content";
import { AllProjectsPrintButton } from "@/components/pdf/all-projects-print-button";

export const metadata: Metadata = {
  title: "전체 프로젝트 | Portfolio",
  description: "모든 프로젝트 상세 정보",
};

const sorted = [...projects].sort((a, b) => a.order - b.order);

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <AllProjectsPrintButton />
      {sorted.map((project) => (
        <article key={project.slug} className="all-projects-item">
          <ProjectHero project={project} />
          <ProjectContent project={project} />
        </article>
      ))}
    </main>
  );
}
