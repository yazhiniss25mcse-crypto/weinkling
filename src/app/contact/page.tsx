"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";

const INPUT_BASE: React.CSSProperties = {
    width: "100%",
    padding: "13px 18px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#f0ede8",
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "0.85rem",
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
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(200,180,150,0.6)",
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

    return (
        <>
            <Navbar />
            <main id="contact-content">
                <style>{`
                    /* ── Contact page responsive ───────────────────── */
                    .contact-grid {
                        padding: 148px 60px 100px;
                        grid-template-columns: 1fr 1.08fr;
                        gap: 80px;
                    }
                    .contact-form {
                        padding: 52px 48px 48px;
                    }
                    .contact-name-row {
                        grid-template-columns: 1fr 1fr;
                    }
                    .contact-map {
                        height: 260px;
                    }
                    @media (max-width: 900px) {
                        .contact-grid {
                            grid-template-columns: 1fr;
                            gap: 48px;
                            padding: 120px 40px 80px;
                        }
                        .contact-form {
                            padding: 40px 32px 36px;
                        }
                        .contact-map {
                            height: 220px;
                        }
                    }
                    @media (max-width: 600px) {
                        .contact-grid {
                            grid-template-columns: 1fr;
                            gap: 40px;
                            padding: 100px 20px 60px;
                        }
                        .contact-form {
                            padding: 28px 20px 24px;
                            border-radius: 16px;
                        }
                        .contact-name-row {
                            grid-template-columns: 1fr;
                        }
                        .contact-map {
                            height: 180px;
                        }
                    }
                `}</style>

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
                    <div
                        className="contact-grid"
                        style={{
                            position: "relative",
                            zIndex: 1,
                            width: "100%",
                            maxWidth: "1380px",
                            margin: "0 auto",
                            display: "grid",
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
                                fontFamily: "var(--font-manrope)",
                                fontSize: "clamp(2.6rem, 4vw, 3.8rem)",
                                fontWeight: 600,
                                lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                color: "#f5f4f0",
                                margin: "0 0 24px",
                            }}>
                                Let's build your{" "}
                                <span style={{
                                    background: "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}>
                                    intelligent home.
                                </span>
                            </h1>

                            {/* Subtext */}
                            <p style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                                fontSize: "0.925rem",
                                lineHeight: 1.75,
                                color: "rgba(245,244,240,0.45)",
                                maxWidth: "400px",
                                margin: "0 0 48px",
                            }}>
                                Every transformation begins with a conversation. Share your vision and timeline — our experts design and deliver end-to-end.
                            </p>

                            {/* Contact info — 2×2 grid */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "12px",
                                marginBottom: "36px",
                            }}>
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
                                        label: "Studio Hours",
                                        value: "Mon – Fri, 9 am – 6 pm",
                                        icon: (
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="9" />
                                                <path d="M12 7v5l3 3" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Studio Address",
                                        value: "Hyderabad, Telangana, India",
                                        icon: (
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        ),
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "14px",
                                            padding: "16px",
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                            borderRadius: "12px",
                                        }}
                                    >
                                        <span style={{
                                            color: "var(--clr-accent)",
                                            flexShrink: 0,
                                            marginTop: "2px",
                                            padding: "8px",
                                            background: "rgba(140,180,184,0.08)",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            {item.icon}
                                        </span>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.15em",
                                                textTransform: "uppercase",
                                                color: "rgba(245,244,240,0.28)",
                                            }}>{item.label}</span>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.85rem",
                                                fontWeight: 400,
                                                color: "rgba(245,244,240,0.78)",
                                                lineHeight: 1.45,
                                                wordBreak: "break-word",
                                            }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map — inline in left column */}
                            <div
                                className="contact-map"
                                style={{
                                    position: "relative",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
                                }}>
                                <iframe
                                    title="Weinkling Studio Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.265305878222!2d76.99529317494802!3d11.016844189139614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183a433!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714384800000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: "none",
                                        display: "block",
                                        filter: "grayscale(40%) contrast(1.05) brightness(0.82)",
                                    }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <a
                                href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-block",
                                    marginTop: "10px",
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "0.72rem",
                                    color: "var(--clr-accent)",
                                    textDecoration: "none",
                                    letterSpacing: "0.06em",
                                    opacity: 0.7,
                                    transition: "opacity 0.2s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                            >
                                Open in Google Maps →
                            </a>
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
                                className="contact-form"
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "24px",
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
                                        fontFamily: "var(--font-manrope)",
                                        fontSize: "1.5rem",
                                        fontWeight: 600,
                                        color: "#f5f4f0",
                                        letterSpacing: "-0.03em",
                                        marginBottom: "8px",
                                    }}>
                                        Start your enquiry
                                    </h2>
                                    <p style={{
                                        fontFamily: "var(--font-inter)",
                                        fontSize: "0.82rem",
                                        fontWeight: 400,
                                        color: "rgba(245,244,240,0.38)",
                                        lineHeight: 1.6,
                                    }}>
                                        Our concierge team will respond within 24 hours.
                                    </p>
                                </div>

                                {/* Name + Email row */}
                                <div className="contact-name-row" style={{ display: "grid", gap: "16px" }}>
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
                                        fontSize: "0.78rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.13em",
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
