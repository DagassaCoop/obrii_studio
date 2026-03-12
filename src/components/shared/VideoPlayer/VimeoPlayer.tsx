interface VimeoPlayerProps {
  /** Vimeo video ID */
  id: string;
  /** Accessible title for the iframe */
  title: string;
  /** Override wrapper className */
  className?: string;
}

export function VimeoPlayer({ id, title, className }: VimeoPlayerProps) {
  return (
    <div className={`aspect-video w-full ${className ?? ""}`}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?dnt=1&playsinline=1`}
        title={title}
        className="h-full w-full rounded-xl"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
