import { SanityProject } from "@/lib/sanity/types";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

const gapClasses: Record<string, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

interface ProjectGridProps {
  /** Array of projects to render */
  projects: SanityProject[];

  // ── Section heading (optional) ─────────────────────────────
  /** Overline text above the title */
  overline?: string;
  /** Section title */
  title?: string;
  /** Heading alignment, default "left" */
  headingAlign?: "left" | "center";

  // ── Grid config ────────────────────────────────────────────
  /** Number of grid columns, default 2 */
  columns?: 1 | 2 | 3;
  /** Grid gap size, default "md" */
  gap?: "sm" | "md" | "lg";

  // ── Style overrides ────────────────────────────────────────
  /** Extra classes on the outer wrapper div */
  className?: string;
  /** Extra classes on the grid div itself */
  gridClassName?: string;

  // ── Empty state ────────────────────────────────────────────
  /** Message shown when projects array is empty */
  emptyMessage?: string;
}

export function ProjectGrid({
  projects,
  overline,
  title,
  headingAlign = "left",
  columns = 2,
  gap = "md",
  className = "",
  gridClassName = "",
  emptyMessage = "No projects found.",
}: ProjectGridProps) {
  const colClass = columnClasses[columns] ?? columnClasses[2];
  const gapClass = gapClasses[gap] ?? gapClasses["md"];

  return (
    <div className={className}>
      {/* Optional section heading */}
      {(overline || title) && (
        <div className="mb-8">
          {overline ? (
            /* Full SectionHeading when overline is present */
            <SectionHeading
              overline={overline}
              title={title ?? ""}
              align={headingAlign}
            />
          ) : (
            /* Lean h2 when only a title is given */
            <h2 className={`text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite/40 ${headingAlign === "center" ? "text-center" : ""}`}>
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Grid or empty state */}
      {projects.length > 0 ? (
        <div className={`grid ${colClass} ${gapClass} ${gridClassName}`}>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-graphite/40">{emptyMessage}</p>
      )}
    </div>
  );
}
