"use client";

/**
 * ServiceCard.tsx  — v2 (image-based)
 *
 * Renders a full-bleed image card with:
 *   - Background image (absolute, object-fit cover)
 *   - Multi-stop dark gradient overlay for text legibility
 *   - Content anchored to bottom-left
 *   - Feature variant: "Core System" badge + larger title + full description
 *   - Small variant: title + 2-line clamped description
 *
 * Hover interactions (CSS only, zero JS):
 *   - Image scales to 1.06 (smooth cubic-bezier)
 *   - Overlay deepens slightly
 *   - Text block lifts 8px
 *
 * All hover/transition CSS lives in ServicesSection's <style> block
 * to avoid 6× duplication in the DOM.
 *
 * Uses React.forwardRef so the parent can attach GSAP scroll-reveal refs.
 */

import React from "react";
import type { ServiceData } from "./services.data";

interface ServiceCardProps {
    service: ServiceData;
    index: number;
    featured?: boolean;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
    ({ service, index, featured = false }, ref) => {
        const cardClass = [
            "sc-bc",
            featured ? "sc-bc--feat" : "sc-bc--sm",
        ].join(" ");

        return (
            <article
                ref={ref}
                className={cardClass}
                aria-label={service.title}
            >
                {/* Full-bleed background image — purely visual, hidden from AT */}
                <img
                    className="sc-bc-img"
                    src={service.image}
                    alt=""
                    role="presentation"
                    aria-hidden="true"
                    loading={featured ? "eager" : "lazy"}
                    decoding="async"
                />

                {/* Multi-stop dark gradient overlay */}
                <div className="sc-bc-overlay" aria-hidden="true" />

                {/* Text content — always bottom-left */}
                <div className="sc-bc-body">

                    {/* Feature-only: accent badge */}
                    {featured && (
                        <span className="sc-bc-badge" aria-label="Core System">
                            Core System
                        </span>
                    )}

                    {/* Card title */}
                    <h3 className="sc-bc-title">
                        {service.title}
                    </h3>

                    {/* Description — full on feature, 2-line clamp on small */}
                    <p className="sc-bc-desc">
                        {service.description}
                    </p>
                </div>

                {/* Subtle top-right card number — decorative */}
                <span className="sc-bc-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </article>
        );
    }
);

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
