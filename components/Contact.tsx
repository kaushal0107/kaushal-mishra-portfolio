import { site } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";

const channels = [
  { k: "Email", v: site.email, href: `mailto:${site.email}`, external: false },
  { k: "Phone", v: site.phone, href: `tel:${site.phoneHref}`, external: false },
  { k: "GitHub", v: site.githubHandle, href: site.github, external: true },
  { k: "LinkedIn", v: site.linkedinHandle, href: site.linkedin, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <SectionHeader index="06" title="Contact" meta="response within 24h" />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <h3 className="font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            Open to senior frontend
            <br />
            <span className="text-gradient">engineering roles.</span>
          </h3>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-fg-muted">
            I&apos;m most effective on real-time, server-rendered, and AI-powered products. Share
            the role or the problem you&apos;re solving and I&apos;ll respond with a direct
            assessment of fit.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <ul className="divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-sm">
            {channels.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                >
                  <span className="font-mono text-2xs uppercase tracking-wide text-fg-dim">
                    {c.k}
                  </span>
                  <span className="flex items-center gap-2 text-[13.5px] text-fg">
                    {c.v}
                    <span
                      aria-hidden="true"
                      className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
