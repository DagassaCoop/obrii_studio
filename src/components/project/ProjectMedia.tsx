import Image from "next/image";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { VideoPlayer } from "@/components/shared/VideoPlayer/VideoPlayer";

interface ProjectMediaProps {
  project: Pick<SanityProject, "title" | "videoUrl" | "heroMedia">;
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
    <div className="mb-16 overflow-hidden rounded-xl border border-graphite/8">
      {project.videoUrl ? (
        <VideoPlayer url={project.videoUrl} title={project.title} />
      ) : project.heroMedia?.asset ? (
        <div className="relative aspect-video w-full">
          <Image
            src={urlFor(project.heroMedia).width(1200).height(675).url()}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-graphite/5 to-graphite/10 flex items-center justify-center">
          <p className="text-graphite/35 text-sm">No media yet</p>
        </div>
      )}
    </div>
  );
}
