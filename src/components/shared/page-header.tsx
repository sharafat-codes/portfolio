import { Container } from "./section";
import { Reveal } from "./reveal";
import { Eyebrow } from "./section";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--signal) 18%, transparent), transparent 70%)",
          }}
        />
      </div>
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
