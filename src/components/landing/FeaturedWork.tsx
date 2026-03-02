import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { serverClient } from "@/lib/sanity/client";
import { featuredProjectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { SectionHeading } from "@/components/ui/SectionHeading";


export async function FeaturedWork() {
  const t = await getTranslations("featuredWork");
  const projects: SanityProject[] = await serverClient.fetch(featuredProjectsQuery);

  return (
    <section className="relative py-32 bg-section-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            align="left"
          />
          <Link href="/portfolio" className="flex flex-shrink-0 ml-8 group items-center rounded-full border border-graphite/25 px-6 py-2.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]">
            <span className="mr-2 max-sm:hidden">{t("viewAll")}</span>
            <ArrowRight className="h-4 w-4 transition-transform text-terracotta group-hover:translate-x-1" />
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
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-graphite/10 transition-colors transition-opacity duration-500 hover:bg-graphite/20"
              >
                {/* Image */}
                {project.thumbnail?.asset ? (
                  <Image
                    src={urlFor(project.thumbnail).width(900).height(675).url()}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-graphite/30 to-graphite/60" />
                )}

                {/* Gradient overlays — base + darker hover layer fades in via opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category badge — top right, high-contrast frosted pill */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block rounded-full border border-white/25 bg-terracotta/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {t(`categories.${project.category}`, { default: project.category })}
                  </span>
                </div>

                {/* Text — bottom left, slides up on hover */}
                <div className="absolute bottom-0 left-0 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {/* Title */}
                  <h3 className="font-slab text-[1.5rem] font-normal leading-snug text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                    {project.title}
                  </h3>
                  {/* Description — fades + slides in on hover */}
                  {project.shortDescription && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70 opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                      {project.shortDescription}
                    </p>
                  )}
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
          <Link href="/portfolio" className="group inline-flex items-center rounded-full border border-graphite/25 px-6 py-2.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]">
            {t("viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
