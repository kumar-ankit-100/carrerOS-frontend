import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <div className="h-14 border-b border-border" />
      <div className="p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <Skeleton className="h-72 rounded-xl lg:col-span-2" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </>
  );
}
