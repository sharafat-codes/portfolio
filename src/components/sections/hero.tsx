"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";
import { siteConfig } from "@/lib/site";

const rotating = [
  "SaaS platforms",
  "marketplaces",
  "AI products",
  "payment systems",
  "mobile apps",
];

const deployLog = [
  { label: "git push production main", type: "cmd" },
  { label: "Building Laravel · Vue · Inertia", type: "ok" },
  { label: "Running migrations", meta: "24 ok", type: "ok" },
  { label: "Stripe webhooks verified", type: "ok" },
  { label: "Test suite passing", meta: "186/186", type: "ok" },
  { label: "Deployed to production", meta: "1.9s", type: "ok" },
  { label: "https://app.client.com", meta: "live", type: "url" },
] as const;

const orbitTech = ["Laravel", "Next.js", "Vue", "NestJS", "Stripe", "React Native"];

export function Hero() {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotating.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      {/* aurora glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px] animate-aurora"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--signal) 26%, transparent), transparent 65%)",
          }}
        />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {siteConfig.availability}
            </motion.span>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              <Line delay={0.05}>I build the software</Line>
              <Line delay={0.13}>
                your <span className="text-gradient">business runs on.</span>
              </Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Full-stack software engineer with 2+ years shipping production applications used by
              real businesses. Scalable SaaS, marketplaces, AI apps, e-commerce, and payment
              systems — architected and built end to end.
            </motion.p>

            {/* rotating specialization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center gap-2.5 font-mono text-sm text-muted-foreground"
            >
              <span>Specializing in</span>
              <span className="relative inline-flex h-6 min-w-[150px] items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[wordIndex]}
                    initial={reduce ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -18, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-semibold text-primary"
                  >
                    {rotating[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href="/#work">
                <Button size="lg" className="group">
                  View my work
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline">
                  Start your project
                </Button>
              </Link>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="ghost" className="group">
                  <Download className="transition-transform group-hover:translate-y-0.5" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right — code window + orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <CodeWindow reduce={!!reduce} />
            <OrbitChips reduce={!!reduce} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function CodeWindow({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-border bg-[#0c1016] text-[#cdd6e3] card-elevated">
      {/* scanline accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-x-0 h-px opacity-40 animate-scan"
          style={{ background: "linear-gradient(90deg, transparent, var(--signal), transparent)" }}
        />
      </div>
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-2 font-mono text-xs text-white/40">
          <Terminal className="size-3.5" />
          deploy.sh
        </span>
      </div>
      <div className="space-y-2 p-5 font-mono text-[0.82rem] leading-relaxed">
        {deployLog.map((line, i) => (
          <motion.div
            key={line.label}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.18, duration: 0.4 }}
            className="flex items-center gap-2.5"
          >
            {line.type === "cmd" ? (
              <span className="text-[#4fe3c1]">$</span>
            ) : line.type === "url" ? (
              <span className="text-[#8fd3ff]">→</span>
            ) : (
              <Check className="size-3.5 shrink-0 text-[#15c9a3]" />
            )}
            <span
              className={
                line.type === "cmd"
                  ? "text-white/90"
                  : line.type === "url"
                    ? "text-[#8fd3ff]"
                    : "text-white/70"
              }
            >
              {line.label}
            </span>
            {"meta" in line && line.meta && (
              <span className="ml-auto rounded-md bg-white/[0.04] px-2 py-0.5 text-[0.7rem] text-[#15c9a3]">
                {line.meta}
              </span>
            )}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2.2, duration: 1, repeat: Infinity }}
          className="inline-block h-4 w-2 bg-[#15c9a3] align-middle"
        />
      </div>
    </div>
  );
}

const chipPositions = [
  "-top-4 -left-5 sm:-left-8",
  "top-1/3 -right-6 sm:-right-10",
  "-bottom-4 left-6",
  "bottom-1/4 -left-6 sm:-left-10",
  "-top-3 right-8",
  "-bottom-5 -right-4 sm:-right-8",
];

function OrbitChips({ reduce }: { reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {orbitTech.map((tech, i) => (
        <motion.span
          key={tech}
          className={`absolute rounded-full border border-border bg-card/85 px-3 py-1.5 font-mono text-[0.68rem] text-foreground/70 shadow-lg shadow-black/10 backdrop-blur ${chipPositions[i % chipPositions.length]}`}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -9, 0] }}
          transition={{
            opacity: { delay: 0.9 + i * 0.1 },
            scale: { delay: 0.9 + i * 0.1, type: "spring", stiffness: 260 },
            y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
          }}
        >
          <span className="mr-1.5 text-primary">●</span>
          {tech}
        </motion.span>
      ))}
    </div>
  );
}
