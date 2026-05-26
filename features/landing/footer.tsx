import { Logo } from "@/components/layout/logo";

const cols = [
  { title: "Product", links: ["Dashboard", "Applications", "Resume", "Analytics", "Recruiters"] },
  { title: "Company", links: ["About", "Careers", "Customers", "Blog"] },
  { title: "Resources", links: ["Docs", "Changelog", "Status", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border py-14">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Career intelligence for serious job seekers.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {c.title}
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l} className="text-foreground/80 hover:text-foreground transition">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 InterviewWala, Inc.</span>
          <span>SOC 2 Type II · GDPR ready</span>
        </div>
      </div>
    </footer>
  );
}
