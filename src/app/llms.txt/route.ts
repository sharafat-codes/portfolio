import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/blog";

// Prerendered at build time; stays in sync with the canonical site URL.
export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.url;
  const posts = getAllPosts();

  const body = `# ${siteConfig.name} — ${siteConfig.role}

> ${siteConfig.tagline} 2+ years building production applications used by real businesses.

${siteConfig.description}

## Contact
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}
- Availability: ${siteConfig.availability} (${siteConfig.location})

## Services
- SaaS Product Development
- Marketplace Development
- E-commerce Development
- Custom Business Software
- API Development & Integrations
- Payment Gateway Integration
- Mobile Application Development (React Native)

## Core stack
Laravel, PHP, Node.js, NestJS, Vue.js, React, Next.js, TypeScript, Inertia.js, React Native, MySQL, PostgreSQL. Integrations: Stripe, PayPal, Flutterwave, Paystack, Moneroo, Shopify, Yotpo, Klaviyo.

## Case studies
${projects.map((p) => `- [${p.name}](${base}/work/${p.slug}): ${p.tagline} — ${p.industry}. Stack: ${p.stack.join(", ")}.`).join("\n")}

## Articles
${posts.map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`).join("\n")}

## Key pages
- Home: ${base}/
- Work: ${base}/work
- Blog: ${base}/blog
- Contact: ${base}/#contact
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
