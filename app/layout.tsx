import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tolkmislk.github.io"),
  title: "NCC — Software Engineer",
  description:
    "NCC is a software engineer with six years of experience across cross-platform applications, enterprise systems, auction platforms, and healthcare IoT.",
  keywords: [
    "NCC",
    "software engineer",
    "full-stack engineer",
    "Flutter",
    "Vue",
    "TypeScript",
    "Python",
    "Java",
    "AI Agent",
  ],
  authors: [{ name: "NCC" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "NCC — Software Engineer",
    description:
      "Six years of software engineering experience. Full-stack systems, healthcare IoT, and AI agents.",
    siteName: "NCC Engineering Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NCC — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCC — Software Engineer",
    description:
      "Six years of software engineering experience. Full-stack systems, healthcare IoT, and AI agents.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
