import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Coffee } from "lucide-react";

export function ContactCTA() {
  const t = useTranslations("personalCta");

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">

        {/* Icon */}
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-graphite/25">
          <Coffee className="h-6 w-6 text-terracotta/70" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="font-slab text-[clamp(2rem,4vw,2.75rem)] font-light leading-snug tracking-tight text-graphite">
          {t("title")}
        </h2>

        {/* Body */}
        <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-graphite/55">
          {t("text")}
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-terracotta px-8 py-3.5 text-[0.9375rem] font-medium text-white tracking-wide transition-all duration-200 ease-in-out hover:bg-burnt-earth active:scale-[0.97]"
          >
            {t("cta")}
          </Link>
          <span className="flex items-center gap-3 text-sm text-graphite/40">
            <span className="h-px w-6 bg-graphite/20" />
            or
            <span className="h-px w-6 bg-graphite/20" />
            <a
              href="mailto:hello@obrii.studio"
              className="text-graphite/70 transition-colors hover:text-terracotta"
            >
              hello@obrii.studio
            </a>
          </span>
        </div>

      </div>
    </section>
  );
}
