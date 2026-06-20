import { techMarquee } from "@/lib/data/skills";

export function TechMarquee() {
  const row = [...techMarquee, ...techMarquee];
  return (
    <div className="border-y border-border bg-card/30 py-7">
      <div className="mx-auto mb-5 max-w-7xl px-5 sm:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          The stack behind production software
        </p>
      </div>
      <div className="group relative flex overflow-hidden mask-fade-x">
        <div className="flex shrink-0 items-center gap-3 pr-3 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
