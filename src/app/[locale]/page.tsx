import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { Services } from "@/components/landing/Services";
import { FeaturedWork } from "@/components/landing/FeaturedWork";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { Pricing } from "@/components/landing/Pricing";
import { ContactCTA } from "@/components/ui/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <FeaturedWork />
      <ProcessTimeline />
      <Pricing />
      <ContactCTA />
    </>
  );
}
