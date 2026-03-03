"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/foundation/badge";
import { Button } from "@/components/ui/foundation/button";
import { SanityProject } from "@/lib/sanity/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const filterKeys = ["filterAll", "filterVideo", "filterSocial", "filterSmm"] as const;
const filterValues = ["all", "video", "social", "smm"] as const;

interface PortfolioGridProps {
  projects: SanityProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-3">
        {filterKeys.map((key, index) => (
          <Button
            key={key}
            variant={activeFilter === filterValues[index] ? "default" : "outline"}
            className="rounded-full border-white/10"
            onClick={() => setActiveFilter(filterValues[index])}
          >
            {t(key)}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project._id}
              href={{
                pathname: "/portfolio/[slug]",
                params: { slug: project.slug.current },
              }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/10">
                  {project.thumbnail?.asset ? (
                    <Image
                      src={urlFor(project.thumbnail).width(600).height(338).url()}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all group-hover:from-foreground/8 group-hover:to-foreground/15" />
                  )}
                </div>

                <div className="p-5">
                  <Badge
                    variant="outline"
                    className={`mb-3 ${categoryColors[project.category] ?? ""}`}
                  >
                    {project.category.toUpperCase()}
                  </Badge>
                  <h3 className="font-semibold tracking-tight transition-colors group-hover:text-foreground">
                    {project.title}
                  </h3>
                  {project.shortDescription && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.shortDescription}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-16">{t("noProjects")}</p>
      )}
    </>
  );
}
