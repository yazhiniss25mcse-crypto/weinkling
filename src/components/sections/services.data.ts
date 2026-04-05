/**
 * services.data.ts
 *
 * Single source of truth for the image-based Services section.
 *
 * v2 changes:
 *   - Added `image` (Unsplash CDN URL) to each service
 *   - Added `featured` flag (Unified Control = feature card)
 *   - Reordered: feature card (control) is first in array
 *   - Updated heading / subtext copy to match new layout
 */

export type ServiceIconType =
    | "lighting"
    | "control"
    | "voice"
    | "curtains"
    | "retrofit"
    | "panels";

export type ServiceAccent = "teal" | "gold";

export interface ServiceData {
    id: string;
    number: string;
    title: string;
    description: string;
    iconType: ServiceIconType;
    accent: ServiceAccent;
    /** Unsplash CDN URL — full-bleed card background */
    image: string;
    /** Marks the hero USP card (bento feature slot) */
    featured?: boolean;
}

export const SERVICES: ServiceData[] = [
    // ── Feature card first — drives bento grid placement ──
    {
        id:          "control",
        number:      "01",
        title:       "Unified Control System",
        description: "Control your entire home — lighting, fans, curtains, and appliances — from one seamless interface. One tap. Every room.",
        iconType:    "control",
        accent:      "teal",
        featured:    true,
        image:       "/images/services/control.png",
    },

    // ── Secondary cards (light bg — product on white) ──────
    {
        id:          "lighting",
        number:      "02",
        title:       "Smart Lighting",
        description: "Set moods, automate scenes, and control brightness effortlessly.",
        iconType:    "lighting",
        accent:      "teal",
        image:       "/images/services/lighting.png",
    },
    {
        id:          "voice",
        number:      "03",
        title:       "Voice & App Control",
        description: "Control your home using Alexa, Google, or your smartphone.",
        iconType:    "voice",
        accent:      "gold",
        image:       "/images/services/voice.png",
    },
    {
        id:          "curtains",
        number:      "04",
        title:       "Smart Curtains",
        description: "Automate curtains based on time, sunlight, or your routine.",
        iconType:    "curtains",
        accent:      "teal",
        image:       "/images/services/curtains.png",
    },
    {
        id:          "retrofit",
        number:      "05",
        title:       "Retrofit Ready",
        description: "Upgrade your home without changing existing wiring.",
        iconType:    "retrofit",
        accent:      "gold",
        image:       "/images/services/retrofit.png",
    },
    {
        id:          "panels",
        number:      "06",
        title:       "Designer Touch Panels",
        description: "Premium panels customized to match your interiors.",
        iconType:    "panels",
        accent:      "teal",
        image:       "/images/services/panels.png",
    },
];

export const TRUST_ITEMS = [
    { id: "voice-compat", text: "Works with Alexa, Google & Apple" },
    { id: "no-rewire",    text: "No rewiring required" },
    { id: "certified",    text: "Installed by certified experts" },
] as const;

export const SERVICES_SECTION_CONTENT = {
    label:   "OUR SOLUTIONS",
    heading: "Smart Living.\nSeamlessly Connected.",
    subtext: "Control lighting, appliances, curtains, and more — all from one intelligent system.",
    cta: {
        heading:        "Let's Build Your Smart Home",
        subtext:        "Book a free consultation and get a customised automation plan.",
        primaryLabel:   "Get Free Consultation",
        primaryHref:    "/contact",
        secondaryLabel: "View Projects",
        secondaryHref:  "/projects",
    },
} as const;
