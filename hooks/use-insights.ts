"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";
import type { ApiInsight } from "@/lib/api-types";

export function useInsights(params: { label?: string; limit?: number } = {}) {
  const sp = new URLSearchParams();
  if (params.label) sp.set("label", params.label);
  if (params.limit) sp.set("limit", String(params.limit));
  const q = sp.toString();
  return useQuery({
    queryKey: ["insights", params],
    queryFn: () => apiGet<ApiInsight[]>(`/insights${q ? `?${q}` : ""}`),
  });
}

export function useApplyInsight() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<ApiInsight>(`/insights/${id}/apply`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["insights"] }),
  });
}

export function useDismissInsight() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<ApiInsight>(`/insights/${id}/dismiss`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["insights"] }),
  });
}
