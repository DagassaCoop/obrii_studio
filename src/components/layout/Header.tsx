"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import { useState } from "react";

const navItems = [
  { key: "home", href: "/" },
  { key: "portfolio", href: "/portfolio" },
  { key: "contact", href: "/contact" },
  { key: "instagram", href: "/instagram" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en";
    router.replace(pathname as any, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          OBRII<span className="text-muted-foreground">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-foreground ${pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
                }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            {locale.toUpperCase()}
          </Button>
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6">
              {t("contact")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className="text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-left text-lg font-bold tracking-tight">
                OBRII<span className="text-muted-foreground">.</span>
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg transition-colors hover:text-foreground ${pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
