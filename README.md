# Sharafat Ali — Portfolio

A premium, production-grade portfolio for **Sharafat Ali**, Full-Stack Software Engineer. Built as a modern SaaS-style product site, not a template.

**Design identity — "System Signal":** an engineering-grade interface aesthetic (blueprint grid, monospace technical labels, deploy-log code window, observability polish) with an emerald-teal signal accent that carries meaning for a payments/SaaS engineer — uptime, health, green checks, money flowing.

## Tech stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first tokens) · **shadcn/ui**-style primitives
- **Framer Motion** — scroll reveals, page transitions, micro-interactions
- **next-themes** — dark/light with no flash
- **cmdk** — ⌘K command menu
- Markdown blog via **unified** (remark → rehype) with syntax highlighting

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## What's inside

| Area | Notes |
| --- | --- |
| **Home** | Hero, trust/stats, case studies, services, skills, process, testimonials, blog, multi-step contact |
| **`/work` + `/work/[slug]`** | Product-style case studies (problem → solution → architecture → challenges) |
| **`/blog` + `/blog/[slug]`** | Markdown articles with search, categories, reading time |
| **Premium features** | Command menu (⌘K), theme toggle, scroll progress, back-to-top, custom cursor, page transitions, skeleton loaders, custom 404, empty states |
| **SEO** | Per-page metadata, Open Graph, JSON-LD (Person + BlogPosting), generated OG image & favicon, `sitemap.xml`, `robots.txt`, web manifest |

## Project structure

```
src/
├── app/                 # routes, layout, SEO files (sitemap/robots/manifest/og/icon)
│   ├── api/contact/     # project-inquiry endpoint
│   ├── blog/ work/      # listings + dynamic detail pages
│   └── globals.css      # Tailwind v4 + design tokens (light & dark)
├── components/
│   ├── sections/        # home page sections
│   ├── layout/          # navbar, footer, command menu, theme toggle
│   ├── effects/         # cursor, scroll progress, back-to-top
│   ├── shared/          # reveal, section heading, project visual, post card
│   └── ui/              # button, card, badge, input, skeleton
├── content/blog/        # markdown articles (frontmatter + body)
├── lib/                 # site config, data, blog loader, utils
└── hooks/               # active-section tracking
```

## Customizing

- **Brand, links, email, resume:** [`src/lib/site.ts`](src/lib/site.ts)
- **Case studies:** [`src/lib/data/projects.ts`](src/lib/data/projects.ts)
- **Skills / services / process / testimonials / stats:** `src/lib/data/`
- **Blog posts:** add a `.md` file to `src/content/blog/` (frontmatter: `title`, `description`, `date`, `category`, `tags`, `featured`, `accent`)
- **Accent color & theme:** the `--signal` token and friends in `src/app/globals.css`
- **Resume:** replace `public/sharafat-ali-resume.pdf` with your own CV
- **Contact form:** wire `src/app/api/contact/route.ts` to your email/CRM provider

## Notes

- Set the real production domain in `siteConfig.url` (`src/lib/site.ts`) so canonical URLs, sitemap, and Open Graph resolve correctly.
- Dark mode is system-aware by default; the toggle and ⌘K both switch themes.
- All animations respect `prefers-reduced-motion`.
