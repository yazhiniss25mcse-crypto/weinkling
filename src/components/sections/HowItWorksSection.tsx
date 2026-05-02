"use client";

/**
 * HowItWorksSection.tsx
 *
 * 4-step horizontal process layout (desktop) / vertical stack (mobile).
 *
 * Visual structure:
 *   ┌────────────┬────────────┬────────────┬────────────┐
 *   │   [icon]   │   [icon]   │   [icon]   │   [icon]   │
 *   │  ────────────────────────────────    │            │
 *   │  Step 01   │  Step 02   │  Step 03   │  Step 04   │
 *   │  Consult.  │  Planning  │  Install.  │  Support   │
 *   │  desc...   │  desc...   │  desc...   │  desc...   │
 *   └────────────┴────────────┴────────────┴────────────┘
 *
 * The teal→gold gradient connector line spans below all 4 icon circles
 * and is animated to draw left→right via GSAP scaleX (desktop only).
 * Mobile: vertical dashed line on the left, no GSAP draw.
 *
 * Animation: Component → useScrollTimeline → buildHowItWorksTimeline
 */

import React, { useRef } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildHowItWorksTimeline } from "@/animations/howItWorksTimeline";
import StepCard, { type StepData } from "./StepCard";

// ── Step Icons ───────────────────────────────────────────────────────────────

function ConsultIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="9" y1="10" x2="15" y2="10" />
            <line x1="12" y1="7" x2="12" y2="13" />
        </svg>
    );
}

function PlanIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
            <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" strokeWidth="0" />
        </svg>
    );
}

function InstallIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

// ── Step data ────────────────────────────────────────────────────────────────

const STEPS: StepData[] = [
    {
        id:          "consult",
        number:      "01",
        title:       "Consultation",
        description: "We understand your needs, lifestyle, and home layout to create the right plan.",
        benefit:     "Free consultation",
        icon:        <ConsultIcon />,
        accent:      "teal",
    },
    {
        id:          "plan",
        number:      "02",
        title:       "Planning",
        description: "We design a customized automation system tailored to your space and preferences.",
        benefit:     "Custom system design",
        icon:        <PlanIcon />,
        accent:      "gold",
    },
    {
        id:          "install",
        number:      "03",
        title:       "Installation",
        description: "Our certified experts install everything seamlessly — no rewiring required.",
        benefit:     "Professional setup",
        icon:        <InstallIcon />,
        accent:      "teal",
    },
    {
        id:          "support",
        number:      "04",
        title:       "Support",
        description: "We stay with you — ongoing support, updates, and upgrades whenever you need.",
        benefit:     "Lifetime support",
        icon:        <SupportIcon />,
        accent:      "gold",
    },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
    const sectionRef    = useRef<HTMLElement>(null);
    const labelRef      = useRef<HTMLDivElement>(null);
    const headingRef    = useRef<HTMLHeadingElement>(null);
    const subtextRef    = useRef<HTMLParagraphElement>(null);
    const stepsRef      = useRef<(HTMLDivElement | null)[]>([]);
    const lineRef       = useRef<HTMLDivElement>(null);
    const lineGlowRef   = useRef<HTMLDivElement>(null);
    const iconRingsRef  = useRef<(HTMLDivElement | null)[]>([]);

    useScrollTimeline(buildHowItWorksTimeline, {
        section:    sectionRef,
        label:      labelRef,
        heading:    headingRef,
        subtext:    subtextRef,
        steps:      stepsRef,
        line:       lineRef,
        lineGlow:   lineGlowRef,
        iconRings:  iconRingsRef,
    });

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            aria-label="How It Works"
            style={{
                position:   "relative",
                background: "linear-gradient(to bottom, #0b0f1a, #05070d)",
                borderTop:  "1px solid rgba(255,255,255,0.05)",
                overflow:   "hidden",
                opacity:    0,
            }}
        >

            {/* ── All CSS ─────────────────────────────────────────── */}
            <style>{`

                /* ════════════════════════════════════════════════
                   STEPS GRID
                ════════════════════════════════════════════════ */
                .hiw-steps {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    position: relative;
                }

                @media (max-width: 900px) {
                    .hiw-steps {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                    }
                }

                @media (max-width: 600px) {
                    .hiw-steps {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                }

                /* ════════════════════════════════════════════════
                   CONNECTOR LINE (DESKTOP)
                   top aligned to center of 78px icon ring
                ════════════════════════════════════════════════ */
                .hiw-line-wrapper {
                    position: absolute;
                    top: calc(44px + 39px); /* card padding-top 44px + half icon 39px */
                    left:  calc(12.5% + 17px);
                    right: calc(12.5% + 17px);
                    height: 2px;
                    /* Ghost rail */
                    background: rgba(245, 244, 240, 0.055);
                    border-radius: 2px;
                    pointer-events: none;
                    z-index: 0;
                    overflow: visible;
                }

                /* Ambient glow twin (blurred, sits below the fill) */
                .hiw-line-glow {
                    position: absolute;
                    inset: -4px 0;
                    border-radius: 8px;
                    background: linear-gradient(
                        90deg,
                        rgba(140,180,184,0.55) 0%,
                        rgba(140,180,184,0.35) 35%,
                        rgba(200,169,110,0.35) 65%,
                        rgba(200,169,110,0.55) 100%
                    );
                    filter: blur(7px);
                    transform-origin: left center;
                    transform: scaleX(0);
                    opacity: 0.9;
                }

                /* Crisp gradient fill on top */
                .hiw-line-fill {
                    position: absolute;
                    inset: 0;
                    border-radius: 2px;
                    background: linear-gradient(
                        90deg,
                        rgba(140,180,184,1.0)  0%,
                        rgba(140,180,184,0.75) 30%,
                        rgba(180,155,100,0.80) 65%,
                        rgba(200,169,110,1.0)  100%
                    );
                    transform-origin: left center;
                    transform: scaleX(0);
                    box-shadow: 0 0 8px rgba(140,180,184,0.5);
                }

                /* Hide connector on tablet/mobile */
                @media (max-width: 900px) {
                    .hiw-line-wrapper { display: none; }
                }

                /* ════════════════════════════════════════════════
                   MOBILE VERTICAL LINE
                ════════════════════════════════════════════════ */
                @media (max-width: 540px) {
                    .hiw-step:not(:last-child) .hiw-card-shell::after {
                        content: '';
                        display: block;
                        width: 1px;
                        height: 1.5rem;
                        margin: 1.25rem 0 0 33px;
                        background: linear-gradient(
                            to bottom,
                            rgba(140,180,184,0.35),
                            rgba(200,169,110,0.25)
                        );
                    }
                }

                /* ════════════════════════════════════════════════
                   STEP OUTER WRAPPER
                ════════════════════════════════════════════════ */
                .hiw-step {
                    position: relative;
                    z-index: 1;
                    height: 100%;
                }

                /* ════════════════════════════════════════════════
                   GLASSMORPHISM CARD SHELL
                ════════════════════════════════════════════════ */
                .hiw-card-shell {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 32px 24px 28px;
                    min-height: 120px;
                    height: 100%;
                    border-radius: 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    backdrop-filter: blur(16px) saturate(130%);
                    -webkit-backdrop-filter: blur(16px) saturate(130%);
                    box-shadow:
                        0 4px 24px rgba(0,0,0,0.40),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    overflow: hidden;
                    transition:
                        border-color  0.25s ease,
                        box-shadow    0.25s ease,
                        transform     0.25s ease;
                    will-change: transform, box-shadow;
                }

                @media (max-width: 600px) {
                    .hiw-card-shell {
                        padding: 20px 18px;
                        min-height: 120px;
                        border-radius: 14px;
                    }
                }

                .hiw-step:hover .hiw-card-shell {
                    border-color: var(--hover-border, rgba(140,180,184,0.26));
                    box-shadow:   var(--hover-shadow);
                    transform:    translateY(-4px);
                }

                /* ── Top accent glow rule ── */
                .hiw-top-rule {
                    position: absolute;
                    top: 0; left: 15%; right: 15%;
                    height: 1px;
                    pointer-events: none;
                    transition: opacity 0.40s ease;
                    opacity: 0.8;
                }
                .hiw-step:hover .hiw-top-rule { opacity: 1; }

                /* ── Corner glint ── */
                .hiw-corner-glint {
                    position: absolute;
                    top: 0; right: 0;
                    width: 100px; height: 100px;
                    border-radius: 0 24px 0 0;
                    pointer-events: none;
                    transition: opacity 0.40s ease;
                    opacity: 0.6;
                }
                .hiw-step:hover .hiw-corner-glint { opacity: 1; }

                /* ── Watermark number ── */
                .hiw-watermark {
                    position: absolute;
                    bottom: 12px;
                    right: 16px;
                    font-family: var(--font-serif);
                    font-size: 5rem;
                    font-weight: 700;
                    line-height: 1;
                    letter-spacing: -0.06em;
                    color: rgba(245, 244, 240, 0.036);
                    pointer-events: none;
                    user-select: none;
                    transition: color 0.40s ease;
                }
                .hiw-step:hover .hiw-watermark {
                    color: rgba(245, 244, 240, 0.065);
                }

                /* ════════════════════════════════════════════════
                   ICON RING (upgraded: larger + glow halo)
                ════════════════════════════════════════════════ */
                .hiw-icon-ring-wrap {
                    margin-bottom: 2rem;
                    position: relative;
                    z-index: 2;
                    /* Outer halo pulse on hover */
                }

                /* Outer glow halo ring */
                .hiw-icon-ring-wrap::before {
                    content: '';
                    position: absolute;
                    inset: -10px;
                    border-radius: 50%;
                    background: var(--ring-halo, transparent);
                    filter: blur(18px);
                    transition: background 0.42s cubic-bezier(0.25,0.46,0.45,0.94),
                                opacity   0.42s cubic-bezier(0.25,0.46,0.45,0.94);
                    pointer-events: none;
                    opacity: 0;
                }
                .hiw-step:hover .hiw-icon-ring-wrap::before {
                    background: var(--ring-halo-hover, rgba(140,180,184,0.22));
                    opacity: 1;
                }

                .hiw-icon-ring {
                    width: 78px;
                    height: 78px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    position: relative;
                    /* Animate box-shadow so hover glow is visible */
                    transition:
                        box-shadow 0.40s cubic-bezier(0.25,0.46,0.45,0.94),
                        transform  0.44s cubic-bezier(0.34,1.56,0.64,1);
                    will-change: transform, box-shadow;
                }

                /* Hover: intensify glow — teal and gold variants via CSS vars */
                .hiw-step:hover .hiw-icon-ring {
                    transform:  translateY(-5px) scale(1.10);
                    box-shadow: var(--ring-hover-glow);
                }

                /* Inner concentric ring for depth */
                .hiw-icon-inner-ring {
                    position: absolute;
                    inset: 9px;
                    border-radius: 50%;
                    border: 1px solid;
                    opacity: 0.40;
                    pointer-events: none;
                    transition: opacity 0.38s ease;
                }
                .hiw-step:hover .hiw-icon-inner-ring { opacity: 0.70; }

                .hiw-icon-svg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 1;
                    transform: scale(1.35);
                    transition: transform 0.44s cubic-bezier(0.34,1.56,0.64,1);
                }
                .hiw-step:hover .hiw-icon-svg {
                    transform: scale(1.46);
                }

                /* ════════════════════════════════════════════════
                   TYPOGRAPHY  —  matches Contact page tokens
                ════════════════════════════════════════════════ */

                /* ── Step label (STEP 01) ── */
                .hiw-step-label {
                    font-family: var(--font-manrope, 'Manrope', var(--font-sans));
                    font-size: 0.60rem;
                    font-weight: 500;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    margin-bottom: 0;
                    display: block;
                    color: rgba(245, 244, 240, 0.38);
                    transition: color 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
                }
                .hiw-step:hover .hiw-step-label { color: rgba(245, 244, 240, 0.60); }

                /* ── Accent divider ── */
                .hiw-divider {
                    height: 1px;
                    width: 2.5rem;
                    margin: 0.9rem 0 1.1rem;
                    border-radius: 1px;
                    transition: width 0.40s cubic-bezier(0.25,0.46,0.45,0.94);
                }
                .hiw-step:hover .hiw-divider { width: 4rem; }

                /* ── Step title — Manrope 600, tight tracking (Contact page match) ── */
                .hiw-step-title {
                    font-family: var(--font-manrope, 'Manrope', var(--font-sans));
                    font-size: clamp(1.05rem, 1.4vw, 1.25rem);
                    font-weight: 600;
                    line-height: 1.15;
                    letter-spacing: -0.025em;
                    color: #f0ede8;
                    margin: 0 0 0.85rem;
                    transition: color 0.28s ease;
                }
                .hiw-step:hover .hiw-step-title { color: #f8f5f0; }

                /* ── Step description — Inter 400, relaxed leading ── */
                .hiw-step-desc {
                    font-family: var(--font-inter, 'Inter', var(--font-sans));
                    font-size: clamp(0.82rem, 0.95vw, 0.88rem);
                    font-weight: 400;
                    line-height: 1.80;
                    color: rgba(245, 244, 240, 0.40);
                    margin: 0;
                    transition: color 0.28s ease;
                }
                .hiw-step:hover .hiw-step-desc {
                    color: rgba(245, 244, 240, 0.62);
                }

                /* ════════════════════════════════════════════════
                   LINE SEGMENT HOTSPOT
                   A radial bright spot appears on the connector
                   line above whichever step is hovered.
                   Uses CSS :has() — well-supported in modern browsers.
                ════════════════════════════════════════════════ */

                /* The hotspot spans live inside .hiw-steps (position: relative) */
                .hiw-line-hotspot {
                    position: absolute;
                    /* connector line is calc(44px+39px)=83px above grid top,
                       line height is 2px — center the 12px hotspot on it */
                    top: calc(-83px - 5px);
                    width: 25%;
                    height: 12px;
                    border-radius: 6px;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.38s cubic-bezier(0.25,0.46,0.45,0.94);
                    z-index: 2;
                }
                .hiw-line-hotspot[data-step="0"] { left:   0%; }
                .hiw-line-hotspot[data-step="1"] { left:  25%; }
                .hiw-line-hotspot[data-step="2"] { left:  50%; }
                .hiw-line-hotspot[data-step="3"] { left:  75%; }

                /* Teal hotspot (steps 0 & 2) */
                .hiw-line-hotspot[data-accent="teal"] {
                    background: radial-gradient(
                        ellipse at center,
                        rgba(140,180,184,0.95) 0%,
                        rgba(140,180,184,0.45) 45%,
                        transparent 75%
                    );
                    filter: blur(3px);
                }

                /* Gold hotspot (steps 1 & 3) */
                .hiw-line-hotspot[data-accent="gold"] {
                    background: radial-gradient(
                        ellipse at center,
                        rgba(200,169,110,0.95) 0%,
                        rgba(200,169,110,0.45) 45%,
                        transparent 75%
                    );
                    filter: blur(3px);
                }

                /* Activate hotspot when its sibling step card is hovered.
                   Steps are nth-child(5)–(8) because 4 hotspot spans come first. */
                .hiw-steps:has(.hiw-step:nth-child(5):hover) .hiw-line-hotspot[data-step="0"] { opacity: 1; }
                .hiw-steps:has(.hiw-step:nth-child(6):hover) .hiw-line-hotspot[data-step="1"] { opacity: 1; }
                .hiw-steps:has(.hiw-step:nth-child(7):hover) .hiw-line-hotspot[data-step="2"] { opacity: 1; }
                .hiw-steps:has(.hiw-step:nth-child(8):hover) .hiw-line-hotspot[data-step="3"] { opacity: 1; }

                /* Hide hotspots on smaller screens where the line is hidden */
                @media (max-width: 900px) {
                    .hiw-line-hotspot { display: none; }
                }

                /* ════════════════════════════════════════════════
                   BOTTOM CTA NUDGE
                ════════════════════════════════════════════════ */
                .hiw-cta-nudge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: clamp(2.5rem, 5vw, 4.5rem);
                    padding: 0.7rem 1.6rem;
                    border-radius: 9999px;
                    border: 1px solid rgba(140,180,184,0.28);
                    background: rgba(140,180,184,0.06);
                    font-family: 'Manrope', var(--font-sans);
                    font-size: 0.78rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: var(--clr-accent);
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                    width: fit-content;
                }
                .hiw-cta-nudge:hover {
                    background: rgba(140,180,184,0.13);
                    border-color: rgba(140,180,184,0.48);
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px rgba(140,180,184,0.12);
                }
                .hiw-cta-nudge svg { flex-shrink: 0; }

                @media (max-width: 600px) {
                    .hiw-cta-nudge {
                        width: 100%;
                        padding: 12px 16px;
                    }
                }

            `}</style>

            {/* ── Ambient orbs ─────────────────────────────────────── */}
            <div aria-hidden="true" style={{
                position: "absolute", top: "-18%", right: "-5%",
                width: "40vw", height: "40vw",
                maxWidth: "480px", maxHeight: "480px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(140,180,184,0.05) 0%, transparent 65%)",
                filter: "blur(55px)", pointerEvents: "none",
            }} />
            <div aria-hidden="true" style={{
                position: "absolute", bottom: "-12%", left: "-4%",
                width: "38vw", height: "38vw",
                maxWidth: "440px", maxHeight: "440px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 65%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />

            {/* ── Inner container ─────────────────────────────────── */}
            <div style={{
                maxWidth:      "1152px",
                margin:        "0 auto",
                paddingTop:    "clamp(4rem, 9vw, 7rem)",
                paddingBottom: "clamp(4rem, 9vw, 7rem)",
                paddingLeft:   "clamp(1rem, 4vw, 3rem)",
                paddingRight:  "clamp(1rem, 4vw, 3rem)",
                position:      "relative",
                zIndex:        1,
            }}>

                {/* ── Section header ──────────────────────────────── */}
                <header style={{
                    textAlign:    "center",
                    marginBottom: "clamp(4rem, 7vw, 6rem)",
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
                            How It Works
                        </span>
                        <span style={{
                            display: "inline-block", width: "22px", height: "1px",
                            background: "var(--clr-accent)",
                        }} />
                    </div>

                    {/* Heading — Manrope 600, tight tracking: matches Contact h1 */}
                    <h2 ref={headingRef} style={{
                        fontFamily:    "var(--font-manrope, 'Manrope', var(--font-sans))",
                        fontSize:      "clamp(1.7rem, 3.2vw, 2.6rem)",
                        fontWeight:    600,
                        lineHeight:    1.1,
                        letterSpacing: "-0.03em",
                        color:         "#f5f4f0",
                        maxWidth:      "540px",
                        margin:        "0 auto 1rem",
                    }}>
                        From Idea to Intelligent Living
                    </h2>

                    {/* Subtext — Inter 400, relaxed leading, muted */}
                    <p ref={subtextRef} style={{
                        fontFamily: "var(--font-inter, 'Inter', var(--font-sans))",
                        fontSize:   "clamp(0.82rem, 1vw, 0.92rem)",
                        fontWeight: 400,
                        lineHeight: 1.75,
                        color:      "rgba(245,244,240,0.40)",
                        maxWidth:   "400px",
                        margin:     "0 auto",
                    }}>
                        A simple 4-step process to transform your home.
                    </p>
                </header>

                {/* ── Steps + connector line ───────────────────────── */}
                <div style={{ position: "relative" }}>

                    {/* Connector line — desktop only, GSAP animated */}
                    <div className="hiw-line-wrapper" aria-hidden="true">
                        <div ref={lineGlowRef} className="hiw-line-glow" />
                        <div ref={lineRef}     className="hiw-line-fill" />
                    </div>

                    {/* Step cards grid */}
                    <div className="hiw-steps">
                        {/* Line hotspots — one per step, activated by CSS :has() on hover */}
                        <span className="hiw-line-hotspot" data-step="0" data-accent="teal"  aria-hidden="true" />
                        <span className="hiw-line-hotspot" data-step="1" data-accent="gold"  aria-hidden="true" />
                        <span className="hiw-line-hotspot" data-step="2" data-accent="teal"  aria-hidden="true" />
                        <span className="hiw-line-hotspot" data-step="3" data-accent="gold"  aria-hidden="true" />
                        {STEPS.map((step, i) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                isLast={i === STEPS.length - 1}
                                ref={(el) => { stepsRef.current[i] = el; }}
                                iconRingRef={(el) => { iconRingsRef.current[i] = el; }}
                            />
                        ))}
                    </div>
                </div>

                {/* ── CTA block ───────────────────────────────────── */}
                <div style={{
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    gap:            "16px",
                    marginTop:      "clamp(2.5rem, 5vw, 4rem)",
                    paddingBottom:  "1.5rem",
                }}>
                    {/* Label */}
                    <p style={{
                        fontFamily:    "var(--font-inter, 'Inter', var(--font-sans))",
                        fontSize:      "0.85rem",
                        fontWeight:    400,
                        color:         "rgba(245,244,240,0.38)",
                        letterSpacing: "0.02em",
                        margin:        0,
                    }}>
                        Ready to get started?
                    </p>

                    {/* Button */}
                    <a
                        href="/contact"
                        id="hiw-cta"
                        aria-label="Book a free consultation"
                        className="hiw-cta-nudge"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Book a Free Consultation
                    </a>
                </div>

            </div>
        </section>
    );
}
