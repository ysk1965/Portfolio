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
      {/* 목차 (첫 페이지) */}
      <section className="all-projects-toc mx-auto max-w-5xl px-6 md:px-8 py-16 print:py-0 print:flex print:flex-col print:justify-center print:min-h-[85vh]">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading mb-2">
          프로젝트 포트폴리오
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
          전체 {sorted.length}개 프로젝트
        </p>
        <ol className="space-y-4">
          {sorted.map((project, index) => (
            <li key={project.slug} className="flex items-baseline gap-4">
              <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {project.period}
                  {project.company && ` · ${project.company}`} · {project.role}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <AllProjectsPrintButton />

        {/* 프린트 시에만 표시 — 라이브 포트폴리오 링크 */}
        <div className="hidden print:block mt-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center">
          <p className="text-xs text-zinc-500 mb-1">
            자세한 포트폴리오는 웹페이지에서 확인해주세요
          </p>
          <a
            href="https://portfolio-nine-sooty-6qbilrilws.vercel.app/"
            className="text-sm font-medium text-blue-500 underline underline-offset-2"
          >
            portfolio-nine-sooty-6qbilrilws.vercel.app
          </a>
        </div>
      </section>

      {/* 프로젝트 상세 */}
      {sorted.map((project) => (
        <article key={project.slug} className="all-projects-item">
          <ProjectHero project={project} />
          <ProjectContent project={project} />
        </article>
      ))}
    </main>
  );
}
