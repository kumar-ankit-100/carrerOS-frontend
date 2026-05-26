"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";
import type { OnboardingStatus } from "@/lib/api-types";

export function useOnboardingStatus() {
  return useQuery({
    queryKey: ["onboarding", "status"],
    queryFn: () => apiGet<OnboardingStatus>("/onboarding/status"),
  });
}

export function useCompleteOnboardingStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (key: "extension" | "resume" | "application" | "gmail") =>
      apiPost<OnboardingStatus>(`/onboarding/steps/${key}/complete`),
    onSuccess: (data) => qc.setQueryData(["onboarding", "status"], data),
  });
}

export function useFinishOnboarding() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<OnboardingStatus>("/onboarding/finish"),
    onSuccess: (data) => {
      qc.setQueryData(["onboarding", "status"], data);
      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
