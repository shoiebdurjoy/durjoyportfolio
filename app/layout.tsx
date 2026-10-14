import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/src/components/ui/SmoothScroll";
import { profile } from "@/src/data/content";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const siteUrl = "https://durjoyportfolio.onrender.com";
const title = "Md Shoieb Hossain (Durjoy) — Software Engineer & Video Editor";
const description =
  "Portfolio of Md Shoieb Hossain (Durjoy): AI and full-stack engineer studying Computer Science at BRAC University, and a professional video editor with 3+ years of agency experience.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Md Shoieb Hossain", "Shoieb Durjoy", "Durjoy", "Software Engineer", "AI Engineer",
    "Full Stack Developer", "Video Editor", "Motion Designer", "BRAC University", "Dhaka", "DurjoyAI",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "Durjoy — Portfolio",
    title,
    description,
    locale: "en_US",
    images: [{ url: "/durjoy.jpg", width: 656, height: 820, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/durjoy.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    alternateName: "Durjoy",
    url: siteUrl,
    image: `${siteUrl}/durjoy.jpg`,
    email: `mailto:${profile.email}`,
    jobTitle: "Software Engineer & Video Editor",
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "BRAC University" },
    sameAs: [profile.github, profile.linkedin, profile.behance],
    knowsAbout: ["Artificial Intelligence", "Full-Stack Development", "Deep Learning", "Video Editing", "Motion Graphics"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${interTight.variable} antialiased`}>
      <body className="min-h-screen font-sans bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
