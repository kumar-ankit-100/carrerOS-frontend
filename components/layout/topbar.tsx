"use client";
import { Search, Bell, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <header className="h-14 sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur px-6">
      <div className="min-w-0">
        <h1 className="text-sm font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center h-8 w-72 rounded-md border border-input bg-card px-2.5 text-sm text-muted-foreground">
          <Search className="h-3.5 w-3.5 mr-2" />
          <span className="flex-1">Search</span>
          <kbd className="ml-2 hidden lg:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          New application
        </Button>
      </div>
    </header>
  );
}
