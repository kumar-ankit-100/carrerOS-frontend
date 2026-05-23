import { Badge } from "@/components/ui/badge";

const rows = [
  { name: "Backend v3", score: 92, callback: 38, primary: true },
  { name: "Fullstack v2", score: 88, callback: 31 },
  { name: "Frontend v4", score: 86, callback: 24 },
  { name: "Backend v2", score: 79, callback: 18 },
];

export function ResumeSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Resume analytics</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Know which resume actually converts.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            CareerOS attributes every callback to the exact resume version you sent. Stop guessing
            which bullet works — measure it.
          </p>
          <div className="mt-6 rounded-md border border-border bg-card p-4 text-sm">
            <p className="font-medium">Insight</p>
            <p className="mt-1 text-muted-foreground">
              <span className="text-foreground">Resume V3</span> performs <span className="text-success">42% better</span> for backend roles than V2.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="text-sm font-medium">Resume performance</div>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </div>
          <div className="divide-y divide-border">
            {rows.map((r) => (
              <div key={r.name} className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.name}</span>
                    {r.primary && <Badge variant="outline">Primary</Badge>}
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${r.callback * 2}%` }}
                    />
                  </div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-sm font-semibold">{r.callback}%</div>
                  <div className="text-[11px] text-muted-foreground">ATS {r.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
