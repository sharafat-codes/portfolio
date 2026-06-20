"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Section, Container, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { processSteps } from "@/lib/data/process";

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <Section id="process" className="relative">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Development Process"
          title="How projects actually get delivered."
          description="A repeatable, transparent process — from the first conversation to a maintained production system. You always know what's happening and what's next."
        />

        <div ref={ref} className="relative mt-16 pl-2">
          {/* spine */}
          <div className="absolute bottom-4 left-[27px] top-2 w-px bg-border sm:left-[31px]" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-primary to-signal-2"
              style={{ scaleY }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.05}>
                <div className="relative flex gap-6 sm:gap-8">
                  {/* node */}
                  <div className="relative z-10 shrink-0">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card text-primary card-elevated">
                      <step.icon className="size-6" />
                    </div>
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-primary font-mono text-[0.65rem] font-bold text-primary-foreground">
                      {step.index}
                    </span>
                  </div>

                  {/* card */}
                  <div className="flex-1 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/30 sm:p-6">
                    <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[0.68rem] text-muted-foreground"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
