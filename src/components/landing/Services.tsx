import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/foundation/card";
import { Video, Share2, BarChart3, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serverClient } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { SanityService } from "@/lib/sanity/types";

// Resolves the Lucide icon name stored in Sanity to its component.
const serviceIcons: Record<string, LucideIcon> = {
  Video,
  Share2,
  BarChart3,
  TrendingUp,
};

export async function Services() {
  const t = await getTranslations("services");
  const services: SanityService[] = await serverClient.fetch(servicesQuery);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = (service.icon && serviceIcons[service.icon]) || Video;
            const features = service.features ?? [];

            return (
              <Card
                key={service._id}
                className="border-terracotta transition-shadow duration-500 hover:shadow-[0_2px_0_0_rgba(176,79,70)]"
              >
                <CardHeader>
                  {/* Icon — warm mist fill, no border */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-mist">
                    <Icon className="h-5 w-5 text-graphite/70" strokeWidth={1.5} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Description — visually secondary */}
                  <p className="mb-4 text-sm leading-relaxed text-graphite/50">
                    {service.description}
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
