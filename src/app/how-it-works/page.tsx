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

      {/* Global style overrides for this page — background unification + mobile */}
      <style>{`
        /* ── Background system: 2 alternating tones only ─────────── */
        #how-it-works-content {
          background: linear-gradient(to bottom, #0b0f1a, #05070d);
        }

        /* ── Hero section ──────────────────────────────────────────── */
        #hiw-hero {
          padding-top: 140px;
          padding-bottom: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ── What You Get section ──────────────────────────────────── */
        #what-you-get {
          background: linear-gradient(to bottom, #0b0f1a, #0f172a);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 80px clamp(1.25rem,5vw,3.5rem);
        }

        /* ── Container consistency ─────────────────────────────────── */
        .hiw-container {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* ── WYG card system ───────────────────────────────────────── */
        .wyg-featured {
          padding: 32px 28px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s ease, transform 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .wyg-featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,180,184,0.35), transparent);
        }
        .wyg-featured:hover {
          border-color: rgba(140,180,184,0.20);
          transform: translateY(-4px);
        }
        .wyg-card {
          padding: 24px 22px;
          border-radius: 14px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .wyg-card:hover {
          border-color: rgba(140,180,184,0.18);
          transform: translateY(-3px);
        }
        .wyg-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        .wyg-featured .wyg-icon {
          width: 48px; height: 48px;
          background: rgba(140,180,184,0.07);
          border-color: rgba(140,180,184,0.14);
          margin-bottom: 20px;
        }

        /* ── Featured grid ─────────────────────────────────────────── */
        .wyg-featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        /* ── Secondary grid ────────────────────────────────────────── */
        .wyg-secondary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        /* ── CTA button full width on mobile ───────────────────────── */
        .hiw-cta-mobile-wrap {
          display: flex;
          justify-content: center;
        }

        /* ── Mobile breakpoint ─────────────────────────────────────── */
        @media (max-width: 640px) {
          #hiw-hero {
            padding-top: 120px;
            padding-bottom: 56px;
          }

          #what-you-get {
            padding: 56px 1rem;
          }

          .wyg-featured-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wyg-secondary-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .wyg-featured {
            padding: 22px 18px;
            min-height: 120px;
          }

          .wyg-card {
            padding: 18px 16px;
            min-height: 120px;
          }

          .hiw-cta-mobile-wrap a {
            width: 100%;
            justify-content: center;
            padding: 12px 16px;
          }
        }

        @media (max-width: 400px) {
          .wyg-secondary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main id="how-it-works-content">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section id="hiw-hero" aria-label="Page hero">
          {/* Subtle overlay — keeps background consistent, no image */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%, rgba(140,180,184,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="hiw-container"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)", opacity: 0.7 }} />
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
              <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)", opacity: 0.7 }} />
            </div>

            <h1
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.2rem, 4.8vw, 4.56rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#f5f4f0",
                margin: "0 0 20px",
              }}
            >
              From Idea to
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                  fontStyle: "normal",
                }}
              >
                Intelligent Living
              </span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inter, 'Inter', var(--font-sans))",
                fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "rgba(245,244,240,0.45)",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              A seamless 4-step journey — from your first conversation to a fully
              intelligent home, backed by lifetime support.
            </p>
          </div>
        </section>

        {/* ── Steps ─────────────────────────────────────────────── */}
        <HowItWorksSection />

        {/* ── What You Get ──────────────────────────────────────── */}
        <section id="what-you-get" aria-label="What you get">
          <div className="hiw-container">

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ width: "22px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
                <p style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "0.62rem", fontWeight: 500, margin: 0,
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "var(--clr-accent)",
                }}>What You Get</p>
                <span style={{ width: "22px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
              </div>
              <h2 style={{
                fontFamily: "var(--font-manrope,'Manrope',sans-serif)",
                fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 600,
                letterSpacing: "-0.03em", color: "#f5f4f0",
                margin: "0 auto 12px", maxWidth: "460px", lineHeight: 1.12,
              }}>Everything included, nothing hidden</h2>
              <p style={{
                fontFamily: "var(--font-inter,'Inter',sans-serif)",
                fontSize: "0.875rem", fontWeight: 400,
                lineHeight: 1.75, color: "rgba(245,244,240,0.38)",
                maxWidth: "360px", margin: "0 auto",
              }}>Every Weinkling project is delivered with a complete, end-to-end experience.</p>
            </div>

            {/* Featured row */}
            <div className="wyg-featured-grid">
              {[
                { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Free Consultation", desc: "No-cost initial session to understand your goals and space. Our experts listen, assess, and recommend — no pressure, no obligation." },
                { icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7", title: "Custom System Design", desc: "A tailored automation blueprint built for your exact layout. Every circuit, scene, and schedule designed around how you actually live." },
              ].map((item) => (
                <div key={item.title} className="wyg-featured">
                  <div className="wyg-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="var(--clr-accent)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-manrope,'Manrope',sans-serif)",
                    fontSize: "1rem", fontWeight: 600,
                    letterSpacing: "-0.02em", color: "#f5f4f0",
                    margin: "0 0 8px",
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: "0.84rem", fontWeight: 400,
                    lineHeight: 1.75, color: "rgba(245,244,240,0.40)",
                    margin: 0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Secondary row */}
            <div className="wyg-secondary-grid">
              {[
                { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Professional Installation", desc: "Certified engineers handle setup — zero rewiring, zero disruption." },
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure & Private", desc: "Local processing with optional cloud — your data stays yours." },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Lifetime Support", desc: "Updates, troubleshooting, and upgrades — always included." },
                { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", title: "Works With Your Home", desc: "Compatible with lights, locks, HVAC, AV, and more." },
              ].map((item) => (
                <div key={item.title} className="wyg-card">
                  <div className="wyg-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="var(--clr-accent)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-manrope,'Manrope',sans-serif)",
                    fontSize: "0.88rem", fontWeight: 600,
                    letterSpacing: "-0.02em", color: "#edeae4",
                    margin: "0 0 6px",
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: "0.80rem", fontWeight: 400,
                    lineHeight: 1.7, color: "rgba(245,244,240,0.35)",
                    margin: 0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
