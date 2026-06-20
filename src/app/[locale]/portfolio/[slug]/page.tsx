import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { projectBySlugQuery, projectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectProblemSolution } from "@/components/project/ProjectProblemSolution";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectRelatedWork } from "@/components/project/ProjectRelatedWork";

// Revalidate Sanity-sourced content at most once per minute (ISR).
export const revalidate = 60;

// Pre-render all known slugs at build time
export async function generateStaticParams() {
  const projects: SanityProject[] = await client.fetch(projectsQuery);
  return projects.map((p) => ({ slug: p.slug.current }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("project");

  const project: SanityProject | null = await client.fetch(
    projectBySlugQuery,
    { slug }
  );

  if (!project) notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Back link */}
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-3 text-sm text-graphite/75 transition-colors hover:text-graphite"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToPortfolio")}
        </Link>

        <ProjectHero project={project} />

        <ProjectMedia project={project} />

        {project.fullDescription && (
          <p className="mb-16 text-[1.0625rem] leading-relaxed text-graphite/70">
            {project.fullDescription}
          </p>
        )}

        <ProjectProblemSolution
          problem={project.problem}
          solution={project.solution}
        />

        <ProjectGallery gallery={project.gallery} title={project.title} />

        <ProjectRelatedWork projects={project.relatedProjects} />

      </div>
    </div>
  );
}
