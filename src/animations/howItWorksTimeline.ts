/**
 * howItWorksTimeline.ts
 *
 * GSAP scroll-reveal builder for HowItWorksSection.
 * Component → useScrollTimeline → this builder.
 *
 * Full animation sequence
 * ────────────────────────────────────────────────
 *  0. Section fades in (opacity 0 → 1) as it enters viewport
 *  1. Header group: label → heading → subtext (sequential, overlapping)
 *  2. Steps stagger in from below (opacity + y)
 *     └─ Each icon ring scales 0.72 → 1 slightly after its card
 *  3. Connector line draws left → right via a proxy progress value
 *     ├─ Crisp fill layer + blurred glow twin animate in sync
 *     └─ At each step's midpoint, icon ring fires a soft glow ping
 * ────────────────────────────────────────────────
 * All non-scrubbed. Eases: power2.out / power2.inOut.
 * Respects prefers-reduced-motion throughout.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR } from "@/animations/scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface HowItWorksSectionRefs {
    section:   React.RefObject<HTMLElement | null>;
    label:     React.RefObject<HTMLDivElement | null>;
    heading:   React.RefObject<HTMLHeadingElement | null>;
    subtext:   React.RefObject<HTMLParagraphElement | null>;
    steps:     React.MutableRefObject<(HTMLDivElement | null)[]>;
    line:      React.RefObject<HTMLDivElement | null>;
    lineGlow:  React.RefObject<HTMLDivElement | null>;
    iconRings: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

// ── Per-step accent colours ──────────────────────────────────────────────────

/** Glow burst colour fired when the line reaches an icon */
const GLOW_COLOR = [
    "rgba(140,180,184,0.72)",   // step 01 – teal
    "rgba(200,169,110,0.66)",   // step 02 – gold
    "rgba(140,180,184,0.72)",   // step 03 – teal
    "rgba(200,169,110,0.66)",   // step 04 – gold
];

/** Resting box-shadow restored after the burst settles */
const GLOW_REST = [
    `0 0 0 6px rgba(140,180,184,0.07), 0 0 32px rgba(140,180,184,0.22), inset 0 1px 0 rgba(255,255,255,0.10)`,
    `0 0 0 6px rgba(200,169,110,0.06), 0 0 32px rgba(200,169,110,0.20), inset 0 1px 0 rgba(255,255,255,0.10)`,
    `0 0 0 6px rgba(140,180,184,0.07), 0 0 32px rgba(140,180,184,0.22), inset 0 1px 0 rgba(255,255,255,0.10)`,
    `0 0 0 6px rgba(200,169,110,0.06), 0 0 32px rgba(200,169,110,0.20), inset 0 1px 0 rgba(255,255,255,0.10)`,
];

// Progress thresholds (0–1) at which the line front reaches each icon centre
const PING_AT = [0.02, 0.34, 0.67, 0.98];

// ── Icon glow ping ───────────────────────────────────────────────────────────

/**
 * Soft glow burst on an icon ring when the connector line arrives.
 * Expands box-shadow outward and scale-pulses, then settles to resting state.
 */
function pingIconRing(el: HTMLDivElement, color: string, restShadow: string) {
    const dim   = color.replace("0.72", "0.22").replace("0.66", "0.20");
    const outer = color.replace("0.72", "0.32").replace("0.66", "0.28");

    gsap.to(el, {
        boxShadow: `0 0 0 12px ${dim}, 0 0 52px ${color}, 0 0 90px ${outer}, inset 0 1px 0 rgba(255,255,255,0.18)`,
        scale:     1.12,
        duration:  0.42,
        ease:      "power2.out",
        onComplete() {
            gsap.to(el, {
                boxShadow: restShadow,
                scale:     1,
                duration:  0.70,
                ease:      "power2.inOut",
            });
        },
    });
}

// ── Main builder ─────────────────────────────────────────────────────────────

export function buildHowItWorksTimeline(refs: HowItWorksSectionRefs): () => void {
    const { section, label, heading, subtext, steps, line, lineGlow, iconRings } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ── 0. Section fade-in ─────────────────────────────────────────
        // The whole section softly materialises as it enters the viewport.
        // Starts earlier (top 92%) so by the time header text animates,
        // the section background is already fully visible.
        gsap.fromTo(
            section.current,
            { opacity: 0 },
            {
                opacity:  1,
                duration: reduced ? 0 : DUR.md,   // 1.2 s
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: section.current,
                    start:   "top 92%",
                    once:    true,
                },
            }
        );

        // ── 1. Header group: label → heading → subtext ────────────────
        // Each element enters from slightly below with an opacity fade,
        // overlapping slightly for a cohesive read.
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start:   "top 80%",
                once:    true,
            },
        });

        headerTl
            .from(label.current, {
                opacity:  0,
                y:        reduced ? 0 : 16,
                duration: DUR.sm,       // 0.8 s
                ease:     "power2.out",
            })
            .from(heading.current, {
                opacity:  0,
                y:        reduced ? 0 : 36,
                duration: DUR.md,       // 1.2 s
                ease:     "power2.out",
            }, "-=0.44")
            .from(subtext.current, {
                opacity:  0,
                y:        reduced ? 0 : 20,
                duration: DUR.sm,       // 0.8 s
                ease:     "power2.out",
            }, "-=0.54");

        // ── 2. Step cards stagger in ───────────────────────────────────
        // Cards rise from +50 px with opacity, then each icon ring
        // scales in from 0.72 → 1 with a slight lag after its card.
        const validSteps = steps.current.filter(Boolean) as HTMLDivElement[];
        const validRings = iconRings.current.filter(Boolean) as HTMLDivElement[];

        if (validSteps.length) {
            // Cards
            gsap.from(validSteps, {
                opacity:  0,
                y:        reduced ? 0 : 50,
                duration: DUR.md,       // 1.2 s per card
                stagger:  {
                    amount: reduced ? 0 : 0.48,   // total spread across all 4 cards
                    ease:   "power1.inOut",
                },
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: validSteps[0],
                    start:   "top 84%",
                    once:    true,
                },
            });

            // Icon rings: scale bloom — starts 0.16 s after each card starts
            if (validRings.length) {
                gsap.from(validRings, {
                    scale:    reduced ? 1 : 0.72,
                    opacity:  reduced ? 1 : 0,
                    duration: DUR.md,       // 1.2 s
                    stagger:  {
                        amount: reduced ? 0 : 0.48,
                        ease:   "power1.inOut",
                    },
                    ease:     "power2.out",
                    delay:    reduced ? 0 : 0.22,   // slight lag so card leads
                    scrollTrigger: {
                        trigger: validSteps[0],
                        start:   "top 84%",
                        once:    true,
                    },
                });
            }
        }

        // ── 3. Connector line draw + icon glow pings ───────────────────
        // A proxy { progress: 0 → 1 } drives scaleX on both line layers
        // every frame, keeping them pixel-perfect in sync.
        // When progress crosses each step's threshold, the icon ring fires
        // a glow ping — making the flow feel alive.
        if (!line.current) return;

        const pinged = [false, false, false, false];
        const proxy  = { progress: 0 };

        const lineTween = gsap.to(proxy, {
            progress: 1,
            duration: reduced ? 0 : DUR.lg,   // 2.0 s — deliberately slow
            ease:     "power2.out",
            delay:    reduced ? 0 : 0.36,      // let cards settle first
            onUpdate() {
                const p = proxy.progress;

                // Sync both line layers
                if (line.current)     gsap.set(line.current,     { scaleX: p, transformOrigin: "left center" });
                if (lineGlow.current) gsap.set(lineGlow.current, { scaleX: p, transformOrigin: "left center" });

                // Fire glow pings at each step's midpoint
                if (!reduced) {
                    PING_AT.forEach((threshold, i) => {
                        if (!pinged[i] && p >= threshold) {
                            pinged[i] = true;
                            const ring = iconRings.current[i];
                            if (ring) pingIconRing(ring, GLOW_COLOR[i], GLOW_REST[i]);
                        }
                    });
                }
            },
            scrollTrigger: {
                trigger: line.current ?? section.current,
                start:   "top 76%",
                once:    true,
            },
        });

        // Silence unused variable warning (lineTween used implicitly by GSAP context)
        void lineTween;

    }, section.current);

    return () => {
        ctx.revert();
    };
}
