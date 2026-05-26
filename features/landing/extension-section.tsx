import { Chrome } from "lucide-react";

export function ExtensionSection() {
  return (
    <section id="extension" className="border-b border-border py-20 md:py-28">
      <div className="container">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Chrome className="h-3.5 w-3.5" />
                Browser extension
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                Capture every application, automatically.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The InterviewWala extension watches your applications across LinkedIn, Greenhouse,
                Lever, Ashby, and Workday. No copy-paste. No spreadsheets.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground" />
                  Detects which resume version you submitted
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground" />
                  Parses job title, salary band, and source
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground" />
                  Auto-creates pipeline entries with one click
                </li>
              </ul>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-border bg-background relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-[0.3]" />
              <div className="relative p-10 md:p-14">
                <div className="rounded-lg border border-border bg-card shadow-xl shadow-black/20 overflow-hidden">
                  <div className="border-b border-border px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    Application captured · greenhouse.io
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold">Senior Software Engineer</div>
                    <div className="text-xs text-muted-foreground">Stripe · San Francisco</div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded border border-border p-2">
                        <div className="text-muted-foreground">Resume</div>
                        <div className="font-medium">Backend v3</div>
                      </div>
                      <div className="rounded border border-border p-2">
                        <div className="text-muted-foreground">Salary</div>
                        <div className="font-medium">$210k–$260k</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 rounded-md bg-foreground text-background text-xs font-medium py-1.5">
                        Add to pipeline
                      </button>
                      <button className="rounded-md border border-border text-xs px-3 py-1.5">
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
