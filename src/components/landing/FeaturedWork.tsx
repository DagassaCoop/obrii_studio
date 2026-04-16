import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serverClient } from "@/lib/sanity/client";
import { featuredProjectsQuery } from "@/lib/sanity/queries";
import { SanityProject } from "@/lib/sanity/types";
import { FeaturedWorkRow } from "@/components/landing/FeaturedWorkRow";

export async function FeaturedWork() {
  const t = await getTranslations("featuredWork");
  const projects: SanityProject[] = await serverClient.fetch(featuredProjectsQuery);

  return (
    <section className="relative py-32 bg-section-secondary">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-8">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="mb-16 flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-overline mb-6 tracking-[0.18em]">{t("overline")}</p>
            <h2 className="font-slab text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-graphite">
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="font-light leading-relaxed text-graphite/60 md:text-right">
              {t("subtitle")}
            </p>
            <Link
              href="/portfolio"
              className="group mt-4 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-terracotta"
            >
              {t("viewAll")}
              <span className="h-px w-8 bg-terracotta transition-all duration-500 group-hover:w-12" />
            </Link>
          </div>
        </div>

        {/* ── Zigzag project rows ─────────────────────────── */}
        {projects.length > 0 ? (
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <FeaturedWorkRow
                key={project._id}
                project={project}
                reverse={index % 2 === 1}
                exploreLabel={t("viewProject")}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-graphite/40">No featured projects yet.</p>
        )}

      </div>
    </section>
  );
}
