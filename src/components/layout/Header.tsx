"use client";

import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Globe, Menu } from "lucide-react";
import { useState } from "react";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
] as const;

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = routing.locales.find((l) => l !== locale) ?? "en";

  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => router.replace(pathname as any, { locale: otherLocale })}
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
      className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200"
    >
      <Globe className="h-[15px] w-[15px]" strokeWidth={1.5} />
      <span className="text-[11px] font-medium tracking-widest uppercase">
        {otherLocale}
      </span>
    </button>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terracotta">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center leading-none">
          <span className="text-[15px] font-bold tracking-[0.2em] text-white uppercase">
            OBRII<span className="font-light">STUDIO</span>
          </span>
          <span className="text-[10px] tracking-wide text-white/60 mt-0.5">
            Content beyond the frame.
          </span>
        </Link>

        {/* Desktop Navigation — centered absolutely */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/80 hover:text-white transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="text-sm text-white border border-white/70 hover:border-white hover:bg-white/10 transition-all rounded-full px-5 py-1.5 tracking-wide"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="text-white p-1">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-terracotta border-white/10">
              <SheetTitle className="text-left">
                <span className="text-[15px] font-bold tracking-[0.2em] text-white uppercase">
                  OBRII<span className="font-light">STUDIO</span>
                </span>
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 text-sm text-white border border-white/70 hover:border-white hover:bg-white/10 transition-all rounded-full px-5 py-2 text-center tracking-wide"
                >
                  Start a Project
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
