import { serverClient } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioClients } from "@/components/portfolio/PortfolioClients";
import { ContactCTA } from "@/components/ui/ContactCTA";

export default async function PortfolioPage() {
  const projects: SanityProject[] = await serverClient.fetch(projectsQuery);

  return (
    <>
      <PortfolioHero />
      <PortfolioStats />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
      <PortfolioClients />
      <ContactCTA />
    </>
  );
}

