export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-4 w-4 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
        Loading…
      </div>
    </div>
  );
}
