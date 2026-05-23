import { LineChart, KanbanSquare, FileText, Users } from "lucide-react";

const features = [
  {
    icon: KanbanSquare,
    title: "Pipeline that thinks with you",
    body: "A keyboard-first board that captures every application, interview, and offer — without busywork.",
  },
  {
    icon: FileText,
    title: "Resume intelligence",
    body: "Score and compare resume versions by callback rate, ATS performance, and domain fit.",
  },
  {
    icon: LineChart,
    title: "Funnel analytics",
    body: "See where your pipeline leaks. Find your strongest channels and the roles you actually convert in.",
  },
  {
    icon: Users,
    title: "Recruiter CRM",
    body: "Track conversations, schedule follow-ups, and surface referral opportunities before they go cold.",
  },
];

export function ProductShowcase() {
  return (
    <section id="product" className="border-b border-border py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Product</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            The operating system for your job search.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            CareerOS replaces the patchwork of spreadsheets, notes, and trackers with a single
            workspace built for serious candidates.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-card p-8">
                <Icon className="h-5 w-5 stroke-[1.75]" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
