import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface ProjectCardProps {
  project: Pick<SanityProject, "_id" | "title" | "slug" | "category" | "thumbnail" | "shortDescription">;
  /** Duration timecode shown in the tag (e.g., "00:45"). Placeholder until wired. */
  timecode?: string;
}

function computeSeekPercent(id: string): number {
  const lastChar = id.charCodeAt(id.length - 1);
  return 15 + (lastChar % 70);
}

export function ProjectCard({ project, timecode = "__:__" }: ProjectCardProps) {
  const seekPercent = computeSeekPercent(project._id);

  return (
    <Link
      href={{
        pathname: "/portfolio/[slug]",
        params: { slug: project.slug.current },
      }}
      className="group block"
    >
      {/* ── Thumbnail ────────────────────────────────────── */}
      <div className="relative aspect-video overflow-hidden rounded-xl border border-burnt-earth/5 bg-warm-mist">

        {project.thumbnail?.asset ? (
          <Image
            src={urlFor(project.thumbnail).width(1200).height(675).url()}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-graphite/15 to-graphite/30" />
        )}

        {/* Hover tint */}
        <div className="absolute inset-0 bg-burnt-earth/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Play hint — center, reveals on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <PlayCircle className="h-14 w-14 text-parchment" strokeWidth={1} />
        </div>

        {/* Timecode tag — top left */}
        <div className="absolute left-4 top-4 rounded-sm bg-black/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-white backdrop-blur-md">
          [ {timecode} / {project.category} ]
        </div>

        {/* Seek bar — bottom */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
          <div className="h-full bg-terracotta" style={{ width: `${seekPercent}%` }} />
        </div>
      </div>

      {/* ── Caption ──────────────────────────────────────── */}
      <div className="mt-6">
        <h3 className="mb-2 font-slab text-2xl text-burnt-earth">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="text-[11px] uppercase tracking-[0.15em] text-graphite/40 line-clamp-1">
            {project.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}
