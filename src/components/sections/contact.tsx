"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send, Sparkles, AlertCircle } from "lucide-react";
import { Section, Container } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const projectTypes = [
  "SaaS Platform",
  "Marketplace",
  "E-commerce",
  "Mobile App",
  "API & Integrations",
  "Custom Software",
];
const budgets = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  details: "",
};

const steps = [
  { id: "scope", title: "Your project", hint: "What are we building?" },
  { id: "about", title: "About you", hint: "How do I reach you?" },
  { id: "details", title: "The details", hint: "Tell me the vision." },
];

export function Contact() {
  const [step, setStep] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [form, setForm] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.projectType) next.projectType = "Pick a project type.";
      if (!form.budget) next.budget = "Select an estimated budget.";
      if (!form.timeline) next.timeline = "Choose a timeline.";
    }
    if (s === 1) {
      if (!form.name.trim()) next.name = "Your name is required.";
      if (!form.email.trim()) next.email = "Your email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        next.email = "Enter a valid email address.";
    }
    if (s === 2) {
      if (form.details.trim().length < 10) next.details = "A little more detail helps (10+ chars).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goBack = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!validateStep(2)) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Section id="contact" className="relative">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — pitch */}
          <Reveal className="flex flex-col">
            <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-primary">08</span>
              <span className="text-border">/</span>
              Project Inquiry
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.85rem]">
              Let&apos;s build something <span className="text-gradient">worth shipping.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Tell me about your product and I&apos;ll come back with honest, specific thoughts —
              scope, approach, and how I&apos;d build it. No obligation, no sales pitch.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {[
                "A reply within 1–2 business days",
                "Straight talk on scope, cost & timeline",
                "Architecture-first, built to last",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--signal)_14%,transparent)] text-primary">
                    <Check className="size-3.5" />
                  </span>
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Prefer email?
              </div>
              <a
                href={siteConfig.links.email}
                className="mt-1 inline-block font-display text-lg font-semibold text-foreground transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </div>
          </Reveal>

          {/* Right — form card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 card-elevated sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                style={{ background: "var(--signal-glow)" }}
                aria-hidden
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessState key="success" name={form.name} />
                ) : (
                  <motion.div key="form" exit={{ opacity: 0 }} className="relative">
                    {/* progress */}
                    <div className="mb-7">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs uppercase tracking-wider text-primary">
                            Step {step + 1} of {steps.length}
                          </span>
                          <span className="mt-1 font-display text-lg font-semibold">
                            {steps[step].title}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {steps.map((s, i) => (
                            <span
                              key={s.id}
                              className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                i === step
                                  ? "w-7 bg-primary"
                                  : i < step
                                    ? "w-2 bg-primary"
                                    : "w-2 bg-secondary",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-signal-2"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* steps */}
                    <div className="relative min-h-[290px]">
                      <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                          key={step}
                          custom={dir}
                          initial={{ opacity: 0, x: dir * 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: dir * -40 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {step === 0 && (
                            <div className="flex flex-col gap-5">
                              <ChoiceGroup
                                label="Project type"
                                options={projectTypes}
                                value={form.projectType}
                                onChange={(v) => set("projectType", v)}
                                error={errors.projectType}
                              />
                              <ChoiceGroup
                                label="Estimated budget"
                                options={budgets}
                                value={form.budget}
                                onChange={(v) => set("budget", v)}
                                error={errors.budget}
                              />
                              <ChoiceGroup
                                label="Timeline"
                                options={timelines}
                                value={form.timeline}
                                onChange={(v) => set("timeline", v)}
                                error={errors.timeline}
                              />
                            </div>
                          )}

                          {step === 1 && (
                            <div className="flex flex-col gap-5">
                              <Field label="Name" error={errors.name}>
                                <Input
                                  value={form.name}
                                  onChange={(e) => set("name", e.target.value)}
                                  placeholder="Jane Doe"
                                  invalid={!!errors.name}
                                  autoComplete="name"
                                />
                              </Field>
                              <Field label="Email" error={errors.email}>
                                <Input
                                  type="email"
                                  value={form.email}
                                  onChange={(e) => set("email", e.target.value)}
                                  placeholder="jane@company.com"
                                  invalid={!!errors.email}
                                  autoComplete="email"
                                />
                              </Field>
                              <Field label="Company" optional>
                                <Input
                                  value={form.company}
                                  onChange={(e) => set("company", e.target.value)}
                                  placeholder="Acme Inc."
                                  autoComplete="organization"
                                />
                              </Field>
                            </div>
                          )}

                          {step === 2 && (
                            <div className="flex flex-col gap-5">
                              <Field label="Project details" error={errors.details}>
                                <Textarea
                                  value={form.details}
                                  onChange={(e) => set("details", e.target.value)}
                                  placeholder="What are you building, who is it for, and what does success look like?"
                                  className="min-h-40"
                                  invalid={!!errors.details}
                                />
                              </Field>
                              <div className="rounded-xl border border-border bg-secondary/30 p-4 font-mono text-xs text-muted-foreground">
                                <span className="text-primary">{form.projectType || "—"}</span> ·{" "}
                                {form.budget || "—"} · {form.timeline || "—"}
                              </div>
                              {status === "error" && (
                                <p className="flex items-center gap-2 text-sm text-destructive">
                                  <AlertCircle className="size-4" />
                                  Something went wrong. Please try again or email me directly.
                                </p>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* nav */}
                    <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        disabled={step === 0}
                        className={cn(step === 0 && "invisible")}
                      >
                        <ArrowLeft />
                        Back
                      </Button>
                      {step < steps.length - 1 ? (
                        <Button type="button" onClick={goNext} className="group">
                          Continue
                          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={submit}
                          loading={status === "submitting"}
                          className="group"
                        >
                          {status === "submitting" ? "Sending…" : "Send inquiry"}
                          {status !== "submitting" && <Send className="size-4" />}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label,
  children,
  error,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="flex items-center justify-between">
        <span>{label}</span>
        {optional && (
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            optional
          </span>
        )}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-xs text-destructive"
          >
            <AlertCircle className="size-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label className="flex items-center justify-between">
        <span>{label}</span>
        {error && (
          <span className="flex items-center gap-1 text-xs font-normal text-destructive">
            <AlertCircle className="size-3.5" />
            {error}
          </span>
        )}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={selected}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                selected
                  ? "border-primary bg-[color-mix(in_oklab,var(--signal)_14%,transparent)] text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessState({ name }: { name: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
        className="relative grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 var(--signal)", animation: "var(--animate-pulse-ring)" }}
        />
        <motion.span
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Check className="size-9" strokeWidth={3} />
        </motion.span>
      </motion.div>
      <h3 className="mt-6 font-display text-2xl font-bold">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""}! 🎉
      </h3>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Your inquiry is in. I&apos;ll review the details and get back to you within 1–2 business
        days with honest, specific thoughts on your project.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[color-mix(in_oklab,var(--signal)_10%,transparent)] px-4 py-2 font-mono text-xs text-primary">
        <Sparkles className="size-3.5" />
        Inquiry received
      </div>
    </motion.div>
  );
}
