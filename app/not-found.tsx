import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-root">
      <div className="not-found-content">
        <p className="not-found-code">404</p>
        <h1 className="not-found-heading">Log not found</h1>
        <p className="not-found-desc">
          This page doesn&apos;t exist in the monograph. Maybe it was archived,
          or maybe it was never written.
        </p>
        <Link href="/" className="not-found-link">
          Back to Monograph &larr;
        </Link>
      </div>
    </div>
  );
}
