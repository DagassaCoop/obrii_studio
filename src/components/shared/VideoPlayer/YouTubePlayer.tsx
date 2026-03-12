"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YouTubePlayerProps {
  /** YouTube video ID */
  id: string;
  /** Accessible title for the embed */
  title: string;
  /** Override wrapper className */
  className?: string;
}

export function YouTubePlayer({ id, title, className }: YouTubePlayerProps) {
  return (
    <div
      className={`aspect-video w-full overflow-hidden rounded-xl [&_.yt-lite]:!rounded-xl ${className ?? ""}`}
    >
      <LiteYouTubeEmbed id={id} title={title} poster="maxresdefault" />
    </div>
  );
}
