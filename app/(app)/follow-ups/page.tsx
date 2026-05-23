"use client";
import { Topbar } from "@/components/layout/topbar";
import { followUps } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = ["All", "Overdue", "Today", "This week"] as const;

const priorityVariant = {
  high: "danger",
  medium: "warning",
  low: "muted",
} as const;

export default function FollowUpsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [done, setDone] = useState<Record<string, boolean>>({});

  const filtered = followUps.filter((f) => {
    if (tab === "Overdue") return f.overdue;
    if (tab === "Today") return f.due === "today";
    if (tab === "This week") return !f.overdue;
    return true;
  });

  const overdueCount = followUps.filter((f) => f.overdue).length;
  const todayCount = followUps.filter((f) => f.due === "today").length;
  const pending = followUps.length - Object.values(done).filter(Boolean).length;

  return (
    <>
      <Topbar title="Follow-ups" subtitle="The things that actually move your pipeline forward" />
      <div className="p-6 lg:p-8 max-w-[1200px] space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          <Kpi label="Pending" value={pending} />
          <Kpi label="Overdue" value={overdueCount} accent="danger" />
          <Kpi label="Due today" value={todayCount} accent="warning" />
          <Kpi label="Completed (7d)" value={11} accent="success" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="inline-flex rounded-md border border-border bg-background p-0.5">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-3 py-1 rounded-[5px] text-xs transition-colors",
                    tab === t ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline">
              <Mail className="h-3.5 w-3.5" /> Compose
            </Button>
          </div>

          <ul className="divide-y divide-border">
            {filtered.map((f) => {
              const isDone = !!done[f.id];
              return (
                <li
                  key={f.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/40",
                    isDone && "opacity-50"
                  )}
                >
                  <button
                    onClick={() => setDone((s) => ({ ...s, [f.id]: !s[f.id] }))}
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
                      {f.recruiter !== "—" && <span>· {f.recruiter}</span>}
                      <span>· {f.channel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={priorityVariant[f.priority] as any}>{f.priority}</Badge>
                    <div className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                      {f.overdue ? (
                        <AlertCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      <span className={cn(f.overdue && "text-destructive")}>{f.due}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-dashed border-border p-5 flex items-start gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-secondary shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Suggested follow-up</div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              You haven't heard from <span className="text-foreground font-medium">Datadog</span> in 14 days.
              Candidates who re-engaged at this point received responses 36% of the time.
            </p>
          </div>
          <Button size="sm">Draft email</Button>
        </div>
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
  value: number;
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
