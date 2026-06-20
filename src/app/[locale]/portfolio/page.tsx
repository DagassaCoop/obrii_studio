import { setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioClients } from "@/components/portfolio/PortfolioClients";
import { ContactCTA } from "@/components/ui/ContactCTA";

// Revalidate Sanity-sourced content at most once per minute (ISR).
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects: SanityProject[] = await client.fetch(projectsQuery);

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

