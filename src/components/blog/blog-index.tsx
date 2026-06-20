"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileQuestion, X } from "lucide-react";
import { PostCard } from "@/components/shared/post-card";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

export function BlogIndex({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const allCategories = ["All", ...categories];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div className="flex flex-col gap-8">
      {/* controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="h-12 w-full rounded-xl border border-input bg-background/60 pl-11 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--signal)_14%,transparent)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
                activeCategory === cat
                  ? "border-primary bg-[color-mix(in_oklab,var(--signal)_14%,transparent)] text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </div>

      {/* grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard post={post} featured={post.featured} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState onReset={() => { setQuery(""); setActiveCategory("All"); }} />
      )}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/30 py-20 text-center"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-secondary/40 text-muted-foreground">
        <FileQuestion className="size-6" />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold">No matching articles</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different search term or category.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
      >
        Clear filters
      </button>
    </motion.div>
  );
}
