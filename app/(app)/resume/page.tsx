"use client";
import { Topbar } from "@/components/layout/topbar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ResumePerformanceChart } from "@/features/resume/performance-chart";
import { Sparkles, Download, MoreHorizontal, TrendingUp } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";
import { useResumes } from "@/hooks/use-resumes";
import { useInsights } from "@/hooks/use-insights";

export default function ResumePage() {
  const { data: resumes, isLoading } = useResumes();
  const { data: insights } = useInsights({ label: "Resume", limit: 1 });
  const primary = (resumes ?? []).find((r) => r.isPrimary) ?? resumes?.[0];
  const topInsight = insights?.[0];

  return (
    <>
      <Topbar title="Resume intelligence" subtitle="Track ATS score, callback rate, and per-role performance" />
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
        {topInsight && (
          <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Insight</div>
              <p className="text-sm text-muted-foreground mt-0.5">{topInsight.body}</p>
            </div>
            <Button variant="outline" size="sm">Apply suggestion</Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 rounded-xl border border-border bg-card p-5">
            {isLoading || !primary ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    {primary.isPrimary && <Badge variant="outline" className="mb-2">Primary</Badge>}
                    <h2 className="text-base font-semibold">{primary.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {primary.version} · Updated {formatDate(primary.lastUpdated)}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">ATS score</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tabular-nums">{primary.atsScore}</span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                    <Progress value={primary.atsScore} className="mt-2" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Callback rate</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tabular-nums">{primary.callbackRate}%</span>
                      <span className="text-xs text-success inline-flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" />
                      </span>
                    </div>
                    <Progress value={primary.callbackRate * 2} className="mt-2" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Applications</div>
                    <div className="mt-1 text-2xl font-semibold tabular-nums">{primary.applicationsSent}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Interviews</div>
                    <div className="mt-1 text-2xl font-semibold tabular-nums">{primary.interviews}</div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                  <Button size="sm" className="flex-1">Open editor</Button>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Performance over time</h2>
                <p className="text-xs text-muted-foreground">Callbacks attributed by resume version</p>
              </div>
              <div className="text-xs text-muted-foreground">Last 6 weeks</div>
            </div>
            <ResumePerformanceChart />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">All resume versions</h2>
              <p className="text-xs text-muted-foreground">
                {resumes?.length ?? 0} versions tracked
              </p>
            </div>
            <Button size="sm" variant="outline">New version</Button>
          </div>
          {isLoading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="font-medium px-5 py-2.5">Resume</th>
                  <th className="font-medium px-5 py-2.5">Domain</th>
                  <th className="font-medium px-5 py-2.5 tabular-nums">ATS</th>
                  <th className="font-medium px-5 py-2.5 tabular-nums">Callback</th>
                  <th className="font-medium px-5 py-2.5 tabular-nums">Apps</th>
                  <th className="font-medium px-5 py-2.5 tabular-nums">Interviews</th>
                  <th className="font-medium px-5 py-2.5">Updated</th>
                </tr>
              </thead>
              <tbody>
                {(resumes ?? []).map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.version}</span>
                        {r.isPrimary && <Badge variant="outline" className="ml-1">Primary</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{r.domain}</td>
                    <td className="px-5 py-3 text-sm tabular-nums">
                      <span className={cn(r.atsScore >= 90 && "text-success", r.atsScore < 80 && "text-warning")}>
                        {r.atsScore}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm tabular-nums">{r.callbackRate}%</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-muted-foreground">{r.applicationsSent}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-muted-foreground">{r.interviews}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{formatDate(r.lastUpdated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
