"use client";

/**
 * TestimonialCard.tsx
 *
 * Single testimonial card — glass-panel dark surface.
 *   - Large opening quote mark (decorative, faint)
 *   - Quote body text
 *   - Star rating row
 *   - Author avatar initial + name + city
 *   - Hover: subtle lift + teal border glow
 *
 * All CSS lives in TestimonialsSection to avoid per-card duplication.
 * Uses forwardRef so the parent can attach GSAP stagger refs.
 */

import React from "react";

export interface TestimonialData {
    id:     string;
    quote:  string;
    name:   string;
    city:   string;
    /** 1–5 */
    rating: number;
    /** Single uppercase letter used as avatar */
    initial: string;
    /** teal | gold — controls avatar + star accent colour */
    accent: "teal" | "gold";
}

interface TestimonialCardProps {
    testimonial: TestimonialData;
}

// ── 5-star row ──────────────────────────────────────────────────────────────
function StarRow({ rating, accent }: { rating: number; accent: "teal" | "gold" }) {
    const color = accent === "teal" ? "var(--clr-accent)" : "var(--clr-gold)";
    return (
        <div style={{ display: "flex", gap: "3px", marginBottom: "1.25rem" }} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg
                    key={i}
                    width="13" height="13"
                    viewBox="0 0 24 24"
                    fill={i < rating ? color : "none"}
                    stroke={i < rating ? color : "rgba(245,244,240,0.2)"}
                    strokeWidth="1.5"
                    aria-hidden="true"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

// ── Component ───────────────────────────────────────────────────────────────
const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
    ({ testimonial }, ref) => {
        const { quote, name, city, rating, initial, accent } = testimonial;
        const accentColor = accent === "teal" ? "var(--clr-accent)" : "var(--clr-gold)";

        return (
            <article
                ref={ref}
                className={`tc-card tc-card--${accent}`}
                aria-label={`Testimonial from ${name}`}
            >
                {/* Decorative opening quote mark */}
                <span className="tc-quote-mark" aria-hidden="true">&ldquo;</span>

                {/* Star rating */}
                <StarRow rating={rating} accent={accent} />

                {/* Quote body */}
                <blockquote className="tc-quote">
                    <p>{quote}</p>
                </blockquote>

                {/* Divider */}
                <div className="tc-divider" aria-hidden="true" />

                {/* Author */}
                <div className="tc-author">
                    {/* Avatar circle */}
                    <div
                        className="tc-avatar"
                        style={{
                            background: accent === "teal"
                                ? "rgba(140,180,184,0.14)"
                                : "rgba(200,169,110,0.14)",
                            border: `1px solid ${accentColor}`,
                            color: accentColor,
                        }}
                        aria-hidden="true"
                    >
                        {initial}
                    </div>
                    {/* Name + city */}
                    <div>
                        <span className="tc-name">{name}</span>
                        <span className="tc-city">{city}</span>
                    </div>
                </div>
            </article>
        );
    }
);

TestimonialCard.displayName = "TestimonialCard";
export default TestimonialCard;
