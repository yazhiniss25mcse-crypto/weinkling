"use client";

/**
 * StatsBar.tsx
 *
 * A compact, full-width credibility band that sits just below the Hero.
 * Communicates key social-proof numbers at a glance before any scroll.
 *
 * Design:
 *   - Horizontal row of 4 stats, separated by subtle vertical dividers
 *   - Each stat: large animated counter + unit + label
 *   - Dark glass-panel surface — slightly elevated from the void bg
 *   - Top/bottom 1px borders for visual separation from adjacent sections
 *   - Counter animation: counts up from 0 when scrolled into view (GSAP)
 *
 * Layout:
 *   Desktop → 4 columns in one row
 *   Tablet  → 2 × 2 grid
 *   Mobile  → 2 × 2 grid (smaller)
 *
 * No separate animation file needed — self-contained GSAP counter
 * inside useEffect (not useScrollTimeline pattern, since it's pure
 * number animation, not DOM reveal).
 */

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motionUtils";

// ── Stat data ─────────────────────────────────────────────────────────────────

interface StatItem {
    id:     string;
    value:  number;
    unit:   string;   // "+" | "%" | ""
    prefix: string;   // "₹" | "" etc.
    label:  string;
    accent: "teal" | "gold";
}

const STATS: StatItem[] = [
    {
        id:     "homes",
        value:  120,
        unit:   "+",
        prefix: "",
        label:  "Homes Automated",
        accent: "teal",
    },
    {
        id:     "cities",
        value:  8,
        unit:   "+",
        prefix: "",
        label:  "Cities Served",
        accent: "gold",
    },
    {
        id:     "satisfaction",
        value:  98,
        unit:   "%",
        prefix: "",
        label:  "Client Satisfaction",
        accent: "teal",
    },
    {
        id:     "rewiring",
        value:  0,
        unit:   "",
        prefix: "₹",
        label:  "Rewiring Cost",
        accent: "gold",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function StatsBar() {
    const sectionRef = useRef<HTMLElement>(null);
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);
        const reduced = prefersReducedMotion();

        const ctx = gsap.context(() => {

            // ── Section fade-up on enter ──────────────────────────────
            gsap.from(sectionRef.current, {
                opacity:  0,
                y:        reduced ? 0 : 32,
                duration: 0.9,
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start:   "top 88%",
                    once:    true,
                },
            });

            // ── Stat cards stagger in ─────────────────────────────────
            gsap.from(".sb-stat", {
                opacity:  0,
                y:        reduced ? 0 : 24,
                duration: 0.8,
                stagger:  0.1,
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start:   "top 85%",
                    once:    true,
                },
            });

            // ── Counters: count up from 0 ─────────────────────────────
            STATS.forEach((stat, i) => {
                const el = counterRefs.current[i];
                if (!el) return;

                if (reduced) {
                    el.textContent = String(stat.value);
                    return;
                }

                const obj = { val: 0 };
                gsap.to(obj, {
                    val:      stat.value,
                    duration: stat.value === 0 ? 0.1 : 1.6,
                    ease:     "power2.out",
                    delay:    i * 0.10,
                    onUpdate: () => {
                        el.textContent = String(Math.round(obj.val));
                    },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start:   "top 88%",
                        once:    true,
                    },
                });
            });
        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="stats"
            aria-label="Company statistics"
            style={{
                position:   "relative",
                background: "linear-gradient(180deg, rgba(16,16,26,0.95) 0%, rgba(12,12,20,0.98) 100%)",
                borderTop:    "1px solid rgba(245,244,240,0.06)",
                borderBottom: "1px solid rgba(245,244,240,0.06)",
            }}
        >
            <style>{`

                .sb-inner {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    max-width: 1380px;
                    margin: 0 auto;
                    padding: 0 clamp(1.25rem, 4.5vw, 3.5rem);
                }

                @media (max-width: 768px) {
                    .sb-inner {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* ── Each stat cell ── */
                .sb-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: clamp(2rem, 4vw, 3rem) 1.5rem;
                    position: relative;
                    transition: background 0.32s ease;
                }
                .sb-stat:hover {
                    background: rgba(245,244,240,0.012);
                }

                /* Vertical dividers between cells */
                .sb-stat:not(:first-child)::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 22%; bottom: 22%;
                    width: 1px;
                    background: rgba(245,244,240,0.07);
                }

                /* On mobile (2-col), remove right dividers on col 1 items
                   and add bottom dividers for top row */
                @media (max-width: 768px) {
                    .sb-stat:nth-child(2)::before { display: none; }
                    .sb-stat:nth-child(3)::before { display: none; }

                    .sb-stat:nth-child(1),
                    .sb-stat:nth-child(2) {
                        border-bottom: 1px solid rgba(245,244,240,0.07);
                    }

                    .sb-stat:nth-child(3)::after,
                    .sb-stat:nth-child(4)::after {
                        content: '';
                        position: absolute;
                        left: 0; top: 22%; bottom: 22%;
                        width: 1px;
                        background: rgba(245,244,240,0.07);
                    }
                    .sb-stat:nth-child(3)::after { display: none; }
                    .sb-stat:nth-child(4)::after { display: block; }
                }

                /* ── Number row ── */
                .sb-number {
                    display: flex;
                    align-items: baseline;
                    gap: 1px;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }

                .sb-prefix,
                .sb-counter,
                .sb-unit {
                    font-family: var(--font-sans);
                    font-weight: 300;
                    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
                    letter-spacing: -0.04em;
                    line-height: 1;
                }
                .sb-unit {
                    font-size: clamp(1.6rem, 3vw, 2.4rem);
                    letter-spacing: -0.02em;
                    margin-left: 1px;
                }

                /* Teal stat colour */
                .sb-stat--teal .sb-prefix,
                .sb-stat--teal .sb-counter,
                .sb-stat--teal .sb-unit {
                    color: var(--clr-mist);
                }
                .sb-stat--teal:hover .sb-counter {
                    color: var(--clr-accent);
                    transition: color 0.30s ease;
                }

                /* Gold stat colour */
                .sb-stat--gold .sb-prefix,
                .sb-stat--gold .sb-counter,
                .sb-stat--gold .sb-unit {
                    color: var(--clr-mist);
                }
                .sb-stat--gold:hover .sb-counter {
                    color: var(--clr-gold);
                    transition: color 0.30s ease;
                }

                /* ── Label ── */
                .sb-label {
                    font-family: var(--font-sans);
                    font-size: 0.72rem;
                    font-weight: 400;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(245,244,240,0.36);
                }

                /* ── Subtle dot accent above number (decorative) ── */
                .sb-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    margin-bottom: 0.75rem;
                    opacity: 0.60;
                }
                .sb-stat--teal .sb-dot { background: var(--clr-accent); }
                .sb-stat--gold .sb-dot { background: var(--clr-gold); }

            `}</style>

            <div className="sb-inner">
                {STATS.map((stat, i) => (
                    <div
                        key={stat.id}
                        className={`sb-stat sb-stat--${stat.accent}`}
                        aria-label={`${stat.prefix}${stat.value}${stat.unit} ${stat.label}`}
                    >
                        {/* Accent dot */}
                        <span className="sb-dot" aria-hidden="true" />

                        {/* Number */}
                        <div className="sb-number" aria-hidden="true">
                            {stat.prefix && (
                                <span className="sb-prefix">{stat.prefix}</span>
                            )}
                            <span
                                className="sb-counter"
                                ref={(el) => { counterRefs.current[i] = el; }}
                            >
                                0
                            </span>
                            {stat.unit && (
                                <span className="sb-unit">{stat.unit}</span>
                            )}
                        </div>

                        {/* Label */}
                        <span className="sb-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
