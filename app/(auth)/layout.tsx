import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col p-8">
        <Logo />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 InterviewWala</span>
          <div className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative border-l border-border bg-card overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative m-auto p-12 max-w-md">
          <blockquote className="text-2xl font-medium tracking-tight leading-snug">
            "InterviewWala turned my job search from chaos into a disciplined operating loop. I landed
            three offers in five weeks."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center text-xs font-semibold">
              MP
            </div>
            <div>
              <div className="text-sm font-medium">Maya Patel</div>
              <div className="text-xs text-muted-foreground">Senior Engineer · ex-Square</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
