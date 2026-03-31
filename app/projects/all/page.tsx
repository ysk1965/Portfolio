import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { ProjectContent } from "@/components/project-detail/project-content";
import { AllProjectsPrintButton } from "@/components/pdf/all-projects-print-button";

export const metadata: Metadata = {
  title: "전체 프로젝트 | Portfolio",
  description: "모든 프로젝트 상세 정보",
};

function parseStartDate(period: string): number {
  const match = period.match(/^(\d{4})(?:\.(\d{2}))?/);
  if (!match) return 0;
  const year = parseInt(match[1], 10);
  const month = match[2] ? parseInt(match[2], 10) : 1;
  return year * 100 + month;
}

const sorted = [...projects].sort(
  (a, b) => parseStartDate(b.period) - parseStartDate(a.period),
);

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
