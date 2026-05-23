import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-12 md:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Run your job search like a product.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join 12,000 candidates running disciplined, data-driven job searches.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Start free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
