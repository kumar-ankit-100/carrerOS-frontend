"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";
import type { AuthResult, PublicUser } from "@/lib/api-types";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export function useCurrentUser(enabled = true) {
  const setUser = useAuthStore((s) => s.setUser);
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const u = await apiGet<PublicUser>("/auth/me");
      setUser(u);
      return u;
    },
    enabled,
    staleTime: 5 * 60_000,
  });
}

export function useSignIn() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();
  return useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      apiPost<AuthResult>("/auth/sign-in", body),
    onSuccess: (res) => {
      setSession(res.user, res.accessToken, res.refreshToken);
      router.push(res.user.onboardedAt ? "/dashboard" : "/onboarding");
    },
  });
}

export function useSignUp() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();
  return useMutation({
    mutationFn: (body: { fullName: string; email: string; password: string }) =>
      apiPost<AuthResult>("/auth/sign-up", body),
    onSuccess: (res) => {
      setSession(res.user, res.accessToken, res.refreshToken);
      router.push("/onboarding");
    },
  });
}

export function useGoogleSignIn() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();
  return useMutation({
    mutationFn: (body: { idToken: string }) =>
      apiPost<AuthResult>("/auth/google", body),
    onSuccess: (res) => {
      setSession(res.user, res.accessToken, res.refreshToken);
      router.push(res.user.onboardedAt ? "/dashboard" : "/onboarding");
    },
  });
}

export function useSignOut() {
  const clear = useAuthStore((s) => s.clear);
  const router = useRouter();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await apiPost("/auth/sign-out");
      } catch {
        // ignore — clear local session regardless
      }
    },
    onSuccess: () => {
      clear();
      qc.clear();
      router.push("/sign-in");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (body: { email: string }) =>
      apiPost("/auth/forgot-password", body),
  });
}
