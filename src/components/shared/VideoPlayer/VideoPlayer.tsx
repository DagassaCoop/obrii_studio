/**
 * VideoPlayer — Router component that detects the video provider
 * from any YouTube or Vimeo URL and renders the appropriate player.
 *
 * Supported URL patterns:
 *   YouTube:  youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 *             youtube.com/shorts/ID, youtube.com/live/ID
 *   Vimeo:    vimeo.com/ID, vimeo.com/channels/X/ID,
 *             player.vimeo.com/video/ID
 */

import { YouTubePlayer } from "./YouTubePlayer";
import { VimeoPlayer } from "./VimeoPlayer";

type VideoProvider = "youtube" | "vimeo";

interface ParsedVideo {
  provider: VideoProvider;
  id: string;
}

/**
 * Extracts the provider and video ID from a YouTube or Vimeo URL.
 * Returns null if the URL doesn't match any known pattern.
 */
function parseVideoUrl(raw: string): ParsedVideo | null {
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
  } catch {
    return null;
  }

  const hostname = url.hostname.replace("www.", "");

  // ── YouTube ──────────────────────────────────────────────────────────
  if (hostname === "youtube.com" || hostname === "m.youtube.com") {
    const v = url.searchParams.get("v");
    if (v) return { provider: "youtube", id: v };

    const segments = url.pathname.split("/").filter(Boolean);
    if (
      segments.length >= 2 &&
      ["embed", "shorts", "live"].includes(segments[0])
    ) {
      return { provider: "youtube", id: segments[1] };
    }
  }

  if (hostname === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    if (id) return { provider: "youtube", id };
  }

  // ── Vimeo ────────────────────────────────────────────────────────────
  if (hostname === "vimeo.com") {
    const segments = url.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && /^\d+$/.test(last)) {
      return { provider: "vimeo", id: last };
    }
  }

  if (hostname === "player.vimeo.com") {
    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0] === "video" && segments[1]) {
      return { provider: "vimeo", id: segments[1] };
    }
  }

  return null;
}

// ── Component ────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  /** Any YouTube or Vimeo URL */
  url: string;
  /** Accessible title for the embed (defaults to "Video") */
  title?: string;
  /** Override wrapper className */
  className?: string;
}

export function VideoPlayer({
  url,
  title = "Video",
  className,
}: VideoPlayerProps) {
  const parsed = parseVideoUrl(url);

  if (!parsed) {
    return (
      <div
        className={`aspect-video w-full flex items-center justify-center bg-gradient-to-br from-graphite/5 to-graphite/10 rounded-xl ${className ?? ""}`}
      >
        <p className="text-silt text-sm">Unsupported video URL</p>
      </div>
    );
  }

  switch (parsed.provider) {
    case "youtube":
      return (
        <YouTubePlayer id={parsed.id} title={title} className={className} />
      );
    case "vimeo":
      return (
        <VimeoPlayer id={parsed.id} title={title} className={className} />
      );
  }
}

/** Re-export the parser for use in validation or other components */
export { parseVideoUrl };
export type { VideoPlayerProps, ParsedVideo, VideoProvider };
