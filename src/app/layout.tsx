import type { Metadata } from "next";
import { Manrope, Inter, Abel } from "next/font/google";
import "./globals.css";
import ChatBotWrapper from "@/components/layout/ChatBotWrapper";


// ── Fonts via next/font — zero FOUT, self-hosted, optimal loading ─────────
const manrope = Manrope({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display:  "swap",
});

const inter = Inter({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display:  "swap",
});

const abel = Abel({
  subsets:  ["latin"],
  weight:   ["400"],
  variable: "--font-abel",
  display:  "swap",
});

export const metadata: Metadata = {
  title: "Weinkling — Intelligent Living",
  description:
    "Weinkling transforms your home into a living, breathing environment. Precision-crafted home automation systems that respond to your rhythm.",
  keywords: [
    "home automation",
    "smart home",
    "intelligent living",
    "home control",
    "premium smart home systems",
  ],
  authors: [{ name: "Weinkling" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Weinkling — Intelligent Living",
    description:
      "Precision-crafted home automation systems that respond to your rhythm.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${abel.variable}`}
    >
      {/* manrope.className directly on body guarantees Manrope applies
          even if the CSS variable chain is disrupted by Tailwind preflight */}
      <body className={`antialiased ${manrope.className}`}>
        {children}
        <ChatBotWrapper />
      </body>
    </html>
  );
}
