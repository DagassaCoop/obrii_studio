import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Share2, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const serviceIcons = {
  video: Video,
  social: Share2,
  smm: BarChart3,
} as const;

const serviceKeys = ["video", "social", "smm"] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            const features: string[] = t.raw(`${key}.features`);

            return (
              <Card
                key={key}
                className="border-terracotta transition-shadow duration-500 hover:shadow-[0_2px_0_0_rgba(176,79,70)]"
              >
                <CardHeader>
                  {/* Icon — warm mist fill, no border */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-mist">
                    <Icon className="h-5 w-5 text-graphite/70" strokeWidth={1.5} />
                  </div>
                  <CardTitle>{t(`${key}.title`)}</CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Description — visually secondary */}
                  <p className="mb-4 text-sm leading-relaxed text-graphite/50">
                    {t(`${key}.description`)}
                  </p>

                  {/* Divider — separates description from features */}
                  <div className="border-t border-graphite/10 my-4" />

                  {/* Feature list — terracotta square bullets */}
                  <ul className="space-y-2">
                    {features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-graphite/60">
                        <span className="h-1.5 w-1.5 rounded-sm bg-terracotta/60 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
