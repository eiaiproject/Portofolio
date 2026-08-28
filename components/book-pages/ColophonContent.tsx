/**
 * Services + The Workflow (folio 06). On desktop this is the left page of
 * the final spread — printed on the back of the last project sheet, so the
 * closing spread reads [Services + Workflow] + [Contact]. On narrow screens
 * the same content is re-rendered as the book's closing recto page (see
 * page.tsx), which keeps the canonical ids; that spread copy is renamed
 * via `idSuffix` so the two instances in the DOM never collide.
 * Copy is verbatim from the original Colophon section; the dark contact
 * panel lives on its own facing page.
 */
export default function ColophonContent({
  folio,
  idSuffix = "",
}: Readonly<{
  folio: string;
  idSuffix?: string;
}>) {
  return (
    <div className="book-colophon">
      <div className="page-content">
        <p className="book-lede">Colophon · End of Monograph Vol. 01</p>
        <h2
          id={`book-heading-colophon${idSuffix}`}
          className="book-page-title"
          tabIndex={-1}
        >
          Colophon.
        </h2>

        <section
          className="book-block"
          aria-labelledby={`services-heading${idSuffix}`}
        >
          <h3 className="book-block-title" id={`services-heading${idSuffix}`}>
            Services.
          </h3>
          <div className="capabilities-grid">
            <article className="capability-card">
              <span className="num" aria-hidden="true">
                01
              </span>
              <h4>Landing Pages &amp; MVPs</h4>
              <p className="cap-desc">
                Responsive pages and focused prototypes for validating a product
                idea quickly.
              </p>
              <p className="cap-examples">
                For: founders testing concepts, small business launches
              </p>
            </article>
            <article className="capability-card">
              <span className="num" aria-hidden="true">
                02
              </span>
              <h4>Internal Tools &amp; Dashboards</h4>
              <p className="cap-desc">
                Simple admin panels, CRUD workflows, and operational data tracking
                for teams.
              </p>
              <p className="cap-examples">
                For: operations teams, data entry, small orgs
              </p>
            </article>
            <article className="capability-card">
              <span className="num" aria-hidden="true">
                03
              </span>
              <h4>Offline-First PWAs</h4>
              <p className="cap-desc">
                Installable web apps that keep essential workflows available
                without a constant connection.
              </p>
              <p className="cap-examples">
                For: field workers, mobile-first use cases, privacy-sensitive apps
              </p>
            </article>
          </div>
        </section>

        <section
          className="book-block"
          aria-labelledby={`workflow-heading${idSuffix}`}
        >
          <h3 className="book-block-title" id={`workflow-heading${idSuffix}`}>
            The Workflow.
          </h3>
          <div className="process-track">
            <div className="process-step">
              <div className="step-num">01 / SHARE</div>
              <h4>Idea</h4>
              <p>You send the idea, goal, and rough flow.</p>
              <p className="step-detail">
                A short conversation, a sketch, or a reference. No formal
                requirements needed.
              </p>
            </div>
            <div className="process-step">
              <div className="step-num">02 / NARROW</div>
              <h4>Scope</h4>
              <p>We define one focused version to build first.</p>
              <p className="step-detail">
                One screen, one flow, one job to do well. Everything else waits
                for v2.
              </p>
            </div>
            <div className="process-step">
              <div className="step-num">03 / BUILD</div>
              <h4>Prototype</h4>
              <p>I turn the agreed flow into a working product.</p>
              <p className="step-detail">
                Built with AI-assisted coding. No boilerplate, no unnecessary
                abstractions.
              </p>
            </div>
            <div className="process-step">
              <div className="step-num">04 / REVIEW</div>
              <h4>Test</h4>
              <p>We test the important paths and fix weak spots.</p>
              <p className="step-detail">
                You try it. We find rough edges. I tighten them.
              </p>
            </div>
            <div className="process-step">
              <div className="step-num">05 / DELIVER</div>
              <h4>Ship</h4>
              <p>You receive the finished page, prototype, or application.</p>
              <p className="step-detail">
                Deployed and ready to use. No ongoing commitment required.
              </p>
            </div>
          </div>
        </section>
      </div>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}
