"use client";
import { Topbar } from "@/components/layout/topbar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, Mail } from "lucide-react";
import { cn, relativeTime } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "@/components/skeleton";
import {
  useCompleteFollowUp,
  useFollowUps,
  useFollowUpsSummary,
  useFollowUpSuggestions,
  useDraftEmail,
  type FollowUpFilter,
} from "@/hooks/use-follow-ups";
import type { ApiPriority } from "@/lib/api-types";

const tabs: { key: FollowUpFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue" },
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
];

const priorityVariant: Record<ApiPriority, "danger" | "warning" | "muted"> = {
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "muted",
};

export default function FollowUpsPage() {
  const [tab, setTab] = useState<FollowUpFilter>("all");
  const summary = useFollowUpsSummary();
  const list = useFollowUps(tab);
  const suggestions = useFollowUpSuggestions();
  const complete = useCompleteFollowUp();
  const draftEmail = useDraftEmail();

  return (
    <>
      <Topbar title="Follow-ups" subtitle="The things that actually move your pipeline forward" />
      <div className="p-6 lg:p-8 max-w-[1200px] space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          <Kpi label="Pending" value={summary.data?.pending ?? "—"} />
          <Kpi label="Overdue" value={summary.data?.overdue ?? "—"} accent="danger" />
          <Kpi label="Due today" value={summary.data?.today ?? "—"} accent="warning" />
          <Kpi label="Completed (7d)" value={summary.data?.completedLast7d ?? "—"} accent="success" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="inline-flex rounded-md border border-border bg-background p-0.5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "px-3 py-1 rounded-[5px] text-xs transition-colors",
                    tab === t.key ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline">
              <Mail className="h-3.5 w-3.5" /> Compose
            </Button>
          </div>

          {list.isLoading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : (list.data ?? []).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Nothing here. You're all caught up.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {(list.data ?? []).map((f) => {
                const isDone = !!f.completedAt;
                return (
                  <li
                    key={f.id}
                    className={cn(
                      "flex items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/40",
                      isDone && "opacity-50"
                    )}
                  >
                    <button
                      onClick={() => complete.mutate(f.id)}
                      className={cn(
                        "mt-0.5 h-5 w-5 rounded-md border border-border grid place-items-center shrink-0 transition-colors",
                        isDone && "bg-foreground border-foreground"
                      )}
                      aria-label="Mark complete"
                    >
                      {isDone && <Check className="h-3 w-3 text-background" />}
                    </button>
                    <Avatar name={f.company} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-sm font-medium leading-snug", isDone && "line-through")}>
                        {f.action}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{f.company}</span>
                        {f.recruiterName && <span>· {f.recruiterName}</span>}
                        <span>· {f.channel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={priorityVariant[f.priority]}>{f.priority.toLowerCase()}</Badge>
                      <div className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                        {f.overdue ? (
                          <AlertCircle className="h-3 w-3 text-destructive" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span className={cn(f.overdue && "text-destructive")}>
                          {relativeTime(f.dueAt)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {(suggestions.data ?? []).map((s) => (
          <div key={s.id} className="rounded-xl border border-dashed border-border p-5 flex items-start gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-secondary shrink-0">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Suggested follow-up</div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                <span className="text-foreground font-medium">{s.company}</span> — {s.reason}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => draftEmail.mutate(s.id)}
              disabled={draftEmail.isPending}
            >
              Draft email
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: "danger" | "warning" | "success";
}) {
  return (
    <div className="bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 text-2xl font-semibold tabular-nums",
          accent === "danger" && "text-destructive",
          accent === "warning" && "text-warning",
          accent === "success" && "text-success"
        )}
      >
        {value}
      </div>
    </div>
  );
}
