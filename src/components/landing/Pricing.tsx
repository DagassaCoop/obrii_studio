import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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
    <section className="relative py-32">
      <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative border-white/5 bg-card/50 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-card/80 ${pkg.popular ? "border-foreground/20 ring-1 ring-foreground/10" : ""
                }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground text-background">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="mt-2">{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">{t("currency")}</span>
                  <span className="text-4xl font-bold">{pkg.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-8 block">
                  <Button
                    className={`w-full rounded-full ${pkg.popular ? "" : "variant-outline"
                      }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    {t("cta")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">{t("custom")}</p>
          <Link href="/contact" className="mt-2 inline-block">
            <Button variant="link" className="text-foreground underline underline-offset-4">
              {t("customCta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
