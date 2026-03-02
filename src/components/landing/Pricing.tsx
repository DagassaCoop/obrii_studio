import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing() {
  const t = useTranslations("pricing");

  const packages = t.raw("packages") as Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  }>;

  return (
    <section className="relative py-32 bg-section-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline="Pricing"
          title={t("title")}
          className="mb-21"
        />

        <div className="flex gap-6">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`flex-1 border-terracotta transition-shadow duration-500 hover:shadow-[0_2px_0_0_rgba(176,79,70)] flex flex-col ${pkg.popular ? "-mt-10 -mb-5 z-10" : ""
                }`}
            >
              <CardHeader>
                {/* Reserved height slot for popular pill — keeps titles aligned across all cards */}

                {pkg.popular && (
                  <div className="mb-3 h-5">
                    <span className="inline-flex items-center rounded-sm bg-terracotta/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package name */}
                <CardTitle>{pkg.name}</CardTitle>

                {/* Description */}
                <p className="text-sm leading-relaxed text-graphite/50">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-sm text-graphite/40">{t("currency")}</span>
                  <span className="font-slab text-4xl font-light text-graphite">
                    {pkg.price}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                {/* Divider */}
                <div className="border-t border-graphite/10 mb-4" />

                {/* Feature list — terracotta square bullets */}
                <ul className="flex-1 space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-graphite/60">
                      <span className="h-1.5 w-1.5 rounded-sm bg-terracotta/60 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full border border-graphite/25 px-6 py-2.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97] ${pkg.popular ? "mb-5" : ""}`}
                >
                  {t("cta")}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-17 text-center text-sm text-graphite/50">
          {t("custom")}{" "}
          <Link
            href="/contact"
            className="text-graphite underline underline-offset-4 hover:text-terracotta transition-colors"
          >
            {t("customCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
