/**
 * testimonialsTimeline.ts
 *
 * GSAP scroll-reveal builder for TestimonialsSection.
 *
 * Sequence:
 *   1. Label fades + rises
 *   2. Heading sweeps up
 *   3. Subtext fades in
 *   4. Marquee rows fade up with stagger
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR } from "@/animations/scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface TestimonialsSectionRefs {
    section: React.RefObject<HTMLElement | null>;
    label:   React.RefObject<HTMLDivElement | null>;
    heading: React.RefObject<HTMLHeadingElement | null>;
    subtext: React.RefObject<HTMLParagraphElement | null>;
    cards:   React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function buildTestimonialsTimeline(refs: TestimonialsSectionRefs): () => void {
    const { section, label, heading, subtext, cards } = refs;

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
                y:        reduced ? 0 : 18,
                duration: DUR.sm,
                ease:     "power2.out",
            })
            .from(heading.current, {
                opacity:  0,
                y:        reduced ? 0 : 40,
                duration: DUR.md,
                ease:     "power2.out",
            }, "-=0.42")
            .from(subtext.current, {
                opacity:  0,
                y:        reduced ? 0 : 20,
                duration: DUR.sm,
                ease:     "power2.out",
            }, "-=0.52");

        // ── Marquee rows: fade up with stagger ──────────────────────
        const validRows = cards.current.filter(Boolean);
        if (validRows.length) {
            gsap.from(validRows, {
                opacity:  0,
                y:        reduced ? 0 : 32,
                duration: DUR.md,
                stagger:  0.15,
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: validRows[0],
                    start:   "top 92%",
                    once:    true,
                },
            });
        }

    }, section.current);

    return () => {
        ctx.revert();
    };
}
