"use client";

/**
 * StepCard.tsx
 *
 * Individual process step for the How It Works section.
 * Uses forwardRef for GSAP stagger targeting by the parent.
 *
 * Anatomy:
 *   - Glassmorphism card shell with subtle border + hover glow
 *   - Large faint serif watermark number (01–04) — depth layer
 *   - Icon circle with gradient fill, glow halo, and inner ring
 *   - "Step 01" accent label
 *   - Accent divider rule
 *   - Title (serif)
 *   - Description (sans, muted)
 */

import React from "react";

export interface StepData {
    id:          string;
    number:      string;      // "01" "02" etc.
    title:       string;
    description: string;
    benefit?:    string;      // optional short benefit tag
    icon:        React.ReactNode;
    accent:      "teal" | "gold";
}

interface StepCardProps {
    step:        StepData;
    isLast:      boolean;
    iconRingRef: (el: HTMLDivElement | null) => void;
}

const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
    ({ step, isLast, iconRingRef }, ref) => {
        const isTeal       = step.accent === "teal";
        const accentColor  = isTeal ? "var(--clr-accent)" : "var(--clr-gold)";
        const ringColor    = isTeal ? "rgba(140,180,184,0.32)" : "rgba(200,169,110,0.32)";
        const glowColor    = isTeal ? "rgba(140,180,184,0.22)" : "rgba(200,169,110,0.20)";
        const haloColor    = isTeal ? "rgba(140,180,184,0.18)" : "rgba(200,169,110,0.16)";
        const bgGradient   = isTeal
            ? "linear-gradient(145deg, rgba(140,180,184,0.18) 0%, rgba(100,150,155,0.10) 60%, rgba(140,180,184,0.06) 100%)"
            : "linear-gradient(145deg, rgba(200,169,110,0.18) 0%, rgba(180,145,85,0.10) 60%, rgba(200,169,110,0.06) 100%)";
        const cardBorder   = isTeal
            ? "rgba(140,180,184,0.12)"
            : "rgba(200,169,110,0.12)";
        const hoverBorder  = isTeal
            ? "rgba(140,180,184,0.32)"
            : "rgba(200,169,110,0.30)";
        const hoverShadow  = isTeal
            ? "0 28px 64px rgba(0,0,0,0.60), 0 0 52px rgba(140,180,184,0.14), inset 0 1px 0 rgba(255,255,255,0.07)"
            : "0 28px 64px rgba(0,0,0,0.60), 0 0 52px rgba(200,169,110,0.11), inset 0 1px 0 rgba(255,255,255,0.07)";

        // Intensified box-shadow for icon ring on hover
        const ringHoverGlow = isTeal
            ? `0 0 0 10px rgba(140,180,184,0.12), 0 0 52px rgba(140,180,184,0.55), 0 0 80px rgba(140,180,184,0.25), inset 0 1px 0 rgba(255,255,255,0.14)`
            : `0 0 0 10px rgba(200,169,110,0.10), 0 0 52px rgba(200,169,110,0.50), 0 0 80px rgba(200,169,110,0.22), inset 0 1px 0 rgba(255,255,255,0.14)`;

        return (
            <div
                ref={ref}
                className="hiw-step"
                aria-label={`Step ${step.number}: ${step.title}`}
                style={{ "--card-border": cardBorder, "--hover-border": hoverBorder, "--hover-shadow": hoverShadow, "--ring-halo-hover": haloColor, "--ring-hover-glow": ringHoverGlow } as React.CSSProperties}
            >
                {/* ── Card glass shell ──────────────────────────────── */}
                <div className="hiw-card-shell">

                    {/* Watermark number */}
                    <span className="hiw-watermark" aria-hidden="true">
                        {step.number}
                    </span>

                    {/* Top accent glow rule */}
                    <div className="hiw-top-rule" style={{
                        background: `linear-gradient(to right, transparent, ${accentColor}44, transparent)`,
                    }} />

                    {/* Corner glint */}
                    <div className="hiw-corner-glint" style={{
                        background: `radial-gradient(circle at top right, ${glowColor}, transparent 70%)`,
                    }} />

                    {/* Icon ring — enlarged with gradient + glow halo */}
                    <div className="hiw-icon-ring-wrap">
                        <div
                            ref={iconRingRef}
                            className="hiw-icon-ring"
                            style={{
                                background: bgGradient,
                                border:     `1.5px solid ${ringColor}`,
                                color:      accentColor,
                                boxShadow:  `0 0 0 6px ${glowColor.replace('0.22','0.07').replace('0.20','0.06')}, 0 0 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.10)`,
                            }}
                            aria-hidden="true"
                        >
                            {/* Inner concentric ring */}
                            <div className="hiw-icon-inner-ring" style={{ borderColor: ringColor }} />
                            {/* Icon */}
                            <span className="hiw-icon-svg">{step.icon}</span>
                        </div>
                    </div>

                    {/* Step label */}
                    <span className="hiw-step-label" style={{ color: accentColor }}>
                        Step {step.number}
                    </span>

                    {/* Accent divider */}
                    <div className="hiw-divider" style={{
                        background: `linear-gradient(to right, ${accentColor}55, transparent)`,
                    }} />

                    {/* Title */}
                    <h3 className="hiw-step-title">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="hiw-step-desc">
                        {step.description}
                    </p>

                    {/* Benefit tag */}
                    {step.benefit && (
                        <div
                            className="hiw-step-benefit"
                            style={{
                                display:        "inline-flex",
                                alignItems:     "center",
                                gap:            "6px",
                                marginTop:      "1.1rem",
                                padding:        "4px 10px 4px 8px",
                                borderRadius:   "6px",
                                background:     `rgba(${isTeal ? "140,180,184" : "200,169,110"},0.08)`,
                                border:         `1px solid rgba(${isTeal ? "140,180,184" : "200,169,110"},0.16)`,
                            }}
                        >
                            {/* Checkmark */}
                            <svg
                                width="11" height="11" viewBox="0 0 24 24" fill="none"
                                stroke={accentColor} strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span style={{
                                fontFamily:    "var(--font-inter, 'Inter', var(--font-sans))",
                                fontSize:      "0.68rem",
                                fontWeight:    500,
                                letterSpacing: "0.04em",
                                color:         accentColor,
                                opacity:       0.80,
                            }}>
                                {step.benefit}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

StepCard.displayName = "StepCard";
export default StepCard;
