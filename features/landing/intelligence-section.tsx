const points = [
  { k: "Conversion forecasting", v: "Predict offer probability from your pipeline shape." },
  { k: "Channel attribution", v: "Know whether referrals or cold apps actually win." },
  { k: "Role-domain fit", v: "Surface the roles where you historically convert best." },
  { k: "Time-to-offer", v: "Track cycle health and spot stalls before they become losses." },
];

export function IntelligenceSection() {
  return (
    <section id="intelligence" className="border-b border-border py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Career intelligence</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Decisions backed by your own data.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every action you take is a data point. CareerOS turns hundreds of small signals into
              clear next moves.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {points.map((p) => (
              <div key={p.k} className="bg-card p-6">
                <div className="text-sm font-medium">{p.k}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
