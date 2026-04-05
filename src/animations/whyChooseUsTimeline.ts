/**
 * whyChooseUsTimeline.ts
 *
 * GSAP scroll-reveal builder for WhyChooseUsSection.
 * Component → useScrollTimeline → this builder.
 *
 * Sequence:
 *   1. Label + heading (header group)
 *   2. 4 feature cards stagger in (0.12s apart)
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR } from "@/animations/scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface WhyChooseUsSectionRefs {
    section: React.RefObject<HTMLElement | null>;
    label:   React.RefObject<HTMLDivElement | null>;
    heading: React.RefObject<HTMLHeadingElement | null>;
    cards:   React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function buildWhyChooseUsTimeline(refs: WhyChooseUsSectionRefs): () => void {
    const { section, label, heading, cards } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ── Header ─────────────────────────────────────────────────
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
            }, "-=0.40");

        // ── Cards: stagger fade-up ──────────────────────────────────
        const validCards = cards.current.filter(Boolean);
        if (validCards.length) {
            gsap.from(validCards, {
                opacity:  0,
                y:        reduced ? 0 : 44,
                duration: DUR.md,
                stagger:  0.12,
                ease:     "power2.out",
                scrollTrigger: {
                    trigger: validCards[0],
                    start:   "top 86%",
                    once:    true,
                },
            });
        }

    }, section.current);

    return () => {
        ctx.revert();
    };
}
