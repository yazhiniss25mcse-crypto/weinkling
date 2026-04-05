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

const TEAM = [
    {
        name: "Bhavana Uppaluri",
        role: "Creative Director",
        bio: "Bhavana leads the aesthetic soul of every project — translating complex smart-home systems into spaces that feel beautifully human, refined, and spatially intelligent.",
        image: "/assets/BHAVANA UPPALURI -Creative Director.avif",
    },
    {
        name: "Srinivas Uppaluri",
        role: "CxO",
        bio: "Srinivas drives the client and experience vision at Weinkling — ensuring every touchpoint, from first consultation to final handover, reflects uncompromising quality.",
        image: "/assets/SRINIVAS UPPALURI.avif",
    },
    {
        name: "Satya Sree Bobba",
        role: "Co-founder",
        bio: "Satya co-founded Weinkling with a clarity of purpose: to make intelligence in the home feel invisible, inevitable, and enduring for every family we serve.",
        image: "/assets/SATYA SREE BOBBA.avif",
    },
    {
        name: "Nanda Gopal",
        role: "Chief Mentor",
        bio: "With decades of domain experience, Nanda Gopal guides the team's technical direction — setting the standards of precision and craft that every project is held to.",
        image: "/assets/NANDA GOPAL.avif",
    },
    {
        name: "Punith Salian",
        role: "Project Developer",
        bio: "Punith develops and delivers smart-home projects end to end — bridging technical planning with on-ground execution to ensure nothing falls through the cracks.",
        image: "/assets/PUNITH SALIAN.avif",
    },
    {
        name: "Lenin",
        role: "Design Architect",
        bio: "Lenin shapes the spatial and systems design of each installation — creating blueprints where elegant aesthetics and intelligent infrastructure are truly inseparable.",
        image: "/assets/LENIN.avif",
    },
    {
        name: "Nithin Kumar",
        role: "Mechanical Engineer",
        bio: "Nithin handles the physical engineering layer of every project — HVAC integration, structural coordination, and ensuring all mechanical systems run in perfect harmony.",
        image: "/assets/NITHIN KUMAR.avif",
    },
    {
        name: "Swaroop B U",
        role: "Design Engineer",
        bio: "Swaroop engineers the detailed design of control systems and interfaces — turning complex automation logic into clean, buildable, installation-ready specifications.",
        image: "/assets/SWAROOP B U.avif",
    },
    {
        name: "Sachidanand Pandit",
        role: "App Developer",
        bio: "Sachidanand builds the software layer that brings every smart home to life — developing intuitive apps and control interfaces that feel seamless in daily use.",
        image: "/assets/SACHIDANAND PANDIT.avif",
    },
    {
        name: "Nandakumar",
        role: "Project Developer & Consultant",
        bio: "Nandakumar consults on and develops smart-home projects across the stack — advising clients on system scope while overseeing delivery from design to commissioning.",
        image: "/assets/NANDAKUMAR.avif",
    },
    {
        name: "Umesh Kumar",
        role: "Mechanical Consultant",
        bio: "Umesh consults on mechanical systems across Weinkling projects — ensuring climate control, ventilation, and physical infrastructure meet the highest performance standards.",
        image: "/assets/UMESH KUMAR.avif",
    },
    {
        name: "Archana",
        role: "HR Executive",
        bio: "Archana builds and sustains the culture behind Weinkling's excellence — recruiting the right talent and ensuring every team member thrives in an environment of purpose.",
        image: "/assets/ARCHANA.avif",
    },
    {
        name: "Kiran K",
        role: "BD Executive",
        bio: "Kiran grows Weinkling's presence — identifying new opportunities, nurturing client relationships, and helping more homes access the intelligence they deserve.",
        image: "/assets/KIRAN K.avif",
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
                <section style={{
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
                        fontFamily: "var(--font-serif)",
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
                    <div style={{
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
                        <div style={{
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
                                fontFamily: "var(--font-serif)",
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
                                    fontStyle: "italic",
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

                            {/* Stat strip */}
                            <div style={{
                                display: "flex", gap: "0",
                                marginTop: "64px",
                                animation: "abt_fadeUp 1s 0.85s both",
                            }}>
                                {[
                                    { value: "500+", label: "Homes Delivered" },
                                    { value: "10+", label: "Years of Craft" },
                                    { value: "98%", label: "Client Satisfaction" },
                                ].map((stat, i) => (
                                    <div key={stat.label} style={{
                                        paddingRight: "48px",
                                        marginRight: "48px",
                                        borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                                    }}>
                                        <div style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "clamp(2rem, 3vw, 2.8rem)",
                                            fontWeight: 600,
                                            letterSpacing: "-0.02em",
                                            color: "#f5f4f0",
                                            lineHeight: 1,
                                            marginBottom: "6px",
                                        }}>{stat.value}</div>
                                        <div style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.65rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            color: "rgba(245,244,240,0.3)",
                                        }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Scroll indicator — bottom right ── */}
                    <div style={{
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
                    `}</style>
                </section>


                {/* ══════════════════════════════════════════
                    3. BRAND STORY
                ══════════════════════════════════════════ */}
                <section style={{
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
                            fontFamily: "var(--font-serif)",
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
                        <div style={{
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
                <section style={{
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
                                fontFamily: "var(--font-serif)",
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

                    <div style={{
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
                    4. EXPERIENCE / PARALLAX STATEMENT
                ══════════════════════════════════════════ */}
                <section
                    ref={parallaxRef}
                    style={{
                        position: "relative",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        textAlign: "center",
                    }}
                >
                    {/* Parallax bg */}
                    <div style={{
                        position: "absolute", inset: "-20%",
                        transform: "translateY(var(--parallax-y, 0))",
                        transition: "transform 0.05s linear",
                    }}>
                        <Image
                            src="/hero_day.webp"
                            alt="Luxury smart home"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        />
                    </div>
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, rgba(9,9,14,0.82) 0%, rgba(16,22,32,0.78) 100%)",
                    }} />

                    <Reveal style={{ position: "relative", zIndex: 2, padding: "0 40px", maxWidth: "900px" }}>
                        <p style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                            fontWeight: 300,
                            lineHeight: 1.1,
                            letterSpacing: "-0.025em",
                            color: "#f5f4f0",
                            marginBottom: "24px",
                        }}>
                            "Technology that disappears<br />
                            <em style={{ color: "var(--clr-accent)" }}>into your life."</em>
                        </p>
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.05rem",
                            fontWeight: 300,
                            lineHeight: 1.8,
                            color: "rgba(245,244,240,0.45)",
                            maxWidth: "520px",
                            margin: "0 auto",
                        }}>
                            When a home is truly intelligent, you stop thinking about it. You just live.
                        </p>
                    </Reveal>
                </section>

                {/* ══════════════════════════════════════════
                    5. PROCESS
                ══════════════════════════════════════════ */}
                <section style={{
                    maxWidth: "1320px", margin: "0 auto",
                    padding: "140px 60px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                <span style={{
                                    fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 500,
                                    letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                                }}>How it works</span>
                                <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                                fontWeight: 300,
                                lineHeight: 1.1,
                                letterSpacing: "-0.025em",
                                color: "#f5f4f0",
                            }}>
                                From conversation to completion.
                            </h2>
                        </div>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
                        {PROCESS.map((step, i) => (
                            <ProcessStep key={step.num} step={step} index={i} isLast={i === PROCESS.length - 1} />
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

                    <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 2 }}>
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
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "0",
                        }}>
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
                    background: "linear-gradient(160deg, #07080f 0%, #0b0d18 35%, #090c14 65%, #07080e 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    padding: "160px 0 180px",
                }}>
                    {/* Noise texture overlay */}
                    <div className="noise-overlay" style={{ opacity: 0.55 }} />

                    {/* Ambient orbs */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "5%", left: "-10%",
                        width: "55vw", height: "55vw", maxWidth: "700px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.06) 0%, transparent 70%)",
                        filter: "blur(90px)", pointerEvents: "none",
                    }} />
                    <div aria-hidden="true" style={{
                        position: "absolute", bottom: "0%", right: "-8%",
                        width: "50vw", height: "50vw", maxWidth: "650px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.045) 0%, transparent 70%)",
                        filter: "blur(100px)", pointerEvents: "none",
                    }} />

                    {/* Inner constrained content */}
                    <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 2 }}>

                        {/* Section header */}
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: "100px" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                                    <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)" }} />
                                    <span style={{
                                        fontFamily: "var(--font-sans)", fontSize: "0.63rem", fontWeight: 600,
                                        letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>Our Team</span>
                                    <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)" }} />
                                </div>
                                <h2 style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
                                    fontWeight: 300,
                                    lineHeight: 1.08,
                                    letterSpacing: "-0.03em",
                                    color: "#f5f4f0",
                                    margin: "0 auto 20px",
                                    maxWidth: "700px",
                                }}>
                                    The People Behind the Vision
                                </h2>
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "1rem",
                                    fontWeight: 300,
                                    lineHeight: 1.8,
                                    color: "rgba(245,244,240,0.40)",
                                    maxWidth: "460px",
                                    margin: "0 auto",
                                }}>
                                    A multidisciplinary team shaping intelligent living experiences.
                                </p>
                            </div>
                        </Reveal>

                        {/* Card grid */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "24px",
                        }}>
                            {TEAM.map((member, i) => (
                                <TeamCard key={member.name} member={member} index={i} staggerDelay={(i % 3) * 120} />
                            ))}
                        </div>

                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    8. CTA
                ══════════════════════════════════════════ */}
                <section style={{ position: "relative", overflow: "hidden", padding: "160px 60px", textAlign: "center" }}>
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
                            fontFamily: "var(--font-serif)",
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

function TeamCard({
    member,
    index,
    staggerDelay = 0,
}: {
    member: typeof TEAM[0];
    index: number;
    staggerDelay?: number;
}) {
    const { ref, visible } = useReveal();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "default",
                // Reveal animation
                opacity: visible ? 1 : 0,
                transform: visible
                    ? (hovered ? "translateY(-8px)" : "translateY(0px)")
                    : "translateY(52px)",
                // Glass card base
                background: "linear-gradient(160deg, rgba(18,22,38,0.82) 0%, rgba(10,11,18,0.75) 100%)",
                border: hovered
                    ? "1px solid rgba(140,180,184,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                // Glow + lift
                boxShadow: hovered
                    ? "0 28px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(140,180,184,0.12), 0 0 60px rgba(140,180,184,0.1)"
                    : "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04)",
                transition: [
                    `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${staggerDelay}ms`,
                    `transform 0.5s cubic-bezier(0.22,0.61,0.36,1)`,
                    "border-color 0.4s ease",
                    "box-shadow 0.45s ease",
                ].join(", "),
            }}
        >
            {/* ── Image area ── */}
            <div style={{
                position: "relative",
                height: "300px",
                overflow: "hidden",
            }}>
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                        transform: hovered ? "scale(1.06)" : "scale(1.0)",
                        transition: "transform 0.75s cubic-bezier(0.22,0.61,0.36,1)",
                        filter: hovered ? "brightness(1.06)" : "brightness(0.92)",
                    }}
                />
                {/* Cinematic bottom gradient — text will visually overlap this */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(7,8,15,1) 0%, rgba(7,8,15,0.7) 28%, rgba(7,8,15,0.1) 60%, transparent 100%)",
                    transition: "opacity 0.4s ease",
                }} />
                {/* Subtle vignette sides */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, rgba(7,8,15,0.35) 0%, transparent 30%, transparent 70%, rgba(7,8,15,0.35) 100%)",
                }} />

                {/* Index badge */}
                <div style={{
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "rgba(140,180,184,0.55)",
                    zIndex: 3,
                }}>
                    {String(index + 1).padStart(2, "0")}
                </div>

                {/* ── Text overlapping the image bottom ── */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "0 26px 22px",
                    zIndex: 3,
                }}>
                    {/* Accent rule */}
                    <div style={{
                        width: hovered ? "40px" : "24px",
                        height: "1px",
                        background: "var(--clr-accent)",
                        marginBottom: "12px",
                        transition: "width 0.4s cubic-bezier(0.22,0.61,0.36,1)",
                        opacity: 0.9,
                    }} />
                    <h3 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)",
                        fontWeight: 400,
                        lineHeight: 1.1,
                        letterSpacing: "-0.015em",
                        color: "#f5f4f0",
                        marginBottom: "5px",
                        textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                    }}>
                        {member.name}
                    </h3>
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--clr-accent)",
                        opacity: 0.85,
                    }}>
                        {member.role}
                    </p>
                </div>
            </div>

            {/* ── Bio content ── */}
            <div style={{
                padding: "22px 26px 28px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
                <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.88rem",
                    fontWeight: 300,
                    lineHeight: 1.78,
                    color: "rgba(245,244,240,0.42)",
                    transition: "color 0.3s ease",
                    ...(hovered ? { color: "rgba(245,244,240,0.58)" } : {}),
                }}>
                    {member.bio}
                </p>
            </div>

            {/* Hover glow ring (inset) */}
            {hovered && (
                <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse at 50% 0%, rgba(140,180,184,0.07) 0%, transparent 60%)",
                }} />
            )}
        </div>
    );
}

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
                fontFamily: "var(--font-serif)", fontSize: "1.55rem", fontWeight: 400,
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
                fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400,
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
