/**
 * Single source of truth for every piece of content on the site.
 * Copy lives here so the components stay purely presentational.
 */

const CAREER_START = "2020-11-24";

/** Years of professional experience, to one decimal, so the number never goes stale. */
export function yearsOfExperience(from: string = CAREER_START): string {
  const years = (Date.now() - new Date(from).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return years.toFixed(1);
}

export const YOE = yearsOfExperience();

/* ------------------------------------------------------------------
   Date helpers. Every range and duration below is derived from ISO
   dates rather than typed by hand, so nothing needs editing over time.
   Parsed as plain Y/M/D — never through the local timezone, which would
   shift a first-of-the-month start into the previous month.
-------------------------------------------------------------------*/

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parts(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return { y, m: m - 1 };
}

export function formatMonthYear(iso: string): string {
  const { y, m } = parts(iso);
  return `${MONTHS[m]} ${y}`;
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonthYear(start)} — ${end ? formatMonthYear(end) : "Present"}`;
}

/**
 * Length of a role in whole months, counting both the first and last month —
 * the same convention LinkedIn uses, so the numbers match a recruiter's mental model.
 * An open-ended role is measured to today, and re-measures on every build.
 */
export function formatDuration(start: string, end?: string): string {
  const s = parts(start);
  const now = new Date();
  const e = end ? parts(end) : { y: now.getUTCFullYear(), m: now.getUTCMonth() };

  const months = Math.max((e.y - s.y) * 12 + (e.m - s.m) + 1, 1);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;

  const chunks: string[] = [];
  if (yrs) chunks.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) chunks.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return chunks.join(" ");
}

export const site = {
  name: "Kaushal Mishra",
  firstName: "Kaushal",
  lastName: "Mishra",
  role: "Senior Frontend Engineer",
  location: "Mumbai, India",
  locality: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  careerStart: CAREER_START,
  tagline:
    "Senior Frontend Engineer who takes products from an empty repo to production — real-time streaming interfaces, server-rendered platforms that rank, and frontend architecture a team can keep building on.",
  email: "kaushalm0107@gmail.com",
  phone: "+91-7977252528",
  phoneHref: "+917977252528",
  github: "https://github.com/kaushal0107",
  githubHandle: "github.com/kaushal0107",
  linkedin: "https://linkedin.com/in/kaushal-mishra",
  linkedinHandle: "linkedin.com/in/kaushal-mishra",
  resumePath: "/Kaushal-Mishra-Senior-Frontend-Engineer.pdf",
  availability: "Open to Senior Frontend Engineer roles",
  // Update this once the site has a real domain — every SEO tag reads from it.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://kaushalmishra.com").replace(/\/$/, ""),
};

export const seo = {
  // Kept under ~60 characters so Google shows it whole rather than truncating.
  title: `${site.name} — Senior Frontend Engineer | React & Next.js`,
  shortTitle: `${site.name} — Senior Frontend Engineer`,
  description: `${site.name} is a Senior Frontend Engineer in ${site.locality} with ${YOE}+ years building production SaaS and AI-powered platforms in React, Next.js and TypeScript. Six products shipped across StoreApps and Enso Web Works, reaching 10,000+ users — real-time streaming UI, SSR and technical SEO, LLM integration, and frontend architecture.`,
  keywords: [
    "Kaushal Mishra",
    "Kaushal Mishra frontend engineer",
    "Kaushal Mishra Senior Frontend Engineer",
    "Kaushal Mishra software engineer",
    "Kaushal Mishra React developer",
    "Kaushal Mishra Next.js developer",
    "Kaushal Mishra resume",
    "Kaushal Mishra portfolio",
    "Kaushal Mishra InfoQueries",
    "Kaushal Mishra InfoProfile",
    "Kaushal Mishra Putler",
    "Kaushal Mishra StoreApps",
    "senior frontend engineer Mumbai",
    "frontend developer Mumbai",
    "React developer Mumbai",
    "Next.js developer India",
    "software engineer Mumbai",
    "SSE streaming UI engineer",
    "server-side rendering SEO engineer",
    "AI frontend engineer India",
  ],
  /** Every job title that honestly describes the same role — used in Person schema. */
  jobTitles: [
    "Senior Frontend Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "Software Engineer",
    "Web Developer",
    "UI Engineer",
  ],
};

export const navLinks = [
  { href: "#capabilities", label: "What I do" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: `${YOE}+`, unit: "yrs", label: "Building production frontend" },
  { value: "6", unit: "products", label: "Shipped end-to-end across two companies" },
  { value: "10,000+", unit: "users", label: "Served by the SaaS suite I built for" },
  { value: "2", unit: "teams", label: "Four-member teams led through Agile delivery" },
];

/** What I actually do, with the shipped proof for each — the core of the page. */
export const capabilities = [
  {
    title: "Real-time & streaming UI",
    body: "Token-by-token SSE interfaces that stay correct when a user switches conversations mid-response, remounts a component, or fires concurrent requests. Stream managers, optimistic state, graceful cancellation.",
    proof: "~1s first token, zero dropped streams",
  },
  {
    title: "SSR & technical SEO",
    body: "Server-rendered Next.js built to be found: per-route metadata, Open Graph previews, canonical structure, structured data, and Core Web Vitals treated as a requirement rather than a cleanup task.",
    proof: "0 → 25,000+ indexed pages",
  },
  {
    title: "AI product engineering",
    body: "Multi-provider LLM layers with quota-aware fallback, tiered usage metering, intent routing, and sanitized Markdown rendering — so an outage at one provider is a routing decision, not an incident.",
    proof: "Gemini · Ollama · Perplexity in production",
  },
  {
    title: "Frontend architecture",
    body: "Modular client architecture on MVC and clean-architecture principles, split so a team can keep extending it a year later without a rewrite. Typed end-to-end, tested at the seams.",
    proof: "~32K lines across 8 modules",
  },
  {
    title: "Design → production fidelity",
    body: "Complete Figma systems converted into pixel-accurate, mobile-first production apps, including the design work itself across four SaaS sub-brands and their marketing surface.",
    proof: "4 brands, 10,000+ active users",
  },
  {
    title: "Ownership & team leadership",
    body: "Roadmap, sprint planning, bug triage, code review, and production releases — leading four-member cross-functional teams while staying the primary hands-on developer.",
    proof: "2 teams led, roadmap owned",
  },
];

/** Short marquee of the tools that show up in the work below. */
export const marquee = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "SSE Streaming",
  "Server-Side Rendering",
  "Tailwind CSS",
  "NestJS",
  "PostgreSQL",
  "Multi-Provider LLM",
  "SEO & Open Graph",
  "TanStack Query",
  "Zustand",
  "Flutter",
  "GraphQL",
  "Clean Architecture",
];

export type Experience = {
  id: string;
  start: string;
  end?: string;
  title: string;
  company: string;
  product: string;
  location: string;
  demoUrl?: string;
  demoLabel?: string;
  summary: string;
  bullets: string[];
  tech: string[];
  /** Derived below — never authored by hand. */
  range: string;
  duration: string;
  current: boolean;
};

const roles: Omit<Experience, "range" | "duration" | "current">[] = [
  {
    id: "01",
    start: "2025-08-01",
    title: "Senior Frontend Engineer & Product Lead",
    company: "Enso Web Works",
    product: "InfoQueries — AI Search & Knowledge Platform",
    location: "Mumbai, India",
    demoUrl: "https://infoqueries.com/searchai",
    demoLabel: "infoqueries.com/searchai",
    summary:
      "Own an AI search product end-to-end — roadmap, architecture, and the majority of the code.",
    bullets: [
      "Own the product roadmap end-to-end, directing a 4-member cross-functional team through two-week Agile sprints as primary hands-on developer.",
      "Architected the web client from scratch (~32K lines, 8 modules), authoring the majority of repo commits while contributing across the NestJS API and Flutter clients.",
      "Built a ChatGPT-style conversational UI with real-time SSE streaming (~1s first token) via a stream manager resilient to conversation switches, remounts, and concurrent requests.",
      "Engineered a multi-provider LLM layer (Gemini, Ollama, Perplexity) with quota-aware fallback and 5-tier usage metering; shipped 6+ intent modules plus web/image/video/news verticals with ECharts & MapTiler visualizations.",
      "Hardened the client with strict CSP, sanitized Markdown rendering, httpOnly-cookie SSO, SSR, SEO/Open Graph metadata, dark mode, and i18n across every route.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "SSE", "NestJS", "Gemini", "Ollama", "ECharts"],
  },
  {
    id: "02",
    start: "2025-01-01",
    end: "2025-07-31",
    title: "Frontend Engineer → Lead Frontend Engineer",
    company: "Enso Web Works",
    product: "InfoProfile — Digital Identity & Networking",
    location: "Mumbai, India",
    demoUrl: "https://infoprofile.com",
    demoLabel: "infoprofile.com",
    summary:
      "Rebuilt a zero-SEO Flutter Web product into a server-rendered Next.js platform, then led the team shipping it.",
    bullets: [
      "Rebuilt InfoProfile from Flutter Web (zero SEO) to Next.js with full SSR — taking the platform from 0 to 25,000+ indexed, individually optimized pages with Open Graph previews.",
      "Designed a scalable, modular frontend architecture on MVC principles and converted complete Figma designs into a pixel-perfect, mobile-responsive production app.",
      'Built digital visiting cards (QR), public/logged-out profiles, LinkedIn-style feeds, "People Nearby" discovery via Google Maps, and multi-category profiles.',
      "Led a 4-member team, owning Jira sprint planning, bug triage, and production deployments.",
    ],
    tech: ["Next.js", "SSR", "SEO", "Google Maps API", "Figma", "Jira"],
  },
  {
    id: "03",
    start: "2020-11-24",
    end: "2025-01-31",
    title: "Frontend Developer",
    company: "StoreApps (formerly Aspire Global)",
    product: "Putler · Icegram · Offermative · StoreApps",
    location: "Remote, India",
    demoUrl: "https://demo.putler.com",
    demoLabel: "demo.putler.com",
    summary:
      "Four years across four SaaS sub-brands serving 10,000+ active users — UI, frontend, and the marketing surface around them.",
    bullets: [
      "Led UI/UX design and development across four sub-brands (StoreApps, Putler, Icegram, Offermative) serving 10,000+ active users, in React.js, Tailwind CSS, GraphQL, and Postgraphile.",
      "Owned Putler (SaaS analytics) end-to-end and built the frontend for Offermative, an AI-powered WooCommerce upsell plugin.",
      "Developed landing pages and lead-capture/email flows for StoreApps and Icegram; configured product docs on Docusaurus; trained and led a team of 5 on blog content.",
    ],
    tech: ["React.js", "Tailwind CSS", "GraphQL", "Postgraphile", "WordPress", "WooCommerce"],
  },
];

/** Dates in, display strings out — the only place role timing is computed. */
export const experience: Experience[] = roles.map((role) => ({
  ...role,
  range: formatRange(role.start, role.end),
  duration: formatDuration(role.start, role.end),
  current: !role.end,
}));

export const stack = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Dart", "SQL"],
  },
  {
    group: "Frontend",
    items: [
      "React 19",
      "Next.js 16",
      "Tailwind CSS 4",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "shadcn/ui",
    ],
  },
  {
    group: "Backend & Data",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "GraphQL",
      "Dexie/IndexedDB",
    ],
  },
  {
    group: "Mobile & AI",
    items: ["Flutter", "Gemini", "Ollama", "Perplexity", "Multi-Provider LLM Abstraction"],
  },
  {
    group: "Architecture",
    items: [
      "SSR",
      "SEO",
      "Open Graph",
      "Streaming UI (SSE)",
      "Modular Monorepo",
      "MVC",
      "Clean Architecture",
    ],
  },
  {
    group: "Platforms & Tools",
    items: [
      "Docker",
      "JWT/SSO",
      "httpOnly Auth",
      "CSP",
      "Google Maps API",
      "Git",
      "pnpm",
      "Vite",
      "Jira",
      "Figma",
      "Agile/Scrum",
    ],
  },
];

export type Project = {
  name: string;
  tag: string;
  kind: "live" | "landing" | "college";
  year: string;
  role: string;
  description: string;
  highlights?: string[];
  stackList: string[];
  liveUrl?: string;
  liveLabel?: string;
  note?: string;
  featured?: boolean;
};

/** Live products built and owned during full-time roles. */
export const liveProjects: Project[] = [
  {
    name: "InfoQueries",
    tag: "AI Search",
    kind: "live",
    year: "2025 — present",
    role: "Architect & primary developer",
    featured: true,
    description:
      "AI search & knowledge platform with multi-provider LLM streaming, a ChatGPT-style conversational UI, and 6+ intent modules across web, image, video, and news verticals. Architected the web client end-to-end.",
    highlights: [
      "~1s first-token SSE streaming",
      "Gemini · Ollama · Perplexity fallback",
      "~32K lines, 8 modules",
    ],
    stackList: ["Next.js 16", "React 19", "TypeScript", "NestJS", "SSE", "ECharts"],
    liveUrl: "https://infoqueries.com/searchai",
    liveLabel: "infoqueries.com/searchai",
  },
  {
    name: "InfoProfile",
    tag: "SSR Platform",
    kind: "live",
    year: "2025",
    role: "Lead frontend engineer",
    featured: true,
    description:
      "Digital identity and networking platform, rebuilt from a zero-SEO Flutter Web app into a fully server-rendered Next.js product with digital visiting cards, public profiles, and Maps-based discovery.",
    highlights: ["0 → 25,000+ indexed pages", "Full SSR + Open Graph", "Led a 4-member team"],
    stackList: ["Next.js", "SSR", "SEO", "Google Maps API"],
    liveUrl: "https://infoprofile.com",
    liveLabel: "infoprofile.com",
  },
  {
    name: "Putler",
    tag: "SaaS Analytics",
    kind: "live",
    year: "2020 — 2025",
    role: "Frontend owner",
    description:
      "E-commerce analytics dashboard for online sellers — owned the frontend end-to-end at StoreApps. The public demo opens the real product dashboard.",
    highlights: ["Live dashboard demo", "10,000+ active users across brands"],
    stackList: ["React.js", "Tailwind CSS", "GraphQL", "Postgraphile"],
    liveUrl: "https://demo.putler.com",
    liveLabel: "demo.putler.com",
    note: "Demo opens the live product dashboard.",
  },
];

/** Landing pages + WordPress/WooCommerce plugin frontends — the site is public, the product isn't. */
export const landingProjects: Project[] = [
  {
    name: "Offermative",
    tag: "Plugin frontend",
    kind: "landing",
    year: "2020 — 2025",
    role: "Frontend developer",
    description:
      "AI-powered WooCommerce upsell and cross-sell plugin. Built the plugin frontend plus the marketing landing page.",
    stackList: ["React.js", "Tailwind CSS", "WooCommerce"],
    liveUrl: "https://offermative.com",
    liveLabel: "offermative.com",
    note: "Landing page public — the plugin ships inside WooCommerce stores.",
  },
  {
    name: "Icegram",
    tag: "Landing page",
    kind: "landing",
    year: "2020 — 2025",
    role: "UI & frontend",
    description:
      "Landing pages and lead-capture / email flows for Icegram's WordPress marketing plugin suite.",
    stackList: ["React.js", "Tailwind CSS", "WordPress"],
    liveUrl: "https://icegram.com",
    liveLabel: "icegram.com",
    note: "Landing page public — plugins ship inside WordPress.",
  },
  {
    name: "StoreApps",
    tag: "Landing page",
    kind: "landing",
    year: "2020 — 2025",
    role: "UI & frontend",
    description:
      "Marketing site for the StoreApps WooCommerce plugin suite, plus product documentation configured on Docusaurus.",
    stackList: ["React.js", "Tailwind CSS", "Docusaurus"],
    liveUrl: "https://storeapps.org",
    liveLabel: "storeapps.org",
    note: "Landing page public — plugins ship inside WooCommerce.",
  },
  {
    name: "Putler (marketing site)",
    tag: "Landing page",
    kind: "landing",
    year: "2020 — 2025",
    role: "UI & frontend",
    description:
      "Marketing and pricing surface for Putler, separate from the product dashboard demo above.",
    stackList: ["React.js", "Tailwind CSS"],
    liveUrl: "https://putler.com",
    liveLabel: "putler.com",
  },
];

/** College builds — completed, but never deployed, so there is nothing live to link. */
export const collegeProjects: Project[] = [
  {
    name: "BookieFY",
    tag: "College project",
    kind: "college",
    year: "College",
    role: "Full-stack developer",
    description:
      "Full-stack book borrowing platform with Razorpay payments handling rental deposits and returns.",
    stackList: ["React.js", "Firebase", "MongoDB", "PostgreSQL", "Express.js"],
    note: "Completed — no live deployment available.",
  },
  {
    name: "E-notary",
    tag: "College project",
    kind: "college",
    year: "College",
    role: "Full-stack developer",
    description:
      "Notary portal digitizing in-person court visits, with Paytm integration for online fee payments.",
    stackList: ["React.js", "Tailwind CSS", "MySQL", "Express.js"],
    note: "Completed — no live deployment available.",
  },
];

export const allProjects = [...liveProjects, ...landingProjects, ...collegeProjects];

export const projectGroups = [
  {
    id: "live",
    label: "Live products",
    caption: "Shipped in full-time roles — open and use them.",
    items: liveProjects,
  },
  {
    id: "landing",
    label: "Landing pages & plugins",
    caption: "Public marketing surface; the product itself lives inside WordPress / WooCommerce.",
    items: landingProjects,
  },
  {
    id: "college",
    label: "College projects",
    caption: "Completed course builds, never deployed.",
    items: collegeProjects,
  },
] as const;

export const education = [
  {
    degree: "MCA, Computer Applications",
    school: "Thakur Institute of Management Studies, Career Development & Research",
  },
  {
    degree: "BSc, Information Technology",
    school: "Nirmala Memorial Foundation College",
  },
];

/** Prose block — real indexable copy that mentions the name naturally. */
export const about = {
  heading: "About",
  paragraphs: [
    `I'm ${site.name}, a Senior Frontend Engineer based in ${site.location} with ${YOE} years of production experience. I've spent that time shipping software people use daily — first across four SaaS sub-brands serving 10,000+ users at StoreApps, now building AI and digital identity platforms at Enso Web Works.`,
    "My work concentrates on the parts of frontend engineering that get hard at scale: state that stays correct while a response is still streaming, pages that render on the server and remain indexable, and client architecture a team can keep extending long after the initial release.",
    "I operate end-to-end — architecture, implementation, sprint planning, code review, and production release. I've led four-member cross-functional teams through two-week Agile cycles, translated complete Figma systems into production applications, and taken a product from an empty repository to a live platform as primary developer.",
    `I'm currently ${site.availability.toLowerCase()}, ideally on products where real-time behaviour, server rendering, or applied AI is core to how the product works.`,
  ],
  principles: [
    {
      k: "Correctness first",
      v: "A feature is done when it holds up under real usage — concurrent requests, slow networks, and interrupted sessions included.",
    },
    {
      k: "End-to-end ownership",
      v: "I follow work from architecture through release rather than handing off at the component boundary.",
    },
    {
      k: "Built to be extended",
      v: "Modular and fully typed, so the next engineer can add to it without a rewrite or a walkthrough.",
    },
    {
      k: "Discoverable by design",
      v: "Server rendering, metadata, and structured data from the first commit — indexability is a requirement, not a follow-up ticket.",
    },
  ],
};

/** FAQ doubles as FAQPage structured data for rich results. */
export const faqs = [
  {
    q: "Who is Kaushal Mishra?",
    a: `Kaushal Mishra is a Senior Frontend Engineer based in ${site.location} with ${YOE}+ years of production experience in React, Next.js and TypeScript. He has shipped six products across StoreApps and Enso Web Works, and currently leads frontend engineering and product for an AI search platform.`,
  },
  {
    q: "What does Kaushal Mishra specialise in?",
    a: "Real-time streaming interfaces over SSE, server-side rendering and technical SEO, multi-provider LLM integration, and modular frontend architecture for products that need to scale beyond a single team.",
  },
  {
    q: "What has Kaushal Mishra built?",
    a: "InfoQueries, an AI search platform architected end-to-end; InfoProfile, rebuilt from Flutter Web into server-rendered Next.js and taken from 0 to 25,000+ indexed pages; and Putler, Icegram, Offermative and StoreApps across four years at StoreApps.",
  },
  {
    q: "What technologies does Kaushal Mishra work with?",
    a: "React 19, Next.js 16, TypeScript, Tailwind CSS, TanStack Query and Zustand on the frontend; Node.js, NestJS, GraphQL and PostgreSQL on the backend; plus Flutter, and LLM providers including Gemini, Ollama and Perplexity.",
  },
  {
    q: "Is Kaushal Mishra a software engineer or a frontend developer?",
    a: "Both descriptions fit. Kaushal Mishra is a software engineer who specialises in the frontend — React, Next.js and TypeScript — while also working across Node.js and NestJS APIs, PostgreSQL, and Flutter mobile clients on the products he ships.",
  },
  {
    q: "Where is Kaushal Mishra based, and does he work remotely?",
    a: `He is based in ${site.location} and has worked remotely for most of his career, including four years delivering for a distributed SaaS team. He is open to on-site, hybrid and fully remote roles.`,
  },
  {
    q: "Where can I find Kaushal Mishra's résumé?",
    a: `The full résumé is published at ${site.url}/resume and can also be downloaded as a PDF from the same page. It covers his complete work history, technical stack, projects and education.`,
  },
  {
    q: "Is Kaushal Mishra available for hire?",
    a: `Yes — he is ${site.availability.toLowerCase()}. The fastest way to reach him is ${site.email}.`,
  },
];
