import { LandingHeader } from "@/features/landing/header";
import { Hero } from "@/features/landing/hero";
import { Metrics } from "@/features/landing/metrics";
import { ProductShowcase } from "@/features/landing/product-showcase";
import { ResumeSection } from "@/features/landing/resume-section";
import { IntelligenceSection } from "@/features/landing/intelligence-section";
import { ExtensionSection } from "@/features/landing/extension-section";
import { WorkflowSection } from "@/features/landing/workflow-section";
import { Testimonials } from "@/features/landing/testimonials";
import { CTA } from "@/features/landing/cta";
import { LandingFooter } from "@/features/landing/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <Hero />
      <Metrics />
      <ProductShowcase />
      <ResumeSection />
      <IntelligenceSection />
      <ExtensionSection />
      <WorkflowSection />
      <Testimonials />
      <CTA />
      <LandingFooter />
    </div>
  );
}
