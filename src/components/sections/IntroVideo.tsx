"use client";

/**
 * IntroVideo.tsx
 *
 * Cinematic video section embedding the Wistia intro video.
 *
 * Architecture:
 *   - Component → useScrollTimeline → buildIntroVideoTimeline
 *   - Wistia scripts injected lazily via useEffect (never blocks render)
 *   - wistia-player custom element renders inline (no iframe boilerplate)
 */

import React, { useRef, useEffect } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildIntroVideoTimeline } from "@/animations/introVideoTimeline";

// Teach TypeScript about the wistia-player custom element
declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "wistia-player": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    "media-id"?: string;
                    aspect?: string | number;
                },
                HTMLElement
            >;
        }
    }
}

export default function IntroVideo() {
    const sectionRef       = useRef<HTMLElement>(null);
    const labelRef         = useRef<HTMLDivElement>(null);
    const headlineRef      = useRef<HTMLHeadingElement>(null);
    const descriptionRef   = useRef<HTMLParagraphElement>(null);
    const videoWrapperRef  = useRef<HTMLDivElement>(null);

    // Wire scroll animation
    useScrollTimeline(buildIntroVideoTimeline, {
        section:      sectionRef,
        label:        labelRef,
        headline:     headlineRef,
        description:  descriptionRef,
        videoWrapper: videoWrapperRef,
    });

    // Lazy-load Wistia scripts — only when this component mounts (client-side)
    // Scripts are marked async so they never block rendering
    useEffect(() => {
        const ids = ["wistia-player-js", "wistia-embed-js"];

        const scripts: HTMLScriptElement[] = [
            { src: "https://fast.wistia.com/player.js",           id: ids[0], type: undefined,  module: false },
            { src: "https://fast.wistia.com/embed/ksb80hlnw9.js", id: ids[1], type: "module",   module: true  },
        ].map(({ src, id, type }) => {
            // Skip if already injected (HMR / re-mount safety)
            if (document.getElementById(id)) return null as unknown as HTMLScriptElement;

            const s = document.createElement("script");
            s.src   = src;
            s.id    = id;
            s.async = true;
            if (type) s.type = type;
            document.head.appendChild(s);
            return s;
        }).filter(Boolean);

        // Cleanup: remove scripts if component unmounts
        return () => {
            scripts.forEach((s) => {
                if (s && document.head.contains(s)) document.head.removeChild(s);
            });
            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="intro-video"
            aria-label="Weinkling Introduction Video"
            style={{
                background: "var(--clr-void)",
                borderTop: "1px solid rgba(245,244,240,0.04)",
            }}
        >
            <div
                style={{
                    maxWidth:      "1200px",
                    margin:        "0 auto",
                    paddingTop:    "120px",
                    paddingBottom: "120px",
                    paddingLeft:   "48px",
                    paddingRight:  "48px",
                    textAlign:     "center",
                }}
            >
                {/* ── Section label ─────────────────────────────────── */}
                <div
                    ref={labelRef}
                    style={{
                        display:       "flex",
                        alignItems:    "center",
                        justifyContent:"center",
                        gap:           "0.75rem",
                        marginBottom:  "1.5rem",
                    }}
                >
                    <span
                        style={{
                            display:    "inline-block",
                            width:      "24px",
                            height:     "1px",
                            background: "var(--clr-gold)",
                        }}
                    />
                    <span
                        style={{
                            fontFamily:    "var(--font-sans)",
                            fontSize:      "0.68rem",
                            fontWeight:    500,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color:         "var(--clr-gold)",
                        }}
                    >
                        Our Story
                    </span>
                    <span
                        style={{
                            display:    "inline-block",
                            width:      "24px",
                            height:     "1px",
                            background: "var(--clr-gold)",
                        }}
                    />
                </div>

                {/* ── Headline ──────────────────────────────────────── */}
                <h2
                    ref={headlineRef}
                    style={{
                        fontFamily:    "var(--font-serif)",
                        fontSize:      "clamp(2.2rem, 5vw, 4rem)",
                        fontWeight:    300,
                        lineHeight:    1.08,
                        letterSpacing: "-0.025em",
                        color:         "var(--clr-mist)",
                        margin:        "0 0 1.5rem",
                    }}
                >
                    A glimpse into{" "}
                    <em
                        style={{
                            fontStyle:           "normal",
                            background:          "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))",
                            WebkitBackgroundClip:"text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip:      "text",
                        }}
                    >
                        intelligent living.
                    </em>
                </h2>

                {/* ── Description ───────────────────────────────────── */}
                <p
                    ref={descriptionRef}
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize:   "1rem",
                        fontWeight: 400,
                        color:      "var(--clr-text-secondary)",
                        lineHeight: 1.8,
                        maxWidth:   "520px",
                        margin:     "0 auto 3.5rem",
                        textAlign:  "center",
                    }}
                >
                    Discover how Weinkling seamlessly integrates lighting, climate,
                    security, and entertainment into one intelligent ecosystem.
                </p>

                {/* ── Video player ──────────────────────────────────── */}
                <div
                    ref={videoWrapperRef}
                    style={{
                        borderRadius: "16px",
                        overflow:     "hidden",
                        boxShadow:    "0 40px 80px rgba(0,0,0,0.4)",
                        maxWidth:     "100%",
                        /* Maintain 16:9 while wistia-player loads */
                        aspectRatio:  "16 / 9",
                        background:   "rgba(10,10,15,0.8)",
                        position:     "relative",
                    }}
                >
                    {/* Wistia custom element — scripts loaded in useEffect */}
                    {React.createElement("wistia-player", {
                        "media-id": "ksb80hlnw9",
                        aspect: 1.7777777777777777,
                        style: {
                            width:    "100%",
                            height:   "100%",
                            display:  "block",
                            position: "absolute",
                            inset:    0,
                        } as React.CSSProperties,
                    })}
                </div>
            </div>
        </section>
    );
}
