"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

interface VimeoPlayerProps {
  /** Vimeo video ID */
  id: string;
  /** Accessible title for the iframe */
  title: string;
  /** Override wrapper className */
  className?: string;
}

export function VimeoPlayer({ id, title, className }: VimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the Vimeo player with SDK
    playerRef.current = new Player(containerRef.current, {
      id: parseInt(id, 10),
      dnt: true,
      playsinline: true,
      title: false,
      byline: false,
      portrait: false,
      responsive: true,
      controls: true,
      // @ts-expect-error Types don't officially include these, but Vimeo's iframe accepts them
      like: false,
      watchlater: false,
    });

    const player = playerRef.current;

    // Optional: we can force volume on ready, though default is usually unmuted
    player.ready().then(() => {
      player.setVolume(1);
    });

    return () => {
      // Cleanup player on unmount
      player.destroy();
      playerRef.current = null;
    };
  }, [id]);

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-xl ${className ?? ""}`}
    >
      {/* The SDK will inject the iframe here */}
      <div
        ref={containerRef}
        title={title}
        className="absolute inset-0 h-full w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:rounded-xl"
      />
    </div>
  );
}
