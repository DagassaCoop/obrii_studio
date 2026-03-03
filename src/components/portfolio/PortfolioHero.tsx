import { getTranslations } from "next-intl/server";

export async function PortfolioHero() {
  const t = await getTranslations("portfolio");

  return (
    <section className="bg-section-primary pt-36 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-overline mb-6 tracking-[0.18em]">
          {t("heroOverline")}
        </p>
        <h1 className="font-slab max-w-2xl text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.08] tracking-tight text-graphite">
          {t("heroTitle")}
        </h1>
        <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-graphite/60">
          {t("heroSubtitle")}
        </p>
      </div>
    </section>
  );
}
