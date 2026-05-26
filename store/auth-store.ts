"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PublicUser } from "@/lib/api-types";
import { setTokens } from "@/lib/api";

interface AuthState {
  user: PublicUser | null;
  hydrated: boolean;
  setSession: (user: PublicUser, accessToken: string, refreshToken: string) => void;
  setUser: (user: PublicUser | null) => void;
  clear: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setSession: (user, accessToken, refreshToken) => {
        setTokens(accessToken, refreshToken);
        set({ user });
      },
      setUser: (user) => set({ user }),
      clear: () => {
        setTokens(null, null);
        set({ user: null });
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "iw_auth_user",
      partialize: (s) => ({ user: s.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
