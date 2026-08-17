"use client";

import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/data";

export default function Footer() {
  const isHome = usePathname() === "/";
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[15px] font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1 font-mono text-2xs text-fg-dim">
            {site.role} · {site.location}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={to(l.href)}
              className="font-mono text-2xs text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume"
            className="font-mono text-2xs text-fg-muted transition-colors hover:text-fg"
          >
            Résumé
          </a>
          <a
            href={to("#top")}
            className="font-mono text-2xs text-accent transition-opacity hover:opacity-75"
          >
            Back to top ↑
          </a>
        </nav>
      </div>

      <div className="shell mt-8 flex flex-wrap justify-between gap-2 border-t border-line-soft pt-6 font-mono text-2xs text-fg-dim">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>
          {/* Visible freshness signal — search and AI engines both weigh recency. */}
          Updated{" "}
          <time dateTime={new Date().toISOString().slice(0, 10)}>
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>{" "}
          · Built with Next.js &amp; TypeScript
        </span>
      </div>
    </footer>
  );
}
