import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  title,
  lede,
  meta,
}: {
  index: string;
  title: string;
  lede?: string;
  meta?: string;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        {meta && (
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-2xs text-fg-dim">
            {meta}
          </span>
        )}
      </div>
      {lede && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{lede}</p>}
    </Reveal>
  );
}
