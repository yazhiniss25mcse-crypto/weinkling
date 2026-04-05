/**
 * servicesSectionTimeline.ts
 *
 * GSAP timeline builder for the ServicesSection.
 * Animation sequence:
 *   1. Section label fades + rises
 *   2. Heading sweeps up
 *   3. Subtext fades in
 *   4. Service cards stagger in from below
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR } from "@/animations/scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface ServicesSectionRefs {
    section:    React.RefObject<HTMLElement | null>;
    label:      React.RefObject<HTMLDivElement | null>;
    heading:    React.RefObject<HTMLHeadingElement | null>;
    subtext:    React.RefObject<HTMLParagraphElement | null>;
    cards:      React.MutableRefObject<(HTMLDivElement | null)[]>;
    trustStrip: React.RefObject<HTMLDivElement | null>;
    ctaBlock:   React.RefObject<HTMLDivElement | null>;
}

export function buildServicesSectionTimeline(refs: ServicesSectionRefs): () => void {
    const { section, label, heading, subtext, cards, trustStrip, ctaBlock } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ── Header: label → heading → subtext ─────────────────────────
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start:   "top 82%",
                once:    true,
            },
        });

        headerTl
            .from(label.current, {
                opacity:  0,
                y:        reduced ? 0 : 18,
                duration: DUR.sm,
                ease:     "power2.out",
            })
            .from(heading.current, {
                opacity:  0,
                y:        reduced ? 0 : 40,
                duration: DUR.md,
                ease:     "power2.out",
            }, "-=0.45")
            .from(subtext.current, {
                opacity:  0,
                y:        reduced ? 0 : 22,
                duration: DUR.sm,
                ease:     "power2.out",
            }, "-=0.55");

        // ── Cards: staggered rise ─────────────────────────────────────
        const validCards = cards.current.filter(Boolean);
        if (validCards.length) {
            gsap.from(validCards, {
                opacity:  0,
                y:        reduced ? 0 : 50,
                duration: DUR.md,
                stagger:  0.09,
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: validCards[0],
                    start:   "top 88%",
                    once:    true,
                },
            });
        }

        // ── Trust strip ───────────────────────────────────────────────
        gsap.from(trustStrip.current, {
            opacity:  0,
            y:        reduced ? 0 : 24,
            duration: DUR.sm,
            ease:     "power2.out",
            scrollTrigger: {
                trigger: trustStrip.current,
                start:   "top 90%",
                once:    true,
            },
        });

        // ── CTA block ─────────────────────────────────────────────────
        gsap.from(ctaBlock.current, {
            opacity:  0,
            y:        reduced ? 0 : 30,
            duration: DUR.sm,
            ease:     "power2.out",
            scrollTrigger: {
                trigger: ctaBlock.current,
                start:   "top 88%",
                once:    true,
            },
        });

    }, section.current);

    return () => {
        ctx.revert();
    };
}
