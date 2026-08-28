/**
 * Sheet 0 front — the hard cover.
 * Ink board, foil frame, monogram. Same brand copy as the original hero.
 */
export default function CoverFront() {
  return (
    <div className="cover">
      <span className="cover-frame" aria-hidden="true" />
      <p className="cover-label">A Monograph · Vol. 01</p>
      <h1 id="book-heading-cover" tabIndex={-1}>
        <span>ANGGIE</span>
        <span className="cover-name">IRAWAN</span>
      </h1>
      <p className="cover-sub">AI-Assisted Product Builder</p>
      <p className="cover-tagline">
        &ldquo;I turn rough ideas into simple working web products.&rdquo;
      </p>
      <p className="cover-hint">Open the Book</p>
    </div>
  );
}
