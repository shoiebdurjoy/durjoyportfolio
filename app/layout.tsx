import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
