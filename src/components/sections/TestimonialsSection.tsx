"use client";

/**
 * TestimonialsSection.tsx
 *
 * 3-column testimonial grid — premium dark glass-panel design.
 *
 * Structure:
 *   1. Section header — label / heading / subtext
 *   2. 3 × TestimonialCard (teal / gold / teal alternating)
 *
 * Design decisions:
 *   - Card bg: subtle diagonal gradient (darker than page bg, not flat)
 *   - Large faint quotation mark as decorative watermark
 *   - Star rating row with accent colour
 *   - Avatar: initial letter in accent-tinted circle
 *   - Hover: translateY(-6px) + border glow (teal or gold depending on card)
 *   - Divider: single 1px line between quote and author
 *   - Ambient orbs mirror ServicesSection for visual continuity
 */

import React, { useRef } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildTestimonialsTimeline } from "@/animations/testimonialsTimeline";
import TestimonialCard, { type TestimonialData } from "./TestimonialCard";

// ── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS_ROW1: TestimonialData[] = [
    {
        id:      "ramesh",
        quote:   "Everything from lighting to curtains is now automated. It feels like living in the future.",
        name:    "Ramesh K.",
        city:    "Bangalore",
        rating:  5,
        initial: "R",
        accent:  "teal",
    },
    {
        id:      "priya",
        quote:   "The installation was smooth and required no rewiring. Highly professional team.",
        name:    "Priya S.",
        city:    "Chennai",
        rating:  5,
        initial: "P",
        accent:  "gold",
    },
    {
        id:      "neha",
        quote:   "The smart security features give me unparalleled peace of mind when traveling.",
        name:    "Neha C.",
        city:    "Mumbai",
        rating:  5,
        initial: "N",
        accent:  "teal",
    },
    {
        id:      "sameer",
        quote:   "Setting up routines for movie nights and mornings is absolutely brilliant.",
        name:    "Sameer R.",
        city:    "Pune",
        rating:  5,
        initial: "S",
        accent:  "gold",
    },
];

const TESTIMONIALS_ROW2: TestimonialData[] = [
    {
        id:      "arjun",
        quote:   "Controlling my home with voice and app is seamless. The system works flawlessly.",
        name:    "Arjun M.",
        city:    "Hyderabad",
        rating:  5,
        initial: "A",
        accent:  "teal",
    },
    {
        id:      "vikram",
        quote:   "Incredible aesthetic. The switches look gorgeous and function flawlessly.",
        name:    "Vikram T.",
        city:    "Delhi",
        rating:  5,
        initial: "V",
        accent:  "gold",
    },
    {
        id:      "anjali",
        quote:   "We love how it integrates seamlessly with our existing smart devices. Magic!",
        name:    "Anjali D.",
        city:    "Kochi",
        rating:  5,
        initial: "A",
        accent:  "teal",
    },
    {
        id:      "rohan",
        quote:   "The touch panels are futuristic and so intuitive. Highly recommend!",
        name:    "Rohan B.",
        city:    "Ahmedabad",
        rating:  5,
        initial: "R",
        accent:  "gold",
    },
];


// ── Component ────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef   = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

    useScrollTimeline(buildTestimonialsTimeline, {
        section: sectionRef,
        label:   labelRef,
        heading: headingRef,
        subtext: subtextRef,
        cards:   cardsRef,
    });

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            aria-label="Testimonials"
            style={{
                position:   "relative",
                background: "var(--clr-void)",
                borderTop:  "1px solid rgba(245,244,240,0.05)",
                overflow:   "hidden",
            }}
        >

            {/* ── All CSS in one block — no per-card duplication ──── */}
            <style>{`

                /* ════════════════════════════════════════════════
                   MARQUEE
                ════════════════════════════════════════════════ */
                .tm-marquee-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    position: relative;
                    width: 100vw;
                    left: 50%;
                    transform: translateX(-50%);
                    overflow: hidden;
                    padding: 1rem 0;
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }

                .tm-marquee-row {
                    display: flex;
                    width: max-content;
                    gap: 1.25rem;
                    padding-right: 1.25rem;
                    animation: scroll-h 55s linear infinite;
                    will-change: transform;
                }

                .tm-marquee-row.reverse {
                    animation-direction: reverse;
                }

                .tm-marquee-row:hover {
                    animation-play-state: paused;
                }

                @keyframes scroll-h {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                /* ════════════════════════════════════════════════
                   CARD BASE
                ════════════════════════════════════════════════ */
                .tc-card {
                    width: 380px;
                    max-width: 85vw;
                    flex-shrink: 0;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 2rem 1.875rem 1.875rem;
                    border-radius: 14px;
                    background: linear-gradient(
                        145deg,
                        rgba(26, 27, 38, 0.80) 0%,
                        rgba(16, 16, 24, 0.65) 100%
                    );
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(245, 244, 240, 0.07);
                    overflow: hidden;
                    transition:
                        transform     0.38s cubic-bezier(0.22, 0.61, 0.36, 1),
                        border-color  0.38s ease,
                        box-shadow    0.38s ease;
                    will-change: transform;
                }

                /* Top-edge accent line — appears on hover */
                .tc-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 1px;
                    background: transparent;
                    transition: background 0.38s ease;
                    border-radius: 0 0 2px 2px;
                }

                /* ── Teal variant hover ── */
                .tc-card--teal:hover {
                    transform: translateY(-6px);
                    border-color: rgba(140, 180, 184, 0.30);
                    box-shadow:
                        0 28px 60px rgba(0, 0, 0, 0.38),
                        0  0   0 1px rgba(140, 180, 184, 0.14),
                        inset 0 1px 0 rgba(140, 180, 184, 0.07);
                }
                .tc-card--teal:hover::before {
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(140, 180, 184, 0.55),
                        transparent
                    );
                }

                /* ── Gold variant hover ── */
                .tc-card--gold:hover {
                    transform: translateY(-6px);
                    border-color: rgba(200, 169, 110, 0.30);
                    box-shadow:
                        0 28px 60px rgba(0, 0, 0, 0.38),
                        0  0   0 1px rgba(200, 169, 110, 0.14),
                        inset 0 1px 0 rgba(200, 169, 110, 0.07);
                }
                .tc-card--gold:hover::before {
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(200, 169, 110, 0.55),
                        transparent
                    );
                }

                /* ════════════════════════════════════════════════
                   DECORATIVE QUOTE MARK
                ════════════════════════════════════════════════ */
                .tc-quote-mark {
                    position: absolute;
                    top: -0.5rem;
                    right: 1.5rem;
                    font-family: var(--font-serif);
                    font-size: 7rem;
                    font-weight: 300;
                    line-height: 1;
                    color: rgba(245, 244, 240, 0.038);
                    pointer-events: none;
                    user-select: none;
                    letter-spacing: -0.04em;
                    transition: color 0.38s ease;
                }
                .tc-card:hover .tc-quote-mark {
                    color: rgba(245, 244, 240, 0.06);
                }

                /* ════════════════════════════════════════════════
                   QUOTE TEXT
                ════════════════════════════════════════════════ */
                .tc-quote {
                    flex: 1;
                    margin: 0 0 1.5rem;
                }
                .tc-quote p {
                    font-family: var(--font-serif);
                    font-size: clamp(1rem, 1.25vw, 1.15rem);
                    font-weight: 400;
                    font-style: normal;
                    line-height: 1.7;
                    letter-spacing: 0.005em;
                    color: rgba(245, 244, 240, 0.88);
                    margin: 0;
                }

                /* ════════════════════════════════════════════════
                   DIVIDER
                ════════════════════════════════════════════════ */
                .tc-divider {
                    width: 100%;
                    height: 1px;
                    background: rgba(245, 244, 240, 0.07);
                    margin-bottom: 1.25rem;
                }

                /* ════════════════════════════════════════════════
                   AUTHOR ROW
                ════════════════════════════════════════════════ */
                .tc-author {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                }

                /* Avatar circle */
                .tc-avatar {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-family: var(--font-serif);
                    font-size: 1rem;
                    font-weight: 400;
                    /* color and background set inline from card props */
                }

                /* Name */
                .tc-name {
                    display: block;
                    font-family: var(--font-sans);
                    font-size: 0.84rem;
                    font-weight: 500;
                    letter-spacing: 0.01em;
                    color: rgba(245, 244, 240, 0.90);
                    margin-bottom: 0.15rem;
                }

                /* City */
                .tc-city {
                    display: block;
                    font-family: var(--font-sans);
                    font-size: 0.72rem;
                    font-weight: 400;
                    letter-spacing: 0.06em;
                    color: rgba(245, 244, 240, 0.38);
                    text-transform: uppercase;
                }

            `}</style>

            {/* ── Ambient orbs — teal left, gold right ────────────── */}
            <div aria-hidden="true" style={{
                position: "absolute", top: "-10%", left: "-5%",
                width: "45vw", height: "45vw",
                maxWidth: "560px", maxHeight: "560px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(140,180,184,0.055) 0%, transparent 65%)",
                filter: "blur(56px)", pointerEvents: "none",
            }} />
            <div aria-hidden="true" style={{
                position: "absolute", bottom: "-8%", right: "-5%",
                width: "42vw", height: "42vw",
                maxWidth: "500px", maxHeight: "500px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,169,110,0.042) 0%, transparent 65%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />

            {/* ── Inner container ──────────────────────────────────── */}
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

                {/* ── Section header ───────────────────────────────── */}
                <header style={{
                    textAlign:    "center",
                    marginBottom: "clamp(2.5rem, 5vw, 4rem)",
                }}>
                    {/* Label */}
                    <div ref={labelRef} style={{
                        display: "inline-flex", alignItems: "center",
                        gap: "0.65rem", marginBottom: "1.25rem",
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
                            Testimonials
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
                        maxWidth:      "680px",
                        margin:        "0 auto 1rem",
                    }}>
                        Trusted by Homeowners Who Value Smart Living
                    </h2>

                    {/* Subtext */}
                    <p ref={subtextRef} style={{
                        fontFamily: "var(--font-sans)",
                        fontSize:   "clamp(0.875rem, 1.05vw, 0.95rem)",
                        fontWeight: 300,
                        lineHeight: 1.85,
                        color:      "rgba(245,244,240,0.42)",
                        maxWidth:   "420px",
                        margin:     "0 auto",
                    }}>
                        Real experiences from clients who transformed their homes.
                    </p>
                </header>

                {/* ── Marquee container ─────────────────────────────────────── */}
                <div className="tm-marquee-container">
                    <div 
                        className="tm-marquee-row" 
                        ref={(el) => { cardsRef.current[0] = el; }}
                    >
                        {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((t, i) => (
                            <TestimonialCard
                                key={`row1-${t.id}-${i}`}
                                testimonial={t}
                            />
                        ))}
                    </div>

                    <div 
                        className="tm-marquee-row reverse" 
                        ref={(el) => { cardsRef.current[1] = el; }}
                    >
                        {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                            <TestimonialCard
                                key={`row2-${t.id}-${i}`}
                                testimonial={t}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
