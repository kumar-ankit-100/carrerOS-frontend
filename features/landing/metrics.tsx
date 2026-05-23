const logos = ["Stripe", "Linear", "Notion", "Ramp", "Vercel", "Figma", "Anthropic"];

export function Metrics() {
  return (
    <section className="border-b border-border py-14">
      <div className="container">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by engineers and operators from
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
          {logos.map((l) => (
            <span key={l} className="text-lg font-semibold tracking-tight text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {[
            { v: "180k+", l: "Applications tracked" },
            { v: "34%", l: "Avg. callback lift" },
            { v: "2.1×", l: "Faster offer cycles" },
            { v: "12k", l: "Active users" },
          ].map((s) => (
            <div key={s.l} className="bg-card p-6 text-center">
              <div className="text-3xl font-semibold tracking-tight">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
