"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { getAccessToken } from "@/lib/api";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return;
    if (!user && !getAccessToken()) {
      router.replace("/sign-in");
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="h-4 w-4 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
      </div>
    );
  }
  if (!user && !getAccessToken()) return null;
  return <>{children}</>;
}
