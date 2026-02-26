import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-section-primary min-h-[100vh] flex items-center">
      <div className="mx-auto w-full max-w-5xl px-8 md:px-16 lg:px-28 pt-24 pb-16">

        {/* Overline */}
        <p className="text-overline mb-8 tracking-[0.18em]">
          Creative Studio
        </p>

        {/* Headline — large serif, left-aligned */}
        <h1 className=" text-[clamp(3rem,8vw,4.5rem)] leading-[1.05] tracking-tight text-graphite">
          We craft visual stories that{" "}
          <em className="not-italic font-light italic">resonate</em>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-graphite/70">
          A boutique video production and social media agency dedicated to
          elevating brands through meticulous craftsmanship and timeless
          aesthetics.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="/#work"
            className="rounded-full bg-terracotta px-8 py-3.5 text-[0.9375rem] font-medium text-white tracking-wide transition-all duration-200 ease-in-out hover:bg-burnt-earth active:scale-[0.97]"
          >
            View Our Work
          </a>
          <a
            href="/#process"
            className="rounded-full border border-graphite/25 px-8 py-3.5 text-[0.9375rem] font-medium text-graphite tracking-wide transition-all duration-200 ease-in-out hover:border-graphite/50 hover:bg-graphite/5 active:scale-[0.97]"
          >
            Our Process
          </a>
        </div>

      </div>
    </section>
  );
}
