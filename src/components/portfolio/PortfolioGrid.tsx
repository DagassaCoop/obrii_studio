"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SanityProject } from "@/lib/sanity/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Layers, Film, Share2, BarChart3 } from "lucide-react";

const filterIcons = {
  all: Layers,
  video: Film,
  social: Share2,
  smm: BarChart3,
} as const;

type FilterValue = keyof typeof filterIcons;

const filters: { key: string; value: FilterValue }[] = [
  { key: "filterAll", value: "all" },
  { key: "filterVideo", value: "video" },
  { key: "filterSocial", value: "social" },
  { key: "filterSmm", value: "smm" },
];

interface PortfolioGridProps {
  projects: SanityProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const t = useTranslations("portfolio");
  const tWork = useTranslations("featuredWork");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div className="mb-12 flex flex-wrap gap-1.5">
        {filters.map(({ key, value }) => {
          const Icon = filterIcons[value];
          const isActive = activeFilter === value;
          return (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.97] ${isActive
                ? "border-terracotta bg-terracotta text-white"
                : "border-graphite/20 text-graphite/60 hover:border-graphite/40 hover:text-graphite"
                }`}
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} />
              {t(key as Parameters<typeof t>[0])}
            </button>
          );
        })}
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project._id}
              href={{
                pathname: "/portfolio/[slug]",
                params: { slug: project.slug.current },
              }}
              className="group block"
            >
              {/* Card */}
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
                {/* Hover gradient — fades in */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.35)_55%,transparent_80%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category badge — top right */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {tWork(`categories.${project.category}` as Parameters<typeof tWork>[0], { default: project.category })}
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
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-graphite/40">{t("noProjects")}</p>
      )}
    </>
  );
}
