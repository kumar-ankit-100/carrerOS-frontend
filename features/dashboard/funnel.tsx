import { funnel } from "@/lib/mock-data";

export function FunnelStrip() {
  const max = funnel[0].count;
  return (
    <div className="space-y-2.5">
      {funnel.map((s, i) => {
        const pct = (s.count / max) * 100;
        const prev = i === 0 ? null : funnel[i - 1].count;
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
              <div
                className="h-full bg-foreground/85 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
