/**
 * CSS-only entrance for above-the-fold content.
 *
 * Unlike `Reveal`, this needs no observer and no hydration, so the hero paints on the
 * first frame the stylesheet lands — which keeps LCP honest. Use `Reveal` below the fold.
 */
export default function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`animate-fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
