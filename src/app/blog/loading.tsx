import { Container } from "@/components/shared/section";
import { CardSkeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="pt-32 sm:pt-40">
      <Container>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-12 w-2/3 max-w-xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-lg" />
        <div className="mt-12 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
        <div className="mt-10 grid gap-5 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
