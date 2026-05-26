"use client";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/features/dashboard/stat-card";
import { VelocityChart } from "@/features/dashboard/velocity-chart";
import { RecentApplications } from "@/features/dashboard/recent-applications";
import { AIInsights } from "@/features/dashboard/ai-insights";
import { FunnelStrip } from "@/features/dashboard/funnel";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/skeleton";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { useResumes } from "@/hooks/use-resumes";
import { useRecruiters } from "@/hooks/use-recruiters";
import { useFollowUps, useCompleteFollowUp } from "@/hooks/use-follow-ups";

function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`;
}
function fmtDays(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(1)}d`;
}

export default function DashboardPage() {
  const overview = useAnalyticsOverview("30d");
  const resumesQ = useResumes();
  const recruitersQ = useRecruiters({ limit: 5 });
  const followUpsQ = useFollowUps("upcoming");
  const completeFollowUp = useCompleteFollowUp();

  const v = overview.data;

  const topResumes = (resumesQ.data ?? [])
    .slice()
    .sort((a, b) => b.callbackRate - a.callbackRate)
    .slice(0, 3);

  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of your job search" />
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.isLoading || !v ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </>
          ) : (
            <>
              <StatCard
                label="Applications"
                value={String(v.applications.value)}
                delta={fmtPct(v.applications.delta)}
                trend={v.applications.delta >= 0 ? "up" : "down"}
                hint="Last 30 days"
              />
              <StatCard
                label="Callback rate"
                value={`${v.callbackRate.value}%`}
                delta={fmtPct(v.callbackRate.delta)}
                trend={v.callbackRate.delta >= 0 ? "up" : "down"}
                hint="Last 30 days"
              />
              <StatCard
                label="Interview conversion"
                value={`${v.interviewConversion.value}%`}
                delta={fmtPct(v.interviewConversion.delta)}
                trend={v.interviewConversion.delta >= 0 ? "up" : "down"}
                hint="From callback"
              />
              <StatCard
                label="Avg. response time"
                value={`${v.avgResponseDays.value}d`}
                delta={fmtDays(v.avgResponseDays.delta)}
                trend={v.avgResponseDays.delta <= 0 ? "up" : "down"}
                hint={v.avgResponseDays.delta <= 0 ? "Faster" : "Slower"}
              />
            </>
          )}
        </div>

        <AIInsights />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Application velocity</h2>
                <p className="text-xs text-muted-foreground">Applications vs. callbacks, last 8 weeks</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-foreground" /> Applications
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-muted-foreground" /> Callbacks
                </span>
              </div>
            </div>
            <VelocityChart />
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Application funnel</h2>
              <p className="text-xs text-muted-foreground">Conversion at each stage</p>
            </div>
            <FunnelStrip />
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Recent applications</h2>
              <Link href="/applications" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                Board <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <RecentApplications />
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Resume performance</h2>
              <Link href="/resume" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                View <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {resumesQ.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : topResumes.length === 0 ? (
              <div className="text-sm text-muted-foreground py-6 text-center">
                No resumes uploaded.
              </div>
            ) : (
              <div className="space-y-4">
                {topResumes.map((r) => (
                  <div key={r.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate">
                        {r.name}{" "}
                        <span className="text-muted-foreground font-normal">· {r.version}</span>
                      </span>
                      <span className="tabular-nums">{r.callbackRate}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-foreground" style={{ width: `${r.callbackRate * 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Recruiter activity</h2>
              <Link href="/recruiters" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                CRM <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {recruitersQ.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (recruitersQ.data ?? []).length === 0 ? (
              <div className="text-sm text-muted-foreground py-6 text-center">
                No recruiters yet.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {(recruitersQ.data ?? []).slice(0, 5).map((r) => (
                  <div key={r.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                    <Avatar name={r.name} size={32} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{r.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {r.title} · {r.company}
                      </div>
                    </div>
                    <Badge variant="outline">{r.stage}</Badge>
                    <div className="text-xs text-muted-foreground hidden md:block tabular-nums">
                      {relativeTime(r.lastContactAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold tracking-tight mb-4">Follow-ups</h2>
            {followUpsQ.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (followUpsQ.data ?? []).length === 0 ? (
              <div className="text-sm text-muted-foreground py-6 text-center">
                All caught up.
              </div>
            ) : (
              <div className="space-y-3">
                {(followUpsQ.data ?? []).slice(0, 4).map((f) => (
                  <label key={f.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={!!f.completedAt}
                      onChange={() => completeFollowUp.mutate(f.id)}
                      className="mt-1 h-3.5 w-3.5 rounded border-border accent-foreground"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-snug group-hover:text-foreground">
                        {f.action}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {f.company} · {relativeTime(f.dueAt)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
