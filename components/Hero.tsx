import { site, stats, YOE } from "@/lib/data";
import TerminalStream from "./TerminalStream";
import Rise from "./Rise";
import Marquee from "./Marquee";

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export default function Hero() {
  return (
    <section id="top" className="pt-28 sm:pt-36" aria-labelledby="hero-heading">
      {/* min-w-0 on both columns: without it the grid tracks inherit `min-width: auto`
          and the terminal's pre-formatted lines widen the whole page on small screens. */}
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="min-w-0">
          <Rise>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-2xs text-fg-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          </Rise>

          {/* Name and role live in one h1 so the page's strongest heading carries both. */}
          <Rise delay={70}>
            <h1 id="hero-heading" className="mt-6">
              <span className="block font-display text-[clamp(2.75rem,8vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-gradient">
                Kaushal Mishra
              </span>
              <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-sm font-normal text-fg-muted">
                <span className="text-fg">{site.role}</span>
                <span className="text-line" aria-hidden="true">
                  /
                </span>
                <span>{site.location}</span>
                <span className="text-line" aria-hidden="true">
                  /
                </span>
                <span>{YOE} years experience</span>
              </span>
            </h1>
          </Rise>

          <Rise delay={190}>
            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-fg-muted sm:text-[17.5px]">
              I take products from an empty repository to production —{" "}
              <strong className="font-semibold text-fg">real-time streaming interfaces</strong>,{" "}
              <strong className="font-semibold text-fg">server-rendered platforms</strong> built to
              rank, and <strong className="font-semibold text-fg">frontend architecture</strong> a
              team can keep building on. Six products shipped across two companies.
            </p>
          </Rise>

          <Rise delay={250}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Get in touch
              </a>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-mono text-[13px] text-fg transition-colors hover:border-accent"
              >
                Download résumé <ArrowIcon />
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-1 py-3 font-mono text-[13px] text-fg-muted transition-colors hover:text-fg"
              >
                GitHub <ArrowIcon />
              </a>
            </div>
          </Rise>
        </div>

        <Rise delay={200} className="min-w-0">
          <TerminalStream yoe={YOE} />
        </Rise>
      </div>

      <Rise delay={120}>
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            // reversed so the number reads first visually while dt still precedes dd in markup
            <div key={s.label} className="flex flex-col-reverse bg-bg px-5 py-6">
              <dt className="mt-2 text-[13px] leading-snug text-fg-muted">{s.label}</dt>
              <dd className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold tracking-tight text-fg">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-accent">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Rise>

      <Marquee />
    </section>
  );
}
