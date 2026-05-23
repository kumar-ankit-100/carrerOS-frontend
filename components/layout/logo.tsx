import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid h-6 w-6 place-items-center rounded-md bg-foreground text-background text-[11px] font-bold tracking-tight">
        C
      </span>
      <span className="text-[15px] font-semibold tracking-tight">CareerOS</span>
    </Link>
  );
}
