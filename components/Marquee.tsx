import { marquee } from "@/lib/data";

/** Infinite horizontal tech ticker. The list is duplicated so the loop is seamless. */
export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="marquee-mask mt-14 overflow-hidden border-y border-line py-4">
      <ul
        className="marquee-track flex w-max animate-marquee items-center gap-8"
        aria-label="Core technologies"
      >
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= marquee.length}
            className="flex shrink-0 items-center gap-8 font-mono text-[13px] text-fg-muted"
          >
            {item}
            <span className="text-accent" aria-hidden="true">
              +
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
