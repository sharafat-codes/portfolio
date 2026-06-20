export type ProjectMetric = { value: string; label: string };

export type ArchitectureLayer = {
  layer: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  year: string;
  status: "Live" | "In Production" | "Active Development";
  /** mockup style rendered by ProjectVisual */
  visual: "ecommerce" | "marketplace" | "quiz" | "dashboard" | "tailor";
  /** hue used to tint the generated project visual */
  accent: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  responsibilities: string[];
  challenges: { title: string; detail: string }[];
  architecture: ArchitectureLayer[];
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "securegrades",
    name: "SecureGrades",
    tagline: "Digital educational e-commerce platform",
    industry: "EdTech · E-commerce",
    year: "2024",
    status: "Live",
    visual: "ecommerce",
    accent: "#15c9a3",
    summary:
      "A marketplace for digital educational products with secure checkout, license delivery, and a full admin back office.",
    problem:
      "Educators selling digital study material were stitching together payment links, manual delivery, and spreadsheets. There was no single platform to list products, take payments securely, and deliver downloadable assets without leaking files or losing track of orders.",
    solution:
      "I built SecureGrades as a single Laravel + Inertia + Vue application: a storefront for browsing and buying digital products, Stripe-powered checkout, signed and expiring download links for delivery, and an admin dashboard for catalog, orders, and revenue. The monolith-with-Inertia approach kept the codebase tight while still feeling like a single-page app.",
    role: "Sole full-stack engineer — architecture, backend, frontend, payments, deployment.",
    features: [
      "Digital product marketplace with categories and search",
      "Stripe checkout with webhooks for reliable order fulfillment",
      "Signed, expiring download links so paid assets can't be shared",
      "Admin panel for products, pricing, orders, and refunds",
      "Role-based access for admins, sellers, and buyers",
      "Order history, invoices, and re-download from the customer account",
    ],
    responsibilities: [
      "Designed the data model for products, variants, orders, and entitlements",
      "Implemented Stripe Checkout + webhook reconciliation for fulfillment",
      "Built secure file delivery with signed URLs and access checks",
      "Developed the Vue/Inertia storefront and the admin back office",
      "Set up CI, environment config, and production deployment",
    ],
    challenges: [
      {
        title: "Preventing paid-asset leakage",
        detail:
          "Digital goods can be re-shared trivially. I issued short-lived signed URLs tied to the buyer's entitlement and gated every download behind an authorization check, so a leaked link expires before it's useful.",
      },
      {
        title: "Reliable fulfillment under flaky payments",
        detail:
          "Card payments fail, retry, and fire webhooks out of order. I made fulfillment idempotent and webhook-driven so an order is only ever granted once, even if Stripe delivers the same event twice.",
      },
    ],
    architecture: [
      { layer: "Frontend", detail: "Vue 3 SPA served through Inertia.js — no separate API client to maintain" },
      { layer: "Backend", detail: "Laravel monolith with form-request validation, policies, and queued jobs" },
      { layer: "Payments", detail: "Stripe Checkout + signed webhooks reconciled into idempotent fulfillment" },
      { layer: "Storage", detail: "Private object storage with signed, expiring download URLs" },
      { layer: "Database", detail: "MySQL with normalized orders, entitlements, and audit trail" },
    ],
    stack: ["Laravel", "Inertia.js", "Vue.js", "MySQL", "Stripe", "Tailwind CSS"],
    metrics: [
      { value: "100%", label: "Idempotent fulfillment" },
      { value: "Signed", label: "Expiring delivery links" },
      { value: "1", label: "Codebase, SPA feel" },
    ],
    featured: true,
  },
  {
    slug: "empali",
    name: "Empali",
    tagline: "Community marketplace with web & mobile apps",
    industry: "Marketplace · Social Commerce",
    year: "2024",
    status: "In Production",
    visual: "marketplace",
    accent: "#7c6cf6",
    summary:
      "A community-driven marketplace where members list, discover, and transact — backed by a Laravel API and shipped to web and a React Native mobile app.",
    problem:
      "A niche community needed a trusted place to buy and sell among themselves instead of relying on generic platforms with no sense of belonging. They needed listings, profiles, discovery, and a mobile experience that felt native — not a wrapped website.",
    solution:
      "I designed an API-first Laravel backend powering two clients: an Inertia/Vue web app and a React Native mobile app sharing the same endpoints. Listings, rich user profiles, search and discovery, and messaging come from one source of truth, so the web and mobile experiences stay perfectly in sync.",
    role: "Full-stack engineer — API design, web client, and React Native mobile app.",
    features: [
      "Marketplace listings with images, categories, and pricing",
      "Rich seller and buyer profiles with reputation signals",
      "Search and discovery with filters and relevance ranking",
      "Native mobile apps built with React Native",
      "Shared API powering both web and mobile clients",
      "In-app messaging between buyers and sellers",
    ],
    responsibilities: [
      "Designed an API-first backend consumed by web and mobile",
      "Built the Vue/Inertia web marketplace and admin tooling",
      "Developed the React Native app — navigation, listings, profiles",
      "Implemented search, filtering, and discovery ranking",
      "Unified authentication across web and mobile sessions",
    ],
    challenges: [
      {
        title: "One backend, two very different clients",
        detail:
          "Web and mobile have different navigation and offline expectations. I kept all business logic in the Laravel API and treated web/mobile as thin clients, so a feature ships once and behaves consistently everywhere.",
      },
      {
        title: "Discovery that feels alive",
        detail:
          "A marketplace dies if nobody finds anything. I built indexed search with filters and a relevance ranking that surfaces fresh, relevant listings instead of a static newest-first feed.",
      },
    ],
    architecture: [
      { layer: "Mobile", detail: "React Native app with native navigation and shared API layer" },
      { layer: "Web", detail: "Vue 3 + Inertia.js storefront and seller dashboards" },
      { layer: "API", detail: "Laravel API-first backend — single source of truth for both clients" },
      { layer: "Search", detail: "Indexed, filterable discovery with relevance ranking" },
      { layer: "Database", detail: "MySQL with listings, profiles, and messaging" },
    ],
    stack: ["Laravel", "Inertia.js", "Vue.js", "React Native", "MySQL"],
    metrics: [
      { value: "2", label: "Native + web clients" },
      { value: "1", label: "Shared API surface" },
      { value: "iOS + Android", label: "Mobile reach" },
    ],
    featured: true,
  },
  {
    slug: "quizypilot",
    name: "QuizyPilot",
    tagline: "AI-powered quiz & product recommendation engine",
    industry: "AI · Conversion Optimization",
    year: "2025",
    status: "In Production",
    visual: "quiz",
    accent: "#34b3f1",
    summary:
      "A no-code quiz builder that turns guided questions into personalized product recommendations and rich conversion analytics.",
    problem:
      "Stores convert better when they guide shoppers to the right product, but most quiz tools are rigid and disconnected from real catalog data and analytics. Merchants needed dynamic quizzes with logic, recommendations, and insight into what actually drives sales.",
    solution:
      "I built the NestJS backend powering QuizyPilot: a dynamic quiz engine with branching logic, a recommendation layer that maps answers to products, and an analytics pipeline that tracks completion, drop-off, and conversion. A Vue.js frontend lets merchants build quizzes visually and read results at a glance.",
    role: "Backend engineer — NestJS quiz engine, recommendation logic, and analytics APIs.",
    features: [
      "Dynamic quiz system with branching question logic",
      "Answer-to-product recommendation mapping",
      "Conversion and drop-off analytics per quiz",
      "Business workflows for publishing and versioning quizzes",
      "Clean, typed APIs consumed by the Vue frontend",
      "Event tracking for completion and engagement",
    ],
    responsibilities: [
      "Architected the NestJS module structure and quiz domain model",
      "Built the branching quiz engine and recommendation mapping",
      "Designed analytics events and reporting endpoints",
      "Modeled quizzes, questions, and results for fast reads",
      "Exposed typed, documented APIs for the Vue client",
    ],
    challenges: [
      {
        title: "Flexible logic without a tangle",
        detail:
          "Branching quizzes can become unmaintainable spaghetti. I modeled questions, conditions, and outcomes as data — not code — so merchants compose arbitrarily complex logic that the engine evaluates deterministically.",
      },
      {
        title: "Analytics that drive decisions",
        detail:
          "Raw event logs don't help merchants. I aggregated events into funnels — start, per-step drop-off, completion, conversion — so the numbers point directly at what to fix.",
      },
    ],
    architecture: [
      { layer: "Frontend", detail: "Vue.js quiz builder and analytics dashboard" },
      { layer: "Backend", detail: "NestJS modular services — quiz engine, recommendations, analytics" },
      { layer: "Engine", detail: "Data-driven branching logic evaluated deterministically" },
      { layer: "Analytics", detail: "Event ingestion aggregated into conversion funnels" },
      { layer: "Database", detail: "Relational store optimized for fast quiz reads" },
    ],
    stack: ["NestJS", "Node.js", "Vue.js", "TypeScript", "PostgreSQL"],
    metrics: [
      { value: "Dynamic", label: "Branching logic" },
      { value: "Funnel", label: "Drop-off analytics" },
      { value: "Typed", label: "End-to-end APIs" },
    ],
    featured: true,
  },
  {
    slug: "quizell-partner-platform",
    name: "Quizell Partner Platform",
    tagline: "SaaS partner & agency management system",
    industry: "SaaS · B2B Automation",
    year: "2025",
    status: "Active Development",
    visual: "dashboard",
    accent: "#f0a020",
    summary:
      "A partner-management layer for a SaaS product — dashboards, performance analytics, and automation that scales an agency and reseller program.",
    problem:
      "As the SaaS grew its partner and agency program, tracking who referred whom, how partners performed, and what they were owed became manual and error-prone. The team needed a self-serve platform partners could log into — and automation to remove the spreadsheet work.",
    solution:
      "I built the partner platform with Laravel, Vue, and Inertia: dedicated partner dashboards, performance and revenue analytics, and automated workflows for onboarding, attribution, and reporting. Partners get a self-serve portal; the internal team gets accurate, automated numbers.",
    role: "Full-stack engineer — partner dashboards, analytics, and workflow automation.",
    features: [
      "Self-serve partner dashboards with scoped access",
      "Performance and revenue analytics per partner",
      "Automated onboarding and attribution workflows",
      "Internal admin view across the whole partner program",
      "Exportable reports for finance and operations",
      "Role-aware UI built on a shared Inertia/Vue stack",
    ],
    responsibilities: [
      "Designed multi-tenant-style scoping for partner data isolation",
      "Built analytics aggregations for partner performance",
      "Automated onboarding and referral attribution flows",
      "Developed dashboards and reporting in Vue/Inertia",
      "Hardened authorization so partners only see their own data",
    ],
    challenges: [
      {
        title: "Strict data isolation",
        detail:
          "Partners must never see each other's numbers. I enforced scoping at the query and policy layer so isolation is guaranteed by the backend, not by hiding things in the UI.",
      },
      {
        title: "Trustworthy automated numbers",
        detail:
          "Automation is worthless if partners don't trust the figures. I built attribution and aggregation to be reproducible and auditable, so every number can be traced back to its source events.",
      },
    ],
    architecture: [
      { layer: "Frontend", detail: "Vue 3 + Inertia.js dashboards with role-aware UI" },
      { layer: "Backend", detail: "Laravel with policy-enforced data scoping" },
      { layer: "Analytics", detail: "Aggregations for partner performance and revenue" },
      { layer: "Automation", detail: "Queued workflows for onboarding and attribution" },
      { layer: "Database", detail: "MySQL with auditable attribution records" },
    ],
    stack: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "Tailwind CSS"],
    metrics: [
      { value: "Self-serve", label: "Partner portal" },
      { value: "Automated", label: "Attribution + reporting" },
      { value: "Scoped", label: "Per-partner isolation" },
    ],
    featured: true,
  },
  {
    slug: "stitchly",
    name: "Stitchly",
    tagline: "Tailor & boutique business management software",
    industry: "Vertical SaaS · Operations",
    year: "2025",
    status: "Active Development",
    visual: "tailor",
    accent: "#e8556d",
    summary:
      "Operations software for tailors and boutiques — customers, measurements, and the full order lifecycle, with the day-to-day busywork automated.",
    problem:
      "Tailors run their business on paper: customer measurements in notebooks, orders on sticky notes, and follow-ups from memory. Records get lost, measurements get re-taken, and orders slip. They needed software that fits how a tailoring shop actually works.",
    solution:
      "I'm building Stitchly to digitize the tailor's workflow end to end: a customer database with reusable measurement profiles, an order lifecycle from intake to delivery, and automation for status updates and reminders — so the shop runs on a system instead of memory.",
    role: "Full-stack engineer — product design, data model, and full application build.",
    features: [
      "Customer management with full history",
      "Reusable measurement records per customer",
      "Order lifecycle from intake → stitching → fitting → delivery",
      "Automated status updates and follow-up reminders",
      "Business operations dashboard for daily workload",
      "Search across customers, orders, and measurements",
    ],
    responsibilities: [
      "Modeled customers, measurements, and order stages from real workflows",
      "Built the order lifecycle state machine and dashboards",
      "Automated reminders and status notifications",
      "Designed an interface usable by non-technical shop staff",
      "Owned the product end to end — discovery to build",
    ],
    challenges: [
      {
        title: "Modeling a craft, not a checkout",
        detail:
          "Tailoring isn't a linear e-commerce flow — garments go back and forth through fittings. I modeled orders as a state machine that mirrors how a real shop moves work, so the software bends to the craft instead of forcing the craft into software.",
      },
      {
        title: "Software for non-technical users",
        detail:
          "Shop staff aren't power users. I kept flows short, made measurements reusable, and surfaced today's work first — so the tool saves time from day one instead of adding overhead.",
      },
    ],
    architecture: [
      { layer: "Frontend", detail: "Component-driven UI tuned for non-technical shop staff" },
      { layer: "Backend", detail: "Order lifecycle modeled as an explicit state machine" },
      { layer: "Automation", detail: "Scheduled reminders and status notifications" },
      { layer: "Data", detail: "Reusable measurement profiles linked to customers" },
      { layer: "Database", detail: "Relational store for customers, orders, and stages" },
    ],
    stack: ["Laravel", "Vue.js", "Inertia.js", "MySQL"],
    metrics: [
      { value: "End-to-end", label: "Order lifecycle" },
      { value: "Reusable", label: "Measurement profiles" },
      { value: "Automated", label: "Reminders" },
    ],
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
