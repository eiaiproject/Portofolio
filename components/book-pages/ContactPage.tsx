import { forwardRef, type Ref } from "react";
import { ArrowRight } from "reicon-react";

/**
 * Right page of the final spread — the dark closing page (folio 07).
 * Echoes the hard cover: full ink board, cream foil frame, and the
 * "LET'S SHIP V1." call to action. The email button is hydrated at runtime
 * by the parent (spam obfuscation), so it receives a ref.
 */
function ContactPage(
  { folio }: { folio: string },
  emailBtnRef: Ref<HTMLButtonElement>
) {
  return (
    <div className="contact-page">
      <span className="contact-frame" aria-hidden="true" />
      <h2 id="book-heading-contact" className="contact-title" tabIndex={-1}>
        LET&rsquo;S SHIP V1.
      </h2>
      <div className="contact-actions">
        <button ref={emailBtnRef} className="btn" type="button">
          Reach Me <ArrowRight size={16} weight="Outline" />
        </button>
      </div>
      <span className="folio" aria-hidden="true">
        {folio}
      </span>
    </div>
  );
}

export default forwardRef(ContactPage);
