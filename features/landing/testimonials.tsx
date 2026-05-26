import { Avatar } from "@/components/ui/avatar";

const items = [
  {
    q: "I went from 8% callback rate to 31% in three weeks. InterviewWala told me exactly which resume bullets were dead weight.",
    name: "Maya Patel",
    role: "Senior Engineer, ex-Square",
  },
  {
    q: "Replaced my Notion tracker, my spreadsheet, and my reminder app in one afternoon. The funnel view alone was worth it.",
    name: "Daniel Liu",
    role: "Platform Eng, Series-B startup",
  },
  {
    q: "The recruiter CRM caught a follow-up I would have missed. That follow-up became my offer.",
    name: "Sofia Hernandez",
    role: "Product Engineer",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Testimonials</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Used by candidates landing offers at the bar.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} size={32} />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
