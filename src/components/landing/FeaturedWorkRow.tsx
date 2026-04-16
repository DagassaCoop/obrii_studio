import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface FeaturedWorkRowProps {
  project: Pick<SanityProject, "_id" | "title" | "slug" | "category" | "thumbnail" | "shortDescription" | "category">;
  reverse?: boolean;
  /** Duration timecode (e.g., "00:04"). No field on SanityProject yet — placeholder "__:__". */
  timecode?: string;
  // category: string;
  exploreLabel: string;
}

export function FeaturedWorkRow({
  project,
  reverse = false,
  timecode = "__:__",
  exploreLabel,
}: FeaturedWorkRowProps) {
  return (
    <Link
      href={{
        pathname: "/portfolio/[slug]",
        params: { slug: project.slug.current },
      }}
      className="group block"
    >
      <div
        className={`relative flex flex-col items-center gap-0 md:gap-12 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* ── Image side ────────────────────────────────────── */}
        <div className="w-full md:w-3/5 overflow-hidden rounded-2xl border border-burnt-earth/30">
          <div className="relative aspect-video w-full bg-warm-mist">
            {project.thumbnail?.asset ? (
              <Image
                src={urlFor(project.thumbnail).width(1200).height(675).url()}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover grayscale-[30%] transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-graphite/15 to-graphite/30" />
            )}
            <div className="absolute inset-0 bg-terracotta/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>

        {/* ── Glassmorphic panel ────────────────────────────── */}
        <div
          className={`z-10 w-full -mt-16 md:mt-0 md:w-2/5 ${
            reverse ? "md:-mr-24" : "md:-ml-24"
          }`}
        >
          <div className="rounded-2xl border border-burnt-earth/30 bg-parchment/85 p-8 shadow-sm backdrop-blur-xl md:p-12">
            {/* Timecode / category */}
            <span className="text-xs font-medium uppercase tracking-[0.30em] text-terracotta">
              {timecode} / {project.category}
            </span>

            {/* Title */}
            <h3 className="mb-5 font-slab text-3xl font-semibold tracking-wider text-graphite">
              {project.title}
            </h3>

            {/* Description */}
            {project.shortDescription && (
              <p className="mb-8 text-[0.95rem] font-light leading-relaxed text-graphite/60 line-clamp-3">
                {project.shortDescription}
              </p>
            )}

            {/* Hairline */}
            <div className="mb-6 h-px w-full bg-burnt-earth/10" />

            {/* CTA */}
            <div className="flex items-center gap-3 text-[0.95rem] font-light text-graphite/70 transition-colors group-hover:text-burnt-earth">
              <span className="h-1.5 w-1.5 rounded-full bg-burnt-earth/40 transition-colors group-hover:bg-burnt-earth" />
              {exploreLabel}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
