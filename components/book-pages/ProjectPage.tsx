import { ArrowUpRight } from "reicon-react";
import type { Project } from "@/lib/projects";

/**
 * Project page (recto — the right page of the spread).
 * Carries ALL project copy in a compact layout that fits without scrolling.
 * The project plate (portrait brand card) is the left page of the spread —
 * shown beside it on desktop, and before it in the mobile slide viewer.
 */
export default function ProjectPage({
  project,
  folio,
}: {
  project: Project;
  folio: string;
}) {
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
      </div>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}
