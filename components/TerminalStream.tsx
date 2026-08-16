"use client";

import { useEffect, useMemo, useState } from "react";

type Line = { text: string; tone: "cmd" | "meta" | "key" | "data" | "done" };

/** Built from a server-supplied value so the years never drift between render passes. */
const buildLines = (yoe: string): Line[] => [
  { text: "$ GET /engineers/kaushal-mishra --stream", tone: "cmd" },
  { text: "", tone: "meta" },
  { text: "event: open        status: 200 OK", tone: "meta" },
  { text: 'data: { "name": "Kaushal Mishra" }', tone: "data" },
  { text: 'data: { "title": "Senior Frontend Engineer" }', tone: "data" },
  { text: `data: { "based": "Mumbai, IN", "experience": "${yoe} yrs" }`, tone: "data" },
  { text: 'data: { "core": ["React", "Next.js", "TypeScript"] }', tone: "data" },
  { text: 'data: { "focus": ["streaming UI", "SSR + SEO", "LLM"] }', tone: "data" },
  { text: 'data: { "shipped": 6, "users_served": "10,000+" }', tone: "data" },
  { text: 'data: { "open_to": "Senior Frontend Engineer roles" }', tone: "key" },
  { text: "event: done        latency: 0.98s   retries: 0", tone: "done" },
];

const TONE: Record<Line["tone"], string> = {
  cmd: "text-accent",
  meta: "text-[color:rgb(var(--fg-dim))]",
  key: "text-[color:rgb(var(--warm))]",
  data: "text-[color:rgb(var(--fg-muted))]",
  done: "text-accent",
};

const CHARS_PER_TICK = 3;
const TICK_MS = 16;

export default function TerminalStream({ yoe }: { yoe: string }) {
  const [count, setCount] = useState(0);

  const lines = useMemo(() => buildLines(yoe), [yoe]);

  const { offsets, total } = useMemo(() => {
    const offs: number[] = [];
    let running = 0;
    lines.forEach((l) => {
      offs.push(running);
      running += l.text.length + 1; // +1 for the newline pause
    });
    return { offsets: offs, total: running };
  }, [lines]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let current = 0;

    const start = setTimeout(function tick() {
      current = Math.min(current + CHARS_PER_TICK, total);
      raf = requestAnimationFrame(() => setCount(current));
      if (current < total) timer = setTimeout(tick, TICK_MS);
    }, 500);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  const done = count >= total;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--fg-dim)/0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--fg-dim)/0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--fg-dim)/0.5)]" />
        </div>
        <span className="truncate font-mono text-2xs text-fg-dim">
          kaushal-mishra — profile.stream.ts
        </span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-fg-dim">
          <span
            className={`h-1.5 w-1.5 rounded-full ${done ? "bg-accent" : "bg-[color:rgb(var(--warm))]"}`}
          />
          {done ? "closed" : "streaming"}
        </span>
      </div>

      {/* stream body */}
      <div className="thin-scroll min-h-[300px] overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.9] sm:px-5">
        {lines.map((line, i) => {
          const shown = Math.max(0, Math.min(count - offsets[i], line.text.length));
          if (shown === 0 && count <= offsets[i]) return <div key={i}>&nbsp;</div>;
          const isCursorLine = count > offsets[i] && count < offsets[i] + line.text.length + 1;
          return (
            <div key={i} className={`whitespace-pre ${TONE[line.tone]}`}>
              {line.text.slice(0, shown) || " "}
              {isCursorLine && !done && (
                <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-blink bg-accent align-middle" />
              )}
            </div>
          );
        })}
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface-2 px-4 py-2.5 font-mono text-2xs text-fg-dim">
        <span>
          transport: <span className="text-fg-muted">text/event-stream</span>
        </span>
        <span>
          ttft: <span className="text-accent">0.98s</span>
        </span>
        <span>
          retries: <span className="text-fg-muted">0</span>
        </span>
      </div>
    </div>
  );
}
