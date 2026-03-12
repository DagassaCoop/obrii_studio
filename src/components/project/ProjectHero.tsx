import { SanityProject } from "@/lib/sanity/types";
import { ProjectShareButton } from "@/components/project/ProjectShareButton";

const categoryLabels: Record<string, string> = {
  video: "Video Production",
  social: "Social Campaign",
  smm: "Social Media",
};

interface ProjectHeroProps {
  project: Pick<SanityProject, "title" | "category" | "year" | "shortDescription">;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const categoryLabel = categoryLabels[project.category] ?? project.category;

  return (
    <div className="mb-16">
      {/* Row: category · year on left, Share on right */}
      <p className="text-[11px] font-medium uppercase tracking-[0.30em] text-terracotta">
        {categoryLabel}
        {project.year && (
          <span className="text-terracotta/60"> · {project.year}</span>
        )}
      </p>

      <div className="flex items-end justify-between gap-4 mt-2">
        {/* Title */}
        <h1 className="font-slab text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-graphite">
          {project.title}
        </h1>

        <ProjectShareButton title={project.title} />
      </div>
    </div>
  );
}
