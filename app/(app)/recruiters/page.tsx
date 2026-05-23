"use client";
import { Topbar } from "@/components/layout/topbar";
import { recruiters } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Calendar, MessageCircle } from "lucide-react";
import { formatDate, relativeTime, cn } from "@/lib/utils";
import { useState } from "react";

const stages = ["Outreach", "Replied", "Screen", "Referred", "Closed"] as const;

const stageVariant = {
  Outreach: "muted",
  Replied: "default",
  Screen: "warning",
  Referred: "success",
  Closed: "outline",
} as const;

export default function RecruitersPage() {
  const [selected, setSelected] = useState(recruiters[0].id);
  const current = recruiters.find((r) => r.id === selected)!;
  const counts = stages.reduce<Record<string, number>>(
    (acc, s) => ((acc[s] = recruiters.filter((r) => r.stage === s).length), acc),
    {}
  );

  return (
    <>
      <Topbar title="Recruiters" subtitle="Track conversations, follow-ups, and referrals" />
      <div className="p-6 lg:p-8 max-w-[1500px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border rounded-xl overflow-hidden border border-border mb-6">
          {stages.map((s) => (
            <div key={s} className="bg-card p-4">
              <div className="text-xs text-muted-foreground">{s}</div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{counts[s] ?? 0}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <section className="lg:col-span-5 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border p-3 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search recruiters" className="pl-8 h-8 text-sm" />
              </div>
              <Button size="sm" variant="outline">Add</Button>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {recruiters.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
                    selected === r.id ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                >
                  <Avatar name={r.name} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {relativeTime(r.lastContact)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">
                        {r.title} · {r.company}
                      </span>
                      <Badge variant={stageVariant[r.stage] as any}>{r.stage}</Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="lg:col-span-7 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-5 py-4 flex items-center gap-4">
              <Avatar name={current.name} size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">{current.name}</h2>
                  <Badge variant={stageVariant[current.stage] as any}>{current.stage}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {current.title} · {current.company}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="h-3.5 w-3.5" /> Email
                </Button>
                <Button size="sm">
                  <Calendar className="h-3.5 w-3.5" /> Schedule
                </Button>
              </div>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4 border-b border-border">
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm mt-0.5">{current.email}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Last contact</div>
                <div className="text-sm mt-0.5">{formatDate(current.lastContact)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Source</div>
                <div className="text-sm mt-0.5">LinkedIn outreach</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Roles discussed</div>
                <div className="text-sm mt-0.5">Senior Engineer · Staff</div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5" /> Conversation
              </h3>
              <div className="space-y-4">
                {[
                  { who: current.name, msg: "Hey Ankit — great background. Are you open to a quick screen this week?", ago: "3d" },
                  { who: "You", msg: "Thanks for reaching out. Tuesday or Thursday afternoon works.", ago: "3d" },
                  { who: current.name, msg: "Booked Thursday at 2pm PT. Sending the calendar invite now.", ago: "2d" },
                ].map((m, i) => (
                  <div key={i} className={cn("max-w-[78%]", m.who === "You" && "ml-auto")}>
                    <div className="text-[11px] text-muted-foreground mb-1">
                      {m.who} · {m.ago} ago
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                        m.who === "You" ? "bg-foreground text-background" : "bg-secondary"
                      )}
                    >
                      {m.msg}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <Input placeholder="Add a note or send a message…" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
