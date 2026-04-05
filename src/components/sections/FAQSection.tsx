"use client";

/**
 * FAQSection.tsx
 *
 * Premium accordion FAQ that removes purchase objections.
 *
 * Design:
 *   - Each FAQ item = full-width row with question + expand icon
 *   - Animated height expansion (CSS max-height + opacity)
 *   - Teal accent on active row (left strip brightens, question colour shifts)
 *   - Only ONE item open at a time (accordion behaviour)
 *   - Subtle hover state on closed rows
 *   - Divider lines between items (no heavy card boxing — keeps it clean)
 *
 * Layout:
 *   Desktop + Mobile → single column, full-width
 *   Max-width: 860px (centred) — keeps long text comfortable to read
 *
 * Animation:
 *   - Header: GSAP scroll-reveal (useScrollTimeline pattern)
 *   - FAQ rows: CSS transition only (no GSAP needed for simple toggle)
 *   - Expand icon: CSS rotate 0° → 45° (plus → close feel)
 */

import React, { useRef, useState } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildFAQTimeline } from "@/animations/faqTimeline";

// ── FAQ data ─────────────────────────────────────────────────────────────────

interface FAQItem {
    id:       string;
    question: string;
    answer:   string;
}

const FAQS: FAQItem[] = [
    {
        id:       "cost",
        question: "How much does home automation cost?",
        answer:   "It depends on your requirements — the number of rooms, devices, and features you need. We don't believe in one-size-fits-all pricing. After a free consultation and site assessment, we provide a fully itemised custom quote with no hidden costs.",
    },
    {
        id:       "remote",
        question: "Can I control my home remotely?",
        answer:   "Yes. You can control lighting, fans, curtains, and appliances from anywhere in the world using our mobile app. As long as your home has an internet connection, full remote control is available 24/7.",
    },
    {
        id:       "voice",
        question: "Does it work with Alexa or Google?",
        answer:   "Yes. Our systems support all major voice assistants — Amazon Alexa, Google Home, and Apple HomeKit. You can use voice commands to control individual devices or trigger full-home scenes like 'Good Morning' or 'Movie Mode'.",
    },
    {
        id:       "installation",
        question: "Is installation complicated?",
        answer:   "Not at all. Our retrofit system is designed to work with your existing wiring — no civil work, no drilling, no rewiring. Our certified technicians handle everything from installation to configuration and handover.",
    },
];

// ── Expand/collapse icon ──────────────────────────────────────────────────────

function PlusIcon({ open }: { open: boolean }) {
    return (
        <svg
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
            style={{
                flexShrink: 0,
                transition: "transform 0.38s cubic-bezier(0.22, 0.61, 0.36, 1)",
                transform:  open ? "rotate(45deg)" : "rotate(0deg)",
            }}
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
        </svg>
    );
}

// ── Single accordion row ──────────────────────────────────────────────────────

function FAQRow({ item, isOpen, onToggle }: {
    item:     FAQItem;
    isOpen:   boolean;
    onToggle: () => void;
}) {
    return (
        <div
            className={`faq-row ${isOpen ? "faq-row--open" : ""}`}
            aria-expanded={isOpen}
        >
            {/* Question button ─────────────────────────────────── */}
            <button
                className="faq-q"
                onClick={onToggle}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-btn-${item.id}`}
                type="button"
            >
                <span className="faq-q-text">{item.question}</span>
                <span className="faq-icon-wrap" aria-hidden="true">
                    <PlusIcon open={isOpen} />
                </span>
            </button>

            {/* Answer panel ────────────────────────────────────── */}
            <div
                className="faq-a-wrap"
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
            >
                <p className="faq-a-text">{item.answer}</p>
            </div>
        </div>
    );
}

// ── Section component ─────────────────────────────────────────────────────────

export default function FAQSection() {
    const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

    const sectionRef = useRef<HTMLElement>(null);
    const labelRef   = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const listRef    = useRef<HTMLDivElement>(null);

    useScrollTimeline(buildFAQTimeline, {
        section: sectionRef,
        label:   labelRef,
        heading: headingRef,
        subtext: subtextRef,
        list:    listRef,
    });

    const toggle = (id: string) =>
        setOpenId((prev) => (prev === id ? null : id));

    return (
        <section
            ref={sectionRef}
            id="faq"
            aria-label="Frequently Asked Questions"
            style={{
                position:   "relative",
                background: "var(--clr-deep)",
                borderTop:  "1px solid rgba(245,244,240,0.05)",
                overflow:   "hidden",
            }}
        >

            {/* ── All CSS ─────────────────────────────────────────── */}
            <style>{`

                /* ── Accordion list ── */
                .faq-list {
                    max-width: 860px;
                    margin: 0 auto;
                }

                /* ── Row ── */
                .faq-row {
                    position: relative;
                    border-bottom: 1px solid rgba(245, 244, 240, 0.07);
                    /* Left accent strip — always present, dims when closed */
                }
                .faq-row::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 2px;
                    background: var(--clr-accent);
                    opacity: 0;
                    transition: opacity 0.32s ease;
                    border-radius: 0 2px 2px 0;
                }
                .faq-row--open::before,
                .faq-row:hover::before {
                    opacity: 0.55;
                }
                .faq-row--open::before {
                    opacity: 1;
                }

                /* ── Question button ── */
                .faq-q {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.25rem;
                    width: 100%;
                    padding: 1.5rem 0 1.5rem 1.25rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    transition: background 0.25s ease;
                }
                .faq-q:hover {
                    background: rgba(245, 244, 240, 0.018);
                }

                .faq-q-text {
                    font-family: var(--font-serif);
                    font-size: clamp(1rem, 1.3vw, 1.15rem);
                    font-weight: 400;
                    line-height: 1.3;
                    letter-spacing: -0.005em;
                    color: rgba(245, 244, 240, 0.80);
                    transition: color 0.30s ease;
                }
                .faq-row--open .faq-q-text {
                    color: rgba(245, 244, 240, 0.97);
                }

                /* ── Expand icon container ── */
                .faq-icon-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid rgba(245, 244, 240, 0.10);
                    flex-shrink: 0;
                    color: rgba(245, 244, 240, 0.45);
                    transition:
                        background     0.32s ease,
                        border-color   0.32s ease,
                        color          0.32s ease;
                }
                .faq-row--open .faq-icon-wrap {
                    background:     rgba(140, 180, 184, 0.10);
                    border-color:   rgba(140, 180, 184, 0.35);
                    color:          var(--clr-accent);
                }

                /* ── Answer panel — CSS height animation ── */
                .faq-a-wrap {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows 0.42s cubic-bezier(0.22, 0.61, 0.36, 1);
                    overflow: hidden;
                }
                .faq-row--open .faq-a-wrap {
                    grid-template-rows: 1fr;
                }

                /* Inner wrapper needed for grid-template-rows trick */
                .faq-a-text {
                    overflow: hidden;
                    font-family: var(--font-sans);
                    font-size: 0.9rem;
                    font-weight: 300;
                    line-height: 1.85;
                    color: rgba(245, 244, 240, 0.50);
                    padding: 0 4rem 1.5rem 1.25rem;
                    margin: 0;
                }

                @media (max-width: 600px) {
                    .faq-q      { padding: 1.25rem 0 1.25rem 1rem; }
                    .faq-a-text { padding: 0 1rem 1.25rem 1rem; }
                }

            `}</style>

            {/* ── Ambient orbs ─────────────────────────────────────── */}
            <div aria-hidden="true" style={{
                position: "absolute", top: "-14%", left: "-5%",
                width: "40vw", height: "40vw",
                maxWidth: "480px", maxHeight: "480px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(140,180,184,0.048) 0%, transparent 65%)",
                filter: "blur(55px)", pointerEvents: "none",
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
                    marginBottom: "clamp(2.5rem, 5vw, 4rem)",
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
                            FAQ
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
                        maxWidth:      "560px",
                        margin:        "0 auto 1rem",
                    }}>
                        Questions We Hear Most Often
                    </h2>

                    {/* Subtext */}
                    <p ref={subtextRef} style={{
                        fontFamily: "var(--font-sans)",
                        fontSize:   "clamp(0.875rem, 1.05vw, 0.95rem)",
                        fontWeight: 300,
                        lineHeight: 1.85,
                        color:      "rgba(245,244,240,0.42)",
                        maxWidth:   "400px",
                        margin:     "0 auto",
                    }}>
                        Everything you need to know before getting started.
                    </p>
                </header>

                {/* ── FAQ accordion list ───────────────────────────── */}
                <div ref={listRef} className="faq-list">
                    {/* Top border for the first row */}
                    <div style={{
                        height:     "1px",
                        background: "rgba(245,244,240,0.07)",
                        marginBottom: 0,
                    }} aria-hidden="true" />

                    {FAQS.map((item) => (
                        <FAQRow
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </div>

                {/* ── Nudge below ─────────────────────────────────── */}
                <p style={{
                    textAlign:  "center",
                    marginTop:  "clamp(2rem, 4vw, 3rem)",
                    fontFamily: "var(--font-sans)",
                    fontSize:   "0.82rem",
                    fontWeight: 300,
                    color:      "rgba(245,244,240,0.35)",
                }}>
                    Still have questions?{" "}
                    <a
                        href="/contact"
                        id="faq-contact-link"
                        style={{
                            color:          "var(--clr-accent)",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                        }}
                    >
                        Talk to our team →
                    </a>
                </p>

            </div>
        </section>
    );
}
