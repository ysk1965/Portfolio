import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { ProjectContent } from "@/components/project-detail/project-content";
import { ProjectNav } from "@/components/project-detail/project-nav";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectNav slug={project.slug} category={project.category} />
    </main>
  );
}
