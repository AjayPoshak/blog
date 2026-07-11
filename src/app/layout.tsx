import type { Metadata, Viewport } from "next";
import "./reset.scss";
import "./globals.scss";
import { fontClassName } from "./fonts";

const SITE_URL = "https://www.ajayposhak.in";
const TITLE = "Ajay Poshak — notes on the web, tooling & databases";
const DESCRIPTION =
  "Essays and notes by Ajay Poshak, a Lead Engineer writing about user interfaces, developer tooling, and databases.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Ajay Poshak",
  },
  description: DESCRIPTION,
  applicationName: "Ajay Poshak's Blog",
  authors: [{ name: "Ajay Poshak", url: SITE_URL }],
  creator: "Ajay Poshak",
  publisher: "Ajay Poshak",
  keywords: [
    "Ajay Poshak",
    "software engineering",
    "web development",
    "frontend",
    "user interfaces",
    "developer tooling",
    "databases",
    "JavaScript",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Ajay Poshak's Blog",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@poshakajay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0f1116",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
