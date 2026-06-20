import { Container } from "@/components/shared/section";
import { CardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function WorkLoading() {
  return (
    <div className="pt-32 sm:pt-40">
      <Container>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-14 w-2/3 max-w-2xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <div className="mt-12 grid gap-6 pb-24 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
