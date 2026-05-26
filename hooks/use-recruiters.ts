"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type {
  ApiConversation,
  ApiRecruiter,
  ApiRecruiterStage,
  PipelineCounts,
} from "@/lib/api-types";

export interface RecruiterFilters {
  stage?: ApiRecruiterStage;
  search?: string;
  cursor?: string;
  limit?: number;
}

function qs(p: Record<string, unknown>) {
  const sp = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  });
  return sp.toString() ? `?${sp.toString()}` : "";
}

export function useRecruiters(filters: RecruiterFilters = {}) {
  return useQuery({
    queryKey: ["recruiters", filters],
    queryFn: () => apiGet<ApiRecruiter[]>(`/recruiters${qs(filters)}`),
  });
}

export function useRecruiter(id: string | undefined) {
  return useQuery({
    queryKey: ["recruiter", id],
    queryFn: () => apiGet<ApiRecruiter>(`/recruiters/${id}`),
    enabled: !!id,
  });
}

export function usePipelineCounts() {
  return useQuery({
    queryKey: ["recruiters", "pipeline-counts"],
    queryFn: () => apiGet<PipelineCounts>("/recruiters/pipeline-counts"),
  });
}

export function useRecruiterConversations(id: string | undefined) {
  return useQuery({
    queryKey: ["recruiter", id, "conversations"],
    queryFn: () =>
      apiGet<ApiConversation[]>(`/recruiters/${id}/conversations`),
    enabled: !!id,
  });
}

export function useSendConversation(recruiterId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { direction: "INBOUND" | "OUTBOUND"; channel: string; body: string }) =>
      apiPost<ApiConversation>(`/recruiters/${recruiterId}/conversations`, body),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["recruiter", recruiterId, "conversations"],
      });
    },
  });
}

export function useUpdateRecruiterStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: ApiRecruiterStage }) =>
      apiPatch<ApiRecruiter>(`/recruiters/${id}/stage`, { stage }),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["recruiters"] });
      qc.invalidateQueries({ queryKey: ["recruiter", v.id] });
      qc.invalidateQueries({ queryKey: ["recruiters", "pipeline-counts"] });
    },
  });
}

export function useCreateRecruiter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ApiRecruiter>) =>
      apiPost<ApiRecruiter>("/recruiters", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recruiters"] }),
  });
}

export function useDeleteRecruiter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/recruiters/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recruiters"] }),
  });
}
