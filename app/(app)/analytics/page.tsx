"use client";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/features/dashboard/stat-card";
import {
  FunnelChart,
  TrendsChart,
  DomainChart,
  CompanyChart,
} from "@/features/analytics/charts";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/skeleton";

function fmt(n: number) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export default function AnalyticsPage() {
  const { data: v, isLoading } = useAnalyticsOverview("30d");
  return (
    <>
      <Topbar title="Analytics" subtitle="Funnel, trends, and conversion rates" />
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading || !v ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          ) : (
            <>
              <StatCard
                label="Funnel volume"
                value={String(v.applications.value)}
                delta={fmt(v.applications.delta)}
                trend={v.applications.delta >= 0 ? "up" : "down"}
                hint="Applications"
              />
              <StatCard
                label="Callback rate"
                value={`${v.callbackRate.value}%`}
                delta={fmt(v.callbackRate.delta)}
                trend={v.callbackRate.delta >= 0 ? "up" : "down"}
              />
              <StatCard
                label="Interview → Offer"
                value={`${v.interviewConversion.value}%`}
                delta={fmt(v.interviewConversion.delta)}
                trend={v.interviewConversion.delta >= 0 ? "up" : "down"}
              />
              <StatCard
                label="Avg. cycle"
                value={`${v.avgResponseDays.value}d`}
                delta={`${v.avgResponseDays.delta >= 0 ? "+" : ""}${v.avgResponseDays.delta}d`}
                trend={v.avgResponseDays.delta <= 0 ? "up" : "down"}
                hint="Apply to offer"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Response funnel</h2>
              <p className="text-xs text-muted-foreground">Where candidates progress and drop</p>
            </div>
            <FunnelChart />
          </section>
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Application trends</h2>
              <p className="text-xs text-muted-foreground">Volume per week</p>
            </div>
            <TrendsChart />
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Best performing domains</h2>
              <p className="text-xs text-muted-foreground">Callback rate by role family</p>
            </div>
            <DomainChart />
          </section>
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight">Company conversion</h2>
              <p className="text-xs text-muted-foreground">Applied vs. interview by company</p>
            </div>
            <CompanyChart />
          </section>
        </div>
      </div>
    </>
  );
}
