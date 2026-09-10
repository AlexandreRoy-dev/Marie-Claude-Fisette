import type { ReactNode } from "react";

/**
 * Masked-line wrapper for headings. Lines are authored explicitly rather than
 * split at runtime, so French line breaks land where they should instead of
 * wherever the measurement happens to fall.
 *
 * Renders as [data-reveal-line] > span (the mask) > span (the mover), which is
 * the structure Reveal animates.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <Tag data-reveal-line className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
