"use client";

/**
 * HeroText.tsx
 *
 * Renders the hero headline, subline, CTA, and scroll hint.
 * Receives refs for GSAP entry animation.
 * No animation logic lives here.
 */

import React from "react";

interface HeroTextProps {
    textRef: React.RefObject<HTMLDivElement | null>;
    badgeRef: React.RefObject<HTMLSpanElement | null>;
    headlineLinesRef: React.RefObject<HTMLSpanElement[]>;
    sublineRef: React.RefObject<HTMLParagraphElement | null>;
    ctaRef: React.RefObject<HTMLAnchorElement | null>;
    scrollHintRef: React.RefObject<HTMLDivElement | null>;
    headline: string[];
    subline: string;
    ctaLabel: string;
    ctaHref: string;
    scrollHint: string;
}

export default function HeroText({
    textRef,
    badgeRef,
    headlineLinesRef,
    sublineRef,
    ctaRef,
    scrollHintRef,
    headline,
    subline,
    ctaLabel,
    ctaHref,
    scrollHint,
}: HeroTextProps) {
    const assignHeadlineRef = (el: HTMLSpanElement | null, index: number) => {
        if (headlineLinesRef.current && el) {
            headlineLinesRef.current[index] = el;
        }
    };

    return (
        <div
            ref={textRef}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        >
            {/* Badge — frosted glass pill */}
            <span
                ref={badgeRef}
                style={{
                    display:        "inline-flex",
                    alignItems:     "center",
                    gap:            "0.5rem",
                    marginBottom:   "2rem",
                    padding:        "0.35rem 1.1rem",
                    borderRadius:   "9999px",
                    border:         "1px solid rgba(255,255,255,0.25)",
                    background:     "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    fontFamily:     "var(--font-sans)",
                    fontSize:       "0.68rem",
                    fontWeight:     500,
                    letterSpacing:  "0.2em",
                    textTransform:  "uppercase",
                    color:          "var(--clr-accent)",
                }}
            >
                <span
                    style={{
                        width:        6,
                        height:       6,
                        borderRadius: "50%",
                        background:   "var(--clr-accent)",
                        display:      "inline-block",
                        flexShrink:   0,
                    }}
                />
                Home Automation Systems
            </span>

            {/* Headline */}
            <h1
                className="overflow-hidden"
                style={{ lineHeight: 1.05 }}
            >
                {headline.map((line, i) => (
                    <span
                        key={i}
                        ref={(el) => assignHeadlineRef(el, i)}
                        className="block"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.5rem, 10vw, 9rem)",
                            fontWeight: 500,
                            letterSpacing: "-0.02em",
                            color: "var(--clr-mist)",
                            willChange: "opacity, transform",
                        }}
                    >
                        {line}
                    </span>
                ))}
            </h1>

            {/* Subline */}
            <p
                ref={sublineRef}
                className="mt-8 max-w-[520px] mx-auto leading-relaxed"
                style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                    color: "var(--clr-text-secondary)",
                }}
            >
                {subline}
            </p>

            {/* CTA — single-page mode, no routing */}
            <button
                type="button"
                ref={ctaRef as React.Ref<HTMLButtonElement>}
                className="mt-10 inline-flex items-center"
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
                    WebkitBackdropFilter: "blur(12px)",
                    cursor: "pointer",
                    transition: "opacity 0.25s ease",
                    whiteSpace: "nowrap",
                }}
            >
                <span>{ctaLabel}</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Scroll Hint */}
            <div
                ref={scrollHintRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{
                    color: "var(--clr-text-muted)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                }}
            >
                <span>{scrollHint}</span>
                <svg
                    className="scroll-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ willChange: "transform" }}
                >
                    <path
                        d="M7 2v10M3 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}
