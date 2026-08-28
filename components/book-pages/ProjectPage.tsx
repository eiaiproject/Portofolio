/* eslint-disable @next/next/no-img-element -- onError handler needs <img>, Image component can't use onError pattern */

import { ArrowUpRight } from "reicon-react";
import type { Project } from "@/lib/projects";

/**
 * Project page (recto — the right page of the spread).
 * Carries ALL project copy in a compact layout that fits without scrolling.
 * The project plate (portrait brand card) is the left page of the spread —
 * shown beside it on wide screens; on narrow screens the book stays centered
 * (recto only), so the page carries a small screenshot of its own.
 */
export default function ProjectPage({
  project,
  folio,
}: Readonly<{
  project: Project;
  folio: string;
}>) {
  return (
    <div className="book-project">
      <div className="page-content">
        <span className="project-status">
          <span className="project-status-dot" aria-hidden="true" />{" "}
          {project.status}
        </span>
        <h2
          id={`book-heading-${project.slug}`}
          className="book-page-title book-project-title"
          tabIndex={-1}
        >
          {project.name}
        </h2>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="dropcap">{project.description}</p>
        <div className="project-highlights">
          {project.highlights.map((h) => (
            <span key={h} className="project-highlight">
              {h}
            </span>
          ))}
        </div>
        <div className="project-lesson">{project.lesson}</div>
        <p className="project-tools">{project.tools}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`View ${project.name} ${project.linkLabel === "View Current Build" ? "current build" : "live app"}, opens in a new tab`}
        >
          {project.linkLabel} <ArrowUpRight size={16} weight="Outline" />
        </a>
        {/* Mobile-only screenshot — hidden on wide screens, where the plate
            on the facing page shows instead. */}
        <div className="visual-frame project-mobile-shot">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const placeholder = img.nextElementSibling as HTMLElement | null;
              if (placeholder) placeholder.style.display = "block";
            }}
          />
          <span className="placeholder-text" style={{ display: "none" }}>
            [ {project.name} Brand Card ]
          </span>
        </div>
      </div>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}
