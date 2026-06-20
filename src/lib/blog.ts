import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  accent: string;
  readingTime: number;
};

export type Post = PostMeta & { html: string };

function readingTimeOf(raw: string): number {
  const words = raw.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function fileToMeta(filename: string): PostMeta {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "1970-01-01",
    category: data.category ?? "Engineering",
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? "Sharafat Ali",
    featured: Boolean(data.featured),
    accent: data.accent ?? "#15c9a3",
    readingTime: readingTimeOf(content),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(fileToMeta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((p) => p.tags))).sort();
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(content);

  return {
    ...fileToMeta(`${slug}.md`),
    title: data.title ?? slug,
    html: String(processed),
  };
}
