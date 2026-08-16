import type { Config } from "tailwindcss";

/** Every colour is a CSS variable so light/dark swap with a single class on <html>. */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("--bg"),
        surface: token("--surface"),
        "surface-2": token("--surface-2"),
        line: token("--line"),
        "line-soft": token("--line-soft"),
        fg: token("--fg"),
        "fg-muted": token("--fg-muted"),
        "fg-dim": token("--fg-dim"),
        accent: token("--accent"),
        "accent-ink": token("--accent-ink"),
        warm: token("--warm"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      maxWidth: {
        shell: "1120px",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        lift: "0 24px 60px -32px rgb(var(--shadow) / 0.55)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.28), 0 20px 50px -28px rgb(var(--accent) / 0.5)",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        ping: {
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1.05s steps(1) infinite",
        ping: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
        marquee: "marquee 42s linear infinite",
        drift: "drift 18s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
