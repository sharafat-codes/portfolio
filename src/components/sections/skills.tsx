import { Section, Container, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

const levelWidth: Record<string, string> = {
  Expert: "w-full",
  Advanced: "w-3/4",
  Proficient: "w-1/2",
};

export function Skills() {
  return (
    <Section id="skills" className="relative">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Skills & Technology"
          title="A full-stack toolkit, used in production."
          description="The technologies I reach for across the stack — chosen deliberately, applied to real systems, and kept sharp on every project."
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {skillCategories.map((cat) => (
            <RevealItem
              key={cat.id}
              className={cn(cat.id === "integrations" && "md:col-span-2 lg:col-span-1")}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-elevated">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--signal-glow)" }}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{cat.index}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {cat.skills.length} {cat.skills.length === 1 ? "tool" : "tools"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{cat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>

                <ul className="mt-5 flex flex-col gap-3.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                          {skill.level}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r from-primary to-signal-2 transition-all duration-700",
                            levelWidth[skill.level],
                          )}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
