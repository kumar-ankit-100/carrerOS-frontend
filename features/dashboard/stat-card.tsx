import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
        {delta && (
          <div
            className={cn(
              "flex items-center text-xs gap-0.5",
              trend === "up" ? "text-success" : "text-destructive"
            )}
          >
            {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </div>
        )}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
