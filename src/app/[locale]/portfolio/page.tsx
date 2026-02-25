"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Placeholder data — will be replaced by Sanity data
const placeholderProjects = [
  {
    _id: "1",
    title: "Brand Film — Lumière Cosmetics",
    slug: { current: "lumiere-cosmetics" },
    category: "video" as const,
    shortDescription: "A cinematic brand film capturing the essence of luxury skincare.",
  },
  {
    _id: "2",
    title: "Social Campaign — Urban Threads",
    slug: { current: "urban-threads" },
    category: "social" as const,
    shortDescription: "Scroll-stopping content series that doubled engagement in 30 days.",
  },
  {
    _id: "3",
    title: "Product Launch — Aero Fitness",
    slug: { current: "aero-fitness" },
    category: "video" as const,
    shortDescription: "Dynamic product showcase video for a revolutionary fitness device.",
  },
  {
    _id: "4",
    title: "SMM Strategy — Café Noir",
    slug: { current: "cafe-noir" },
    category: "smm" as const,
    shortDescription: "Full social media overhaul that grew following by 300%.",
  },
  {
    _id: "5",
    title: "Event Coverage — Tech Summit 2024",
    slug: { current: "tech-summit-2024" },
    category: "video" as const,
    shortDescription: "Multi-camera event coverage with same-day highlight reel delivery.",
  },
  {
    _id: "6",
    title: "Content Series — FoodBox",
    slug: { current: "foodbox" },
    category: "social" as const,
    shortDescription: "Weekly recipe reels that turned a delivery service into a lifestyle brand.",
  },
];

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const filterKeys = ["filterAll", "filterVideo", "filterSocial", "filterSmm"] as const;
const filterValues = ["all", "video", "social", "smm"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? placeholderProjects
      : placeholderProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

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

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                href={{ pathname: "/portfolio/[slug]", params: { slug: project.slug.current } }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                  {/* Placeholder image */}
                  <div className="aspect-video w-full bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all group-hover:from-foreground/8 group-hover:to-foreground/15" />

                  <div className="p-5">
                    <Badge
                      variant="outline"
                      className={`mb-3 ${categoryColors[project.category]}`}
                    >
                      {project.category.toUpperCase()}
                    </Badge>
                    <h3 className="font-semibold tracking-tight transition-colors group-hover:text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">
            {t("noProjects")}
          </p>
        )}
      </div>
    </div>
  );
}
