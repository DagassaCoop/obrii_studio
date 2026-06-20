import { SectionHeading } from "../ui/SectionHeading";
import { serverClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SanitySiteSettings } from "@/lib/sanity/types";

export async function Manifesto() {
  const settings: SanitySiteSettings | null = await serverClient.fetch(siteSettingsQuery);

  return (
    <section className="relative py-24 bg-section-secondary">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading
          title={settings?.manifestoHeading ?? ""}
          overline={settings?.manifestoTitle ?? ""}
          className="mb-12"
        />
        <p className="mt-4 text-lg font-light leading-relaxed text-foreground/80 sm:text-xl">
          {settings?.manifestoText}
        </p>
      </div>
    </section>
  );
}
