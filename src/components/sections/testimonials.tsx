import { Star, Quote } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <Section id="testimonials" className="relative">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Testimonials"
          title="Trusted by the teams I build for."
          description="The relationships behind the work — partners and founders who've shipped real products with me."
          align="center"
        />

        <RevealGroup
          className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2"
          stagger={0.1}
        >
          {testimonials.map((t, i) => (
            <RevealItem key={t.company} className={cn(i % 3 === 0 && "sm:row-span-1")}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-elevated">
                <Quote
                  className="absolute right-5 top-5 size-10 text-foreground/[0.04] transition-colors group-hover:text-primary/10"
                  aria-hidden
                />
                <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={cn(
                        "size-4",
                        s < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${t.accent}, color-mix(in oklab, ${t.accent} 60%, #000))`,
                    }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
