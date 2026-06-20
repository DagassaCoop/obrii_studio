import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SanitySiteSettings } from "@/lib/sanity/types";

export async function Hero() {
  const t = await getTranslations("hero");
  const settings: SanitySiteSettings | null = await client.fetch(siteSettingsQuery);

  return (
    <section className="bg-section-primary min-h-[100vh] flex items-center">
      <div className="mx-auto w-full max-w-5xl px-8 md:px-16 lg:px-28 pt-24 pb-16">

        {/* Overline */}
        <p className="text-overline mb-8 tracking-[0.18em]">
          {settings?.heroOverline}
        </p>

        {/* Headline — large serif, left-aligned */}
        <h1 className="text-[clamp(3rem,8vw,4.5rem)] leading-[1.05] tracking-tight text-graphite">
          {settings?.heroHeadline}
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-graphite/70">
          {settings?.heroSubheadline}
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={{ pathname: "/", hash: "work" }}
            className="rounded-full bg-terracotta px-8 py-3.5 text-[0.9375rem] font-medium text-white tracking-wide transition-all duration-200 ease-in-out hover:bg-burnt-earth active:scale-[0.97]"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href={{ pathname: "/", hash: "process" }}
            className="rounded-full border border-graphite/25 px-8 py-3.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

      </div>
    </section>
  );
}
