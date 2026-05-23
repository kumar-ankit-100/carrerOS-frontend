import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/features/dashboard/stat-card";
import {
  FunnelChart,
  TrendsChart,
  DomainChart,
  CompanyChart,
} from "@/features/analytics/charts";

export default function AnalyticsPage() {
  return (
    <>
      <Topbar title="Analytics" subtitle="Funnel, trends, and conversion rates" />
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Funnel volume" value="142" delta="+12%" hint="Applications" />
          <StatCard label="Screen → Interview" value="46%" delta="+5%" />
          <StatCard label="Interview → Offer" value="18%" delta="−2%" trend="down" />
          <StatCard label="Avg. cycle" value="21d" delta="−3d" hint="Apply to offer" />
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
