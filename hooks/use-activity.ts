"use client";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { ApiActivity } from "@/lib/api-types";

export function useActivity(limit = 20) {
  return useQuery({
    queryKey: ["activity", limit],
    queryFn: () => apiGet<ApiActivity[]>(`/activity?limit=${limit}`),
  });
}
