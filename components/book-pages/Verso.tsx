/**
 * Generic verso (back of each content sheet) — decorative paper + folio only.
 * Rendered inside an aria-hidden face, so it is purely visual.
 */
export default function Verso({ folio }: { folio: string }) {
  return (
    <div className="verso">
      <span className="verso-folio">{folio}</span>
    </div>
  );
}
