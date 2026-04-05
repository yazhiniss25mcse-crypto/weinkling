import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "How It Works — Weinkling",
  description:
    "A simple 4-step process to transform your home into an intelligent living space. Consultation, planning, installation, and lifetime support.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="how-it-works-content" style={{ background: "#09090e" }}>
        {/* Page Hero */}
        <section
          style={{
            paddingTop: "160px",
            paddingBottom: "0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Feature lighting video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/sections/feature-lighting-poster.webp"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.22,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <source src="/videos/sections/feature-lighting.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text contrast */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(9,9,14,0.82) 0%, rgba(9,9,14,0.6) 60%, rgba(9,9,14,0.95) 100%)",
              zIndex: 1, pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "0 24px 80px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--clr-accent)",
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--clr-accent)",
                }}
              >
                Our Process
              </span>
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--clr-accent)",
                  opacity: 0.7,
                }}
              />
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#f5f4f0",
                margin: "0 0 24px",
              }}
            >
              From Idea to{" "}
              <em style={{ color: "var(--clr-accent)", fontStyle: "italic" }}>
                Intelligent Living.
              </em>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,244,240,0.48)",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              A seamless 4-step journey — from your first conversation to a fully
              intelligent home, backed by lifetime support.
            </p>
          </div>
        </section>

        {/* Reuse the full HowItWorksSection component */}
        <HowItWorksSection />

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
