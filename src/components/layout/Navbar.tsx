"use client";

/**
 * Navbar.tsx
 *
 * Premium top navigation:
 * - 3-column grid: Logo | Nav Links | CTA
 * - Always-on glassmorphism, stronger on scroll
 * - Desktop horizontal nav + mobile hamburger
 * - GSAP-driven entry animation
 */

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Our Products", href: "/products" },
    { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.1,
            });
        }, navRef);

        const handleScroll = () => {
            const currentY = window.scrollY;
            // Always show at top of page
            if (currentY <= 80) {
                setHidden(false);
                setScrolled(false);
                lastScrollY.current = currentY;
                return;
            }
            setScrolled(true);
            // Hide when scrolling DOWN, show when scrolling UP
            if (currentY > lastScrollY.current + 4) {
                setHidden(true);
            } else if (currentY < lastScrollY.current - 4) {
                setHidden(false);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* ── Main Nav Bar ─────────────────────────────────────── */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50"
                style={{
                    background: scrolled ? "rgba(8,8,13,0.92)" : "rgba(10,10,15,0.55)",
                    backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "blur(12px) saturate(1.2)",
                    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "blur(12px) saturate(1.2)",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.10)"
                        : "1px solid rgba(255,255,255,0.07)",
                    transform: hidden ? "translateY(-100%)" : "translateY(0)",
                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
                    willChange: "transform",
                }}
                aria-label="Main navigation"
            >
            {/*
                Flex bar:
                  [Logo]  ←64px→  [Nav links — truly centered]  ←auto→  [CTA | ☰]
            */}
            <div
                style={{
                    maxWidth:       "1400px",
                    margin:         "0 auto",
                    paddingLeft:    "clamp(16px, 4vw, 48px)",
                    paddingRight:   "clamp(16px, 4vw, 48px)",
                    height:         "64px",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    gap:            "24px",
                }}
            >
                {/* ── Logo (left) ───────────────────────────────────── */}
                <Link
                    href="/"
                    aria-label="Weinkling — Home"
                    style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
                >
                    <Image
                        src="/logo.png"
                        alt="Weinkling logo"
                        width={160}
                        height={36}
                        style={{ height: "36px", width: "auto", objectFit: "contain", display: "block" }}
                        priority
                    />
                </Link>

                {/* ── Nav links (center — flex:1 so they sit mid-point) */}
                <ul
                    className="hidden lg:flex items-center"
                    role="list"
                    style={{
                        flex:            1,
                        justifyContent:  "center",
                        gap:             "2rem",
                        margin:          0,
                        padding:         0,
                        listStyle:       "none",
                    }}
                >
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="relative group cursor-pointer block"
                                style={{
                                    fontFamily:    "var(--font-sans)",
                                    fontSize:      "0.8rem",
                                    fontWeight:    400,
                                    color:         "rgba(245,244,240,0.7)",
                                    letterSpacing: "0.03em",
                                    whiteSpace:    "nowrap",
                                    userSelect:    "none",
                                    textDecoration: "none",
                                }}
                            >
                                <span className="group-hover:text-white transition-colors duration-200">
                                    {link.label}
                                </span>
                                <span
                                    className="absolute left-0 w-0 group-hover:w-full transition-all duration-300"
                                    style={{
                                        bottom:     "-2px",
                                        height:     "1px",
                                        background: "var(--clr-accent)",
                                    }}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* ── CTA + Hamburger (right) ────────────────────────── */}
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "16px" }}>

                    {/* Desktop CTA — glass pill, no routing (single-page) */}
                    <button
                        type="button"
                        className="hidden lg:inline-flex"
                        style={{
                            alignItems:          "center",
                            gap:                 "0.5rem",
                            padding:             "0.5rem 1.4rem",
                            borderRadius:        "9999px",
                            background:          "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                            border:              "1px solid rgba(140,180,184,0.45)",
                            color:               "rgba(245,244,240,0.92)",
                            fontFamily:          "var(--font-sans)",
                            fontSize:            "0.72rem",
                            fontWeight:          500,
                            letterSpacing:       "0.09em",
                            textTransform:       "uppercase",
                            backdropFilter:      "blur(12px)",
                            WebkitBackdropFilter:"blur(12px)",
                            cursor:              "pointer",
                            transition:          "opacity 0.25s ease",
                            whiteSpace:          "nowrap",
                        } as React.CSSProperties}
                    >
                        Get Started
                    </button>

                    {/* Mobile hamburger — always renders bars; X lives only inside the overlay */}
                    <button
                        id="mobile-menu-toggle"
                        className="lg:hidden flex items-center justify-center"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                    >
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect y="0" width="22" height="1.5" rx="1" fill="var(--clr-mist)"/>
                            <rect y="7" width="16" height="1.5" rx="1" fill="var(--clr-mist)"/>
                            <rect y="14" width="22" height="1.5" rx="1" fill="var(--clr-mist)"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>


            <div
                id="mobile-menu"
                className="fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-500"
                style={{
                    background: "rgba(10,10,15,0.97)",
                    backdropFilter: "blur(20px)",
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "auto" : "none",
                    transform: menuOpen ? "none" : "translateY(-20px)",
                }}
                aria-hidden={!menuOpen}
            >
                {/* X — absolute top-right */}
                <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    style={{ position: "absolute", top: 20, right: "clamp(16px,4vw,48px)", background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", zIndex: 1 }}
                >
                    <X size={22} color="var(--clr-mist)" strokeWidth={1.5} />
                </button>

                {/* Nav links + CTA — fully centered */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 340 }} role="list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href} style={{ width: "100%" }}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        fontFamily:     "var(--font-serif)",
                                        fontSize:       "clamp(1.6rem, 6vw, 2.4rem)",
                                        fontWeight:     300,
                                        color:          "var(--clr-mist)",
                                        letterSpacing:  "-0.02em",
                                        cursor:         "pointer",
                                        userSelect:     "none",
                                        textDecoration: "none",
                                        display:        "block",
                                        padding:        "12px 0",
                                        borderBottom:   "1px solid rgba(255,255,255,0.06)",
                                        textAlign:      "center",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA — centered, links to /contact */}
                    <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        style={{
                            display:             "inline-flex",
                            alignItems:          "center",
                            justifyContent:      "center",
                            marginTop:           "28px",
                            padding:             "0.7rem 2.2rem",
                            borderRadius:        "9999px",
                            background:          "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                            border:              "1px solid rgba(140,180,184,0.45)",
                            color:               "rgba(245,244,240,0.92)",
                            fontFamily:          "var(--font-sans)",
                            fontSize:            "0.78rem",
                            fontWeight:          500,
                            letterSpacing:       "0.09em",
                            textTransform:       "uppercase",
                            backdropFilter:      "blur(12px)",
                            WebkitBackdropFilter:"blur(12px)",
                            cursor:              "pointer",
                            textDecoration:      "none",
                            whiteSpace:          "nowrap",
                        } as React.CSSProperties}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
}
