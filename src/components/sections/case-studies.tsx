import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/shared/project-visual";
import { cn } from "@/lib/utils";
import { featuredProjects } from "@/lib/data/projects";

export function CaseStudies() {
  return (
    <Section id="work" className="relative">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index="02"
            eyebrow="Featured Case Studies"
            title="Real products, solving real business problems."
            description="A look at the platforms I've architected and shipped — the problem, the system behind the solution, and what it took to make it production-ready."
          />
          <Reveal delay={0.1}>
            <Link href="/work" className="shrink-0">
              <Button variant="outline" className="group">
                All projects
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {featuredProjects.map((project, i) => (
            <CaseStudyRow key={project.slug} project={project} flip={i % 2 === 1} index={i + 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CaseStudyRow({
  project,
  flip,
  index,
}: {
  project: (typeof featuredProjects)[number];
  flip: boolean;
  index: number;
}) {
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <div className={cn("relative", flip && "lg:order-2")}>
          <span
            className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[7rem] font-bold leading-none text-foreground/[0.035] sm:text-[9rem]"
            aria-hidden
          >
            {String(index).padStart(2, "0")}
          </span>
          <Link href={`/work/${project.slug}`} className="block transition-transform duration-500 hover:-translate-y-1.5">
            <ProjectVisual project={project} />
          </Link>
        </div>

        {/* Content */}
        <div className={cn("flex flex-col items-start", flip && "lg:order-1")}>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">{project.industry}</span>
            <span className="text-border">·</span>
            <span>{project.year}</span>
            <span className="text-border">·</span>
            <span
              className="rounded-full px-2 py-0.5"
              style={{
                color: "var(--signal)",
                background: "color-mix(in oklab, var(--signal) 12%, transparent)",
              }}
            >
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 text-base font-medium text-muted-foreground">{project.tagline}</p>

          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          {/* problem → solution */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-destructive/80">
                Problem
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {project.problem}
              </p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-[color-mix(in_oklab,var(--signal)_6%,transparent)] p-4">
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                Solution
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {project.solution}
              </p>
            </div>
          </div>

          {/* stack */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="mono">
                {tech}
              </Badge>
            ))}
          </div>

          {/* metrics */}
          <div className="mt-6 grid w-full grid-cols-3 gap-3 border-t border-border pt-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-lg font-bold text-foreground">{m.value}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={`/work/${project.slug}`}>
              <Button className="group">
                Read case study
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost">
                  <ExternalLink />
                  Live site
                </Button>
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
