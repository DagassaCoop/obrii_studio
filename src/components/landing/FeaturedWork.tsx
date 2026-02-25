import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { serverClient } from "@/lib/sanity/client";
import { featuredProjectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export async function FeaturedWork() {
  const t = await getTranslations("featuredWork");
  const projects: SanityProject[] = await serverClient.fetch(featuredProjectsQuery);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link href="/portfolio" className="hidden sm:block">
            <Button variant="outline" className="group rounded-full border-white/10">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={{
                  pathname: "/portfolio/[slug]",
                  params: { slug: project.slug.current },
                }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/10">
                    {project.thumbnail?.asset ? (
                      <Image
                        src={urlFor(project.thumbnail).width(800).height(450).url()}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all group-hover:from-foreground/8 group-hover:to-foreground/15" />
                    )}
                  </div>

                  <div className="p-6">
                    <Badge
                      variant="outline"
                      className={`mb-3 ${categoryColors[project.category] ?? ""}`}
                    >
                      {project.category.toUpperCase()}
                    </Badge>
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
                      {project.title}
                    </h3>
                    {project.shortDescription && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.shortDescription}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">
            No featured projects yet.
          </p>
        )}

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
