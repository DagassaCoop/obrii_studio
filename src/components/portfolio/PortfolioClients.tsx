import { getTranslations } from "next-intl/server";

const clientNames = [
  "Aurum",
  "Maison Lumière",
  "Corten",
  "Volta",
  "Meridian",
  "Harbour Lane",
  "Solstice",
  "Parallax",
];

export async function PortfolioClients() {
  const t = await getTranslations("portfolio");

  return (
    <section className="bg-section-secondary py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-overline tracking-[0.18em]">
            {t("clientsOverline")}
          </p>
          <h2 className="font-slab mt-3 text-2xl font-light text-graphite">
            {t("clientsTitle")}
          </h2>
        </div>

        {/* Brand marquee — seamless infinite scroll */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-x-14 hover:[animation-play-state:paused]">
            {/* Copy 1 */}
            {clientNames.map((name) => (
              <span
                key={`a-${name}`}
                className="whitespace-nowrap font-slab text-xl font-light text-graphite/30 select-none"
              >
                {name}
              </span>
            ))}
            {/* Copy 2 — identical, seamlessly replaces copy 1 at -50% */}
            {clientNames.map((name) => (
              <span
                key={`b-${name}`}
                aria-hidden="true"
                className="whitespace-nowrap font-slab text-xl font-light text-graphite/30 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
