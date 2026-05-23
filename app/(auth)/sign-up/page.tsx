import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Start optimizing your job search in under 2 minutes.
      </p>

      <form className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Full name</label>
          <Input placeholder="Jane Doe" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Work email</label>
          <Input type="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" placeholder="At least 8 characters" />
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard">Create account</Link>
        </Button>

        <p className="text-[11px] text-muted-foreground text-center">
          By creating an account you agree to our{" "}
          <Link href="#" className="underline">Terms</Link> and{" "}
          <Link href="#" className="underline">Privacy</Link>.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-foreground font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
