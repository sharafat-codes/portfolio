import { Section, Container, SectionHeading } from "@/components/shared/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { stats } from "@/lib/data/stats";

export function Stats() {
  return (
    <Section id="trust" className="relative">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Trust & Experience"
          title="Credibility, measured in shipped software."
          description="Not a student project portfolio — production systems that businesses depend on every day, built and maintained end to end."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.1}>
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-elevated">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "var(--signal-glow)" }}
                  aria-hidden
                />
                <div className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="mt-3 text-sm font-semibold text-foreground">{stat.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {stat.sublabel}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-dashed border-border bg-secondary/20 px-6 py-5 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>EdTech</span>
            <span className="text-border">·</span>
            <span>Marketplaces</span>
            <span className="text-border">·</span>
            <span>AI &amp; Recommendations</span>
            <span className="text-border">·</span>
            <span>B2B SaaS</span>
            <span className="text-border">·</span>
            <span>E-commerce</span>
            <span className="text-border">·</span>
            <span>Operations</span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
