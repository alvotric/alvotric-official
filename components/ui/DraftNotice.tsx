/** Shown on legal pages until the text has been reviewed by a qualified person. */
export function DraftNotice() {
  return (
    <div
      role="note"
      className="mb-10 rounded-[var(--radius-control)] border border-warning/50 bg-surface p-4 text-[0.9375rem] text-muted"
    >
      <p className="font-semibold text-ink">Draft: not yet legally reviewed</p>
      <p className="mt-1">
        This text is a working draft written to describe what this website currently does. It has not been
        reviewed by a lawyer and should not be treated as final legal advice or a binding policy.
      </p>
    </div>
  );
}
