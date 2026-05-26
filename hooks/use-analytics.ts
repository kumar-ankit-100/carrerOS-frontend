"use client";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type {
  CompanyConversion,
  DomainPoint,
  FunnelStage,
  OverviewResponse,
  ResumePerformanceSeries,
  VelocityPoint,
} from "@/lib/api-types";

export type Range = "7d" | "30d" | "90d" | "all";

export function useAnalyticsOverview(range: Range = "30d") {
  return useQuery({
    queryKey: ["analytics", "overview", range],
    queryFn: () => apiGet<OverviewResponse>(`/analytics/overview?range=${range}`),
  });
}

export function useFunnel(range: Range = "30d") {
  return useQuery({
    queryKey: ["analytics", "funnel", range],
    queryFn: () => apiGet<FunnelStage[]>(`/analytics/funnel?range=${range}`),
  });
}

export function useVelocity(weeks = 8) {
  return useQuery({
    queryKey: ["analytics", "velocity", weeks],
    queryFn: () =>
      apiGet<VelocityPoint[]>(`/analytics/velocity?weeks=${weeks}`),
  });
}

export function useDomainPerformance(range: Range = "30d") {
  return useQuery({
    queryKey: ["analytics", "domain", range],
    queryFn: () =>
      apiGet<DomainPoint[]>(`/analytics/domain-performance?range=${range}`),
  });
}

export function useCompanyConversion(range: Range = "30d") {
  return useQuery({
    queryKey: ["analytics", "company", range],
    queryFn: () =>
      apiGet<CompanyConversion[]>(
        `/analytics/company-conversion?range=${range}`
      ),
  });
}

export function useResumePerformanceSeries(weeks = 6) {
  return useQuery({
    queryKey: ["analytics", "resume-performance", weeks],
    queryFn: () =>
      apiGet<ResumePerformanceSeries>(
        `/analytics/resume-performance?weeks=${weeks}`
      ),
  });
}
