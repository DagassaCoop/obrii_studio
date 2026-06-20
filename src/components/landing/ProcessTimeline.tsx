import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { client } from "@/lib/sanity/client";
import { processStepsQuery } from "@/lib/sanity/queries";
import { SanityProcessStep } from "@/lib/sanity/types";

export async function ProcessTimeline() {
  const t = await getTranslations("process");
  const steps: SanityProcessStep[] = await client.fetch(processStepsQuery);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          className="mb-16"
        />

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent md:block" />

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step._id} className="relative text-center">
                {/* Step number */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 flex items-center justify-center rounded-full border bg-background">
                  <span className="text-2xl text-primary font-light">{step.number}</span>
                </div>

                <h3 className="mb-3 text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
