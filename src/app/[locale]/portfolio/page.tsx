import { getTranslations } from "next-intl/server";
import { serverClient } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio");
  const projects: SanityProject[] = await serverClient.fetch(projectsQuery);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Client component owns the filter state */}
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}
