import { Topbar } from "@/components/layout/topbar";
import { Board } from "@/features/applications/board";
import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, List } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <>
      <Topbar title="Applications" subtitle="Drag cards across stages to update status" />
      <div className="p-6 lg:p-8 max-w-[1800px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md border border-border bg-card p-0.5">
              <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] text-xs bg-secondary text-foreground">
                <LayoutGrid className="h-3 w-3" /> Board
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] text-xs text-muted-foreground hover:text-foreground">
                <List className="h-3 w-3" /> List
              </button>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">12 active · 4 archived</div>
        </div>
        <Board />
      </div>
    </>
  );
}
