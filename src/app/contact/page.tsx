"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TRUST_BADGES = [
    { number: "500+", label: "Homes Automated" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24h", label: "Response Time" },
];

const INPUT_BASE: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#f0ede8",
    fontFamily: "var(--font-sans)",
    fontWeight: 300,
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
    boxSizing: "border-box",
};

function Field({
    id, label, children,
}: {
    id: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                htmlFor={id}
                style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(200,180,150,0.7)",
                }}
            >
                {label}
            </label>
            {children}
        </div>
    );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function StyledInput(props: InputProps) {
    const [focused, setFocused] = useState(false);
    return (
        <input
            {...props}
            style={{
                ...INPUT_BASE,
                borderColor: focused ? "rgba(140,180,184,0.55)" : "rgba(255,255,255,0.10)",
                background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
                boxShadow: focused ? "0 0 0 3px rgba(140,180,184,0.12)" : "none",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function StyledTextarea(props: TextareaProps) {
    const [focused, setFocused] = useState(false);
    return (
        <textarea
            {...props}
            style={{
                ...INPUT_BASE,
                borderColor: focused ? "rgba(140,180,184,0.55)" : "rgba(255,255,255,0.10)",
                background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
                boxShadow: focused ? "0 0 0 3px rgba(140,180,184,0.12)" : "none",
                resize: "none",
                lineHeight: 1.65,
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

function StyledSelect(props: SelectProps) {
    const [focused, setFocused] = useState(false);
    return (
        <select
            {...props}
            style={{
                ...INPUT_BASE,
                borderColor: focused ? "rgba(140,180,184,0.55)" : "rgba(255,255,255,0.10)",
                background: focused ? "rgba(20,20,30,0.9)" : "rgba(20,20,30,0.8)",
                boxShadow: focused ? "0 0 0 3px rgba(140,180,184,0.12)" : "none",
                appearance: "none",
                cursor: "pointer",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
}

export default function ContactPage() {
    const [ctaHover, setCtaHover] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Pre-set ALL cards invisible at y:0 immediately — ensures identical
            // baseline positions before any stagger animation starts
            gsap.set(".contact-stat-card", { opacity: 0 });

            // Fade in only (no y movement) — staggering y causes cards to be at
            // different vertical positions simultaneously, breaking alignment
            gsap.to(".contact-stat-card", {
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                    once: true,
                },
            });
        }, statsRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main id="contact-content">

                {/* ── Hero contact section ─────────────────────────────── */}
                <section
                    style={{
                        position: "relative",
                        background: "#0a0a0f",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Ambient background orbs */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "-8%", right: "-4%",
                        width: "55vw", height: "55vw", maxWidth: "800px", maxHeight: "800px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.085) 0%, transparent 65%)",
                        filter: "blur(80px)", pointerEvents: "none",
                    }} />
                    <div aria-hidden="true" style={{
                        position: "absolute", bottom: "-10%", left: "-8%",
                        width: "50vw", height: "50vw", maxWidth: "700px", maxHeight: "700px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 65%)",
                        filter: "blur(90px)", pointerEvents: "none",
                    }} />

                    {/* Fine grid texture overlay */}
                    <div aria-hidden="true" style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }} />

                    {/* Main grid */}
                    <div style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        maxWidth: "1380px",
                        margin: "0 auto",
                        padding: "148px 60px 100px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1.08fr",
                        gap: "80px",
                        alignItems: "center",
                    }}>

                        {/* ── LEFT — info col ────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

                            {/* Label chip */}
                            <div style={{
                                display: "inline-flex", alignItems: "center",
                                gap: "10px", marginBottom: "32px",
                            }}>
                                <span style={{
                                    width: "28px", height: "1px",
                                    background: "var(--clr-accent)",
                                }} />
                                <span style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem", fontWeight: 500,
                                    letterSpacing: "0.26em", textTransform: "uppercase",
                                    color: "var(--clr-accent)",
                                }}>
                                    Get in touch
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)",
                                fontWeight: 300,
                                lineHeight: 1.06,
                                letterSpacing: "-0.03em",
                                color: "#f5f4f0",
                                margin: "0 0 28px",
                            }}>
                                Let's build your<br />
                                <em style={{ color: "var(--clr-accent)", fontStyle: "italic" }}>
                                    intelligent home.
                                </em>
                            </h1>

                            {/* Subtext */}
                            <p style={{
                                fontFamily: "var(--font-sans)",
                                fontWeight: 300,
                                fontSize: "1.08rem",
                                lineHeight: 1.8,
                                color: "rgba(245,244,240,0.52)",
                                maxWidth: "420px",
                                margin: "0 0 56px",
                            }}>
                                Every transformation begins with a conversation. Share your vision and timeline — our experts design and deliver end-to-end.
                            </p>

                            {/* Stats — premium dark-surface cards */}
                            <div style={{
                                height: "1px",
                                background: "linear-gradient(to right, transparent, rgba(140,180,184,0.22), transparent)",
                                marginBottom: "48px",
                            }} />

                            <div
                                ref={statsRef}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    alignItems: "start",
                                    gap: "12px",
                                    marginBottom: "44px",
                                }}
                            >
                                {TRUST_BADGES.map((b) => (
                                    <div
                                        key={b.label}
                                        className="contact-stat-card"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            padding: "22px 14px 18px",
                                            minHeight: "108px",
                                            borderRadius: "16px",
                                            background: "linear-gradient(160deg, rgba(18,20,36,0.92) 0%, rgba(10,10,18,0.88) 60%, rgba(14,16,30,0.80) 100%)",
                                            border: "1px solid rgba(140,180,184,0.10)",
                                            boxShadow: [
                                                "0 4px 20px rgba(0,0,0,0.40)",
                                                "inset 0 1px 0 rgba(255,255,255,0.04)",
                                                "inset 0 0 30px rgba(140,180,184,0.03)",
                                            ].join(", "),
                                            transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                                            cursor: "default",
                                            willChange: "transform",
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget as HTMLDivElement;
                                            el.style.borderColor = "rgba(140,180,184,0.28)";
                                            el.style.boxShadow = [
                                                "0 8px 32px rgba(0,0,0,0.50)",
                                                "0 0 20px rgba(140,180,184,0.08)",
                                                "inset 0 1px 0 rgba(255,255,255,0.06)",
                                            ].join(", ");
                                            el.style.transform = "translateY(-4px)";
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget as HTMLDivElement;
                                            el.style.borderColor = "rgba(140,180,184,0.10)";
                                            el.style.boxShadow = [
                                                "0 4px 20px rgba(0,0,0,0.40)",
                                                "inset 0 1px 0 rgba(255,255,255,0.04)",
                                                "inset 0 0 30px rgba(140,180,184,0.03)",
                                            ].join(", ");
                                            el.style.transform = "translateY(0)";
                                        }}
                                    >
                                        {/* Accent top rule */}
                                        <span style={{
                                            display: "block",
                                            width: "24px",
                                            height: "1.5px",
                                            borderRadius: "2px",
                                            background: "linear-gradient(90deg, transparent, rgba(140,180,184,0.50), transparent)",
                                            marginBottom: "12px",
                                        }} />
                                        <span
                                            className="contact-stat-number"
                                            style={{
                                                fontFamily: "'Manrope', sans-serif",
                                                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                                                fontWeight: 700,
                                                color: "#f0ede8",
                                                letterSpacing: "-0.04em",
                                                lineHeight: 1,
                                                display: "block",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            {b.number}
                                        </span>
                                        <span style={{
                                            fontFamily: "'Manrope', sans-serif",
                                            fontSize: "0.55rem",
                                            fontWeight: 400,
                                            letterSpacing: "0.20em",
                                            textTransform: "uppercase",
                                            color: "rgba(200,190,175,0.40)",
                                            lineHeight: 1.4,
                                        }}>
                                            {b.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact info rows */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                                {[
                                    {
                                        label: "Direct Email",
                                        value: "hello@weinkling.com",
                                        icon: (
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Concierge Hotline",
                                        value: "+91 98765 43210",
                                        icon: (
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 17.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Studio hours",
                                        value: "Mon – Fri, 9 am – 6 pm",
                                        icon: (
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="9" />
                                                <path d="M12 7v5l3 3" />
                                            </svg>
                                        ),
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "20px",
                                            padding: "22px 0",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        <span style={{ color: "var(--clr-accent)", flexShrink: 0 }}>
                                            {item.icon}
                                        </span>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.65rem",
                                                letterSpacing: "0.16em",
                                                textTransform: "uppercase",
                                                color: "rgba(245,244,240,0.3)",
                                            }}>{item.label}</span>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.96rem",
                                                fontWeight: 400,
                                                color: "rgba(245,244,240,0.82)",
                                            }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT — form card ──────────────────────────── */}
                        <div style={{ position: "relative" }}>
                            {/* Glow behind the card */}
                            <div aria-hidden="true" style={{
                                position: "absolute",
                                inset: "-20px",
                                background: "radial-gradient(ellipse at 60% 40%, rgba(140,180,184,0.12) 0%, rgba(200,169,110,0.06) 60%, transparent 80%)",
                                filter: "blur(40px)",
                                borderRadius: "40px",
                                zIndex: 0,
                                pointerEvents: "none",
                            }} />

                            <form
                                id="demo"
                                aria-label="Contact form"
                                onSubmit={(e) => e.preventDefault()}
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "24px",
                                    padding: "52px 48px 48px",
                                    borderRadius: "24px",
                                    background: "linear-gradient(150deg, rgba(30,32,46,0.82) 0%, rgba(18,18,28,0.72) 100%)",
                                    backdropFilter: "blur(32px)",
                                    WebkitBackdropFilter: "blur(32px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* Form header */}
                                <div style={{ marginBottom: "8px" }}>
                                    <h2 style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "1.9rem",
                                        fontWeight: 300,
                                        color: "#f5f4f0",
                                        letterSpacing: "-0.02em",
                                        marginBottom: "10px",
                                    }}>
                                        Start your enquiry
                                    </h2>
                                    <p style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.88rem",
                                        fontWeight: 300,
                                        color: "rgba(245,244,240,0.42)",
                                        lineHeight: 1.6,
                                    }}>
                                        Our concierge team will respond within 24 hours.
                                    </p>
                                </div>

                                {/* Name + Email row */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                    <Field id="contact-name" label="Full name">
                                        <StyledInput id="contact-name" type="text" placeholder="Your name" required />
                                    </Field>
                                    <Field id="contact-email" label="Email address">
                                        <StyledInput id="contact-email" type="email" placeholder="your@email.com" required />
                                    </Field>
                                </div>

                                {/* Phone */}
                                <Field id="contact-phone" label="Phone number">
                                    <StyledInput id="contact-phone" type="tel" placeholder="+91 00000 00000" />
                                </Field>

                                {/* Property type */}
                                <Field id="contact-property" label="Property type">
                                    <div style={{ position: "relative" }}>
                                        <StyledSelect id="contact-property">
                                            <option value="" style={{ background: "#1a1b26" }}>Select property type</option>
                                            <option value="Private Residence" style={{ background: "#1a1b26" }}>Private Residence</option>
                                            <option value="Luxury Development" style={{ background: "#1a1b26" }}>Luxury Development</option>
                                            <option value="Hospitality Property" style={{ background: "#1a1b26" }}>Hospitality Property</option>
                                            <option value="Commercial Space" style={{ background: "#1a1b26" }}>Commercial Space</option>
                                        </StyledSelect>
                                        <svg
                                            aria-hidden="true"
                                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            style={{
                                                position: "absolute", right: "18px", top: "50%",
                                                transform: "translateY(-50%)", pointerEvents: "none",
                                                color: "rgba(245,244,240,0.35)",
                                            }}
                                        >
                                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </Field>

                                {/* Budget range */}
                                <Field id="contact-budget" label="Budget range">
                                    <div style={{ position: "relative" }}>
                                        <StyledSelect id="contact-budget">
                                            <option value="" style={{ background: "#1a1b26" }}>Select estimated budget</option>
                                            <option value="under-5l" style={{ background: "#1a1b26" }}>Under ₹5 Lakhs</option>
                                            <option value="5-15l" style={{ background: "#1a1b26" }}>₹5 – 15 Lakhs</option>
                                            <option value="15-50l" style={{ background: "#1a1b26" }}>₹15 – 50 Lakhs</option>
                                            <option value="above-50l" style={{ background: "#1a1b26" }}>₹50 Lakhs+</option>
                                        </StyledSelect>
                                        <svg
                                            aria-hidden="true"
                                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            style={{
                                                position: "absolute", right: "18px", top: "50%",
                                                transform: "translateY(-50%)", pointerEvents: "none",
                                                color: "rgba(245,244,240,0.35)",
                                            }}
                                        >
                                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </Field>

                                {/* Message */}
                                <Field id="contact-message" label="Project description">
                                    <StyledTextarea
                                        id="contact-message"
                                        rows={4}
                                        placeholder="Describe your space, goals, and timeline..."
                                    />
                                </Field>

                                {/* Divider */}
                                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                                {/* CTA */}
                                <button
                                    id="contact-submit"
                                    type="submit"
                                    onMouseEnter={() => setCtaHover(true)}
                                    onMouseLeave={() => setCtaHover(false)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "12px",
                                        width: "100%",
                                        padding: "18px 32px",
                                        borderRadius: "14px",
                                        border: "1px solid rgba(140,180,184,0.38)",
                                        background: ctaHover
                                            ? "linear-gradient(135deg, rgba(140,180,184,0.28) 0%, rgba(200,169,110,0.22) 100%)"
                                            : "linear-gradient(135deg, rgba(140,180,184,0.18) 0%, rgba(200,169,110,0.12) 100%)",
                                        color: "#f5f4f0",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.88rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "all 0.28s ease",
                                        boxShadow: ctaHover
                                            ? "0 16px 40px rgba(140,180,184,0.22)"
                                            : "0 8px 20px rgba(0,0,0,0.25)",
                                        transform: ctaHover ? "translateY(-2px)" : "none",
                                    }}
                                >
                                    Submit Enquiry
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M3 8h10M9 4l4 4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                transform: ctaHover ? "translateX(3px)" : "none",
                                                transition: "transform 0.25s ease",
                                            }}
                                        />
                                    </svg>
                                </button>

                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.72rem",
                                    color: "rgba(245,244,240,0.35)",
                                    textAlign: "center",
                                    lineHeight: 1.5,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    Your information is confidential and never shared.
                                </p>
                            </form>
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
