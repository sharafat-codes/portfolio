import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Check,
  Layers,
  Target,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/shared/project-visual";
import { projects, getProject } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} · Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: project.accent, opacity: 0.16 }}
          />
        </div>
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              All work
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span style={{ color: project.accent }}>{project.industry}</span>
              <span className="text-border">·</span>
              <span>{project.year}</span>
              <span className="text-border">·</span>
              <span>{project.status}</span>
            </div>

            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-muted-foreground sm:text-xl">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="group">
                    Visit live site
                    <ExternalLink className="size-4" />
                  </Button>
                </a>
              )}
              <Link href="/#contact">
                <Button variant={project.liveUrl ? "outline" : "default"}>
                  Start a similar project
                </Button>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Hero visual */}
      <Container>
        <Reveal>
          <ProjectVisual project={project} className="mx-auto max-w-4xl" />
        </Reveal>
      </Container>

      {/* Body */}
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          {/* main */}
          <div className="flex flex-col gap-12">
            <Block icon={Target} label="The Problem" title="What needed solving">
              <p>{project.problem}</p>
            </Block>

            <Block icon={Lightbulb} label="The Solution" title="How I approached it" accent>
              <p>{project.solution}</p>
            </Block>

            <Block icon={Check} label="Key Features" title="What it does">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-card/50 p-3.5 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={Layers} label="Technical Architecture" title="The system behind it">
              <div className="overflow-hidden rounded-2xl border border-border">
                {project.architecture.map((layer, i) => (
                  <div
                    key={layer.layer}
                    className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-6 ${
                      i !== 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <span className="w-28 shrink-0 font-mono text-xs uppercase tracking-wider text-primary">
                      {layer.layer}
                    </span>
                    <span className="text-sm text-muted-foreground">{layer.detail}</span>
                  </div>
                ))}
              </div>
            </Block>

            <Block icon={Wrench} label="Challenges Solved" title="The hard parts">
              <div className="flex flex-col gap-4">
                {project.challenges.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-border bg-card/50 p-5">
                    <h4 className="font-display text-base font-semibold">{c.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block icon={Check} label="My Responsibilities" title="What I owned">
              <ul className="flex flex-col gap-2.5">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 card-elevated">
              <SidebarRow label="Role">{project.role}</SidebarRow>
              <SidebarRow label="Year">{project.year}</SidebarRow>
              <SidebarRow label="Status">{project.status}</SidebarRow>

              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Tech stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="signal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-border pt-5">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-bold text-foreground">{m.value}</span>
                    <span className="text-right text-xs text-muted-foreground">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Next project */}
      <Container className="pb-24">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/30 card-elevated sm:flex-row sm:items-center"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Next case study
            </div>
            <div className="mt-2 font-display text-2xl font-bold transition-colors group-hover:text-primary">
              {next.name}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{next.tagline}</div>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-border text-primary transition-all group-hover:translate-x-1 group-hover:border-primary/40">
            <ArrowUpRight className="size-5" />
          </span>
        </Link>
      </Container>
    </article>
  );
}

function Block({
  icon: Icon,
  label,
  title,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-lg border ${
              accent
                ? "border-primary/30 bg-[color-mix(in_oklab,var(--signal)_12%,transparent)] text-primary"
                : "border-border bg-secondary/50 text-muted-foreground"
            }`}
          >
            <Icon className="size-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
        <div className="leading-relaxed text-muted-foreground [&>p]:text-pretty">{children}</div>
      </div>
    </Reveal>
  );
}

function SidebarRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-sm text-foreground/90">{children}</div>
    </div>
  );
}
