import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#product", label: "Product" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "#extension", label: "Extension" },
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
