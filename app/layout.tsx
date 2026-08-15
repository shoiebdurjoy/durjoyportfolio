import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/src/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Md Shoieb Hossain — BUILD ↔ CUT | Software Engineer & Video Editor",
  description:
    "Portfolio of Md Shoieb Hossain (Shoieb Durjoy) — Computer Science student at BRAC University, software/AI engineer, and professional video editor. One brain, two timelines.",
  keywords: [
    "Md Shoieb Hossain",
    "Shoieb Durjoy",
    "Durjoy",
    "Software Engineer",
    "Video Editor",
    "AI Engineer",
    "BRAC University",
    "Portfolio",
    "Full Stack Developer",
    "DurjoyAI",
  ],
  authors: [{ name: "Md Shoieb Hossain" }],
  creator: "Md Shoieb Hossain",
  openGraph: {
    title: "Md Shoieb Hossain — BUILD ↔ CUT",
    description:
      "Software Engineer & Video Editor. One brain, two timelines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Shoieb Hossain — BUILD ↔ CUT",
    description:
      "Software Engineer & Video Editor. One brain, two timelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        {/* Cinematic Grain Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
