import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/features/dashboard/stat-card";
import { VelocityChart } from "@/features/dashboard/velocity-chart";
import { RecentApplications } from "@/features/dashboard/recent-applications";
import { AIInsights } from "@/features/dashboard/ai-insights";
import { FunnelStrip } from "@/features/dashboard/funnel";
import { recruiters, resumes } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of your job search" />
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Applications" value="142" delta="+12.4%" hint="Last 30 days" />
          <StatCard label="Callback rate" value="34%" delta="+4.2%" hint="Last 30 days" />
          <StatCard label="Interview conversion" value="22%" delta="+1.8%" hint="From callback" />
          <StatCard label="Avg. response time" value="3.4d" delta="−0.6d" hint="Faster" />
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
            <div className="space-y-4">
              {resumes.slice(0, 3).map((r) => (
                <div key={r.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate">
                      {r.name} <span className="text-muted-foreground font-normal">· {r.version}</span>
                    </span>
                    <span className="tabular-nums">{r.callbackRate}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-foreground" style={{ width: `${r.callbackRate * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
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
            <div className="divide-y divide-border">
              {recruiters.slice(0, 5).map((r) => (
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
                    {relativeTime(r.lastContact)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold tracking-tight mb-4">Follow-ups</h2>
            <div className="space-y-3">
              {[
                { c: "Stripe", t: "Reply to Sarah's screen confirmation", d: "Today" },
                { c: "Linear", t: "Send thank-you after Michael's call", d: "Tomorrow" },
                { c: "Vercel", t: "Nudge Daniel on referral status", d: "Fri" },
                { c: "Anthropic", t: "Send portfolio link to Priya", d: "Next week" },
              ].map((f, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 h-3.5 w-3.5 rounded border-border accent-foreground"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm leading-snug group-hover:text-foreground">
                      {f.t}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{f.c} · {f.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
