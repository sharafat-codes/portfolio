import Link from "next/link";
import { Home, Briefcase, ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute left-1/2 top-1/3 h-72 w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--signal) 18%, transparent), transparent 70%)",
          }}
        />
      </div>
      <Container className="flex flex-col items-center text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Error 404
        </span>
        <h1 className="mt-4 font-display text-[5rem] font-bold leading-none tracking-tighter text-gradient sm:text-[9rem]">
          404
        </h1>
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
          This route returned a 404.
        </h2>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          to something that does.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button>
              <Home className="size-4" />
              Back home
            </Button>
          </Link>
          <Link href="/work">
            <Button variant="outline">
              <Briefcase className="size-4" />
              View work
            </Button>
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card/50 px-4 py-3 font-mono text-xs text-muted-foreground">
          <span className="text-destructive">$</span> curl -I /this-page
          <span className="ml-3 text-destructive">→ 404 Not Found</span>
        </div>
      </Container>
    </section>
  );
}
