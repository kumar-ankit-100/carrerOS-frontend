"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatch } from "@/lib/api";
import type { PublicUser, UserPreferences } from "@/lib/api-types";
import { useAuthStore } from "@/store/auth-store";

export function useUpdateProfile() {
  const qc = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: (body: Partial<PublicUser>) =>
      apiPatch<PublicUser>("/users/me", body),
    onSuccess: (u) => {
      setUser(u);
      qc.setQueryData(["user", "me"], u);
    },
  });
}

export function useUpdatePreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UserPreferences>) =>
      apiPatch<UserPreferences>("/users/me/preferences", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user", "me"] }),
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (body: { currentPassword: string; newPassword: string }) =>
      apiPatch("/users/me/password", body),
  });
}
