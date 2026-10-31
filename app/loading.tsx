export default function Loading() {
  return (
    <div role="status" className="flex min-h-[40vh] items-center justify-center text-muted">
      <span className="sr-only">Loading page</span>
      <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
    </div>
  );
}
