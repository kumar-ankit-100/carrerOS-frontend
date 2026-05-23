import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Sign in to CareerOS</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Welcome back. Enter your details below.
      </p>

      <form className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password</label>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot?
            </Link>
          </div>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard">Sign in</Link>
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">Continue with Google</Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to CareerOS?{" "}
        <Link href="/sign-up" className="text-foreground font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
