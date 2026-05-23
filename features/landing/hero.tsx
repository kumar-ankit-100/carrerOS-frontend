"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPreview } from "./hero-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container relative pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            New — Resume V3 callback model released
          </div>
          <h1 className="text-balance text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Career intelligence
            <br />
            <span className="text-muted-foreground">for serious job seekers.</span>
          </h1>
          <p className="mt-6 text-pretty text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Optimize your job search using real application analytics. Track every application,
            measure resume performance, and learn what actually converts.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="h-10 px-5">
              <Link href="/dashboard">
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-5">
              <Link href="#product">See product</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free for 14 days · No credit card · 2-minute setup
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}
