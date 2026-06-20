import * as React from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

type Variant = Project["visual"];

function Bar({ w, accent = false, h = 6 }: { w: string; accent?: boolean; h?: number }) {
  return (
    <span
      className={cn("block rounded-full", accent ? "" : "bg-foreground/10")}
      style={{
        width: w,
        height: h,
        background: accent ? "var(--proj-accent)" : undefined,
        opacity: accent ? 0.9 : undefined,
      }}
    />
  );
}

function Panel({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground/10 bg-background/40 p-3 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DashboardUI() {
  return (
    <div className="grid h-full grid-cols-[64px_1fr] gap-3">
      <div className="flex flex-col gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] p-2">
        <span className="h-6 w-6 rounded-md" style={{ background: "var(--proj-accent)" }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1.5 w-full rounded-full bg-foreground/10" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Panel key={i} className="flex flex-col gap-2">
              <Bar w="40%" h={4} />
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--proj-accent)" }}>
                {["98%", "1.2k", "$48k"][i]}
              </span>
            </Panel>
          ))}
        </div>
        <Panel className="flex-1">
          <div className="flex h-full items-end gap-1.5">
            {[40, 65, 50, 80, 60, 92, 70, 100, 84].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: i % 3 === 2 ? "var(--proj-accent)" : "var(--foreground)",
                  opacity: i % 3 === 2 ? 0.9 : 0.12,
                }}
              />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function EcommerceUI() {
  return (
    <div className="grid h-full grid-cols-[1fr_120px] gap-3">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Panel key={i} className="flex flex-col gap-2">
            <span
              className="h-10 w-full rounded-md"
              style={{
                background:
                  i % 2 === 0
                    ? "color-mix(in oklab, var(--proj-accent) 22%, transparent)"
                    : "var(--foreground)",
                opacity: i % 2 === 0 ? 1 : 0.08,
              }}
            />
            <Bar w="80%" h={4} />
            <Bar w="45%" accent h={4} />
          </Panel>
        ))}
      </div>
      <Panel className="flex flex-col gap-2.5">
        <Bar w="60%" h={5} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-foreground/10" />
            <Bar w="70%" h={4} />
          </div>
        ))}
        <span
          className="mt-1 flex h-7 items-center justify-center rounded-md text-[0.6rem] font-semibold"
          style={{ background: "var(--proj-accent)", color: "#04130e" }}
        >
          Checkout
        </span>
      </Panel>
    </div>
  );
}

function MarketplaceUI() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="h-8 flex-1 rounded-full border border-foreground/10 bg-foreground/[0.03]" />
        <span className="h-8 w-8 rounded-full" style={{ background: "var(--proj-accent)" }} />
      </div>
      <div className="grid flex-1 grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Panel key={i} className="flex flex-col gap-1.5">
            <span
              className="h-8 w-full rounded-md"
              style={{
                background:
                  i % 3 === 0
                    ? "color-mix(in oklab, var(--proj-accent) 24%, transparent)"
                    : "var(--foreground)",
                opacity: i % 3 === 0 ? 1 : 0.08,
              }}
            />
            <Bar w="85%" h={3} />
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <Bar w="50%" h={3} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function QuizUI() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
      <div className="flex w-full items-center gap-2">
        <span className="h-1.5 flex-1 rounded-full" style={{ background: "var(--proj-accent)" }} />
        <span className="h-1.5 flex-1 rounded-full" style={{ background: "var(--proj-accent)", opacity: 0.6 }} />
        <span className="h-1.5 flex-1 rounded-full bg-foreground/10" />
        <span className="h-1.5 flex-1 rounded-full bg-foreground/10" />
      </div>
      <Panel className="w-full">
        <Bar w="55%" h={6} />
      </Panel>
      <div className="grid w-full grid-cols-2 gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <Panel
            key={i}
            className="flex items-center gap-2"
            // highlight the selected answer
          >
            <span
              className="h-4 w-4 rounded-full border-2"
              style={{
                borderColor: i === 1 ? "var(--proj-accent)" : "var(--border)",
                background: i === 1 ? "var(--proj-accent)" : "transparent",
              }}
            />
            <Bar w="60%" accent={i === 1} h={4} />
          </Panel>
        ))}
      </div>
    </div>
  );
}

function TailorUI() {
  return (
    <div className="grid h-full grid-cols-[1fr_1fr] gap-3">
      <Panel className="flex flex-col gap-2.5">
        <Bar w="50%" h={5} />
        {["Chest", "Waist", "Sleeve", "Length"].map((m, i) => (
          <div key={m} className="flex items-center justify-between">
            <Bar w="40%" h={4} />
            <span className="font-mono text-[0.6rem]" style={{ color: "var(--proj-accent)" }}>
              {[40, 32, 24, 44][i]}"
            </span>
          </div>
        ))}
      </Panel>
      <div className="flex flex-col gap-2.5">
        {["Intake", "Stitching", "Fitting", "Delivery"].map((s, i) => (
          <Panel key={s} className="flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-full"
              style={{
                background: i <= 1 ? "var(--proj-accent)" : "var(--foreground)",
                opacity: i <= 1 ? 1 : 0.1,
              }}
            />
            <Bar w="65%" accent={i <= 1} h={4} />
          </Panel>
        ))}
      </div>
    </div>
  );
}

const interiors: Record<Variant, React.FC> = {
  dashboard: DashboardUI,
  ecommerce: EcommerceUI,
  marketplace: MarketplaceUI,
  quiz: QuizUI,
  tailor: TailorUI,
};

export function ProjectVisual({
  project,
  className,
}: {
  project: Pick<Project, "visual" | "accent" | "name" | "slug">;
  className?: string;
}) {
  const Interior = interiors[project.visual];
  return (
    <div
      className={cn(
        "group/visual relative overflow-hidden rounded-2xl border border-border bg-card card-elevated",
        className,
      )}
      style={{ ["--proj-accent" as string]: project.accent }}
    >
      {/* ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: project.accent, opacity: 0.18 }}
      />
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="ml-3 flex h-6 flex-1 items-center rounded-md border border-border/60 bg-background/50 px-3 font-mono text-[0.65rem] text-muted-foreground">
          {project.slug}.app
        </span>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider"
          style={{
            color: project.accent,
            background: "color-mix(in oklab, var(--proj-accent) 14%, transparent)",
          }}
        >
          live
        </span>
      </div>
      {/* interior */}
      <div className="relative h-64 p-4 sm:h-72">
        <Interior />
      </div>
    </div>
  );
}
