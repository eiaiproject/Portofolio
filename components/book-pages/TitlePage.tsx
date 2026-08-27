/**
 * Sheet 1 front — the printed title page (cream paper).
 * Mirrors the brand mockup: Playfair names, italic subtitle, mono label,
 * tagline with arrow, and the vertical "A MONOGRAPH" spine note near the
 * right margin. Title pages traditionally carry no folio.
 */
export default function TitlePage() {
  return (
    <div className="title-page">
      <div className="title-page-body">
        <h2
          id="book-heading-title"
          className="title-page-name"
          tabIndex={-1}
        >
          <span>ANGGIE</span>
          <span>IRAWAN</span>
        </h2>
        <p className="title-page-sub">AI-Assisted Product Builder</p>
        <p className="title-page-est">PORTFOLIO EST. 2026</p>
        <p className="title-page-tagline">
          Rough ideas{" "}
          <span className="title-arrow" aria-hidden="true">
            &rarr;
          </span>{" "}
          Simple working web products
        </p>
      </div>
      <span className="title-page-rule" aria-hidden="true" />
      <p className="title-page-brand" aria-hidden="true">
        A Monograph
      </p>
    </div>
  );
}
