/**
 * Sheet 1 front — Front matter: the Manifesto/About page.
 * Copy is verbatim from the original `#about` section.
 */
export default function FrontMatter({ folio }: { folio: string }) {
  return (
    <div className="book-frontmatter">
      <div className="page-content">
        <p className="book-lede">
          Landing pages, internal tools, and offline-first apps for small
          businesses, founders, and solo makers.
        </p>
        <h2 id="book-heading-manifesto" className="book-page-title" tabIndex={-1}>
          Manifesto.
        </h2>
        <p className="manifesto-pull">
          From non-IT background to <em>shipping</em> products.
        </p>
        <div className="manifesto-body">
          <p>
            I come from a non-IT background. Since March 2026, I&apos;ve been
            building landing pages, prototypes, dashboards, and small apps
            through AI-assisted development and learning by shipping.
          </p>
          <p>
            The approach is straightforward: understand the problem, limit the
            scope, build the version that works, test the important paths, fix
            weak spots, and ship something usable. AI helps accelerate
            exploration and implementation, but product decisions, scope
            validation, and quality control stay deliberate and hands-on.
          </p>
          <p>
            The work here is still small and practical by design. Each project
            is a real tool built for a real need.
          </p>
        </div>
      </div>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}
