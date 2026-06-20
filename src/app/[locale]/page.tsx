import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { Services } from "@/components/landing/Services";
import { FeaturedWork } from "@/components/landing/FeaturedWork";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { Pricing } from "@/components/landing/Pricing";
import { ContactCTA } from "@/components/ui/ContactCTA";

// Revalidate Sanity-sourced content at most once per minute (ISR).
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
