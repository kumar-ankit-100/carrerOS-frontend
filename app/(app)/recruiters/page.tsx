"use client";
import { Topbar } from "@/components/layout/topbar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Calendar, MessageCircle } from "lucide-react";
import { formatDate, relativeTime, cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "@/components/skeleton";
import {
  useRecruiter,
  useRecruiterConversations,
  useRecruiters,
  usePipelineCounts,
  useSendConversation,
} from "@/hooks/use-recruiters";
import type { ApiRecruiterStage } from "@/lib/api-types";

const stages = ["OUTREACH", "REPLIED", "SCREEN", "REFERRED", "CLOSED"] as const;

const stageLabel: Record<ApiRecruiterStage, string> = {
  OUTREACH: "Outreach",
  REPLIED: "Replied",
  SCREEN: "Screen",
  REFERRED: "Referred",
  CLOSED: "Closed",
};

const stageVariant: Record<ApiRecruiterStage, "muted" | "default" | "warning" | "success" | "outline"> = {
  OUTREACH: "muted",
  REPLIED: "default",
  SCREEN: "warning",
  REFERRED: "success",
  CLOSED: "outline",
};

export default function RecruitersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const recruitersQ = useRecruiters({ search });
  const counts = usePipelineCounts();
  const list = recruitersQ.data ?? [];
  const activeId = selected ?? list[0]?.id;
  const currentQ = useRecruiter(activeId);
  const conversationsQ = useRecruiterConversations(activeId);
  const send = useSendConversation(activeId);

  const current = currentQ.data;

  return (
    <>
      <Topbar title="Recruiters" subtitle="Track conversations, follow-ups, and referrals" />
      <div className="p-6 lg:p-8 max-w-[1500px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border rounded-xl overflow-hidden border border-border mb-6">
          {stages.map((s) => (
            <div key={s} className="bg-card p-4">
              <div className="text-xs text-muted-foreground">{stageLabel[s]}</div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">
                {counts.data
                  ? (counts.data as unknown as Record<string, number>)[s.toLowerCase()] ?? 0
                  : "—"}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <section className="lg:col-span-5 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border p-3 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search recruiters"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
              <Button size="sm" variant="outline">Add</Button>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {recruitersQ.isLoading ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-12" />
                  ))}
                </div>
              ) : list.length === 0 ? (
                <div className="text-sm text-muted-foreground py-10 text-center">
                  No recruiters yet.
                </div>
              ) : (
                list.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
                      activeId === r.id ? "bg-secondary" : "hover:bg-secondary/50"
                    )}
                  >
                    <Avatar name={r.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{r.name}</span>
                        <span className="text-[11px] text-muted-foreground tabular-nums">
                          {relativeTime(r.lastContactAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-muted-foreground truncate">
                          {r.title} · {r.company}
                        </span>
                        <Badge variant={stageVariant[r.stage]}>{stageLabel[r.stage]}</Badge>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="lg:col-span-7 rounded-xl border border-border bg-card overflow-hidden">
            {!current ? (
              <div className="p-10 text-center text-sm text-muted-foreground">
                Select a recruiter to view conversation.
              </div>
            ) : (
              <>
                <div className="border-b border-border px-5 py-4 flex items-center gap-4">
                  <Avatar name={current.name} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold">{current.name}</h2>
                      <Badge variant={stageVariant[current.stage]}>
                        {stageLabel[current.stage]}
                      </Badge>
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
                    <div className="text-sm mt-0.5">{formatDate(current.lastContactAt)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Source</div>
                    <div className="text-sm mt-0.5">{current.source ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="text-sm mt-0.5">{current.phone ?? "—"}</div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5" /> Conversation
                  </h3>
                  {conversationsQ.isLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-12" />
                      ))}
                    </div>
                  ) : (conversationsQ.data ?? []).length === 0 ? (
                    <div className="text-sm text-muted-foreground py-6 text-center">
                      No messages yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(conversationsQ.data ?? []).map((m) => {
                        const mine = m.direction === "OUTBOUND";
                        return (
                          <div key={m.id} className={cn("max-w-[78%]", mine && "ml-auto")}>
                            <div className="text-[11px] text-muted-foreground mb-1">
                              {mine ? "You" : current.name} · {relativeTime(m.sentAt)}
                            </div>
                            <div
                              className={cn(
                                "rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                                mine ? "bg-foreground text-background" : "bg-secondary"
                              )}
                            >
                              {m.body}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!draft.trim()) return;
                      send.mutate(
                        { direction: "OUTBOUND", channel: "Email", body: draft },
                        { onSuccess: () => setDraft("") }
                      );
                    }}
                    className="mt-5 pt-4 border-t border-border"
                  >
                    <Input
                      placeholder="Add a note or send a message…"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                  </form>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
