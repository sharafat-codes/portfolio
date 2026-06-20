import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-secondary/60",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-foreground/[0.07] after:to-transparent after:content-['']",
        "after:animate-[shimmer-slide_1.8s_infinite]",
        className,
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="mt-5 h-5 w-2/3" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
