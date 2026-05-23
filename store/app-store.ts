"use client";
import { create } from "zustand";
import { applications as seedApps } from "@/lib/mock-data";
import type { Application, ApplicationStatus } from "@/types";

interface AppState {
  applications: Application[];
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  moveApplication: (id: string, status: ApplicationStatus) => void;
  addApplication: (a: Application) => void;
}

export const useAppStore = create<AppState>((set) => ({
  applications: seedApps,
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  moveApplication: (id, status) =>
    set((s) => ({
      applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  addApplication: (a) => set((s) => ({ applications: [a, ...s.applications] })),
}));
