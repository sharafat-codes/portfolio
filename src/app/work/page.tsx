import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "@/components/shared/project-visual";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies — SaaS platforms, marketplaces, e-commerce, AI products, and business automation software built and shipped to production by Sharafat Ali.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title={
          <>
            Products I&apos;ve <span className="text-gradient">designed & shipped.</span>
          </>
        }
        description="Each of these is a real system solving a real business problem. Open any case study for the architecture, the challenges, and how it was built."
      />

      <Container className="pb-24">
        <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
          {projects.map((project) => (
            <RevealItem key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block">
                <ProjectVisual project={project} className="transition-transform duration-500 group-hover:-translate-y-1.5" />
                <div className="mt-5 px-1">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary">{project.industry}</span>
                    <span className="text-border">·</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                      {project.name}
                    </h2>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </>
  );
}
