import { Logo } from "@/components/layout/logo";
import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b border-border flex items-center justify-between px-6">
        <Logo />
        <Link
          href="/dashboard"
          className="text-xs text-muted-foreground hover:text-foreground transition"
        >
          Skip for now
        </Link>
      </header>
      <main className="flex-1 grid place-items-center px-6 py-12">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
