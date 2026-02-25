import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

// Placeholder project detail data
const placeholderProject = {
  _id: "1",
  title: "Brand Film — Lumière Cosmetics",
  slug: { current: "lumiere-cosmetics" },
  category: "video" as const,
  vimeoUrl: "https://player.vimeo.com/video/placeholder",
  shortDescription: "A cinematic brand film capturing the essence of luxury skincare.",
  fullDescription:
    "Lumière Cosmetics approached us to create a brand film that would embody their philosophy of merging science with natural beauty. The result is a 90-second cinematic piece that has been used across their digital channels and in-store displays.",
  problem:
    "Lumière needed to differentiate themselves in a saturated luxury skincare market. Their existing video content was product-focused but lacked emotional storytelling that could connect with their target audience of discerning, modern women.",
  solution:
    "We crafted a cinematic narrative that follows light — their brand's core metaphor — through a day in the life of their ideal customer. Using macro photography, golden-hour lighting, and a carefully composed original score, we created a piece that feels more like a short film than an advertisement.",
  gallery: [null, null, null, null],
  relatedProjects: [
    {
      _id: "3",
      title: "Product Launch — Aero Fitness",
      slug: { current: "aero-fitness" },
      category: "video" as const,
      shortDescription: "Dynamic product showcase video for a revolutionary fitness device.",
    },
    {
      _id: "2",
      title: "Social Campaign — Urban Threads",
      slug: { current: "urban-threads" },
      category: "social" as const,
      shortDescription: "Scroll-stopping content series that doubled engagement in 30 days.",
    },
  ],
};

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function ProjectPage() {
  const t = useTranslations("project");
  const project = placeholderProject;

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToPortfolio")}
        </Link>

        {/* Hero area */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className={`mb-4 ${categoryColors[project.category]}`}
          >
            {project.category.toUpperCase()}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        {/* Vimeo Embed */}
        <div className="mb-16 overflow-hidden rounded-xl border border-white/10">
          <div className="aspect-video w-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Video embed placeholder (Vimeo)</p>
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-16">
          <p className="text-lg leading-relaxed text-foreground/80">
            {project.fullDescription}
          </p>
        </div>

        <Separator className="my-16 bg-white/10" />

        {/* Problem / Solution */}
        <div className="mb-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {t("problem")}
            </h2>
            <p className="leading-relaxed text-foreground/80">{project.problem}</p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {t("solution")}
            </h2>
            <p className="leading-relaxed text-foreground/80">{project.solution}</p>
          </div>
        </div>

        <Separator className="my-16 bg-white/10" />

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {t("gallery")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((_, i) => (
              <div
                key={i}
                className="aspect-video overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-foreground/5 to-foreground/10"
              />
            ))}
          </div>
        </div>

        <Separator className="my-16 bg-white/10" />

        {/* Related Work */}
        <div>
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {t("relatedWork")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.relatedProjects.map((related) => (
              <Link
                key={related._id}
                href={{ pathname: "/portfolio/[slug]", params: { slug: related.slug.current } }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                  <div className="aspect-video w-full bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all group-hover:from-foreground/8 group-hover:to-foreground/15" />
                  <div className="p-5">
                    <Badge
                      variant="outline"
                      className={`mb-3 ${categoryColors[related.category]}`}
                    >
                      {related.category.toUpperCase()}
                    </Badge>
                    <h3 className="font-semibold tracking-tight">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {related.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
