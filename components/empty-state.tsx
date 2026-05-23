import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void };
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-dashed border-border p-10 text-center", className)}>
      <div className="mx-auto h-10 w-10 rounded-lg bg-secondary grid place-items-center mb-4">
        <div className="h-4 w-4 rounded-sm border border-foreground/40" />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {action && (
        <Button size="sm" className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
