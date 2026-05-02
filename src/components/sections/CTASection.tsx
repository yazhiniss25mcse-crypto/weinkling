"use client";

/**
 * CTASection.tsx
 *
 * Full-width call-to-action section with:
 * - Large bold statement
 * - Accent gradient background
 * - Two CTA buttons
 * - GSAP scroll reveal
 */

import React, { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(headlineRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
            })
                .from(
                    subRef.current,
                    { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                )
                .from(
                    actionsRef.current,
                    { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="cta"
            aria-label="Call to Action"
            className="relative overflow-hidden"
            style={{
                background: "var(--clr-void)",
                borderTop: "1px solid rgba(245,244,240,0.06)",
                borderBottom: "1px solid rgba(245,244,240,0.06)",
            }}
        >
            {/* Ambient gradient orb */}
            <div
                className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(140,180,184,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="section-container text-center relative" style={{ paddingTop: "clamp(60px,10vw,120px)", paddingBottom: "clamp(60px,10vw,120px)" }}>
                {/* Section label */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <span
                        className="inline-block w-6 h-px"
                        style={{ background: "var(--clr-gold)" }}
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.68rem",
                            fontWeight: 500,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "var(--clr-gold)",
                        }}
                    >
                        Begin Your Project
                    </span>
                    <span
                        className="inline-block w-6 h-px"
                        style={{ background: "var(--clr-gold)" }}
                    />
                </div>

                <h2
                    ref={headlineRef}
                    style={{
                        fontFamily: "var(--font-manrope)",
                        fontSize: "clamp(1.8rem, 3.2vw, 3rem)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.025em",
                        color: "var(--clr-mist)",
                    }}
                >
                    Design your
                    <br />
                    <em
                        style={{
                            fontStyle: "normal",
                            background:
                                "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        intelligent home.
                    </em>
                </h2>

                <p
                    ref={subRef}
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "1rem",
                        color: "var(--clr-text-secondary)",
                        lineHeight: 1.8,
                        maxWidth: "460px",
                        margin: "2rem auto 0",
                        textAlign: "center",
                    }}
                >
                    Every Weinkling project begins with a private consultation.
                    Tell us your vision, and we will engineer the precise system
                    your home deserves.
                </p>

                <div
                    ref={actionsRef}
                    style={{
                        marginTop: "2.5rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        type="button"
                        id="cta-primary"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.55rem",
                            padding: "0.6rem 1.6rem",
                            borderRadius: "9999px",
                            background: "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                            border: "1px solid rgba(140,180,184,0.45)",
                            color: "var(--clr-mist)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            backdropFilter: "blur(12px)",
                            cursor: "pointer",
                            transition: "opacity 0.3s ease",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Book a Consultation
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}
