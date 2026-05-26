"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  Chrome,
  FileUp,
  Briefcase,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCompleteOnboardingStep,
  useFinishOnboarding,
  useOnboardingStatus,
} from "@/hooks/use-onboarding";

type StepKey = "extension" | "resume" | "application" | "gmail";

const steps: { key: StepKey; icon: typeof Chrome; title: string; desc: string }[] = [
  {
    key: "extension",
    icon: Chrome,
    title: "Install the browser extension",
    desc: "Capture every application from LinkedIn, Greenhouse, Lever, and Ashby — automatically.",
  },
  {
    key: "resume",
    icon: FileUp,
    title: "Upload your first resume",
    desc: "We'll track ATS score, callback rate, and attribute every interview to the right version.",
  },
  {
    key: "application",
    icon: Briefcase,
    title: "Track your first application",
    desc: "Add a role you've applied to. We'll pre-fill the rest as your pipeline grows.",
  },
  {
    key: "gmail",
    icon: Mail,
    title: "Connect Gmail",
    desc: "Detect recruiter outreach, parse replies, and surface follow-up moments before they go cold.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const status = useOnboardingStatus();
  const completeStep = useCompleteOnboardingStep();
  const finish = useFinishOnboarding();

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status.data) setStep(Math.min(status.data.step, steps.length - 1));
  }, [status.data]);

  const completed = status.data?.completed ?? {
    extension: false,
    resume: false,
    application: false,
    gmail: false,
  };
  const current = steps[step];

  const markDone = () => {
    completeStep.mutate(current.key, {
      onSuccess: () => {
        if (step < steps.length - 1) setStep(step + 1);
      },
    });
  };

  const onFinish = () => {
    finish.mutate(undefined, {
      onSuccess: () => router.push("/dashboard"),
    });
  };

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
          Step {step + 1} of {steps.length}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Let's set up InterviewWala
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A 2-minute setup so your data starts flowing on day one.
        </p>
      </div>

      <div className="flex items-center gap-1.5 mb-8">
        {steps.map((s, i) => (
          <div
            key={s.key}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-foreground" : "bg-secondary"
            )}
          />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-8"
          >
            <div className="h-10 w-10 grid place-items-center rounded-lg bg-secondary">
              <current.icon className="h-4 w-4 stroke-[1.75]" />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">{current.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-md">
              {current.desc}
            </p>

            {current.key === "extension" && (
              <div className="mt-6 rounded-md border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Chrome className="h-4 w-4" />
                  <div>
                    <div className="text-sm font-medium">InterviewWala for Chrome</div>
                    <div className="text-xs text-muted-foreground">Also available for Arc & Edge</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Open Chrome Store</Button>
              </div>
            )}

            {current.key === "resume" && (
              <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center">
                <FileUp className="h-5 w-5 mx-auto text-muted-foreground" />
                <div className="mt-3 text-sm font-medium">Drop your resume here</div>
                <div className="text-xs text-muted-foreground mt-0.5">PDF, DOCX up to 10MB</div>
                <Button size="sm" variant="outline" className="mt-4">Choose file</Button>
              </div>
            )}

            {current.key === "application" && (
              <div className="mt-6 grid gap-3">
                <Input placeholder="Company (e.g. Stripe)" />
                <Input placeholder="Role (e.g. Senior Backend Engineer)" />
                <Input placeholder="Source — LinkedIn, Referral, …" />
              </div>
            )}

            {current.key === "gmail" && (
              <div className="mt-6 rounded-md border border-border p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Connect Google account</div>
                  <div className="text-xs text-muted-foreground">
                    Read-only. We never send email on your behalf without confirmation.
                  </div>
                </div>
                <Button size="sm">Connect Gmail</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-border bg-background/50 px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Skip</Link>
            </Button>
            {step === steps.length - 1 ? (
              <Button size="sm" onClick={onFinish} disabled={finish.isPending}>
                Finish <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button size="sm" onClick={markDone} disabled={completeStep.isPending}>
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <ul className="mt-6 space-y-1.5">
        {steps.map((s, i) => (
          <li
            key={s.key}
            className={cn(
              "flex items-center gap-2 text-xs",
              i === step ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full border grid place-items-center",
                completed[s.key]
                  ? "bg-foreground border-foreground"
                  : i === step
                  ? "border-foreground"
                  : "border-border"
              )}
            >
              {completed[s.key] && <Check className="h-2.5 w-2.5 text-background" />}
            </span>
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
