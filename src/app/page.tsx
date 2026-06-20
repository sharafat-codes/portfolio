import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Stats } from "@/components/sections/stats";
import { CaseStudies } from "@/components/sections/case-studies";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <TechMarquee />
      <Stats />
      <CaseStudies />
      <Services />
      <Skills />
      <Process />
      <Testimonials />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
