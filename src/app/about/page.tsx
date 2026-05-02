"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PHILOSOPHY = [
    {
        number: "01",
        title: "Precision Engineering",
        body: "Every system is specified down to the cable run, protocol, and latency tolerance. No guesswork, ever.",
    },
    {
        number: "02",
        title: "Invisible by Design",
        body: "The best technology is what you never notice — it simply makes your intention reality, every time.",
    },
    {
        number: "03",
        title: "Lifetime Partnership",
        body: "We don't install and disappear. Proactive monitoring, remote diagnostics, and white-glove support for decades.",
    },
    {
        number: "04",
        title: "Privacy-First Architecture",
        body: "Your data never leaves your property. Every system runs on a local processor — zero mandatory cloud dependency.",
    },
];

const PROCESS = [
    {
        num: "01",
        title: "Consultation",
        desc: "We listen first. A dedicated specialist visits your property and maps your vision to a system architecture.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2v4l.586-.586z" />
            </svg>
        ),
    },
    {
        num: "02",
        title: "Design",
        desc: "Our engineers draft a bespoke blueprint — wiring, control interfaces, scenes, and automation logic.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        num: "03",
        title: "Installation",
        desc: "Certified technicians deploy your system with zero disruption — no drilling, no drywall damage, no mess.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        num: "04",
        title: "Lifetime Support",
        desc: "24/7 remote monitoring, annual system health reviews, and a dedicated concierge on call.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
];

const STATS = [
    {
        target: 500, suffix: "+", label: "Luxury Homes",
        desc: "Projects delivered across residential and hospitality properties.",
    },
    {
        target: 10, suffix: "+", label: "Years of Craft",
        desc: "Over a decade designing systems that stand the test of time.",
    },
    {
        target: 98, suffix: "%", label: "Client Satisfaction",
        desc: "Measured through post-installation surveys, annually.",
    },
    {
        target: 0, suffix: "24/7", label: "Concierge Support",
        desc: "Round-the-clock access to your dedicated Weinkling specialist.",
    },
];

// ── Team data — map to /public/team images ─────────────────────────────────
// To add a new member: add an entry here + drop their image in /public/team/
const TEAM = [
    {
        name: "Name",
        role: "Title",
        image: "/team/member-4.jpeg",
        category: "Leadership",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-8.jpeg",
        category: "Leadership",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-7.jpeg",
        category: "Leadership",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-6.jpeg",
        category: "Leadership",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-2.jpeg",
        category: "Engineering",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-3.jpeg",
        category: "Engineering",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-5.jpeg",
        category: "Operations",
    },
    {
        name: "Name",
        role: "Title",
        image: "/team/member-1.jpeg",
        category: "Operations",
    },
];

// ── Reusable fade div ─────────────────────────────────────────────────────────
function Reveal({
    children,
    delay = 0,
    from = "bottom",
    className = "",
    style = {},
}: {
    children: React.ReactNode;
    delay?: number;
    from?: "bottom" | "left" | "right";
    className?: string;
    style?: React.CSSProperties;
}) {
    const { ref, visible } = useReveal();
    const translateMap = { bottom: "translateY(48px)", left: "translateX(-48px)", right: "translateX(48px)" };
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : translateMap[from],
                transition: `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
    const [ctaHover, setCtaHover] = useState(false);

    // Parallax for experience section
    const parallaxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handler = () => {
            if (!parallaxRef.current) return;
            const rect = parallaxRef.current.getBoundingClientRect();
            const progress = -rect.top / window.innerHeight;
            parallaxRef.current.style.setProperty("--parallax-y", `${progress * 80}px`);
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <>
            <Navbar />
            <main id="about-content" style={{ background: "#09090e" }}>

                {/* ══════════════════════════════════════════
                    1. HERO  — Editorial / Brand Story
                ══════════════════════════════════════════ */}
                <section id="abt-hero" style={{
                    position: "relative",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #07080f 0%, #0a0c16 45%, #080910 100%)",
                }}>
                    {/* ── Noise grain ── */}
                    <div className="noise-overlay" style={{ opacity: 0.7 }} />

                    {/* ── Ambient radial glow — left side ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute",
                        top: "20%", left: "-15%",
                        width: "70vw", height: "70vw",
                        maxWidth: "800px", maxHeight: "800px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.065) 0%, transparent 65%)",
                        filter: "blur(80px)",
                        pointerEvents: "none",
                    }} />
                    {/* ── Ambient radial glow — bottom right ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute",
                        bottom: "-10%", right: "-5%",
                        width: "50vw", height: "50vw",
                        maxWidth: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 65%)",
                        filter: "blur(100px)",
                        pointerEvents: "none",
                    }} />

                    {/* ── Large background year/number — purely decorative ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute",
                        right: "-2%",
                        bottom: "4%",
                        fontFamily: "var(--font-manrope)",
                        fontSize: "clamp(18rem, 26vw, 32rem)",
                        fontWeight: 300,
                        lineHeight: 0.85,
                        letterSpacing: "-0.05em",
                        color: "rgba(255,255,255,0.018)",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}>
                        W
                    </div>

                    {/* ── Main content ── */}
                    <div id="abt-hero-inner" style={{
                        position: "relative", zIndex: 2,
                        maxWidth: "1320px", width: "100%",
                        margin: "0 auto",
                        padding: "0 60px",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: "0 56px",
                        alignItems: "center",
                    }}>
                        {/* Vertical rule + rotated label */}
                        <div id="abt-hero-rule" style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            animation: "abt_fadeIn 1.2s 0.1s both",
                        }}>
                            <span style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.58rem",
                                fontWeight: 600,
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                                color: "rgba(140,180,184,0.5)",
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                            }}>
                                2014 — Present
                            </span>
                            <div style={{
                                width: "1px",
                                height: "clamp(120px, 18vh, 200px)",
                                background: "linear-gradient(to bottom, rgba(140,180,184,0.5), rgba(140,180,184,0.08))",
                            }} />
                            <div style={{
                                width: "5px", height: "5px",
                                borderRadius: "50%",
                                background: "var(--clr-accent)",
                                opacity: 0.6,
                            }} />
                        </div>

                        {/* Text block — left aligned */}
                        <div>
                            {/* Eyebrow */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: "14px",
                                marginBottom: "36px",
                                animation: "abt_fadeUp 0.9s 0.25s both",
                            }}>
                                <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)" }} />
                                <span style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.62rem", fontWeight: 600,
                                    letterSpacing: "0.3em", textTransform: "uppercase",
                                    color: "var(--clr-accent)",
                                }}>
                                    About Weinkling
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 style={{
                                fontFamily: "var(--font-manrope)",
                                fontSize: "clamp(3rem, 5.5vw, 5.8rem)",
                                fontWeight: 300,
                                lineHeight: 1.06,
                                letterSpacing: "-0.03em",
                                color: "#f5f4f0",
                                maxWidth: "820px",
                                marginBottom: "36px",
                                animation: "abt_fadeUp 1s 0.45s both",
                            }}>
                                We design intelligence<br />
                                into <em style={{
                                    fontStyle: "normal",
                                    color: "var(--clr-accent)",
                                }}>everyday living.</em>
                            </h1>

                            {/* Subtext + vertical separator */}
                            <div style={{
                                display: "flex", gap: "28px", alignItems: "flex-start",
                                animation: "abt_fadeUp 1s 0.65s both",
                            }}>
                                <div style={{
                                    width: "2px",
                                    minHeight: "72px",
                                    background: "linear-gradient(to bottom, var(--clr-accent), rgba(140,180,184,0.1))",
                                    flexShrink: 0,
                                    marginTop: "4px",
                                }} />
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                                    fontWeight: 300,
                                    lineHeight: 1.8,
                                    color: "rgba(245,244,240,0.48)",
                                    maxWidth: "540px",
                                }}>
                                    A team of engineers, designers, and thinkers redefining how modern homes function — seamlessly, invisibly, intelligently.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* ── Scroll indicator — bottom right ── */}
                    <div id="abt-scroll-indicator" style={{
                        position: "absolute", bottom: "40px", right: "60px",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                        animation: "abt_fadeIn 1s 1.2s both",
                        zIndex: 2,
                    }}>
                        <span style={{
                            fontFamily: "var(--font-sans)", fontSize: "0.58rem",
                            letterSpacing: "0.22em", textTransform: "uppercase",
                            color: "rgba(245,244,240,0.25)",
                            writingMode: "vertical-rl",
                        }}>Scroll</span>
                        <div style={{
                            width: "1px", height: "52px",
                            background: "linear-gradient(to bottom, rgba(140,180,184,0.5), transparent)",
                            animation: "abt_scrollPulse 2.2s ease-in-out infinite",
                        }} />
                    </div>

                    <style>{`
                        @keyframes abt_fadeUp {
                            from { opacity: 0; transform: translateY(32px); }
                            to   { opacity: 1; transform: none; }
                        }
                        @keyframes abt_fadeIn {
                            from { opacity: 0; }
                            to   { opacity: 1; }
                        }
                        @keyframes abt_scrollPulse {
                            0%, 100% { opacity: 0.35; transform: scaleY(0.65); transform-origin: top; }
                            50%       { opacity: 1;    transform: scaleY(1);    transform-origin: top; }
                        }

                        /* ═══════════════════════════════
                           ABOUT PAGE — MOBILE CSS
                        ═══════════════════════════════ */

                        /* ─ Hero ──────────────────────────── */
                        @media (max-width: 768px) {
                            #abt-hero {
                                min-height: auto;
                                padding-top: 120px;
                                padding-bottom: 80px;
                                align-items: flex-start;
                            }
                            #abt-hero-inner {
                                grid-template-columns: 1fr !important;
                                gap: 0 !important;
                                padding: 0 20px !important;
                            }
                            #abt-hero-rule { display: none !important; }
                            #abt-hero-stats {
                                flex-wrap: wrap;
                                gap: 0;
                                margin-top: 40px !important;
                            }
                            #abt-hero-stats > div {
                                padding-right: 24px !important;
                                margin-right: 24px !important;
                                min-width: 30%;
                            }
                            #abt-scroll-indicator { display: none !important; }

                            /* ─ Brand story ─────────────────── */
                            #abt-story {
                                grid-template-columns: 1fr !important;
                                gap: 40px !important;
                                padding: 72px 20px !important;
                            }
                            #abt-story-img {
                                height: 280px !important;
                                order: -1;
                            }

                            /* ─ Philosophy ──────────────────── */
                            #abt-philosophy {
                                padding: 72px 20px !important;
                            }
                            #abt-philosophy-grid {
                                grid-template-columns: 1fr !important;
                                gap: 16px !important;
                            }

                            /* ─ Stats ───────────────────────── */
                            #abt-stats-inner {
                                padding: 0 20px !important;
                            }
                            #abt-stats-inner > div:first-child > div {
                                margin-bottom: 32px !important;
                            }
                            #abt-stats-grid {
                                grid-template-columns: 1fr 1fr !important;
                                align-items: stretch !important;
                            }
                            /* Make every cell fill its grid row height equally */
                            #abt-stats-grid > div {
                                padding: 28px 16px !important;
                                margin: 0 !important;
                                border-right: none !important;
                                height: 100% !important;
                                box-sizing: border-box !important;
                                display: flex !important;
                                flex-direction: column !important;
                                align-items: center !important;
                                border-bottom: 1px solid rgba(255,255,255,0.06) !important;
                            }
                            /* Right column cells get a left border */
                            #abt-stats-grid > div:nth-child(2n) {
                                border-left: 1px solid rgba(255,255,255,0.06) !important;
                            }
                            /* Remove bottom border on last row */
                            #abt-stats-grid > div:nth-last-child(-n+2) {
                                border-bottom: none !important;
                            }

                            /* ─ Team (already responsive via .team-grid) ── */
                            #abt-team-inner {
                                padding: 0 20px !important;
                            }

                            /* ─ CTA ─────────────────────────── */
                            #abt-cta {
                                padding: 100px 20px !important;
                            }
                        }

                        @media (max-width: 480px) {
                            #abt-hero-inner h1 {
                                font-size: clamp(2.4rem,9vw,3rem) !important;
                            }
                            #abt-story {
                                padding: 60px 16px !important;
                            }
                            #abt-stats-grid {
                                grid-template-columns: 1fr 1fr !important;
                            }
                            /* Stack stats to 2x2 on very small */
                            #abt-hero-stats > div {
                                border-right: none !important;
                                padding-right: 0 !important;
                                margin-right: 0 !important;
                            }
                        }
                    `}</style>
                </section>


                {/* ══════════════════════════════════════════
                    3. BRAND STORY
                ══════════════════════════════════════════ */}
                <section id="abt-story" style={{
                    maxWidth: "1320px", margin: "0 auto",
                    padding: "140px 60px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "80px",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                    {/* Left: text */}
                    <Reveal from="left">
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                            <span style={{
                                fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 500,
                                letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                            }}>Our story</span>
                        </div>
                        <h2 style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                            fontWeight: 300,
                            lineHeight: 1.12,
                            letterSpacing: "-0.025em",
                            color: "#f5f4f0",
                            marginBottom: "32px",
                        }}>
                            Born from frustration<br />with mediocre technology.
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {[
                                "We were tired of automation that required manuals and constant app updates just to turn off a light.",
                                "True intelligence doesn't announce itself. It simply makes everything work — the lights that adjust as the sun moves, the thermostat that settles before you feel cold.",
                                "We design, install, and maintain these systems for private residences, luxury developments, and hospitality properties across the region.",
                            ].map((text, i) => (
                                <p key={i} style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 300,
                                    fontSize: "1.02rem",
                                    lineHeight: 1.8,
                                    color: "rgba(245,244,240,0.52)",
                                }}>{text}</p>
                            ))}
                        </div>
                    </Reveal>

                    {/* Right: image */}
                    <Reveal from="right">
                        <div id="abt-story-img" style={{
                            position: "relative",
                            height: "520px",
                            borderRadius: "20px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                        }}>
                            <Image
                                src="/1.webp"
                                alt="Weinkling smart home design"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(180deg, transparent 55%, rgba(9,9,14,0.55) 100%)",
                            }} />
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════════════════════════════
                    3. PHILOSOPHY
                ══════════════════════════════════════════ */}
                <section id="abt-philosophy" style={{
                    maxWidth: "1320px", margin: "0 auto",
                    padding: "120px 60px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                <span style={{
                                    fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 500,
                                    letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                                }}>How we think</span>
                                <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-manrope)",
                                fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                                fontWeight: 300,
                                lineHeight: 1.1,
                                letterSpacing: "-0.025em",
                                color: "#f5f4f0",
                                margin: 0,
                            }}>
                                Our guiding principles.
                            </h2>
                        </div>
                    </Reveal>

                    <div id="abt-philosophy-grid" style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "24px",
                    }}>
                        {PHILOSOPHY.map((p, i) => (
                            <PhilosophyCard key={p.number} item={p} delay={i * 120} />
                        ))}
                    </div>
                </section>


                {/* ══════════════════════════════════════════
                    6. STATS
                ══════════════════════════════════════════ */}
                <section style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(160deg, #08090f 0%, #0b0d1a 50%, #07080e 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    padding: "120px 0",
                }}>
                    {/* Noise */}
                    <div className="noise-overlay" style={{ opacity: 0.5 }} />
                    {/* Ambient glow centred */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)",
                        width: "80vw", height: "80vw", maxWidth: "900px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.055) 0%, transparent 65%)",
                        filter: "blur(80px)", pointerEvents: "none",
                    }} />

                    <style>{`
                        #abt-stats-grid {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 0;
                        }
                        @media (max-width: 768px) {
                            #abt-stats-section { padding: 72px 0 !important; }
                            #abt-stats-inner { padding: 0 20px !important; }
                            #abt-stats-grid {
                                grid-template-columns: 1fr 1fr !important;
                                border: 1px solid rgba(255,255,255,0.06);
                                border-radius: 16px;
                                overflow: hidden;
                            }
                        }
                        @media (max-width: 480px) {
                            #abt-stats-inner { padding: 0 16px !important; }
                        }
                    `}</style>

                    <div id="abt-stats-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 2 }}>
                        {/* Section eyebrow */}
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: "72px" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                                    <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                    <span style={{
                                        fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 600,
                                        letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>By the numbers</span>
                                    <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                </div>
                            </div>
                        </Reveal>

                        {/* Stats row */}
                        <div id="abt-stats-grid">
                            {STATS.map((stat, i) => (
                                <StatBlock key={stat.label} stat={stat} index={i} isLast={i === STATS.length - 1} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    7. TEAM
                ══════════════════════════════════════════ */}
                <section style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "#09090e",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    padding: "120px 0 140px",
                }}>
                    {/* Subtle ambient glow */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "0", left: "50%",
                        transform: "translateX(-50%)",
                        width: "70vw", height: "50vh",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.04) 0%, transparent 70%)",
                        filter: "blur(80px)", pointerEvents: "none",
                    }} />

                    <style>{`
                        .team-grid {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 24px;
                        }
                        .team-card {
                            cursor: default;
                        }
                        .team-img-wrap {
                            position: relative;
                            aspect-ratio: 4/5;
                            border-radius: 16px;
                            overflow: hidden;
                            border: 1px solid rgba(255,255,255,0.07);
                            background: #0f1020;
                            margin-bottom: 16px;
                            transition: box-shadow 0.4s ease;
                        }
                        .team-card:hover .team-img-wrap {
                            box-shadow: 0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(140,180,184,0.18);
                        }
                        .team-img-wrap img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center top;
                            transition: transform 0.65s cubic-bezier(0.22,0.61,0.36,1);
                        }
                        .team-card:hover .team-img-wrap img {
                            transform: scale(1.05);
                        }
                        .team-img-overlay {
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(to top, rgba(9,9,14,0.45) 0%, transparent 55%);
                            opacity: 0;
                            transition: opacity 0.4s ease;
                        }
                        .team-card:hover .team-img-overlay {
                            opacity: 1;
                        }
                        .team-name {
                            font-family: var(--font-manrope);
                            font-size: 1rem;
                            font-weight: 600;
                            color: #f5f4f0;
                            letter-spacing: -0.01em;
                            margin: 0 0 4px;
                            transition: transform 0.35s ease;
                        }
                        .team-card:hover .team-name {
                            transform: translateY(-2px);
                        }
                        .team-role {
                            font-family: var(--font-sans);
                            font-size: 0.72rem;
                            font-weight: 500;
                            letter-spacing: 0.12em;
                            text-transform: uppercase;
                            color: rgba(140,180,184,0.65);
                            margin: 0;
                        }
                        /* Responsive */
                        @media (max-width: 1100px) {
                            .team-grid { grid-template-columns: repeat(3, 1fr); }
                        }
                        @media (max-width: 768px) {
                            .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                        }
                        @media (max-width: 480px) {
                            .team-grid { grid-template-columns: 1fr; gap: 20px; }
                            .team-img-wrap { aspect-ratio: 3/4; border-radius: 12px; }
                        }
                    `}</style>

                    <div id="abt-team-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,60px)", position: "relative", zIndex: 2 }}>

                        {/* Section header */}
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: "72px" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                                    <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)" }} />
                                    <span style={{
                                        fontFamily: "var(--font-sans)", fontSize: "0.63rem", fontWeight: 600,
                                        letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>Our Team</span>
                                    <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)" }} />
                                </div>
                                <h2 style={{
                                    fontFamily: "var(--font-manrope)",
                                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                                    fontWeight: 300,
                                    lineHeight: 1.08,
                                    letterSpacing: "-0.03em",
                                    color: "#f5f4f0",
                                    margin: "0 auto 16px",
                                    maxWidth: "600px",
                                }}>
                                    The people behind<br />
                                    <span style={{ background: "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>the vision.</span>
                                </h2>
                                <p style={{
                                    fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300,
                                    lineHeight: 1.75, color: "rgba(245,244,240,0.38)",
                                    maxWidth: "400px", margin: "0 auto",
                                }}>
                                    A multidisciplinary team shaping intelligent living.
                                </p>
                            </div>
                        </Reveal>

                        {/* Card grid */}
                        <div className="team-grid">
                            {TEAM.map((member, i) => (
                                <Reveal key={member.image} delay={(i % 4) * 80}>
                                    <div className="team-card">
                                        <div className="team-img-wrap">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                loading={i < 4 ? "eager" : "lazy"}
                                            />
                                            <div className="team-img-overlay" />
                                        </div>
                                        <p className="team-name">{member.name}</p>
                                        <p className="team-role">{member.role}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════
                    8. CTA
                ══════════════════════════════════════════ */}
                <section id="abt-cta" style={{ position: "relative", overflow: "hidden", padding: "160px 60px", textAlign: "center" }}>
                    {/* Ambient orbs */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
                        width: "80vw", height: "80vw", maxWidth: "900px", maxHeight: "900px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.07) 0%, transparent 65%)",
                        filter: "blur(80px)", pointerEvents: "none",
                    }} />
                    <div aria-hidden="true" style={{
                        position: "absolute", bottom: "-20%", right: "-10%",
                        width: "50vw", height: "50vw", maxWidth: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.05) 0%, transparent 65%)",
                        filter: "blur(80px)", pointerEvents: "none",
                    }} />

                    <Reveal style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                            <span style={{
                                fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 500,
                                letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                            }}>Begin your journey</span>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                        </div>

                        <h2 style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            fontWeight: 300,
                            lineHeight: 1.06,
                            letterSpacing: "-0.03em",
                            color: "#f5f4f0",
                            maxWidth: "800px",
                            margin: "0 auto 24px",
                        }}>
                            Your intelligent home<br />
                            <em style={{ color: "var(--clr-accent)" }}>starts with a conversation.</em>
                        </h2>

                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.05rem",
                            fontWeight: 300,
                            lineHeight: 1.75,
                            color: "rgba(245,244,240,0.42)",
                            maxWidth: "460px",
                            margin: "0 auto 56px",
                        }}>
                            Tell us about your home, your lifestyle, and your ambitions. We'll handle everything else.
                        </p>

                        <CTAButton />
                    </Reveal>
                </section>

            </main>
            <Footer />
        </>
    );
}

// ── Sub-components ────────────────────────────────────────────────────────────



function PhilosophyCard({ item, delay }: { item: typeof PHILOSOPHY[0]; delay: number }) {
    const { ref, visible } = useReveal();
    const [hovered, setHovered] = useState(false);
    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,

                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "44px 40px",
                borderRadius: "18px",
                background: hovered
                    ? "linear-gradient(145deg, rgba(35,38,54,0.9) 0%, rgba(22,22,34,0.8) 100%)"
                    : "linear-gradient(145deg, rgba(26,27,38,0.7) 0%, rgba(18,18,26,0.5) 100%)",
                border: hovered
                    ? "1px solid rgba(140,180,184,0.22)"
                    : "1px solid rgba(255,255,255,0.05)",
                boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.45)" : "none",
                transform: (visible ? "none" : "translateY(40px)") + (hovered && visible ? " scale(1.03)" : ""),
                backdropFilter: "blur(12px)",
                cursor: "default",
                transition: [
                    `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
                    `transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
                    "border-color 0.35s ease",
                    "box-shadow 0.35s ease",
                    "background 0.35s ease",
                ].join(", "),
            }}
        >
            <span style={{
                fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--clr-accent)",
            }}>{item.number}</span>
            <h3 style={{
                fontFamily: "var(--font-manrope)", fontSize: "1.55rem", fontWeight: 400,
                color: "#f5f4f0", letterSpacing: "-0.015em", lineHeight: 1.2,
            }}>{item.title}</h3>
            <p style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.95rem",
                lineHeight: 1.75, color: "rgba(245,244,240,0.48)",
            }}>{item.body}</p>
        </div>
    );
}

function ProcessStep({ step, index, isLast }: { step: typeof PROCESS[0]; index: number; isLast: boolean }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(36px)",
                transition: `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${index * 150}ms, transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${index * 150}ms`,
                padding: "0 32px 0 0",
                position: "relative",
            }}
        >
            {/* Connector line */}
            {!isLast && (
                <div aria-hidden="true" style={{
                    position: "absolute",
                    top: "28px",
                    right: "0",
                    width: "100%",
                    height: "1px",
                    background: "linear-gradient(to right, rgba(140,180,184,0.3), rgba(140,180,184,0.05))",
                }} />
            )}

            {/* Icon circle */}
            <div style={{
                width: "56px", height: "56px",
                borderRadius: "50%",
                background: "rgba(140,180,184,0.08)",
                border: "1px solid rgba(140,180,184,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-accent)",
                marginBottom: "28px",
                position: "relative", zIndex: 1,
            }}>
                {step.icon}
            </div>

            <span style={{
                fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--clr-accent)",
                display: "block", marginBottom: "12px",
            }}>{step.num}</span>

            <h3 style={{
                fontFamily: "var(--font-manrope)", fontSize: "1.3rem", fontWeight: 400,
                color: "#f5f4f0", letterSpacing: "-0.01em", lineHeight: 1.2,
                marginBottom: "14px",
            }}>{step.title}</h3>

            <p style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem",
                lineHeight: 1.75, color: "rgba(245,244,240,0.42)",
            }}>{step.desc}</p>
        </div>
    );
}

function StatBlock({ stat, index, isLast }: { stat: typeof STATS[0]; index: number; isLast: boolean }) {
    const { ref, visible } = useReveal();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!visible) return;
        if (stat.target === 0) return; // "24/7" style — no count-up
        let start = 0;
        const duration = 1800;
        const tick = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * stat.target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [visible, stat.target]);

    const displayValue = stat.target === 0 ? stat.suffix : `${count}${stat.suffix}`;

    return (
        <div
            ref={ref}
            style={{
                paddingRight: isLast ? 0 : "48px",
                marginRight: isLast ? 0 : "48px",
                borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${index * 150}ms, transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${index * 150}ms`,
                textAlign: "center",
            }}
        >
            <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#f5f4f0",
                lineHeight: 1,
                marginBottom: "10px",
            }}>{displayValue}</div>
            <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--clr-accent)", marginBottom: "10px",
            }}>{stat.label}</div>
            <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem", fontWeight: 300,
                lineHeight: 1.6, color: "rgba(245,244,240,0.38)",
                maxWidth: "180px", margin: "0 auto",
            }}>{stat.desc}</p>
        </div>
    );
}

function CTAButton() {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            href="/contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.6rem 1.6rem",
                borderRadius: "9999px",
                background: hovered
                    ? "linear-gradient(135deg, rgba(140,180,184,0.30) 0%, rgba(200,169,110,0.24) 100%)"
                    : "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                border: "1px solid rgba(140,180,184,0.45)",
                color: "#f5f4f0",
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                boxShadow: hovered ? "0 12px 32px rgba(140,180,184,0.18)" : "none",
                transform: hovered ? "translateY(-2px)" : "none",
                transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
                whiteSpace: "nowrap",
            }}
        >
            Book your Consultation
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Link>
    );
}
