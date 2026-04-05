"use client";

/**
 * ServicesSection.tsx — v4 (dual-style bento)
 *
 * Card design:
 *   Feature card  → Full dark photo bg + white text overlay (existing approach, premium image)
 *   Small cards   → Light cream bg + product image centered (object-fit: contain) + dark text
 *
 * Layout: same 3-col bento grid (feature spans 2×2, 5 small cards auto-placed)
 *
 * Trust strip: REMOVED per spec
 */

import React, { useRef } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildServicesSectionTimeline } from "@/animations/servicesSectionTimeline";
import { SERVICES, SERVICES_SECTION_CONTENT } from "./services.data";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef   = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
    const trustRef   = useRef<HTMLDivElement>(null);   // unused dom attach — GSAP handles null safely
    const ctaRef     = useRef<HTMLDivElement>(null);   // same

    useScrollTimeline(buildServicesSectionTimeline, {
        section:    sectionRef,
        label:      labelRef,
        heading:    headingRef,
        subtext:    subtextRef,
        cards:      cardsRef,
        trustStrip: trustRef,
        ctaBlock:   ctaRef,
    });

    const { label, heading, subtext } = SERVICES_SECTION_CONTENT;

    return (
        <section
            ref={sectionRef}
            id="services"
            aria-label="Our Solutions"
            style={{
                position:   "relative",
                background: "var(--clr-void)",
                borderTop:  "1px solid rgba(245,244,240,0.05)",
                overflow:   "hidden",
            }}
        >

            {/* ════════════════════════════════════════════════════════
                GLOBAL CSS
            ════════════════════════════════════════════════════════ */}
            <style>{`

                /* ── Bento grid ───────────────────────────────────── */
                .sv-bento {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows:
                        clamp(195px, 18vw, 268px)
                        clamp(195px, 18vw, 268px)
                        clamp(185px, 17vw, 250px);
                    gap: 10px;
                }

                /* Feature card: 2 cols × 2 rows */
                .sc-bc--feat {
                    grid-column: span 2;
                    grid-row: span 2;
                }

                @media (max-width: 1024px) {
                    .sv-bento {
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: 300px repeat(3, 230px);
                    }
                    .sc-bc--feat {
                        grid-column: span 2;
                        grid-row: span 1;
                    }
                }

                @media (max-width: 600px) {
                    .sv-bento {
                        grid-template-columns: 1fr;
                        grid-template-rows: none;
                        grid-auto-rows: 260px;
                        gap: 8px;
                    }
                    .sc-bc--feat {
                        grid-column: 1;
                        grid-row: auto;
                        height: 330px;
                    }
                }

                /* ════════════════════════════════════════════════════
                   CARD BASE (shared)
                ════════════════════════════════════════════════════ */
                .sc-bc {
                    position: relative;
                    overflow: hidden;
                    border-radius: 16px;
                    transform: translateZ(0);
                    will-change: transform;
                }

                /* ── Background image ── */
                .sc-bc-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.70s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    will-change: transform;
                }

                /* ── Text content block ── */
                .sc-bc-body {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
                }

                /* ════════════════════════════════════════════════════
                   FEATURE CARD (dark photo, white text overlay)
                ════════════════════════════════════════════════════ */
                .sc-bc--feat {
                    background: #060a0f;
                    box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
                }

                /* Feature: image fills the full card */
                .sc-bc--feat .sc-bc-img {
                    object-fit: cover;
                    object-position: center;
                }

                /* Feature: dark gradient for text legibility */
                .sc-bc--feat .sc-bc-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.88) 0%,
                        rgba(0, 0, 0, 0.52) 32%,
                        rgba(0, 0, 0, 0.14) 62%,
                        rgba(0, 0, 0, 0.02) 100%
                    );
                    transition: background 0.45s ease;
                }

                /* Feature: body at bottom-left with generous padding */
                .sc-bc--feat .sc-bc-body {
                    padding: 1.75rem 2rem 2rem;
                }

                /* Feature: badge */
                .sc-bc-badge {
                    display: inline-block;
                    font-family: var(--font-sans);
                    font-size: 0.575rem;
                    font-weight: 600;
                    letter-spacing: 0.20em;
                    text-transform: uppercase;
                    color: var(--clr-accent);
                    background: rgba(140, 180, 184, 0.12);
                    border: 1px solid rgba(140, 180, 184, 0.38);
                    padding: 0.28rem 0.7rem;
                    border-radius: 9999px;
                    margin-bottom: 0.65rem;
                }

                /* Feature: title — large serif */
                .sc-bc--feat .sc-bc-title {
                    font-family: var(--font-serif);
                    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
                    font-weight: 400;
                    line-height: 1.13;
                    letter-spacing: -0.015em;
                    color: rgba(255, 255, 255, 0.97);
                    margin: 0 0 0.65rem;
                }

                /* Feature: description */
                .sc-bc--feat .sc-bc-desc {
                    font-family: var(--font-sans);
                    font-size: 0.875rem;
                    font-weight: 300;
                    line-height: 1.75;
                    color: rgba(255, 255, 255, 0.58);
                    margin: 0;
                    max-width: 440px;
                }

                /* ════════════════════════════════════════════════════
                   SMALL CARDS (light cream bg, product centered)
                ════════════════════════════════════════════════════ */
                .sc-bc--sm {
                    /* Warm off-white — premium, not harsh white */
                    background: #f0eeeb;
                    /* Subtle border so card edge is clear on dark page bg */
                    box-shadow:
                        0 0 0 1px rgba(0,0,0,0.06),
                        0 4px 20px rgba(0,0,0,0.10);
                }

                /* Small: image sits in upper 65% of card, contained (product visible) */
                .sc-bc--sm .sc-bc-img {
                    object-fit: contain;
                    object-position: center 38%;
                    /* Give padding so product doesn't bleed to edges */
                    padding: 12% 12% 35%;
                }

                /* Small: no overlay — light bg needs no text veil */
                .sc-bc--sm .sc-bc-overlay {
                    display: none;
                }

                /* Small: bottom strip — subtle fade from bg colour for readability */
                .sc-bc--sm .sc-bc-body {
                    padding: 0.9rem 1.25rem 1.25rem;
                    background: linear-gradient(
                        to top,
                        #f0eeeb 0%,
                        #f0eeeb 72%,
                        rgba(240, 238, 235, 0) 100%
                    );
                }

                /* Small: card number — top-right, charcoal */
                .sc-bc--sm .sc-bc-num {
                    color: rgba(10, 10, 15, 0.28);
                }

                /* Small: title — dark charcoal */
                .sc-bc--sm .sc-bc-title {
                    font-family: var(--font-serif);
                    font-size: clamp(0.95rem, 1.25vw, 1.12rem);
                    font-weight: 400;
                    line-height: 1.2;
                    letter-spacing: -0.005em;
                    color: rgba(10, 10, 15, 0.90);
                    margin: 0 0 0.3rem;
                }

                /* Small: description — muted dark */
                .sc-bc--sm .sc-bc-desc {
                    font-family: var(--font-sans);
                    font-size: 0.76rem;
                    font-weight: 400;
                    line-height: 1.6;
                    color: rgba(10, 10, 15, 0.50);
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* ── Corner number (shared) ── */
                .sc-bc-num {
                    position: absolute;
                    top: 1rem;
                    right: 1.125rem;
                    font-family: var(--font-sans);
                    font-size: 0.58rem;
                    font-weight: 400;
                    letter-spacing: 0.14em;
                    line-height: 1;
                    pointer-events: none;
                    user-select: none;
                    /* feature card colour set inline; sm overridden above */
                    color: rgba(255,255,255,0.28);
                }

                /* ════════════════════════════════════════════════════
                   HOVER INTERACTIONS — pointer devices only
                ════════════════════════════════════════════════════ */
                @media (hover: hover) {

                    /* Feature card: image zooms, overlay darkens, text lifts */
                    .sc-bc--feat:hover .sc-bc-img {
                        transform: scale(1.05);
                    }
                    .sc-bc--feat:hover .sc-bc-overlay {
                        background: linear-gradient(
                            to top,
                            rgba(0,0,0,0.94) 0%,
                            rgba(0,0,0,0.65) 34%,
                            rgba(0,0,0,0.22) 64%,
                            rgba(0,0,0,0.06) 100%
                        );
                    }
                    .sc-bc--feat:hover .sc-bc-body {
                        transform: translateY(-7px);
                    }

                    /* Small cards: product floats up slightly */
                    .sc-bc--sm:hover .sc-bc-img {
                        transform: translateY(-6px) scale(1.03);
                    }
                    .sc-bc--sm:hover {
                        box-shadow:
                            0 0 0 1px rgba(0,0,0,0.08),
                            0 14px 40px rgba(0,0,0,0.16);
                    }
                }

            `}</style>

            {/* ── Subtle ambient orbs ──────────────────────────────── */}
            <div aria-hidden="true" style={{
                position: "absolute", top: "-15%", left: "-8%",
                width: "52vw", height: "52vw",
                maxWidth: "600px", maxHeight: "600px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(140,180,184,0.05) 0%, transparent 65%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />
            <div aria-hidden="true" style={{
                position: "absolute", bottom: "-10%", right: "-8%",
                width: "46vw", height: "46vw",
                maxWidth: "520px", maxHeight: "520px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 65%)",
                filter: "blur(65px)", pointerEvents: "none",
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
                    textAlign:    "center",
                    marginBottom: "clamp(2.25rem, 4.5vw, 3.5rem)",
                }}>
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
                            {label}
                        </span>
                        <span style={{
                            display: "inline-block", width: "22px", height: "1px",
                            background: "var(--clr-accent)",
                        }} />
                    </div>

                    <h2 ref={headingRef} style={{
                        fontFamily:    "var(--font-serif)",
                        fontSize:      "clamp(1.9rem, 4vw, 3.4rem)",
                        fontWeight:    300,
                        lineHeight:    1.08,
                        letterSpacing: "-0.025em",
                        color:         "var(--clr-mist)",
                        maxWidth:      "620px",
                        margin:        "0 auto 1rem",
                        whiteSpace:    "pre-line",
                    }}>
                        {heading}
                    </h2>

                    <p ref={subtextRef} style={{
                        fontFamily: "var(--font-sans)",
                        fontSize:   "clamp(0.875rem, 1.05vw, 0.95rem)",
                        fontWeight: 300,
                        lineHeight: 1.85,
                        color:      "rgba(245,244,240,0.42)",
                        maxWidth:   "460px",
                        margin:     "0 auto",
                    }}>
                        {subtext}
                    </p>
                </header>

                {/* ── Bento grid ────────────────────────────────────── */}
                <div className="sv-bento">
                    {SERVICES.map((service, i) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={i}
                            featured={service.featured}
                            ref={(el) => { cardsRef.current[i] = el; }}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
