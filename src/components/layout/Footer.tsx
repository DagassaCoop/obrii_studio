import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              OBRII<span className="text-muted-foreground">.</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {nav("home")}
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {nav("portfolio")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {nav("contact")}
              </Link>
              <Link
                href="/instagram"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {nav("instagram")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("getInTouch")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@obrii.studio"
                className="flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                hello@obrii.studio
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("followUs")}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 transition-colors hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 transition-colors hover:text-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="text-center text-xs text-muted-foreground">
          © {year} Obrii Studio. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
