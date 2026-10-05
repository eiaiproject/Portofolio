/* eslint-disable @next/next/no-img-element -- onError handler needs <img>, Image component can't use onError pattern */

import type { Project } from "@/lib/projects";

/**
 * Project plate (verso — the left page of a project spread, desktop only).
 * A full-bleed image plate like a printed monograph figure. On mobile this
 * face is never seen — the project page carries its own small screenshot.
 */
export default function ProjectPlate({
  project,
  folio,
  priority = false,
}: Readonly<{
  project: Project;
  folio: string;
  /** Only the very first plate is eager; every later plate loads lazily. */
  priority?: boolean;
}>) {
  /* WebP primary with the PNG kept as fallback (older browsers, cached
     embeds). Same pixels, roughly a third of the bytes. */
  const webp = project.image.replace(/\.png$/, ".webp");
  return (
    <div className="plate">
      <div className="visual-frame plate-frame">
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={1600}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const placeholder = img
                .closest(".visual-frame")
                ?.querySelector<HTMLElement>(".placeholder-text");
              if (placeholder) placeholder.style.display = "block";
            }}
          />
        </picture>
        <span className="placeholder-text" style={{ display: "none" }}>
          [ {project.name} Brand Card ]
        </span>
      </div>
      <p className="plate-caption">{project.name}</p>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}
