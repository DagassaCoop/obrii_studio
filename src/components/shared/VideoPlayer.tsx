/**
 * VideoPlayer — Embeds YouTube or Vimeo videos from any common URL format.
 *
 * Supported URL patterns:
 *   YouTube:  youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 *             youtube.com/shorts/ID, youtube.com/live/ID
 *   Vimeo:    vimeo.com/ID, vimeo.com/channels/X/ID,
 *             player.vimeo.com/video/ID
 */

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
    // Handle protocol-relative URLs
    url = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
  } catch {
    return null;
  }

  const hostname = url.hostname.replace("www.", "");

  // ── YouTube ──────────────────────────────────────────────────────────
  if (hostname === "youtube.com" || hostname === "m.youtube.com") {
    // /watch?v=ID
    const v = url.searchParams.get("v");
    if (v) return { provider: "youtube", id: v };

    // /embed/ID, /shorts/ID, /live/ID
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
    // /channels/X/ID or /groups/X/videos/ID
    const last = segments[segments.length - 1];
    if (last && /^\d+$/.test(last)) {
      return { provider: "vimeo", id: last };
    }
  }

  if (hostname === "player.vimeo.com") {
    // /video/ID
    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0] === "video" && segments[1]) {
      return { provider: "vimeo", id: segments[1] };
    }
  }

  return null;
}

/** Builds the embed src URL with provider-specific params. */
function buildEmbedUrl(video: ParsedVideo, autoplay: boolean): string {
  const ap = autoplay ? 1 : 0;

  switch (video.provider) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&autoplay=${ap}&playsinline=1`;
    case "vimeo":
      return `https://player.vimeo.com/video/${video.id}?dnt=1&autoplay=${ap}&playsinline=1`;
  }
}

// ── Component ────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  /** Any YouTube or Vimeo URL */
  url: string;
  /** Accessible iframe title (defaults to "Video") */
  title?: string;
  /** Start playback immediately */
  autoplay?: boolean;
  /** Override wrapper className */
  className?: string;
}

export function VideoPlayer({
  url,
  title = "Video",
  autoplay = false,
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

  const embedSrc = buildEmbedUrl(parsed, autoplay);

  return (
    <div className={`aspect-video w-full ${className ?? ""}`}>
      <iframe
        src={embedSrc}
        title={title}
        className="h-full w-full rounded-xl"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

/** Re-export the parser for use in validation or other components */
export { parseVideoUrl };
export type { VideoPlayerProps, ParsedVideo, VideoProvider };
