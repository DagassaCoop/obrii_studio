import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Share2, BarChart3 } from "lucide-react";

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
      {/* Subtle divider line */}
      <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            const features: string[] = t.raw(`${key}.features`);

            return (
              <Card
                key={key}
                className="group border-white/5 bg-card/50 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-card/80"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">{t(`${key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {t(`${key}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {features.map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <div className="h-1 w-1 rounded-full bg-foreground/40" />
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
