"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setUnauthorizedHandler } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

function AuthBridge() {
  const router = useRouter();
  const clear = useAuthStore((s) => s.clear);
  React.useEffect(() => {
    setUnauthorizedHandler(() => {
      clear();
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (!path.startsWith("/sign-in") && !path.startsWith("/sign-up") && path !== "/") {
          router.push("/sign-in");
        }
      }
    });
    return () => setUnauthorizedHandler(null);
  }, [router, clear]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
        },
      })
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={qc}>
        <AuthBridge />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
