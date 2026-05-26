"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type {
  ApiApplication,
  ApiApplicationStatus,
  ApplicationBoard,
} from "@/lib/api-types";

export interface ApplicationFilters {
  status?: ApiApplicationStatus;
  source?: string;
  resumeId?: string;
  search?: string;
  cursor?: string;
  limit?: number;
}

function qs(params: Record<string, unknown>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function useApplications(filters: ApplicationFilters = {}) {
  return useQuery({
    queryKey: ["applications", filters],
    queryFn: () => apiGet<ApiApplication[]>(`/applications${qs(filters)}`),
  });
}

export function useApplication(id: string | undefined) {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => apiGet<ApiApplication>(`/applications/${id}`),
    enabled: !!id,
  });
}

export function useApplicationsBoard() {
  return useQuery({
    queryKey: ["applications", "board"],
    queryFn: () => apiGet<ApplicationBoard>("/applications/board"),
  });
}

export function useRecentApplications(limit = 7) {
  return useQuery({
    queryKey: ["applications", "recent", limit],
    queryFn: () =>
      apiGet<ApiApplication[]>(`/applications/recent?limit=${limit}`),
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ApiApplication>) =>
      apiPost<ApiApplication>("/applications", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useUpdateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & Partial<ApiApplication>) =>
      apiPatch<ApiApplication>(`/applications/${id}`, body),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      qc.invalidateQueries({ queryKey: ["application", vars.id] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApiApplicationStatus }) =>
      apiPatch<ApiApplication>(`/applications/${id}/status`, { status }),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["applications", "board"] });
      const prev = qc.getQueryData<ApplicationBoard>(["applications", "board"]);
      if (prev) {
        const next: ApplicationBoard = {
          applied: [...prev.applied],
          oa: [...prev.oa],
          interview: [...prev.interview],
          offer: [...prev.offer],
          rejected: [...prev.rejected],
        };
        const lanes: (keyof ApplicationBoard)[] = [
          "applied",
          "oa",
          "interview",
          "offer",
          "rejected",
        ];
        let moved: ApiApplication | undefined;
        lanes.forEach((lane) => {
          const idx = next[lane].findIndex((a) => a.id === id);
          if (idx >= 0) {
            moved = { ...next[lane][idx], status };
            next[lane].splice(idx, 1);
          }
        });
        const dest = status.toLowerCase() as keyof ApplicationBoard;
        if (moved) next[dest].unshift(moved);
        qc.setQueryData(["applications", "board"], next);
      }
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["applications", "board"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useDeleteApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/applications/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });
}
