import { stack } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader
        index="03"
        title="Technical stack"
        meta="dependencies.json"
        lede="Grouped by where each technology sits in the system — from the language up to the platform it deploys on."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 60}>
            <Spotlight className="h-full rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm transition-colors hover:border-[color:rgb(var(--accent)/0.45)]">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[15px] font-semibold tracking-tight">
                  {group.group}
                </h3>
                <span className="font-mono text-2xs text-fg-dim">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-2xs text-fg-muted transition-colors hover:border-[color:rgb(var(--accent)/0.5)] hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
