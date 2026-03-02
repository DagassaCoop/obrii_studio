import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const socials = [
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">

        {/* Top — 4-column grid */}
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-slab text-2xl font-light text-white tracking-tight">
              Obrii<span className="text-terracotta">.</span>
            </Link>
            <p className="mt-4 text-sm text-white/45 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              {t("navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-white/55 transition-colors hover:text-white">
                {nav("home")}
              </Link>
              <Link href="/portfolio" className="text-sm text-white/55 transition-colors hover:text-white">
                {nav("portfolio")}
              </Link>
              <Link href="/contact" className="text-sm text-white/55 transition-colors hover:text-white">
                {nav("contact")}
              </Link>
              <Link href="/instagram" className="text-sm text-white/55 transition-colors hover:text-white">
                {nav("instagram")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              {t("getInTouch")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@obrii.studio"
                className="flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                hello@obrii.studio
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar — copyright left, social circles right */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-widest text-white/30">
            © {year} Obrii Studio. {t("rights")}
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/40 transition-all duration-200 hover:scale-105 hover:border-white/75 hover:text-white"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
