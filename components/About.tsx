import { about, education, faqs, site, YOE } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const facts = [
  { k: "Based in", v: site.location },
  { k: "Experience", v: `${YOE} years, two companies` },
  { k: "Focus", v: "Streaming UI · SSR & SEO · Applied AI" },
  { k: "Status", v: site.availability },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader index="05" title="About" meta="profile" />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-[15.5px] leading-[1.75] text-fg-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg-dim">
              How I work
            </h3>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {about.principles.map((p) => (
                <div key={p.k} className="border-l-2 border-[color:rgb(var(--accent)/0.5)] pl-4">
                  <dt className="font-display text-[14.5px] font-semibold tracking-tight text-fg">
                    {p.k}
                  </dt>
                  <dd className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{p.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={90} className="space-y-8">
          <dl className="divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-sm">
            {facts.map((f) => (
              <div key={f.k} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3.5">
                <dt className="w-24 shrink-0 font-mono text-2xs uppercase tracking-wide text-fg-dim">
                  {f.k}
                </dt>
                <dd className="flex-1 text-[13.5px] text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg-dim">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.degree} className="border-l-2 border-line pl-4">
                  <p className="font-display text-[15px] font-semibold tracking-tight">
                    {e.degree}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-fg-muted">{e.school}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Plain <details> — indexable, keyboard-accessible, zero JS. */}
      <div className="mt-16">
        <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg-dim">
          Frequently asked
        </h3>
        <div className="mt-5 divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-sm">
          {faqs.map((f, i) => (
            <details key={f.q} className="group px-5 py-4" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-semibold tracking-tight marker:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
