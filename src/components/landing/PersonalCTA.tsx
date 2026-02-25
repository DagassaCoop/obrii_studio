import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function PersonalCTA() {
  const t = useTranslations("personalCta");

  return (
    <section className="relative py-32">
      <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          {t("text")}
        </p>
        <div className="mt-10">
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-10 text-base">
              {t("cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
