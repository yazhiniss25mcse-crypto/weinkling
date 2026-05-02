"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.12, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

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

// ── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All Panels", "8M Series", "6M Series", "4M & 3M Series"] as const;
type Category = typeof CATEGORIES[number];

const PRODUCTS: {
    id: number;
    category: Category;
    name: string;
    config: string;
    size: string;
    image: string;
    badge?: string;
}[] = [
    // ── 8M Series ─────────────────────────────────────────────
    {
        id: 11,
        category: "8M Series",
        name: "Module: 8M Standard",
        config: "1 5-Amp socket + 1 Dimmer/Fan (Regulator) + 1 strip light dimmer + 3 lights",
        size: "245mm × 85mm",
        image: "/boards/11.png",
        badge: "Flagship",
    },
    {
        id: 12,
        category: "8M Series",
        name: "Module: 8M Lite",
        config: "1 Fan/Dimmer + 2 Curtain/4 Light + 2 lights",
        size: "245mm × 85mm",
        image: "/boards/12.png",
    },
    {
        id: 13,
        category: "8M Series",
        name: "Module: 8M Plug",
        config: "1 3-Pin socket + 1 2-Pin socket + 3 lights",
        size: "245mm × 85mm",
        image: "/boards/13.png",
    },

    // ── 6M Series ─────────────────────────────────────────────
    {
        id: 1,
        category: "6M Series",
        name: "Module: 6M Plug",
        config: "1 2-Pin socket + 3 lights + 1 fan",
        size: "225mm × 85mm",
        image: "/boards/1.png",
        badge: "Bestseller",
    },
    {
        id: 14,
        category: "6M Series",
        name: "Module: 6M Standard",
        config: "1 Fans/Dimmer + 1 Fans/Dimmer + 4 lights",
        size: "225mm × 85mm",
        image: "/boards/14.png",
    },
    {
        id: 15,
        category: "6M Series",
        name: "Module: 6M Lite",
        config: "2 Dimmer + 2 Curtain",
        size: "225mm × 85mm",
        image: "/boards/15.png",
    },

    // ── 4M & 3M Series ────────────────────────────────────────
    {
        id: 2,
        category: "4M & 3M Series",
        name: "Module: 4M Standard",
        config: "4 Lights + 1 High Load",
        size: "150mm × 85mm",
        image: "/boards/2.png",
    },
    {
        id: 3,
        category: "4M & 3M Series",
        name: "Module: 4M Plug",
        config: "4 Lights + 1 High Load",
        size: "150mm × 85mm",
        image: "/boards/3.png",
    },
    {
        id: 4,
        category: "4M & 3M Series",
        name: "Module: 3M Bell",
        config: "1 Bell + 2 Lights",
        size: "115mm × 85mm",
        image: "/boards/4.png",
    },
    {
        id: 5,
        category: "4M & 3M Series",
        name: "Module: 2M Bell",
        config: "1 Bell + 1 Light",
        size: "115mm × 85mm",
        image: "/boards/5.png",
    },
    {
        id: 6,
        category: "4M & 3M Series",
        name: "Module: 2M Curtain",
        config: "1 Curtain",
        size: "115mm × 85mm",
        image: "/boards/6.png",
    },
    {
        id: 7,
        category: "4M & 3M Series",
        name: "Module: 3M Curtain",
        config: "2 Curtain",
        size: "115mm × 85mm",
        image: "/boards/7.png",
    },
    {
        id: 8,
        category: "4M & 3M Series",
        name: "Module: 3M High Load",
        config: "1 High Load switch",
        size: "115mm × 85mm",
        image: "/boards/8.png",
    },
    {
        id: 9,
        category: "4M & 3M Series",
        name: "Module: 2/3M Standard",
        config: "2 Lights",
        size: "115mm × 85mm",
        image: "/boards/9.png",
    },
    {
        id: 10,
        category: "4M & 3M Series",
        name: "Module: 3M Standard",
        config: "4 Lights",
        size: "115mm × 85mm",
        image: "/boards/10.png",
        badge: "New",
    },
];

const COLORS = [
    { name: "Gloss Black",  hex: "#0e0e0e",  border: "#3a3a3a",  glowColor: "rgba(180,180,190,0.18)" },
    { name: "Matte White",  hex: "#f0ede8",  border: "#c8c4bc",  glowColor: "rgba(240,237,232,0.22)" },
    { name: "Brushed Gold", hex: "#c8a96e",  border: "#a0803e",  glowColor: "rgba(200,169,110,0.30)" },
    { name: "Champagne",    hex: "#d4c5a9",  border: "#b8a882",  glowColor: "rgba(212,197,169,0.25)" },
    { name: "Rose Gold",    hex: "#c9956e",  border: "#a06844",  glowColor: "rgba(201,149,110,0.28)" },
    { name: "Pearl Grey",   hex: "#a8a8b0",  border: "#808088",  glowColor: "rgba(168,168,176,0.22)" },
];


const FEATURES = [
    {
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
        title: "Smooth Dimming",
        desc: "0–100% stepless dimming with flicker-free LED compatibility across all panel types.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
            </svg>
        ),
        title: "Fan Speed Control",
        desc: "Regulate fan speed across 4 levels with auto recall and timer scheduling.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h3M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M12 8v8M9 11h6" />
            </svg>
        ),
        title: "Two-Way Switching",
        desc: "Control any load from multiple locations — stairs, corridors, large rooms.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: "High Load Support",
        desc: "Up to 16A per module — built for ceiling fans, water heaters, and heavy appliances.",
    },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("All Panels");
    const [selectedColor, setSelectedColor] = useState(0);
    const [previewKey, setPreviewKey]       = useState(0);
    const gridRef          = useRef<HTMLDivElement>(null);
    const heroStatsRef     = useRef<HTMLDivElement>(null);

    // ── Configurator section refs ────────────────────────────
    const configSectionRef = useRef<HTMLElement>(null);
    const colARef          = useRef<HTMLDivElement>(null);
    const colBRef          = useRef<HTMLDivElement>(null);
    const colCRef          = useRef<HTMLDivElement>(null);
    const panelWrapRef     = useRef<HTMLDivElement>(null);
    const swatchGridRef    = useRef<HTMLDivElement>(null);
    const ledGridRef       = useRef<HTMLDivElement>(null);
    const configRowsRef    = useRef<HTMLDivElement>(null);
    const summaryPillRef   = useRef<HTMLDivElement>(null);
    const cfgHeadingRef    = useRef<HTMLDivElement>(null);

    const filtered = activeCategory === "All Panels"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    // Register GSAP once on mount
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    // ── GSAP scroll-reveal for hero stats cards ──────────────
    useEffect(() => {
        const el = heroStatsRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            // Fade in container first
            gsap.to(el, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.85,
            });
            // Cards animate from same baseline — use gsap.to (not from)
            // so all start at rest (y:0) and stagger up cleanly
            gsap.from(".prod-stat-card", {
                opacity: 0,
                y:       28,
                duration: 0.8,
                ease:    "power3.out",
                stagger:  0.12,
                delay:    0.9,
            });
            gsap.from(".prod-stat-number", {
                opacity:  0,
                duration: 0.7,
                ease:     "power2.out",
                stagger:  0.12,
                delay:    1.0,
            });
        }, el);
        return () => ctx.revert();
    }, []);

    // ── GSAP crossfade for panel preview on color/LED change ──
    const triggerPreviewCrossfade = (applyChange: () => void) => {
        const el = panelWrapRef.current;
        if (!el) { applyChange(); return; }

        // Phase 1 — fade+scale out
        gsap.to(el, {
            opacity: 0,
            scale:   0.94,
            y:       8,
            duration: 0.28,
            ease:    "power2.in",
            onComplete: () => {
                applyChange();
                setPreviewKey(k => k + 1);
                // Phase 2 — fade+scale back in
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.94, y: 8 },
                    { opacity: 1, scale: 1,    y: 0, duration: 0.55, ease: "power2.out" }
                );
            },
        });
    };

    const handleColorChange = (i: number) => {
        if (i === selectedColor) return;
        triggerPreviewCrossfade(() => setSelectedColor(i));
    };

    // ── GSAP scroll-reveal for the configurator section ───────
    useEffect(() => {
        const section = configSectionRef.current;
        if (!section) return;

        // Set everything invisible before the animation runs
        const panelEl    = panelWrapRef.current;
        const colAEl     = colARef.current;
        const colCEl     = colCRef.current;
        const swatchEls  = swatchGridRef.current?.querySelectorAll<HTMLElement>("button");
        const ledEls     = ledGridRef.current?.querySelectorAll<HTMLElement>("button");
        const rowEls     = configRowsRef.current?.querySelectorAll<HTMLElement>("div");
        const pillEl     = summaryPillRef.current;
        const headEl     = cfgHeadingRef.current;

        const ctx = gsap.context(() => {

            // 1. Section heading fades in from below
            if (headEl) {
                gsap.from(headEl, {
                    opacity:  0,
                    y:        40,
                    duration: 1.0,
                    ease:     "power2.out",
                    scrollTrigger: {
                        trigger: headEl,
                        start:   "top 85%",
                        once:    true,
                    },
                });
            }

            // 2. Left column (config rows) slides in from left
            if (colAEl) {
                gsap.from(colAEl, {
                    opacity:  0,
                    x:        -52,
                    duration: 1.1,
                    ease:     "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start:   "top 78%",
                        once:    true,
                    },
                });
            }

            // 3. Panel preview lifts up from below
            if (panelEl) {
                gsap.from(panelEl, {
                    opacity:  0,
                    y:        60,
                    scale:    0.93,
                    duration: 1.3,
                    ease:     "power2.out",
                    delay:    0.15,
                    scrollTrigger: {
                        trigger: section,
                        start:   "top 78%",
                        once:    true,
                    },
                });
            }

            // 4. Right column slides in from right
            if (colCEl) {
                gsap.from(colCEl, {
                    opacity:  0,
                    x:        52,
                    duration: 1.1,
                    ease:     "power2.out",
                    delay:    0.10,
                    scrollTrigger: {
                        trigger: section,
                        start:   "top 78%",
                        once:    true,
                    },
                });
            }

            // 5. Config rows stagger in
            if (rowEls && rowEls.length) {
                gsap.from(Array.from(rowEls), {
                    opacity:  0,
                    x:        -24,
                    duration: 0.7,
                    stagger:  0.08,
                    ease:     "power2.out",
                    delay:    0.35,
                    scrollTrigger: {
                        trigger: colAEl ?? section,
                        start:   "top 82%",
                        once:    true,
                    },
                });
            }

            // 6. Finish swatches: hide first, then animate in via onEnter callback
            //    (gsap.from + ScrollTrigger + delay is unreliable when parent is
            //    simultaneously being animated — onEnter fires after trigger is met)
            if (swatchEls && swatchEls.length) {
                gsap.set(Array.from(swatchEls), { opacity: 0, y: 12 });
                ScrollTrigger.create({
                    trigger: section,
                    start:   "top 78%",
                    once:    true,
                    onEnter: () => {
                        gsap.to(Array.from(swatchEls), {
                            opacity:  1,
                            y:        0,
                            duration: 0.5,
                            stagger:  0.06,
                            ease:     "power2.out",
                            delay:    0.55,
                        });
                    },
                });
            }

            // 7. LED buttons — same pattern
            if (ledEls && ledEls.length) {
                gsap.set(Array.from(ledEls), { opacity: 0, y: 10 });
                ScrollTrigger.create({
                    trigger: section,
                    start:   "top 78%",
                    once:    true,
                    onEnter: () => {
                        gsap.to(Array.from(ledEls), {
                            opacity:  1,
                            y:        0,
                            duration: 0.45,
                            stagger:  0.07,
                            ease:     "power2.out",
                            delay:    0.70,
                        });
                    },
                });
            }

            // 8. Summary pill fades in last
            if (pillEl) {
                gsap.from(pillEl, {
                    opacity:  0,
                    y:        18,
                    duration: 0.8,
                    ease:     "power2.out",
                    delay:    0.70,
                    scrollTrigger: {
                        trigger: pillEl,
                        start:   "top 92%",
                        once:    true,
                    },
                });
            }

        }, section);

        return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-animate cards whenever category changes (or on first render)
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        // Small delay lets React finish rendering the new card set
        const id = requestAnimationFrame(() => {
            const cards = grid.querySelectorAll<HTMLElement>(".product-grid-card");
            if (!cards.length) return;

            // Kill prior triggers on this grid
            ScrollTrigger.getAll()
                .filter(st => st.vars.trigger === grid)
                .forEach(st => st.kill());

            // Set initial hidden state
            gsap.set(cards, { opacity: 0, y: 52, scale: 0.97 });

            // Fade-up stagger when grid enters viewport
            gsap.to(cards, {
                opacity:  1,
                y:        0,
                scale:    1,
                duration: 0.9,
                ease:     "power2.out",
                stagger:  0.13,
                scrollTrigger: {
                    trigger: grid,
                    start:   "top 88%",
                    once:    true,
                },
            });
        });

        return () => {
            cancelAnimationFrame(id);
            ScrollTrigger.getAll()
                .filter(st => st.vars.trigger === grid)
                .forEach(st => st.kill());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory]);

    return (
        <>
            <Navbar />

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to   { opacity: 1; transform: none; }
                }
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
                    50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
                }
                @keyframes orbFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-18px); }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.5; }
                    50%       { opacity: 1; }
                }
                @keyframes glowBreath {
                    0%, 100% { opacity: 0.55; transform: translate(-50%, -55%) scale(1); }
                    50%       { opacity: 1;    transform: translate(-50%, -55%) scale(1.12); }
                }
                @keyframes glowBreathGold {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -40%) scale(1); }
                    50%       { opacity: 0.65; transform: translate(-50%, -40%) scale(1.15); }
                }
                @keyframes lightLeakSlide {
                    0%   { opacity: 0; transform: translateX(-8%); }
                    20%  { opacity: 1; }
                    80%  { opacity: 1; }
                    100% { opacity: 0; transform: translateX(8%); }
                }
                @keyframes grainShift {
                    0%   { transform: translate(0,0); }
                    20%  { transform: translate(-2%, 1%); }
                    40%  { transform: translate(1%, -2%); }
                    60%  { transform: translate(-1%, 2%); }
                    80%  { transform: translate(2%, -1%); }
                    100% { transform: translate(0,0); }
                }
                /* ── Stats strip responsive ── */
                .hero-stats-strip {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-top: 3rem;
                    max-width: 660px;
                    width: 100%;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* ── Category tab — never wrap ── */
                .cat-tab-btn {
                    white-space: nowrap !important;
                    flex-shrink: 0 !important;
                }

                /* ══════════════════════════════
                   MOBILE OPTIMISATION — ≤768px
                ══════════════════════════════ */
                @media (max-width: 768px) {

                    /* ── Hero ── */
                    #products-content section:first-child {
                        min-height: 100svh;
                        height: auto !important;
                        padding-top: 100px;
                        padding-bottom: 60px;
                    }
                    .prod-hero-content {
                        padding: 0 20px !important;
                        max-width: 100% !important;
                    }

                    /* ── Stats strip: 2 col, centered ── */
                    .hero-stats-strip {
                        grid-template-columns: repeat(2, 1fr);
                        max-width: 380px;
                        gap: 8px;
                        margin-top: 2rem;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .prod-stat-card {
                        padding: 12px 14px !important;
                        min-height: 60px !important;
                    }
                    .prod-stat-number {
                        font-size: 1.35rem !important;
                    }

                    /* ── Product grid section ── */
                    .product-grid-section-inner {
                        padding: 0 16px !important;
                    }

                    /* ── Product grid: 2 col tablet, 1 col mobile ── */
                    .product-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 16px !important;
                    }

                    /* ── Category tabs: horizontal scroll, no wrap ── */
                    .category-tabs-wrap {
                        overflow-x: auto !important;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        justify-content: flex-start !important;
                        flex-wrap: nowrap !important;
                        padding-bottom: 4px;
                        width: calc(100vw - 32px);
                        max-width: 100% !important;
                        margin: 0 auto clamp(32px,5vw,88px) !important;
                    }
                    .category-tabs-wrap::-webkit-scrollbar { display: none; }
                    .cat-tab-btn { white-space: nowrap !important; flex-shrink: 0 !important; }

                    /* ── Configurator: vertical stack ── */
                    .cfg-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    /* Order: 1=Preview, 2=Finish Selector, 3=Config Summary */
                    .cfg-col-preview { order: 1 !important; }
                    .cfg-col-right   { order: 2 !important; }
                    .cfg-col-left    { order: 3 !important; }

                    .cfg-finish-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                        gap: 8px !important;
                    }

                    /* ── Features grid ── */
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 16px !important;
                    }

                    /* ── Section vertical padding ── */
                    .prod-section-pad {
                        padding-top: 80px !important;
                        padding-bottom: 80px !important;
                    }

                    /* ── CTA section ── */
                    .cta-section-pad {
                        padding: 100px 24px !important;
                    }
                }

                /* ═════════════════════════════
                   SMALL MOBILE — ≤480px
                ═════════════════════════════ */
                @media (max-width: 480px) {

                    /* ── Hero ── */
                    .prod-hero-content {
                        padding: 0 16px !important;
                    }

                    /* ── Stats: 2 col tight, centered ── */
                    .hero-stats-strip {
                        max-width: 320px;
                        gap: 6px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .prod-stat-number {
                        font-size: 1.2rem !important;
                    }

                    /* ── Product grid: 1 col on small phones ── */
                    .product-grid {
                        grid-template-columns: 1fr !important;
                    }

                    /* ── Finish swatches: 2 col ── */
                    .cfg-finish-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }

                    /* ── Features: 1 col ── */
                    .features-grid {
                        grid-template-columns: 1fr !important;
                    }

                    /* ── FeatureCard padding ── */
                    .feature-card-inner {
                        padding: 24px 20px !important;
                    }

                    /* ── ProductCard image height ── */
                    .product-card-image {
                        height: 160px !important;
                    }
                }
            `}</style>

            <main id="products-content" style={{ background: "#09090e" }}>

                {/* ══════════════════════════════════════════
                    1. HERO
                ══════════════════════════════════════════ */}
                <section style={{
                    position: "relative",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    textAlign: "center",
                    background: "#05050a",
                }}>
                {/* ── Background: luxury interior night scene ──────────── */}
                    <Image
                        src="/images/hero/hero-night.webp"
                        alt="Premium smart home interior"
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center 38%",
                            transform: "scale(1.10)",
                            filter: "brightness(0.38) saturate(0.75) contrast(1.08)",
                        }}
                    />

                    {/* ── Layer 1: Cinematic multi-stop gradient crush ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: [
                            "linear-gradient(to bottom,",
                            "  rgba(5,5,10,0.95) 0%,",       /* hard top crush */
                            "  rgba(5,5,10,0.55) 18%,",
                            "  rgba(5,5,10,0.15) 40%,",      /* bright mid-window */
                            "  rgba(5,5,10,0.12) 58%,",
                            "  rgba(5,5,10,0.65) 80%,",
                            "  rgba(5,5,10,0.98) 100%)",     /* hard bottom crush */
                        ].join(" "),
                    }} />

                    {/* ── Layer 2: Deep radial vignette ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 2,
                        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(4,4,10,0.82) 75%, rgba(2,2,8,0.97) 100%)",
                        pointerEvents: "none",
                    }} />

                    {/* ── Layer 3: Side darkening bands ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 2,
                        background: "linear-gradient(to right, rgba(5,5,10,0.60) 0%, transparent 20%, transparent 80%, rgba(5,5,10,0.60) 100%)",
                        pointerEvents: "none",
                    }} />

                    {/* ── Layer 4: Primary headline glow — teal, animated breathing ── */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        width: "900px", height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.16) 0%, rgba(100,150,160,0.06) 45%, transparent 70%)",
                        filter: "blur(55px)",
                        zIndex: 3, pointerEvents: "none",
                        animation: "glowBreath 5s ease-in-out infinite",
                    }} />

                    {/* ── Layer 5: Gold warmth glow — counterpoint ── */}
                    <div style={{
                        position: "absolute", top: "55%", left: "50%",
                        width: "600px", height: "320px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.10) 0%, transparent 65%)",
                        filter: "blur(60px)",
                        zIndex: 3, pointerEvents: "none",
                        animation: "glowBreathGold 7s ease-in-out infinite",
                    }} />

                    {/* ── Layer 6: Ambient floating orbs ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "20%", left: "12%",
                        width: "320px", height: "320px", borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.06) 0%, transparent 70%)",
                        filter: "blur(50px)", pointerEvents: "none", zIndex: 2,
                        animation: "orbFloat 8s ease-in-out infinite",
                    }} />
                    <div aria-hidden="true" style={{
                        position: "absolute", bottom: "25%", right: "10%",
                        width: "260px", height: "260px", borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%)",
                        filter: "blur(45px)", pointerEvents: "none", zIndex: 2,
                        animation: "orbFloat 10s ease-in-out infinite reverse",
                    }} />

                    {/* ── Layer 7: Cinematic light-leak horizontal shimmer ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "42%", left: 0, right: 0,
                        height: "120px",
                        background: "linear-gradient(to right, transparent 0%, rgba(140,180,184,0.04) 25%, rgba(200,169,110,0.06) 50%, rgba(140,180,184,0.04) 75%, transparent 100%)",
                        filter: "blur(20px)",
                        pointerEvents: "none", zIndex: 3,
                        animation: "lightLeakSlide 12s ease-in-out infinite",
                    }} />

                    {/* ── Layer 8: Film grain noise ── */}
                    <div aria-hidden="true" style={{
                        position: "absolute", inset: "-50%",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E\")",
                        backgroundSize: "180px 180px",
                        opacity: 0.45,
                        mixBlendMode: "overlay",
                        pointerEvents: "none", zIndex: 4,
                        animation: "grainShift 0.8s steps(1) infinite",
                    }} />

                    {/* Hero content */}
                    <div className="prod-hero-content" style={{ position: "relative", zIndex: 5, padding: "0 24px", maxWidth: "960px" }}>
                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            marginBottom: "2rem",
                            animation: "fadeUp 0.9s 0.2s both",
                        }}>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                            <span style={{
                                fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600,
                                letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--clr-accent)",
                            }}>Our Products</span>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                        </div>

                        <h1 style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)",
                            fontWeight: 600,
                            lineHeight: 1.08,
                            letterSpacing: "-0.03em",
                            color: "#f5f4f0",
                            margin: "0 0 20px",
                            animation: "fadeUp 0.95s 0.4s both",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                        }}>
                            Precision Meets<br />
                            <span style={{
                                background: "linear-gradient(90deg, var(--clr-accent), var(--clr-gold))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontWeight: 600,
                                fontStyle: "normal",
                            }}>Control.</span>
                        </h1>

                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                            fontWeight: 400,
                            lineHeight: 1.8,
                            color: "rgba(245,244,240,0.45)",
                            maxWidth: "480px",
                            margin: "0 auto",
                            animation: "fadeUp 1s 0.6s both",
                        }}>
                            Premium smart panels designed for modern homes. Refined in every detail.
                        </p>

                        {/* Stats strip — 4 horizontal */}
                        <div
                            ref={heroStatsRef}
                            className="hero-stats-strip"
                            style={{ opacity: 0, alignItems: "stretch" }}
                        >
                            {[
                                { value: "3+",   label: "Product Lines" },
                                { value: "15+",  label: "Configurations" },
                                { value: "6",    label: "Finish Colours" },
                                { value: "500+", label: "Homes Automated" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="prod-stat-card"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "16px 18px",
                                        minHeight: "72px",
                                        borderRadius: "12px",
                                        background: "rgba(255,255,255,0.028)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        position: "relative",
                                        overflow: "hidden",
                                        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                                        cursor: "default",
                                        willChange: "transform",
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLDivElement;
                                        el.style.background = "rgba(140,180,184,0.07)";
                                        el.style.borderColor = "rgba(140,180,184,0.22)";
                                        el.style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLDivElement;
                                        el.style.background = "rgba(255,255,255,0.028)";
                                        el.style.borderColor = "rgba(255,255,255,0.07)";
                                        el.style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* Left teal accent bar */}
                                    <span style={{
                                        flexShrink: 0,
                                        width: "2px",
                                        alignSelf: "stretch",
                                        borderRadius: "2px",
                                        background: "linear-gradient(to bottom, rgba(140,180,184,0.7), rgba(140,180,184,0.15))",
                                    }} />
                                    {/* Text block */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                        <span
                                            className="prod-stat-number"
                                            style={{
                                                fontFamily: "'Manrope', sans-serif",
                                                fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)",
                                                fontWeight: 700,
                                                color: "#f0ede8",
                                                letterSpacing: "-0.04em",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {s.value}
                                        </span>
                                        <span style={{
                                            fontFamily: "'Manrope', sans-serif",
                                            fontSize: "0.52rem",
                                            fontWeight: 400,
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            color: "rgba(200,190,175,0.42)",
                                            lineHeight: 1.3,
                                            whiteSpace: "nowrap",
                                        }}>
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div style={{
                        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                        animation: "fadeUp 1s 1.1s both", zIndex: 5,
                    }}>
                        <span style={{
                            fontFamily: "var(--font-body)", fontSize: "0.6rem",
                            letterSpacing: "0.2em", textTransform: "uppercase",
                            color: "rgba(245,244,240,0.3)",
                        }}>Scroll</span>
                        <div style={{
                            width: "1px", height: "48px",
                            background: "linear-gradient(to bottom, rgba(140,180,184,0.7), transparent)",
                            animation: "scrollPulse 2s ease-in-out infinite",
                        }} />
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    2. PRODUCT CATEGORIES + GRID
                ══════════════════════════════════════════ */}
                <section className="prod-section-pad" style={{ padding: "140px 0 160px", position: "relative" }}>
                    {/* Subtle ambient glow behind the grid */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
                        width: "60vw", height: "60vw", maxWidth: "700px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(140,180,184,0.04) 0%, transparent 70%)",
                        filter: "blur(60px)", pointerEvents: "none",
                        animation: "orbFloat 9s ease-in-out infinite",
                    }} />

                    <div className="product-grid-section-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px)" }}>

                        {/* Section header */}
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: "72px" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                    <span style={{ width: "32px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
                                    <span style={{
                                        fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600,
                                        letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>Product Range</span>
                                    <span style={{ width: "32px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
                                </div>
                                <h2 style={{
                                    fontFamily: "var(--font-manrope)",
                                    fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
                                    fontWeight: 300, lineHeight: 1.08,
                                    letterSpacing: "-0.03em", color: "#f5f4f0",
                                    margin: "0 auto", maxWidth: "640px",
                                }}>
                                    Engineered for every room.
                                </h2>
                                <p style={{
                                    fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300,
                                    lineHeight: 1.75, color: "rgba(245,244,240,0.42)",
                                    maxWidth: "460px", margin: "20px auto 0",
                                }}>
                                    Choose from our curated range of smart panels, control modules, and accessories.
                                </p>
                            </div>
                        </Reveal>

                        {/* Category Tabs */}
                        <Reveal delay={100}>
                            <div className="category-tabs-wrap" style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                gap: "6px",
                                padding: "6px", borderRadius: "100px",
                                background: "rgba(255,255,255,0.035)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(12px)",
                                width: "fit-content", margin: "0 auto clamp(40px,6vw,88px)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                maxWidth: "calc(100vw - 32px)",
                            }}>
                                {CATEGORIES.map(cat => (
                                    <CategoryTab
                                        key={cat}
                                        label={cat}
                                        active={activeCategory === cat}
                                        onClick={() => setActiveCategory(cat)}
                                    />
                                ))}
                            </div>
                        </Reveal>

                        {/* Product Grid — 3 columns desktop, 2 tablet, 1 mobile */}
                        <style>{`
                            .product-grid {
                                display: grid;
                                grid-template-columns: repeat(3, 1fr);
                                gap: 40px;
                            }
                            @media (max-width: 1024px) {
                                .product-grid {
                                    grid-template-columns: repeat(2, 1fr);
                                    gap: 28px;
                                }
                            }
                            @media (max-width: 640px) {
                                .product-grid {
                                    grid-template-columns: 1fr;
                                    gap: 20px;
                                }
                            }
                        `}</style>
                        <div
                            ref={gridRef}
                            className="product-grid"
                        >
                            {filtered.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    3. CUSTOMIZATION SECTION — Interactive Configurator
                ══════════════════════════════════════════ */}
                <section
                    ref={configSectionRef}
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        padding: "140px 0",
                        background: "linear-gradient(180deg, rgba(11,15,26,0) 0%, rgba(11,15,26,0.6) 100%)",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                    {/* Dynamic ambient glow matched to selected finish */}
                    <div aria-hidden="true" style={{
                        position: "absolute", top: "40%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "800px", height: "800px", borderRadius: "50%",
                        background: `radial-gradient(ellipse, ${COLORS[selectedColor].glowColor} 0%, transparent 65%)`,
                        filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
                        transition: "background 0.9s ease",
                    }} />

                    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 clamp(20px,4vw,60px)", position: "relative", zIndex: 1 }}>

                        {/* ── Section heading ── */}
                        <div ref={cfgHeadingRef} style={{ textAlign: "center", marginBottom: "80px" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                                <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
                                <span style={{
                                    fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600,
                                    letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--clr-accent)",
                                }}>Customisation</span>
                                <span style={{ width: "28px", height: "1px", background: "var(--clr-accent)", opacity: 0.6 }} />
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-manrope)",
                                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                                fontWeight: 700, lineHeight: 1.08,
                                letterSpacing: "-0.03em", color: "#f5f4f0",
                                margin: "0 auto",
                            }}>
                                Built to your exact palette.
                            </h2>
                            <p style={{
                                fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300,
                                lineHeight: 1.8, color: "rgba(245,244,240,0.45)",
                                maxWidth: "480px", margin: "18px auto 0",
                            }}>
                                Select a panel finish below. The preview updates live.
                            </p>
                        </div>

                        {/* ── Responsive styles ── */}
                        <style>{`
                            .cfg-grid {
                                display: grid;
                                grid-template-columns: 1fr 300px 1fr;
                                gap: 48px;
                                align-items: start;
                            }
                            @media (max-width: 1024px) {
                                .cfg-grid {
                                    grid-template-columns: 1fr 1fr;
                                    gap: 32px;
                                }
                                .cfg-col-preview {
                                    grid-column: 1 / -1;
                                    display: flex !important;
                                    justify-content: center;
                                }
                            }
                            @media (max-width: 640px) {
                                .cfg-grid {
                                    grid-template-columns: 1fr;
                                    gap: 20px;
                                }
                                .cfg-col-preview { order: -1; }
                                .cfg-col-left    { order: 1; }
                                .cfg-col-right   { order: 2; }
                                .cfg-finish-grid { grid-template-columns: repeat(3,1fr) !important; }
                            }
                        `}</style>

                        {/* ════ 3-column configurator ════ */}
                        <div className="cfg-grid">

                            {/* ── LEFT: Configuration Summary ── */}
                            <div className="cfg-col-left" ref={colARef}>
                                <p style={{
                                    fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700,
                                    letterSpacing: "0.3em", textTransform: "uppercase",
                                    color: "var(--clr-accent)", marginBottom: "24px",
                                }}>Configuration</p>

                                <div ref={configRowsRef} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {[
                                        { label: "Panel Finish",  value: COLORS[selectedColor].name, dot: COLORS[selectedColor].hex, live: true },
                                        { label: "Icon Style",    value: "Standard engraving",       dot: null, live: false },
                                        { label: "Load Capacity", value: "16A per module",           dot: null, live: false },
                                        { label: "Compatibility", value: "Wi-Fi · RF · App",         dot: null, live: false },
                                    ].map(opt => (
                                        <div key={opt.label} style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            padding: "16px 20px", borderRadius: "16px",
                                            background: opt.live
                                                ? "linear-gradient(135deg, rgba(140,180,184,0.07) 0%, rgba(140,180,184,0.02) 100%)"
                                                : "rgba(255,255,255,0.03)",
                                            border: opt.live
                                                ? `1px solid ${COLORS[selectedColor].border}55`
                                                : "1px solid rgba(255,255,255,0.06)",
                                            backdropFilter: "blur(12px)",
                                            transition: "border-color 0.5s ease, background 0.5s ease",
                                        }}>
                                            <span style={{
                                                fontFamily: "var(--font-body)", fontSize: "0.68rem",
                                                fontWeight: 500, letterSpacing: "0.08em",
                                                textTransform: "uppercase", color: "rgba(245,244,240,0.32)",
                                            }}>{opt.label}</span>
                                            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                                                {opt.dot && (
                                                    <div style={{
                                                        width: "10px", height: "10px", borderRadius: "50%",
                                                        background: opt.dot,
                                                        boxShadow: `0 0 8px ${COLORS[selectedColor].glowColor}`,
                                                        border: `1px solid ${COLORS[selectedColor].border}`,
                                                        flexShrink: 0,
                                                        transition: "all 0.4s ease",
                                                    }} />
                                                )}
                                                <span style={{
                                                    fontFamily: "var(--font-body)", fontSize: "0.85rem",
                                                    fontWeight: opt.live ? 600 : 400,
                                                    color: opt.live ? "#f5f4f0" : "rgba(245,244,240,0.52)",
                                                    transition: "color 0.3s ease",
                                                    whiteSpace: "nowrap",
                                                }}>{opt.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Custom quote prompt */}
                                <div style={{
                                    marginTop: "20px", padding: "22px 24px", borderRadius: "18px",
                                    background: "linear-gradient(135deg, rgba(140,180,184,0.07) 0%, rgba(200,169,110,0.04) 100%)",
                                    border: "1px solid rgba(140,180,184,0.16)",
                                    backdropFilter: "blur(12px)",
                                }}>
                                    <p style={{
                                        fontFamily: "var(--font-body)", fontSize: "0.8rem",
                                        fontWeight: 400, color: "rgba(245,244,240,0.58)",
                                        lineHeight: 1.65, marginBottom: "14px",
                                    }}>
                                        Need a custom CMYK match or bespoke engraving?
                                    </p>
                                    <span style={{
                                        fontFamily: "var(--font-body)", fontSize: "0.68rem",
                                        fontWeight: 700, letterSpacing: "0.14em",
                                        textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>Request a quote →</span>
                                </div>
                            </div>

                            {/* ── CENTER: Live Panel Preview ── */}
                            <div className="cfg-col-preview">
                                <div ref={panelWrapRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
                                    <p style={{
                                        fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 600,
                                        letterSpacing: "0.3em", textTransform: "uppercase",
                                        color: "rgba(245,244,240,0.22)",
                                    }}>Live Preview</p>

                                    <div key={previewKey} style={{ position: "relative" }}>
                                        {/* Under-panel radial glow */}
                                        <div style={{
                                            position: "absolute", bottom: "-28px", left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "180px", height: "55px",
                                            background: `radial-gradient(ellipse, ${COLORS[selectedColor].glowColor} 0%, transparent 70%)`,
                                            filter: "blur(18px)",
                                            pointerEvents: "none",
                                            transition: "background 0.6s ease",
                                        }} />

                                        <svg
                                            viewBox="0 0 220 420"
                                            width="200" height="380"
                                            style={{
                                                position: "relative", zIndex: 1,
                                                filter: `drop-shadow(0 24px 56px rgba(0,0,0,0.75)) drop-shadow(0 0 36px ${COLORS[selectedColor].glowColor})`,
                                                transition: "filter 0.6s ease",
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="cfg-ps" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%"   stopColor={COLORS[selectedColor].hex} stopOpacity="1" />
                                                    <stop offset="45%"  stopColor={COLORS[selectedColor].hex} stopOpacity="0.93" />
                                                    <stop offset="100%" stopColor={COLORS[selectedColor].hex} stopOpacity="0.78" />
                                                </linearGradient>
                                                <linearGradient id="cfg-ph" x1="0%" y1="0%" x2="80%" y2="60%">
                                                    <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
                                                    <stop offset="60%"  stopColor="rgba(255,255,255,0.04)" />
                                                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                                </linearGradient>
                                            </defs>

                                            {/* Outer frame bevel */}
                                            <rect x="0" y="0" width="220" height="420" rx="17" fill={COLORS[selectedColor].border} />
                                            {/* Panel body */}
                                            <rect x="4" y="4" width="212" height="412" rx="14" fill="url(#cfg-ps)" />
                                            {/* Specular sheen */}
                                            <rect x="4" y="4" width="212" height="412" rx="14" fill="url(#cfg-ph)" />

                                            {/* Switch buttons */}
                                            {[
                                                { x: 32,  y: 30,  w: 70, h: 62, label: "L1" },
                                                { x: 118, y: 30,  w: 70, h: 62, label: "L2" },
                                                { x: 32,  y: 108, w: 70, h: 62, label: "L3" },
                                                { x: 118, y: 108, w: 70, h: 62, label: "L4" },
                                                { x: 32,  y: 186, w: 70, h: 62, label: "Fan" },
                                                { x: 118, y: 186, w: 70, h: 62, label: "Fan" },
                                                { x: 32,  y: 264, w: 70, h: 62, label: "Scn" },
                                                { x: 118, y: 264, w: 70, h: 62, label: "Aux" },
                                            ].map((btn) => {
                                                const light = /^#[fdc]/.test(COLORS[selectedColor].hex) || /^#a/.test(COLORS[selectedColor].hex);
                                                return (
                                                    <g key={btn.label + btn.x}>
                                                        <rect x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx="8"
                                                            fill={light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)"}
                                                            stroke={light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"}
                                                            strokeWidth="0.8"
                                                        />
                                                        <circle cx={btn.x + btn.w / 2} cy={btn.y + btn.h / 2 - 8} r="5"
                                                            fill={light ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"} />
                                                        <text x={btn.x + btn.w / 2} y={btn.y + btn.h / 2 + 15}
                                                            textAnchor="middle" fontSize="8"
                                                            fontFamily="Manrope, sans-serif" letterSpacing="1"
                                                            fill={light ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.28)"}
                                                        >{btn.label}</text>
                                                    </g>
                                                );
                                            })}

                                            {/* Teal status dot */}
                                            <circle cx="110" cy="390" r="3.5" fill="rgba(140,180,184,0.9)" />
                                            <circle cx="110" cy="390" r="7"   fill="rgba(140,180,184,0.16)" />

                                            {/* Touch line */}
                                            <rect x="70" y="407" width="80" height="1" rx="0.5"
                                                fill={/^#[fdc]/.test(COLORS[selectedColor].hex) ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"} />

                                            {/* Brand label */}
                                            <text x="110" y="355" textAnchor="middle" fontSize="7"
                                                fontFamily="Manrope, sans-serif" letterSpacing="3"
                                                fill={/^#[fdc]/.test(COLORS[selectedColor].hex) ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.22)"}
                                            >WEINKLING</text>
                                        </svg>
                                    </div>

                                    {/* Caption */}
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{
                                            fontFamily: "var(--font-manrope)", fontSize: "1.05rem",
                                            fontWeight: 600, color: "#f5f4f0",
                                            marginBottom: "4px", transition: "color 0.3s ease",
                                        }}>{COLORS[selectedColor].name}</p>
                                        <p style={{
                                            fontFamily: "var(--font-body)", fontSize: "0.65rem",
                                            color: "rgba(245,244,240,0.35)", letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                        }}>Panel Finish</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT: Panel Finish Selector ── */}
                            <div className="cfg-col-right" ref={colCRef}>
                                <p style={{
                                    fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700,
                                    letterSpacing: "0.3em", textTransform: "uppercase",
                                    color: "var(--clr-accent)", marginBottom: "24px",
                                }}>Panel Finish</p>

                                <div ref={swatchGridRef} className="cfg-finish-grid"
                                    style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                                    {COLORS.map((c, i) => (
                                        <FinishSwatch
                                            key={c.name}
                                            color={c}
                                            active={selectedColor === i}
                                            onClick={() => handleColorChange(i)}
                                        />
                                    ))}
                                </div>

                                {/* Selection pill */}
                                <div ref={summaryPillRef} style={{
                                    marginTop: "24px", padding: "20px 22px", borderRadius: "18px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: `1px solid ${COLORS[selectedColor].border}45`,
                                    backdropFilter: "blur(16px)",
                                    transition: "border-color 0.5s ease",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{
                                            fontFamily: "var(--font-body)", fontSize: "0.68rem",
                                            color: "rgba(245,244,240,0.32)", letterSpacing: "0.1em", textTransform: "uppercase",
                                        }}>Selected Finish</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{
                                                width: "12px", height: "12px", borderRadius: "50%",
                                                background: COLORS[selectedColor].hex,
                                                border: `1.5px solid ${COLORS[selectedColor].border}`,
                                                boxShadow: `0 0 10px ${COLORS[selectedColor].glowColor}`,
                                                transition: "all 0.4s ease",
                                                flexShrink: 0,
                                            }} />
                                            <span style={{
                                                fontFamily: "var(--font-body)", fontSize: "0.88rem",
                                                fontWeight: 600, color: "#f5f4f0",
                                                transition: "color 0.3s ease",
                                            }}>{COLORS[selectedColor].name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>{/* /.cfg-grid */}
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    4. FEATURES SECTION
                ══════════════════════════════════════════ */}
                <section style={{ padding: "140px 0", overflow: "hidden" }}>
                    <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 60px)" }}>

                        {/* Header */}
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                    <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                    <span style={{
                                        fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500,
                                        letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                                    }}>Capabilities</span>
                                    <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                                </div>
                                <h2 style={{
                                    fontFamily: "var(--font-manrope)",
                                    fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                                    fontWeight: 300, lineHeight: 1.1,
                                    letterSpacing: "-0.025em", color: "#f5f4f0",
                                    margin: 0,
                                }}>
                                    Every function, perfected.
                                </h2>
                            </div>
                        </Reveal>

                        {/* Feature cards */}
                        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
                            {FEATURES.map((f, i) => (
                                <FeatureCard key={f.title} feature={f} delay={i * 110} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    5. CTA SECTION
                ══════════════════════════════════════════ */}
                <section style={{
                    position: "relative", overflow: "hidden",
                    padding: "clamp(80px,12vw,160px) clamp(20px,6vw,60px)", textAlign: "center",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                }}>
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
                                fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500,
                                letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--clr-accent)",
                            }}>Get started</span>
                            <span style={{ width: "24px", height: "1px", background: "var(--clr-accent)" }} />
                        </div>

                        <h2 style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            fontWeight: 300, lineHeight: 1.06,
                            letterSpacing: "-0.03em", color: "#f5f4f0",
                            maxWidth: "800px", margin: "0 auto 24px",
                        }}>
                            Upgrade Your<br />
                            <em style={{ color: "var(--clr-accent)" }}>Home Experience.</em>
                        </h2>

                        <p style={{
                            fontFamily: "var(--font-body)", fontSize: "1.05rem",
                            fontWeight: 300, lineHeight: 1.75,
                            color: "rgba(245,244,240,0.42)",
                            maxWidth: "460px", margin: "0 auto 56px",
                        }}>
                            Talk to a specialist. We'll help you configure the perfect system for your home.
                        </p>

                        <CTAButton />
                    </Reveal>
                </section>

            </main>
            <Footer />
        </>
    );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CategoryTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            id={`cat-tab-${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onClick}
            className="cat-tab-btn"
            style={{
                padding: "12px clamp(14px, 2.5vw, 26px)",
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.72rem, 1.4vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
                background: active
                    ? "linear-gradient(135deg, rgba(140,180,184,0.25) 0%, rgba(200,169,110,0.18) 100%)"
                    : "transparent",
                color: active ? "#f5f4f0" : "rgba(245,244,240,0.45)",
                boxShadow: active ? "0 0 0 1px rgba(140,180,184,0.4)" : "none",
            }}
        >
            {label}
        </button>
    );
}

function ProductCard({
    product,
    index,
}: {
    product: (typeof PRODUCTS)[number];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="product-grid-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                /* GSAP owns the entrance: opacity + y. Hover drives scale + transform */
                transform: hovered ? "translateY(-6px) scale(1.04)" : "translateY(0) scale(1)",
                transition: [
                    "transform 0.45s cubic-bezier(0.22,0.61,0.36,1)",
                    "background 0.45s ease",
                    "box-shadow 0.45s ease",
                    "outline-color 0.45s ease",
                ].join(", "),
                borderRadius: "24px",
                overflow: "hidden",
                /* Slightly lifted dark base — avoids pure-black flatness */
                background: hovered
                    ? "linear-gradient(160deg, rgba(32,36,54,0.96) 0%, rgba(20,18,34,0.98) 60%, rgba(12,12,22,0.96) 100%)"
                    : "linear-gradient(160deg, rgba(22,24,40,0.92) 0%, rgba(15,14,28,0.94) 60%, rgba(10,10,18,0.90) 100%)",
                border: "1px solid transparent",
                outline: hovered
                    ? "1px solid rgba(140,180,184,0.35)"
                    : "1px solid rgba(255,255,255,0.09)",
                boxShadow: hovered
                    ? "0 0 0 4px rgba(140,180,184,0.06), 0 32px 72px rgba(0,0,0,0.50), 0 0 48px rgba(140,180,184,0.08)"
                    : "0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset",
                backdropFilter: "blur(20px)",
                cursor: "pointer",
                position: "relative",
            }}
        >
            {/* Top shimmer line — slides across on hover */}
            <div style={{
                position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
                background: `linear-gradient(to right, transparent, rgba(140,180,184,${hovered ? "0.55" : "0"}), transparent)`,
                transition: "background 0.45s ease",
                zIndex: 3,
            }} />

            {/* Badge */}
            {product.badge && (
                <div style={{
                    position: "absolute", top: "20px", right: "20px", zIndex: 4,
                    padding: "5px 14px", borderRadius: "100px",
                    background: product.badge === "New"
                        ? "rgba(200,169,110,0.15)"
                        : "rgba(140,180,184,0.15)",
                    border: `1px solid ${product.badge === "New" ? "rgba(200,169,110,0.45)" : "rgba(140,180,184,0.45)"}`,
                    backdropFilter: "blur(8px)",
                    fontFamily: "var(--font-body)", fontSize: "0.58rem",
                    fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: product.badge === "New" ? "var(--clr-gold)" : "var(--clr-accent)",
                }}>
                    {product.badge}
                </div>
            )}

            {/* Product image */}
            <div className="product-card-image" style={{
                position: "relative",
                height: "clamp(160px, 22vw, 260px)",
                overflow: "hidden",
                background: "radial-gradient(ellipse at 50% 50%, #1a1d2e 0%, #0a0a14 60%, #060608 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}>
                {/* Subtle centre spotlight glow */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "radial-gradient(ellipse at 50% 50%, rgba(140,180,184,0.07) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                <Image
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={200}
                    loading="lazy"
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        transform: hovered ? "scale(1.06)" : "scale(1.0)",
                        transition: "transform 0.65s cubic-bezier(0.22,0.61,0.36,1)",
                        position: "relative",
                        zIndex: 2,
                        filter: "brightness(1.05) contrast(1.06) drop-shadow(0 4px 24px rgba(0,0,0,0.8))",
                    }}
                />

                {/* Bottom fade — lightened from 0.90 to 0.68 to let image breathe */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 3,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(10,10,20,0.68) 100%)",
                }} />

                {/* Soft shadow shelf at bottom — creates depth below product */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", zIndex: 3,
                    background: "linear-gradient(to top, rgba(12,12,22,0.85), transparent)",
                }} />

                {/* Teal accent glow — opacity toggled on hover */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 4,
                    background: "radial-gradient(ellipse at 50% 100%, rgba(140,180,184,0.16) 0%, transparent 60%)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.45s ease",
                    pointerEvents: "none",
                }} />
            </div>

            {/* Card body */}
            <div style={{ padding: "36px 36px 40px" }}>
                <h3 style={{
                    fontFamily: "var(--font-manrope)", fontSize: "1.65rem",
                    fontWeight: 400, color: "#f5f4f0",
                    letterSpacing: "-0.02em", lineHeight: 1.2,
                    marginBottom: "12px",
                }}>{product.name}</h3>

                <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.88rem",
                    fontWeight: 400, color: "rgba(245,244,240,0.52)",
                    lineHeight: 1.65, marginBottom: "28px",
                    letterSpacing: "0.01em",
                }}>{product.config}</p>

                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: "22px",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                }}>
                    <span style={{
                        fontFamily: "var(--font-body)", fontSize: "0.62rem",
                        fontWeight: 600, letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: hovered ? "var(--clr-accent)" : "rgba(140,180,184,0.55)",
                        transition: "color 0.45s ease",
                    }}>{product.size}</span>

                    {/* Arrow button — icon slides right on hover */}
                    <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: hovered ? "rgba(140,180,184,0.18)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${hovered ? "rgba(140,180,184,0.5)" : "rgba(255,255,255,0.10)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.45s ease",
                        boxShadow: hovered ? "0 0 16px rgba(140,180,184,0.25)" : "none",
                        overflow: "hidden",
                    }}>
                        <svg
                            width="13" height="13" fill="none"
                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            style={{
                                transform: hovered ? "translateX(2px)" : "translateX(0)",
                                transition: "transform 0.35s cubic-bezier(0.22,0.61,0.36,1)",
                            }}
                        >
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--clr-accent)" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FinishSwatch({ color, active, onClick }: {
    color: typeof COLORS[number]; active: boolean; onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            id={`finish-${color.name.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "12px", padding: "20px 12px",
                borderRadius: "18px", border: "none",
                background: active
                    ? "linear-gradient(145deg, rgba(140,180,184,0.12) 0%, rgba(140,180,184,0.04) 100%)"
                    : hovered
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.025)",
                outline: active
                    ? `2px solid ${color.border}`
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.28s cubic-bezier(0.22,0.61,0.36,1)",
                transform: hovered && !active ? "scale(1.03)" : "scale(1)",
                boxShadow: active
                    ? `0 0 0 4px ${color.glowColor}, 0 12px 36px rgba(0,0,0,0.3)`
                    : "none",
                backdropFilter: "blur(8px)",
            }}
        >
            {/* Colour orb */}
            <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: color.hex,
                border: `2px solid ${color.border}`,
                boxShadow: active
                    ? `0 0 0 4px rgba(255,255,255,0.08), 0 6px 24px ${color.glowColor}`
                    : hovered
                        ? `0 4px 16px ${color.glowColor}`
                        : "0 2px 10px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.28s ease, transform 0.28s ease",
                transform: active ? "scale(1.08)" : "scale(1)",
                flexShrink: 0,
            }} />
            {/* Label */}
            <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.65rem",
                fontWeight: active ? 700 : 400,
                letterSpacing: "0.04em",
                color: active ? "#f5f4f0" : "rgba(245,244,240,0.42)",
                transition: "color 0.25s ease, font-weight 0.25s ease",
                textAlign: "center", lineHeight: 1.3, whiteSpace: "nowrap",
            }}>{color.name}</span>
        </button>
    );
}

function ColorSwatch({ color, active, onClick }: {
    color: typeof COLORS[number]; active: boolean; onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "10px", cursor: "pointer", background: "none",
                border: "none", padding: "12px 8px", borderRadius: "12px",
                transition: "background 0.2s ease",
            }}
        >
            <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: color.hex,
                border: active ? `2px solid var(--clr-accent)` : `2px solid ${color.border}40`,
                boxShadow: active ? "0 0 0 3px rgba(140,180,184,0.2)" : "none",
                transition: "all 0.25s ease",
            }} />
            <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.6rem",
                color: active ? "#f5f4f0" : "rgba(245,244,240,0.35)",
                letterSpacing: "0.06em", textAlign: "center",
                transition: "color 0.25s ease",
            }}>{color.name}</span>
        </button>
    );
}

function FeatureCard({ feature, delay }: { feature: typeof FEATURES[number]; delay: number }) {
    const { ref, visible } = useReveal();
    const [hovered, setHovered] = useState(false);
    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,
                transform: (visible ? "none" : "translateY(44px)") + (hovered && visible ? " translateY(-6px)" : ""),
                transition: [
                    `opacity 0.9s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
                    `transform 0.55s cubic-bezier(0.22,0.61,0.36,1)`,
                    "border-color 0.4s ease",
                    "box-shadow 0.4s ease",
                    "background 0.4s ease",
                ].join(", "),
                display: "flex", flexDirection: "column", gap: "24px",
                padding: "clamp(24px,4vw,48px) clamp(20px,3.5vw,40px)",
                borderRadius: "24px",
                background: hovered
                    ? "linear-gradient(145deg, rgba(30,34,50,0.95) 0%, rgba(18,18,30,0.9) 100%)"
                    : "linear-gradient(145deg, rgba(20,21,32,0.75) 0%, rgba(13,13,20,0.55) 100%)",
                border: hovered
                    ? "1px solid rgba(140,180,184,0.28)"
                    : "1px solid rgba(255,255,255,0.06)",
                boxShadow: hovered
                    ? "0 0 0 1px rgba(140,180,184,0.08), 0 32px 72px rgba(0,0,0,0.5), 0 0 48px rgba(140,180,184,0.05)"
                    : "0 2px 16px rgba(0,0,0,0.25)",
                backdropFilter: "blur(16px)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Subtle top-edge accent line on hover */}
            <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
                background: `linear-gradient(to right, transparent, rgba(140,180,184,${hovered ? "0.5" : "0"}), transparent)`,
                transition: "background 0.4s ease",
            }} />

            <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: hovered
                    ? "rgba(140,180,184,0.14)"
                    : "rgba(140,180,184,0.07)",
                border: `1px solid rgba(140,180,184,${hovered ? "0.35" : "0.15"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-accent)",
                boxShadow: hovered ? "0 0 20px rgba(140,180,184,0.18)" : "none",
                transition: "all 0.4s ease",
                flexShrink: 0,
            }}>
                {feature.icon}
            </div>
            <h3 style={{
                fontFamily: "var(--font-manrope)", fontSize: "1.35rem",
                fontWeight: 400, color: "#f5f4f0",
                letterSpacing: "-0.015em", lineHeight: 1.2,
            }}>{feature.title}</h3>
            <p style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                fontSize: "0.88rem", lineHeight: 1.8,
                color: "rgba(245,244,240,0.42)",
                letterSpacing: "0.01em",
            }}>{feature.desc}</p>
        </div>
    );
}

function CTAButton() {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            href="/contact"
            id="products-cta-btn"
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
