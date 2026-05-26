"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPost } from "@/lib/api";
import type { ApiIntegration } from "@/lib/api-types";

export function useIntegrations() {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: () => apiGet<ApiIntegration[]>("/integrations"),
  });
}

export function useConnectIntegration() {
  return useMutation({
    mutationFn: (provider: string) =>
      apiPost<{ url: string }>(`/integrations/${provider}/connect`),
    onSuccess: (res) => {
      if (typeof window !== "undefined" && res?.url) window.location.href = res.url;
    },
  });
}

export function useDisconnectIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (provider: string) => apiDelete(`/integrations/${provider}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  });
}
