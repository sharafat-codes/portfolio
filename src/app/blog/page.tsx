import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical engineering writing on building SaaS, Laravel architecture, API security, payment integrations, and choosing the right technology stack.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Center"
        title={
          <>
            Notes from the <span className="text-gradient">engineering trenches.</span>
          </>
        }
        description="Hard-won lessons from shipping production software — SaaS architecture, Laravel patterns, API security, and payments that don't break."
      />
      <Container className="pb-24">
        <BlogIndex posts={posts} categories={categories} />
      </Container>
    </>
  );
}
