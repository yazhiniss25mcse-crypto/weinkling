"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────
   Scroll reveal hook
───────────────────────────────────────────── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.12 });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return { ref, v };
}

function Reveal({ children, delay = 0, from = "bottom", style = {}, className = "" }: {
    children: React.ReactNode; delay?: number; from?: "bottom" | "left" | "right"; style?: React.CSSProperties; className?: string;
}) {
    const { ref, v } = useReveal();
    const t = { bottom: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)" };
    return (
        <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "none" : t[from], transition: `opacity .85s cubic-bezier(.22,.61,.36,1) ${delay}ms,transform .85s cubic-bezier(.22,.61,.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Label chip
───────────────────────────────────────────── */
function Label({ text, color = "var(--clr-accent)" }: { text: string; color?: string }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 24, height: 1, background: color }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color }}>{text}</span>
            <span style={{ width: 24, height: 1, background: color }} />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Parallax section
───────────────────────────────────────────── */
function ParallaxSection({ img, label, heading, sub, bullets, accent = "var(--clr-accent)", flip = false }:
    { img: string; label: string; heading: string; sub: string; bullets: string[]; accent?: string; flip?: boolean }) {
    const ref   = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const h = () => {
            if (!ref.current || !bgRef.current) return;
            const r = ref.current.getBoundingClientRect();
            const p = -r.top / window.innerHeight;
            bgRef.current.style.transform = `translateY(${p * 60}px)`;
        };
        window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
    }, []);

    /* Fallback gradient shown behind the image while it loads / if it fails */
    const fallbackBg = flip
        ? "linear-gradient(135deg, #0d1018 0%, #111620 40%, #1a1f2e 70%, #0e1015 100%)"
        : "linear-gradient(135deg, #0e1015 0%, #151c28 40%, #111620 70%, #0d1018 100%)";

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                height: "88vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                background: fallbackBg,
            }}
        >
            {/* Decorative depth elements visible when image fails */}
            <div aria-hidden style={{
                position: "absolute",
                inset: 0,
                background: flip
                    ? "radial-gradient(ellipse at 20% 50%, rgba(140,180,184,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(200,169,110,0.05) 0%, transparent 50%)"
                    : "radial-gradient(ellipse at 80% 50%, rgba(140,180,184,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(200,169,110,0.05) 0%, transparent 50%)",
                pointerEvents: "none",
            }} />

            {/* Parallax image layer */}
            <div ref={bgRef} style={{ position: "absolute", inset: "-15%", willChange: "transform" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={img}
                    alt={heading}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                />
            </div>

            {/* Directional gradient overlay — stronger on text side, fades to reveal image */}
            <div style={{
                position: "absolute", inset: 0,
                background: flip
                    ? "linear-gradient(to left, rgba(9,9,14,0.97) 0%, rgba(9,9,14,0.75) 40%, rgba(9,9,14,0.20) 75%, rgba(9,9,14,0.08) 100%)"
                    : "linear-gradient(to right, rgba(9,9,14,0.97) 0%, rgba(9,9,14,0.75) 40%, rgba(9,9,14,0.20) 75%, rgba(9,9,14,0.08) 100%)",
            }} />

            {/* Bottom vignette for depth */}
            <div aria-hidden style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(9,9,14,0.60) 0%, transparent 100%)",
                pointerEvents: "none",
            }} />

            {/* Top vignette */}
            <div aria-hidden style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "25%",
                background: "linear-gradient(to bottom, rgba(9,9,14,0.40) 0%, transparent 100%)",
                pointerEvents: "none",
            }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1320, margin: "0 auto", padding: "0 60px", display: "flex", justifyContent: flip ? "flex-end" : "flex-start" }}>
                <Reveal from={flip ? "right" : "left"} style={{ maxWidth: 520 }}>
                    <Label text={label} color={accent} />
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.6rem,4.5vw,4rem)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#f5f4f0", marginBottom: 20 }}>{heading}</h2>
                    <p style={{ fontFamily: "'Manrope', var(--font-sans)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,244,240,.52)", marginBottom: 32 }}>{sub}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                        {bullets.map(b => (
                            <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Manrope', var(--font-sans)", fontWeight: 300, fontSize: "0.9rem", color: "rgba(245,244,240,.65)" }}>
                                <span style={{ width: 18, height: 1, background: accent, flexShrink: 0 }} />{b}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Our Process — data
───────────────────────────────────────────── */
const PROCESS_STEPS = [
    {
        n: "01", title: "Consult",
        desc: "A dedicated specialist visits your property, listens to your vision, and maps it to a precise system architecture.",
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M5 3h9a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 4V5a2 2 0 012-2z" />
            </svg>
        ),
    },
    {
        n: "02", title: "Design",
        desc: "Our engineers draft a bespoke blueprint — wiring, protocols, scene logic, and control interfaces tailored to your lifestyle.",
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        n: "03", title: "Supply",
        desc: "Premium hardware — pre-configured, tested, and delivered directly to site, ready for precision installation.",
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
    {
        n: "04", title: "Install",
        desc: "Certified technicians deploy and tune your system with zero disruption. Your home is fully live within a single day.",
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

/* ─────────────────────────────────────────────
   ProcessCard
───────────────────────────────────────────── */
function ProcessCard({ step }: { step: typeof PROCESS_STEPS[number] }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="proc-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                padding: "40px 28px 36px",
                borderRadius: "22px",
                background: hovered
                    ? "linear-gradient(155deg, rgba(32,36,56,0.97) 0%, rgba(14,14,26,0.94) 100%)"
                    : "linear-gradient(155deg, rgba(20,22,38,0.90) 0%, rgba(11,11,20,0.85) 100%)",
                border: hovered
                    ? "1px solid rgba(140,180,184,0.30)"
                    : "1px solid rgba(140,180,184,0.08)",
                boxShadow: hovered
                    ? [
                        "0 24px 56px rgba(0,0,0,0.60)",
                        "0 0 40px rgba(140,180,184,0.09)",
                        "inset 0 1px 0 rgba(255,255,255,0.08)",
                        "inset 0 0 60px rgba(140,180,184,0.03)",
                    ].join(", ")
                    : [
                        "0 6px 24px rgba(0,0,0,0.45)",
                        "inset 0 1px 0 rgba(255,255,255,0.04)",
                    ].join(", "),
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                transform: hovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                transition: [
                    "background 0.40s ease",
                    "border-color 0.40s ease",
                    "box-shadow 0.40s ease",
                    "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)",
                ].join(", "),
                cursor: "default",
                willChange: "transform",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Top accent glow rule */}
            <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
                background: `linear-gradient(to right, transparent, rgba(140,180,184,${hovered ? "0.65" : "0.16"}), transparent)`,
                transition: "background 0.42s ease",
            }} />

            {/* Corner glint */}
            <div style={{
                position: "absolute", top: 0, right: 0,
                width: 90, height: 90,
                background: `radial-gradient(circle at top right, rgba(140,180,184,${hovered ? "0.11" : "0.03"}), transparent 70%)`,
                transition: "background 0.42s ease",
                borderRadius: "0 22px 0 0",
                pointerEvents: "none",
            }} />

            {/* Watermark step number */}
            <div style={{
                position: "absolute", bottom: 16, right: 20,
                fontFamily: "var(--font-serif)",
                fontSize: "5.5rem", fontWeight: 700, lineHeight: 1,
                color: `rgba(140,180,184,${hovered ? "0.07" : "0.035"})`,
                letterSpacing: "-0.04em",
                userSelect: "none", pointerEvents: "none",
                transition: "color 0.42s ease",
            }}>
                {step.n}
            </div>

            {/* Icon badge */}
            <div style={{
                width: 56, height: 56, borderRadius: "16px",
                background: hovered
                    ? "linear-gradient(135deg, rgba(140,180,184,0.18) 0%, rgba(140,180,184,0.08) 100%)"
                    : "linear-gradient(135deg, rgba(140,180,184,0.09) 0%, rgba(140,180,184,0.04) 100%)",
                border: `1px solid rgba(140,180,184,${hovered ? "0.38" : "0.14"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-accent)",
                flexShrink: 0,
                boxShadow: hovered
                    ? "0 0 24px rgba(140,180,184,0.22), inset 0 1px 0 rgba(255,255,255,0.10)"
                    : "none",
                transition: "all 0.40s ease",
            }}>
                {step.icon}
            </div>

            {/* Step label */}
            <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.56rem", fontWeight: 700,
                letterSpacing: "0.30em", textTransform: "uppercase",
                color: hovered ? "rgba(140,180,184,0.90)" : "rgba(140,180,184,0.55)",
                transition: "color 0.40s ease",
            }}>
                Step {step.n}
            </span>

            {/* Title */}
            <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem", fontWeight: 400,
                color: hovered ? "#f5f4f0" : "#dedad4",
                letterSpacing: "-0.015em", lineHeight: 1.2,
                margin: 0,
                transition: "color 0.40s ease",
            }}>
                {step.title}
            </h3>

            {/* Divider */}
            <div style={{
                height: "1px",
                background: `linear-gradient(to right, rgba(140,180,184,${hovered ? "0.22" : "0.08"}), transparent)`,
                transition: "background 0.40s ease",
            }} />

            {/* Description */}
            <p style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300, fontSize: "0.875rem",
                lineHeight: 1.80,
                color: hovered ? "rgba(245,244,240,0.60)" : "rgba(245,244,240,0.36)",
                transition: "color 0.40s ease",
                margin: 0,
            }}>
                {step.desc}
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   ProcessSection
───────────────────────────────────────────── */
function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef    = useRef<SVGLineElement>(null);
    const cardsRef   = useRef<HTMLDivElement>(null);
    const dotsRef    = useRef<(SVGCircleElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const line    = lineRef.current;
        const cards   = cardsRef.current?.querySelectorAll<HTMLElement>(".proc-card");
        if (!section) return;

        const ctx = gsap.context(() => {

            // Cards: staggered fade-up with slight scale
            if (cards?.length) {
                gsap.set(Array.from(cards), { opacity: 0, y: 52, scale: 0.97 });
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 72%",
                    once: true,
                    onEnter: () => {
                        gsap.to(Array.from(cards), {
                            opacity: 1, y: 0, scale: 1,
                            duration: 0.82,
                            stagger: 0.16,
                            ease: "power3.out",
                        });
                    },
                });
            }

            // Connector line draws left → right
            if (line) {
                const total = (line as SVGGeometryElement).getTotalLength?.() ?? 900;
                gsap.set(line, { strokeDasharray: total, strokeDashoffset: total });
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 72%",
                    once: true,
                    onEnter: () => {
                        gsap.to(line, {
                            strokeDashoffset: 0,
                            duration: 1.6,
                            ease: "power2.inOut",
                            delay: 0.25,
                        });
                    },
                });
            }

            // Node dots light up one by one
            const dots = dotsRef.current.filter(Boolean) as SVGCircleElement[];
            if (dots.length) {
                gsap.set(dots, { opacity: 0, scale: 0 });
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 72%",
                    once: true,
                    onEnter: () => {
                        gsap.to(dots, {
                            opacity: 1, scale: 1,
                            duration: 0.45,
                            stagger: 0.32,
                            delay: 0.55,
                            ease: "back.out(2)",
                            transformOrigin: "center center",
                        });
                    },
                });
            }

        }, section);

        return () => ctx.revert();
    }, []);

    const NODE_XS = [112.5, 337.5, 562.5, 787.5];

    return (
        <section
            ref={sectionRef}
            style={{
                maxWidth: 1320, margin: "0 auto",
                padding: "130px 60px",
                borderBottom: "1px solid rgba(255,255,255,.04)",
                position: "relative",
            }}
        >
            {/* Ambient glow blob */}
            <div aria-hidden style={{
                position: "absolute", top: "10%", left: "50%",
                transform: "translateX(-50%)",
                width: "70vw", height: "40vh",
                background: "radial-gradient(ellipse at center, rgba(140,180,184,0.055) 0%, transparent 70%)",
                filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
            }} />

            {/* Heading */}
            <Reveal style={{ textAlign: "center", marginBottom: 88, position: "relative", zIndex: 1 }}>
                <Label text="Our Process" />
                <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.4rem,4vw,3.5rem)",
                    fontWeight: 300, letterSpacing: "-0.025em",
                    color: "#f5f4f0", lineHeight: 1.1,
                }}>
                    From idea to<br />
                    <em style={{ color: "var(--clr-accent)" }}>intelligent home.</em>
                </h2>
            </Reveal>

            {/* Connector + Cards wrapper */}
            <div style={{ position: "relative", zIndex: 1 }}>

                {/* SVG connector — sits behind cards */}
                <svg
                    aria-hidden
                    style={{
                        position: "absolute",
                        top: "54px",
                        left: "calc(12.5%)",
                        width: "75%",
                        height: "8px",
                        overflow: "visible",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                    viewBox="0 0 900 8"
                    preserveAspectRatio="none"
                >
                    {/* Static dashed base rail */}
                    <line
                        x1="0" y1="4" x2="900" y2="4"
                        stroke="rgba(140,180,184,0.08)"
                        strokeWidth="1"
                        strokeDasharray="5 9"
                    />
                    {/* Animated glowing draw-in line */}
                    <line
                        ref={lineRef}
                        x1="0" y1="4" x2="900" y2="4"
                        stroke="rgba(140,180,184,0.50)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 6px rgba(140,180,184,0.55))" }}
                    />
                    {/* Outer node rings */}
                    {NODE_XS.map((cx, i) => (
                        <circle
                            key={i}
                            ref={el => { dotsRef.current[i] = el; }}
                            cx={cx} cy="4" r="5.5"
                            fill="#09090e"
                            stroke="rgba(140,180,184,0.68)"
                            strokeWidth="1.5"
                            style={{ filter: "drop-shadow(0 0 5px rgba(140,180,184,0.55))" }}
                        />
                    ))}
                    {/* Inner bright core dots */}
                    {NODE_XS.map((cx, i) => (
                        <circle
                            key={`inner-${i}`}
                            cx={cx} cy="4" r="2.2"
                            fill="rgba(140,180,184,0.92)"
                            style={{ pointerEvents: "none" }}
                        />
                    ))}
                </svg>

                {/* Step cards grid */}
                <div
                    ref={cardsRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: "20px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {PROCESS_STEPS.map((step) => (
                        <ProcessCard key={step.n} step={step} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   ControlHubOrbit — animated smart home diagram
───────────────────────────────────────────── */
type ControlIcon = { label: string; svg: React.ReactNode };

function ControlHubOrbit({ icons }: { icons: ControlIcon[] }) {
    const wrapRef   = useRef<HTMLDivElement>(null);
    const orbitRef  = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const nodeRefs  = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs  = useRef<(SVGLineElement | null)[]>([]);

    const SIZE    = 460;   // px — outer container
    const R_PCT   = 42;    // orbit radius as % of SIZE/2
    const R_PX    = (SIZE / 2) * (R_PCT / 100); // ~96.6 px

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const wrap = wrapRef.current;
        if (!wrap) return;

        const ctx = gsap.context(() => {

            // ── Center pulse ─────────────────────────────────────
            gsap.to(centerRef.current, {
                boxShadow: [
                    "0 0 30px rgba(140,180,184,0.20), 0 0 60px rgba(140,180,184,0.08)",
                    "0 0 55px rgba(140,180,184,0.42), 0 0 100px rgba(140,180,184,0.18)",
                ].join(", "),
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // ── Nodes appear one-by-one on scroll ────────────────
            const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
            gsap.set(nodes, { opacity: 0, scale: 0.4 });
            ScrollTrigger.create({
                trigger: wrap,
                start: "top 70%",
                once: true,
                onEnter: () => {
                    gsap.to(nodes, {
                        opacity: 1, scale: 1,
                        duration: 0.55,
                        stagger: 0.14,
                        ease: "back.out(1.8)",
                    });
                    // Draw connector lines
                    const lines = lineRefs.current.filter(Boolean) as SVGLineElement[];
                    gsap.set(lines, { strokeDasharray: 120, strokeDashoffset: 120, opacity: 0 });
                    gsap.to(lines, {
                        strokeDashoffset: 0, opacity: 1,
                        duration: 0.5,
                        stagger: 0.14,
                        delay: 0.1,
                        ease: "power2.out",
                    });
                },
            });

        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={wrapRef}
            style={{
                position: "relative",
                width: "100%",
                maxWidth: SIZE,
                aspectRatio: "1/1",
                margin: "0 auto",
            }}
        >
            {/* ── Deep background glow layers ─────────────────── */}
            <div aria-hidden style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle at 50% 50%, rgba(140,180,184,0.09) 0%, rgba(140,180,184,0.03) 45%, transparent 70%)",
                filter: "blur(2px)",
                pointerEvents: "none",
            }} />
            <div aria-hidden style={{
                position: "absolute", inset: "12%", borderRadius: "50%",
                background: "radial-gradient(circle at 50% 40%, rgba(200,169,110,0.06) 0%, transparent 65%)",
                filter: "blur(8px)",
                pointerEvents: "none",
            }} />

            {/* ── SVG connector lines layer ────────────────────── */}
            <svg
                aria-hidden
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 0 }}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
                {icons.map((item, i) => {
                    const angle = (i / icons.length) * 360 - 90;
                    const rad   = angle * (Math.PI / 180);
                    const cx    = SIZE / 2 + R_PX * Math.cos(rad);
                    const cy    = SIZE / 2 + R_PX * Math.sin(rad);
                    return (
                        <line
                            key={item.label}
                            ref={el => { lineRefs.current[i] = el; }}
                            x1={SIZE / 2} y1={SIZE / 2}
                            x2={cx} y2={cy}
                            stroke="rgba(140,180,184,0.18)"
                            strokeWidth="1"
                            strokeDasharray="4 5"
                        />
                    );
                })}
            </svg>

            {/* ── Animated rotating orbit ring ────────────────── */}
            <div
                ref={orbitRef}
                style={{
                    position: "absolute",
                    inset: `${100 - R_PCT * 2}%`,
                    borderRadius: "50%",
                    border: "1px solid rgba(140,180,184,0.14)",
                    background: "transparent",
                    animation: "hub-orbit-spin 28s linear infinite",
                    zIndex: 0,
                }}
            >
                {/* Traveling particle on the orbit */}
                <div style={{
                    position: "absolute", top: -3, left: "50%",
                    transform: "translateX(-50%)",
                    width: 6, height: 6, borderRadius: "50%",
                    background: "rgba(140,180,184,0.85)",
                    boxShadow: "0 0 8px rgba(140,180,184,0.9)",
                }} />
            </div>

            {/* Second counter-rotating ring — faint */}
            <div style={{
                position: "absolute",
                inset: "22%",
                borderRadius: "50%",
                border: "1px dashed rgba(200,169,110,0.07)",
                animation: "hub-orbit-spin 45s linear infinite reverse",
                zIndex: 0,
                pointerEvents: "none",
            }} />

            {/* ── Center circle ───────────────────────────────── */}
            <div
                ref={centerRef}
                style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 112, height: 112,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.14) 100%)",
                    border: "1px solid rgba(140,180,184,0.40)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 40px rgba(140,180,184,0.20), inset 0 1px 0 rgba(255,255,255,0.10)",
                    color: "var(--clr-accent)",
                    zIndex: 2,
                }}
            >
                {/* Inner ring */}
                <div style={{
                    position: "absolute", inset: 8,
                    borderRadius: "50%",
                    border: "1px solid rgba(140,180,184,0.18)",
                }}/>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            </div>

            {/* ── Orbit nodes ─────────────────────────────────── */}
            {icons.map((item, i) => {
                const angle = (i / icons.length) * 360 - 90;
                const rad   = angle * (Math.PI / 180);
                const x     = 50 + R_PCT * Math.cos(rad);
                const y     = 50 + R_PCT * Math.sin(rad);
                return (
                    <div
                        key={item.label}
                        style={{
                            position: "absolute",
                            left: `${x}%`, top: `${y}%`,
                            transform: "translate(-50%,-50%)",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                            zIndex: 3,
                        }}
                    >
                        <div
                            ref={el => { nodeRefs.current[i] = el; }}
                            style={{
                                width: 58, height: 58, borderRadius: "50%",
                                background: "linear-gradient(145deg, rgba(28,30,46,0.96) 0%, rgba(16,17,30,0.92) 100%)",
                                border: "1px solid rgba(140,180,184,0.22)",
                                backdropFilter: "blur(14px)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--clr-accent)",
                                boxShadow: "0 8px 28px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)",
                                cursor: "default",
                                transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease, border-color .35s ease",
                            }}
                            onMouseEnter={e => {
                                const d = e.currentTarget as HTMLDivElement;
                                d.style.transform = "translate(-50%,-50%) scale(1.22)";
                                d.style.boxShadow = "0 16px 40px rgba(0,0,0,0.60), 0 0 24px rgba(140,180,184,0.32), inset 0 1px 0 rgba(255,255,255,0.10)";
                                d.style.borderColor = "rgba(140,180,184,0.50)";
                                // brighten connector line
                                const line = lineRefs.current[i];
                                if (line) { line.setAttribute("stroke", "rgba(140,180,184,0.55)"); line.setAttribute("strokeWidth", "1.5"); line.style.filter = "drop-shadow(0 0 4px rgba(140,180,184,0.50))"; }
                            }}
                            onMouseLeave={e => {
                                const d = e.currentTarget as HTMLDivElement;
                                d.style.transform = "translate(-50%,-50%) scale(1)";
                                d.style.boxShadow = "0 8px 28px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)";
                                d.style.borderColor = "rgba(140,180,184,0.22)";
                                const line = lineRefs.current[i];
                                if (line) { line.setAttribute("stroke", "rgba(140,180,184,0.18)"); line.setAttribute("strokeWidth", "1"); line.style.filter = "none"; }
                            }}
                        >
                            {item.svg}
                        </div>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,240,0.32)", whiteSpace: "nowrap" }}>
                            {item.label}
                        </span>
                    </div>
                );
            })}

            {/* Keyframes */}
            <style>{`
                @keyframes hub-orbit-spin {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function SolutionsPage() {
    const [ctaH, setCtaH] = useState(false);

    const CONTROL_ICONS = [
        {
            label: "Lights",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V17H9v-2.8C7.21 13.16 6 11.22 6 9a6 6 0 0 1 6-6z" /></svg>,
        },
        {
            label: "Climate",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg>,
        },
        {
            label: "Security",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
        },
        {
            label: "Curtains",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M3 9h4l5 3-5 3H3" /></svg>,
        },
        {
            label: "Audio",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>,
        },
        {
            label: "App",
            svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} /></svg>,
        },
    ];

    return (
        <>
            <Navbar />
            <main style={{
                background: "linear-gradient(180deg, #09090e 0%, #0b0c14 30%, #08090f 60%, #09090e 100%)",
                fontFamily: "'Manrope', var(--font-sans, sans-serif)",
            }}>
                {/* ── Page-level design system ── */}
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
                    .sol-page * { box-sizing: border-box; }
                    /* Section rhythm */
                    .sol-section { scroll-margin-top: 80px; }
                    /* Consistent body text */
                    .sol-body { font-family: 'Manrope', sans-serif; font-weight: 300; line-height: 1.80; color: rgba(245,244,240,0.50); }
                    .sol-body-strong { font-family: 'Manrope', sans-serif; font-weight: 400; color: rgba(245,244,240,0.72); }
                    /* Premium card surface */
                    .sol-card { background: linear-gradient(145deg,rgba(22,24,40,0.88),rgba(13,13,22,0.80)); border: 1px solid rgba(255,255,255,0.055); backdrop-filter: blur(14px); border-radius: 20px; transition: border-color .35s ease, box-shadow .35s ease; }
                    .sol-card:hover { border-color: rgba(140,180,184,0.22); box-shadow: 0 28px 60px rgba(0,0,0,0.55), 0 0 40px rgba(140,180,184,0.06); }
                    /* Section separator gradient */
                    .sol-sep { border: none; height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent); margin: 0; }
                `}</style>

                {/* ══ 1. HERO ══════════════════════════════════════════ */}
                <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center" }}>
                    <Image src="/hero_night.webp" alt="Smart home" fill priority style={{ objectFit: "cover", scale: "1.06" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,9,14,.5) 0%, rgba(9,9,14,.28) 40%, rgba(9,9,14,.92) 100%)" }} />
                    <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1.75rem", animation: "s-fadeUp .9s .2s both" }}>
                            <span style={{ width: 24, height: 1, background: "var(--clr-accent)" }} />
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)" }}>Our Solutions</span>
                            <span style={{ width: 24, height: 1, background: "var(--clr-accent)" }} />
                        </div>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem,8vw,7.5rem)", fontWeight: 300, lineHeight: 1.03, letterSpacing: "-0.03em", color: "#f5f4f0", margin: "0 auto 24px", maxWidth: 900, animation: "s-fadeUp .95s .4s both" }}>
                            Smart Living,<br /><em style={{ color: "var(--clr-accent)" }}>Designed Around You</em>
                        </h1>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.75, color: "rgba(245,244,240,.5)", maxWidth: 520, margin: "0 auto 48px", animation: "s-fadeUp 1s .6s both" }}>
                            Control, comfort, and intelligence — seamlessly integrated into your home.
                        </p>
                        <a href="#control" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 40px", borderRadius: 100, border: "1px solid rgba(140,180,184,.4)", background: "rgba(140,180,184,.12)", color: "#f5f4f0", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", animation: "s-fadeUp 1s .8s both" }}>
                            Explore Solutions
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                    </div>
                    {/* Scroll line */}
                    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2, animation: "s-fadeUp 1s 1.2s both" }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,240,.28)" }}>Scroll</span>
                        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(140,180,184,.7), transparent)", animation: "s-pulse 2s ease-in-out infinite" }} />
                    </div>
                    <style>{`
                        @keyframes s-fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:none} }
                        @keyframes s-pulse { 0%,100%{opacity:.4;transform:scaleY(.7)} 50%{opacity:1;transform:scaleY(1)} }
                    `}</style>
                </section>

                {/* ══ 2. CONTROL HUB ═══════════════════════════════════ */}
                <div style={{ background: "linear-gradient(180deg, rgba(140,180,184,0.028) 0%, transparent 100%)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <section id="control" className="sol-section" style={{ maxWidth: 1320, margin: "0 auto", padding: "160px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
                    <Reveal from="left">
                        <Label text="One System" />
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem,4vw,3.6rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.025em", color: "#f5f4f0", marginBottom: 24 }}>
                            Everything under<br /><em style={{ color: "var(--clr-accent)" }}>one command.</em>
                        </h2>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,244,240,.48)", marginBottom: 40, maxWidth: 420 }}>
                            Lights, fans, curtains, and climate — all controlled via voice, app, or touch panel from anywhere in the world.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {["Works with Alexa, Google & Apple Home", "Control remotely from any device, globally", "One-tap scenes for every moment"].map(t => (
                                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="var(--clr-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.92rem", color: "rgba(245,244,240,.65)" }}>{t}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Icon ring — animated */}
                    <Reveal from="right">
                        <ControlHubOrbit icons={CONTROL_ICONS} />
                    </Reveal>
                </section>
                </div>

                {/* ══ 3–6. PARALLAX SOLUTION BLOCKS ════════════════════ */}
                <ParallaxSection
                    img="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&q=80&auto=format&fit=crop"
                    label="Smart Lighting"
                    heading={"Lighting that adapts\nto your mood."}
                    sub="Scene-based intelligence that shifts naturally as your day unfolds."
                    bullets={["Circadian-aware colour tuning", "One-tap scene activation", "Voice & remote control"]}
                />
                <ParallaxSection
                    img="https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1400&q=80&auto=format&fit=crop"
                    label="Climate & Comfort"
                    heading={"Every room at\nyour perfect temperature."}
                    sub="Predictive multi-zone climate that settles before you even arrive."
                    bullets={["Multi-zone precision control", "AI-driven scheduling", "Humidity & air quality sensing"]}
                    accent="var(--clr-gold)"
                    flip
                />
                <ParallaxSection
                    img="https://images.unsplash.com/photo-1558002038-1055907df827?w=1400&q=80&auto=format&fit=crop"
                    label="Security & Access"
                    heading={"Protected, always.\nOn-premise."}
                    sub="Biometric access and smart perimeter sensing — all data stays in your home."
                    bullets={["Edge-computed biometric entry", "Zero cloud dependency", "24/7 remote monitoring"]}
                />
                <ParallaxSection
                    img="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1400&q=80&auto=format&fit=crop"
                    label="Curtains & Ambience"
                    heading={"Set the scene\nwithout lifting a finger."}
                    sub="Automated curtains that respond to light, time, and your daily rhythm."
                    bullets={["Schedule or voice-trigger", "Pairs with lighting scenes", "Retrofit to any window"]}
                    accent="var(--clr-gold)"
                    flip
                />

                {/* ══ 7. RETROFIT ══════════════════════════════════════ */}
                <div style={{ background: "linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.018) 50%, transparent 100%)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <section className="sol-section" style={{ maxWidth: 1320, margin: "0 auto", padding: "160px 60px" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
                        <Label text="Easy Installation" />
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "-0.025em", color: "#f5f4f0", lineHeight: 1.1 }}>
                            No rewiring. No renovation.<br /><em style={{ color: "var(--clr-accent)" }}>Just installation.</em>
                        </h2>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                        {[
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                                title: "Works With Existing Wiring",
                                desc: "Drop-in replacement for standard switches. Zero new cabling required."
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
                                title: "No Structural Changes",
                                desc: "Fits behind your existing switch plates. Your walls stay pristine."
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                                title: "Installed in Hours",
                                desc: "A typical home is live and operational within a single day."
                            },
                        ].map((card, i) => (
                            <Reveal key={card.title} delay={i * 120}>
                                <div className="sol-card" style={{ padding: "48px 40px", height: "100%" }}>
                                    <div style={{ color: "var(--clr-accent)", marginBottom: 20 }}>{card.icon}</div>
                                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#f0ede8", marginBottom: 14, letterSpacing: "-0.015em", lineHeight: 1.25 }}>{card.title}</h3>
                                    <p className="sol-body" style={{ fontSize: "0.9rem" }}>{card.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
                </div>

                {/* ══ 8. ECOSYSTEM ═════════════════════════════════════ */}
                <section className="sol-section" style={{ padding: "160px 60px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.04)", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(140,180,184,0.022) 0%, transparent 50%, rgba(140,180,184,0.012) 100%)" }}>

                    {/* Section ambient glow */}
                    <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "60vh", background: "radial-gradient(ellipse at center, rgba(140,180,184,0.06) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

                    <style>{`
                        @keyframes eco-float {
                            0%,100% { transform: translateY(0px); }
                            50%      { transform: translateY(-7px); }
                        }
                    `}</style>

                    <Reveal>
                        <Label text="Ecosystem" />
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "-0.025em", color: "#f5f4f0", marginBottom: 16, lineHeight: 1.1 }}>
                            Works with everything<br /><em style={{ color: "var(--clr-accent)" }}>you already use.</em>
                        </h2>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", color: "rgba(245,244,240,.42)", maxWidth: 440, margin: "0 auto 80px" }}>
                            Native integration with all major smart home ecosystems.
                        </p>
                    </Reveal>

                    {/* Logo row */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "72px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>

                        {/* ── Amazon Alexa ── */}
                        <Reveal delay={0}>
                            <div
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "default", animation: "eco-float 5.5s ease-in-out 0s infinite" }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "drop-shadow(0 0 18px rgba(0,179,230,0.55))"; d.style.transform = "scale(1.10)"; d.style.transition = "transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s ease"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "none"; d.style.transform = "scale(1)"; }}
                            >
                                {/* Alexa SVG — wordmark ring + wave */}
                                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="44" cy="44" r="40" fill="rgba(0,179,230,0.10)" stroke="rgba(0,179,230,0.25)" strokeWidth="1" />
                                    {/* Alexa ring arc – simplified iconic shape */}
                                    <path d="M44 18C29.641 18 18 29.641 18 44C18 58.359 29.641 70 44 70C58.359 70 70 58.359 70 44" stroke="rgba(0,179,230,0.85)" strokeWidth="2.5" strokeLinecap="round" />
                                    {/* Sound waves */}
                                    <path d="M35 37 Q44 28 53 37" stroke="rgba(0,179,230,0.60)" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    <path d="M31 33 Q44 20 57 33" stroke="rgba(0,179,230,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    {/* Mic dot */}
                                    <circle cx="44" cy="46" r="5" fill="rgba(0,179,230,0.90)" />
                                    <rect x="41" y="51" width="6" height="7" rx="3" fill="rgba(0,179,230,0.90)" />
                                    <line x1="44" y1="58" x2="44" y2="63" stroke="rgba(0,179,230,0.70)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="40" y1="63" x2="48" y2="63" stroke="rgba(0,179,230,0.70)" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,179,230,0.70)" }}>Alexa</span>
                            </div>
                        </Reveal>

                        {/* Divider */}
                        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.07)" }} />

                        {/* ── Google Home ── */}
                        <Reveal delay={120}>
                            <div
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "default", animation: "eco-float 6s ease-in-out 0.8s infinite" }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "drop-shadow(0 0 18px rgba(66,133,244,0.50))"; d.style.transform = "scale(1.10)"; d.style.transition = "transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s ease"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "none"; d.style.transform = "scale(1)"; }}
                            >
                                {/* Google Home – stylised G + home */}
                                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="44" cy="44" r="40" fill="rgba(66,133,244,0.08)" stroke="rgba(66,133,244,0.22)" strokeWidth="1" />
                                    {/* Home silhouette */}
                                    <path d="M44 22L24 38V66H38V52H50V66H64V38L44 22Z" fill="rgba(66,133,244,0.15)" stroke="rgba(66,133,244,0.75)" strokeWidth="2" strokeLinejoin="round" />
                                    {/* Google colour dots on roof */}
                                    <circle cx="44" cy="28" r="2.5" fill="#4285F4" />
                                    <circle cx="38" cy="33" r="2" fill="#EA4335" />
                                    <circle cx="50" cy="33" r="2" fill="#FBBC04" />
                                    <circle cx="44" cy="38" r="2" fill="#34A853" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(66,133,244,0.70)" }}>Google Home</span>
                            </div>
                        </Reveal>

                        {/* Divider */}
                        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.07)" }} />

                        {/* ── Apple Home ── */}
                        <Reveal delay={240}>
                            <div
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "default", animation: "eco-float 5.8s ease-in-out 1.6s infinite" }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "drop-shadow(0 0 18px rgba(255,255,255,0.30))"; d.style.transform = "scale(1.10)"; d.style.transition = "transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s ease"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "none"; d.style.transform = "scale(1)"; }}
                            >
                                {/* Apple  */}
                                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="44" cy="44" r="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                                    {/* Apple logo path */}
                                    <path d="M54.5 30.5C56.5 28.2 57.8 25 57.5 21.8C54.7 22 51.2 23.8 49.1 26.2C47.2 28.3 45.7 31.7 46.1 34.8C49.2 35 52.4 33 54.5 30.5Z" fill="rgba(255,255,255,0.85)" />
                                    <path d="M57.3 35.8C53.4 35.6 50.1 38 48.2 38C46.3 38 43.4 35.9 40.1 36C34.7 36.1 29.5 39.5 26.6 44.8C20.8 55.5 25.1 71.3 30.7 79.8C33.5 84 36.8 88.7 41.2 88.5C45.3 88.3 46.9 85.8 51.9 85.8C56.9 85.8 58.3 88.5 62.7 88.4C67.3 88.3 70.1 84.2 72.9 80C76.2 75.2 77.6 70.6 77.7 70.3C77.6 70.2 68.9 66.9 68.8 57.2C68.7 48.9 75.6 45 76 44.7C72 38.7 65.5 36.1 57.3 35.8Z" fill="rgba(255,255,255,0.85)" transform="scale(0.52) translate(30, 10)" />
                                    {/* Simplified  for small size */}
                                    <path d="M49 25 C51 22 53 20 55 22 C53 24 51 26 49 25Z" fill="rgba(255,255,255,0.80)" />
                                    <path d="M44 34 C47 30 52 29 55 31 C57 33 58 37 57 41 C56 47 52 54 48 58 C46 60 44 61 42 59 C40 57 38 56 36 59 C34 61 32 60 30 57 C26 51 24 44 26 39 C28 34 32 31 36 32 C39 33 41 34 44 34Z" fill="rgba(255,255,255,0.82)" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Apple Home</span>
                            </div>
                        </Reveal>

                        {/* Divider */}
                        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.07)" }} />

                        {/* ── Matter ── */}
                        <Reveal delay={360}>
                            <div
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "default", animation: "eco-float 6.2s ease-in-out 2.4s infinite" }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = `drop-shadow(0 0 18px rgba(200,169,110,0.55))`; d.style.transform = "scale(1.10)"; d.style.transition = "transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s ease"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.filter = "none"; d.style.transform = "scale(1)"; }}
                            >
                                {/* Matter – interlocking M shapes (official style) */}
                                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="44" cy="44" r="40" fill="rgba(200,169,110,0.08)" stroke="rgba(200,169,110,0.25)" strokeWidth="1" />
                                    {/* Matter M letterform — two overlapping arcs */}
                                    <path d="M22 58 L22 34 L33 50 L44 34 L44 58" stroke="rgba(200,169,110,0.90)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M44 58 L44 34 L55 50 L66 34 L66 58" stroke="rgba(200,169,110,0.90)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Subtle underline accent */}
                                    <line x1="26" y1="65" x2="62" y2="65" stroke="rgba(200,169,110,0.30)" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,169,110,0.70)" }}>Matter</span>
                            </div>
                        </Reveal>

                    </div>

                    {/* Trust line */}
                    <Reveal delay={500}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.78rem", letterSpacing: "0.10em", color: "rgba(245,244,240,0.22)", marginTop: 72, textTransform: "uppercase" }}>
                            Certified compatibility · Zero cloud lock-in · Local-first control
                        </p>
                    </Reveal>
                </section>

                {/* ══ 9. TOUCH PANELS ══════════════════════════════════ */}
                <div style={{ background: "linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.015) 50%, transparent 100%)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <section className="sol-section" style={{ maxWidth: 1320, margin: "0 auto", padding: "160px 60px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                        <Reveal from="left">
                            <Label text="Touch Panels" />
                            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "-0.025em", color: "#f5f4f0", marginBottom: 20, lineHeight: 1.1 }}>
                                Elegant control,<br /><em style={{ color: "var(--clr-accent)" }}>at your fingertips.</em>
                            </h2>
                            <p className="sol-body" style={{ fontSize: "0.95rem", maxWidth: 380, marginTop: 20 }}>
                                Every room. One surface. Designed to disappear into your wall and reappear when you need it.
                            </p>
                        </Reveal>

                        {/* Panel grid */}
                        <Reveal from="right">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                {["/images/services/panels.png", "/images/services/control.png", "/images/services/lighting.png", "/images/services/voice.png"].map((src, i) => (
                                    <div key={i} style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "1/1", border: "1px solid rgba(255,255,255,.06)", transition: "transform .35s ease, box-shadow .35s ease" }}
                                        onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "scale(1.04)"; d.style.boxShadow = "0 20px 40px rgba(0,0,0,.5)"; }}
                                        onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "none"; d.style.boxShadow = "none"; }}
                                    >
                                        <img src={src} alt="Panel" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>
                </div>

                {/* ══ 10. PROCESS ══════════════════════════════════════ */}
                <ProcessSection />

                {/* ══ 11. FINAL CTA ═════════════════════════════════════ */}
                <section className="sol-section" style={{ position: "relative", padding: "200px 60px", textAlign: "center", overflow: "hidden", background: "linear-gradient(180deg, transparent 0%, rgba(140,180,184,0.032) 50%, transparent 100%)" }}>
                    <div aria-hidden style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(140,180,184,.07) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
                    <div aria-hidden style={{ position: "absolute", bottom: "-20%", right: "-5%", width: "45vw", height: "45vw", maxWidth: 600, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(200,169,110,.05) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
                    <Reveal style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
                        <Label text="Get Started" />
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#f5f4f0", marginBottom: 24 }}>
                            Start your smart<br /><em style={{ color: "var(--clr-accent)" }}>home journey.</em>
                        </h2>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(245,244,240,.42)", marginBottom: 56 }}>
                            Tell us about your home. We&apos;ll handle everything else.
                        </p>
                        <Link href="/contact"
                            onMouseEnter={() => setCtaH(true)}
                            onMouseLeave={() => setCtaH(false)}
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 14, padding: "20px 52px",
                                borderRadius: 100, border: "1px solid rgba(140,180,184,.4)",
                                background: ctaH ? "rgba(140,180,184,.24)" : "rgba(140,180,184,.12)",
                                color: "#f5f4f0", fontFamily: "var(--font-sans)", fontSize: "0.85rem",
                                fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                                boxShadow: ctaH ? "0 20px 60px rgba(140,180,184,.22)" : "0 8px 24px rgba(0,0,0,.3)",
                                transform: ctaH ? "translateY(-3px)" : "none",
                                transition: "all .3s cubic-bezier(.22,.61,.36,1)",
                            }}>
                            Get Started
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                    </Reveal>
                </section>

            </main>
            <Footer />
        </>
    );
}
