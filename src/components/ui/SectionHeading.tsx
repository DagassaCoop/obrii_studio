interface SectionHeadingProps {
  overline: string;
  title: string;
  /** Optional subtitle shown below the title in muted body text */
  subtitle?: string;
  /** Alignment — defaults to "center" */
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`${alignClass} ${className}`}>
      <p className="text-overline mb-6 tracking-[0.18em]">{overline}</p>
      <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-graphite">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-graphite/60 text-[1rem] leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
