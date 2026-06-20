export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
      <div className="relative grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/20" />
        <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <span className="font-display text-xl font-bold">SA</span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-signal-2 animate-[shimmer-slide_1.2s_infinite]" />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Loading…
        </span>
      </div>
    </div>
  );
}
