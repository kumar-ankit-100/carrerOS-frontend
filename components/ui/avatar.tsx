import { cn } from "@/lib/utils";

export function Avatar({
  name,
  className,
  size = 32,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const inits = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-medium select-none",
        className
      )}
    >
      {inits}
    </div>
  );
}
