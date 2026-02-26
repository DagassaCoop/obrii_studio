import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/SectionHeading";

export function Manifesto() {
  const t = useTranslations("manifesto");

  return (
    <section className="relative py-24 bg-section-secondary">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading title="The art is in the restraint" overline={t("title")} className="mb-12" />
        <p className="mt-4 text-lg font-light leading-relaxed text-foreground/80 sm:text-xl">
          {t("text")}
        </p>
      </div>
    </section>
  );
}
