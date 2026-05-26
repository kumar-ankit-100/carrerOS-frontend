"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type {
  ApiFollowUp,
  FollowUpSuggestion,
  FollowUpSummary,
} from "@/lib/api-types";

export type FollowUpFilter = "all" | "overdue" | "today" | "week" | "upcoming";

export function useFollowUps(filter: FollowUpFilter = "all") {
  return useQuery({
    queryKey: ["follow-ups", filter],
    queryFn: () => apiGet<ApiFollowUp[]>(`/follow-ups?filter=${filter}`),
  });
}

export function useFollowUpsSummary() {
  return useQuery({
    queryKey: ["follow-ups", "summary"],
    queryFn: () => apiGet<FollowUpSummary>("/follow-ups/summary"),
  });
}

export function useFollowUpSuggestions() {
  return useQuery({
    queryKey: ["follow-ups", "suggestions"],
    queryFn: () => apiGet<FollowUpSuggestion[]>("/follow-ups/suggestions"),
  });
}

export function useCompleteFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPatch<ApiFollowUp>(`/follow-ups/${id}/complete`),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["follow-ups"] });
      const snapshots: Array<[unknown, ApiFollowUp[] | undefined]> = [];
      qc.getQueriesData<ApiFollowUp[]>({ queryKey: ["follow-ups"] }).forEach(
        ([key, list]) => {
          if (!Array.isArray(list)) return;
          snapshots.push([key, list]);
          qc.setQueryData(
            key,
            list.map((f) =>
              f.id === id ? { ...f, completedAt: new Date().toISOString() } : f
            )
          );
        }
      );
      return { snapshots };
    },
    onError: (_e, _v, ctx) => {
      ctx?.snapshots.forEach(([key, list]) => qc.setQueryData(key as never, list));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["follow-ups"] }),
  });
}

export function useCreateFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ApiFollowUp>) =>
      apiPost<ApiFollowUp>("/follow-ups", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["follow-ups"] }),
  });
}

export function useDeleteFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/follow-ups/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["follow-ups"] }),
  });
}

export function useDraftEmail() {
  return useMutation({
    mutationFn: (suggestionId: string) =>
      apiPost<{ subject: string; body: string }>(
        `/follow-ups/${suggestionId}/draft-email`
      ),
  });
}
