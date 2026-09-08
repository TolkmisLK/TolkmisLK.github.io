import type { Metadata } from "next";
import { site, assetUrl, defaultLocale, siteUrl } from "../lib/site";
import "./globals.css";

const profile = site[defaultLocale];
const title = `${site.identity.name} — ${profile.subtitle}`;
const images = site.identity.socialImage
  ? [{ url: assetUrl(site.identity.socialImage), alt: site.identity.name }]
  : [];

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description: profile.intro,
  authors: [{ name: site.identity.name }],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    title,
    description: profile.intro,
    siteName: site.identity.name,
    images,
  },
  twitter: {
    card: images.length ? "summary_large_image" : "summary",
    title,
    description: profile.intro,
    images: images.map((image) => image.url),
  },
  ...(site.identity.favicon
    ? { icons: { icon: assetUrl(site.identity.favicon) } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale === "zh" ? "zh-CN" : "en"}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
