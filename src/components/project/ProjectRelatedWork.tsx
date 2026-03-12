import { Separator } from "@/components/ui/foundation/separator";
import { SanityProject } from "@/lib/sanity/types";
import { ProjectGrid } from "@/components/ui/ProjectGrid";

interface ProjectRelatedWorkProps {
  projects?: SanityProject[];
}

export function ProjectRelatedWork({ projects }: ProjectRelatedWorkProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <>
      <Separator className="my-16 bg-graphite/8" />
      <ProjectGrid projects={projects} columns={3} gap="md" />
    </>
  );
}
