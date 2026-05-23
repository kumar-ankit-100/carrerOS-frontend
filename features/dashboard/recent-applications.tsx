"use client";
import { applications } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { relativeTime } from "@/lib/utils";

const statusMap = {
  applied: { label: "Applied", variant: "muted" as const },
  oa: { label: "OA", variant: "warning" as const },
  interview: { label: "Interview", variant: "default" as const },
  rejected: { label: "Rejected", variant: "danger" as const },
  offer: { label: "Offer", variant: "success" as const },
};

export function RecentApplications() {
  const items = applications.slice(0, 7);
  return (
    <div className="divide-y divide-border">
      {items.map((a) => (
        <div key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          <Avatar name={a.company} size={32} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">{a.role}</span>
              <Badge variant={statusMap[a.status].variant}>{statusMap[a.status].label}</Badge>
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {a.company} · {a.source} · {a.resumeVersion}
            </div>
          </div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {relativeTime(a.appliedDate)}
          </div>
        </div>
      ))}
    </div>
  );
}
