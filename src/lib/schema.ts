import { siteConfig } from "./site";

const base = siteConfig.url;

export const schemaIds = {
  website: `${base}/#website`,
  person: `${base}/#person`,
};

const knowsAbout = [
  "Laravel",
  "PHP",
  "Vue.js",
  "React",
  "Next.js",
  "NestJS",
  "Node.js",
  "React Native",
  "SaaS Development",
  "Marketplace Development",
  "Payment Gateway Integration",
  "API Development",
];

export function personSchema() {
  return {
    "@type": "Person",
    "@id": schemaIds.person,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: `${base}/`,
    email: siteConfig.email,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: `${base}/`,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": schemaIds.person },
  };
}

/** Sitewide graph injected from the root layout (WebSite + Person). */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), personSchema()],
  };
}

/** Homepage is a profile page for the Person. */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${base}/#profilepage`,
    url: `${base}/`,
    name: siteConfig.title,
    isPartOf: { "@id": schemaIds.website },
    about: { "@id": schemaIds.person },
    mainEntity: { "@id": schemaIds.person },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
}) {
  const url = `${base}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    author: { "@id": schemaIds.person },
    publisher: { "@id": schemaIds.person },
    isPartOf: { "@id": schemaIds.website },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
}

export function creativeWorkSchema(project: {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  stack: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${base}/work/${project.slug}#project`,
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    url: `${base}/work/${project.slug}`,
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    creator: { "@id": schemaIds.person },
    isPartOf: { "@id": schemaIds.website },
  };
}
