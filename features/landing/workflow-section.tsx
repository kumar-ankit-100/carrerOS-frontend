const steps = [
  { n: "01", t: "Capture", b: "Apply anywhere — CareerOS catches it." },
  { n: "02", t: "Track", b: "Pipeline auto-updates as you progress." },
  { n: "03", t: "Optimize", b: "Use insights to fix what's not converting." },
  { n: "04", t: "Close", b: "Move from offer to signed faster." },
];

export function WorkflowSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Workflow</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Built around the loop that actually wins offers.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {steps.map((s) => (
            <div key={s.n} className="bg-card p-6">
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <div className="mt-3 text-base font-semibold tracking-tight">{s.t}</div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
