import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center max-w-md">
        <div className="text-xs font-mono text-muted-foreground">404</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
