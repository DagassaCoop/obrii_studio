import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/foundation/button";
import { Instagram } from "lucide-react";

export default function InstagramPage() {
  const t = useTranslations("instagram");

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Instagram className="h-7 w-7 text-foreground/60" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Placeholder for Instagram integration */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-card/30 py-32">
          <Instagram className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="mb-8 text-muted-foreground">{t("placeholder")}</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="rounded-full border-white/10 gap-2">
              <Instagram className="h-4 w-4" />
              {t("followUs")}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
