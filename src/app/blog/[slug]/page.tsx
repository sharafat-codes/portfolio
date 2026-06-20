import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/shared/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="relative">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* header */}
      <section className="relative overflow-hidden pt-28 pb-8 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: post.accent, opacity: 0.16 }}
          />
        </div>
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              All articles
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="signal">{post.category}</Badge>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Calendar className="size-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-7 flex items-center gap-3 border-y border-border py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                SA
              </span>
              <div>
                <div className="text-sm font-semibold">{post.author}</div>
                <div className="font-mono text-xs text-muted-foreground">{siteConfig.role}</div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* content */}
      <Container className="max-w-3xl pb-16">
        <Reveal>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Reveal>

        {/* tags */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="mono">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-primary/25 bg-[color-mix(in_oklab,var(--signal)_7%,var(--card))] p-8">
          <h3 className="font-display text-2xl font-bold">Building something like this?</h3>
          <p className="mt-2 max-w-lg text-muted-foreground">
            If you&apos;re shipping a SaaS, marketplace, or payment system and want it built right,
            let&apos;s talk through the approach.
          </p>
          <Link href="/#contact" className="mt-5 inline-block">
            <Button className="group">
              Start your project
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </Container>

      {/* related */}
      {related.length > 0 && (
        <Container className="max-w-3xl pb-24">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Related reading
          </h2>
          <div className="flex flex-col gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
              >
                <div>
                  <div className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                    {r.title}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {r.description}
                  </div>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
