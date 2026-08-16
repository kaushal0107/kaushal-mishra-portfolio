import { capabilities } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader
        index="01"
        title="What I do"
        meta="core competencies"
        lede="Six areas I'm hired for, each backed by work that runs in production today."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 60}>
            <Spotlight className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-colors hover:border-[color:rgb(var(--accent)/0.45)]">
              <span className="font-mono text-2xs text-fg-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{c.body}</p>
              <p className="mt-auto pt-5 font-mono text-2xs text-accent">{c.proof}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
