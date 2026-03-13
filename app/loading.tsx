import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-20">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-3/4 sm:h-12" />
            <Skeleton className="mx-auto h-6 w-full max-w-xl" />
            <div className="flex justify-center gap-2 pt-4">
              <Skeleton className="h-12 w-48 sm:w-64" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar skeleton */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-5 w-32" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <Skeleton className="aspect-video w-full" />
              <div className="flex flex-1 flex-col p-4 space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="mt-2 h-6 w-24" />
                <Skeleton className="mt-4 h-9 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
