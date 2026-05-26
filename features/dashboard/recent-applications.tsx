"use client";
import { useRecentApplications } from "@/hooks/use-applications";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { relativeTime } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";
import { STATUS_FROM_API } from "@/lib/api-types";

const statusMap = {
  applied: { label: "Applied", variant: "muted" as const },
  oa: { label: "OA", variant: "warning" as const },
  interview: { label: "Interview", variant: "default" as const },
  rejected: { label: "Rejected", variant: "danger" as const },
  offer: { label: "Offer", variant: "success" as const },
};

export function RecentApplications() {
  const { data, isLoading } = useRecentApplications(7);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className="text-sm text-muted-foreground py-6 text-center">
        No applications yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {data.map((a) => {
        const status = STATUS_FROM_API[a.status] as keyof typeof statusMap;
        const meta = statusMap[status];
        return (
          <div key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <Avatar name={a.company} size={32} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{a.role}</span>
                <Badge variant={meta.variant}>{meta.label}</Badge>
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {a.company} · {a.source} · {a.resumeVersion ?? "—"}
              </div>
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">
              {relativeTime(a.appliedDate)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
