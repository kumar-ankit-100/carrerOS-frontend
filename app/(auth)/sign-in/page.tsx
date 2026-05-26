"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/use-auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const errMsg =
    (signIn.error as { response?: { data?: { error?: { message?: string } } } } | null)
      ?.response?.data?.error?.message ??
    (signIn.error ? "Invalid email or password." : null);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Sign in to InterviewWala</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Welcome back. Enter your details below.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signIn.mutate({ email, password });
        }}
      >
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errMsg && (
          <div className="text-xs text-destructive">{errMsg}</div>
        )}

        <Button type="submit" className="w-full" disabled={signIn.isPending}>
          {signIn.isPending ? "Signing in…" : "Sign in"}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full">
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to InterviewWala?{" "}
        <Link href="/sign-up" className="text-foreground font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
