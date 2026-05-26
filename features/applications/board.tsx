"use client";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, MapPin, Plus } from "lucide-react";
import { relativeTime, cn } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";
import {
  useApplicationsBoard,
  useUpdateApplicationStatus,
} from "@/hooks/use-applications";
import type { ApplicationBoard } from "@/lib/api-types";
import { STATUS_TO_API } from "@/lib/api-types";

type LaneKey = keyof ApplicationBoard;

const columns: { id: LaneKey; label: string; accent: string }[] = [
  { id: "applied", label: "Applied", accent: "bg-muted-foreground/60" },
  { id: "oa", label: "Online Assessment", accent: "bg-warning" },
  { id: "interview", label: "Interview", accent: "bg-foreground" },
  { id: "offer", label: "Offer", accent: "bg-success" },
  { id: "rejected", label: "Rejected", accent: "bg-destructive/70" },
];

export function Board() {
  const { data, isLoading } = useApplicationsBoard();
  const updateStatus = useUpdateApplicationStatus();

  const onDragEnd = (r: DropResult) => {
    if (!r.destination) return;
    const lane = r.destination.droppableId as LaneKey;
    const apiStatus = STATUS_TO_API[lane];
    if (!apiStatus) return;
    updateStatus.mutate({ id: r.draggableId, status: apiStatus });
  };

  if (isLoading || !data) {
    return (
      <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-4 scrollbar-none">
        {columns.map((c) => (
          <div key={c.id} className="min-w-[280px] space-y-2">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-4 scrollbar-none">
        {columns.map((c) => {
          const lane = data[c.id] ?? [];
          return (
            <div key={c.id} className="flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", c.accent)} />
                  <h3 className="text-sm font-medium">{c.label}</h3>
                  <span className="text-xs text-muted-foreground tabular-nums">{lane.length}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Droppable droppableId={c.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 rounded-lg p-2 space-y-2 min-h-[300px] transition-colors",
                      snapshot.isDraggingOver ? "bg-secondary/70" : "bg-secondary/30"
                    )}
                  >
                    {lane.map((a, idx) => (
                      <Draggable key={a.id} draggableId={a.id} index={idx}>
                        {(p, snap) => (
                          <div
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            className={cn(
                              "rounded-lg border border-border bg-card p-3 shadow-sm transition-all",
                              snap.isDragging && "shadow-lg ring-1 ring-foreground/20 rotate-[0.5deg]"
                            )}
                          >
                            <div className="flex items-start gap-2.5">
                              <Avatar name={a.company} size={28} />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium leading-snug truncate">
                                  {a.role}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {a.company}
                                </div>
                              </div>
                              <button className="text-muted-foreground hover:text-foreground -mr-1">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <MapPin className="h-3 w-3" /> {a.location}
                            </div>
                            {a.tags?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {a.tags.map((t) => (
                                  <Badge key={t} variant="outline" className="text-[10px]">
                                    {t}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="mt-2.5 pt-2.5 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                              <span>{a.resumeVersion ?? a.resumeName ?? "—"}</span>
                              <span>{relativeTime(a.appliedDate)}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
