import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessTimeline() {
  const t = useTranslations("process");

  const steps = [
    t.raw("steps.0"),
    t.raw("steps.1"),
    t.raw("steps.2"),
    t.raw("steps.3"),
  ] as Array<{ number: string; title: string; description: string }>;

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline="Process"
          title={t("title")}
          className="mb-16"
        />

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent md:block" />

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
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
