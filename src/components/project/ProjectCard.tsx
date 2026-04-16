import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface ProjectCardProps {
  project: Pick<SanityProject, "_id" | "title" | "slug" | "category" | "thumbnail" | "shortDescription" | "year">;
  /** Card visual size variant */
  size?: "default" | "large";
}

const CATEGORY_LABELS: Record<string, string> = {
  video: "Video",
  social: "Social",
  smm: "SMM",
};

export function ProjectCard({ project, size = "default" }: ProjectCardProps) {
  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;
  const timecode = "__:__"; // TODO: wire to actual project duration

  return (
    <Link
      href={{
        pathname: "/portfolio/[slug]",
        params: { slug: project.slug.current },
      }}
      className="group block"
    >
      <article className="overflow-hidden rounded-[--radius-md] shadow-[0_8px_56px_-8px_rgba(28,25,23,0.07)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_16px_64px_-8px_rgba(28,25,23,0.12)]">

        {/* ── Thumbnail ────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-graphite/10 aspect-video">

          {project.thumbnail?.asset ? (
            <Image
              src={urlFor(project.thumbnail).width(size === "large" ? 1200 : 720).height(size === "large" ? 675 : 405).url()}
              alt={project.title}
              fill
              sizes={size === "large"
                ? "(max-width: 640px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-graphite/15 to-graphite/30" />
          )}

          {/* Scrim — cinematic bottom-up gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

          {/* Timecode tag — top left */}
          <div className="absolute top-4 left-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/75 border border-white/20 px-2.5 py-1 rounded-[--radius-xs] backdrop-blur-sm">
              {timecode} / {categoryLabel}
            </span>
          </div>
        </div>

        {/* ── Info panel ───────────────────────────────────── */}
        <div className="relative bg-parchment px-5 py-4 sm:px-6 sm:py-5">
          {/* Top light edge — glassmorphic highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-white/60 via-white/20 to-transparent" />

          {/* Title */}
          <h3 className={`font-slab font-light leading-snug text-graphite ${size === "large" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
            {project.title}
          </h3>

          {/* Description — reveals on hover */}
          {project.shortDescription && (
            <p className="mt-2 text-sm leading-relaxed text-silt line-clamp-2 translate-y-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
              {project.shortDescription}
            </p>
          )}

          {/* CTA — reveals on hover */}
          <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-terracotta translate-y-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            Explore
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>

      </article>
    </Link>
  );
}
