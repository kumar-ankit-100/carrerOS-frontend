"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useInsights, useApplyInsight, useDismissInsight } from "@/hooks/use-insights";
import { Skeleton } from "@/components/skeleton";
import { cn } from "@/lib/utils";

export function AIInsights() {
  const { data, isLoading } = useInsights({ limit: 2 });
  const apply = useApplyInsight();
  const dismiss = useDismissInsight();

  if (isLoading) {
    return (
      <section className="rounded-xl border border-border bg-card p-5">
        <Skeleton className="h-24 w-full" />
      </section>
    );
  }

  const items = data ?? [];
  if (!items.length) return null;

  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 stroke-[1.75]" />
          <h2 className="text-sm font-semibold tracking-tight">Career intelligence</h2>
          <span className="text-[11px] text-muted-foreground">
            Updated {new Date(items[0]?.generatedAt ?? Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {items.map((i, idx) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-5"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {i.label}
              </span>
              <span
                className={cn(
                  "h-1 w-1 rounded-full",
                  i.impact === "HIGH" ? "bg-foreground" : "bg-muted-foreground"
                )}
              />
              <span className="text-[10px] text-muted-foreground">
                {i.impact === "HIGH"
                  ? "High impact"
                  : i.impact === "MEDIUM"
                  ? "Medium impact"
                  : "Low impact"}
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                {i.confidence}% conf.
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug">{i.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{i.body}</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => apply.mutate(i.id)}
                className="text-xs font-medium underline-offset-4 hover:underline disabled:opacity-50"
                disabled={apply.isPending}
              >
                Apply suggestion
              </button>
              <span className="text-muted-foreground">·</span>
              <button
                onClick={() => dismiss.mutate(i.id)}
                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
                disabled={dismiss.isPending}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
