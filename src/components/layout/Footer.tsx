"use client";

/**
 * Footer.tsx
 *
 * 4-column grid footer:
 *   col 1 → Brand (logo, description, social)
 *   col 2 → Systems
 *   col 3 → Company
 *   col 4 → Connect
 *
 * Responsive: 4-col desktop → 2-col tablet → 1-col mobile
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";

// ─ Footer link data ────────────────────────────────────────────────────────
const FOOTER_COLS = [
    {
        title: "Systems",
        links: [
            { label: "Lighting Control",    href: "/solutions#lighting" },
            { label: "Climate Management",  href: "/solutions#climate" },
            { label: "Security & Access",   href: "/solutions#security" },
            { label: "Scene Orchestration", href: "/solutions#scenes" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Weinkling",  href: "/about" },
            { label: "Our Process",      href: "/about#process" },
            { label: "Case Studies",     href: "/about#cases" },
            { label: "Careers",          href: "/about#careers" },
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "Contact Us",    href: "/contact" },
            { label: "Request Demo",  href: "/contact#demo" },
            { label: "Partners",      href: "/contact#partners" },
            { label: "Press",         href: "/contact#press" },
        ],
    },
];

const SOCIAL = ["LinkedIn", "Instagram", "Twitter"];

// ─ Shared link style helpers ──────────────────────────────────────────────
const colHeadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(245,244,240,0.35)",
    marginBottom: "1.25rem",
};

const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    fontWeight: 400,
    color: "rgba(245,244,240,0.6)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    display: "inline-block",
};

// ─ Component ──────────────────────────────────────────────────────────────
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                background: "var(--clr-deep)",
                borderTop: "1px solid rgba(245,244,240,0.06)",
            }}
            aria-label="Site footer"
        >
            {/* ── Main grid container ─────────────────────────────────── */}
            <div
                className="footer-outer"
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "80px 48px",
                }}
            >
                {/*
                    Grid: 4 equal columns on desktop
                    Falls to 2 on tablet, 1 on mobile
                */}
                <div className="footer-grid">
                    <style>{`
                        .footer-grid {
                            display: grid;
                            grid-template-columns: 1.4fr 1fr 1fr 1fr;
                            gap: 64px;
                            align-items: start;
                        }
                        @media (max-width: 1024px) {
                            .footer-grid {
                                grid-template-columns: 1fr 1fr;
                                gap: 40px;
                            }
                        }
                        @media (max-width: 640px) {
                            .footer-grid {
                                grid-template-columns: 1fr;
                                gap: 36px;
                            }
                            .footer-outer {
                                padding: 56px 24px 40px !important;
                            }
                            .footer-bottom {
                                flex-direction: column;
                                align-items: flex-start !important;
                                gap: 10px !important;
                            }
                        }
                        .footer-link:hover {
                            color: rgba(245,244,240,0.95) !important;
                        }
                    `}</style>

                    {/* ── Col 1: Brand ──────────────────────────────── */}
                    <div>
                        {/* Logo */}
                        <Link
                            href="/"
                            style={{ display: "inline-flex", marginBottom: "16px" }}
                            aria-label="Weinkling — Home"
                        >
                            <Image
                                src="/logo.png"
                                alt="Weinkling logo"
                                width={140}
                                height={32}
                                style={{
                                    height: "32px",
                                    width: "auto",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        </Link>

                        {/* Brand description */}
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9rem",
                                fontWeight: 400,
                                color: "rgba(245,244,240,0.55)",
                                lineHeight: 1.75,
                                maxWidth: "320px",
                                marginBottom: "24px",
                            }}
                        >
                            We design homes that think. Precision-engineered systems
                            that turn your environment into an extension of your intent.
                        </p>

                        {/* Social links */}
                        <div
                            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                            aria-label="Social media links"
                        >
                            {SOCIAL.map((name) => (
                                <a
                                    key={name}
                                    href="#"
                                    aria-label={name}
                                    className="footer-link"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.68rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        color: "rgba(245,244,240,0.4)",
                                        border: "1px solid rgba(245,244,240,0.1)",
                                        padding: "0.35rem 0.85rem",
                                        borderRadius: "4px",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease, border-color 0.2s ease",
                                        display: "inline-block",
                                    }}
                                >
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Cols 2–4: Nav columns ─────────────────────── */}
                    {FOOTER_COLS.map((col) => (
                        <div key={col.title}>
                            <p style={colHeadingStyle}>{col.title}</p>
                            <ul
                                role="list"
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="footer-link"
                                            style={linkStyle}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Divider ─────────────────────────────────────────── */}
                <div
                    style={{
                        marginTop: "48px",
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                    }}
                />

                {/* ── Bottom bar ──────────────────────────────────────── */}
                <div
                    className="footer-bottom"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                        paddingTop: "24px",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            fontWeight: 400,
                            color: "rgba(245,244,240,0.3)",
                            letterSpacing: "0.03em",
                            margin: 0,
                        }}
                    >
                        © {year} Weinkling. All rights reserved.
                    </p>

                    <div style={{ display: "flex", gap: "2rem" }}>
                        {["Privacy Policy", "Terms of Use"].map((label) => (
                            <Link
                                key={label}
                                href="#"
                                className="footer-link"
                                style={{
                                    ...linkStyle,
                                    fontSize: "0.78rem",
                                    color: "rgba(245,244,240,0.3)",
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
