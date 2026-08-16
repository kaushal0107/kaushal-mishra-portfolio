import type { Project } from "@/lib/data";
import Spotlight from "./Spotlight";

/** Monogram stands in for a logo: internal capitals if present, else the first two letters. */
function initials(name: string) {
  const caps = name.replace(/[^A-Za-z]/g, "").match(/[A-Z]/g);
  if (caps && caps.length >= 2) return caps.slice(0, 2).join("");
  return name.slice(0, 2);
}

function Monogram({ name, large }: { name: string; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-display font-bold text-accent ${
        large ? "h-12 w-12 text-base" : "h-9 w-9 text-[12px]"
      }`}
    >
      {initials(name)}
    </span>
  );
}

export default function ProjectCard({
  project,
  variant = "compact",
}: {
  project: Project;
  variant?: "feature" | "compact" | "muted";
}) {
  const isFeature = variant === "feature";
  const isMuted = variant === "muted";

  return (
    <Spotlight
      as="article"
      className={`flex h-full flex-col rounded-2xl border bg-surface/60 backdrop-blur-sm transition-colors ${
        isMuted
          ? "border-line-soft p-5 hover:border-line"
          : "border-line p-5 hover:border-[color:rgb(var(--accent)/0.45)] sm:p-6"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {!isMuted && <Monogram name={project.name} large={isFeature} />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-display font-semibold tracking-tight ${
                isFeature ? "text-xl" : "text-[16px]"
              }`}
            >
              {project.name}
            </h3>
            <span className="rounded-full border border-line bg-surface-2 px-2 py-0.5 font-mono text-2xs text-fg-dim">
              {project.tag}
            </span>
          </div>
          <p className="mt-1 font-mono text-2xs text-fg-dim">
            {project.year} · {project.role}
          </p>
        </div>
      </div>

      <p
        className={`mt-4 leading-relaxed text-fg-muted ${
          isFeature ? "text-[15px]" : "text-[13.5px]"
        }`}
      >
        {project.description}
      </p>

      {project.highlights && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="rounded-md border border-[color:rgb(var(--accent)/0.28)] bg-[color:rgb(var(--accent)/0.08)] px-2 py-1 font-mono text-2xs text-accent"
            >
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-2xs text-fg-dim">
          {project.stackList.map((s, i) => (
            <li key={s}>
              {s}
              {i < project.stackList.length - 1 && (
                <span className="ml-2 text-line" aria-hidden="true">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line-soft pt-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-2xs text-accent transition-opacity hover:opacity-75"
            >
              {project.liveLabel}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="font-mono text-2xs text-fg-dim">no live deployment</span>
          )}
          {project.note && (
            <span className="font-mono text-2xs text-fg-dim">{project.note}</span>
          )}
        </div>
      </div>
    </Spotlight>
  );
}
