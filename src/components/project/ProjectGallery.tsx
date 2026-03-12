import Image from "next/image";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/foundation/separator";
import { SanityProject } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface ProjectGalleryProps {
  gallery?: SanityProject["gallery"];
  title: string;
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const t = useTranslations("project");

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <Separator className="my-16 bg-graphite/8" />
      <div className="mb-16">
        <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite/40">
          {t("gallery")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-video overflow-hidden rounded-lg bg-graphite/8"
            >
              {img?.asset && (
                <Image
                  src={urlFor(img).width(800).height(450).url()}
                  alt={`${title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
