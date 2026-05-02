"use client";

/**
 * ControlMethods.tsx
 *
 * Cinematic scroll-driven section — four smart home control methods.
 *
 * Design:
 *   - Each panel = full-bleed background image + dark gradient overlay
 *   - Content aligned left, max-width 520px
 *   - No floating UI card — background IS the visual
 *   - Right side reserved for future transparent PNG product images (position: absolute)
 *
 * Architecture: Component → useScrollTimeline → buildControlMethodsTimeline
 * Zero animation logic lives in this file.
 */

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildControlMethodsTimeline } from "@/animations/controlMethodsTimeline";

// ─ SVG Icons ──────────────────────────────────────────────────────────────
const TouchSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m-2 6V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
        <path d="M6 10a2 2 0 0 0-2 2v4c0 4 6 8 8 8s8-4 8-8v-4" />
    </svg>
);
const LockSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);
const SwipeSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
);
const RemoteSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="20" rx="4" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <line x1="12" y1="6" x2="12" y2="10" />
    </svg>
);
const WifiSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
);
const BatterySVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="18" height="11" rx="2" /><path d="M22 11v3" />
        <line x1="6" y1="11" x2="6" y2="14" /><line x1="10" y1="11" x2="10" y2="14" />
    </svg>
);
const PhoneSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} />
    </svg>
);
const AndroidSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
);
const MicSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
);
const SpeakerSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="14" r="4" />
        <line x1="12" y1="6" x2="12.01" y2="6" strokeWidth={2} />
    </svg>
);

// Voice waveform icon — 5 bars each with independent CSS animation class
function VoiceBarIcon() {
    const bars = [
        { h: 10, cls: "cm-voice-bar cm-voice-bar-1" },
        { h: 16, cls: "cm-voice-bar cm-voice-bar-2" },
        { h: 22, cls: "cm-voice-bar cm-voice-bar-3" },
        { h: 16, cls: "cm-voice-bar cm-voice-bar-4" },
        { h: 10, cls: "cm-voice-bar cm-voice-bar-5" },
    ];
    return (
        <svg viewBox="0 0 24 24" fill="none">
            {bars.map((b, i) => (
                <rect
                    key={i}
                    className={b.cls}
                    x={2 + i * 4.5}
                    y={(24 - b.h) / 2}
                    width={3}
                    height={b.h}
                    rx={1.5}
                    fill="currentColor"
                />
            ))}
        </svg>
    );
}

// ─ Panel Data ─────────────────────────────────────────────────────────────
// bgImage: using hero_night.png for all panels until product assets are ready.
// When ready, replace per-panel with: touch-control-bg.jpg, etc.
const METHODS = [
    {
        id: "touch",
        number: "01",
        title: "Touch Control",
        description:
            "Sensitive touch panels allow effortless control of lighting, modes, and scenes with simple gestures.",
        bgImage: "/1.webp",
        accent: "#8cb4b8",
        icons: [
            { label: "Touch Gesture", svg: <TouchSVG /> },
            { label: "Child Lock",    svg: <LockSVG /> },
            { label: "Swipe Control", svg: <SwipeSVG /> },
        ],
    },
    {
        id: "remote",
        number: "02",
        title: "Remote Control",
        description:
            "Rechargeable IR remote lets you control lighting, fans, and appliances from anywhere in the room.",
        bgImage: "/2.webp",
        accent: "#c8a96e",
        icons: [
            { label: "Remote",   svg: <RemoteSVG /> },
            { label: "Wireless", svg: <WifiSVG /> },
            { label: "Battery",  svg: <BatterySVG /> },
        ],
    },
    {
        id: "mobile",
        number: "03",
        title: "Mobile App Control",
        description:
            "Control lighting, climate, and security from anywhere using the Weinkling mobile application.",
        bgImage: "/3.webp",
        accent: "#8cb4b8",
        icons: [
            { label: "Phone",   svg: <PhoneSVG /> },
            { label: "Android", svg: <AndroidSVG /> },
            { label: "Wi-Fi",   svg: <WifiSVG /> },
        ],
    },
    {
        id: "voice",
        number: "04",
        title: "Voice Control",
        description:
            "Control your home using voice assistants like Amazon Alexa and Google Home.",
        bgImage: "/4.webp",
        accent: "#c8a96e",
        icons: [
            { label: "Microphone",    svg: <MicSVG /> },
            { label: "Voice Wave",    svg: <VoiceBarIcon /> },
            { label: "Smart Speaker", svg: <SpeakerSVG /> },
        ],
    },
];

// ─ Component ──────────────────────────────────────────────────────────────
export default function ControlMethods() {
    const sectionRef         = useRef<HTMLElement>(null);
    const sectionLabelRef    = useRef<HTMLDivElement>(null);
    const sectionHeadlineRef = useRef<HTMLHeadingElement>(null);
    const panelsRef          = useRef<(HTMLDivElement | null)[]>([]);
    const panelTitlesRef     = useRef<(HTMLHeadingElement | null)[]>([]);
    const panelDescRef       = useRef<(HTMLParagraphElement | null)[]>([]);
    const panelIconsRef      = useRef<(HTMLDivElement | null)[]>([]);
    const panelImagesRef     = useRef<(HTMLDivElement | null)[]>([]);

    useScrollTimeline(buildControlMethodsTimeline, {
        section:           sectionRef,
        sectionLabel:      sectionLabelRef,
        sectionHeadline:   sectionHeadlineRef,
        panels:            panelsRef,
        panelTitles:       panelTitlesRef,
        panelDescriptions: panelDescRef,
        panelIcons:        panelIconsRef,
        panelImages:       panelImagesRef,
    });

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            style={{ position: "relative", width: "100%", background: "var(--clr-void)" }}
        >

            {/* ── Section Header ───────────────────────────────────────── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    paddingTop: "clamp(5rem, 10vh, 8rem)",
                    paddingBottom: "clamp(2rem, 4vh, 3rem)",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                }}
            >
                <div
                    ref={sectionLabelRef}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "1.25rem",
                        padding: "0.35rem 1.1rem",
                        borderRadius: "9999px",
                        border: "1px solid rgba(140,180,184,0.3)",
                        background: "rgba(140,180,184,0.08)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.68rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--clr-accent)",
                    }}
                >
                    <span
                        style={{
                            width: 6, height: 6,
                            borderRadius: "50%",
                            background: "var(--clr-accent)",
                            display: "inline-block",
                        }}
                    />
                    Four Ways to Control
                </div>

                <h2
                    ref={sectionHeadlineRef}
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        color: "var(--clr-mist)",
                        lineHeight: 1.1,
                        margin: 0,
                    }}
                >
                    Your Home,{" "}
                    <em style={{ fontStyle: "normal", color: "var(--clr-accent)" }}>Your Way</em>
                </h2>
            </div>

            {/* ── Panel Stack ──────────────────────────────────────────── */}
            {/*
                Desktop: panels are absolutely stacked inside a fixed-height wrapper.
                         GSAP drives which panel is visible at any moment.
                Mobile:  natural vertical flow — each panel scrolls into view.
            */}
            <div
                className="cm-panels-wrapper"
                style={{ position: "relative", zIndex: 2, width: "100%" }}
            >
                <style>{`
                    @media (min-width: 768px) {
                        .cm-panels-wrapper { height: 80vh; }
                        .cm-panel {
                            position: absolute !important;
                            inset: 0 !important;
                            /* GSAP takes over opacity+transform after mount */
                            opacity: 0;
                            transform: translateY(40px);
                        }
                    }
                    /* Mobile: panels stack naturally and must be visible */
                    @media (max-width: 767px) {
                        .cm-panels-wrapper {
                            display: flex;
                            flex-direction: column;
                        }
                        .cm-panel {
                            position: relative !important;
                            min-height: 75vw !important;
                            opacity: 1 !important;
                            transform: none !important;
                        }
                        /* Mobile: content container uses full width with tighter padding */
                        .cm-panel > div > div {
                            padding: 0 20px !important;
                        }
                        /* Content column takes full width on mobile */
                        .cm-panel > div > div > div {
                            max-width: 100% !important;
                        }
                        /* Hide device image on mobile — text uses full width */
                        .cm-switchboard { display: none !important; }
                        /* Progress dots hidden on mobile */
                        #cm-progress-dots { display: none !important; }
                    }
                `}</style>

                {METHODS.map((method, i) => (
                    <div
                        key={method.id}
                        ref={(el) => { panelsRef.current[i] = el; }}
                        className="cm-panel"
                        style={{
                            width: "100%",
                            minHeight: "80vh",
                            display: "flex",
                            alignItems: "center",
                            // Full-bleed background image — dark overlay for text legibility
                            backgroundImage: `
                                linear-gradient(
                                    rgba(0,0,0,0.55),
                                    rgba(0,0,0,0.65)
                                ),
                                url(${method.bgImage})
                            `,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            position: "relative",
                            overflow: "hidden",
                            // opacity & transform intentionally omitted — GSAP exclusively
                            // controls these via gsap.set() + the scrubbed mainTl
                        }}
                    >
                        {/* Hidden div keeps panelImagesRef aligned with timeline API */}
                        <div ref={(el) => { panelImagesRef.current[i] = el; }} style={{ display: "none" }} />

                        {/* ── Switchboard device image — right side ───── */}
                        <Image
                            src="/Untitled.png"
                            alt="Weinkling switchboard"
                            width={420}
                            height={560}
                            priority={i === 0}
                            style={{
                                position:   "absolute",
                                right:      "8%",
                                top:        "50%",
                                transform:  "translateY(-50%)",
                                maxWidth:   "clamp(220px, 28vw, 420px)",
                                width:      "auto",
                                height:     "auto",
                                maxHeight:  "82%",
                                objectFit:  "contain",
                                filter:     "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
                                pointerEvents: "none",
                                userSelect: "none",
                                // hidden on mobile — content is full-width there
                                display:    "block",
                            }}
                            className="cm-switchboard"
                        />

                        {/* ── Content container ──────────────────────── */}
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "1400px",
                                margin: "0 auto",
                                padding: "0 48px",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {/* Content column — max 520px wide, hugs left */}
                            <div style={{ maxWidth: "520px" }}>

                                {/* Step indicator */}
                                <div
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        letterSpacing: "3px",
                                        color: "rgba(255,255,255,0.45)",
                                        marginBottom: "1.25rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {method.number} / 04
                                </div>

                                {/* Title */}
                                <h3
                                    ref={(el) => { panelTitlesRef.current[i] = el; }}
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                                        fontWeight: 300,
                                        letterSpacing: "-0.03em",
                                        color: "var(--clr-mist)",
                                        lineHeight: 1.05,
                                        margin: "0 0 1.5rem",
                                    }}
                                >
                                    {method.title}
                                </h3>

                                {/* Description */}
                                <p
                                    ref={(el) => { panelDescRef.current[i] = el; }}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                                        fontWeight: 400,
                                        color: "rgba(245,244,240,0.65)",
                                        lineHeight: 1.8,
                                        margin: "0 0 2.5rem",
                                    }}
                                >
                                    {method.description}
                                </p>

                                {/* Icon row — static, no animations */}
                                <div
                                    ref={(el) => { panelIconsRef.current[i] = el; }}
                                    style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "nowrap" }}
                                >
                                    {method.icons.map((icon) => (
                                        <div
                                            key={icon.label}
                                            className="cm-icon"
                                            title={icon.label}
                                            style={{
                                                width: "56px",
                                                height: "56px",
                                                borderRadius: "50%",
                                                background: "rgba(255,255,255,0.08)",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "rgba(245,244,240,0.9)",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <div style={{ width: "22px", height: "22px" }}>
                                                {icon.svg}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Progress dots ─────────────────────────────── */}
            <div
                id="cm-progress-dots"
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    zIndex: 10,
                }}
                aria-hidden="true"
            >
                {METHODS.map((m) => (
                    <div
                        key={m.id}
                        style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "rgba(245,244,240,0.2)",
                            border: "1px solid rgba(245,244,240,0.08)",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
