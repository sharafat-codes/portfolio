export const siteConfig = {
  name: "Sharafat Ali",
  title: "Sharafat Ali — Full-Stack Software Engineer",
  role: "Full-Stack Software Engineer",
  tagline:
    "Building scalable SaaS platforms, marketplaces, AI applications, e-commerce systems, and business automation software.",
  description:
    "Sharafat Ali is a full-stack software engineer building production-grade SaaS platforms, marketplaces, AI applications, payment systems, and business automation software with Laravel, Vue, React, Next.js, and NestJS.",
  url: "https://sharafatali.dev",
  locale: "en_US",
  email: "sharafat.codes@gmail.com",
  resumeUrl: "/sharafat-ali-resume.pdf",
  availability: "Available for new projects",
  location: "Remote · Worldwide",
  experienceStartYear: 2024,
  keywords: [
    "Full-Stack Software Engineer",
    "Laravel Developer",
    "Vue.js Developer",
    "Next.js Developer",
    "NestJS Developer",
    "SaaS Development",
    "Marketplace Development",
    "Payment Gateway Integration",
    "React Native Developer",
    "Sharafat Ali",
  ],
  links: {
    github: "https://github.com/sharafat-codes",
    linkedin: "https://www.linkedin.com/in/sharafat-ali-04586028a/",
    // x: "https://x.com/sharafat_dev",
    email: "mailto:sharafat.codes@gmail.com",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** in-page section id for active-section tracking on the home page */
  sectionId?: string;
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", sectionId: "work" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Process", href: "/#process", sectionId: "process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];
