import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/foundation/separator";

interface ProjectProblemSolutionProps {
  problem?: string;
  solution?: string;
}

export function ProjectProblemSolution({ problem, solution }: ProjectProblemSolutionProps) {
  const t = useTranslations("project");

  if (!problem && !solution) return null;

  return (
    <>
      <Separator className="my-16 bg-graphite/8" />
      <div className="mb-16 grid gap-12 md:grid-cols-2">
        {problem && (
          <div>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite/40">
              {t("problem")}
            </h2>
            <p className="leading-relaxed text-graphite/75">{problem}</p>
          </div>
        )}
        {solution && (
          <div>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite/40">
              {t("solution")}
            </h2>
            <p className="leading-relaxed text-graphite/75">{solution}</p>
          </div>
        )}
      </div>
    </>
  );
}
