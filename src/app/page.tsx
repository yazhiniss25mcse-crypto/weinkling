import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroContainer from "@/components/hero/HeroContainer";
import ControlMethods from "@/components/sections/ControlMethods";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import StatsBar from "@/components/sections/StatsBar";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Weinkling — Intelligent Home Automation",
  description:
    "Weinkling designs premium home automation systems — smart lighting, unified control, voice integration, and more. No rewiring. Installed by certified experts. Book a free consultation.",
};

/**
 * Homepage section order (conversion-optimised):
 *
 * 1. Hero              — hook + primary CTA
 * 2. ControlMethods    — show HOW you control (credibility)
 * 3. ServicesSection   — WHAT we offer (bento visual grid)
 * 4. Testimonials      — social proof immediately after services
 * 5. HowItWorks        — process clarity for interested users
 * 6. WhyChooseUs       — differentiation before consideration
 * 7. StatsBar          — hard numbers (trust reinforcement)
 * 8. FAQ               — objection removal before CTA
 * 9. CTA               — final conversion action
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* 1 — Hook */}
        <HeroContainer />

        {/* 2 — How you control it */}
        <ControlMethods />

        {/* 3 — What we offer */}
        <ServicesSection />

        {/* 4 — Social proof */}
        <TestimonialsSection />

        {/* 5 — Process clarity */}
        <HowItWorksSection />

        {/* 6 — Differentiation */}
        <WhyChooseUsSection />

        {/* 7 — Trust reinforcement */}
        <StatsBar />

        {/* 8 — Objection removal */}
        <FAQSection />

        {/* 9 — Conversion */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
