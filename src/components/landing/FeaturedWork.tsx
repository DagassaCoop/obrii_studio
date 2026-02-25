import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

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
];

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export function FeaturedWork() {
  const t = useTranslations("featuredWork");

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <Link href="/portfolio" className="hidden sm:block">
            <Button variant="outline" className="group rounded-full border-white/10">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {placeholderProjects.map((project) => (
            <Link
              key={project._id}
              href={{ pathname: "/portfolio/[slug]", params: { slug: project.slug.current } }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                {/* Placeholder image area */}
                <div className="aspect-video w-full bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all group-hover:from-foreground/8 group-hover:to-foreground/15" />

                <div className="p-6">
                  <Badge
                    variant="outline"
                    className={`mb-3 ${categoryColors[project.category]}`}
                  >
                    {project.category.toUpperCase()}
                  </Badge>
                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/portfolio">
            <Button variant="outline" className="rounded-full border-white/10">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
