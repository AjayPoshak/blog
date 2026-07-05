import type { Metadata } from "next";
import { LayoutHeader } from "@/components/LayoutHeader";

export const metadata: Metadata = {
  title: "Books",
  description: "Books Ajay Poshak has read — technical and general.",
};

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutHeader />
      {children}
    </>
  );
}
