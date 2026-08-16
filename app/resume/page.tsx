import type { Metadata } from "next";
import Link from "next/link";
import {
  allProjects,
  capabilities,
  education,
  experience,
  seo,
  site,
  stack,
  YOE,
} from "@/lib/data";
import Footer from "@/components/Footer";

const title = `${site.name} — Résumé | Senior Frontend Engineer`;
const description = `Full résumé of ${site.name}, Senior Frontend Engineer in ${site.locality}: ${YOE}+ years of experience, roles at Enso Web Works and StoreApps, technical stack, projects and education.`;

export const metadata: Metadata = {
  title: "Résumé",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    url: `${site.url}/resume`,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

function breadcrumbs() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Résumé", item: `${site.url}/resume` },
    ],
  };
}

function Block({ title: heading, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-dim">{heading}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs()) }}
      />

      <main className="shell pb-10 pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="font-mono text-2xs text-fg-dim">
          <Link href="/" className="transition-colors hover:text-fg">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-fg-muted">Résumé</span>
        </nav>

        <header className="mt-8">
          <h1 className="font-display text-[clamp(2.25rem,6vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
            {site.name}
          </h1>
          <p className="mt-3 font-mono text-sm text-accent">{site.role}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
            {seo.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-2xs text-fg-muted">
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-fg">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {site.githubHandle}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {site.linkedinHandle}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-accent px-5 py-3 font-mono text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Download PDF
            </a>
            <Link
              href="/"
              className="rounded-xl border border-line bg-surface px-5 py-3 font-mono text-[13px] text-fg transition-colors hover:border-accent"
            >
              Back to portfolio
            </Link>
          </div>
        </header>

        <Block title="Core competencies">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title}>
                <h3 className="font-display text-[15px] font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Professional experience">
          <ol className="space-y-10">
            {experience.map((exp) => (
              <li key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {exp.title}
                  </h3>
                  <span className="font-mono text-2xs text-fg-dim">{exp.range}</span>
                </div>
                <p className="mt-1 text-[14px] text-fg-muted">
                  <span className="font-medium text-fg">{exp.company}</span> · {exp.product} ·{" "}
                  {exp.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-[14px] leading-relaxed text-fg-muted"
                    >
                      <span
                        className="mt-2 h-px w-3 shrink-0 bg-[color:rgb(var(--accent)/0.7)]"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Technical skills">
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {stack.map((g) => (
              <div key={g.group}>
                <dt className="font-display text-[14px] font-semibold tracking-tight">
                  {g.group}
                </dt>
                <dd className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                  {g.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Projects">
          <ul className="space-y-5">
            {allProjects.map((p) => (
              <li key={p.name} className="border-l-2 border-line pl-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <span className="font-mono text-2xs text-fg-dim">
                    {p.tag} · {p.year}
                  </span>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-2xs text-accent hover:opacity-75"
                    >
                      {p.liveLabel} ↗
                    </a>
                  )}
                </div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Education">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <h3 className="font-display text-[15px] font-semibold tracking-tight">
                  {e.degree}
                </h3>
                <p className="mt-1 text-[13.5px] text-fg-muted">{e.school}</p>
              </li>
            ))}
          </ul>
        </Block>
      </main>
      <Footer />
    </>
  );
}
