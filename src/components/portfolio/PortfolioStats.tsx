import { getTranslations } from "next-intl/server";

export async function PortfolioStats() {
  const t = await getTranslations("portfolio");

  const stats = [
    { value: t("stats.projects.value"), label: t("stats.projects.label") },
    { value: t("stats.industries.value"), label: t("stats.industries.label") },
    { value: t("stats.retention.value"), label: t("stats.retention.label") },
    { value: t("stats.views.value"), label: t("stats.views.label") },
  ];

  return (
    <section className="bg-section-secondary py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-slab text-[2.25rem] font-light leading-none text-graphite">
                {value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-graphite/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
