import { LayoutHeader } from "@/components/LayoutHeader";

export default function ArticleLayout({
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
