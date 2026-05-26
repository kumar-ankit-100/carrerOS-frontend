"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/use-auth";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = useSignUp();
  const errMsg =
    (signUp.error as { response?: { data?: { error?: { message?: string } } } } | null)
      ?.response?.data?.error?.message ??
    (signUp.error ? "Could not create account. Try again." : null);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Start optimizing your job search in under 2 minutes.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signUp.mutate({ fullName, email, password });
        }}
      >
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="name">Full name</label>
          <Input
            id="name"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">Work email</label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        {errMsg && <div className="text-xs text-destructive">{errMsg}</div>}

        <Button type="submit" className="w-full" disabled={signUp.isPending}>
          {signUp.isPending ? "Creating account…" : "Create account"}
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
