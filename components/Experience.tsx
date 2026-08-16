import { experience } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader
        index="02"
        title="Experience"
        meta="2020 — present"
        lede="Three roles across two companies, in reverse-chronological order — a consistent progression from implementation to full product ownership."
      />

      <ol className="relative border-l border-line pl-6 sm:pl-10">
        {experience.map((exp, i) => (
          <Reveal as="li" key={exp.id} delay={i * 90} className="relative pb-14 last:pb-0">
            {/* timeline node */}
            <span
              aria-hidden="true"
              className={`absolute -left-[27px] top-2 grid h-3.5 w-3.5 place-items-center rounded-full border-2 sm:-left-[47px] ${
                exp.current ? "border-accent bg-accent" : "border-line bg-bg"
              }`}
            />

            <Spotlight
              as="article"
              className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm transition-colors hover:border-[color:rgb(var(--accent)/0.45)] sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-2xs">
                <span className="text-accent">{exp.id}</span>
                <span className="text-fg-muted">{exp.range}</span>
                <span className="text-fg-dim">· {exp.duration}</span>
                {exp.current && (
                  <span className="rounded-full border border-[color:rgb(var(--accent)/0.4)] bg-[color:rgb(var(--accent)/0.1)] px-2 py-0.5 text-accent">
                    current
                  </span>
                )}
                <span className="text-fg-dim">{exp.location}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-[22px]">
                {exp.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-fg-muted">
                <span className="font-medium text-fg">{exp.company}</span>
                <span className="mx-2 text-line" aria-hidden="true">
                  ·
                </span>
                {exp.product}
              </p>

              <p className="mt-4 border-l-2 border-[color:rgb(var(--accent)/0.5)] pl-3.5 text-[14.5px] leading-relaxed text-fg-muted">
                {exp.summary}
              </p>

              {exp.demoUrl && (
                <a
                  href={exp.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-2xs text-fg-muted transition-colors hover:border-accent hover:text-fg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {exp.demoLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              <ul className="mt-6 space-y-3">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-fg-muted">
                    <span className="mt-2 h-px w-3.5 shrink-0 bg-[color:rgb(var(--accent)/0.7)]" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line-soft pt-5">
                {exp.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-2xs text-fg-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
