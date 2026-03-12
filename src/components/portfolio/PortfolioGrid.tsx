"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SanityProject } from "@/lib/sanity/types";
import { Layers, Film, Share2, BarChart3 } from "lucide-react";
import { ProjectCard } from "@/components/project/ProjectCard";

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
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-graphite/40">{t("noProjects")}</p>
      )}
    </>
  );
}
