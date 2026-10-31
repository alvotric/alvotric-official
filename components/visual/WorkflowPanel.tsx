import { StatusBadge } from "@/components/ui/Badge";
import { LogoMark } from "@/components/layout/Logo";

function Node({ kind, label }: { kind: string; label: string }) {
  return (
    <div className="min-w-0 rounded-[10px] border border-line-strong bg-bg/70 px-2.5 py-2">
      <p className="truncate text-[0.6875rem] text-subtle">{kind}</p>
      <p className="mt-0.5 truncate text-[0.8125rem] font-medium text-ink">{label}</p>
    </div>
  );
}

function Link() {
  return (
    <div className="flex w-5 items-center sm:w-8" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-accent" />
      <span className="size-1.5 rounded-full bg-accent" />
    </div>
  );
}

/**
 * Illustrative interface for Alvo: a plain-language request becomes a three-step workflow.
 * Decorative and static. Contains no data, metrics, or logos.
 */
export function WorkflowPanel({ idPrefix, stacked = false }: { idPrefix: string; stacked?: boolean }) {
  return (
    <div className="relative">
      {stacked ? (
        <>
          <div aria-hidden="true" className="panel-ghost absolute inset-x-6 -top-5 h-full opacity-60" />
          <div aria-hidden="true" className="panel-ghost absolute inset-x-12 -top-9 h-full opacity-30" />
        </>
      ) : null}
      <Panel idPrefix={idPrefix} />
    </div>
  );
}

function Panel({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="panel p-4 sm:p-5 sm:pb-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <LogoMark id={`${idPrefix}-wp`} size={20} />
          <p className="text-sm font-semibold">Alvo</p>
        </div>
        <StatusBadge status="in-development" />
      </div>

      <div className="mt-4 rounded-[10px] border border-line bg-bg/60 px-3.5 py-3">
        <p className="text-[0.6875rem] text-subtle">Describe the task</p>
        <p className="mt-1 text-[0.875rem] leading-snug text-ink">
          When a new message arrives, summarize it and notify me.
        </p>
      </div>

      <div className="mt-4 flex items-center" aria-hidden="true">
        <div className="grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
          <Node kind="Trigger" label="New message" />
          <Link />
          <Node kind="AI step" label="Summarize" />
          <Link />
          <Node kind="Action" label="Notify me" />
        </div>
      </div>
    </div>
  );
}
