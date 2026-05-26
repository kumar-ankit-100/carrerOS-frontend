import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Applications", value: "142", delta: "+12.4%", up: true },
  { label: "Callback rate", value: "34%", delta: "+4.2%", up: true },
  { label: "Interviews", value: "22", delta: "+18%", up: true },
  { label: "Avg. response", value: "3.4d", delta: "−0.6d", up: true },
];

export function HeroPreview() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-2xl shadow-black/20 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <div className="mx-auto text-xs text-muted-foreground font-mono">interviewwala.com/dashboard</div>
      </div>
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-3 hidden md:flex flex-col border-r border-border p-4 gap-1.5">
          <div className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase pb-1">
            Workspace
          </div>
          {["Dashboard", "Applications", "Resume", "Analytics", "Recruiters"].map((n, i) => (
            <div
              key={n}
              className={`text-sm rounded-md px-2 py-1.5 ${
                i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              {n}
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-9 p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border p-3.5">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="mt-1.5 text-xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-1 flex items-center text-[11px] text-success gap-0.5">
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.delta}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">Application velocity</div>
              <div className="text-xs text-muted-foreground">Last 8 weeks</div>
            </div>
            <div className="h-32 flex items-end gap-1.5">
              {[40, 52, 60, 48, 70, 64, 82, 76].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5">
                  <div className="bg-foreground/80 rounded-sm" style={{ height: `${v}%` }} />
                  <div className="bg-foreground/20 rounded-sm" style={{ height: `${v * 0.35}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
