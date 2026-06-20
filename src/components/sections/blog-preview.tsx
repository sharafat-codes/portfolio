import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/shared/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/shared/post-card";
import type { PostMeta } from "@/lib/blog";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  const featured = posts.slice(0, 3);

  return (
    <Section id="blog" className="relative">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index="07"
            eyebrow="Knowledge Center"
            title="Notes from the engineering trenches."
            description="Practical writing on building SaaS, Laravel architecture, API security, and payments — lessons from shipping real systems."
          />
          <Reveal delay={0.1}>
            <Link href="/blog" className="shrink-0">
              <Button variant="outline" className="group">
                All articles
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {featured.map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} featured={post.featured} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
