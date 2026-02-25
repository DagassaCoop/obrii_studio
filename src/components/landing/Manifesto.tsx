import { useTranslations } from "next-intl";

export function Manifesto() {
  const t = useTranslations("manifesto");

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("title")}
        </h2>
        <p className="mt-8 text-2xl font-light leading-relaxed text-foreground/90 sm:text-3xl md:text-4xl">
          {t("text")}
        </p>
      </div>
    </section>
  );
}
