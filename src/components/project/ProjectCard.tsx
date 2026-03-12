import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface ProjectCardProps {
  project: Pick<SanityProject, "_id" | "title" | "slug" | "category" | "thumbnail" | "shortDescription">;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={{
        pathname: "/portfolio/[slug]",
        params: { slug: project.slug.current },
      }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-graphite/10">

        {/* Image */}
        {project.thumbnail?.asset ? (
          <Image
            src={urlFor(project.thumbnail).width(720).height(540).url()}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-graphite/10 to-graphite/20" />
        )}

        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.15)_55%,transparent_80%)]" />
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.35)_55%,transparent_80%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category badge — top right */}
        <div className="absolute top-4 right-4">
          <span className="inline-block rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Text — bottom left, lifts on hover */}
        <div className="absolute bottom-0 left-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <h3 className="font-slab text-xl font-light leading-snug text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="mt-1.5 line-clamp-2 translate-y-2 text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
              {project.shortDescription}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
