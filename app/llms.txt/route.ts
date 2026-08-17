import {
  about,
  allProjects,
  capabilities,
  education,
  experience,
  faqs,
  seo,
  site,
  stack,
  YOE,
} from "@/lib/data";

/**
 * /llms.txt — a plain-text digest for AI search engines and assistants
 * (Perplexity, ChatGPT Search, Gemini, Claude) that prefer a clean, factual
 * summary over parsing rendered HTML. Generated from the same data as the site,
 * so it can never drift out of sync with what the pages say.
 *
 * Convention: https://llmstxt.org
 */
export const dynamic = "force-static";

function build(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${seo.description}`);
  lines.push("");
  lines.push(`- **Role:** ${site.role}`);
  lines.push(`- **Location:** ${site.location}`);
  lines.push(`- **Experience:** ${YOE} years (since 2020)`);
  lines.push(`- **Status:** ${site.availability}`);
  lines.push(`- **Website:** ${site.url}`);
  lines.push(`- **Résumé:** ${site.url}/resume (PDF: ${site.url}${site.resumePath})`);
  lines.push(`- **Email:** ${site.email}`);
  lines.push(`- **GitHub:** ${site.github}`);
  lines.push(`- **LinkedIn:** ${site.linkedin}`);
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  about.paragraphs.forEach((p) => {
    lines.push(p);
    lines.push("");
  });

  lines.push("## Core competencies");
  lines.push("");
  capabilities.forEach((c) => lines.push(`- **${c.title}** — ${c.body} (${c.proof})`));
  lines.push("");

  lines.push("## Experience");
  lines.push("");
  experience.forEach((e) => {
    lines.push(`### ${e.title} — ${e.company}`);
    lines.push(`${e.product} | ${e.range} (${e.duration}) | ${e.location}`);
    lines.push("");
    e.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push(`- Technologies: ${e.tech.join(", ")}`);
    lines.push("");
  });

  lines.push("## Projects");
  lines.push("");
  allProjects.forEach((p) => {
    const link = p.liveUrl ? ` — ${p.liveUrl}` : " — no public deployment";
    lines.push(`- **${p.name}** (${p.tag}, ${p.year}, ${p.role})${link}: ${p.description}`);
  });
  lines.push("");

  lines.push("## Technical stack");
  lines.push("");
  stack.forEach((g) => lines.push(`- **${g.group}:** ${g.items.join(", ")}`));
  lines.push("");

  lines.push("## Education");
  lines.push("");
  education.forEach((e) => lines.push(`- ${e.degree} — ${e.school}`));
  lines.push("");

  lines.push("## FAQ");
  lines.push("");
  faqs.forEach((f) => {
    lines.push(`### ${f.q}`);
    lines.push(f.a);
    lines.push("");
  });

  lines.push(`_Last updated: ${new Date().toISOString().slice(0, 10)}_`);
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
