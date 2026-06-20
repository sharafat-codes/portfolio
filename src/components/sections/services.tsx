import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <Section id="services" className="relative">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Services"
          title="Business solutions, not just code."
          description="You don't need a developer who closes tickets — you need a partner who turns a business goal into working software. Here's what I build."
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {services.map((service) => (
            <RevealItem key={service.title}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-elevated">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary/50 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-[color-mix(in_oklab,var(--signal)_12%,transparent)]">
                    <service.icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{service.index}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="size-3.5 shrink-0 text-primary" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}

          {/* CTA card */}
          <RevealItem>
            <Link href="/#contact" className="block h-full">
              <div className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-primary/30 bg-primary p-6 text-primary-foreground transition-all duration-300 hover:-translate-y-1">
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 blueprint-grid"
                  aria-hidden
                />
                <div className="relative">
                  <span className="font-mono text-xs uppercase tracking-wider opacity-80">
                    Have something else in mind?
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight">
                    Let&apos;s scope your project together.
                  </h3>
                </div>
                <div className="relative flex items-center gap-2 font-medium">
                  Start a conversation
                  <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
