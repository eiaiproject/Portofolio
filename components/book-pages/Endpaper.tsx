/* eslint-disable @next/next/no-img-element -- endpaper monogram needs <img> for static export compatibility */

/**
 * Sheet 0 back — endpaper (decorative only, never interactive).
 * Shows the brand monogram as a bookplate mark.
 */
export default function Endpaper() {
  return (
    <div className="endpaper">
      <img
        src="/AI-favicon.svg"
        alt=""
        aria-hidden="true"
        className="endpaper-mark"
        width={512}
        height={512}
      />
      <span className="endpaper-note" aria-hidden="true">
        Est. March 2026
      </span>
    </div>
  );
}
