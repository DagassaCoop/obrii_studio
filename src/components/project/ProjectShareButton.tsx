"use client";

import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectShareButtonProps {
  title: string;
}

export function ProjectShareButton({ title }: ProjectShareButtonProps) {
  const t = useTranslations("project");

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-graphite/20 text-graphite hover:border-terracotta hover:text-terracotta rounded-full h-9 px-4 text-xs gap-2 cursor-pointer"
    >
      <Share2 className="size-4" />
      {t("share")}
    </button>
  );
}
