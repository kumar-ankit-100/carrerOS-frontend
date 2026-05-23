"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
