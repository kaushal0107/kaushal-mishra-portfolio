import { collegeProjects, landingProjects, liveProjects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

function GroupLabel({ label, caption }: { label: string; caption: string }) {
  return (
    <Reveal className="mb-5 mt-16 flex flex-wrap items-baseline gap-x-3 gap-y-1 first:mt-0">
      <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg">{label}</h3>
      <span className="h-px min-w-6 flex-1 bg-line" aria-hidden="true" />
      <p className="font-mono text-2xs text-fg-dim">{caption}</p>
    </Reveal>
  );
}

export default function Projects() {
  const [featuredA, featuredB, ...restLive] = liveProjects;

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader
        index="04"
        title="Selected projects"
        meta="./projects"
        lede="Products shipped inside full-time roles, the public marketing surface around plugin work, and completed academic builds — each labelled by what can actually be opened."
      />

      <GroupLabel label="Live products" caption="open them — these are running in production" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <ProjectCard project={featuredA} variant="feature" />
        </Reveal>
        <Reveal delay={80}>
          <ProjectCard project={featuredB} variant="feature" />
        </Reveal>
        {restLive.map((p, i) => (
          <Reveal key={p.name} delay={160 + i * 80} className="lg:col-span-2">
            <ProjectCard project={p} variant="feature" />
          </Reveal>
        ))}
      </div>

      <GroupLabel
        label="Landing pages & plugin frontends"
        caption="site is public; the product ships inside WordPress / WooCommerce"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {landingProjects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <GroupLabel label="College projects" caption="completed course builds, never deployed" />
      <div className="grid gap-4 sm:grid-cols-2">
        {collegeProjects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <ProjectCard project={p} variant="muted" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
