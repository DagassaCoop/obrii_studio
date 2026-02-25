import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { serverClient } from "@/lib/sanity/client";
import { projectBySlugQuery, projectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

const categoryColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  smm: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

// Pre-render all known slugs at build time
export async function generateStaticParams() {
  const projects: SanityProject[] = await serverClient.fetch(projectsQuery);
  return projects.map((p) => ({ slug: p.slug.current }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("project");

  const project: SanityProject | null = await serverClient.fetch(
    projectBySlugQuery,
    { slug }
  );

  if (!project) notFound();

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
            className={`mb-4 ${categoryColors[project.category] ?? ""}`}
          >
            {project.category.toUpperCase()}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          {project.shortDescription && (
            <p className="mt-4 text-lg text-muted-foreground">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Hero media / Vimeo embed */}
        <div className="mb-16 overflow-hidden rounded-xl border border-white/10">
          {project.vimeoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={project.vimeoUrl.replace(
                  "vimeo.com/",
                  "player.vimeo.com/video/"
                )}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : project.heroMedia?.asset ? (
            <div className="relative aspect-video w-full">
              <Image
                src={urlFor(project.heroMedia).width(1200).height(675).url()}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No media yet</p>
            </div>
          )}
        </div>

        {/* Full Description */}
        {project.fullDescription && (
          <div className="mb-16">
            <p className="text-lg leading-relaxed text-foreground/80">
              {project.fullDescription}
            </p>
          </div>
        )}

        {/* Problem / Solution */}
        {(project.problem || project.solution) && (
          <>
            <Separator className="my-16 bg-white/10" />
            <div className="mb-16 grid gap-12 md:grid-cols-2">
              {project.problem && (
                <div>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {t("problem")}
                  </h2>
                  <p className="leading-relaxed text-foreground/80">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {t("solution")}
                  </h2>
                  <p className="leading-relaxed text-foreground/80">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <>
            <Separator className="my-16 bg-white/10" />
            <div className="mb-16">
              <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {t("gallery")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-foreground/5 to-foreground/10"
                  >
                    {img?.asset && (
                      <Image
                        src={urlFor(img).width(800).height(450).url()}
                        alt={`${project.title} gallery image ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Related Work */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <>
            <Separator className="my-16 bg-white/10" />
            <div>
              <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {t("relatedWork")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {project.relatedProjects.map((related) => (
                  <Link
                    key={related._id}
                    href={{
                      pathname: "/portfolio/[slug]",
                      params: { slug: related.slug.current },
                    }}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-xl border border-white/5 bg-card/50 transition-all hover:border-white/10 hover:bg-card/80">
                      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/10">
                        {related.thumbnail?.asset && (
                          <Image
                            src={urlFor(related.thumbnail)
                              .width(600)
                              .height(338)
                              .url()}
                            alt={related.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-5">
                        <Badge
                          variant="outline"
                          className={`mb-3 ${categoryColors[related.category] ?? ""}`}
                        >
                          {related.category.toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold tracking-tight">
                          {related.title}
                        </h3>
                        {related.shortDescription && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {related.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
