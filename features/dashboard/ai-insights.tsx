"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { insights } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AIInsights() {
  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 stroke-[1.75]" />
          <h2 className="text-sm font-semibold tracking-tight">Career intelligence</h2>
          <span className="text-[11px] text-muted-foreground">Updated 12 min ago</span>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {insights.slice(0, 2).map((i, idx) => (
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
                  i.impact === "high" ? "bg-foreground" : "bg-muted-foreground"
                )}
              />
              <span className="text-[10px] text-muted-foreground">
                {i.impact === "high" ? "High impact" : "Medium impact"}
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                {i.confidence}% conf.
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug">{i.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{i.body}</p>
            <div className="mt-4 flex items-center gap-2">
              <button className="text-xs font-medium underline-offset-4 hover:underline">
                Apply suggestion
              </button>
              <span className="text-muted-foreground">·</span>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                Dismiss
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
