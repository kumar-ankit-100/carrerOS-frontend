"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  FileText,
  BarChart3,
  Users,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Avatar } from "@/components/ui/avatar";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: KanbanSquare },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/recruiters", label: "Recruiters", icon: Users },
  { href: "/follow-ups", label: "Follow-ups", icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex h-screen w-60 shrink-0 flex-col border-r border-border bg-card/40 sticky top-0">
      <div className="h-14 flex items-center px-5 border-b border-border">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="px-2 pb-2 text-[11px] font-medium text-muted-foreground tracking-wider uppercase">
          Workspace
        </div>
        {nav.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Icon className="h-4 w-4 stroke-[1.75]" />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-6 px-2 pb-2 text-[11px] font-medium text-muted-foreground tracking-wider uppercase">
          Tools
        </div>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
            pathname?.startsWith("/settings")
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          <Settings className="h-4 w-4 stroke-[1.75]" />
          Settings
        </Link>
      </nav>

      <div className="border-t border-border p-3 flex items-center gap-2.5">
        <Avatar name="Ankit Sharma" size={28} />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">Ankit Sharma</div>
          <div className="text-xs text-muted-foreground truncate">ankit@interviewwala.com</div>
        </div>
      </div>
    </aside>
  );
}
