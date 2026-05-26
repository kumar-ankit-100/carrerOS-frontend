"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type { ApiResume } from "@/lib/api-types";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: () => apiGet<ApiResume[]>("/resumes"),
  });
}

export function useResume(id: string | undefined) {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: () => apiGet<ApiResume>(`/resumes/${id}`),
    enabled: !!id,
  });
}

export function useResumePerformance(id: string | undefined, weeks = 6) {
  return useQuery({
    queryKey: ["resume", id, "performance", weeks],
    queryFn: () =>
      apiGet<Array<Record<string, number | string>>>(
        `/resumes/${id}/performance?weeks=${weeks}`
      ),
    enabled: !!id,
  });
}

export function useCreateResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ApiResume>) => apiPost<ApiResume>("/resumes", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resumes"] }),
  });
}

export function useUpdateResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & Partial<ApiResume>) =>
      apiPatch<ApiResume>(`/resumes/${id}`, body),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["resumes"] });
      qc.invalidateQueries({ queryKey: ["resume", v.id] });
    },
  });
}

export function useDeleteResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/resumes/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resumes"] }),
  });
}

export function useSetPrimaryResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<ApiResume>(`/resumes/${id}/set-primary`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resumes"] }),
  });
}
