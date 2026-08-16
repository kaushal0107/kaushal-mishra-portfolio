/** Fixed, non-interactive page background: engineering grid + two accent blooms. */
export default function Backdrop() {
  return (
    <>
      <div className="grid-backdrop" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="aurora animate-drift"
        style={{
          top: "-14rem",
          left: "-10rem",
          width: "38rem",
          height: "38rem",
          background: "rgb(var(--accent) / 0.30)",
        }}
      />
      <div
        aria-hidden="true"
        className="aurora animate-drift"
        style={{
          top: "-8rem",
          right: "-12rem",
          width: "32rem",
          height: "32rem",
          background: "rgb(var(--warm) / 0.18)",
          animationDelay: "-9s",
        }}
      />
    </>
  );
}
