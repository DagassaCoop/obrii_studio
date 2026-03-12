import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { serverClient } from "@/lib/sanity/client";
import { featuredProjectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/ui/ProjectGrid";

export async function FeaturedWork() {
  const t = await getTranslations("featuredWork");
  const projects: SanityProject[] = await serverClient.fetch(featuredProjectsQuery);

  return (
    <section className="relative py-32 bg-section-secondary">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header row */}
        <div className="mb-16 flex items-end justify-between">
          <SectionHeading
            overline={t("overline")}
            title={t("title")}
            align="left"
          />
          <Link
            href="/portfolio"
            className="flex flex-shrink-0 ml-8 group items-center rounded-full border border-graphite/25 px-6 py-2.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]"
          >
            <span className="mr-2 max-sm:hidden">{t("viewAll")}</span>
            <ArrowRight className="h-4 w-4 transition-transform text-terracotta group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <ProjectGrid
          projects={projects}
          columns={3}
          emptyMessage="No featured projects yet."
        />

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="group inline-flex items-center rounded-full border border-graphite/25 px-6 py-2.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]"
          >
            {t("viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
