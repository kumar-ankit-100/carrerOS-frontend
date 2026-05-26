"use client";
import { useFunnel } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/skeleton";

export function FunnelStrip() {
  const { data, isLoading } = useFunnel();
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }
  const stages = data ?? [];
  const max = stages[0]?.count ?? 1;
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => {
        const pct = (s.count / max) * 100;
        const prev = i === 0 ? null : stages[i - 1].count;
        const conv = prev ? Math.round((s.count / prev) * 100) : null;
        return (
          <div key={s.stage}>
            <div className="flex items-baseline justify-between text-xs mb-1">
              <span className="font-medium">{s.stage}</span>
              <span className="text-muted-foreground tabular-nums">
                <span className="text-foreground font-medium">{s.count}</span>
                {conv !== null && <span className="ml-2">{conv}%</span>}
              </span>
            </div>
            <div className="h-2 w-full rounded-sm bg-secondary overflow-hidden">
              <div className="h-full bg-foreground/85 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
