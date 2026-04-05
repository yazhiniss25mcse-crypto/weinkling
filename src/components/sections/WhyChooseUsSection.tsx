"use client";

/**
 * WhyChooseUsSection.tsx
 *
 * 2×2 grid of feature cards explaining the company's key differentiators.
 *
 * Card design (different from TestimonialCard / StepCard to avoid monotony):
 *   - Left accent strip: 3px vertical bar, always visible but dim, brightens on hover
 *   - Icon in a soft square (not circle) with accent glow on hover
 *   - Icon scales 1.0 → 1.12 on hover (subtle float)
 *   - Thin top-edge gradient line on hover (matches ServicesSection pattern)
 *   - Card background: darker diagonal gradient for a "statement" feel
 *
 * Layout:
 *   Desktop  → 2 cols × 2 rows
 *   Tablet   → 2 cols × 2 rows (same, just smaller)
 *   Mobile   → 1 col × 4 rows
 *
 * Section background: var(--clr-deep) — alternates with void sections for visual rhythm.
 *
 * Animation: Component → useScrollTimeline → buildWhyChooseUsTimeline
 */

import React, { useRef } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildWhyChooseUsTimeline } from "@/animations/whyChooseUsTimeline";

// ── Icons ────────────────────────────────────────────────────────────────────

function NoWiringIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.35"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}

function VoiceCompatIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.35"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function CustomIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.35"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M8.46 8.46a5 5 0 0 0 0 7.07" />
        </svg>
    );
}

function ExpertIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.35"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

// ── Feature data ─────────────────────────────────────────────────────────────

interface FeatureItem {
    id:          string;
    icon:        React.ReactNode;
    title:       string;
    description: string;
    accent:      "teal" | "gold";
}

const FEATURES: FeatureItem[] = [
    {
        id:          "no-wiring",
        icon:        <NoWiringIcon />,
        title:       "No Rewiring Required",
        description: "Upgrade your home to full automation without touching existing wiring or making structural changes.",
        accent:      "teal",
    },
    {
        id:          "voice",
        icon:        <VoiceCompatIcon />,
        title:       "Matter & Voice Compatible",
        description: "Works seamlessly with Alexa, Google Home, and Apple HomeKit — the ecosystem you already use.",
        accent:      "gold",
    },
    {
        id:          "custom",
        icon:        <CustomIcon />,
        title:       "Custom Designed Solutions",
        description: "Every system is tailored to your home layout, lifestyle, and aesthetic — nothing off-the-shelf.",
        accent:      "gold",
    },
    {
        id:          "expert",
        icon:        <ExpertIcon />,
        title:       "Expert Installation",
        description: "Handled end-to-end by trained professionals. We install, configure, and hand over a working system.",
        accent:      "teal",
    },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef   = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

    useScrollTimeline(buildWhyChooseUsTimeline, {
        section: sectionRef,
        label:   labelRef,
        heading: headingRef,
        cards:   cardsRef,
    });

    return (
        <section
            ref={sectionRef}
            id="why-choose-us"
            aria-label="Why Choose Us"
            style={{
                position:   "relative",
                background: "var(--clr-void)",
                borderTop:  "1px solid rgba(245,244,240,0.05)",
                overflow:   "hidden",
            }}
        >
            {/* ── All CSS ──────────────────────────────────────────── */}
            <style>{`

                /* ════════════════════════════════════════════════
                   2×2 GRID
                ════════════════════════════════════════════════ */
                .wcu-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                @media (max-width: 600px) {
                    .wcu-grid {
                        grid-template-columns: 1fr;
                        gap: 0.875rem;
                    }
                }

                /* ════════════════════════════════════════════════
                   FEATURE CARD
                ════════════════════════════════════════════════ */
                .wcu-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 2rem 2rem 2rem 2.5rem;
                    border-radius: 14px;
                    background: linear-gradient(
                        150deg,
                        rgba(22, 23, 34, 0.85) 0%,
                        rgba(12, 12, 20, 0.70) 100%
                    );
                    border: 1px solid rgba(245, 244, 240, 0.07);
                    overflow: hidden;
                    transition:
                        transform     0.38s cubic-bezier(0.22, 0.61, 0.36, 1),
                        border-color  0.38s ease,
                        box-shadow    0.38s ease;
                    will-change: transform;
                }

                /* ── Left accent strip ── */
                .wcu-card::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 16%; bottom: 16%;
                    width: 3px;
                    border-radius: 0 3px 3px 0;
                    transition: opacity 0.38s ease, top 0.38s ease, bottom 0.38s ease;
                }
                .wcu-card--teal::before {
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(140,180,184,0.55),
                        transparent
                    );
                    opacity: 0.45;
                }
                .wcu-card--gold::before {
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(200,169,110,0.55),
                        transparent
                    );
                    opacity: 0.45;
                }

                /* ── Top-edge line ── */
                .wcu-card::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 1px;
                    background: transparent;
                    transition: background 0.38s ease;
                    border-radius: 0 0 2px 2px;
                }

                /* ── Teal card hover ── */
                .wcu-card--teal:hover {
                    transform: translateY(-5px);
                    border-color: rgba(140,180,184,0.25);
                    box-shadow:
                        0 24px 56px rgba(0,0,0,0.36),
                        0  0   0 1px rgba(140,180,184,0.12);
                }
                .wcu-card--teal:hover::before { opacity: 1; top: 12%; bottom: 12%; }
                .wcu-card--teal:hover::after {
                    background: linear-gradient(90deg,
                        transparent, rgba(140,180,184,0.50), transparent);
                }
                .wcu-card--teal:hover .wcu-icon-wrap {
                    background: rgba(140,180,184,0.14);
                    border-color: rgba(140,180,184,0.30);
                }
                .wcu-card--teal:hover .wcu-icon-inner {
                    transform: scale(1.12);
                }

                /* ── Gold card hover ── */
                .wcu-card--gold:hover {
                    transform: translateY(-5px);
                    border-color: rgba(200,169,110,0.25);
                    box-shadow:
                        0 24px 56px rgba(0,0,0,0.36),
                        0  0   0 1px rgba(200,169,110,0.12);
                }
                .wcu-card--gold:hover::before { opacity: 1; top: 12%; bottom: 12%; }
                .wcu-card--gold:hover::after {
                    background: linear-gradient(90deg,
                        transparent, rgba(200,169,110,0.50), transparent);
                }
                .wcu-card--gold:hover .wcu-icon-wrap {
                    background: rgba(200,169,110,0.12);
                    border-color: rgba(200,169,110,0.28);
                }
                .wcu-card--gold:hover .wcu-icon-inner {
                    transform: scale(1.12);
                }

                /* ════════════════════════════════════════════════
                   ICON
                ════════════════════════════════════════════════ */
                .wcu-icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 12px;   /* square-ish — different from TestimonialCard circles */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-bottom: 1.5rem;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    transition: background 0.35s ease, border-color 0.35s ease;
                }

                /* Icon scales independently of the wrap on hover */
                .wcu-icon-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                /* ════════════════════════════════════════════════
                   TEXT
                ════════════════════════════════════════════════ */
                .wcu-title {
                    font-family: var(--font-serif);
                    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
                    font-weight: 400;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                    color: var(--clr-mist);
                    margin: 0 0 0.65rem;
                }

                .wcu-desc {
                    font-family: var(--font-sans);
                    font-size: 0.875rem;
                    font-weight: 300;
                    line-height: 1.78;
                    color: rgba(245, 244, 240, 0.46);
                    margin: 0;
                }

            `}</style>

            {/* ── Ambient orbs ─────────────────────────────────────── */}
            <div aria-hidden="true" style={{
                position: "absolute", top: "-12%", right: "-6%",
                width: "42vw", height: "42vw",
                maxWidth: "500px", maxHeight: "500px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(140,180,184,0.05) 0%, transparent 65%)",
                filter: "blur(55px)", pointerEvents: "none",
            }} />
            <div aria-hidden="true" style={{
                position: "absolute", bottom: "-10%", left: "-6%",
                width: "40vw", height: "40vw",
                maxWidth: "460px", maxHeight: "460px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,169,110,0.042) 0%, transparent 65%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />

            {/* ── Inner container ─────────────────────────────────── */}
            <div style={{
                maxWidth:      "1380px",
                margin:        "0 auto",
                paddingTop:    "clamp(4.5rem, 9vh, 7.5rem)",
                paddingBottom: "clamp(4.5rem, 9vh, 7.5rem)",
                paddingLeft:   "clamp(1.25rem, 4.5vw, 3.5rem)",
                paddingRight:  "clamp(1.25rem, 4.5vw, 3.5rem)",
                position:      "relative",
                zIndex:        1,
            }}>

                {/* ── Section header ──────────────────────────────── */}
                <header style={{
                    display:      "flex",
                    flexDirection: "column",
                    alignItems:   "center",
                    textAlign:    "center",
                    marginBottom: "clamp(2.5rem, 5vw, 4rem)",
                    gap:          0,
                }}>
                    {/* Label */}
                    <div ref={labelRef} style={{
                        display: "inline-flex", alignItems: "center",
                        gap: "0.65rem", marginBottom: "1.125rem",
                    }}>
                        <span style={{
                            display: "inline-block", width: "22px", height: "1px",
                            background: "var(--clr-accent)",
                        }} />
                        <span style={{
                            fontFamily: "var(--font-sans)", fontSize: "0.6rem",
                            fontWeight: 500, letterSpacing: "0.28em",
                            textTransform: "uppercase" as const,
                            color: "var(--clr-accent)",
                        }}>
                            Why Choose Us
                        </span>
                        <span style={{
                            display: "inline-block", width: "22px", height: "1px",
                            background: "var(--clr-accent)",
                        }} />
                    </div>

                    {/* Heading */}
                    <h2 ref={headingRef} style={{
                        fontFamily:    "var(--font-serif)",
                        fontSize:      "clamp(1.75rem, 3.6vw, 3rem)",
                        fontWeight:    300,
                        lineHeight:    1.1,
                        letterSpacing: "-0.022em",
                        color:         "var(--clr-mist)",
                        maxWidth:      "580px",
                        margin:        0,
                    }}>
                        Built for Reliability,{" "}
                        <em style={{ fontStyle: "italic", color: "rgba(245,244,240,0.65)" }}>
                            Designed for Comfort
                        </em>
                    </h2>
                </header>

                {/* ── 2×2 Feature grid ─────────────────────────────── */}
                <div className="wcu-grid">
                    {FEATURES.map((feature, i) => {
                        const isTeal = feature.accent === "teal";
                        const accentColor = isTeal ? "var(--clr-accent)" : "var(--clr-gold)";

                        return (
                            <div
                                key={feature.id}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className={`wcu-card wcu-card--${feature.accent}`}
                                aria-label={feature.title}
                            >
                                {/* Icon */}
                                <div
                                    className="wcu-icon-wrap"
                                    style={{ color: accentColor }}
                                    aria-hidden="true"
                                >
                                    <span className="wcu-icon-inner">
                                        {feature.icon}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="wcu-title">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="wcu-desc">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
