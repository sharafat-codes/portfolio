export type Skill = {
  name: string;
  /** short note shown on hover / detail */
  note?: string;
  level: "Expert" | "Advanced" | "Proficient";
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  /** mono index label */
  index: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    index: "01",
    title: "Backend",
    description: "Domain logic, APIs, and the systems that keep data correct under load.",
    skills: [
      { name: "Laravel", level: "Expert", note: "Primary backend framework" },
      { name: "PHP", level: "Expert", note: "8+ idioms, typed code" },
      { name: "Node.js", level: "Advanced", note: "Services & tooling" },
      { name: "NestJS", level: "Advanced", note: "Modular TypeScript backends" },
      { name: "REST APIs", level: "Expert", note: "API-first design" },
    ],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend",
    description: "Interfaces that feel fast, look considered, and ship as real products.",
    skills: [
      { name: "Vue.js", level: "Expert", note: "Vue 3 + Composition API" },
      { name: "React", level: "Advanced", note: "Hooks & RSC" },
      { name: "Next.js", level: "Advanced", note: "App Router & SSR" },
      { name: "TypeScript", level: "Advanced", note: "End-to-end types" },
      { name: "Inertia.js", level: "Expert", note: "SPA without an API layer" },
    ],
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile",
    description: "Native mobile experiences sharing one backend with the web app.",
    skills: [{ name: "React Native", level: "Advanced", note: "iOS + Android from one codebase" }],
  },
  {
    id: "database",
    index: "04",
    title: "Database",
    description: "Schemas, indexing, and queries designed to stay fast as data grows.",
    skills: [
      { name: "MySQL", level: "Expert", note: "Production primary store" },
      { name: "PostgreSQL", level: "Advanced", note: "Relational + JSON" },
    ],
  },
  {
    id: "integrations",
    index: "05",
    title: "Integrations",
    description: "Payments, commerce, and marketing platforms wired in reliably.",
    skills: [
      { name: "Stripe", level: "Expert", note: "Checkout + webhooks" },
      { name: "PayPal", level: "Advanced" },
      { name: "Flutterwave", level: "Advanced" },
      { name: "Paystack", level: "Advanced" },
      { name: "Moneroo", level: "Proficient" },
      { name: "Shopify", level: "Advanced", note: "App & API" },
      { name: "Yotpo", level: "Proficient" },
      { name: "Klaviyo", level: "Proficient" },
    ],
  },
];

/** Flat list for the hero technology orbit + marquee */
export const techMarquee: string[] = [
  "Laravel",
  "Vue.js",
  "Next.js",
  "React",
  "NestJS",
  "Node.js",
  "TypeScript",
  "React Native",
  "MySQL",
  "PostgreSQL",
  "Stripe",
  "Inertia.js",
  "PHP",
  "Tailwind CSS",
  "Shopify",
];
