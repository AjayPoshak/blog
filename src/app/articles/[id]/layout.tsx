import type { Metadata } from "next";
import "../../../app/reset.scss";
import "../../../app/globals.scss";
import { LayoutHeader } from "@/components/LayoutHeader";
import { fontClassName } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Ajay Poshak's Blog",
  description: "Ajay Poshak's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClassName}>
      <title>Ajay Poshak&apos;s blog</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <body>
        <LayoutHeader />
        {children}
      </body>
    </html>
  );
}
