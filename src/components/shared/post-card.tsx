import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post, featured }: { post: PostMeta; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-elevated"
    >
      {/* gradient cover keyed to post accent */}
      <div
        className="relative h-40 overflow-hidden border-b border-border"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${post.accent} 22%, var(--card)), var(--card))`,
        }}
      >
        <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
        <div
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
          style={{ background: post.accent, opacity: 0.25 }}
          aria-hidden
        />
        <div className="absolute left-5 top-5">
          <Badge variant="signal">{post.category}</Badge>
        </div>
        <div className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          {formatDate(post.date)}
        </div>
        {featured && (
          <div className="absolute right-5 top-5 font-mono text-[0.6rem] uppercase tracking-wider text-primary">
            ★ Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {post.readingTime} min read
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            Read
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
