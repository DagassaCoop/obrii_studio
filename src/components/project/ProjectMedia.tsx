import Image from "next/image";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { VideoPlayer } from "@/components/shared/VideoPlayer/VideoPlayer";

interface ProjectMediaProps {
  project: Pick<SanityProject, "title" | "videoUrl" | "heroMedia">;
}

/**
 * Viewport-aware sizing:
 *   max-width = min(100%, 75svh × 16/9)
 *
 * When viewport height is short the container shrinks its width so that
 * the 16:9 content inside never exceeds 75 % of screen height.
 * On tall viewports the expression resolves to 100 % — normal behaviour.
 */
const mediaMaxWidth = "min(100%, calc(75svh * 16 / 9))";

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
    <div
      className="mb-16 mx-auto w-full overflow-hidden rounded-xl border border-graphite/8"
      style={{ maxWidth: mediaMaxWidth }}
    >
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
