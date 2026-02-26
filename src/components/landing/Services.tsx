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
          overline="Services"
          title={t("title")}
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            const features: string[] = t.raw(`${key}.features`);

            return (
              <Card key={key} className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  {/* Icon — circle border, no fill */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-graphite/20">
                    <Icon className="h-5 w-5 text-graphite/60" strokeWidth={1.5} />
                  </div>
                  <CardTitle>{t(`${key}.title`)}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="mb-6 text-[0.9375rem] leading-relaxed text-graphite/50">
                    {t(`${key}.description`)}
                  </p>
                  <ul className="space-y-1.5">
                    {features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-4 text-[0.9375rem] text-graphite/50">
                        <span className="text-graphite/30 select-none">—</span>
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
