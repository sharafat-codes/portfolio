import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-28 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/** mono eyebrow with a real section index, e.g. 02 / TRUST */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 12px var(--signal-glow)" }}
        aria-hidden
      />
      {index && <span className="text-primary">{index}</span>}
      {index && <span className="text-border">/</span>}
      <span>{children}</span>
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.85rem]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
