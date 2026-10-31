import type { Status } from "@/content/products";
import { statusLabel } from "@/content/products";
import { cn } from "@/lib/cn";

const dotClass: Record<Status, string> = {
  live: "bg-success",
  "in-development": "bg-warning pulse-dot",
  planned: "bg-subtle",
};

/** Status is always conveyed with text, never color alone. */
export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-strong bg-elevated px-2.5 py-0.5 text-[0.8125rem] font-medium text-muted whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dotClass[status])} />
      {statusLabel[status]}
    </span>
  );
}
