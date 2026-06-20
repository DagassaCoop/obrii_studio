import { serverClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SanitySiteSettings } from "@/lib/sanity/types";

export async function PortfolioStats() {
  const settings: SanitySiteSettings | null = await serverClient.fetch(siteSettingsQuery);
  const stats = settings?.portfolioStats ?? [];

  if (stats.length === 0) return null;

  return (
    <section className="bg-section-secondary py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-slab text-[2.25rem] font-light leading-none text-graphite">
                {value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-graphite/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
