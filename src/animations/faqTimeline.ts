/**
 * faqTimeline.ts
 *
 * GSAP scroll-reveal builder for FAQSection.
 * Component → useScrollTimeline → this builder.
 *
 * Sequence:
 *   1. Label fades + rises
 *   2. Heading sweeps up
 *   3. Subtext fades in
 *   4. FAQ list block slides up as a unit
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR } from "@/animations/scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface FAQSectionRefs {
    section: React.RefObject<HTMLElement | null>;
    label:   React.RefObject<HTMLDivElement | null>;
    heading: React.RefObject<HTMLHeadingElement | null>;
    subtext: React.RefObject<HTMLParagraphElement | null>;
    list:    React.RefObject<HTMLDivElement | null>;
}

export function buildFAQTimeline(refs: FAQSectionRefs): () => void {
    const { section, label, heading, subtext, list } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ── Header: label → heading → subtext ─────────────────────
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
                y:        reduced ? 0 : 16,
                duration: DUR.sm,
                ease:     "power2.out",
            })
            .from(heading.current, {
                opacity:  0,
                y:        reduced ? 0 : 36,
                duration: DUR.md,
                ease:     "power2.out",
            }, "-=0.40")
            .from(subtext.current, {
                opacity:  0,
                y:        reduced ? 0 : 20,
                duration: DUR.sm,
                ease:     "power2.out",
            }, "-=0.48");

        // ── FAQ list: slides up as a single unit ───────────────────
        gsap.from(list.current, {
            opacity:  0,
            y:        reduced ? 0 : 40,
            duration: DUR.md,
            ease:     "power2.out",
            scrollTrigger: {
                trigger: list.current,
                start:   "top 86%",
                once:    true,
            },
        });

    }, section.current);

    return () => {
        ctx.revert();
    };
}
